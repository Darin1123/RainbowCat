export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get recent occurred Sunday
 * @param d Date Type
 * @returns {Date} recent occurred Sunday
 */
export function getLastSunday(d) {
    let t = new Date(d);
    t.setDate(t.getDate() - t.getDay());
    return t;
}

/**
 * Get days from an end date and count backwards for a certain length
 * @param end Date type
 * @param length length
 * @returns {*[]}
 */
export function getDays(end, length) {
    let arr = []
    for (let i = 0; i < length; i++) {
        let date = new Date();
        date.setFullYear(end.getFullYear());
        date.setMonth(end.getMonth());
        date.setDate(end.getDate() - i);
        arr.push(date);
    }
    return arr;
}

/**
 * count i-th day in a week for a date
 * @param dt
 * @returns {number}
 */
export function dayOfWeek(dt) {
    return (dt.getDay() + 1 ) % 7;
}

export function getLevel(count) {
    if (count > 2) {
        return 3;
    }
    return count;
}

export function convertMonth(month) {
    switch (month) {
        case 0: return '一';
        case 1: return '二';
        case 2: return '三';
        case 3: return '四';
        case 4: return '五';
        case 5: return '六';
        case 6: return '七';
        case 7: return '八';
        case 8: return '九';
        case 9: return '十';
        case 10: return '十一';
        case 11: return '十二';
        default: return '~';
    }
}

export function convertDate(date) {
    return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

export function compareDates(d1, d2) {
    if (d1.getFullYear() > d2.getFullYear()) {
        return 1;
    }
    if (d1.getFullYear() < d2.getFullYear()) {
        return -1;
    }
    if (d1.getMonth() > d2.getMonth()) {
        return 1;
    }
    if (d1.getMonth() < d2.getMonth()) {
        return -1;
    }
    if (d1.getDate() > d2.getDate()) {
        return 1;
    }
    if (d1.getDate() < d2.getDate()) {
        return -1;
    }
    return 0;
}

export function getArticleDate(article) {
    let dt = article.date;
    return new Date(dt.year, dt.month - 1, dt.day);
}

export function string2date(str) {
    let parts = str.split('-');
    if (parts.length === 3) {
        return new Date(parts[0], parts[1]-1, parts[2]);
    } else {
        return null;
    }
}

export function convertDateStr(str) {
    let parts = str.split('-');
    if (parts.length === 3) {
        return `${parts[0]} 年 ${parts[1]} 月 ${parts[2]} 日`
    } else {
        return null;
    }
}
