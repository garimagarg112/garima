import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState ,useEffect,useMemo} from 'react'
import Image from './image/a5.jpg';
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { getawholetask,fetchtaskdata,fetchTaskUser,delTask } from "../redux/DashboardSlice.jsx";




export default function TaskManagement({productListnw,showTheme,userdata,setUserdata}) {
  let sessnname = sessionStorage.getItem("name");
 // console.log(sessnname)
  const taskUrl = import.meta.env.VITE_Task_Url;

  const [productList,setProductList] = useState(productListnw)
   const [showAll, setShowAll] = useState(0);
   const [viewTask, setViewTask] = useState(0);
       let [rowsLimit] = useState(2);
       let [rowsToShow, setRowsToShow] = useState([]);
       const [customPagination, setCustomPagination] = useState([]);
       const [totalPage,setTotalpage] = useState(0);
       const [currentPage, setCurrentPage] = useState(0);
      const[delvalue,setDeleteval] = useState([])
      const [fields, setFields] = useState({})   
       const [errors, setErrors] = useState({});
        const [taskdata,setTaskdata] = useState({})
        const [usertaskdata,setUserTaskdata] = useState({})
        const [searchbr,setSearchbr] = useState(false)

       const[userindex,setUserindex] = useState(null)
       const[taskindex,setTaskindex] = useState(null)
       const [seditAll, setseditAll] = useState(0);

     const dispatch = useDispatch();
     let datavar = useSelector((state) => state.data);    

     useEffect(() =>{

        dispatch(  getawholetask())
     },[])

              useEffect(()=>{
                
                setProductList(datavar.taskall)  // for showing first graph no of post for every user
                setRowsToShow(datavar.taskall.slice(0, rowsLimit))
                setTotalpage(Math.ceil(datavar.taskall?.length / rowsLimit)) 
                setCustomPagination(
                  Array(Math.ceil(datavar.taskall?.length / rowsLimit)).fill(null)
                );
              },[datavar.taskall])



        const [task, setTask] = useState({
            'taskstatus' : 'incomplete',
            'priority' : 'normal'
      
        });
      const handleChnage = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let val = value;
         
             if(name == 'phone'){
             
                 val = val.replace(/[^0-9]/g, '')
               }
               if(name == 'name'){
               
                 val = val.replace(/[^A-Za-z]/g, '')
     
               }
          
         //console.log("first"+name+" df "+val)    
        setFields({...fields,[name]:val})
      }

      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          paddingLeft : '0px',
          paddingRight : '0px',
          backgroundColor: !showTheme  ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
           zIndex: 999
        },
      };   
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
                    
                     const [modalIsOpen, setIsOpen] = useState(false);

                     function openModal() {
                       setIsOpen(true);
                       setShowAll(2);
                       let newobj = {
                        'taskname' : "",
                        'taskstatus' : 'incomplete',
                        'priority' : 'normal',
                        
                      }
                       setFields(newobj)
                       setseditAll(0)
                     }
             
                     function afterOpenModal() {
                       // references are now sync'd and can be accessed.
                     //  subtitle.style.color = showTheme ? '#f00' : '#ffffff' ;
                     }
             
                     function closeModal() {
                       setIsOpen(false);
                       setShowAll(0);
                     }

                     const checkdel = (chkcd,value) => {

                      let delvaluenw = [...delvalue]
                      if(chkcd){
                         setDeleteval([...delvalue,value])
                    }
                     else{
                            delvaluenw.splice(value,1);
                           setDeleteval(delvaluenw)
                        }
 
                   }
                     const muldel= (e) =>{
                        let val =  e.target.value;
                        let name =  e.target.name;
                        
                        if(val == 'delete'){
                         let usernw = [...userdata]
                          //  console.log(delvalue)
                           if(delvalue.length>0){
                             
                            for(let i=0;i<delvalue.length;i++){
                             
                                let payload = {
                                    id : delvalue[i],
                                    userid : userindex
                                }
                                //console.log(payload)
                                dispatch(delTask(payload));
                             
                           }
                           if(usernw.length > 0){
                           
                             let newary = usernw.slice(0, rowsLimit)
                              setRowsToShow(newary);
                              setCurrentPage(0)
                      }
             
                        }
                        setDeleteval([])
                     }
                   }
     
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
                
                const updatetask = (e) =>{
                  e.preventDefault()
                  let i = fields['index'];
                 
                  setFields({...fields, priority :'normal', taskstatus :'incomplete'})
                     setShowAll(1)
                     setUserindex(i)
                 }

                // function for edit task 
                 const updatetaskedit = (id,uid) =>{
                   // console.log(id)
                    dispatch(fetchtaskdata(id));
                    setViewTask(1)
                   setShowAll(1)
                   setUserindex(uid)
                   setTaskindex(id)
                  // setFields(editvar['task'])
                   setIsOpen(true);
              }

               // useeffect for edit task 
              useEffect(()=>{
               // console.log("first")
              //  console.log(datavar.taskdata)
              //  setUserTaskdata(datavar.taskuserdata)
              let newobj = {
                'taskname' : datavar.taskdata.taskname,    // useeffect for edit task 
                'taskstatus' :datavar.taskdata.taskstatus,
                'priority' : datavar.taskdata.priority,
                
              }
             // console.log(newobj)
              setFields(newobj)
              setShowAll(1)
              setseditAll(1)
               },[datavar.taskdata])

              const deletetask = (id,uid) =>{
                   // console.log(uid)
                    let payload = {
                        id : id,
                        userid : uid
                    }
                    //console.log(payload)
                    dispatch(delTask(payload));
                }

                // function for view task of user
                const viewUsertask = (uid) =>{

                      dispatch(fetchTaskUser(uid));
                      setViewTask(1)
                }

                    // function for view task of user
                     useEffect(()=>{
                      //  console.log("first")
                      //  console.log(datavar.taskuserdata)
                        setUserTaskdata(datavar.taskuserdata)
                   
                       },[datavar.taskuserdata])

                 const handleSubmit =(e) =>{
                      e.preventDefault()
                  //    console.log(userindex)   
                  if(seditAll === 0)  {
                      let newobj = {
                        'taskname' : fields['taskname'],
                        'taskstatus' : fields['taskstatus'],
                        'priority' : fields['priority'],
                        'userid' : userindex
                      }

                     // console.log(newobj)

                    fetch(`${taskUrl}saveTask`, {
                        method: 'POST',
                        body: JSON.stringify(newobj),
                          headers: {
                            'Content-Type': 'application/json',
                          },
                      })

                      .then((response) =>  response.json())
                      .then((data) => {
                       // console.log(data);
                        if(data.result) {
                          setProductList(data.result)  // for showing first graph no of post for every user
                          setRowsToShow(data.result.slice(0, rowsLimit))
                          setTotalpage(Math.ceil(productList?.length / rowsLimit)) 
                          //  setUserdateail(data.result[0])
                  
                        }
                        
                      })
                      .catch(error => {
                      //  console.log(error);
                      });
                         setIsOpen(false);
                         setShowAll(0);
                    }
                    else{
                        //let uid = userindex
                        let id = taskindex
                       // console.log(uid,id)
                        let newobj = {
                            'taskname' : fields['taskname'],
                            'taskstatus' : fields['taskstatus'],
                            'priority' : fields['priority'],
                            'userid' : userindex,
                            'id' : id
                          }
    
                         // console.log(newobj)
    
                        fetch(`${taskUrl}editTask`, {
                            method: 'POST',
                            body: JSON.stringify(newobj),
                              headers: {
                                'Content-Type': 'application/json',
                              },
                          })
    
                          .then((response) =>  response.json())
                          .then((data) => {
                          //  console.log(data);
                            if(data.result) {
                                setUserTaskdata(data.result)
                              //  setUserdateail(data.result[0])
                      
                            }
                            
                          })
                          .catch(error => {
                           // console.log(error);
                          });
                             setIsOpen(false);
                             setShowAll(0);
                    }
                 }
                 const backtask =()=>{
                  dispatch(  getawholetask())
                    setViewTask(0)

                 }
  return (
    <div className='mrgntop' id="task">
            <div className="chartmrgn  h-full ml-20 mr-10  mb-10 md:ml-20 md:mr-10 ">
            {viewTask === 0 && (
                <div className=''>

        <div className="w-full  px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  p-4 gap-10">
          
            <div className="text-left mt-4 ">
            <div className="bg-white rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
              <button className="outline-none focus:outline-none bg-transparent">
                <svg className="w-5 text-gray-600 h-5 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
                  <input type="search" name="" id="" placeholder="Search" onChange={search}  className="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent" />
                  
                
                  </div>
            </div>
            { sessnname === 'admin' && (
            <div className="text-right">
            <button  onClick={openModal} className="md:w-40 mb-3 bg-blue-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300"> Assign Task</button>
            </div> 
            )}
                          
              </div>
            </div>
          
                     <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                     <table className="table-auto overflow-scroll md:overflow-auto w-full  font-inter  ">
                       <thead className="rounded-lg text-base text-white font-semibold w-full">
                         <tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase  dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                         
                         <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                          
                           </th>
                           <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                           User name
                           </th>
                           <th className="py-3 px-3 justify-center gap-1 whitespace-nowrap">
                           Email
                           </th>
                           <th className="py-3 px-3  justify-center gap-1  whitespace-nowrap">
                           Phone
                           </th>
                           <th className="py-3 px-3  justify-center gap-1  whitespace-nowrap">
                           No. of task assigns
                           </th>
                          
                           <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                           Action
                           </th>
                         
                           
                         </tr>
       
                               
                       </thead>
                       <tbody>
                      
                       {rowsToShow.map(function(data,i){
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
                       </td>
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
                               { data['email'] }
                             </td>
                             <td
                               className={`py-2 px-3 text-base  font-normal  "border-t"
                               } whitespace-nowrap`}
                             >
                              { data['phone'] }
                             </td>
                             <td className={`py-2 px-3 text-base  font-normal  "border-t"
                               } whitespace-nowrap`}>
                              {data.task !== undefined && data["task"].length >  0 && (
                                 data["task"].length
                              )}
                             </td>
                             
                             <td
                               className={`py-5 px-4 text-base  font-normal  "border-t"
                               }`}
                             >
                              
                                    {data.task !== undefined && data["task"].length > 0 && (
                                                          <button onClick={()=>viewUsertask(data['_id'])} className="px-4 py-2 mx-3 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100">View Task</button>
                                               
                                    )}  
                                      {data.task !== undefined && data["task"].length === 0 && ( 
                                        
                                        "No task assign"
                                      )}
                                              
                             </td>
                           </tr>
                           // }
                         
                           })}
                           
                       </tbody>
                     </table>
                   </div>
                   {!searchbr && (
            <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
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
                       className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid bg-[#FFFFFF] cursor-pointer ${
                         currentPage == index
                           ? "text-blue-600  border-sky-500"
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
                </div>
          
                     )}
                   
                   {  viewTask === 1 && (
        <div className=''>
             <div className="w-full  px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  p-4 gap-10">
             
              <div className="text-left mt-4 ">
              { sessnname === 'admin' && (
              <select name="muldel" value=""  id="user"   onChange={muldel}  autoComplete="off"  className=" py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" >
                
                <option value=""   >Select Task</option>
                  <option value="delete"  >Delete Task</option>
                  </select>

                )}
              </div>
           
            <div className="text-right">
                <button  onClick={backtask} className="md:w-40 mb-3 bg-blue-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300"> Back</button>
            </div>                
              </div>
            </div>
            <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                <table className="table-auto overflow-scroll md:overflow-auto w-full  font-inter  ">
                    <thead className="rounded-lg text-base text-white font-semibold w-full">
                    <tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase  dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    
                    <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                        
                    </th>
                        <th className="py-3 px-3 justify-center gap-1 whitespace-nowrap">
                        Task
                        </th>
                        <th className="py-3 px-3  justify-center gap-1  whitespace-nowrap">
                        Status
                        </th>
                        <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                        Priority
                        </th>
                        { sessnname === 'admin' && (
                        <th className="py-3 px-3 justify-center gap-1  whitespace-nowrap">
                        Action
                        </th>
                        )}
                    </tr>

                            
                    </thead>
                    <tbody>
                    
                    { usertaskdata.length > 0  && (
                    usertaskdata.map(function(data,i){
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
                    { sessnname === 'admin' && ( 
                      <input type="checkbox" value={data._id} name={`delte${data._id}`} onChange={e=> checkdel( e.currentTarget.checked,e.currentTarget.value )} className="hobbies_class" />
                    )}
                      </td>
                     
                      <td
                        className={`py-2 px-3 font-normal text-base  "border-t"
                        whitespace-nowrap`}
                      >
                        { data['taskname'] }
                      </td>
                      <td
                        className={`py-2 px-3 text-base  font-normal  "border-t"
                        } whitespace-nowrap`}
                      >
                        {data['taskstatus'] == 'complete' && ( 
                                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> Completed </span>
                                    
                                        )}
                                        {data['taskstatus'] == 'incomplete'  && ( 
                                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"> Pending </span>
                                    
                                        )}
                      </td>
                      <td
                        className={`py-2 px-3 text-base  font-normal  "border-t"
                        }`}
                      >
                          {data['priority'] == 'normal' && ( 
                                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> Normal </span>
                                    
                                        )}
                                        {data['priority'] == 'high' && ( 
                                          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"> High </span>
                                    
                                        )}
                      </td>

                      { sessnname === 'admin' && (
                      <td
                        className={`py-5 px-4 text-base  font-normal  "border-t"
                        }`}
                      >
                             
                                        <button onClick={()=>updatetaskedit(data['_id'],data['userid'])} className="px-4 py-2 mx-3 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"> {'Edit Task' } </button>
                                        
                                       
                                        <button onClick={()=>deletetask(data['_id'],data['userid'])} className="px-4 py-2 mx-3 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:bg-red-700 dark:text-red-100"> Delete </button>
                                       
                      </td>

                        )}
                    </tr>
                    // }
                        }
                   ) )}
                      { usertaskdata.length == 0  && (
                                <tr
                            className="text-xs border-y font-semibold tracking-wide text-center text-gray-500 uppercase  dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                           
                          >
                            <td
                              className={`py-2 px-3 font-normal text-base text-wrap
                              
                                  "border-t"
                              whitespace-nowrap`} colSpan="5"
                            >
                                No Data Available
                                </td>
                                </tr>
                      )}
                    </tbody>
                </table>
                </div>
        </div>
                   )}
            </div>

            <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  py-2 px-4 gap-10 border-b">
              <div className="text-left ">
            <h2 style={{ color: !showTheme  ? '#ffffff' : '#000000'}} >Assign Task</h2>
            </div>
            <div className="text-right  ">
            <button onClick={closeModal}><IoMdClose /></button>
            </div>
        </div>
        
        {showAll == 2 && (  
        <form className="p-6 flex flex-col justify-center" id="captchaForm"  onSubmit={updatetask}  method="post" encType="multipart/form-data">


            <div className="flex flex-col mt-2">
              <label htmlFor="status" className="hidden">Status: <span className="homelogformspan">*</span></label>
              <select name="index" id="user"   onChange={handleChnage}  autoComplete="off"    required  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" >
          
            <option value=""  >Select User</option>
              {userdata.map( (e,i) =>  <option value={e._id} key={i} >{e.name.toUpperCase()}</option> )}
              </select>
              <div className="name1 errortext" id="validname">{errors["user"]}  </div>
            </div>




            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  py-2 px-4 gap-10 ">

                <div className="text-right  ">
                <button type="submit"style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}}   className="md:w-40 mb-3 dark:bg-gray-100 dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Submit</button>
                </div>
                  <div className="text-right ">
                  <button onClick={closeModal} style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className="md:w-40 mb-3   dark:bg-gray-100 dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Close</button>
                </div>
                
              </div>

           
            </form>
         
        )}
        
        { showAll == 1   &&  (
              <form className="p-6 flex flex-col justify-center" id="captchaForm"  onSubmit={handleSubmit}  method="post" encType="multipart/form-data">
              {/* <div className="flex flex-col">
                <label htmlFor="name" className="hidden">Task:  <span className="homelogformspan">*</span></label>
                  <input type="text" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none required" 
                      value={taskdata["name"].toUpperCase()}   id="name" disabled    required />
                                
                <div className="name1 errortext" id="validname">{errors["taskname"]}  </div>
                </div> */}
              <div className="flex flex-col mt-2">
                <label htmlFor="name" className="hidden">Task:  <span className="homelogformspan">*</span></label>
                  <input type="text" className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none required" 
                      id="name" placeholder="Enter task"  value={fields["taskname"]}   onChange={handleChnage} name="taskname" autoComplete="off"    required />
                                
                <div className="name1 errortext" id="validname">{errors["taskname"]}  </div>
                </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="status" className="hidden">Status: <span className="homelogformspan">*</span></label>
                <select name="taskstatus"  value={fields["taskstatus"]}    id="taskstatus"   onChange={handleChnage}  autoComplete="off"   required  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" >
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Complete</option>
                </select>
                <div className="name1 errortext" id="validname">{errors["taskstatus"]}  </div>
              </div>

              
              <div className="flex flex-col mt-2">
                <label htmlFor="priority" className="hidden">Priority: <span className="homelogformspan">*</span></label>
                <select name="priority"   value={fields["priority"]}  id="priority"   onChange={handleChnage}  autoComplete="off"   required  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none" >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                </select>
                <div className="name1 errortext" id="validname">{errors["priority"]}  </div>
              </div>


              <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  py-2 px-4 gap-10 ">

                  <div className="text-right  ">
                  <button type="submit" id="hhhh" style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className="md:w-40 mb-3 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right dark:hover:bg-gray-200 transition ease-in-out duration-300">Submit</button>
                  </div>
                    <div className="text-right ">
                    <button onClick={closeModal} style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className=" md:w-40 mb-3  dark:bg-gray-100 dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Close</button>
                  </div>

              </div>

              </form>
        )}
        
        
      </Modal>
            </div>
  
  )
}
