import React from 'react'
import SignupLoaderImg from '../Loader/signupLoader.png'
import "./Loader.css";
//  Loader\signupLoader.png
export default function SignupLoader() {
    return (
        <>
            <div className="cont">
                <button className="btn"><span>Submit</span><img src={SignupLoaderImg } height="62" width="62" alt='loading-image' /></button>

            </div>
        </>
    )
}
