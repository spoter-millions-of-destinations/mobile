import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// Extend ngay sau khi import
dayjs.extend(relativeTime)

export const calculateTime = (date: string) => {
    return dayjs(date).fromNow()
}
