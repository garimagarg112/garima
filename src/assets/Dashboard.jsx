import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate,useParams} from 'react-router-dom';
import { useState ,useEffect,useMemo} from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { fetchUserData,submit,complete,fetchAllUser,fetchTaskUser,fetchtaskdata,fetechtoken } from "../redux/DashboardSlice.jsx";

import Sectinone from './Sectionone.jsx'
import Sidebar from './sidebar.jsx' 
import Header from './Header.jsx'
// import Sec3 from './Sectionthree.jsx';
import TaskManagement from './TaskManagement.jsx'
 import Showuser from './ShowUser.jsx'
 import User from './Users.jsx'


 //import env from "react-dotenv";

export default function Dashboard() {

  const token = sessionStorage.getItem('token')
  
 // console.log( cookie.get("token"))
  const dispatch = useDispatch();
  let datavar = useSelector((state) => state.data);
  const navigate = useNavigate()
 
  let id = sessionStorage.getItem("id");

  const baseUrl = import.meta.env.VITE_App_Url;

 

  const [userdata,setUserdata] = useState([])
  const [editdata,setEditdata] = useState([])
  const [productList,setProductList] = useState([])
  const [isshowdash,setIsshowdash] = useState(0);

  useEffect(()=>{
    // console.log(id)
      dispatch(fetechtoken(token))
      dispatch(fetchUserData(id));
      dispatch(fetchAllUser());
 
   },[])

  useEffect(()=>{
    // console.log(id)
    if(sessionStorage.getItem('loggedin') !== 'true'){
      navigate("/");
    }
   
 
   },[])

   useEffect(()=>{
      dispatch(fetechtoken(token))
      
     },[])

   useEffect(()=>{
    if(datavar.token === 'TokenExpiredError'){ 
      navigate("/");
   } 
   },[datavar.token])


     useEffect(()=>{
         let data = datavar.task.editdata
         setEditdata(data)     
        setUserdata(datavar.userdata)
         setProductList(datavar.userdata)
   
      //  }
       },[datavar.task])

           const[showTheme,setShowTheme] = useState(true)
           
         
       
         const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
         const xLabels = [
           'Page A',
           'Page B',
           'Page C',
           'Page D',
           'Page E',
           'Page F',
           'Page G',
         ];
       
         const uvData = [4000, 10, 2000, 10, 1890, 0, 3490];
       
         const toggleTheme = () => {
           let toglshowTheme = !showTheme;
           setShowTheme(toglshowTheme)
         // console.log(showTheme)
         }
       
         const showdash =(val) =>{
          // console.log(val)
           setIsshowdash(val)
         }

  return (
  <div
       className= { showTheme ?  '' : 'dark'} 
        >
      
    
        
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#e8e8e8] dark:bg-gray-700 text-black dark:text-white">
    
      
       <Header editdata={editdata} toggleTheme={toggleTheme} showTheme ={showTheme} showdash={showdash} baseUrl={baseUrl} />
       
    
        <div className=' h-full dark:bg-gray-700'>
            
          <Sidebar id={id} showdash={showdash} baseUrl={baseUrl} />
    
         { isshowdash == 0 && (
            
         
                  <Sectinone  userdata={userdata} productList={productList}  showTheme={showTheme} baseUrl={baseUrl} showdash={showdash}/> 
          
       )}
   
   
       { isshowdash == 1  && (
           <TaskManagement  productListnw={productList} showTheme={showTheme} userdata={userdata}setUserdata={setUserdata} baseUrl={baseUrl}  />
         )}
        {  isshowdash == 2  && (
           <Showuser baseUrl={baseUrl} />
       )}
 
   
  
   { isshowdash == 3  && (

     <div className="chartmrgn  h-full ml-20 mr-10  mb-10 md:ml-20 md:mr-10">
    <User  userdata={userdata}   showTheme={showTheme} isshowdash={isshowdash} baseUrl={baseUrl} showdash={showdash} key="user" />
     </div>
   )}
   
        </div>
          </div>
          
      
         < ToastContainer />
</div>
  )
}
