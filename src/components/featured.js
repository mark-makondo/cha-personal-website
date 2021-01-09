import React from 'react';

const featured = () => {

    return(
        <div className="featured">
            <span className="featured__main-title">Featured Works</span>

            <div className="featured__container">
                <div className="featured__hair">
                    <div className="featured__box">
                    </div>
                    <span className="featured__sub-title">Hair</span>
                </div>

                <div className="featured__beauty-permanent">
                    <div className="featured__box">
                    </div>
                    <span className="featured__sub-title">Beauty Permanent</span>
                </div>

                <div className="featured__eyebrows">
                    <div className="featured__box">
                    </div>
                    <span className="featured__sub-title">Eyebrows</span>
                </div>

                <div className="featured__nailcare">
                    <div className="featured__box">
                    </div>
                    <span className="featured__sub-title">Nail Care</span>
                </div>

                <div className="featured__waxing">
                    <div className="featured__box">
                    </div>
                    <span className="featured__sub-title">Waxing</span>
                </div>
            </div>
        </div>
    )
}

export default featured;