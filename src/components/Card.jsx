import React from 'react';

import './card.css';

function Card({data, forwardedRef, handleClick, loading, error}) {

    return (
        <>
            <ul>
            
            {data.map((item,index) => {
                return <li key={item.id+index.toString()} onClick={() => handleClick(item.owner.avatar_url)}>
                            <img src={item.owner.avatar_url} alt={Object.keys(item.files)[0]} width={50} height={50} />
                            <p className='text'> {Object.keys(item.files)[0]}</p>
                        </li>
            })}
            </ul>
            <div ref={forwardedRef} />
           
            {error?<p className='loader'> {error.message}</p> : null }

            {loading && !error && <div className='loader'>Loading...</div>}
        </>
        
    );
}

export default Card;