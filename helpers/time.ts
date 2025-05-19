import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const calculateTime = (date: string) => {
    const now = dayjs()
    const postDate = dayjs(date)
    const diffInHours = now.diff(postDate, 'hour')

    if (diffInHours < 24) {
        return postDate.fromNow()
    }

    return postDate.format('DD/MM/YYYY HH:mm')
}
