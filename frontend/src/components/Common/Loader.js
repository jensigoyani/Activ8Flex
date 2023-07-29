import React from 'react';
import Loading from 'react-loading-components';
import './style.css'

const Loader = () => (
    <div className='Loading'>
        <Loading type='tail_spin' width={100} height={100} style={{ textAlign: "center" }} fill='rgb(6 66 66)' />
    </div>
);

export default Loader