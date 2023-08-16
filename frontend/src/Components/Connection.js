import React ,{useEffect, useState}from 'react'
import { GetUserContext } from '../App'
import axios from 'axios'

function Connection() {
    const {user, setUser} = GetUserContext()
    const [connection ,setConnection] = useState(user.connections)
    const [search , setSearch] = useState([])
    useEffect(()=>{
        axios.get('/user/all').then((res)=>{
            console.log(res.data)
            setSearch(res.data)
        }).catch((err)=>console.log(err))

    },[])
  return (
    <>
    <div className='bg-indigo-900 h-[15%] rounded-b-lg px-8 py-4 text-white '>
       My Connection  
    </div>
    <div className='absolute w-full md:w-[90%] md:left-[5%] top-[15%] text-sm h-fit '>
        <div className='bg-white rounded-lg shadow-lg p-8 h-full flex  flex-col  w-full'>
            <section>
                <ul className='grid grid-flow-col grid-rows-2  overflow-auto '>
                {connection.map((item,i) => {
                return (<li key={i} className='profile-block flex max-w-fit mx-3 space-x-2 items-center  '>
                    <div className='text-center w-32 '>
                        <p className='font-semibold pb-3'> {item.name}</p>
                        <p className='profile-desc pb-2'>SDE intern @abccihjf sahdui jashdu</p>
                        <button className='edit-btn' onClick={()=>{
                            axios.delete("update/connections",{data:{connections : item}}).then((res)=>{
                                console.log(res)
                                setConnection(res.data.connections)
                            }).catch((err)=>console.log(err))
                        }}>Remove Connection</button>
                    </div>
                    <div className='w-20'>
                        <img src='https://s3-alpha-sig.figma.com/img/c373/419d/749b3ba6942427a90b4eb80c1511812a?Expires=1692576000&Signature=gUxmAwe7hMq0th5HBRhh6sBPCfsM2rZjbqvwJ9p1N~qXonXlRZm99NeF1Kx7tVuMr4nBRQp8YvbtEC0bp3QL7zEhdktnt1KHvMETVbuZ6mouZtKMvXA~dxsjUM2GVMQOslYS2biT-b2uraBtVWC3wMnlQr61RxdLNpijj1hRH0xA8DLb-Oxzph5cHu6qGycq65LhEAhiCUVIouc-cOB9AIyxELOKKqcJveC8q7SymRgq3jEU0FsZj-S4nXwW3RD-XCBCPv7ylzYWz73GvAwmqqszG1dVnO1ju1FdPCeBb8u~vCJKR4rn5n-LZb8jZOxd7TmYE8Ss16Zvk0YiozK0OQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='profile' className='rounded-full h-20 w-20 bg-rose-300'/>
                    </div>
                </li>)
})}
            </ul>
            </section>

            <section className='mt-8'>
                <p className='py-2 font-medium text-base'>You Can Also Connect to</p>
                <ul className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  overflow-scroll '>
                {search.map((item,i) => {
                    if(connection.find((element)=>element.email === item.email) || item._id === user._id) return (<> </>)
                return (<li key={i} className='profile-block flex max-w-fit mx-3 space-x-2 items-center  '>
                    <div className='text-center w-32 '>
                        <p className='font-semibold pb-3'> Rohan Hait</p>
                        <p className='profile-desc pb-2'>SDE intern @abccihjf sahdui jashdu</p>
                        <button className='edit-btn' onClick={()=>{
                            axios.put("update/connections",{connections : item}).then((res)=>{
                                console.log(res)
                                setUser(res.data) ;
                                setConnection(res.data.connections)
                            }).catch((err)=>console.log(err))
                        }}>Connect</button>
                    </div>
                    <div className='w-20'>
                        <img src='https://s3-alpha-sig.figma.com/img/c373/419d/749b3ba6942427a90b4eb80c1511812a?Expires=1692576000&Signature=gUxmAwe7hMq0th5HBRhh6sBPCfsM2rZjbqvwJ9p1N~qXonXlRZm99NeF1Kx7tVuMr4nBRQp8YvbtEC0bp3QL7zEhdktnt1KHvMETVbuZ6mouZtKMvXA~dxsjUM2GVMQOslYS2biT-b2uraBtVWC3wMnlQr61RxdLNpijj1hRH0xA8DLb-Oxzph5cHu6qGycq65LhEAhiCUVIouc-cOB9AIyxELOKKqcJveC8q7SymRgq3jEU0FsZj-S4nXwW3RD-XCBCPv7ylzYWz73GvAwmqqszG1dVnO1ju1FdPCeBb8u~vCJKR4rn5n-LZb8jZOxd7TmYE8Ss16Zvk0YiozK0OQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4' alt='profile' className='rounded-full h-20 w-20 bg-rose-300'/>
                    </div>
                </li>)
})}
            </ul>
            </section>
        </div>
    </div>

    </>
  )
}

export default Connection