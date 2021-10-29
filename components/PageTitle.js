import DateFormat from './DateFormat';

const PageTitle = ({ lastUpdated, children, title, ...props }) => (

    <div {...props}>

        <h1>
            {children || title}
        </h1>

        {lastUpdated && (

            <p className="text-muted small mb-0">
                Last Updated: <DateFormat date={lastUpdated} />
            </p>

        )}

        <hr />

    </div>

);

export default PageTitle;
