import classNames from 'classnames';

const DraftBadge = ({ className, ...props }) => {
    return (
        <span className={classNames('p-1 rounded-1 bg-info small', className)}>
            Draft
        </span>
    );
};

DraftBadge.defaultProps = {
    className: '',
};

export default DraftBadge;
