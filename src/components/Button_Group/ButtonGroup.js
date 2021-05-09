
import React from 'react';
import './ButtonGroup.css';
import { ReactComponent as ArrowRight } from '../../assets/arrowRight.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrowLeft.svg';

const ButtonGroup = ({
    next, previous, goToSlide, ...rest
}) => (
    <div className="carousel-button-group" style={{ position: 'absolute' }}>
        <button
            type="button"
            className="btn-left"
            onClick={previous}
        >
            <ArrowLeft />
        </button>
        <button type="button" className="btn-right" onClick={next}>
            <ArrowRight />
        </button>
    </div>
);

export default ButtonGroup;
