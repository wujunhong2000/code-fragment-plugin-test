import fs = require("fs");
import path = require("path");
import { catalogItem } from "../catalog";
import catalog from "../catalog";

// 获取关键词所在的文件夹路径
function getFolderPath(keyword: string): string[] {
  const path: string[] = [];
  catalog.forEach((item: catalogItem) => {
    if (item.key.includes(keyword)) path.push(item.path);
  });
  return path;
}

// 读取txt文件内容
function readFile(filePath: any): string {
  let formattedData = "";
  const data = fs.readFileSync(filePath, "utf8");

  // 进行字符串处理，添加换行符和缩进
  formattedData = addNewlinesAndIndent(data);
  return formattedData;
}

// 添加换行符和缩进的函数
function addNewlinesAndIndent(text: string): string {
  // 在每行的末尾添加换行符
  const lines = text.split("\n");
  const formattedLines = lines.map((line) => line + "\n");

  // 添加缩进
  const indentedText = formattedLines.map((line) => "  " + line).join("");

  return indentedText;
}

/*
 * 读取搜索词匹配到文件夹路径下的.txt文件转为字符串，push进结果数组
 * @param {String} keyword 搜索词
 * @return {Array} 匹配的结果
 */
export function getMatchingFiles(keyword: string): string[] {
  if (!keyword) return [];

  const result: string[] = [];

  // 获取关键词对应的文件夹路径
  const resPaths: string[] = getFolderPath(keyword);
  console.log("resPaths", resPaths);
  if (resPaths.length === 0) return [];
  resPaths.forEach((resPath) => {
    fs.readdirSync(resPath).forEach((file: string) => {
      const filePath = path.join(resPath, file);
      console.log("filePath", filePath);
      if (path.extname(file) === ".txt") {
        // 将.txt文件转为字符串
        const res: string = readFile(filePath);
        console.log("res", res);
        if (res) result.push(res);
      }
    });
  });

  return result;
}
