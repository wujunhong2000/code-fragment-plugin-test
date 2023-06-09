const fs = require("fs");
const path = require("path");
const codeDir = path.resolve(__dirname, "../code");

/*
 * 递归搜索文件code文件夹下所有的json文件，如果搜索关键词在文件中的key中，则push到结果
 * @param {String} rootFolder 文件夹路径
 * @param {String} keyword 搜索词
 * @return {Array} 匹配的结果
 */
export function searchJsonFiles(rootFolder: string = codeDir, keyword: string): string[] {
  const result: string[] = [];
  fs.readdirSync(rootFolder).forEach((file: string) => {
    const filePath = path.join(rootFolder, file);
    const stat = fs.statSync(filePath);
    // 如果该层还是文件夹
    if (stat.isDirectory()) {
      result.push(...searchJsonFiles(filePath, keyword));
    } else if (path.extname(file) === ".json") {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (keyword) {
        const key = data?.key || [];
        const value = data?.value || [];
        const hasValue = key.includes(keyword);
        if (hasValue && value && Array.isArray(value)) {
          result.push(...value);
        }
      }
    }
  });
  console.log("result", result);
  return result;
}
