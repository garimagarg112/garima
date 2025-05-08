import React from 'react'
//import Sidebar from './sidebar.jsx' 
//import Header from './Header.jsx'
import { Link } from "react-router";


export default function Sidebar({id,showdash}) {

  return (
    <div className=" fixed flex flex-col top-14 left-0 w-16  hover:w-16 bg-[#2977ff] dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
      <ul className="flex flex-col py-4 space-y-1">
        {/* <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Main</div>
          </div>
        </li> */}
        <li>

      
          <Link to={`/dashboard`} title="Dashboard" onClick={() =>showdash(0)} className="relative flex flex-row items-center h-11 focus:outline-none hover:text-blue-800 hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </span>
            {/* <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span> */}
          </Link>
        </li>

        <li>
          <a href="#" title=" Task Management" onClick={() =>showdash(1)} className="relative flex flex-row items-center h-11 focus:outline-none hover:text-blue-800 hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
            </span>
            {/* <span className="ml-2 text-sm tracking-wide truncate">Task Management</span> */}
          </a>
        </li>

        {/* <li className="px-5 hidden md:block">
          <div className="flex flex-row items-center mt-5 h-8">
            <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Settings</div>
          </div>
        </li> */}
         <li>
          <a href="#" title=" Users " onClick={() =>showdash(3)} className="relative flex flex-row items-center h-11 focus:outline-none hover:text-blue-800 hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
           
          </a>
        </li>
        <li>
          <a href="#" title=" User  Profile " onClick={() => showdash(2)} className="relative flex flex-row items-center h-11 focus:outline-none hover:text-blue-800 hover:bg-white dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6">
            <span className="inline-flex justify-center items-center ml-4">
                <svg id="icon-forms" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" ></path><path d="M14,2L14,8L20,8" ></path><path d="M16,13L8,13" ></path>
                    <path d="M16,17L8,17" ></path>
                    <path d="M10,9L9,9L8,9"></path>
                </svg>
             </span>
          
          </a>
        </li>
    
      </ul>
      {/* <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p> */}
    </div>
  </div>

  )
}
