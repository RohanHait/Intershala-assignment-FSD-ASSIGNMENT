import React ,{useState}from 'react'
import { GetUserContext } from '../App'
import axios from 'axios';

function Education() {
    const{user,setUser} = GetUserContext() ;
    const [college,setCollege] = useState("");
    const [degree,setDegree] = useState("");
    const [startYear,setStartYear] = useState("");
    const [endYear,setEndYear] = useState("");
    const [description,setDescription] = useState("");
    const [edit,setEdit] = useState(false);
    const [Education,setEducation] = useState(user.education);
  return (
    <>
    <section className='flex flex-col items-center md:items-start px-4 py-3 border-none  w-full mx-3'>
    <div className='flex justify-between w-full items-center md:items-start'>
        <div className='text-sm font-medium '> Education </div>
        {edit ? <button className="edit-btn" onClick={()=>setEdit(false)}>Cancel</button> : <button className="edit-btn"onClick={()=>{setEdit(true)}}>Edit</button>}
        </div>
        {
            edit && <div className="flex flex-col w-full">
                <form className="flex flex-col w-full ">
                    <div className="flex space-x-2 p-1 items-center ">
                        <label htmlFor="college">institute</label>
                        <input type="text" id="college" value={college} onChange={e=> setCollege(e.target.value)} className="border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" />
                    </div>
                    <div className="flex space-x-2 p-1 items-center ">
                        <label htmlFor="degree">Degree</label>
                        <input type="text" id="degree" value={degree} onChange={e=> setDegree(e.target.value)} className="border outline-none flex-1 mr-8 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" />
                    </div>
                    <div className="flex space-x-2 p-1 items-center ">
                        <label htmlFor="startDate" className=" ">Start Date</label>
                        <input type="text" className="border outline-none flex-1 w-10 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" onChange={e=>setStartYear(e.target.value)} value={startYear}/>
                        <label htmlFor="endDate" className="" >End Date</label>
                        <input type="text"className="border outline-none flex-1 w-10 border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400" onChange={ e=> setEndYear(e.target.value)} value={endYear} />
                    </div>
                    <div className="flex  space-x-2 p-1 items-center">
                        <textarea type="text" id="description" value={description} placeholder="Description" onChange={e=>setDescription(e.target.value)} className="border outline-none flex-1  border-gray-600 p-2 rounded-md focus:ring-1 focus:ring-inset focus:ring-indigo-400 resize-none" />
                    </div>
                </form>
                <div className="flex-1">
                    <button className="bg-indigo-500 rounded-2xl p-2 w-full text-gray-100 hover:bg-indigo-700" onClick={()=>{
                        axios.put("/update/education",{education : {institute :college,year : startYear + " - " + endYear , description ,degree}}).then(res=>{
                            setUser(res.data) ;
                            setEducation(res.data.education) ;
                            setCollege("") ;
                            setDegree("") ;
                            setStartYear("") ;
                            setEndYear("") ;
                            setDescription("") ;
                            setEdit(false) ;
                        }).catch(err=>console.log(err))
                        }}>Add</button>
                </div>
            </div>

        }
   
    <ul className='w-full'>
        {Education.map((item,index)=>(

        <li key={index} className='rounded-2xl profile-block flex flex-col w-full px-4 items-start'>
                <div className='p-1 text-base text-indigo-800 font-semibold '>
                    {item.institute}
                </div>
                <div className='flex justify-between w-full'>
                    <span>{item.year}</span>
                    <span>{item.degree}</span>
                </div>
                <div className='profile-desc'>
                    {item.description}
                </div>
        </li> ))}   
    </ul>
</section>
</>
  )
}

export default Education