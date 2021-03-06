import Link from './Link';
import Image from './Image';

const EnjoyCTA = () => {
    return (
        <div className="bg-dark p-4 text-white text-opacity-75 text-center rounded rounded-1 border border-dark border-opacity-50">
            <p>
                Found the above useful? Have a question? Thought of something I
                didn&apos;t?
            </p>

            <p>
                Consider leaving a comment below or sending an email at
                johnzanussi@gmail.com.
            </p>

            <p>You can also support me on Ko-fi. Cheers!</p>

            <p>
                <Link href="https://ko-fi.com/Z8Z8CJ4O3">
                    <Image
                        width="143"
                        height="36"
                        layout="fixed"
                        src="https://cdn.ko-fi.com/cdn/kofi1.png?v=3"
                        alt="Buy Me a Coffee at ko-fi.com"
                    />
                </Link>
            </p>
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
