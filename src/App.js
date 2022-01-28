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
import {Editor} from "./page/Editor";
import {Home} from "./page/Home";
import NavBar from "./component/NavBar";
import {SearchCategory} from "./page/SearchCategory";
import {Edit} from "./page/Edit";
import {Images} from "./page/Images";
import {NAME_IN_ENGLISH, SHOW_IMAGES} from "./config/config";

function App() {

  return (
      <div className="App">
        <NavBar/>

        <main>
          <HashRouter>
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
              <Route path={'/editor'}>
                <Editor/>
              </Route>
              <Route path={'/edit/:id'}>
                <Edit/>
              </Route>
              {SHOW_IMAGES &&
                  <Route path={'/images'}>
                    <Images/>
                  </Route>}
              <Route>
                <PageNotFound/>
              </Route>
            </Switch>
          </HashRouter>
        </main>

        <footer>
          <div className={'m-b-5'}>
            Powered by <a href={'https://github.com/Darin1123/RainbowCat'}>Rainbow Cat</a>.&nbsp;
          </div>
          <div>Copyright © {new Date().getFullYear()} {NAME_IN_ENGLISH}. 保留所有权利.</div>
        </footer>
      </div>
  );
}

export default App;
