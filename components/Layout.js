import { useState, Fragment } from 'react';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
    faInstagram,
    faGithub,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import faThingiverse from '../components/IconThingiverse';

import Meta from '../components/Meta';
import Link from '../components/Link';
import Image from '../components/Image';
import BackToTop from '../components/BackToTop';

import imgJZ from '../public/assets/img-john-zanussi-kiddo.jpg';

const Layout = ({ children }) => {
    const [isOpen, toggleNav] = useState(false);

    const pages = [
        {
            title: 'About',
            url: '/about',
        },
        {
            title: 'Posts',
            url: '/posts',
        },
        {
            title: 'YouTube',
            url: '/youtube',
        },
    ];

    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: faLinkedin,
            url: 'https://www.linkedin.com/in/john-zanussi/',
        },
        {
            name: 'GitHub',
            icon: faGithub,
            url: 'https://github.com/johnzanussi',
        },
        {
            name: 'Instagram',
            icon: faInstagram,
            url: 'https://www.instagram.com/johnzanussi/',
        },
        {
            name: 'Thingiverse',
            icon: faThingiverse,
            url: 'https://www.thingiverse.com/johnzanussi/designs',
        },
    ];

    return (
        <Fragment>
            <Meta />

            <div className="d-md-flex mx-2 mx-md-0">
                <nav className="site-nav d-md-flex flex-md-column flex-md-shrink-0 px-3 py-4 p-md-5 mt-md-5 sticky-md-top align-self-md-start bg-dark shadow rounded-bottom rounded-md-end">
                    <div className="d-flex d-md-block">
                        <div className="nav-photo text-center">
                            <Link href="/">
                                <Image
                                    src={imgJZ}
                                    alt="portrait of John Zanussi wearing sunglasses with his daughter on his shoulders"
                                    className="rounded-circle shadow"
                                    width="250"
                                    height="250"
                                    placeholder="empty"
                                    priority
                                />
                            </Link>

                            <p className="text-muted m-0">
                                <Link
                                    href="https://en.pronouns.page/he"
                                    className="d-block mt-1 small text-reset"
                                >
                                    he/him
                                </Link>
                            </p>
                        </div>

                        <div className="ms-3 ms-md-0">
                            <h1 className="mt-md-4 text-primary">
                                John Zanussi
                            </h1>

                            <p className="text-muted mb-1 mb-md-3">
                                Long Island, New York
                            </p>

                            <p className="mb-0 mb-md-3">
                                Engineering Manager at{' '}
                                <Link
                                    href="https://leaflink.com/"
                                    className="text-reset"
                                >
                                    LeafLink
                                </Link>
                                <br />
                                <Link
                                    href="https://grnh.se/15a127b32us"
                                    className="small link-warning opacity-75"
                                >
                                    We&apos;re hiring!
                                </Link>
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Toggle navigation"
                        aria-expanded={isOpen}
                        aria-controls="nav-links"
                        className="d-block d-md-none btn btn-link text-center w-100 mt-4 py-1 bg-light bg-opacity-10 rounded"
                        onClick={() => toggleNav(!isOpen)}
                    >
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={classNames('collapse-button', {
                                collapsed: !isOpen,
                            })}
                        />
                    </button>

                    <Collapse in={isOpen}>
                        <div
                            id="nav-links"
                            className="d-md-block mt-3 mt-md-0 px-3     p-md-0"
                        >
                            <ul className="list-unstyled font-monospace fs-5">
                                {pages.map(({ title, url }) => (
                                    <li key={title}>
                                        <Link
                                            href={url}
                                            className="font-weight-bold py-1 d-block"
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <ul className="list-inline mt-5 mt-md-4 text-center text-md-start">
                                {socialLinks.map(({ name, icon, url }) => (
                                    <li
                                        key={name}
                                        className="list-inline-item me-4"
                                    >
                                        <Link
                                            href={url}
                                            title={name}
                                            className="link-secondary opacity-50"
                                        >
                                            <FontAwesomeIcon
                                                icon={icon}
                                                size="2x"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="small text-center text-md-start">
                                <p className="mb-1">
                                    <Link
                                        href="/built-with"
                                        className="text-decoration-none"
                                    >
                                        Built with Next.js, Bootstrap, and more.
                                    </Link>
                                </p>

                                <p className="text-muted">
                                    All content copyright John Zanussi.
                                </p>
                            </div>
                        </div>
                    </Collapse>
                </nav>

                <main className="site-main d-md-flex flex-column flex-grow-1 mb-5 my-md-4 p-4 p-md-5">
                    {children}

                    <BackToTop className="text-center mt-5" />
                </main>
            </div>
        </Fragment>
    );
};

export default Layout;
