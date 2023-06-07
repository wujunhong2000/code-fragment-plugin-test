const fs = require('fs');
const path = require('path');

export function searchJsonFiles(rootFolder: any, keyword: any) {
  console.log(1);
  
  const result: Array<[]> = [];
  const subFolders = fs.readdirSync(rootFolder);
  subFolders.forEach((subFolder: any) => {
    const fullPath = path.join(rootFolder, subFolder);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      const jsonFiles = fs.readdirSync(fullPath).filter((file: any) => path.extname(file) === '.json');
      jsonFiles.forEach((jsonFile: any) => {
        const jsonPath = path.join(fullPath, jsonFile);
        const jsonContent = fs.readFileSync(jsonPath);
        const data = JSON.parse(jsonContent);
        if (data.key.includes(keyword)) {
          console.log('data.value', data.value);
          
          // result(...data.value);
        }
      });
    }
  });
  return result;
}

const filePath = path.join(__dirname, 'file.txt');