import React from 'react';

// svg paths
import {ReactComponent as ChaBeautyLogo} from '../img/cha-beauty-logo.svg';

const header = () => {

    return(
        <div className="header content" id="header">
            <div className="header__logo">
                <ChaBeautyLogo fill="#707070" width="100%"/> 
            </div>
         
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et dolor enim necessitatibus recusandae. Voluptates beatae, facilis dignissimos nam amet nostrum, dolorem quas reiciendis iure magnam, accusamus debitis voluptatum quam et.
            </p>
     
        </div>
    )
}
export default header;