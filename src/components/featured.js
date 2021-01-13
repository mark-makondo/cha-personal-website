import React from 'react';

const featured = () => {

    return(
        <div className="featured content" id="featured">
            <span className="featured__main-title">Featured Works</span>

            <div className="featured__container">
                <div className="featured__hair featured--selector" id="hair">
                    <div className="featured__box" id="box-0"></div>
                    <div className="featured__info" id="info-0">
                        <span>Hair</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__beauty-permanent featured--selector" id="beauty">
                    <div className="featured__box"></div>
                    <div className="featured__info">
                        <span>Beauty Permanent</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__eyebrows featured--selector" id="eyebrows">
                    <div className="featured__box"></div>
                    <div className="featured__info">
                        <span>Eyebrows</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__nailcare featured--selector" id="nailcare">
                    <div className="featured__box"></div>
                    <div className="featured__info">
                        <span>Nail Care</span>
                        <p> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus voluptatibus officiis asperiores culpa magni rerum similique nam, distinctio debitis illo consectetur? Corporis voluptas doloribus nisi nihil. Harum fuga tenetur iusto?
                        </p>
                    </div>
                </div>

                <div className="featured__waxing featured--selector" id="waxing">
                    <div className="featured__box"></div>
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