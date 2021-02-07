import React from 'react';
import './modal.css'

const Backdrop = (props) => (
    props.show ? <div className="backdrop" onClick={props.toggleBackdrop}></div> : null
);

export default Backdrop;