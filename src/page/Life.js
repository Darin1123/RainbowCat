import './Life.scss';
import {useEffect, useState} from "react";
import {NOTE_SIZE, TAB_TITLE} from "../config/config";
import {NOTES} from "../data/core/notes";
import InfiniteScroll from "react-infinite-scroll-component";
import {convertDateStr} from "../util/util";
import {LightgalleryItem, LightgalleryProvider} from "react-lightgallery";

export function Life() {

    const [selectedNotes, setSelectedNotes] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const loader = (
        <div className={`m-t-20`}>
            加载中...
        </div>
    );

    const endMessage = (
        <div className={`flex-column center`} style={{borderTop: '1px solid #ccc', paddingTop: '20px'}}>
            <i>后面没有了...</i>
        </div>
    );

    function loadMore() {
        let newItems = NOTES.slice(selectedNotes.length, selectedNotes.length + NOTE_SIZE);
        setSelectedNotes([...selectedNotes, ...newItems]);
        if (selectedNotes.length === NOTES.length) {
            setHasMore(false);
        }
    }

    useEffect(() => {
        document.title = `小记 - ${TAB_TITLE}`;
        if (NOTES.length > 0) {
            setSelectedNotes(NOTES.slice(0, NOTE_SIZE));
        } else {
            setHasMore(false);
        }
    }, [])

    return (
        <div className={`life`}>
            <h2>小记</h2>
            <InfiniteScroll
                next={loadMore}
                hasMore={hasMore}
                endMessage={endMessage}
                loader={loader}
                dataLength={selectedNotes.length}>
                {selectedNotes.map((item, key) => (
                    <div key={key} className={`note`}>
                        <div className={`flex space-between center m-b-10`}>
                            <b className={`text-14`}>{item.title}</b>
                            <span className={`gray-text note-date`}>
                                {convertDateStr(item.date)}
                            </span>
                        </div>
                        <div style={{whiteSpace: 'pre-line'}}>
                            {item.content}
                        </div>
                        <div className={`note-tags`}>
                            {item.tags.map((item, key) => (
                                <span key={key}>#{item}</span>
                            ))}
                        </div>
                        {(item.images.length > 0) && (
                            <div className={`note-images`}>
                                {(item.images.length === 1) && (
                                    <div className={`single-image`}>
                                        <LightgalleryProvider>
                                            <LightgalleryItem
                                                group={item.images[0]}
                                                src={`img/life/${item.images[0]}`}>
                                                <img src={`img/life/${item.images[0]}`}
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
                                                    <div className={`container`} key={key}>
                                                        <LightgalleryItem
                                                            group={item}
                                                            src={`img/life/${item}`}>
                                                            <img src={`img/life/${item}`}
                                                                 alt={`${item}`}/>
                                                        </LightgalleryItem>
                                                    </div>
                                                ))}
                                        </LightgalleryProvider>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}
