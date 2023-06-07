const fs = require('fs');
const path = require('path');

export function searchJsonFiles(rootFolder: any, keyword: any) {
  const result: string[] = [];
  console.log(1);
  console.log('path', path);
  console.log('fs', fs);
  
  console.log('rootFolder', rootFolder);
  
  console.log('fs.readdirSync(rootFolder)', fs.readdirSync(rootFolder));
  
  // fs.readdirSync(rootFolder).forEach((file: string) => {
  //   console.log('path1', path);
  //   const filePath = path.join(rootFolder, file);
    
  //   // const stat = fs.statSync(filePath);

  //   // if (stat.isDirectory()) {
  //   //   result.push(...searchJsonFiles(filePath, keyword));
  //   // } else if (path.extname(file) === '.json') {
  //   //   const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  //   //   const values = Object.values(data);
  //   //   console.log('values', values);

  //   //   // if (keyword) {
  //   //   //   const filteredValues = values.filter((value) => value === keyword && typeof value === 'string');
  //   //   //   result.push(...filteredValues);
  //   //   // }
  //   // }
  // });

  return result;
}