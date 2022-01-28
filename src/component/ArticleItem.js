import {Link} from "react-router-dom";
import './ArticleItem.scss';

export function ArticleItem(props) {
    let item = props.item
    return (
        <div className={'article-item'}>
            <div className={'flex full-width space-between'}>
                <div className={'flex center'}>
                    <Link className={'m-r-20 text-14'} to={`/article/${item.id}`}>
                        {item.title}
                    </Link>
                    {item.category !== null &&
                        <Link className={'text-12 category-link'} to={`/category/${item.category}/page/1`}>
                            {item.category} →
                        </Link>}
                </div>
                <div className={'time'}>
                    {`${item.date.year} 年 ${item.date.month} 月 ${item.date.day} 日 `}
                </div>
            </div>
            <div className={'peek'}>
                {item.peek !== null ? item.peek : '如题所示'}...
            </div>
        </div>
    );
}
