import React, { useState } from "react";
import { GetUserContext } from "../App";
import axios from "axios";
function Certifications() {
    const {user , setUser} = GetUserContext() ;
    const [edit ,setEdit] = useState(false) ;
    const [certification , setCertification] = useState(user.certifications) ;
    const [authorizedBy , setAuthorizedBy] = useState("") ;
    const [name, setName] = useState("");
  return (
    <>
      <section className="flex flex-col items-center md:items-start px-4 py-3 border-none  w-full mx-3">
        <div className="flex justify-between w-full items-center md:items-start">
          <div className="text-sm font-medium "> Certification </div>
          {edit ? <button className="edit-btn" onClick={()=>setEdit(false)}>Save</button> : <button className="edit-btn"onClick={()=>{setEdit(true)}}>Edit</button>}
        </div>
        {edit && <div className="flex w-full ">
            <div className="flex flex-1 flex-col px-2 space-y-2">
                <input type='text' value={name} onChange={e=>setName(e.target.value)} className='border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400' placeholder="Certificate Name"/>
                <input type='text' value={authorizedBy} onChange={e=>setAuthorizedBy(e.target.value)} className='border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400' placeholder="authorized By" />
            </div>
            <button className='edit-btn text-sm my-5 ' onClick={e=>{axios.put("/update/certification",{certification :{name,authorizedBy}}).then(res =>{setUser(res.data) ; setCertification(res.data.certifications)}) ; setAuthorizedBy("") ; setName("")}} >Add</button>
            </div>}
        <ul className="w-full">
            {certification.map(cert=>{
                return <li key={cert._id}
            className="rounded-2xl profile-block flex w-full px-4 items-center"
            style={{
              paddingTop: "2px",
              paddingBottom: "2px",
              borderRadius: "32px",
            }}
          >
            <div className="px-4 py-2">
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.619 0.543534C12.2981 -0.181177 10.7019 -0.181178 9.38097 0.543533L2.30732 4.42453C0.885008 5.20489 0 6.70473 0 8.33479V15.6652C0 17.2953 0.885006 18.7951 2.30732 19.5755L9.38097 23.4565C10.7019 24.1812 12.2981 24.1812 13.619 23.4565L20.6927 19.5755C22.115 18.7951 23 17.2953 23 15.6652V8.33479C23 6.70473 22.115 5.20489 20.6927 4.42453L13.619 0.543534ZM11.5003 7.54622C11.0812 7.54622 10.8009 8.05223 10.2402 9.06425L10.0951 9.32607C9.93582 9.61365 9.85616 9.75744 9.73195 9.85231C9.60774 9.94719 9.45305 9.98241 9.14366 10.0528L8.86199 10.117C7.77325 10.3648 7.22888 10.4888 7.09937 10.9078C6.96985 11.3269 7.34097 11.7636 8.0832 12.6369L8.27523 12.8628C8.48615 13.111 8.5916 13.2351 8.63905 13.3886C8.68649 13.5421 8.67055 13.7077 8.63866 14.0388L8.60963 14.3402C8.49741 15.5054 8.4413 16.088 8.78038 16.347C9.11945 16.606 9.62914 16.3699 10.6485 15.8976L10.9123 15.7754C11.2019 15.6412 11.3468 15.5741 11.5003 15.5741C11.6538 15.5741 11.7987 15.6412 12.0883 15.7754L12.3521 15.8976C13.3715 16.3699 13.8812 16.606 14.2202 16.347C14.5593 16.088 14.5032 15.5054 14.391 14.3402L14.3619 14.0388C14.3301 13.7077 14.3141 13.5421 14.3616 13.3886C14.409 13.2351 14.5145 13.111 14.7254 12.8628L14.9174 12.6369C15.6596 11.7636 16.0308 11.3269 15.9012 10.9078C15.7717 10.4888 15.2274 10.3648 14.1386 10.117L13.8569 10.0528C13.5476 9.98241 13.3929 9.94719 13.2687 9.85231C13.1444 9.75744 13.0648 9.61365 12.9055 9.32606L12.7604 9.06425C12.1997 8.05223 11.9194 7.54622 11.5003 7.54622Z"
                  fill="#FFCE10"
                />
              </svg>
            </div>
            <div className="flex-1 text-center">
              <div className="text-sm font-medium">{cert.name}</div>
              <div className="text-xs font-normal">{cert.authorizedBy}</div>
            </div>
            {edit && <button onClick={(e)=>{
                axios.delete("/update/certification",{data:{certification : cert}}).then(res=>{
                    setUser(res.data) ;
                    setCertification(certification.filter(e => e!==cert)) ;
                })
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-4 h-4 ml-2 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>}
          </li>}) }
        </ul>
      </section>
    </>
  );
}

export default Certifications;
