'use client';

import { useState, Fragment } from 'react';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavToggle = ({ children }) => {
    const [isOpen, toggleNav] = useState(false);

    return (
        <Fragment>
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

            <Collapse in={isOpen}>{children}</Collapse>
        </Fragment>
    );
};

export default NavToggle;
