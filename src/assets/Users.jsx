import React from 'react'
import {useNavigate,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useContext,useState ,useEffect,useMemo} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { fetchAllUser,getUserData } from "../redux/DashboardSlice.jsx";

export default function Users({showTheme,isshowdash,baseUrl,showdash}) {    
 //  console.log(" h     "+productList)
     let [rowsLimit] = useState(2);
      const [productList,setProductList] = useState([])
         let [rowsToShow, setRowsToShow] = useState([]);
       //  console.log(rowsToShow+ "   fgfdgdghgjhj")
         const [customPagination, setCustomPagination] = useState([]);
         const [totalPage,setTotalpage] = useState([]);
         const [currentPage, setCurrentPage] = useState(0);
          const [searchbr,setSearchbr] = useState(false)
           const [taskdata,setTaskdata] = useState({})
           const dispatch = useDispatch();
          const [showAll, setShowAll] = useState(0);

           const isEmptyObject = (obj) => Object.keys(obj).length === 0;
           let datavar = useSelector((state) => state.data);
             useEffect(()=>{
              // console.log(id)
             
                //dispatch(fetchUserData(id));
                dispatch(fetchAllUser());
           
             },[])
          
               useEffect(()=>{
                
                   let users = datavar.userdata
                   //console.log(users)
                   if(users.length > 0 ){

                    setProductList(users)
                    let newary = users.slice(0, rowsLimit)
                    setRowsToShow(newary);
                    setTotalpage(Math.ceil(users?.length / rowsLimit))
                    setCustomPagination(
                      Array(Math.ceil(users?.length / rowsLimit)).fill(null)
                    );
                   }

                //  }
                 },[datavar.userdata])
        //    useEffect(()=>{
        //   //  console.log(productList)
        //     let newary = productList.slice(0, rowsLimit)
        //     setRowsToShow(newary);
        //     setTotalpage(Math.ceil(productList?.length / rowsLimit))
        //     setCustomPagination(
        //       Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
        //     );
           
        //   },[productList])
  
        const search = (e) =>{
          let val = e.target.value
           let userifo = productList.filter((t) => t.name == val )
          //console.log(userifo)
          if(userifo.length > 0){
            //  setIsloginshow(4)
           //   setUserdatanw(userdata)
           let newary = userifo.slice(0, rowsLimit)
              setRowsToShow(newary);
              setSearchbr(true)
              setShowAll(0)
          }
          else{
              setSearchbr(false)
              let newary = productList.slice(0, rowsLimit)
              setRowsToShow(newary)
          }
      
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
            
                const [modalIsOpen, setIsOpen] = useState(false);

                                 const nextPage = () => {
                                   const startIndex = rowsLimit * (currentPage + 1);
                                   const endIndex = startIndex + rowsLimit;
                                   const newArray = productList.slice(startIndex, endIndex);
                                   setRowsToShow(newArray);
                                   setCurrentPage(currentPage + 1);
                                 };
                                 const changePage = (value) => {
                                   const startIndex = value * rowsLimit;
                                   const endIndex = startIndex + rowsLimit;
                                   const newArray = productList.slice(startIndex, endIndex);
                                   setRowsToShow(newArray);
                                   setCurrentPage(value);
                                 };
                                 const previousPage = () => {
                                   const startIndex = (currentPage - 1) * rowsLimit;
                                   const endIndex = startIndex + rowsLimit;
                                   const newArray = productList.slice(startIndex, endIndex);
                                   setRowsToShow(newArray);
                                   if (currentPage > 1) {
                                     setCurrentPage(currentPage - 1);
                                   } else {
                                     setCurrentPage(0);
                                   }
                                 };
                                 useMemo(() => {
                                   setCustomPagination(
                                     Array(Math.ceil(productList?.length / rowsLimit)).fill(null)
                                   );
                                 }, []);
            
                            
            
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


                    
                                 const Viewuser= (uid) => {
                                 // let editvar =  userdata[i];  
                                 //console.log(uid)
                                  dispatch(getUserData(uid));
                                  setIsOpen(true);
                                  //console.log(users)
                                  
               
                              }

                              useEffect(()=>{
                               let users= datavar.viewuserdata
                               
                                    setTaskdata(users)
                                  
                                
                             //  }
                              },[datavar.viewuserdata])

  return (

   
    <div className={isshowdash === 3 ? 'mrgntop ' : ''} >

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  p-4 gap-10">
        {isshowdash === 3  && (  
        <div className="text-left mt-4 ">
        <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
          <button className="outline-none focus:outline-none bg-transparent">
            <svg className="w-5 text-gray-600 h-5 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
              <input type="search" name="" id="" placeholder="Search" onChange={search}  className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent" />
              
            
              </div>
        </div>
        )}
          </div>


          <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2" >
            <table className="table-auto overflow-scroll md:overflow-auto w-full  font-inter  ">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase  dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                
                
                  <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                  User Name
                  </th>
                  <th className="py-3 px-3 justify-center gap-1 whitespace-nowrap">
                  Email
                  </th>
                  <th className="py-3 px-3  justify-center gap-1  whitespace-nowrap">
                  phone
                  </th>
                {  isshowdash === 3 && ( 
                  <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                  Action
                  </th>
                )}
                </tr>
  
                      
              </thead>
              <tbody>
              
             
             {    rowsToShow.map(function(data,i){
                  //    if (data['task']['taskname'] !== '') {
                  
              return    <tr
                    className="text-xs border-y font-semibold tracking-wide text-center text-gray-500 uppercase  dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                    key={i}
                  >
                   
                    <td
                      className={`py-2 px-3 font-normal text-base text-wrap
                      
                          "border-t"
                      whitespace-nowrap`}
                    >
                      {data.name}
                    </td>
                    <td
                      className={`py-2 px-3 font-normal text-base  "border-t"
                      whitespace-nowrap`}
                    >
                      {data['email'] }
                    </td>
                    <td
                      className={`py-2 px-3 text-base  font-normal  "border-t"
                      } whitespace-nowrap`}
                    >
                      {data['phone']}
                    </td>
                   { isshowdash === 3 && (

                    <td
                      className={`py-5 px-4 text-base  font-normal  "border-t"
                      }`}
                    >
                        
                      <button onClick={()=>Viewuser(data['_id'])} className="px-4 py-2 mx-3 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> View </button>
                                     
                    </td>
                   )}
                    
                  </tr>
                  // }
                
                  })}
                  
              </tbody>
            </table>
          </div>
              {!searchbr && (
               <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 my-3 px-1 items-center">
               <div className="text-lg">
                 Showing {currentPage == 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
                 {currentPage == totalPage - 1
                   ? productList?.length
                   : (currentPage + 1) * rowsLimit}{" "}
                 of {productList?.length} entries
               </div>
               <div className="flex">
                 <ul
                   className="flex justify-center items-center gap-x-[10px]"
                   role="navigation"
                   aria-label="Pagination"
                 >
                   <li
                     className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                       currentPage == 0
                         ? "bg-[#cccccc] pointer-events-none"
                         : " cursor-pointer"
                     }
       `}
                     onClick={previousPage}
                   >
                     <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                   </li>
                   {customPagination?.map((data, index) => (
                     <li
                       className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                         currentPage == index
                           ? "text-blue-600  border-sky-500 "
                           : "border-[#E4E4EB]  dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                       }`}
                       onClick={() => changePage(index)}
                       key={index}
                     >
                       {index + 1}
                     </li>
                   ))}
                 
                   <li
                     className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                       currentPage == totalPage - 1
                         ? "bg-[#cccccc] pointer-events-none"
                         : " cursor-pointer"
                     }`}
                     onClick={nextPage}
                   >
                     <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                   </li>
                 </ul>
               </div>
             </div>
              )}

    
 <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        
      >
        <div style={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  py-2 px-4 gap-10 border-b  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="text-left ">
                <h2 style={{ color: !showTheme  ? '#ffffff' : '#000000'}} >View User</h2>
                </div>
                <div className="text-right  ">
                <button onClick={closeModal}><IoMdClose /></button>
                </div>
        </div>
            
        {/* <div className="mt-12 mx-4 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    */}
                    { taskdata.name !==  undefined && (
                    <div style={{ backgroundColor: !showTheme  ? 'rgb(180, 180, 180)' : 'rgb(240, 240, 240)', color: showTheme  ? '#000000' : '#757575'}}  className="p-6 mr-2 my-4 flex flex-col items-center rounded-lg shadow-sm md:flex-row md:max-w-xl  dark:hover:bg-gray-700">

                         
                        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48  md:rounded-s-lg" src={`${baseUrl}${taskdata['image']}`} alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{taskdata['name'].toUpperCase()}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Email: {taskdata['email']}</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Phone: {taskdata['phone']}</p>
                        </div>
                      
                    </div>
 )}
                    <div tyle={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className="text-right border-t">
                    <button onClick={closeModal} style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className=" md:w-40 mb-3  dark:bg-gray-100 dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Close</button>
                  </div>

                   
                {/* </div>
        </div> */}
            
    </Modal>
    </div>
    
  )
}
