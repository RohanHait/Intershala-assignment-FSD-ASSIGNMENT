import React, { useState } from "react";
import Logo from "../Logo.png";
import Profile from "./Profile";
import Connection from "./Connection";
import { GetUserContext } from "../App";
function Dashboard() {
  const {user} = GetUserContext();
  const [profilePage, setProfilePage] = useState(true) ;
  const [open ,setOpen] = useState(false) ;
  return (
    <div className=" h-screen flex flex-col">
      <div>
        {/* navBar  */}
        <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center w-full justify-between mx-auto px-4 py-2">
            <div className="flex items-center space-x-4 flex-grow-[3]  ">
              <button onClick={()=>{setOpen(!open)}}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
              <div
              className="items-center justify-between mx-10  hidden w-full md:flex md:w-auto relative flex-col"
              id="navbar-sticky"
            >
              <div className="text-xl font-medium px-7 py-2 border border-gray-300 bg-white/50 ">
                Dashboard
              </div>
              
            </div>
              <a href="/" className="flex items-center mx-1 ">
                <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
              </a>
            </div>
            <div className="flex justify-end items-center flex-grow-[2] space-x-4 ">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              </div>
              <div className="flex items-center space-x-4 border-[1px] px-3 py-1 bg-white/50 border-gray-300   shadow-sm  ring-1 ring-inset ring-gray-300/40">
                <div>
                  <img src={user.profilePic} alt="Profile" className="w-10 h-10 rounded-xl bg-red-300" />
                </div>
                <div className="flex flex-1 flex-col justify-center mx-2">
                  <div className=" text-[9px] font-medium ">Welcome Back</div>
                  <div className="text-base font-medium">{user.name} </div>
                </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
              </div>

            </div>
            
          </div>
        </nav>
      </div>
      <div className="flex flex-row  justify-center flex-1 h-full">
      <div className={`h-full flex-1  ${open ? "flex" : "max-md:hidden"}`}>
      <ul className={` md:flex flex-col flex-1 h-full w-full  p-4 z-10  mt-4 font-medium border border-gray-100  bg-gray-50 md:mt-0 md:border-0 md:bg-white ${open ? "flex" : "hidden"}`}>
                <li>
                  <div className="flex items-center space-x-2 px-2 py-1 rounded-lg text-indigo-900 font-normal text-sm ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                  <button onClick={()=>{setProfilePage(true)}} className={`flex-1 ${profilePage ? "border-indigo-700 border" : "hover:bg-gray-100"} py-2  rounded-md `}>
                    <div>My profile</div>
                  </button>
                  </div>
                  </li>
                  <li>
                  <div className="flex items-center space-x-2 px-2 py-1 rounded-lg  text-indigo-900 font-normal text-sm ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <button onClick={()=>{setProfilePage(false)}} className={`flex-1 ${!profilePage ? "border-indigo-700 border" : "hover:bg-gray-100"} py-2  rounded-md `}>
                    <div>My Connections </div>
                  </button>
                  </div>
                  </li>
              <li className="flex item-end  w-full flex-1 flex-col-reverse ">
                <div className="flex justify-center items-center text-indigo-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
              Log Out
              </div>
              </li>
              </ul>
      </div>
      <div className={`flex-auto flex-grow-[4] relative h-full overflow-auto ${open ? "max-md:hidden" : ""} `}> 
        {profilePage ?<Profile/> : <Connection/> }
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
