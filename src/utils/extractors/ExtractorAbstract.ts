import { getConfig, getSearchURL } from "../../config";
import { FetchPageResult, fetchPageTextContent } from "../fetchPageContent";

export default abstract class ExtractorAbstract {
  abstract name: string;
  abstract URL: string;

  isEnabled() {
    const config = getConfig();
    return this.URL in config.settings.sites && config.settings.sites[this.URL];
  }

  // 从谷歌搜索结果返回源url列表
  extractURLFromKeyword = (keyword: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      fetchPageTextContent(getSearchURL(this.URL, keyword))
        .then((rs) => {
          const regex = new RegExp(`(https://${this.URL}/[a-z0-9-/]+)`, "gi");
          let urls = rs.textContent.match(regex);
          urls &&
            (urls = urls.filter((url, i, list) => list.indexOf(url) === i));
          resolve(urls || []);
        })
        .catch(reject);
    });
  };

  // 从URL内容中提取片段
  abstract extractSnippets: (options: FetchPageResult) => SnippetResult[];
}

export type SnippetResult = {
  votes: number;
  code: string;
  hasCheckMark: boolean;
  sourceURL: string;
};

export type SnippetPageResult = {
  results: SnippetResult[];
  url: string;
};
