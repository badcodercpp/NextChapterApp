export const toHttpsURL = (url?: string | null) => {
  if (!url) {
    return undefined;
  }
  return url.replace('http://', 'https://');
};
