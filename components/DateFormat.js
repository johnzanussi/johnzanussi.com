import isDate from 'date-fns/isDate';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

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
