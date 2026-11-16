import { useCallback, useRef, useState } from 'react';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { ViewShotRef } from 'react-native-view-shot';
import { createPdf } from 'react-native-pdf-from-image';
import { selectMe } from '@/state/selectors';
import { showToast } from '@/components';
import { useSelector } from 'react-redux';

export const useShareViewAsPdf = ({
  fileName = 'recovery_progress',
  paperSize = 'A4',
  shareTitle = 'Share Recovery Progress PDF',
} = {}) => {
  const { data: me } = useSelector(selectMe);
  const viewShotRef = useRef<ViewShotRef | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const shareFileName = `${me?.displayName?.split(' ')?.[0] ?? ''}_${fileName}`;

  const captureAndSharePdf = useCallback(async () => {
    if (!viewShotRef.current) {
      showToast('Target view is not ready.', 'error');
      return;
    }

    setIsGenerating(true);
    let generatedPDFFilePath: string | undefined;

    try {
      // 1. Capture the target view as a high-quality PNG
      const imageUri = await viewShotRef.current.capture();

      // 2. Convert the image into a PDF
      const { filePath } = await createPdf({
        imagePaths: [imageUri],
        name: shareFileName,
        //@ts-ignore
        paperSize, // 'A4' | 'Letter' | 'Legal'
      });

      generatedPDFFilePath = filePath;

      // 3. Ensure consistent file:// prefix across iOS and Android
      const formattedPdfUri = generatedPDFFilePath.startsWith('file://')
        ? filePath
        : `file://${filePath}`;

      setIsGenerating(false);

      // Give React time to render the loader disappearing
      await new Promise<void>(resolve => {
        requestAnimationFrame(() => {
          resolve();
        });
      });

      // 4. Open native share sheet
      await Share.open({
        title: shareTitle,
        url: formattedPdfUri,
        type: 'application/pdf',
        failOnCancel: false, // Prevents throwing an error if user dismisses share sheet
      });
    } catch (error) {
      console.error('Capture & Share PDF Error:', error);
      showToast('Could not generate or share the PDF.', 'error');
    } finally {
      setIsGenerating(false);
      if (generatedPDFFilePath) {
        // Remove generated PDF after share sheet is dismissed/cancelled
        const path = generatedPDFFilePath.replace('file://', '');

        try {
          if (await RNFS.exists(path)) {
            await RNFS.unlink(path);
          }
        } catch (cleanupError) {
          console.warn('Failed to clean up generated PDF:', cleanupError);
        }
      }
    }
  }, [shareFileName, paperSize, shareTitle]);

  const handleSharePress = useCallback(() => {
    return captureAndSharePdf();
  }, [captureAndSharePdf]);

  return {
    viewShotRef,
    captureAndSharePdf,
    isGenerating,
    handleSharePress,
  };
};
