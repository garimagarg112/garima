import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { getawholepost,getpost,gettotaltask,getpostDashboard} from "../redux/DashboardSlice.jsx";
import { useState ,useEffect,useMemo} from 'react'
//import { BarPlot } from '@mui/x-charts/BarChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
//import { AnimatedArea } from '@mui/x-charts';
import User from './Users.jsx'
import Sec3 from './Sectionthree.jsx';
import {formatDistanceToNow } from 'date-fns'

export default function Sectionone({userdata,productList,showTheme,baseUrl,showdash}) {



    const dispatch = useDispatch();
    let datavar = useSelector((state) => state.data);
    //console.log(datavar)
    const isEmptyObject = (obj) => Object.keys(obj).length === 0;
    const[total,setTotal] = useState(0)
    const[totalpost,setTotalpost] = useState(0)
    const[totaluserprcntg,setTotaluserprcntg] = useState(0)
    const[totaltaskprcntg,setTotaltaskprcntg] = useState(0)
    const[totalpostprcntg,setTotalpostprcntg] = useState(0)
    const[xLabels,setxLabels] = useState([])
    const[xLabelsline,setxLabelsline] = useState([])
    const[xpost,setxpost] = useState([])
    const[lang,setLang] = useState([])
    const[skill,setSkill] = useState([])
    const [fvpostshw,setfvpostshw] = useState([])
    useEffect(()=>{
      
         dispatch(getawholepost());
         dispatch(getpost());
         dispatch(gettotaltask());
         dispatch(getpostDashboard());
         
     },[])


     useEffect(()=>{
    //     if(!isEmptyObject(datavar.userdata)){
       let totaluser =  datavar.totaluser
       let totaltask = datavar.totaltask
       let totalpost = datavar.fvpost
    // let totalpost =  datavar.totalpost

  
      
       setxpost(datavar.userlabelpost)  // for showing first graph no of post for every user
       setTotal((totaluser+totaltask+totalpost)) // for showing total post,task,user
       setTotalpost(datavar.fvpost)
      setSkill(datavar.skills)
      setLang(datavar.language)  // for showingsecond graph language for every user


      setTotaluserprcntg((totaluser *100) / (totaluser+totaltask+totalpost))   // for showing % of user from user post,task,user
      setTotaltaskprcntg((totaltask *100) / (totaluser+totaltask+totalpost)) // for showing % of task from user post,task,user
      setTotalpostprcntg((totalpost *100) / (totaluser+totaltask+totalpost)) // for showing % of post from user post,task,user
   
       setxLabels(datavar.userlabel) //for showing first graph no of post for every user
       setxLabelsline(datavar.langlabel)
   

       setfvpostshw(datavar.dashpost)
    },[datavar.totalpost])


  return (
    <div className=''>
    <div className="chartmrgn  h-full ml-20  mb-10 md:ml-20">
        
        
        <div className='mt-14'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">

            <div  onClick={() => showdash(2)} className="cursor-pointer dark:bg-gray-800  rounded-md    bg-[#2977ff] dark:border-gray-600 font-medium group" >
            <p className='text-white px-4 pt-4'>{totalpost} Post</p>
         

                                             <BarChart
                                                  xAxis={[{ scaleType: 'band', data: xLabels,categoryGapRatio: 0.6,
                                                    tickLabelStyle : {
                                                      fill: '#ffffff',
                                                      fontSize: 12,
                                                    },
                                                    colorMap: {
                                                      type: 'piecewise',
                                                      thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                                                      colors: ['#ebeef6'],
                                                     
                                                      }  }]}

                                                      yAxis={[
                                                        {
                                                          tickLabelStyle: {
                                                            fill: '#ffffff', // Green color for y-axis labels
                                                            fontSize: 12,
                                                          },
                                                        },
                                                      ]}

                                                  series={[{ data:xpost}]}
                                                
                                                  height={200}
                                                  
                                                //  margin={{top: 2, right: 30, left: 200, bottom: 2,}}
                                                  />

                </div>
                                                  
                <div  onClick={() => showdash(2)} className='cursor-pointer dark:bg-gray-800  rounded-md    bg-[#ffffff] dark:border-gray-600 font-medium group'>
                <p className='text-[#4cd964] px-4 pt-4'>Languages known by each user</p>
                  <LineChart
                      xAxis={[{ data: xLabelsline ,
                        
                          tickLabelStyle: {
                            fill: '#4cd964', // Green color for y-axis labels
                            fontSize: 12,
                          },
                        
                      }
                    ]}
                      yAxis={[
                        {
                          tickLabelStyle: {
                            fill: '#4cd964', // Green color for y-axis labels
                            fontSize: 12,
                          },
                        },
                      ]}
                      series={[
                        {
                          data: lang,
                          area: true,
                          baseline: 'min',
                        
                          showMark: ({ index }) => index  = 0,
                        },
                      ]}
                    
                      height={200}
                     
                    />
                </div>
                <div  onClick={() => showdash(2)} className='cursor-pointer dark:bg-gray-800  rounded-md    bg-[#4cd964] dark:border-gray-600 font-medium group'> 
                <p className='text-white px-4 pt-4'>Skills known by each user</p>
                <LineChart
                     xAxis={[{ data: xLabelsline,
                      tickLabelStyle: {
                        fill: '#ffffff', // Green color for y-axis labels
                        fontSize: 12,
                      },
                      }]}
                      yAxis={[
                        {
                          tickLabelStyle: {
                            fill: '#ffffff', // Green color for y-axis labels
                            fontSize: 12,
                          },
                        },
                      ]}
                    height={200}
                    series={[
                      { data: skill , showMark: ({ index }) => index  = 0, area: true,},
                      
                    ]}
                  
                  />
                </div> 
                <div  onClick={() => showdash(3)}   className='cursor-pointer dark:bg-gray-800  rounded-md    bg-[#ffffff] dark:border-gray-600 font-medium group'> 
                <p className='text-[#2977ff] px-4 pt-4'><span className='text-black  dark:text-white'>{total}</span> Status</p>
                <PieChart  width={280} height={200} 
                        series={[
                          {
                            data: [
                              {
                                label: 'Total User',
                                value: totaluserprcntg,
                               
                              },
                              {
                                label: 'Total Task',
                                value: totaltaskprcntg,
                              },
                              {
                              label: 'Total Post',
                                value: totalpostprcntg,
                              },
                            ],
                        //   arcLabel: (item) => `${item.value}%`,
                        //   arcLabelMinAngle: 35,
                          //  arcLabelRadius: '60%',
                          innerRadius: 20,
                            outerRadius: 50,
                            cornerRadius: 5,
                            layoutPadding : 5
                          //  startAngle: -45,
                          // endAngle: 225,
                          
                          }
                        ]}
                     
                      />
 
                </div> 
                
        </div>

          
        </div>
        

        



  </div>  

  <div className="  h-full ml-20  mb-1 md:ml-20">
        
        
        <div className='mt-14'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
                      
            <div className="cursor-pointer dark:bg-gray-800  rounded-md    bg-[#ffffff] dark:border-gray-600 font-medium group" >
                <p className='text-black px-4 pt-4  dark:text-white'>Timeline</p>
                <div className='scroll px-2  dark:bg-gray-800  dark:text-white'>
                  {fvpostshw.length > 0 && (
                    <ul className='timelineulist'>
                      {  fvpostshw.map((post,i) =>(

                          <li  key={i}>
                          <div className='timeline tmlnitm1'></div>
                          <div className='ml-8 timelinepanel'>
                          <a href="#" className="">
                            <span>{formatDistanceToNow(post.createdAt)} ago</span>
                            <h6><strong className="text-blue-600  dark:text-white">{post.name}</strong></h6>
                          </a>

                          </div>

                          </li>

                      ) )}
                   
                      {/* <li>
                        <div className='timeline tmlnitm2'></div>
                        <div className='ml-8 timelinepanel2'>
                        <a href="#" className="">
                          <span>20 minutes ago</span>
                          <h6>New order placed  <strong className="text-[#00afef]">#XF-2356.</strong></h6>
                        </a>

                        </div>
                        
                      </li>
                      <li>
                        <div className='timeline tmlnitm3'></div>
                        <div className='ml-8 timelinepanel3'>
                        <a href="#" className="">
                          <span>30 minutes ago</span>
                          <h6>john just buy your product <strong className="text-[#ffc83d]">Sell $500</strong></h6>
                        </a>

                        </div>
                        
                      </li>
                      <li>
                        <div className='timeline tmlnitm4'></div>
                        <div className='ml-8 timelinepanel4'>
                        <a href="#" className="">
                          <span>15 minutes ago</span>
                          <h6>StumbleUpon is acquired by eBay. </h6>
                        </a>

                        </div>
                        
                      </li> */}
                    </ul>
                     )}
                       {fvpostshw.length === 0 && (
                           <div className='text-center mt-12'><h6><strong className="text-blue-600 dark:text-white ">No Post Available</strong></h6></div> 
                       )}
                  </div>  
              </div>



              <div className="col-span-2 cursor-pointer dark:bg-gray-800  rounded-md    bg-[#ffffff] dark:border-gray-600 font-medium group mr-5" >
                      <p className='text-black px-4 pt-4  dark:text-white'  >Users</p>

                   
                      <User  userdata={userdata} showTheme={showTheme} />
              </div>
            </div>
        </div>
    </div>

    <div className="  h-full ml-20  mb-1 md:ml-20">
        <Sec3 showTheme={showTheme} xLabelsline={xLabelsline} skill={skill} lang={lang} baseUrl={baseUrl} key="sec3"  />
        
        
    </div>
 </div>
  )
}