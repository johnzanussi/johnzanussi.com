import differenceInMonths from 'date-fns/differenceInMonths';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

const Timeline = () => {

    const events = [
        {
            // CH
            start: '2007-05',
            end: '2014-02',
            color: '#fbab20',
            label: 'CollegeHumor',
        },
        {
            // EXOS
            start: '2014-02',
            end: '2017-02',
            color: '#00dca5',
            label: 'EXOS',
        },
        {
            // GB
            start: '2017-02',
            end: '2018-07',
            color: '#4c9f4c',
            label: 'GreenBlender',
        },
        {
            // DH
            start: '2018-09',
            end: '2021-03',
            color: '#fff',
            label: 'Daily Harvest',
        },
        {
            // LL
            start: '2021-03',
            end: '2021-10',
            color: '#1b1442',
            label: 'LeafLink',
            textColor: 'white',
        },
    ].reverse();

    const firstEvent = events[0];
    const lastEvent = events[events.length - 1];

    const totalMonths = differenceInMonths(
        parseISO(lastEvent.end),
        parseISO(firstEvent.start)
    );

    return (
        <div className="d-flex mb-4">

            {events.map(({ start, end, color, label, textColor }) => {

                const eventLength = differenceInMonths(
                    parseISO(end),
                    parseISO(start)
                );

                const percent = `${eventLength}%`;

                return (
                    <div
                        key={start}
                        className=""
                        style={{ width: percent }}>

                        <div
                            className={`w-100 text-${textColor ? textColor : 'dark'} fw-bold text-end p-2`}
                            style={{
                                backgroundColor: color,
                            }}>
                            {label}
                        </div>

                        <div
                            className="p-1 text-end small"
                            style={{ borderColor: `${color} !important` }}
                        >

                            {format(parseISO(start), 'MMMM yyyy')}

                        </div>

                    </div>
                );

            })}

        </div>
    );

};

export default Timeline;
