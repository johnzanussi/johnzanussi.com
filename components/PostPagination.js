import { Fragment } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Link from './Link';

const PostPagination = ({ posts, ...props }) => {

    return (

        <nav
            aria-label="Post pagination"
            {...props}
        >

            <ul className="pagination pagination-lg row my-4">

                {posts.map(({ isPrevious, ...post }) => {

                    const label = isPrevious ? 'Previous' : 'Next';

                    return (

                        <li
                            key={post.title}
                            className={classNames('col-md-6 page-item', {
                                'text-start mb-4 mb-md-0': isPrevious,
                                'text-end': !isPrevious,
                                'offset-md-6': !isPrevious && posts.length === 1,
                            })}
                        >

                            <Link
                                href={post.url}
                                className="page-link h-100 rounded-1"
                            >
                                <div className="text-white fs-6">
                                    {label} Post
                                </div>

                                {isPrevious && (
                                    <Fragment>
                                        <FontAwesomeIcon icon={faArrowLeft} />&nbsp;
                                        {post.title}
                                    </Fragment>
                                )}

                                {!isPrevious && (
                                    <Fragment>
                                        {post.title}&nbsp;
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Fragment>
                                )}

                            </Link>

                        </li>

                    );

                })}


            </ul>

        </nav>

    );

};

export default PostPagination;
