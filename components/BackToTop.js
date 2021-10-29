import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';

const BackToTop = ({ threshold, className, ...props }) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        const handleResize = () => {
            if ((document.body.clientHeight - window.innerHeight) > threshold) {
                setIsVisible(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={className}>
            <button
                type="button"
                className="btn btn-link"
                onClick={scrollToTop}
                aria-label="Back to top"
                {...props}
            >
                Back to top <FontAwesomeIcon icon={faLevelUpAlt} />
            </button>
        </div>
    );

};

BackToTop.defaultProps = {
    threshold: 250,
    className: '',
};

export default BackToTop;
