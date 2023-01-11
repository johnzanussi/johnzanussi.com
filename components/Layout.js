import { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInstagram,
    faGithub,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import faPrintables from 'components/IconPrintables';

import ColorModeToggle from 'components/ColorModeToggle';
import NavToggle from 'components/NavToggle';
import Link from 'components/Link';
import Image from 'components/Image';
import BackToTop from 'components/BackToTop';

import imgJZ from 'public/assets/img-john-zanussi-kiddo.jpg';

const Layout = ({ children }) => {
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
            name: 'Printables',
            icon: faPrintables,
            url: 'https://www.printables.com/social/170869-johnzanussi/about',
        },
    ];

    return (
        <Fragment>
            <div className="d-md-flex mx-2 mx-md-0">
                <nav
                    data-bs-theme="dark"
                    className="navbar site-nav d-md-flex flex-md-column flex-md-shrink-0 px-3 py-4 p-md-5 mt-md-5 sticky-md-top align-self-md-start shadow rounded-bottom rounded-md-end bg-dark"
                >
                    <div className="d-flex d-md-block">
                        <div className="nav-photo text-center">
                            <Link href="/">
                                <Image
                                    src={imgJZ}
                                    alt="portrait of John Zanussi wearing sunglasses with his daughter on his shoulders"
                                    className="rounded-circle shadow img-fluid"
                                    width="250"
                                    height="250"
                                    placeholder="empty"
                                    priority
                                />
                            </Link>

                            <p className="m-0">
                                <Link
                                    href="https://en.pronouns.page/he"
                                    className="d-block navbar-text small mt-1 p-0"
                                >
                                    he/him
                                </Link>
                            </p>
                        </div>

                        <div className="ms-3 ms-md-0">
                            <h1 className="mt-md-4 text-primary">
                                John Zanussi
                            </h1>

                            <p className="small navbar-text text-muted mb-1 mb-md-3 p-0">
                                Long Island, New York
                            </p>

                            <p className="navbar-text small mb-0 mb-md-3 p-0 text-white">
                                Senior Engineering Manager at{' '}
                                <Link
                                    href="https://leaflink.com/"
                                    className="text-reset"
                                >
                                    LeafLink
                                </Link>
                                {/*<br />
                                <Link
                                    href="https://grnh.se/15a127b32us"
                                    className="small link-warning opacity-75"
                                >
                                    We&apos;re hiring!
                                </Link>*/}
                            </p>
                        </div>
                    </div>

                    <NavToggle>
                        <div
                            id="nav-links"
                            className="d-md-block w-100 mt-3 mt-md-0"
                        >
                            <ul className="list-unstyled font-monospace fs-5 px-3 p-md-0 text-end text-md-start">
                                {pages.map(({ title, url }) => (
                                    <li key={title}>
                                        <Link
                                            href={url}
                                            className="d-block font-weight-bold"
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <ul className="list-inline mt-4 text-center text-md-start d-flex d-md-block justify-content-evenly">
                                {socialLinks.map(({ name, icon, url }) => (
                                    <li
                                        key={name}
                                        className="list-inline-item me-md-4"
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

                                <p className="navbar-text text-muted mb-0 p-0">
                                    All content copyright John Zanussi.
                                </p>
                            </div>
                        </div>
                    </NavToggle>
                </nav>

                <main className="site-main d-md-flex flex-column flex-grow-1 mb-5 my-md-4 px-2 py-4 p-md-5">
                    {children}

                    <BackToTop className="text-center mt-5" />
                </main>
            </div>
        </Fragment>
    );
};

export default Layout;
