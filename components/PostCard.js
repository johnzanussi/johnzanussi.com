import classNames from 'classnames';

import Link from './Link';
import Image from './Image';
import DateFormat from './DateFormat';
import DraftBadge from './DraftBadge';

const PostCard = ({ post, ...props }) => {
    return (
        <div
            className={classNames(
                'post-card card rounded shadow shadow-hover-none bg-dark-card flex-md-row overflow-hidden',
                {
                    'border-info': post.isDraft,
                }
            )}
            {...props}
        >
            <div className="card-body p-3 p-md-4 order-1 order-md-0">
                {post.isDraft && (
                    <DraftBadge className="position-absolute bottom-0 start-0" />
                )}

                <div className="text-muted mb-2">
                    <DateFormat date={post.date} />
                </div>

                <h2 className="card-title mb-3">
                    <Link href={post.url} className="stretched-link text-reset">
                        {post.title}
                    </Link>
                </h2>

                <p className="card-text">{post.excerpt}</p>
            </div>

            <div className="card-img ratio ratio-16x9 position-relative order-0 order-md-1">
                <Image
                    src={post.coverImage.url}
                    alt={`Cover image for ${post.title}`}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default PostCard;
