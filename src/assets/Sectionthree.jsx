import React from 'react'
import { useContext,useState ,useEffect,useMemo} from 'react'
import Image1 from './image/a5.jpg';
import Image2 from './image/a2.jpg';
import Image3 from './image/a3.jpg';
//import Image4 from './image/a7.jpg';
//import { LineChart } from '@mui/x-charts/LineChart';
//import { AnimatedArea } from '@mui/x-charts';
import { useDispatch, useSelector } from 'react-redux';
import {getawholetask,getawholetaskUser} from "../redux/DashboardSlice.jsx";
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { BarPlot } from '@mui/x-charts/BarChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {format } from 'date-fns'

export default function Sectionthree({showTheme,xLabelsline,skill,lang,baseUrl}) {

    const dispatch = useDispatch();
    let datavar = useSelector((state) => state.data);
    let id = sessionStorage.getItem("id");

    
    const[shwuserlbltask,setShwuserlbltask] = useState(0)
    const[shwuserlblpost,setShwuserlblpost] = useState(0)
    const[shwlangcount,setShwlangcount] = useState(0)
    const[shwskilcount,setShwskilcount] = useState(0)
      const[showcrd,setShowcrd] = useState(0)
      const[isshowcrd,setIsshowcrd] = useState(false)
      const[isshowsec3,setIsshowsec3] = useState(true)
      const[userpost,setuserpost] = useState([])
          const[xtaskLabels,setxtaskLabels] = useState([])
          const[xtaskLabelsline,setxtaskLabelsline] = useState([])
         const [latstpost,setLatstpost] = useState([])
          
      const showcrudthree =(val) =>{
       // console.log(val)
        setIsshowcrd(true)
        let shw = !isshowcrd;
      if(!isshowcrd){
         setShowcrd(val)
         setIsshowcrd(shw)
      }
    else{
        setShowcrd(0)
     setIsshowcrd(shw)
      }
   setIsshowcrd(shw)
     }

     const shosec3 = (val) => {
      //  let shwsec = !isshowsec3

      setIsshowsec3(val)
      //  console.log(val)
     }

    useEffect(()=>{
       

         dispatch(getawholetask());
         dispatch(getawholetaskUser(id));
     },[])

  
         useEffect(()=>{
           
             setxtaskLabels(datavar.userlabel)  // for showing first graph no of post for every user
             setxtaskLabelsline(datavar.userlabeltask)
             
         },[datavar.taskall])


         useEffect(()=>{
        
             let loaddata = datavar.getwholeUserdata
              //  console.log(loaddata)
        
            let userlbltask = 0
            let userlblpost = 0
            let langcount = 0
            let skilcount = 0
      for(let i=0;i<loaddata.length;i++ ){ 
         userlbltask = loaddata[i]["task"].length
         userlblpost = loaddata[i]["post"].length
         langcount = loaddata[i]["lang"].split(",").length
         skilcount = loaddata[i]["skills"].split(",").length
         setLatstpost( loaddata[i]["post"])
       }
       setShwuserlbltask(userlbltask)
       setShwuserlblpost(userlblpost)
       setShwlangcount(langcount)
       setShwskilcount(skilcount)
         },[datavar.getwholeUserdata])

         let userlabl =["Tasks","Post","Skills","Languages"]


  return (
    <>
    <div className='mt-14'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 " style={{minHeight: "330px"}}>

        <div className="cursor-pointer dark:bg-gray-800  rounded-md   bg-blue-600 dark:border-gray-600 font-medium group" >
           
            <p className='px-4 pt-4  text-white '>User Latest Posts</p>
            <div className={latstpost.length >= 8 ? 'scrollpst px-2  dark:bg-gray-800 dark:text-white' : ' px-2  dark:bg-gray-800 dark:text-white'}>
                {latstpost.length > 0  && (

                    <ul className=''>
                    { latstpost.map((post,i) => (
                            <li className='flex my-4 h-14 md:h-14  ml-8 border-b border-b-gray-400 ' key={i}>
                                <div className=''>
                                <img src={`${baseUrl}${post["image"]}`} alt="" className='md:w-10 md:h-10 w-10 h-10 rounded '/>
                                </div>
                                <div className='ml-2 relative'>
                                
                                <h5 className='text-white text-[14px]'>{(post.name).toUpperCase()}</h5>
                                <div className='flex'>
                                
                                            <p className='text-white text-[10px]'>{format(post.createdAt, 'MM/dd/yyyy hh:ii:ss')}</p>
                                    
                                    
                                    {/* <button onClick={() => showcrudthree(1)} className="bg-white  dark:bg-gray-800  dark:border-gray-600    hover:bg-white ml-8" id="react-aria5209609706-:rf:" aria-expanded="false" type="button">
                                        <svg width="30px" height="25px" className='svrounded' viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill={ showTheme ? "#2977ff" : '#ffffff'} cx="5" cy="12" r="2"></circle><circle fill={ showTheme ? "#2977ff" : '#ffffff'} cx="12" cy="12" r="2"></circle><circle fill={ showTheme ? "#2977ff" : '#ffffff'} cx="19" cy="12" r="2"></circle></g></svg>
                                    </button> */}

                                    
                                    
                                    </div>
                                

                                </div>
                                
                            </li>
                    ))}




                    </ul>
                )}
               {latstpost.length === 0  && (
                       <div className='text-center mt-12'><h6><strong className="text-white ">No Post Available</strong></h6></div> 
               )}
                
            </div>  
            {/* <LineChart
                                    width={390}
                                    height={100}
                                    series={[
                                        { data: uvData , showMark: ({ index }) => index  = 0, area: true,},
                                        
                                    ]}
                                    
                                    
                                    margin={{top: 0, right: 0, left: 0, bottom: 0,}}
                                    //  xAxis={[{ scaleType: 'point', data: xLabels }]}
                                    /> */}
            </div>



        <div className="cursor-pointer dark:bg-gray-800  rounded-md    bg-[#00afef] dark:border-gray-600 font-medium group" >
                {/* <p className=' px-4 pt-4 text-white'>Activity</p>
                <div className='flex border-b border-[#d8d2d2] mt-4'>
                        <button onClick={() => shosec3(true)} className={isshowsec3 ? ' text-[#f2f2f2] mx-6 border-b-2  border-[#ffffff]  hover:text-white'  : ' text-[#f2f2f2] mx-6 hover:border-b-2  hover:border-[#ffffff]  hover:text-white border-gray-600 '} >User</button>
                       <button  onClick={() => shosec3(false)} className={!isshowsec3 ? ' text-[#f2f2f2] mx-6 border-b-2  border-[#ffffff]  hover:text-white'  : ' text-[#f2f2f2] mx-6 hover:border-b-2  hover:border-[#ffffff]  hover:text-white border-gray-600 '}  >Overview</button>
                
                    
                </div> */}

                     
                        <div className="pt-12 text-white px-3">
                                   

                                    <BarChart
                                       series={[{ data:skill,stack: 'A', label: 'Skills' },{ data:lang ,stack: 'A', label: 'Language'}]}
                                    xAxis={[{ scaleType: 'band', data: xtaskLabels,categoryGapRatio: 0.6,
                                        tickLabelStyle: {
                                            fill: '#ffffff', // Green color for y-axis labels
                                            fontSize: 12,
                                          },
                                      }]}
                                     
                                    width={360}
                                    height={400}
                                    yAxis={[
                                    {
                                        tickLabelStyle: {
                                          fill: '#ffffff', // Green color for y-axis labels
                                          fontSize: 12,
                                        },
                                      },
                                    ]}
                                    
                                   margin={{top: 40}}
                                    />

                        </div>  
                      
                        {/* { !isshowsec3 && ( 
                        <div className="pt-4 text-white px-3">
                            <h4 className="text-white text-[18px] mb-2">This is home title</h4>
                            <p className='text-[14px] tracking-wide'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
                            <br />
                            <p className='text-[14px] tracking-wide'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
                        </div>

                        )} */}

        </div>

        <div className="cursor-pointer dark:bg-gray-800  rounded-md    bg-[#ffffff] dark:border-gray-600 font-medium group mr-5" >
            <div className=' bg-[#10ca93]'>
                    <p className=' px-4 pt-4  text-white'>User Detail</p>
                        <div className="pt-4 text-white px-3">
                                    

                                    <BarChart
                                    xAxis={[{ scaleType: 'band', data: userlabl,categoryGapRatio: 0.6,
                                        tickLabelStyle: {
                                            fill: '#ffffff', // Green color for y-axis labels
                                            fontSize: 12,
                                          },
                                        colorMap: {
                                        type: 'piecewise',
                                        thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                                        colors: ['#ffffff'],
                                       
                                        }  }]}
                                        yAxis={[
                                            {
                                                tickLabelStyle: {
                                                  fill: '#ffffff', // Green color for y-axis labels
                                                  fontSize: 12,
                                                },
                                              },
                                            ]}  
                                    series={[{ data:[shwuserlbltask,shwuserlblpost,shwlangcount,shwskilcount]}]}
                                  
                                    height={300}
                                    
                                  //  margin={{top: 2, right: 30, left: 200, bottom: 2,}}
                                    />

                        </div>  

                </div>    
                <div className='mt-6 mb-10 mx-4'>
                    <ul>
                        {/* <li className='grid grid-cols-2  gap-18 py-2 px-3 border-b border-b-gray-400'>
                            <p className='text-left text-[14px]'>Top Active Pages</p>
                            <p className='text-right text-[14px]'>Active Users</p>
                        </li> */}
                        <li className='grid grid-cols-2  gap-18 py-2 px-3 border-b border-b-gray-400'>
                            <p className='text-left text-[14px]'>Tasks</p>
                            <p className='text-right text-[14px]'>{shwuserlbltask}</p>
                        </li>
                        <li className='grid grid-cols-2  gap-18 py-2 px-3 border-b border-b-gray-400'>
                            <p className='text-left text-[14px]'>Psts</p>
                            <p className='text-right text-[14px]'>{shwuserlblpost}</p>
                        </li>
                        <li className='grid grid-cols-2  gap-18 py-2 px-3 border-b'>
                            <p className='text-left text-[14px]'>Languages</p>
                            <p className='text-right text-[14px]'>{shwlangcount}</p>
                        </li>
                        <li className='grid grid-cols-2  gap-18 py-2 px-3 '>
                            <p className='text-left text-[14px]'>Skills</p>
                            <p className='text-right text-[14px]'>{shwskilcount}</p>
                        </li>
                    </ul>
                </div>


        </div>
        </div>
    </div>
    <div className='mt-14 mr-5'>
         <div className=" dark:bg-gray-800  rounded-md   bg-white dark:border-gray-600 font-medium group" style={{minHeight: "330px"}}>
    <p className=' px-4 pt-4 '><span className='font-bold'>History 2013 - 2021</span> <br/>
    <span className='text-gray-600 text-[12px]  dark:text-white'>Lorem Ipsum is simply dummy text of the printing</span>
    </p>
                    <div className="pt-4 text-white px-3">
                                 {/* <ChartContainer
                                    width={1000}
                                    height={200}
                                    series={[{ data: uData, label: 'uv', type: 'bar' }]}
                                    xAxis={[{ scaleType: 'band', data: xLabels }]}
                                    margin={{top: 2, right: 30, left: 20, bottom: 2,}}
                                    
                                >
                                    <BarPlot  />
                                </ChartContainer> */}
                                <BarChart
                                    xAxis={[{ scaleType: 'band', data: xtaskLabels,categoryGapRatio: 0.6,
                                        
                                        tickLabelStyle: {
                                            fill: '#2977ff', // Green color for y-axis labels
                                            fontSize: 12,
                                          },
                                        colorMap: {
                                        type: 'piecewise',
                                        thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                                        colors: ['#2977ff'],
                                       
                                        }  }]}
                                    series={[{ data:xtaskLabelsline}]}
                                    yAxis={[
                                        {
                                            tickLabelStyle: {
                                              fill: '#2977ff', // Green color for y-axis labels
                                              fontSize: 12,
                                            },
                                          },
                                        ]}
                                    height={300}
                                    
                                  //  margin={{top: 2, right: 30, left: 200, bottom: 2,}}
                                    />
                    </div>  

       </div> 
    </div>
    </>
  )
}
