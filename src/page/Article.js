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

    let article = null;
    let prevArticle = null;
    let nextArticle = null;
    ARTICLES.forEach(function (item, index) {
        if (item.id === id) {
            article = item;
            if (index > 0) {
                prevArticle = {
                    id: ARTICLES[index - 1].id,
                    title: ARTICLES[index - 1].title
                }
            }

            if (index < ARTICLES.length - 1) {
                nextArticle = {
                    id: ARTICLES[index + 1].id,
                    title: ARTICLES[index + 1].title
                }
            }
        }
    });

    useEffect(() => {
        if (article !== null) {
            document.title = `正在阅读: ${article.title} - ${TAB_TITLE}`
        }
    }, [article]);

    if (article === null) {
        return (
            <div className={'article'}>
                <h3>出错了</h3>
                该文章不存在...
            </div>
        );
    }

    return (
        <div className={'article auto-wrap'}>
            <div className={`article-top`}>
                <div className={'crumbs'}>
                    {article.category !== null && (
                        <span>
                            <Link className={'underline'} to={`/categories`}>分类</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
                            <Link className={'underline'} to={`/category/${article.category}/page/1`}>{article.category}</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
                        </span>)}

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
            <div className={`prev-next`}>
                {(prevArticle !== null) && (
                    <Link to={`/article/${prevArticle.id}`}>上一篇: {prevArticle.title}</Link>
                )}
                {(prevArticle === null) && (
                    <span>没有了...</span>
                )}
                {(nextArticle !== null) && (
                    <Link to={`/article/${nextArticle.id}`}>下一篇: {nextArticle.title}</Link>
                )}
                {(nextArticle === null) && (
                    <span>没有了...</span>
                )}
            </div>
        </div>
    );
}
