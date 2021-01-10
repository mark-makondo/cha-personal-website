import React from 'react';

// svg paths

import {ReactComponent as NavLines} from '../img/nav-lines.svg';
import {ReactComponent as NavCircle} from '../img/nav-circle.svg';
import {ReactComponent as ChaBeautyLogo} from '../img/cha-beauty-logo.svg';

const navbar = () => {

    return(
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__lines"><NavLines width="3rem" height="3rem"/></div>
                <div className="navbar__circle"><NavCircle /></div>

                <div className="navbar__contents">
                    <div className="navbar__logo"><ChaBeautyLogo fill="#707070" width="100%"/></div>
                    <ul>
                        <li>
                            <div className="navbar__li-title">
                                Home
                            </div>
                            <hr className="navbar__li-hr"/>
                        </li>
                        <li>
                            <div className="navbar__li-title">
                                Features
                            </div>
                            <hr className="navbar__li-hr"/>
                        </li>
                        <li>
                            <div className="navbar__li-title">
                                Contact Me
                            </div>
                            <hr className="navbar__li-hr"/>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default navbar;