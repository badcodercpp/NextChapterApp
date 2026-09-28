import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/state';
import { initiateGetMe } from '@/state/thunkCreators';
import { selectGetMeSuccess } from '@/state/selectors';
import { useEffect } from 'react';

export const useMe = () => {
  const mePending = useSelector(selectGetMeSuccess);
  const meSuccess = useSelector(selectGetMeSuccess);
  const meError = useSelector(selectGetMeSuccess);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (mePending || meSuccess) {
      return;
    }
    if ((!mePending && !meSuccess) || meError) {
      dispatch(initiateGetMe());
    }
  }, [meSuccess, mePending, meError, dispatch]);
};
