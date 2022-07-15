import React, { useState, useEffect } from 'react';
import './popUp.css';

function Popup({image, visible, setImageSeleted}) {

    const [fadeStyle, setFadeStyle] = useState({fade:'fade-in'});

    useEffect(()=>{

        const timer = setInterval(() => {
            if(fadeStyle.fade === "fade-in"){
                setFadeStyle({fade:'fade-out'});
                setImageSeleted(false);
            }else{
                return setFadeStyle({fade:'fade-in'});
            }
        }, 1000);

        return () => clearInterval(timer);

    },[fadeStyle, setImageSeleted]);

    return (
        visible? <div className='popup' >
            <div className='popup-image'>
                <img className={fadeStyle.fade} src={image} alt={image} width={50} height={50} />
            </div>
        </div>: null
    );
}

export default Popup;