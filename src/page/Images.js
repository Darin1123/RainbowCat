import {useEffect, useState} from "react";
import {MY_PASSWORD, TAB_TITLE} from "../config/config";
import './Images.scss';
import {IMAGES} from "../data/page/images";
import {LightgalleryItem, LightgalleryProvider} from "react-lightgallery";


export function Images() {

    const [verified, setVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inputPassword, setInputPassword] = useState(``);
    const [selectedPath, setSelectedPath] = useState(null);
    const [images, setImages] = useState([]);

    function handleOnKeyDown(e) {
        if (e.key === 'Enter') {
            handleCheck();
        }
    }

    function handleCheck() {
        if (inputPassword === MY_PASSWORD) {
            setVerified(true);
        } else {
            setErrorMessage("错误的密码 :-(");
        }
    }

    function selectPath(path) {
        setSelectedPath(path);
        let images = IMAGES.filter(item => item.path === path);
        if (images.length === 1) {
            setImages(images[0].items);
        }
    }

    useEffect(() => {
        if (verified) {
            document.title = `图片库 - ${TAB_TITLE}`;
        } else {
            document.title = `请输入密码 - ${TAB_TITLE}`;
        }
    }, [verified]);

    return (
        <div className={'images'}>
            {!verified && <div className={'images-verify-container'}>
                <h3>输入密码</h3>
                {errorMessage !== null && (<div className={'error-message'}>
                    {errorMessage}
                </div>)}
                <div>
                    <input placeholder={'请输入密码'}
                           onKeyDown={handleOnKeyDown}
                           onChange={e => setInputPassword(e.target.value)} type={'password'}/>
                </div>
                <div className={'edit-verify-button'} onClick={handleCheck}>确认</div>
            </div>}

            {verified && (
                <div className={`image-main`}>
                    <h2>
                        图库 {selectedPath !== null && (<span> - `{selectedPath}`</span>)}
                    </h2>
                    {(IMAGES.length > 0 && selectedPath === null) && (
                        <div>
                            <b>选择目录</b>
                            <div className={`paths`}>
                                {IMAGES.map((item, key) => (
                                    <div key={key}
                                         onClick={() => selectPath(item.path)}
                                         className={`path`}>{item.path}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    {(IMAGES.length === 0) && (
                        <div>
                            没有内容...
                        </div>
                    )}

                    {(IMAGES.length > 0 && selectedPath !== null) && (
                        <div className={`images-main`}>
                            <div className={`pointer`} onClick={() => setSelectedPath(null)}>← 返回</div>
                            <div className={`content`}>
                                <LightgalleryProvider>
                                    {images.map((item, key) => (
                                        <LightgalleryItem src={`${selectedPath}${item}`} key={key} group={`${selectedPath}`}>
                                            <img key={key} src={`${selectedPath}${item}`} alt={`${selectedPath}${item}`}/>
                                        </LightgalleryItem>
                                    ))}
                                </LightgalleryProvider>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
