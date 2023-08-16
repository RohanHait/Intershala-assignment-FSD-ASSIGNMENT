import React from 'react'

import PersonalDetails from './PersonalDetails'
import Skills from './Skills'
import Certifications from './Certifications'
import Experience from './Experience'
import Education from './Education'
import { GetUserContext } from '../App'
function Profile() {
    const {user} = GetUserContext() ;
  return (
    <>
    <div className='bg-indigo-900 h-[25%] rounded-b-lg px-8 py-4 text-white '>
       My Profile 
    </div>
    <div className='absolute w-[90%] left-[5%] top-[15%] text-sm '>
        <div className='bg-white rounded-lg shadow-lg p-8 h-full flex  flex-col md:flex-row'>
            <div className='flex flex-1 flex-col items-center md:items-start mx-3 justify-between px-3 py-2  '>
               <div className='flex justify-between w-full items-center p-2'>
                <img src={user.profilePic} className='rounded-full w-16 h-16' alt='profile' />
                <button className="edit-btn">Change Photo</button>
               </div>
                <PersonalDetails/>
                <Skills/>
            </div>
            <div className='flex flex-1 justify-between flex-col items-center md:items-start mx-4 px-3 py-2 '>
                <header className='flex  items-center md:items-start profile-block w-full mx-3'>
                    <div className='flex flex-col flex-1 w-full justify-between py-2 '>
                        <p className='font-medium text-[#222222]/90'>Professional Details </p>
                        <p className='text-xs font-light '>
                        This are the professional details shown to users in the app.
                        </p>
                    </div>
                    <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Bold Duotone / Astranomy / Stars">
                        <path id="Vector" opacity="0.5" d="M21.7743 12.4921C23.8791 9.97369 24.9315 8.71447 26.1413 8.90842C27.3511 9.10238 27.9171 10.6211 29.049 13.6584L29.3419 14.4442C29.6635 15.3073 29.8244 15.7389 30.1373 16.0568C30.4502 16.3747 30.8798 16.543 31.739 16.8795L32.5212 17.1859C35.5448 18.3701 37.0566 18.9622 37.229 20.1724C37.4014 21.3826 36.1203 22.4095 33.558 24.4632L32.8951 24.9946C32.167 25.5782 31.803 25.87 31.5922 26.2694C31.3815 26.6688 31.3479 27.1306 31.2808 28.0543L31.2197 28.8952C30.9836 32.1455 30.8655 33.7707 29.7623 34.3247C28.659 34.8787 27.3013 33.9946 24.5858 32.2266L23.8833 31.7691C23.1116 31.2667 22.7258 31.0155 22.2826 30.9444C21.8394 30.8734 21.3891 30.9905 20.4884 31.2249L19.6684 31.4382C16.4989 32.2628 14.9142 32.6751 14.0599 31.8073C13.2057 30.9394 13.6477 29.3662 14.5316 26.2197L14.7603 25.4057C15.0115 24.5116 15.1371 24.0645 15.074 23.6212C15.0108 23.1779 14.7661 22.7884 14.2765 22.0096L13.8308 21.3006C12.1081 18.5599 11.2468 17.1895 11.822 16.0992C12.3973 15.0088 14.0282 14.9205 17.2901 14.744L18.1339 14.6983C19.0609 14.6482 19.5243 14.6231 19.9284 14.4201C20.3326 14.2172 20.6316 13.8594 21.2298 13.1437L21.7743 12.4921Z" fill="#2684FC"/>
                        <path id="Vector_2" d="M29.6469 22.7913C28.0683 20.9025 27.279 19.9581 26.3717 20.1035C25.4643 20.249 25.0398 21.388 24.1909 23.666L23.9712 24.2554C23.73 24.9027 23.6094 25.2264 23.3747 25.4648C23.14 25.7032 22.8178 25.8294 22.1734 26.0818L21.5867 26.3116C19.319 27.1997 18.1852 27.6438 18.0559 28.5515C17.9266 29.4592 18.8874 30.2293 20.8091 31.7696L21.3063 32.1681C21.8524 32.6058 22.1254 32.8247 22.2835 33.1242C22.4415 33.4238 22.4667 33.7702 22.517 34.4629L22.5628 35.0936C22.74 37.5313 22.8285 38.7502 23.6559 39.1657C24.4834 39.5812 25.5017 38.9182 27.5383 37.5921L28.0652 37.2491C28.6439 36.8722 28.9333 36.6838 29.2657 36.6305C29.5981 36.5772 29.9358 36.6651 30.6113 36.8409L31.2263 37.0009C33.6035 37.6193 34.792 37.9285 35.4327 37.2777C36.0734 36.6268 35.7419 35.4469 35.0789 33.087L34.9074 32.4765C34.719 31.8059 34.6248 31.4706 34.6722 31.1381C34.7195 30.8056 34.9031 30.5135 35.2703 29.9294L35.6045 29.3976C36.8965 27.3421 37.5426 26.3144 37.1111 25.4966C36.6796 24.6788 35.4565 24.6126 33.0101 24.4802L32.3772 24.4459C31.682 24.4083 31.3344 24.3895 31.0313 24.2373C30.7282 24.0851 30.5039 23.8167 30.0553 23.28L29.6469 22.7913Z" fill="#413B89"/>
                        </g>
                    </svg>
                </header>
                <Certifications/>
                <Experience/>
                <Education/>
            </div>

        </div>
    </div>
    </>
  )
}

export default Profile