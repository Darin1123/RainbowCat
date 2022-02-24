import './MomentItem.scss';
import {convertDateStr} from "../util/util";
import {LightgalleryItem, LightgalleryProvider} from "react-lightgallery";
import {useEffect, useState} from "react";


export function MomentItem(props) {

    let item = props.item;
    const [longContent, setLongContent] = useState(false);
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        let content = item.content;
        if (content.split('\n').length > 6) {
            setLongContent(true);
        }
    }, [item.content]);

    function firstNLines(message, n) {
        let lines = message.split('\n');
        if (lines.length < n) {
            return message;
        }
        let newMessage = '';
        for (let i = 0; i < n; i++) {
            if (i < n - 1) {
                newMessage += (lines[i] + '\n');
            } else {
                newMessage += lines[i];
            }
        }
        return newMessage;
    }


    return (
        <div className={`moment`}>
            <div className={`flex space-between center m-b-10`}>
                <b className={`text-20`}>{item.title}</b>
                <span className={`gray-text moment-date`}>
                                {convertDateStr(item.date)}
                            </span>
            </div>
            <div style={{whiteSpace: 'pre-line', lineHeight: '24px'}}>
                {(!longContent) && item.content}
                {(longContent) && (
                    (showAll) ? (
                        item.content
                    ) : (
                        firstNLines(item.content, 6)
                    )
                )}
                {(longContent) && (
                    <div style={{cursor: 'pointer', width: 'fit-content', textDecoration: 'underline', color: '#888'}} onClick={() => setShowAll(!showAll)}>{showAll ? '收起' : '展开'}</div>
                )}
            </div>
            <div className={`moment-tags`}>
                {item.tags.map((item, key) => (
                    <i key={key} onClick={() => props.filter(item)}>#{item}</i>
                ))}
            </div>
            {(item.images.length > 0) && (
                <div className={`moment-images`}>
                    {(item.images.length === 1) && (
                        <div className={`single-image`}>
                            <LightgalleryProvider>
                                <LightgalleryItem
                                    group={item.images[0]}
                                    src={`img/moments/${item.images[0]}`}>
                                    <img src={`img/moments/${item.images[0]}`}
                                         alt={`${item.images[0]}`}
                                         width={'100%'}/>
                                </LightgalleryItem>
                            </LightgalleryProvider>
                        </div>
                    )}
                    {(item.images.length > 1) && (
                        <div className={`multiple-images`}>
                            <LightgalleryProvider>
                                {item.images.map((item, key) => (
                                    <LightgalleryItem
                                        group={'group'}
                                        key={key}
                                        src={`img/moments/${item}`}>
                                        <div className={`container`} key={key}>
                                            <img src={`img/moments/${item}`}
                                                 alt={`${item}`}/>
                                        </div>
                                    </LightgalleryItem>
                                ))}
                            </LightgalleryProvider>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}
