import {HashRouter, Link} from "react-router-dom";
import {SHOW_IMAGES, TAB_TITLE} from "../config/config";
import $ from "jquery";
import {SearchBar} from "./SearchBar";
import {useEffect, useState} from "react";
import './NavBar.scss';
import {ARTICLES} from "../data/core/articles";
import {CATEGORIES} from "../data/core/categories";


export default function NavBar() {

    const [showSearchBar, setShowSearchBar] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)


    function toggleNav() {
        setToggleMenu(!toggleMenu);
    }

    async function handleOpenSearchBar() {
        await setShowSearchBar(true);
        $("#search-input").focus();
    }

    useEffect(() => {
        const changeWidth = () => {
            let width = window.innerWidth;
            if (width > 500) {
                setToggleMenu(false);
            }
            setScreenWidth(width);
        }

        window.addEventListener('resize', changeWidth)
    }, []);

    return (
        <nav>
            <HashRouter>
                <div className={'container'}>
                    {screenWidth <= 500 &&
                    <Link to={'/'} className={'back-up-title'}>
                        {TAB_TITLE}
                    </Link>}
                    {(toggleMenu || screenWidth > 500) &&
                    <div className={'nav-main'}>
                        <Link to={'/'} className={'title'}>
                            {TAB_TITLE}
                        </Link>
                        <div className={'nav-items'}>
                            <Link className={'btn m-r-20'}
                                  onClick={() => setToggleMenu(false)}
                                  to={'/articles/1'}>
                                所有文章 ({ARTICLES.length})
                            </Link>
                            <Link className={'btn m-r-20'}
                                  onClick={() => setToggleMenu(false)}
                                  to={'/categories'}>
                                分类 ({CATEGORIES.length})
                            </Link>

                            {SHOW_IMAGES &&
                            <Link className={'btn m-r-20'}
                                  onClick={() => setToggleMenu(false)}
                                  to={'/images'}>
                                图库
                            </Link>}


                            <Link className={'nav-main-item'}
                                  onClick={() => setToggleMenu(false)}
                                  to={'/about'}>关于</Link>
                            {screenWidth <= 500 &&
                            <span className={'back-up-search'}
                                 onClick={handleOpenSearchBar}>
                                搜索
                            </span>}
                        </div>
                    </div>}
                    {(screenWidth > 500) &&
                    <div className={'search'}
                         onClick={handleOpenSearchBar}>搜索</div>}
                </div>

                <div className={'menu-button'}
                     onClick={toggleNav}>{toggleMenu ? '关闭' : '菜单'}</div>

                {showSearchBar &&
                    <SearchBar setToggleMenu={setToggleMenu} setShowSearchBar={setShowSearchBar}/>}
            </HashRouter>
        </nav>
    );
}
