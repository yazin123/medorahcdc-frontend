export const resolveMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || 'https://medorahcdc-backend.vercel.app';
  const normalizedBase = mediaBaseUrl.endsWith('/') ? mediaBaseUrl.slice(0, -1) : mediaBaseUrl;
  const normalizedPath = url.startsWith('/') ? url : `/${url}`;

  return `${normalizedBase}${normalizedPath}`;
};
