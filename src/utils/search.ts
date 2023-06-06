import SnippetExtractors from "./extractors";
import { SnippetResult } from "./extractors/ExtractorAbstract";
import { FetchPageResult, fetchPageTextContent } from "./fetchPageContent";
import * as vscode from "vscode";
import { getConfig } from "../config";

//  缓存结果以避免VSCode不断重新抓取
const cachedResults: { [keyword: string]: SnippetResult[] } = {};

// 发送搜索查询到谷歌，从stackoverflow得到答案
// 然后提取并返回代码结果
export async function search(
  keyword: string
): Promise<null | { results: SnippetResult[] }> {
  if (keyword in cachedResults) {
    return Promise.resolve({ results: cachedResults[keyword] });
  }
  const config = getConfig();

  /* eslint "no-async-promise-executor": "off" */
  const promise = new Promise<{ results: SnippetResult[] }>(
    async (resolve, reject) => {
      let results: SnippetResult[] = [];
      let fetchResult: FetchPageResult;
      try {
        for (const i in SnippetExtractors) {
          const extractor = SnippetExtractors[i];
          if (extractor.isEnabled()) {
            const urls = await extractor.extractURLFromKeyword(keyword);
            for (const y in urls) {
              fetchResult = await fetchPageTextContent(urls[y]);
              results = results.concat(extractor.extractSnippets(fetchResult));
              console.log(
                "🚀 ~ file: search.ts:50 ~ promise ~ results:",
                results
              );
              vscode.window.setStatusBarMessage(
                `${extractor.name} (${y}/${urls.length}): ${results.length} results`,
                2000
              );
              if (results.length >= config.settings.maxResults) {
                break;
              }
            }
            if (results.length >= config.settings.maxResults) {
              break;
            }
          }
        }
        cachedResults[keyword] = results;
        resolve({ results });
      } catch (err) {
        reject(err);
      }
      // 显示完成加载5秒
      vscode.window.setStatusBarMessage(
        `StarMoonSnippets: 结束加载 ${results.length} 结果`
      );
    }
  );
  vscode.window.setStatusBarMessage(
    `StarMoonSnippets: 等待代码片段查询结果...`,
    promise
  );
  return promise;
}


