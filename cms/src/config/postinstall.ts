import fse from "fs-extra";
import path from "path";

const rootDir = path.join(__dirname, "../..");
const publicTinymceDir = path.join(rootDir, "public", "tinymce");

fse.emptyDirSync(publicTinymceDir);
fse.copySync(path.join(rootDir, "node_modules", "tinymce"), publicTinymceDir, {
  overwrite: true,
});

console.log("rootDir:", rootDir);
console.log("publicTinymceDir:", publicTinymceDir);
