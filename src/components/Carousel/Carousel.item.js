import React from 'react';
import './Carousel.item.css';

import { ReactComponent as PlayRing } from '../../assets/playWithRing.svg';
import { ReactComponent as ChevronDown } from '../../assets/chevronDown.svg';
const CarouselItem = ({ movie, image, handleItemExpand, HandlePlay }) => {



    const itemStyle = {
        backgroundImage: `url(${image
            })`,
        backgroundSize: 'cover',
        outline: 'none',
        opacity: '1',
        border: "none",
    };

    return (
        <div
            key={movie.id}
            className="carousel-img "
            style={itemStyle}
        >
            { (
                <div className="item-informations" onClick={() => handleItemExpand(movie)}>
                    <div className="item-card-interaction">
                        <div className="item-play" >
                            <div className="item-play-button" onClick={() => HandlePlay(movie)}>
                                <PlayRing />
                            </div>
                            <span className="item-title">{movie.title || movie.name}</span>
                        </div>
                    </div>
                    <div className="item-more-infos-icon" onClick={() => handleItemExpand(movie)}>
                        <ChevronDown />
                    </div>
                </div>
            )}

        </div >
    );
}




export default CarouselItem;
