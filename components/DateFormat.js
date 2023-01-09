import isDate from 'date-fns/isDate';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

const DateFormat = ({ date, formatStr = 'LLLL d, yyyy', ...props }) => {
    const dateToFormat = isDate(date) ? date : parseISO(date);

    return (
        <time dateTime={format(dateToFormat, 'yyyy-MM-dd')} {...props}>
            {format(dateToFormat, formatStr)}
        </time>
    );
};

export default DateFormat;
