import React from 'react';

// svg paths

import {ReactComponent as NavLines} from '../img/nav-lines.svg';
import {ReactComponent as NavCircle} from '../img/nav-circle.svg';
import {ReactComponent as ChaBeautyLogo} from '../img/cha-beauty-logo.svg';

const navbar = () => {
    const navContents = () => {
        return(
            <ul>
                <li>
                    <div className="navbar__li-title">
                        <a href="#header">Home</a>
                    </div>
                    <hr className="hr-header navbar__li-hr" id="hr-header"/>
                </li>
                <li>
                    <div className="navbar__li-title">
                        <a href="#featured">Features</a>
                    </div>
                    <hr className="hr-featured navbar__li-hr" id="hr-featured"/>
                </li>
                <li>
                    <div className="navbar__li-title">
                    <a href="#footer">Contact Me</a>
                    </div>
                    <hr className="hr-footer navbar__li-hr" id="hr-footer"/>
                </li>
            </ul>
        )
    }

    return(
        <div className="navbar">
            <div className="navbar__container">
                <div className="navbar__contents-ws">
                    <div className="navbar__logo"><ChaBeautyLogo fill="#707070" width="100%"/></div>
                    {navContents()}
                </div>

                <div className="navbar__contents">
                    <div className="navbar__lines"><NavLines width="48" height="48"/></div>
                    <div className="navbar__circle"><NavCircle width="114" height="108"/></div>
                    {navContents()}
                </div>
            </div>
        </div>
    )
}

export default navbar;