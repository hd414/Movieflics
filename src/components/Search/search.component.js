import React from 'react';
import './search.styles.scss';

import { ReactComponent as PlayRing } from '../../assets/playWithRing.svg';
import { ReactComponent as ChevronDown } from '../../assets/chevronDown.svg';
const SearchComponent = ({ item, image, handleItemExpand, title, HandlePlay }) => {



    const itemStyle = {
        backgroundImage: `url(${image
            })`,
        backgroundSize: 'cover',
        outline: 'none',
        opacity: '1',
        border: "none",
        cursot: "pointer"
    };

    return (

        <div
            key={item.id}
            className="search-img"
            style={itemStyle}
            onClick={() => handleItemExpand(item)}
        >
            {(
                <div className="search-item-informations">
                    <div className="search-item-card-interaction">
                        <div className="search-item-play" >
                            <div className="search-item-play-button" onClick={() => HandlePlay(item)}>
                                <PlayRing />
                            </div>
                            <span className="search-item-title">{item.title || item.name}</span>
                        </div>
                    </div>
                    <div className="search-item-more-infos-icon" onClick={() => handleItemExpand(item)}>
                        <ChevronDown />
                    </div>
                </div>
            )}

        </div >

    );
}




export default SearchComponent;
