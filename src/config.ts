import * as vscode from 'vscode';

const CSConfig = {
    SEARCH_PATTERN: /(\/\/|#|--|<!--)\s?find\s?(.+)\s?(\.|-->)/
};

export function getSearchURL(site: string, keyword: string) {
    return `https://www.google.com/search?q=site%3A${site}+${keyword.replace(/\s/g, "+")}`;
}

type IConfig = {
    settings: {
        sites: { [name: string]: boolean },
        maxResults: number
    }
}

// Get the extension configuration 获取扩展配置
export function getConfig() {
    const config = vscode.workspace.getConfiguration("captainStack");

    // Get the sites configuration
    const sites = {
        "stackoverflow.com": config.settings.sites.stackoverflow,
    };

    // Return the configuration
    return {
        settings: {
            sites,
            maxResults: config.settings.maxResults
        }
    } as IConfig;
}

export default CSConfig;
