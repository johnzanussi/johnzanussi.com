import classNames from 'classnames';

import Link from 'components/Link';
import Image from 'components/Image';
import DateFormat from 'components/DateFormat';
import DraftBadge from 'components/DraftBadge';

const PostCard = ({ post, ...props }) => {
    return (
        <div
            className={classNames(
                'post-card card rounded flex-md-row overflow-hidden bg-tertiary',
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

                <h2 className="mb-3">
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
                    fill
                />
            </div>
        </div>
    );
};

export default PostCard;
