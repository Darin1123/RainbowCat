import './Article.scss';
import {useParams} from "react-router";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import {Link} from "react-router-dom";
import 'katex/dist/katex.min.css';
import remarkGfm from 'remark-gfm';
import {useEffect} from "react";
import "lightgallery.js/dist/css/lightgallery.css";
import {LightgalleryItem, LightgalleryProvider} from "react-lightgallery";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {okaidia} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {TAB_TITLE} from "../config/config";
import '../css/markdown.scss';
import rehypeRaw from 'rehype-raw';
import {ARTICLES} from "../data/core/articles";


export function Article() {
    const {id} = useParams();
    const result = ARTICLES.filter(item => item.id === id);
    let article = result[0];

    useEffect(() => {
        if (article !== undefined) {
            document.title = `正在阅读: ${article.title} - ${TAB_TITLE}`
        }
    }, [article]);

    if (result.length !== 1) {
        return (
            <div className={'article'}>
                文章加载失败.
            </div>
        );
    }

    return (
        <div className={'article auto-wrap'}>
            <div className={`article-top`}>
                <div className={'crumbs'}>
                    {article.category !== null && <span>
                    <Link className={'underline'} to={`/categories`}>分类</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
                        <Link className={'underline'} to={`/category/${article.category}/page/1`}>{article.category}</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
                </span>}
                    <span>
                    {article.title}
                </span>
                </div>

                <Link to={`/edit/${article.id}`}>编辑</Link>
            </div>
            <article>
                <h1>{article.title}</h1>
                <ReactMarkdown
                    components={{
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
                        }
                    }}
                    children={article.content}
                    remarkPlugins={[remarkMath, remarkGfm]}
                    rehypePlugins={[rehypeKatex, rehypeRaw]}
                />
            </article>
        </div>
    );
}
