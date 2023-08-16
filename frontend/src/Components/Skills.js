import React , {useState} from 'react'
import { GetUserContext } from '../App';
import axios from 'axios';
function Skills() {
    const {user ,setUser} = GetUserContext() ;
    const[skills , setSkills] = useState([...user.skills]) ;
    const [edit , setEdit] = useState(false) ;
    const [skillName , setSkillName] = useState("") ;
    const addSkill = ()=>{
        if(!skillName) return ;
        if(skills.includes(skillName)) return ;
        setSkills([...skills , skillName]) ;
        setSkillName("") ;
    }
    const removeSkill = (skill)=>{
        setSkills(skills.filter(s=>s!==skill)) ;
    }
    const saveSkills = ()=>{
        axios.put('/update/skills' , {skills}).then(res=>{
            setUser(res.data) ;
        }).catch(err=>console.log(err)) ;
        setEdit(false) ;
    }
  return (
   <>
   <div className='flex flex-col items-center md:items-start profile-block w-full '>
        <div className='flex w-full justify-between py-2'>
                <div>Skills </div>
            {edit ? <button className='edit-btn' onClick={e=>{saveSkills()}} >Save</button> : <button className='edit-btn' onClick={()=> {setEdit(true)}}>Edit</button>}
            </div>
           {!edit ? <ul className='grid sm:grid-cols-3 grid-flow-row gap-2 w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {skills.map(skill=>{
                    return <li className='bg-gray-50 rounded-md p-2 w-fit' key={skill}>{skill}</li>
                })
                }
            </ul> :
            <>
            <div>
            <input type='text' value={skillName} onChange={(e)=>{setSkillName(e.target.value)}} className='border outline-none flex-1 mr-8 border-black' /> 
            <button className='edit-btn text-sm ' onClick={e=>{addSkill()}} >Add</button>
            </div>
            <ul className='grid sm:grid-cols-3 grid-flow-row gap-2 w-full grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
                {skills.map(skill=>{
                    return <li className='bg-gray-50 rounded-3xl border border-gray-600 p-2 w-fit items-center flex' key={skill}>{skill} 
                    <button onClick={e=>{removeSkill(skill)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="w-4 h-4 ml-2 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg></button>
                    </li>
                })
                }
            </ul>
            </>
            }
    </div>
   </>
  )
}

export default Skills