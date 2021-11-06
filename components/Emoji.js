const Emoji = ({ label, children, ...props }) => {
    return (
        <span aria-label={label} role="img" {...props}>
            {children}
        </span>
    );
};

export default Emoji;
