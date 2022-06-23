import { Children, isValidElement } from 'react';

const MDXColumns = ({ children }) => {
    const childCount = Children.toArray(children).filter((child) =>
        isValidElement(child)
    ).length;
    const colSize = Math.max(12 / childCount, 3);

    return (
        <div className="row">
            {Children.map(children, (child) => {
                if (!isValidElement(child)) {
                    return null;
                }
                return <div className={`col-md-${colSize}`}>{child}</div>;
            })}
        </div>
    );
};

export default MDXColumns;
