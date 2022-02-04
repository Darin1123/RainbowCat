import './App.scss';
import './css/util.scss';
import {Route, HashRouter} from "react-router-dom";
import {Articles} from "./page/Articles";
import {Article} from "./page/Article";
import {Categories} from "./page/Categories";
import {About} from "./page/About";
import {SingleCategory} from "./page/SingleCategory";
import {Switch} from "react-router";
import {SearchResult} from "./page/SearchResult";
import {PageNotFound} from "./page/PageNotFound";
import {Editor} from "./page/admin/Editor";
import {Home} from "./page/Home";
import NavBar from "./component/NavBar";
import {SearchCategory} from "./page/SearchCategory";
import {Images} from "./page/admin/Images";
import {MY_PASSWORD, NAME_IN_ENGLISH} from "./config/config";
import {EncryptPassword} from "./page/admin/EncryptPassword";
import React, {useState} from "react";
import AdminNavBar from "./component/admin/AdminNavBar";
import {sha256} from "js-sha256";
import {Dashboard} from "./page/admin/Dashboard";
import {AdminPageNotFound} from "./page/admin/AdminPageNotFound";
import {AdminArticles} from "./page/admin/AdminArticles";
import {Edit} from "./page/admin/Edit";
import {AdminSearchResult} from "./page/admin/AdminSearchResult";
import {ObserveDate} from "./page/admin/ObserveDate";
import {AdminAbout} from "./page/admin/AdminAbout";
import {AdminCategories} from "./page/admin/AdminCategories";

function App() {

    const [adminVerified, setAdminVerified] = useState(false);
    const [adminPassword, setAdminPassword] = useState(``);
    const [authenticationErrorMessage, setAuthenticationErrorMessage] = useState(null);

    function authenticate() {
        if (MY_PASSWORD === '') {
            setAdminVerified(true);
            document.location.hash = '/admin/dashboard';
            return;
        }

        if (adminPassword.trim().length === 0) {
            setAuthenticationErrorMessage(null);
            setAdminPassword(``);
            return;
        }
        if (sha256(adminPassword) === MY_PASSWORD) {
            setAdminVerified(true);
            document.location.hash = '/admin/dashboard'
        } else {
            setAuthenticationErrorMessage(`错误的密码`);
        }
    }

    function handleOnKeyDown(e) {
        if (e.key === 'Enter') {
            authenticate();
        }
    }

    return (
        <div className="App">
            <HashRouter>
                <Switch>
                    <Route path={`/admin`}>
                        {(adminVerified) && (
                            <React.Fragment>
                                <AdminNavBar/>
                                <main>
                                    <Switch>
                                        <Route path={`/admin/dashboard`}>
                                            <Dashboard/>
                                        </Route>
                                        <Route path={'/admin/articles/:page'} exact={true}>
                                            <AdminArticles/>
                                        </Route>
                                        <Route path={'/admin/edit/:id'}>
                                            <Edit/>
                                        </Route>
                                        <Route path={'/admin/categories'}>
                                            <AdminCategories/>
                                        </Route>
                                        <Route path={'/admin/editor'}>
                                            <Editor/>
                                        </Route>
                                        <Route path={'/admin/images'}>
                                            <Images/>
                                        </Route>
                                        <Route path={'/admin/date/:date/page/:page'}>
                                            <ObserveDate/>
                                        </Route>
                                        <Route path={'/admin/password'}>
                                            <EncryptPassword/>
                                        </Route>
                                        <Route path={'/admin/about'}>
                                            <AdminAbout/>
                                        </Route>
                                        <Route path={'/admin/search/:keyword/page/:page'}>
                                            <AdminSearchResult/>
                                        </Route>
                                        <Route>
                                            <AdminPageNotFound/>
                                        </Route>
                                    </Switch>
                                </main>
                            </React.Fragment>
                        )}
                        {(!adminVerified) && (
                            <div className={`admin-authentication`}>
                                <h2>请输入密码</h2>
                                {authenticationErrorMessage !== null && (
                                    <span className={`error-message`}>
                                        {authenticationErrorMessage}
                                    </span>
                                )}
                                <input onKeyDown={handleOnKeyDown}
                                       type={`password`}
                                       placeholder={`请输入密码...`}
                                       onChange={(e) => setAdminPassword(e.target.value)}/>
                                <div className={`confirm-button`} onClick={authenticate}>确认</div>
                            </div>
                        )}
                    </Route>
                    <Route>
                        <React.Fragment>
                            <NavBar/>
                            <main>
                                <Switch>
                                    <Route path={'/'} exact={true}>
                                        <Home/>
                                    </Route>
                                    <Route path={'/articles/:page'} exact={true}>
                                        <Articles/>
                                    </Route>
                                    <Route path={'/categories'}>
                                        <Categories/>
                                    </Route>
                                    <Route path={'/category/:category/page/:page'}>
                                        <SingleCategory/>
                                    </Route>
                                    <Route path={'/about'}>
                                        <About/>
                                    </Route>
                                    <Route path={'/article/:id'}>
                                        <Article/>
                                    </Route>
                                    <Route path={'/search/:keyword/page/:page'}>
                                        <SearchResult/>
                                    </Route>
                                    <Route path={'/search-category/:keyword'}>
                                        <SearchCategory/>
                                    </Route>
                                    <Route>
                                        <PageNotFound/>
                                    </Route>
                                </Switch>
                            </main>
                        </React.Fragment>
                    </Route>
                </Switch>
            </HashRouter>


            <footer>
                <div className={'m-b-5'}>
                    Proudly powered by <a href={'https://github.com/Darin1123/RainbowCat'}>🌈🐱</a>.&nbsp;
                    由&nbsp;
                    <a className={"text-link"}
                       href={"https://pages.github.com/"} target="_blank" rel="noreferrer">Github Pages</a>
                    &nbsp;托管.
                </div>
                <div>Copyright © {new Date().getFullYear()} {NAME_IN_ENGLISH}. 保留所有权利.</div>
            </footer>
        </div>
    );
}

export default App;
