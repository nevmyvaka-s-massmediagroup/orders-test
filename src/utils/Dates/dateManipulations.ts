const monthsFormat1 = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

export const getMounthNameByIdx = (idx: number) => monthsFormat1[idx]

export enum DateFormats {
    'Mm. D, YYYY',
    'DD/MMM/YYYY'
}

export const formatDate = (dateFormat: DateFormats, date: Date): string => {
    // const date = new Date(dateStr)
    switch (dateFormat) {
        case DateFormats["Mm. D, YYYY"]:
            return `${getMounthNameByIdx(date.getMonth())}. ${date.getDate()}, ${date.getFullYear()}`
        case DateFormats["DD/MMM/YYYY"]:
            return `${date.getDate()}/${getMounthNameByIdx(date.getMonth()).toUpperCase()}/${date.getFullYear()}`
        default:
            return ''
    }
}