import {LightgalleryItem, LightgalleryProvider} from "react-lightgallery";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {okaidia} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {string2date} from "../util/util";


/* 基本配置 */
export const SIZE = 10  // 单页文章数量
export const RECENT_ARTICLE_SIZE = 5  // 最近发布文章数量
export const NAME = 'XXX'  // 你的名字
export const NAME_IN_ENGLISH = `XXX`  // 英文名
export const TAB_TITLE = `${NAME}的博客`  // 网页标签标题, 博客主页标题
export const EMAIL = 'foo@bar.com'  // 联系方式 - 邮箱
export const SEARCH_ARTICLE_TITLE_LENGTH = 32  // 搜索框
export const MY_PASSWORD = ``  // 用于进入编辑页面等直接获取 markdown 代码的页面

/* 其他信息 */
// 创办日期. 格式: YYYY-MM-DD
export const LAUNCH_DATE = string2date(`2021-01-03`);

/* 页面配置 */
export const SHOW_IMAGES = true;

/* 特殊的文章规则 */
export const CUSTOM_MARKDOWN = {
    // p tag
    p: ({node, children}) => {
        // img tag
        if (node.children[0].tagName === "img") {
            const image = node.children[0];
            return (
                <div className="image">
                    <LightgalleryProvider>
                        <LightgalleryItem
                            group={image.properties.alt}
                            src={`${image.properties.src}`}>
                            <img src={`${image.properties.src}`}
                                 alt={image.properties.alt}
                                 width={'100%'}/>
                        </LightgalleryItem>
                    </LightgalleryProvider>
                </div>
            );
        }

        // a tag
        if (node.children[0].tagName === "a") {
            const a = node.children[0];
            return (
                <a href={a.properties.href}
                   rel="noreferrer"
                   target={'_blank'}>
                    {a.children[0].value}
                </a>
            );
        }

        // Return default child otherwise
        return <p>{children}</p>;
    },
    code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={okaidia}
                language={match[1]}
                PreTag="div"
                {...props}
            />
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    },
}
