import { isDate, parseISO, format } from 'date-fns';

const DateFormat = ({ date, formatStr }) => {

    const dateToFormat = isDate(date) ? date : parseISO(date);

    return (

        <time dateTime={date}>
            {format(dateToFormat, formatStr)}
        </time>

    );

};

DateFormat.defaultProps = {
    formatStr: 'LLLL d, yyyy',
};

export default DateFormat;
