import React from 'react'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { useState} from 'react'
import {useNavigate} from 'react-router-dom';

export default function Header({editdata,toggleTheme,showTheme,showdash,baseUrl}) {

  const navigate = useNavigate()
  const [modalIsOpen, setIsOpen] = useState(false);

 // const showdata = useSelector((state) => state.data.data);
  const logout = () =>{

    setIsOpen(true);
  }
  
  const cnfrmLogout = () =>{

    sessionStorage.clear()
    navigate("/");
  }

              
  function openModal() {
    setIsOpen(true);
   // setShowAll(2);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  //  subtitle.style.color = showTheme ? '#f00' : '#ffffff' ;
  }

  function closeModal() {
    setIsOpen(false);
   // setShowAll(0);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',
     zIndex: 999
    },
  };


  return (
    <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
    <div className="flex  pl-3 w-16 md:w-16 h-14 bg-[#2977ff] dark:bg-gray-800">
    <img className=" md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src={`${baseUrl}lg.png`} />
  

    </div>
   
    
    <div className="flex justify-between items-center w-full h-14 bg-[#ffffff] dark:bg-gray-800 header-right">
   
    <div className="text-left mt-2 ml-4 ">
      
    </div>
    <ul className="flex items-center mt-1">
        <li>
        <button
            aria-hidden="true"
            onClick={toggleTheme}
            className="cursor-pointer group p-2 transition-colors duration-200 rounded-full shadow-md bg-blue-200 hover:bg-blue-200 dark:bg-gray-50 dark:hover:bg-gray-200 text-gray-900 focus:outline-none"
        >

      { !showTheme&& (
            <svg
            
            width="24"
            height="24"
            className="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke=""
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
            </svg>
      )}
         { showTheme&& (
            <svg
          
            width="24"
            height="24"
            className="fill-current text-gray-700 group-hover:text-gray-500 group-focus:text-gray-700 dark:text-gray-700 dark:group-hover:text-gray-500 dark:group-focus:text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke=""
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
            </svg>

         )}
        </button>
        </li>
        <li>
        {/* <Link to={`/showuser/${ btoa(editdata.userid)}`} > */} 
        {editdata.image !== undefined && (

            <div className="flex items-center mx-3 cursor-pointer" onClick={() => showdash(2)}>
            <img src={`${baseUrl}${editdata.image}`} alt="" height="40px" width="50px" className='rounded' />
            <h1 className=" uppercase mr-4 text-gray-700 group-hover:text-gray-500 dark:text-white">{editdata.name}</h1>

            </div>
        )}

          {/* </Link>     */}
        </li>
        <li>
                           
                           {/* <Link to={"/"} className="flex items-center mr-4 hover:text-blue-100 text-white">
                           <span className="inline-flex mr-1">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                           </span>
                           Logout</Link> */}

                           <button onClick={logout} className="cursor-pointer flex items-center mr-4 text-gray-700 group-hover:text-gray-500 dark:text-white">
                           <span className="inline-flex mr-1">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                           </span>
                           Logout</button>
                                             
        </li>
       
    </ul>

 <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        
      >
        <div style={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  py-2 px-4 gap-10 border-b  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="text-left ">
                <h2 style={{ color: !showTheme  ? '#ffffff' : '#000000'}} ></h2>
                </div>
                <div className="text-right  ">
                <button onClick={closeModal}><IoMdClose /></button>
                </div>
        </div>
            
        {/* <div className="mt-12 mx-4 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    */}
                  
                    <div style={{ backgroundColor: !showTheme  ? 'rgb(180, 180, 180)' : 'rgb(240, 240, 240)', color: showTheme  ? '#000000' : '#757575'}}  className="p-6 mr-2 my-4 flex flex-col items-center rounded-lg shadow-sm md:flex-row md:max-w-xl  dark:hover:bg-gray-700">

                         
                      <h5>You sure want to <span className='text-red-600'>Logout</span> ? </h5>
                      
                    </div>

                    <div style={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className=" border-t">
                    <button onClick={cnfrmLogout} style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className="mr-2 md:w-40 mb-3  dark:bg-gray-100 dark:text-gray-800 font-bold py-2 px-6 rounded-lg mt-4  hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Logout</button>
                
                    <button onClick={closeModal} style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className=" md:w-40 mb-3  dark:bg-gray-100 dark:text-gray-800 font-bold py-2 px-6 rounded-lg mt-4 hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Close</button>
                  </div>

                   
                {/* </div>
        </div> */}
            
    </Modal>

    </div>

</div> 
  )
}
