import CSConfig from "../config";
import { window } from "vscode";


type SearchMatchResult = {
    commentSyntax: string,
    commentSyntaxEnd: string,
    searchPhrase: string,
    search: string,
}

/**
 * Match the giving string with search pattern
 * 将给定字符串与搜索模式匹配
 * @param {string} input
 * @returns {SearchMatchResult | undefined} if found, return the search phrase, comment's opening and closing syntax 如果找到，返回搜索短语、评论的开始和结束语法
 */
export function matchSearchPhrase(input: string): SearchMatchResult | undefined {
    const match = CSConfig.SEARCH_PATTERN.exec(input);

    if (match && match.length > 2) {
        
        const [_, commentSyntax, searchPhrase, commentSyntaxEnd] = match;

        let fileType = window.activeTextEditor.document.languageId;

        if (fileType === "plaintext") {
            fileType = "";
        }
        
        return {
            commentSyntax,
            commentSyntaxEnd,
            searchPhrase: `${searchPhrase} ${fileType}`,
            search: searchPhrase,
        };
    }

    return undefined;
}