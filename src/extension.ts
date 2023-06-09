import * as vscode from 'vscode';
import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';
import { searchJsonFiles } from './utils/fileSearch';


export function activate(_: vscode.ExtensionContext) {

    const provider: vscode.CompletionItemProvider = {
        // @ts-ignore
        provideInlineCompletionItems: async (document, position, context, token) => {
            // 获取光标前的文本
            const textBeforeCursor = document.getText(
                new vscode.Range(position.with(undefined, 0), position)
            );
            // 匹配搜索短语
            const match = matchSearchPhrase(textBeforeCursor);
            let items: any[] = [];
            if (match) {
                // 从文件夹进行搜索
                // const result = searchJsonFiles(undefined, match.search);
                // items = result.map(item => {
                //     const output = `\n${item}`;
                //     return {
                //         text: output,
                //         insertText: output,
                //         range: new vscode.Range(position.translate(0, output.length), position)
                //     };
                // })
                // if(items.length === 0) vscode.window.showErrorMessage('未匹配到数据');

                // google和stackoverflow搜索
                let rs;
                try {
                    rs = await search(match.searchPhrase);
                    if (rs) {
                        items = rs.results.map(item => {
                            const output = `\n${item.code}`;
                            return {
                                text: output,
                                insertText: output,
                                range: new vscode.Range(position.translate(0, output.length), position)
                            };
                        });
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
            }
            return {items}
        },
    };

    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
}
