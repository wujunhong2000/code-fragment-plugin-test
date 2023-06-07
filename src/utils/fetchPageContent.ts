import fetch from "node-fetch";

export type FetchPageResult = {
    textContent: string,
    url: string
}

export function fetchPageTextContent(url: string): Promise<FetchPageResult> {
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(rs => {
                console.log('rsssssssssssss66', rs);
                return rs.text();
            })
            .then(textContent => {
                console.log('textContent', textContent);
                
                resolve({textContent, url});
            })
            .catch(reject);
    });
}