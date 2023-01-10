'use client';

import { useRef } from 'react';
import { useState, Fragment } from 'react';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import ColorModeToggle from 'components/ColorModeToggle';

const NavToggle = ({ children }) => {
    const [isOpen, toggleNav] = useState(false);

    return (
        <Fragment>
            <div className="d-flex w-100 mt-4">
                <ColorModeToggle className="nav-color-mode-toggle me-2 py-1 p-md-3" />

                <button
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                    aria-controls="nav-links"
                    className="d-block flex-grow-1 d-md-none btn btn-link text-center py-1 bg-light bg-opacity-10 rounded"
                    onClick={() => toggleNav(!isOpen)}
                >
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={classNames('collapse-button', {
                            collapsed: !isOpen,
                        })}
                    />
                </button>
            </div>

            <Collapse in={isOpen}>{children}</Collapse>
        </Fragment>
    );
};

export default NavToggle;
