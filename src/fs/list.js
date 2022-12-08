import fs from "fs/promises";

export const list = async (currentPath) => {
  try {
    const arrayDirents = await fs.readdir(currentPath, { withFileTypes: true });

    const arrayDataFiles = arrayDirents.map((dirent) => {
      const Name = dirent.name;

      if (dirent.isFile()) {
        return { Name, Type: "file" };
      }
      return { Name, Type: "directory" };
    });

    arrayDataFiles.sort((a, b) => a.Type.localeCompare(b.Type));
    console.table(arrayDataFiles);
  } catch (error) {
    console.log("Operation failed");
  }
};
