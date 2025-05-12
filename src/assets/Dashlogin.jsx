import React from 'react'
import { useState, useEffect, useRef,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {Route, Navigate,useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";

export default function Login() {
   //  const dispatch = useDispatch()
  //   const todo = useSelector(state =>state.todo.arr);
     const [userdata,setUserdata] = useState([])
     let navigate = useNavigate();
     const [isloginshow, setIsloginshow] = useState(0);
     const [fields, setFields] = useState({
      name:'',
      image:'',
      email:'',
      phone:'',
      pass:''
     })   
     const [img, setImg] = useState({})   
     const [errors, setErrors] = useState({});
     let formErrors = {};
     let formFields = {...fields}
     let formIsValid = true;
 

    //  const handleChangeSelect =(e) =>{
       
    //     let value = Array.from(e.target.selectedOptions, option => option.value);
    //     setSkills({values: value});
    //     console.log(skills)
    //  }


     const [task, setTask] = useState({
       'taskname' : '',
       'taskstatus' : 'incomplete',
       'priority' : 'normal'
 
     });
     const show = () => {
 
         setIsloginshow(0);
     }
     
     const hide = () => {
     
         setIsloginshow(1);
     }
     
     const handleChangeFile = (e) =>{
      
      setFields({...fields, image: e.target.files[0]})

     }


     const handleChange = (e) => {
     
         let name = e.target.name;
         let value = e.target.value;
         let val = value;
        // console.log(name+"   ho   "+value)
         if(!isloginshow){
             if(name == 'phone'){
             
                 val = val.replace(/[^0-9]/g, '')
               }
               if(name == 'name'){
               
                 val = val.replace(/[^A-Za-z]/g, '')
     
               }
         }
        setFields({...fields,[name]: val})
        setErrors(formErrors)
     }
 

 
     const handleSubmit = (event)=>{
        
         event.preventDefault();
         formIsValid = true;
         let uid = 1;
         let count = 0;
        // let skil = event.target.skills
        // console.log(skil)
        

         //console.log(langarr)
       //  dispatch(submit({isloginshow:isloginshow,formFields:formFields, formIsValid:formIsValid,formErrors:formErrors }))
       //  console.log(todo)
      //   formErrors = todo.formErrors
         if(isloginshow == 1){
         /// let skilarr = []
          let skilarr = Array.from(event.target.skills.selectedOptions, option => option.value);
          //skilarr.push({values: value});
        // let langarr = []
          let langarr = Array.from(event.target.languge.selectedOptions, option => option.value);
         // langarr.push({values: langvalue});
        if(typeof  formFields["phone"] !== "undefined" ||  (typeof  formFields["name"] !== "undefined" ) || typeof formFields["email"] !== "undefined" || typeof formFields["pass"] !== "undefined"){
            if(formFields["name"].length < 3 || formFields["name"].length > 10 ){
                formIsValid = false;
                formErrors["name"] = "The name must be more than 2 characters and less than 10 characters";
            }
            if(formFields["phone"].length != 10){
                formIsValid = false;
                formErrors["phone"] = "Not a valid phone number";
            }
            if(formFields["email"].length < 6 || formFields["email"].length > 120){
                formIsValid = false;
                formErrors["email"] = "The email must be more than 6 characters and less than 120 characters";
            }
            let lastAtPos = formFields["email"].lastIndexOf('@');
            let lastDotPos = formFields["email"].lastIndexOf('.');
    
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && formFields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                formErrors["email"] = "Email is not valid";
            }

            let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
            let test = decimal.test(formFields["pass"]);
            if(test == false){
                formIsValid = false;
                formErrors["pass"] =  "Password should contain 6 to 15 characters  at least one lowercase letter, one uppercase letter, one numeric digit, and one special character";;
            
            }
         }
           
               if(formIsValid){
                                      fetch('https://dashboardbaclend.onrender.com/getuser', {
                                          method: 'POST',
                                          body: JSON.stringify(fields),
                                            headers: {
                                              'Content-Type': 'application/json',
                                            },
                                        })
                                        .then((response) =>  response.json())
                  
                  
                                        .then((data) => {
                                         // console.log(data)
                                          if(data.result.length >0) {
                  
                                               //   console.log(data)
                                           // setUserdatadateail(data.result)
                                            //setIsOpen(false);
                                            toast.warn("Name or Email already exist !", {
                                              position: "top-right",
                                              closeOnClick: false,
                                              progress: undefined,
                                              theme: "dark",
                                              hideProgressBar: true,
                                              autoClose: 3000
                                          });
                                          }
                                          else{
                  

     
                       
                                 const formData = new FormData();
                                 //console.log(fields)
                                 formData.append('name', fields["name"]);
                                 formData.append('image', fields['image']);
                                 formData.append('email',  fields["email"]);
                                 formData.append('phone',  fields["phone"]);
                                 formData.append('pass',  fields["pass"]);
                                 formData.append('skills', skilarr);
                                 formData.append('lang',  langarr);
       
                                // console.log(fields['image'])
                                // console.log( formData)

                                   fetch('https://dashboardbaclend.onrender.com/saveUser', {
                                       method: 'POST',
                                       body: formData
                                     })
                                     .then((response) =>  response.json())
                                     .then((data) => {
                                       if(data.result) {
                                        let token = data.token
                                        sessionStorage.setItem('token',token);
                                        sessionStorage.setItem('id', data.result["_id"]);
                                        sessionStorage.setItem('name', data.result["name"]);
                                        sessionStorage.setItem('img', data.result["image"]);
                                        sessionStorage.setItem('loggedin',true);
                                          // console.log(data.result[0][_id])
                                        //   let uid = btoa(data.result["_id"])
                                         navigate("/dashboard");

                                       }
                                       
                                     })
                                     .catch(error => {
                                    //   console.log(error);
                                     });

                                         }

                                        })
                                        .catch(error => {
                                        //  console.log(error);
                                          toast.warn("Error Occured !", {
                                            position: "top-center",
                                            closeOnClick: false,
                                            progress: undefined,
                                            theme: "dark",
                                            hideProgressBar: true,
                                            autoClose: 3000
                                            });
                                        });
                  
                }
                else{
                           toast.warn("Error Occured !", {
                           position: "top-center",
                           closeOnClick: false,
                           progress: undefined,
                           theme: "dark",
                           hideProgressBar: true,
                           autoClose: 3000
                           });
                }
     
             
         }
         else{
             if(formIsValid ){
                       
                     fetch('https://dashboardbaclend.onrender.com/getloginuser', {
                        method: 'POST',
                        body: JSON.stringify(formFields),
                          headers: {
                            'Content-Type': 'application/json',
                          },
                      })
                      .then((response) =>  response.json())
                      .then((data) => {
                     
                                  if(data.result ==="Wrong login credentials") {
                                    toast.warn("Wrong login credentials !", {
                                      position: "top-right",
                                      closeOnClick: false,
                                      progress: undefined,
                                      theme: "dark",
                                      hideProgressBar: true,
                                      autoClose: 3000
                                  });
                                }
                                else if(data.result !=="password not matched") {
                                  let token = data.token
                                  sessionStorage.setItem('token',token);
                                   sessionStorage.setItem('id', data.result["_id"]);
                                   sessionStorage.setItem('name', data.result["name"]);
                                   sessionStorage.setItem('img', data.result["image"]);
                                   sessionStorage.setItem('loggedin',true);
                                    navigate("/dashboard");
                               
                                }
                                else{
                                  toast.warn("Password not matched !", {
                                    position: "top-right",
                                    closeOnClick: false,
                                    progress: undefined,
                                    theme: "dark",
                                    hideProgressBar: true,
                                    autoClose: 3000
                                });
                                }
                        
                      })
                      .catch(error => {
                      //  console.log(error);
                      });
         }
        
        }
 
 
         setErrors(formErrors)
     }  
     
      const [showPass, setShowPass] = useState(true);
         const showpass = () =>{
            let showvar =  showPass;
             showvar = !showvar
             setShowPass(showvar)
         }
   return (
     <>
     <div className=''>
        {/* <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
          grid grid-cols-3 gap-4
           <div className="relative py-3 sm:w-96 mx-auto text-center">
          */}
          
            <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-10 m-8'  >

        <div className='seclogin rounded-4xl'>
          <div className='px-10 py-12 text-center dashmrgntp'>

          <h6 className='text-white text-[30px] font-bold'>Log in to your admin dashboard <span className='block'>with your credentials</span></h6>
          <h1 className='text-white  text-[50px] font-extrabold'>The Dashboard</h1>
          <p className='text-gray-200  text-[16px]'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <span className='block'>eiusmod tempor incididunt</span></p>
          </div>

          <div className='px-10 text-center'>
          {isloginshow == 0 && (  
          <button className=" mt-3 text-blue-500 bg-white py-3 px-6 rounded-md" onClick={hide}>Register</button>
         
           )}
           {isloginshow == 1 && (  
          <button className=" mt-3 text-blue-500 bg-white py-3 px-6 rounded-md" onClick={show}>Sign In</button>
         
           )}
           
            </div>
          </div>      
       <div className={isloginshow == 0 ?  "text-center mrgntp" : "text-center" } >
       {isloginshow == 0 && (  
                <div className="mt-4 text-left">
                <h4 className='text-center text-[#3d4465] font-bold text-[30px]'>Welcome</h4>
                 <p className='text-center text-gray-500  text-[16px]'>Login page allows users to enter login credentials for authentication and access <span className='block'>to secure content.</span></p>
           <div className=''> 
            
                <h4 className='text-center text-[#3d4465] font-bold text-[16px] m-4 relative'><span className='arglogin'>Login</span></h4>
            </div>    
                {/* <div className="h-2 bg-blue-400 rounded-t-md mt-8"></div> */}
                {/* <span className="text-2xl font-bold ml-3 mt-6">{isloginshow == 0 ? 'Login to your account' : 'Register'}</span> */}
            <form onSubmit={handleSubmit} method="post"  encType="multipart/form-data"  >

                <div className="px-8 py-6 relative">
                    <label className="block font-semibold"> Name or Email </label>
                    <input type="text" placeholder="Enter Name or Email" name="namelg"  onChange={handleChange} className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                    <div className="name1 errortext text-red-600" id="validname"> {errors["namelg"]}  </div>
                    <label className="block mt-3 font-semibold">Password</label>
                    <input type={showPass  ? "password" : "text"} placeholder="Enter Password" name="passlg"  onChange={handleChange} className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                   
                    { Object.keys(errors).length === 0 && ( 
                    !showPass  ?
                     <span className="arrangeeye1" onClick={showpass}><FaEye /></span>
                     :
                     <span className="arrangeeye1" onClick={showpass}><GoEyeClosed /></span>
                    
                  )}
                    <div className="name1 errortext text-red-600" id="validname"> {errors["passlg"]}  </div>
                    <div className="flex justify-between items-baseline">
                        <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 ">Login</button>
                        
                    </div>
                    <div className='ntregrtr flex justify-center text-[16px] m-2 '>
                          <span className='text-gray-500 '>Not egistered? </span><button className='text-blue-600 ml-2 cursor-pointer'  onClick={hide} >  Register</button>
                      </div>
                </div>
           
           
            
              </form>
             
                </div>
       )}
                {isloginshow == 1 && (  
                <div className="mt-4 text-left">
                <h4 className='text-center text-[#3d4465] font-bold text-[30px]'>Welcome</h4>
                 {/* <p className='text-center text-gray-500  text-[16px]'>Register page allows users to enterRegister for authentication and access <span className='block'>to secure content.</span></p>
           */}
           <div className=''> 
            
                <h4 className='text-center text-[#3d4465] font-bold text-[16px] m-4 relative'><span className='arglogin'>Register</span></h4>
            </div>    
                {/* <div className="h-2 bg-blue-400 rounded-t-md mt-8"></div> */}
                {/* <span className="text-2xl font-bold ml-3 mt-6">{isloginshow == 0 ? 'Login to your account' : 'Register'}</span> */}
                <form onSubmit={handleSubmit} method="post"  encType="multipart/form-data" >
                   
                                      <div className="px-8 py-2 relative">
                                          <label className="block font-semibold">Name</label>
                                          <input type="text" placeholder="Enter Name" name="name" value={fields['name']} onChange={handleChange}  title="Name should contain 3 to 10 characters"  required  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                          <div className="name1 errortext text-red-600" id="validname"> {errors["name"]}  </div>
                                          <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-10'>
                                             <div className=''>
                                                <label className="block mt-3 font-semibold">Email </label>
                                                <input type="email " placeholder="Enter Email" name="email" onChange={handleChange}   value={fields['email']}  title="Email should contain 6 to 120 characters " required  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                                <div className="name1 errortext text-red-600" id="validname"> {errors["email"]}  </div>
                                              </div>
                                              <div className=''>
                                                <label className="block mt-3 font-semibold">Phone Number </label>
                                                <input type="text " placeholder="Enter phone number" name="phone" onChange={handleChange}   value={fields['phone']} title="Phone number should be of 10 digits" required  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                                <div className="name1 errortext text-red-600" id="validname"> {errors["phone"]}  </div>
                                              </div>
                                          </div>
                                          <div className='grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-10'>
                                                  <div className=''>
                                                     <label className="block mt-3 font-semibold">Skills</label>

                                                      <select name="skills" id="cars"   className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" multiple required>
                                                        <option value="Admin">Admin</option>
                                                        <option value="Dashboard">Dashboard</option>
                                                        <option value="Photoshop">Photoshop</option>
                                                        <option value="Bootstrap">Bootstrap</option>
                                                        <option value="Responsive">Resposive</option>
                                                        <option value="Crypto">Crypto</option>
                                                      </select>
                                                      <div className="name1 errortext text-red-600" id="validname"> {errors["skills"]}  </div>

                                                  </div>
                                                  <div className=''>
                                                      <label className="block mt-3 font-semibold">Language</label>

                                                      <select size="5" name="languge" id="cars"   className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" multiple required>
                                                      <option value="English">English</option>
                                                      <option value="Hindi">Hindi</option>
                                                      <option value="French">French</option>
                                                      </select>
                                                      <div className="name1 errortext text-red-600" id="validname"> {errors["skills"]}  </div>
                                                                                                        </div>
                                          </div>
                                         
                                       
                                          <label className="block mt-3 font-semibold">Password </label>
                                          
                                          <input type={showPass  ? "password" : "text"} placeholder="Enter Password" name="pass" onChange={handleChange}   value={fields['pass']} title="Password should contain 6 to 15 characters  at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" required  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                          { Object.keys(errors).length === 0 && ( 
                                          !showPass  ?
                                          <span className="arrangeeye2" onClick={showpass}><FaEye /></span>
                                          :
                                          <span className="arrangeeye2" onClick={showpass}><GoEyeClosed /></span>
                                          )}
                                          <div className="name1 errortext text-red-600" id="validname"> {errors["pass"]}  </div>
                                          <label className="block mt-3 font-semibold">Image </label>
                                          <input type="file" placeholder="Enter Image" name="image" onChange={handleChangeFile}  className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                        
                                        
                                          <div className="flex justify-between items-baseline">
                                              <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 ">Submit</button>
                                            
                                          </div>
                                          <div className='ntregrtr flex justify-center text-[16px] m-2 '>
                                              <span className='text-gray-500 '>Already have an account?  </span><button className='text-blue-600 ml-2 cursor-pointer'  onClick={show} >Sign in</button>
                                          </div>
                                      </div>

                         
                      
                        
                  </form>     
                </div>

                )}
            </div>

        </div>
       
                

                 
          
            
             <ToastContainer />
         {/* </div> */}
         </div>
     </>    
   )
 }
 