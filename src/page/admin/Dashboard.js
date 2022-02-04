import './Dashboard.scss';
import {ARTICLES} from "../../data/core/articles";
import {CATEGORIES} from "../../data/core/categories";
import {LAUNCH_DATE, TAB_TITLE} from "../../config/config";
import {compareDates, convertDate, convertMonth, getArticleDate, dayOfWeek, getDays, getLevel} from "../../util/util";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export function Dashboard() {

    const [calendar, setCalendar] = useState([]);
    const [launchedDays, setLaunchedDays] = useState(0);
    const [calendarMonths, setCalendarMonths] = useState([]);

    const [residual, setResidual] = useState(0);

    function generateCalendarData() {
        const today = new Date();
        let days = dayOfWeek(today);
        setResidual(days);
        let calendarDays = getDays(today, days);
        let endDate = new Date();
        endDate.setDate(today.getDate() - days);
        calendarDays = calendarDays.concat(getDays(endDate, 7 * 52)).reverse();


        let months = [];
        let month = -1;
        let N = calendarDays.length;
        for (let i = 0; i < N; i += 7) {
            if ((i + 6) > N - 1) {
                break;
            }
            let ms = calendarDays[i].getMonth();
            let me = calendarDays[i + 6].getMonth();
            if (me === ms && ms !== month) {
                months.push(ms);
                month = ms;
            } else {
                months.push(-1);
            }
        }

        setCalendarMonths(months);

        let calendar = [];

        // when no articles in the system
        if (ARTICLES.length === 0) {
            for (let i = 0; i < calendarDays.length; i++) {
                calendar.push({
                    date: calendarDays[i],
                    count: 0
                });
            }
            setCalendar(calendar);
            return;
        }

        let ARTICLES_REVERSED = ARTICLES.slice().reverse();

        let data = new Map();
        let dt = getArticleDate(ARTICLES_REVERSED[0]);
        let count = 1;
        for (let i = 1; i < ARTICLES_REVERSED.length; i++) {
            if (compareDates(getArticleDate(ARTICLES_REVERSED[i]), dt) === 0) {
                count++;
            } else {
                data.set(`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`, count);
                count = 1;
                dt = getArticleDate(ARTICLES_REVERSED[i]);
            }
        }
        data.set(`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`, count);

        for (let i = 0; i < calendarDays.length; i++) {
            let date = calendarDays[i];
            let count = data.get(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
            if (count !== undefined) {
                calendar.push({
                    date: date,
                    count: count
                })
            } else {
                calendar.push({
                    date: date,
                    count: 0
                })
            }
        }
        setCalendar(calendar);
    }

    useEffect(() => {
        document.title = `后台管理 - 仪表盘 - ${TAB_TITLE}`;
        setLaunchedDays(parseInt((new Date().getTime() - LAUNCH_DATE.getTime()) / (1000 * 3600 * 24)));
        generateCalendarData();
    }, [])


    function determineMessageClass(key) {
        if (key < 28) {
            return `left-message`;
        }
        if (key > (calendar.length - residual - 7 * 3)) {
            return `right-message`;
        }
        return 'center-message';
    }

    function renderCalendarItem(item, key) {
        if (item.count > 0) {
            return (
                <Link key={key} to={`/admin/date/${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}/page/1`}
                      className={`calendar-item level-${getLevel(item.count)}`} style={{cursor: `pointer`}}>
                    <div className={`calendar-item-message ${determineMessageClass(key)}`}>
                        {convertDate(item.date)} 共 {item.count} 篇文章
                    </div>
                </Link>
            );
        } else {
            return (
                <div key={key}
                     className={`calendar-item level-${getLevel(item.count)}`}>
                    <div className={`calendar-item-message ${determineMessageClass(key)}`}>
                        {convertDate(item.date)} 共 {item.count} 篇文章
                    </div>
                </div>
            );
        }
    }

    return (
        <div className={`dashboard`}>
            <div className={`stats dashboard-item`}>
                <div className={`m-b-10`}>统计数据</div>
                <div className={`stats-main`}>
                    <div className={`stats-item`}>
                        <div>
                            <div>文章数量</div>
                            <b className={`stats-number`}>{ARTICLES.length}</b>
                        </div>
                    </div>
                    <div className={`stats-item`}>
                        <div>
                            <div>类别数量</div>
                            <b className={`stats-number`}>{CATEGORIES.length}</b>
                        </div>
                    </div>
                    <div className={`stats-item`}>
                        <div>
                            <div>成立天数</div>
                            <b className={`stats-number`}>
                                {launchedDays}
                            </b>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`calendar dashboard-item`}>
                <div>编写记录</div>
                {calendar.length > 0 && (
                    <div className={`calendar-container`}>
                        <div className={`calendar-main`}>
                            <div className={`calendar-months`}>
                                {calendarMonths.map((item, key) => (
                                    <div className={`calendar-month`}
                                         style={{left: key * 16}}
                                         key={key}>
                                        {item !== -1 ? `${convertMonth(item)}月` : ``}
                                    </div>
                                ))}
                            </div>
                            <div className={`calendar-days`}>
                                <div className={`calendar-left`}>
                                    <div className={`calendar-day`}></div>
                                    <div className={`calendar-day`}>周一</div>
                                    <div className={`calendar-day`}></div>
                                    <div className={`calendar-day`}>周三</div>
                                    <div className={`calendar-day`}></div>
                                    <div className={`calendar-day`}>周五</div>
                                    <div className={`calendar-day`}></div>
                                </div>
                                <div className={`calendar-right`}>
                                    {calendar.map((item, key) => renderCalendarItem(item, key))}
                                </div>
                            </div>
                        </div>
                        <div className={`calendar-legend`}>
                            <div className={`legend-container`}>
                                <div>少</div>
                                <div className={`level level-0`}/>
                                <div className={`level level-1`}/>
                                <div className={`level level-2`}/>
                                <div className={`level level-3`}/>
                                <div>多</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
