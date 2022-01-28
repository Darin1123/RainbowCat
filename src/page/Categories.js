import './Categories.scss';
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {TAB_TITLE} from "../config/config";
import {CATEGORIES} from "../data/core/categories";

export function Categories() {
    useEffect(() => {
        document.title = `分类 - ${TAB_TITLE}`;
    }, []);

    return (
        <div className={'categories'}>
            <h2>分类</h2>
            {CATEGORIES.length === 0 && (
                <div>没有分类...</div>
            )}
            {CATEGORIES.map((item, key) =>
                <div className={'category-item'}
                     key={key}>
                    <Link to={`/category/${item}/page/1`}>{`${item} →`}</Link>
                </div>)}
        </div>
    )
}
