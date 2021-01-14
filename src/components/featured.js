import React from 'react';

// jpg
import Hair from '../img/hair.jpg';
import BeautyCare from '../img/beauty-care.jpg';
import Eyebrows from '../img/eyebrows.jpg';
import NailCare from '../img/nail-care.jpg';
import Waxing from '../img/waxing-sample.jpg';

const featured = () => {

    return(
        <div className="featured content" id="featured">
            <span className="featured__main-title">Featured Works</span>

            <div className="featured__container">
                <div className="featured__hair featured--selector" id="hair">
                    <div className="featured__box" id="box-0">
                        <img src={Hair} alt="Hair Sample"/>
                    </div>
                    <div className="featured__info" id="info-0">
                        <span>Hair</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__beauty-permanent featured--selector" id="beauty">
                    <div className="featured__box">
                        <img src={BeautyCare} alt="Beauty Care Sample"/>
                    </div>
                    <div className="featured__info">
                        <span>Beauty Care</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__eyebrows featured--selector" id="eyebrows">
                    <div className="featured__box">
                        <img src={Eyebrows} alt="Eyebrows Sample"/>
                    </div>
                    <div className="featured__info">
                        <span>Eyebrows</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__nailcare featured--selector" id="nailcare">
                    <div className="featured__box">
                        <img src={NailCare} alt="Nail Care Sample"/>
                    </div>
                    <div className="featured__info">
                        <span>Nail Care</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__waxing featured--selector" id="waxing">
                    <div className="featured__box">
                        <img src={Waxing} alt="Waxing Sample"/>
                    </div>
                    <div className="featured__info">
                        <span>Waxing</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default featured;