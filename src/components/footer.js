import React from 'react';

// svg paths
import {ReactComponent as ChaBeautyLogo} from '../img/cha-beauty-logo.svg';

const footer = () => {

    return(
        <div className="footer" id="footer">
            <div className="footer__container">
                <span className="footer__title">Do you want to see more?</span>
                <div className="footer__logo">
                    <ChaBeautyLogo fill="#707070" width="100%"/> 
                </div> 
                <div className="footer__contact">
                    <a href="https://www.facebook.com/chaartistbeauty"><i className="fab fa-facebook"></i></a>
                    <a href="https://github.com/mark-makondo/"><i className="fab fa-instagram"></i></a>
                </div>
                <span className="footer__copyright">Copyright &#x24B8; Chanda Makondo</span>
            </div>
        </div>
    )
}

export default footer;