import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState ,useEffect,useMemo} from 'react'
import {useParams} from 'react-router-dom';
import Image1 from './image/a5.jpg';
import ImageP1 from './image/p1.jpg';
//import Sidebar from './sidebar.jsx' 
//import Header from './Header.jsx'
import { FaCamera } from "react-icons/fa";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { fetchUserData,fetchAllUser,editUser,savePost,getpostByuserId,getpost,getallpost,delpostdsh,getallpostId,editPost } from "../redux/DashboardSlice.jsx";

import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function ShowUser({baseUrl}) {
    const dispatch = useDispatch();
    let datavar = useSelector((state) => state.data);
    //const navigate = useNavigate()
    let name = sessionStorage.getItem("name");
    let id = sessionStorage.getItem("id");
  
    
    const [userdata,setUserdata] = useState([])
    const [editdata,setEditdata] = useState([])
    const [lang,setLang] = useState([])
    const [skills,setSkills] = useState([])
    const [latstpost,setLatstpost] = useState([])
    const [allpost,setAllpost] = useState([])
  const[showTheme,setShowTheme] = useState(true)
  const [fields, setFields] = useState({})  
  
  
  const [postfields, setPostfields] = useState({
    name : '',
    desc : '',
    image : ''
  })   


  const [postfieldsedit, setPostfieldsedit] = useState({
    'name' : '',
    'desc' : '',
    'image' : '',
    '_id' : '' ,
    
  })   
     const [errors, setErrors] = useState({});
     const [imgedt, setImage] = useState('');

     const[editpost,setEditpost] = useState(0)
     let formErrors = {};
   


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

const[isshowsecuser,setIsshowsecuser] = useState(0)
       useEffect(()=>{
        // console.log(id)
        //  dispatch(getpost(id));  // get user   post
          dispatch(getpostByuserId(id)); // get user latest  post
          dispatch(getallpost(id)); 
          dispatch(fetchUserData(id));
          dispatch(fetchAllUser());
     
       },[])
     useEffect(()=>{
         let data = datavar.task.editdata
         let langarr = (data.lang).split(",");
         setLang(langarr)
         let skilarr = (data.skills).split(",");
         setSkills(skilarr)
         setEditdata(data)     
         setFields(data)    
        setUserdata(datavar.userdata)
        
   
      //  }
       },[datavar.task])
       

       useEffect(()=>{
        // console.log(datavar.usrpost)
       //  console.log(datavar.fvpost)
        setLatstpost(datavar.usrpost)
        setAllpost(datavar.allpost)
  
     //  }
      },[datavar.usrpost])   // user latest post
       
         const toggleTheme = () => {
           let toglshowTheme = !showTheme;
           setShowTheme(toglshowTheme)
         // console.log(showTheme)
         }
         const shosecuser3 = (val) => {
          //  console.log(val)
           setIsshowsecuser(val)
          }
          const shosecuser = (val) => {
           
           setIsshowsecuser(val)
          }
       
       
          const openpost = () =>{
            setEditpost(0);
           setIsOpen(true);
          }
          useEffect(() =>{
            //  console.log(datavar.allpostid)
            if (datavar.allpostid && datavar.allpostid.name !== undefined) {
           let newobj =  {
              'name' : datavar.allpostid.name,
              'desc' : datavar.allpostid.desc,
              'image' : datavar.allpostid.image,
              '_id' : datavar.allpostid._id ,
              
            }
            
              setPostfieldsedit(newobj)
              setImage(datavar.allpostid.image)
          }
          },[datavar.allpostid])
       
          const openpostedit = (id) =>{

            dispatch(getallpostId(id));
            setEditpost(1);
           setIsOpen(true);
          }

          const [modalIsOpen, setIsOpen] = useState(false);
       
           function openModal() {
             setIsOpen(true);
             setShowAll(2);
           }
       
           function afterOpenModal() {
             // references are now sync'd and can be accessed.
           // subtitle.style.color = '#f00';
           }
       
           function closeModal() {
             setIsOpen(false);
           // setShowAll(0);
           }

           const handleSubmitPost = (e) =>{
            e.preventDefault()
            
           // console.log(postfields)
                const formData = new FormData();
                //console.log(fields)
                formData.append('name', postfields["name"]);
                formData.append('image', postfields['image']);
                formData.append('desc',  postfields["desc"]);
                formData.append('userid',  id);

                    dispatch(savePost(formData));
    
          //  }
         
            
        }

        
        const handleSubmitPostedit = (e) =>{
          e.preventDefault()
          
         // console.log(postfields)
              const formData = new FormData();
              //console.log(fields)
              formData.append('name', postfieldsedit["name"]);
              formData.append('image', postfieldsedit['image']);
              formData.append('desc',  postfieldsedit["desc"]);
              formData.append('id',  postfieldsedit["_id"]);
              formData.append('userid',  id);
                //console.log(formData)
               dispatch(editPost(formData));
               setIsOpen(false);
        //  }
       
          
      }
         
        const handleChange = (e) => {
     
          let name = e.target.name;
          let value = e.target.value;
          let val = value;
        // console.log(name+"   ho   "+value)
          
              if(name == 'phone'){
              
                  val = val.replace(/[^0-9]/g, '')
                }
                if(name == 'name'){
                
                  val = val.replace(/[^A-Za-z]/g, '')
      
                }
          
         setFields({...fields,[name]: val})
         setErrors(formErrors)
      }


      const handleChangeedit = (e) => {
     
        let name = e.target.name;
        let value = e.target.value;
        setPostfieldsedit({...postfieldsedit,[name]: value})
      }
        

    
      const handlesubmit = (event) => {
        event.preventDefault();
        let skilarr = Array.from(event.target.skills.selectedOptions, option => option.value);
        let langarr = Array.from(event.target.languge.selectedOptions, option => option.value);
       // formFields["skills"] =skilarr
      //  formFields["language"] =langarr
                           
                                     const formData = new FormData();
                                     //console.log(fields)
                                     formData.append('name', fields["name"]);
                                     formData.append('image', fields['image']);
                                     formData.append('email',  fields["email"]);
                                     formData.append('phone',  fields["phone"]);
                                     formData.append('pass',  fields["pass"]);
                                     formData.append('skills', skilarr);
                                     formData.append('lang',  langarr);
                                     formData.append('id',id)
           
                                         dispatch(editUser(formData));
                                         setIsshowsecuser(1)

      }
    
    
          const [showPass, setShowPass] = useState(true);
             const showpass = () =>{
                let showvar =  showPass;
                 showvar = !showvar
                 setShowPass(showvar)
             }

             const handleChangeFile = (e) =>{
               // console.log( e.target.files[0])
                // setImg({
                //   "image": e.target.files[0], // store the file object
                  
                // });
                setFields({...fields, image: e.target.files[0]})
          
               }     
               
               
               
               const handleChangeFilePost = (e) =>{
                setPostfields({...postfields, image: e.target.files[0]})
          
               } 

               const handleChangeFilePostedit = (e) =>{
              //  console.log(e.target.files[0])
                setPostfieldsedit({...postfieldsedit, "image": e.target.files[0]})
          
               } 

               

               const handleChangepost = (e) => {
                let name = e.target.name;
                let value = e.target.value;
                setPostfields({...postfields,[name]: value})
            }


            const delpost =(pstid,userid) =>{
             let payload =  {'id':pstid,'userid':userid }
            // console.log(newobj)
              dispatch(delpostdsh(payload));
            }
            const handleSkillsChange = (e) => {
              const selected = Array.from(e.target.selectedOptions, (option) => option.value);
              setSkills(selected); // update state accordingly
            };
            
            const handleLanguageChange = (e) => {
              const selected = Array.from(e.target.selectedOptions, (option) => option.value);
              setLang(selected); // update state accordingly
            };

  return (
    <>
    
     <div className="chartmrgn  h-full ml-20  mb-10 md:ml-20 md:mr-5 mr-5">
                
                 
                <div className='mt-14   bg-white dark:bg-gray-700 text-black dark:text-white'>   
                    <div className='sec mt-4'>
                        
                    </div>
                    <div className=''>
    
                        <ul>
                        <li>
           
                            <div className="flex items-center mx-3 relative">
                               
                                    <div className='py-2 px-2'>
                                    <img src={`${baseUrl}${editdata.image}`} alt="" height="100px" width="80px" className='rounded-[100%] ' />
                                        
                               
                                </div>
                                <div className='flex '>
                                <h1 className=" uppercase mr-4 text-blue-700 group-hover:text-gray-500 dark:text-white">{editdata.name}</h1>
                                <h1 className=" uppercase mr-4 text-gray-700 group-hover:text-gray-500 dark:text-white">{editdata.email}</h1>
                            </div>
                          </div>      
                            </li>
                        </ul>
                    </div>
                </div>    
    
                <div className=" mt-14  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2  md: gap-10 flex-auto flex-shrink-0  text-black">
                    <div className='bg-white dark:bg-gray-700 text-black dark:text-white mx-6 my-3'>
                    { latstpost.length > 0 && (
                    
                        
                     
                                    
                                      <div className=''>
                                            <h1 className='text-blue-600 dark:text-white my-3 mx-5'>Today Highlights</h1>   
                   
                                    <div className='my-3 mrgn  dark:bg-gray-700' >
                                      <div className='dashitem p-3'>
                                            <div className=' my-3 mx-5'>
                                                <img src={`${baseUrl}${latstpost[0]["image"]}`} className='imgpost' alt="" />
                                            </div>
                                            <h4 className='text-gray-600 dark:text-white my-3 mx-5 font-bold text-2xl'>{ latstpost[0].name}</h4>
                                            <p className='text-gray-400 dark:text-white my-3 mx-5'>{ latstpost[0].desc}</p>
                                            </div>
                                          </div>
                                        </div>  
                     ) }
                    { 
                    allpost.length > 0 && (
                     <div className=''>
                           <div className='mt-3 mx-3'>

                                        <h6 className='mt-4 text-[20px] font-bold text-blue-600 dark:text-white'>Users Posts</h6>
                                </div>  
                                <div className={ allpost.length > 1 ? 'mt-4 rounded scrollusr  dark:bg-gray-700' : 'mt-4 rounded  dark:bg-gray-700'}>
                                   
                                  
                                
                                 
                                {   allpost.map((pst,i) => (
                                      <div className='my-3 mrgn  dark:bg-gray-700'  key={i}>
                                          <div className='dashitem p-3'>
                                            <div className=' my-3 mx-5'>
                                                <img src={`${baseUrl}${pst["image"]}`}  className='imgpost' alt="" />
                                            </div>
                                            <h4 className='text-gray-600 dark:text-white my-3 mx-5 text-2xl'>{pst.name}</h4>
                                            <p className='text-gray-400 dark:text-white my-3 mx-5'>{pst.desc}</p>
                                            {/* <div className='flex mt-4'>
                                                      <button className= 'rounded py-2 px-4 text-white mx-6 bg-blue-600 dark:text-white border-gray-400 hover:bg-blue-500 flex' ><span className='mt-1 mr-1'><FaHeart /></span><span className=''>Like</span></button>
                                                      <button   className='rounded py-2 px-4 text-whitemx-6 bg-[#2c3e65]  dark:text-white border-gray-400 hover:bg-[#304165] flex'  ><span className='mt-1 mr-1'><TiArrowBack /></span><span className=''>Reply</span></button>
                                              </div> */}
                                        </div>
                                        </div>
    
                                      )) }
    
                                 
    
                               </div>  
                               
                               </div>

                               )} 


                                { latstpost.length === 0 && allpost.length === 0 && (
                                   <div className=''>
                                            <h1 className='text-blue-600 dark:text-white my-3 mx-5'>Today Highlights</h1>   
                   
                                    <div className='my-3 mrgn  dark:bg-gray-700' >
                                      <div className='dashitem p-3'>
                                            <div className=' my-3 mx-5'>
                                                <img src={`${baseUrl}p1.jpg`} className='imgpost' alt="" />
                                            </div>
                                            
                                            </div>
                                          </div>
                                        </div> 
                                )}
                    </div>

                  
                    <div className='bg-white rounded-md dark:bg-gray-700 text-black dark:text-white my-3 mx-5'>
                   
                    <div className='flex border-b border-[#d8d2d2] mt-4'>
                            <button onClick={() => shosecuser3(0)} className={isshowsecuser === 0 ? ' mx-6 border-b-2 dark:text-white border-blue-600  text-blue-600 cursor-pointer'  : 'cursor-pointer text-gray-700 mx-6 hover:border-b-2  hover:border-blue-600  hover:text-blue-600 border-gray-600  dark:text-white dark:border-white'} >Posts</button>
                            <button  onClick={() => shosecuser3(1)} className={isshowsecuser === 1 ? ' mx-6 border-b-2 dark:text-white border-blue-600  text-blue-600 cursor-pointer'  : 'cursor-pointer text-gray-700 mx-6 hover:border-b-2  hover:border-blue-600  hover:text-blue-600 border-gray-600  dark:text-white  dark:border-white'}  >About Me</button>
                            <button  onClick={() => shosecuser(2)} className={isshowsecuser === 2 ? ' mx-6 border-b-2 dark:text-white border-blue-600  text-blue-600 cursor-pointer'  : 'cursor-pointer text-gray-700 mx-6 hover:border-b-2  hover:border-blue-600  hover:text-blue-600 border-gray-600  dark:text-white   dark:border-white'}  >Setting</button>
                    
                        
                    </div>
                    { isshowsecuser === 0 && ( 
                            <div className="pt-4 text-white px-3">
                              <form onSubmit={handleSubmitPost} type="post" encType="multipart/form-data" >
                                 <div className="">
                                 <label className="block mr-2 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject:</label>
                                  <input name='name' onChange={handleChangepost} value={postfields['name']}  className="p-4  w-full text-sm text-gray-900 border mb-3 rounded-lg cursor-pointer  border-blue-300 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" placeholder='Enter Subject' autoComplete='off' required/>
                                  <label className="block mr-2 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Post:</label>
                                 <textarea name="desc" onChange={handleChangepost} value={postfields['desc']}  className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please type what you want..." required ></textarea>
                                   <input type="hidden" name="uindex" value={editdata.index}/>
                                  </div>
                                  <div className="flex  items-baseline">
                                  <button type="button" onClick={openpost} className="mt-4 mr-3 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 "><FaCamera /></button>
                                      
                                      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 ">Post</button>
                                      
                                  </div>
                               </form>
                              {  latstpost.length > 0 && (
                                <div className='mt-3'>

                                        <h6 className='mt-4 text-[20px] font-bold text-blue-600 dark:text-white'>Your Posts</h6>
                                </div>
                               )}
                               <div className={ latstpost.length > 1 ? 'mt-4 border rounded  scrollusrpst  dark:bg-gray-700' : 'mt-4 border rounded   dark:bg-gray-700'}>
                                  { 
                                  latstpost.length > 0 && (
                                 //   editdata.post.length > 0 && (
                                 
                                  latstpost.map((pst,i) => (
                                        <div className='my-3 mrgn  dark:bg-gray-700'  key={i}>
                                          <div className='dashitem p-3'>
                                            <div className=' my-3 mx-5'>
                                                <img src={`${baseUrl}${pst["image"]}`}  className='imgpost' alt="" />
                                            </div>
                                            <h4 className='text-gray-600 dark:text-white my-3 mx-5 text-2xl'>{pst.name}</h4>
                                            <p className='text-gray-400 dark:text-white my-3 mx-5'>{pst.desc}</p>
                                            <div className='flex mt-4'>
                                                      <button onClick={()=> openpostedit(pst._id)} className= 'rounded py-2 px-4 text-white mx-6 bg-blue-600 dark:text-white border-gray-400 hover:bg-blue-500 flex' ><span className='mt-1 mr-1'><MdModeEdit /></span><span className=''>Edit</span></button>
                                                      <button  onClick={() => delpost(pst._id,pst.userid)} className='rounded py-2 px-4 text-whitemx-6 bg-[#2c3e65]  dark:text-white border-gray-400 hover:bg-[#304165] flex'  ><span className='mt-1 mr-1'><MdDeleteOutline /></span><span className=''>Delete</span></button>
                                              
                                                {/* <button  className='rounded py-2 px-4 text-whitemx-6 bg-[#2c3e65]  dark:text-white border-gray-400 hover:bg-[#304165] flex'  ><span className='mt-1 mr-1'><TiArrowBack /></span><span className=''>Reply</span></button>
                                               */}
                                              </div>
                                           </div>   
                                        </div>
    
                                      ))
    
                                  )
                                  
                                  }
    
                               </div>
                             </div>
                    )}
    
                    {  isshowsecuser === 1 && ( 
                            <div className="pt-4 text-white px-3 mb-10">
                                  <div className=''>
                                    <h1 className='text-[20px] font-bold text-blue-600 dark:text-white' >Personal Information</h1>
                                    <div className=" mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md: gap-2 flex-auto flex-shrink-0  bg-white dark:bg-gray-700 text-black dark:text-white">
                                           <div className='col-span-1 text-[16px] dark:text-white font-bold'> <h5 className="f-w-500"> Name<span className="pull-right">:</span></h5></div>
                                           <div className='col-span-3 text-[14px] text-gray-800 font-semibold dark:text-white'><span>{editdata.name.toUpperCase()}</span></div>
                                    </div>
                                    <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md: gap-2 flex-auto flex-shrink-0  bg-white dark:bg-gray-700 text-black dark:text-white">
                                           <div className='col-span-1 text-[16px] dark:text-white font-bold'> <h5 className="f-w-500"> email<span className="pull-right">:</span></h5></div>
                                           <div className='col-span-3 text-[14px] text-gray-800 font-semibold dark:text-white'><span>{editdata.email}</span></div>
                                    </div>
                                    <div className=" mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md: gap-2 flex-auto flex-shrink-0  bg-white dark:bg-gray-700 text-black dark:text-white">
                                           <div className='col-span-1 text-[16px] dark:text-white font-bold'> <h5 className="f-w-500"> Phone<span className="pull-right">:</span></h5></div>
                                           <div className='col-span-3 text-[14px] text-gray-800 font-semibold dark:text-white'><span>{editdata.phone}</span></div>
                                    </div>
                                    <div className=" mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md: gap-2 flex-auto flex-shrink-0  bg-white dark:bg-gray-700 text-black dark:text-white">
                                           <div className='col-span-1 text-[16px] dark:text-white font-bold'> <h5 className="f-w-500"> Skills<span className="pull-right">:</span></h5></div>
                                           <div className='flex col-span-3 text-[14px] text-gray-800 font-semibold dark:text-white'>
                                           {  skills.map((skils,i) => (
    
                                            <div  key={i} className='bg-[#ecf2ff] text-blue-600 hover:bg-blue-600 rounded hover:text-white dark:bg-gray-200 mx-3 p-2'> <span className='p-3 '>{skils.toUpperCase()}</span></div>
                                           )
                                           
                                          )
    
                                           }
                                           
                                          </div>
                                    </div>
                                    {
                                       // console.log(editdata)
                                    }
                                    <div className=" mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md: gap-2 flex-auto flex-shrink-0  bg-white dark:bg-gray-700 text-black dark:text-white">
                                           <div className='col-span-1 text-[16px] dark:text-white font-bold'> <h5 className="f-w-500"> Languages<span className="pull-right">:</span></h5></div>
                                           <div className='flex col-span-3 text-[14px] text-gray-800 font-semibold dark:text-white'>
                                           {  lang.map((lang,i) => (
    
                                            <div  key={i} className='bg-[#ecf2ff] text-blue-600 hover:bg-blue-600 rounded hover:text-white dark:bg-gray-200 mx-3 p-2'> <span className='p-3 '>{lang.toUpperCase()}</span></div>
                                           )
                                           
                                          )
    
                                           }
                                           
                                          </div>
                                    </div>
                                    {/* <div className=" mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  md: gap-2 flex-auto flex-shrink-0  bg-white dark:bg-gray-700 text-black dark:text-white">
                                           <div className='col-span-1 text-[16px] dark:text-white font-bold'> <h5 className="f-w-500"> Password<span className="pull-right">:</span></h5></div>
                                           <div className='col-span-3 text-[14px] text-gray-800 font-semibold dark:text-white'><span>{editdata.pass}</span></div>
                                    </div> */}
                                  </div>
                             </div>
                    )}
                    {  isshowsecuser === 2 && ( 
                            <div className="pt-4 px-3 mb-10 relative">
                                <form onSubmit={handlesubmit}  method="post"  encType="multipart/form-data">
                                   <label className="block font-semibold">Name</label>
                                                       <input type="text" placeholder="Enter Name" name="name" value={fields['name']} onChange={handleChange}  title="Name should contain 3 to 10 characters"  required className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                                       <div className="name1 errortext text-red-600" id="validname"> {errors["name"]}  </div>
                                                    
                                                    
                                                       <label className="block mt-3 font-semibold">Email </label>
                                                       <input type="email " placeholder="Enter Email" name="email" onChange={handleChange}   value={fields['email']}  title="Email should contain 6 to 120 characters " required className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                                       <div className="name1 errortext text-red-600" id="validname"> {errors["email"]}  </div>
                                                      
                                                      
                                                       <label className="block mt-3 font-semibold">Phone Number </label>
                                                       <input type="text " placeholder="Enter phone number" name="phone" onChange={handleChange}   value={fields['phone']} title="Phone number should be of 10 digits" required className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                                       <div className="name1 errortext text-red-600" id="validname"> {errors["phone"]}  </div>
                                                   
                                                   
                                                       <label className="block mt-3 font-semibold">Skills</label>
    
                                                       <select name="skills" id="cars"  value={skills}  onChange={handleSkillsChange}   className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" multiple required>
                                                          <option value="Admin" >Admin</option>
                                                          <option value="Dashboard"  >Dashboard</option>
                                                          <option value="Photoshop" >Photoshop</option>
                                                         <option value="Bootstrap" >Bootstrap</option>
                                                          <option value="Responsive" >Resposive</option>
                                                         <option value="Crypto">Crypto</option>
                                                      </select>
                                                      <div className="name1 errortext text-red-600" id="validname"> {errors["skills"]}  </div>
                                  
                                                      <label className="block mt-3 font-semibold">Language</label>
                                  
                                                      <select name="languge" id="cars1"  value={lang}  onChange={handleLanguageChange }  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" multiple required>
                                                      <option value="English" >English</option>
                                                      <option value="Hindi" >Hindi</option>
                                                      <option value="French" >French</option>
                                                      </select>
                                                      <div className="name1 errortext text-red-600" id="validname"> {errors["skills"]}  </div>
                                                      <label className="block mt-3 font-semibold">Image </label>
                                                       <input type="file" placeholder="Enter Image" name="image" onChange={handleChangeFile} className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                                    <div className='flex mt-2 mx-2'>
                                                    <img src={`${baseUrl}${editdata["image"]}`} height="50px" width="50px" />
                                                    <span className='mx-2'>{editdata["image"]}</span>
                                                        </div>  
                                                    
                                                       <div className="flex justify-between items-baseline">
                                                           <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 ">Submit</button>
                                                         
                                                       </div>
                                </form>
                             </div> 
                    )}
                    </div>
                
            {/* </div>
        </div> */}
    
          <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                
              >
                <div style={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  py-2 px-4 gap-10 border-b  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="text-left ">
                  {editpost === 0 && (
                                <h2 style={{ color: !showTheme  ? '#ffffff' : '#000000'}} >View User</h2>
                  ) }
                 {  editpost === 1 && (
                    <h2 style={{ color: !showTheme  ? '#ffffff' : '#000000'}} >Edit Post</h2>
                    )
                     }    
                        </div>
                        <div className="text-right  ">
                        <button onClick={closeModal}><IoMdClose /></button>
                        </div>
                </div>
                {editpost === 0 && ( 
                 <div className=''> 
                      <div className="mt-12 mx-4 p-10">
                  
                        <div className="flex">
                        <label className="block mr-2 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload</label>
                        <input name='postimg' onChange={handleChangeFilePost} className="p-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                        </div>
                        </div>
                         <div tyle={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className="text-right border-t">
                            <button onClick={closeModal} style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className=" md:w-40 mb-3  dark:bg-gray-100 dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Submit</button>
                          </div>

                          </div>         
                )}
                 {editpost === 1 && ( 
                    <form onSubmit={handleSubmitPostedit} type="post" encType="multipart/form-data" >  
                     <div className=''>  
                    <div className=" mx-4 p-5">
                                              
                                 <div className="">
                                 <label className="block mr-2 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject:</label>
                                  <input name='name' onChange={handleChangeedit} value={postfieldsedit['name']}  className="p-4  w-full text-sm text-gray-900 border mb-3 rounded-lg cursor-pointer  border-blue-300 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="text" placeholder='Enter Subject' autoComplete='off' required/>
                                  <label className="block mr-2 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Post:</label>
                                 <textarea name="desc" onChange={handleChangeedit} value={postfieldsedit['desc']}  className="block p-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Please type what you want..." required ></textarea>
                                   <input type="hidden" value={postfieldsedit['_id']} name="postid" />
                                   <label className="block mr-2 mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload</label>
                                     <input name='postimg' onChange={handleChangeFilePostedit} className="p-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                   {imgedt !== '' && (
                                    <div className='flex mt-2 mx-2'>
                                                    <img src={`${baseUrl}${imgedt}`} height="50px" width="50px" />
                                                    <span className='mx-2'>{imgedt}</span>
                                    </div> 

                                   )}  
                                  </div>
                                 
                             
                    </div>
                    <div style={{ backgroundColor: !showTheme  ? 'rgb(60, 60, 60)' : 'rgb(240, 240, 240)',}} className="text-right border-t">
                            <button type="submit"  style={{ backgroundColor: !showTheme  ? '#ffffff' : '#0000ff',color: showTheme  ? '#ffffff' : '#757575'}} className=" md:w-40 mb-3  dark:bg-gray-100 dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 float-right hover:bg-gray-500 dark:hover:bg-gray-200 transition ease-in-out duration-300">Submit</button>
                          </div>
        
                    </div>
                    </form>
                 )}
                           
                           
                        {/* </div>
                </div> */}
                    
            </Modal>
    
            <ToastContainer />
               </div>
    
        </div>
    </>
  )
}
