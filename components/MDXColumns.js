import { Children } from 'react';

const MDXColumns = ({ children }) => {

    const colSize = Math.max(12 / Children.count(children), 3);

    return (

        <div className="row">

            {Children.map(children, child => (

                <div className={`col-md-${colSize}`}>
                    {child}
                </div>

            ))}

        </div>

    );

};

export default MDXColumns;
