const fs = require('fs');
const path = require('path');
const codeDir = path.resolve(__dirname, '../code');

export function searchJsonFiles(rootFolder: any = codeDir, keyword: any) {
  const result: string[] = [];
  console.log('fs.readdirSync(rootFolder)', fs.readdirSync(rootFolder));
  
  fs.readdirSync(rootFolder).forEach((file: string) => {
    console.log("🚀 ~ file: fileSearch.ts:8 ~ fs.readdirSync ~ file:", file)
    const filePath = path.join(rootFolder, file);
    console.log("🚀 ~ file: fileSearch.ts:12 ~ fs.readdirSync ~ filePath:", filePath)
    const stat = fs.statSync(filePath);
    console.log("🚀 ~ file: fileSearch.ts:14 ~ fs.readdirSync ~ stat:", stat)
    if (stat.isDirectory()) {
      result.push(...searchJsonFiles(filePath, keyword));
      console.log("🚀 ~ file: fileSearch.ts:16 ~ fs.readdirSync ~ result:", result)
    } else if (path.extname(file) === '.json') {
      console.log("🚀 ~ file: fileSearch.ts:20 ~ fs.readdirSync ~ path.extname(file):", path.extname(file))
      
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const values = Object.values(data);

      // if (keyword) {
      //   const filteredValues = values.filter((value) => value === keyword && typeof value === 'string');
      //   result.push(...filteredValues);
      // }
    }
  });

  return result;
}