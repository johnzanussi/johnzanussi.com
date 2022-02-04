import Link from './Link';

const EnjoyCTA = () => {
    return (
        <div className="bg-dark p-4 text-white text-opacity-75 rounded">
            <p>
                Found the above useful? Have a question? Thought of something I
                didn&apos;t?
            </p>

            <p>
                Consider{' '}
                <Link href="https://www.buymeacoffee.com/johnzanussi">
                    buying me a coffee
                </Link>
                , leaving a comment below, or sending an email at
                johnzanussi@gmail.com.
            </p>

            <p>Cheers!</p>
        </div>
    );
};

export default EnjoyCTA;

// <script
//     data-name="BMC-Widget"
//     data-cfasync="false"
//     src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
//     data-id="johnzanussi"
//     data-description="Support me on Buy me a coffee!"
//     data-message="Buy me a coffee!"
//     data-color="#FFDD00"
//     data-position="Right"
//     data-x_margin="18"
//     data-y_margin="18" />
