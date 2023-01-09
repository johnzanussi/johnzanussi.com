/* eslint-disable @next/next/no-img-element */
import Link from 'components/Link';
import AmazonDisclosure from 'components/AmazonDisclosure';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';

const AmazonProducts = ({ products }) => {
    return (
        <div className="mb-4">
            <div className="list-group">
                {products.map(({ id, title, link }) => (
                    <Link
                        key={id}
                        id={id}
                        href={link}
                        className="list-group-item list-group-item-action d-flex gap-3 link-reset"
                    >
                        <img
                            src={`https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${id}&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=jz034-20&language=en_US`}
                            className="flex-shrink-0"
                            width="50"
                            height="50"
                            alt={title}
                            style={{ overflow: 'hidden' }}
                        />

                        <div className="d-flex gap-2 w-100 justify-content-between">
                            {title}
                        </div>

                        <FontAwesomeIcon
                            icon={faAmazon}
                            className="align-self-center"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AmazonProducts;
