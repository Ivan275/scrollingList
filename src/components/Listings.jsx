import React, {useRef, useState} from 'react';
import Card from './Card';
import Popup from './Popup';
import useLoadData from './useLoadData';

function Listings() {

    const ref = useRef(null);
    const [image, setImage] = useState('');
    const [imageSeleted, setImageSeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const queryOption = {
        since:"2022-07-13T21:26:40Z",
        per_page: 30,
        page: 1
    }

    const data = useLoadData(ref, setLoading, setError, queryOption);

    const handleClick = (image) => {
        
        setImage(image);
        setImageSeleted(true);
    }
    return <>
            <Popup image={image} visible={imageSeleted} setImageSeleted={setImageSeleted}/>
            <Card data={data} forwardedRef={ref} handleClick={handleClick} loading={loading} error={error}/>
            </>

}

export default Listings;