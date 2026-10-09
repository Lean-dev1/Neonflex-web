import fs from 'fs';

export const removeTempFiles = async (files) => {
  const list = Object.values(files ?? {}).flat();
  await Promise.allSettled(
    list.filter((f) => f?.tempFilePath).map((f) => fs.promises.unlink(f.tempFilePath))
  );
};