import React from 'react';

// svg paths

import {ReactComponent as NavLines} from '../img/nav-lines.svg';
import {ReactComponent as NavCircle} from '../img/nav-circle.svg';

const navbar = () => {

    const nav__contents = () => {
        return(
            <ul>
                <li>Home</li>
                <li>Features</li>
                <li>Contact Me</li>
            </ul>
        )
    }

    return(
        <div className="navbar">
            <NavLines />
            <NavCircle />
        </div>
    )
}

export default navbar;