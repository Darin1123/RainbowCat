import './About.scss';
import {useEffect} from "react";
import {TAB_TITLE} from "../config/config";
import {ABOUT} from "../data/page/about";
import {ArticleMain} from "../component/ArticleMain";

export function About() {

    useEffect(() => {
        document.title = `关于 - ${TAB_TITLE}`
    }, []);

    return (
        <div className={'about'}>
            <h2>关于</h2>
            {(ABOUT.length === 0) && (
                <div>什么也没有写...</div>
            )}
            {(ABOUT.length > 0) && (
                <ArticleMain content={ABOUT}/>
            )}
        </div>
    );
}
