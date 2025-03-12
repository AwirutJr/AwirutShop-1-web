import moment from 'moment';

export const formatDate = (data) => {
    return moment(data).format('l')
}