import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatDate(date) {
  return dayjs(date).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}
