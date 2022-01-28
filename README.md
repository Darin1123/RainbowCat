# 彩虹猫 🌈🐱

> 2022 年 1 月 28 日

## 简介

彩虹猫是一个博客系统的前端. 这个博客系统使用 [React](https://zh-hans.reactjs.org/) 编写的. 之所以仅仅只有前端是因为有很多资源提供免费的静态部署.

**使用前提**

用户熟悉如何使用 markdown 编写文章.



## 示例

您可以通过 [https://darin1123.github.io/myblog](https://darin1123.github.io/myblog) 来访问项目作者的博客.



## 数据

**1. 文章数据**

在 /src/data/core/articles.js 中添加您的文章.

文章数据格式

```js
{
    id: '唯一的id',
    title: '文章标题',
    category: ``,  # 和 /src/data/core/categories 中的数据对应, 区分大小写
    date: {
        year: 2022,
        month: 1,
        day: 1 
    },
    peek: ``, 
    content: ``
}
```

> 如何快速生成如上代码? 项目运行后, 访问 xxx/#/editor 来打开编辑页面.

**2. 分类数据**

在 /src/data/core/categories.js 中添加分类

/src/data/coreData.js 中是一个包含了所有类别的数组. 类别为字符串类型.

**3. 图片**

所有的图片放在 /public/img 目录下. 在文章中请使用 markdown 的图片语法.

具体做法如下: 假设有一张名为 happy.png 的图片, 那么在文章中应该写成

```md
![图片名称](img/happy.png)
```

如果你想要显示图片页面, 在 /src/data/core/images.js 中添加图片路径 .

例:

```js
export const IMAGES = [
    {
        path: `img/articleImages/`,
        items: [`fullscreen-dock-wont-hide.png`]
    },
    {
        path: 'img/homeCategories/',
        items: [`algo.png`, `Haskell.svg`]
    },
    {
        path: `img/topArticles/`,
        items: [`jvm.jpeg`]
    }
];
```

**页面数据**

*主页*

在 src/data/page/home.js 中, 添加数据. 例:

```js
// 置顶文章信息
export const TOP_ARTICLES = [
  {
    id: "18f36afa-bd78-4cc7-a068-dbc21dc81d74",
    title: "大学",
    img: "img/topArticles/大学.png"
  },
];

// 主页展示分类信息
export const HOME_CATEGORIES = [
	{
    name: 'Java',
    img: 'img/homeCategories/java.svg'
  },
];
```

*关于页*

```js
export const ABOUT = "";  // 详见代码示例
```



**小结 - 数据清单**

> 有 * 代表是可选项

*主要数据*

| 内容   | 位置                        |
| ------ | --------------------------- |
| 文章   | src/data/core/articles.js   |
| 分类   | src/data/core/categories.js |
| 图片*  | src/data/core/images.js     |
| 主页   | src/data/page/home.js       |
| 关于页 | src/data/page/about.js      |

*其他数据 \**

| 内容          | 位置                        | 说明                    |
| ------------- | --------------------------- | ----------------------- |
| index.html    | public/index.html           | meta-data               |
| markdown.scss | src/data/core/categories.js | 自定义文章样式          |
| config.js     | src/config/config.js        | 系统配置 (包含基础信息) |


## 部署

部署 React App 可以查看 [这里](https://create-react-app.dev/docs/deployment/).


## 注意事项

**`npm install` 报错**

在进行 `npm install` 的过程中, 可能会发生错误. 这是因为 `react-lightgallery` 库的版本问题导致的. 所以在运行 `npm install` 之前, 先使用以下单独安装 `react-lightgallery`:

```bash
npm install react-lightgallery --force
```

**代码高亮**

在编写 markdown 文章中的代码部分时, 请将标编程语言用小写标记, 如:

~~~markdown
```java
public class {
    ...
}
```
~~~

注意这里 \`\`\` 后的 java 全部都是小写的.
