import React, { useState } from 'react'
import { GetUserContext } from '../App'
import axios from 'axios';

function PersonalDetails() {
    const {user , setUser} = GetUserContext() ;
    const [editName, setEditName] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editAbout, setEditAbout] = useState(false);
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phoneNumber);
    const [about, setAbout] = useState(user.aboutMe);
  return (
    <>
    <div className='flex flex-col items-center md:items-start profile-block w-full '>
        <div className='w-full '>
            <p className='text-gray-400'>Your Name</p>
            <div className='flex justify-between'>
               {!editName ? <> <div>{name}</div>
                <button className='edit-btn' onClick={()=>{setEditName(true) ;}}>Edit</button> </>
                : <>
                <input type='text' value={name} id="edit-name" onChange={e=>setName(e.target.value)} className='border outline-none flex-1 mr-8 border-black' />
                <button className='edit-btn' onClick={()=>{
                    if(!name) return ;
                    axios.put('/update/name' , {name}).then(res=>{
                        setUser(res.data)
                    }).catch(err=>console.log(err))
                    setEditName(false)}}>Save</button>
                </>}
            </div>
        </div>
        <div className='w-full '>
            <p className='text-gray-400'>Email </p>
            <div className='flex justify-between'>
                <div>abc@xyz.com</div>
                {/* <button className='edit-btn'>Edit</button> */}
            </div>
        </div>
        <div className='w-full '>
            <p className='text-gray-400'>Phone No</p>
            <div className='flex justify-between'>
            {!editPhone ? <> <div>{phone}</div>
                <button className='edit-btn' onClick={()=>{setEditPhone(true) ;}}>Edit</button> </>
                : <>
                <input type='text' value={phone} onChange={e=>setPhone(e.target.value.replace(/[^0-9+]/,""))} className='border outline-none flex-1 mr-8 border-black' />
                <button className='edit-btn' onClick={()=>{
                    if(!phone && phone.match(/^\+?[1-9][0-9]{7,14}$/).length===0) return ;
                    axios.put('/update/phoneNumber' , {phoneNumber : phone}).then(res=>{
                        setUser(res.data)
                    }).catch(err=>console.log(err))
                    setEditPhone(false)}}>Save</button>
                </>}
            </div>
        </div>
    </div>

    <div className='flex flex-col items-center md:items-start profile-block w-full '>
        <div className='flex w-full justify-between py-2'>
                <div>About <span className='text-indigo-800 font-bold'>Rohan</span></div>

                {editAbout ? <button className='edit-btn' onClick={()=>{
                    axios.put('/update/about' , {about}).then(res=>{
                        setUser(res.data)
                    }).catch(err=>console.log(err))
                    setEditAbout(false)}}>Save</button> :<button className='edit-btn' onClick={()=>{setEditAbout(true)}}>Edit</button>}
            </div>
            {editAbout ? <textarea onChange={e=>{setAbout(e.target.value)}} value = {about} className=' resize-none border outline-none border-black w-full' /> :<p className='profile-desc'>{about}</p>}
    </div>
    </>
  )
}

export default PersonalDetails