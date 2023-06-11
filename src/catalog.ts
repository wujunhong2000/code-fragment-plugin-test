import path = require("path");
const codeDirPath = path.resolve(__dirname, "./code");

// 搜索词和文件夹路径匹配（精确匹配） 
export type catalogItem = {
    key: string[] // 搜索词
    path: string // 搜索结果文件夹路径（该路径为最里层路径，规定该层不再包含文件夹），存储文件规定为.txt格式
}
const catalog: catalogItem[] = [
    {
        key: ['quick sort', '快速排序', '快速' ],
        path: codeDirPath + '\\sort\\bubble'
    },
    {
        key: ['bubble sort', '冒泡排序', '冒泡' ],
        path: codeDirPath + '\\sort\\quick'
    }
];
export default catalog;