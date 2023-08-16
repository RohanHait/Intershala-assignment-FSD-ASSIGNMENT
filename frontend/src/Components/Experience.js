import React, { useState } from "react";
import Logo from "../Logo.png"
import { GetUserContext } from "../App";
import axios from "axios";

function Experience() {
  const { user, setUser } = GetUserContext();
  const [experience, setExperience] = useState(user.experience);
  const [edit, setEdit] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    type: "",
  });
//   console.log(Logo);
  return (
    <>
      <section className="flex flex-col items-center md:items-start px-4 py-3 border-none  w-full mx-3">
        <div className="flex justify-between w-full items-center md:items-start">
          <div className="text-sm font-medium "> Experience </div>
          {edit ? <button className="edit-btn" onClick={()=>setEdit(false)}>Cancel</button> : <button className="edit-btn"onClick={()=>{setEdit(true)}}>Edit</button>}
        </div>
        {
            edit && <div className="flex flex-col w-full">
                <form className="flex flex-col w-full ">
                    <div className="flex space-x-2 p-1 items-center ">
                        <label htmlFor="company">Company</label>
                        <input type="text" id="company" value={newExperience.company} onChange={e=>setNewExperience({...newExperience , company : e.target.value})} className="border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" />
                    </div>
                    <div className="flex space-x-2 p-1 items-center ">
                        <label htmlFor="role">Role</label>
                        <input type="text" id="role" value={newExperience.role} onChange={e=>setNewExperience({...newExperience , role : e.target.value})} className="border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" />
                    </div>
                    <div className="flex space-x-2 p-1 items-center ">
                        <label htmlFor="startDate" className=" ">Start Date</label>
                        <input type="text" className="border outline-none flex-1 w-10 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" onChange={e=>setNewExperience({...newExperience , startDate : e.target.value})}  value={newExperience.startDate}/>
                        <label htmlFor="endDate" className="" >End Date</label>
                        <input type="text"className="border outline-none flex-1 w-10 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" onChange={e=>setNewExperience({...newExperience , endDate : e.target.value})} value={newExperience.endDate} />
                    </div>
                    {/* <div className="flex  space-x-2 p-1 items-center">
                        <textarea type="text" id="description" value={newExperience.description} placeholder="Description" onChange={e=>setNewExperience({...newExperience , description : e.target.value})} className="border outline-none flex-1  border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400 resize-none" />
                    </div> */}
                    <div className="flex  space-x-2 p-1 items-center">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type" value={newExperience.type} onChange={e=>setNewExperience({...newExperience , type : e.target.value})} className="border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400">
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </form>
                <div className="flex-1">
                    <button className="bg-indigo-500 rounded-2xl p-2 w-full text-gray-100 hover:bg-indigo-700" onClick={()=>{
                        axios.put("/update/experience",{experience : newExperience}).then(res=>{
                            setUser(res.data) ;
                            setExperience(res.data.experience) ;
                            setNewExperience({
                                company: "",
                                role: "",
                                startDate: "",
                                endDate: "",
                                description: "",
                                type: "",
                            })
                        }).catch(err=>console.log(err))
                        }}>Add</button>
                </div>
            </div>

        }
        <ul className="w-full">
            {experience.map((exp , index)=> (
          <li key={index} className="flex" >
            <div className="rounded-2xl profile-block flex w-full px-4 flex-1 items-center" >
            <div className="flex flex-col flex-1">
              <div className="flex flex-1 text-xs  justify-between">
                <span>{exp.startDate + " - " + exp.endDate}</span>
                <span>{exp.type}</span>
              </div>
              <div className="flex flex-1 justify-between profile-desc">
                <span>{exp.company}</span>
                <span> ---{exp.role} </span>
              </div>
            </div>
            <div>
              <img src={Logo} alt="logo" className=" object-cover px-2" />
            </div>
            </div>
            {edit && <button onClick={(e)=>{
                axios.delete("/update/experience",{data:{experience : exp}}).then(res=>{
                    setUser(res.data) ;
                    setExperience(res.data.experience) ;
                }).catch(err=>console.log(err))
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-4 h-4 ml-2 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>}
          </li>))
                }
          
        </ul>
      </section>
    </>
  );
}

export default Experience;
