import imageCompression from 'browser-image-compression';

export const reSizeImage = async file => {
  try {
    const option = {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };
    return await imageCompression(file, option);
  } catch (error) {
    return file;
  }
};
