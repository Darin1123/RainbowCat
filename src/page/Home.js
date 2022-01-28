import './Home.scss';
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {EMAIL, NAME, RECENT_ARTICLE_SIZE, TAB_TITLE} from "../config/config";
import {ArticleItem} from "../component/ArticleItem";
import {HOME_CATEGORIES, TOP_ARTICLES} from "../data/page/home";
import {ARTICLES} from "../data/core/articles";


export function Home() {

    useEffect(() => {
        document.title = `主页 - ${TAB_TITLE}`;
    }, []);

    return (
        <div className={'home'}>
            <div className={'full-width flex center space-between'}>
                <h2>置顶文章</h2>
            </div>
            <div className={'top-articles'}>
                {TOP_ARTICLES.map((item, key) => (
                    <Link key={key} to={`/article/${item.id}`} className={'top-article-item'}>
                        <img alt={item.img} src={`img/topArticles/${item.img}`}/>
                        <span className={'title'}>{item.title}</span>
                    </Link>
                ))}
            </div>

            <div className={'full-width flex center space-between'}>
                <h2>最近发布</h2>
                <Link to={'/articles/1'} className={'link'}>所有文章 →</Link>
            </div>
            <div>
                {ARTICLES.length === 0 && (
                    <div>暂时没有文章...</div>
                )}
                {ARTICLES.slice(0, RECENT_ARTICLE_SIZE).map((item, key) =>
                    <ArticleItem item={item} key={key}/>)}
            </div>

            <div className={'full-width flex center space-between'}>
                <h2>分类</h2>
                <Link to={'/categories'} className={'link'}>所有分类 →</Link>
            </div>
            <div className={'home-categories'}>
                {HOME_CATEGORIES.map((item, key) => (
                    <div className={'category'} key={key}>
                        <Link className={'category-logo'} to={`/category/${item.name}/page/1`}>
                            <img alt={item.name} src={`${item.img}`}/>
                        </Link>
                        <Link to={`/category/${item.name}/page/1`}>{item.name}</Link>
                    </div>
                ))}
            </div>

            <div className={'full-width flex center space-between'}>
                <h2>关于我</h2>
                <Link to={'/about'} className={'link'}>查看详情 →</Link>
            </div>
            <div>
                你好! 我是{NAME}.<br/>
                如有任何问题, 请使用 <a style={{color: '#000'}} href={`mailto:${EMAIL}`}>电子邮件</a> 联系我. ;-)
            </div>
        </div>
    );
}
