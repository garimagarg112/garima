import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const Url = import.meta.env.VITE_Url;
const postUrl = import.meta.env.VITE_Post_Url;
const taskUrl = import.meta.env.VITE_Task_Url;
 // console.log("first")
 // console.log(Url,postUrl,taskUrl)

export const fetchUserData = createAsyncThunk(
  "data/fetchUserData",
  async (id) => {
    const response = await fetch(`${Url}getuserById/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
);  

export const getpostByuserId = createAsyncThunk(
  "data/getpostByuserId",
  async (id) => {
    const response = await fetch(`${postUrl}getpostByuserId/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
);  


export const getallpostId = createAsyncThunk(
  "data/getallpostId",
  async (id) => {
    const response = await fetch(`${postUrl}getallpostId/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
);  

export const getpost = createAsyncThunk(
  "data/getpost",
  async () => {
    const response = await fetch(`${postUrl}getpost`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
); 
export const getpostDashboard = createAsyncThunk(
  "data/getpostDashboard",
  async () => {
    const response = await fetch(`${postUrl}getpostDashboard`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
); 

export const gettotaltask = createAsyncThunk(
  "data/gettotaltask",
  async () => {
    const response = await fetch(`${taskUrl}gettotaltask`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
);
export const getallpost = createAsyncThunk(
  "data/getallpost",
  async (id) => {
    const response = await fetch(`${postUrl}getallpost/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
); 

export const getawholepost = createAsyncThunk(
  "data/getawholepost",
  async () => {
    const response = await fetch(`${postUrl}getawholepost`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
); 


export const getawholetask = createAsyncThunk(
  "data/getawholetask",
  async () => {
    const response = await fetch(`${taskUrl}getawholetask`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
); 

export const getawholetaskUser = createAsyncThunk(
  "data/getawholetaskUser",
  async (id) => {
    const response = await fetch(`${taskUrl}getawholetaskUser/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
);
export const getUserData = createAsyncThunk(
  "data/getUserData",
  async (id) => {
    const response = await fetch(`${Url}getuserById/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
);


export const fetchAllUser = createAsyncThunk(  
"data/fetchAllUser",
async() =>{
  const response = await fetch(`${Url}getAlluser`);
  const data = await response.json();
  return data.result; // Only returning the relevant data
}

)

export const fetechtoken = createAsyncThunk(  
  "data/fetechtoken",
  async(token) =>{
    const response = await fetch(`${Url}gettoken/${token}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
  )

export const fetchtaskdata = createAsyncThunk(  
  "data/fetchtaskdata",
  async(id) =>{
    const response = await fetch(`${taskUrl}gettaskById/${id}`);
    const data = await response.json();
    return data.result; // Only returning the relevant data
  }
  
  )
  
  
  export const fetchTaskUser = createAsyncThunk(  
    "data/fetchTaskUser",
    async(id) =>{
      const response = await fetch(`${taskUrl}gettaskByuserId/${id}`);
      const data = await response.json();
      return data.result; // Only returning the relevant data
    }
  )
      


    export const editUser = createAsyncThunk(  
      "data/editUser",
      async(formData) =>{
        const response = await fetch(`${Url}updateUser`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        // console.log(data)
         return data.result; // Only returning the relevant data
      }
      )

      export const savePost = createAsyncThunk(  
        "data/savePost",
        async(formData) =>{
          const response = await fetch(`${postUrl}savePost`, {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          // console.log(data)
           return data.result; // Only returning the relevant data
        }
        )

        export const editPost = createAsyncThunk(  
          "data/editPost",
          async(formData) =>{
            const response = await fetch(`${postUrl}editPost`, {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();
            // console.log(data)
             return data.result; // Only returning the relevant data
          }
          )

        export const delpostdsh = createAsyncThunk(  
          "data/delpostdsh",
          async(newobj) =>{
            const response = await fetch(`${postUrl}delpost`, {
              method: 'POST',
              body:  JSON.stringify(newobj),
              headers: {
                'Content-Type': 'application/json',
              },
         
            });
            const data = await response.json();
            // console.log(data)
             return data.result; // Only returning the relevant data
          }
          )


    export const delTask = createAsyncThunk(  
      "data/delTask",
      async(newobj) =>{
        const response = await fetch(`${taskUrl}deleteById`, {
          method: 'POST',
          body: JSON.stringify(newobj),
            headers: {
              'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
       // console.log(data)
        return data.result; // Only returning the relevant data
      }
      
      )

const initialState = {
  task: {
   editdata: {}
  },
  arr : {        

  },
  viewuserdata :{},
  userdata :{},
  taskall:{},
  totaluser: 0,
  totaltask:0,
  totalpost: {},

 // completepost : 0,
  userlabel:[],
  userlabelpost:[],
  userlabeltask:[],
  language : [],
  skills:[],
  langlabel:[],
  taskdata:{},
  taskuserdata : {},
  usrpost:{},
  fvpost : 0,
  allpost:{},
  dashpost :[],
  getwholeUserdata:{},  // get complete d ta of user including task and post
  edittask : 0,
  token : {},
  allpostid : {}
};

let isloginshow ;
let formFields;
let formIsValid;
let formErrors;
let index

const dashboardSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    showuserdata: (state, action) => {
     // console.log(action.payload+"   hhhhhhhh")
      let id = action.payload
      let payload ={}
    //  console.log(id)
         // state.task = payload
         fetch(`${Url}getuserById/`+id)
        .then((response) =>  response.json())
        .then((data) => {
          //console.log(data)
          payload["editdata"] = data.result;
          state.task = payload
        })
        //console.log(payload)
    },
    Updatedata: (state, action) =>{

    },
    complete:(state,action) =>{

         
    },
    submit:(state,action) =>{
  

    },

    
  },


  extraReducers: (builder) => {
    builder
    .addCase(fetchUserData.fulfilled, (state, action) => {
      state.task.editdata = action.payload;
    })
    
    .addCase(getUserData.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.viewuserdata = action.payload;
    })
    
    .addCase(fetchtaskdata.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.taskdata = action.payload;
    })
    
    .addCase(fetchTaskUser.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.taskuserdata = action.payload;
    }) 
    .addCase(editUser.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.task.editdata  = action.payload;
    })
    .addCase(delTask.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.taskuserdata = action.payload;
      state.edittask = 1
    })

    .addCase(savePost.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.usrpost = action.payload;
    })

    .addCase(editPost.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.usrpost = action.payload;
    })

    .addCase(getpostByuserId.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.usrpost = action.payload;
    })
    
    .addCase(getallpostId.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.allpostid = action.payload;
    })
    .addCase(delpostdsh.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.usrpost = action.payload;
    })


    .addCase(getallpost.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.allpost = action.payload;
    })

    .addCase(getpost.fulfilled, (state, action) => {
      //console.log(action.payload.length)
      state.fvpost = action.payload.length;
    })

    .addCase(getpostDashboard.fulfilled, (state, action) => {
      //console.log(action.payload.length)
      state.dashpost = action.payload;
    })
    .addCase(gettotaltask.fulfilled, (state, action) => {
     // console.log(action.payload)
      state.totaltask = action.payload.length;
    })

    .addCase(getawholetaskUser.fulfilled, (state, action) => {
     // console.log(action.payload)
      state.getwholeUserdata = action.payload
    })
    
    
    .addCase(fetechtoken.fulfilled, (state, action) => {
      // console.log(action.payload)
       state.token = action.payload
     })
    .addCase(getawholetask.fulfilled, (state, action) => {
      //console.log(action.payload)
      state.taskall = action.payload
      let loaddata = action.payload
      let userlabl =[]
      let userlblpost = []
      for(let i=0;i<loaddata.length;i++ ){
        // console.log(loaddata[i]["task"]["taskname"] )

         // console.log(loaddata[i]["post"].length)   
          userlblpost.push(loaddata[i]["task"].length)
          userlabl.push(loaddata[i]["name"])
       }
       //console.log("first")
      // console.log(  userlabl)
       state.userlabel = userlabl

     //  console.log(  userlblpost)
       state.userlabeltask = userlblpost

    })
    .addCase(getawholepost.fulfilled, (state, action) => {
      //nsole.log(action.payload)
      state.totalpost = action.payload;
      let loaddata = action.payload
      let lang = []
      let langarr = []
      let skil = []
      let userlabl =[]
      let userlblpost = []
      let comppost = 0
      for(let i=0;i<loaddata.length;i++ ){
        // console.log(loaddata[i]["task"]["taskname"] )

         // console.log(loaddata[i]["post"].length)   
          userlblpost.push(loaddata[i]["post"].length)
          userlabl.push(loaddata[i]["name"])
          lang.push((loaddata[i]["lang"].split(",")).length)
          skil.push((loaddata[i]["skills"].split(",")).length)
          langarr.push(i+1)
       }
       state.userlabel = userlabl
       state.userlabelpost = userlblpost
     //  state.completepost = comppost
       state.language = lang
       state.langlabel = langarr
       state.skills = skil
       state.totaluser = loaddata.length 
    })

    .addCase(fetchAllUser.fulfilled, (state, action) => {
      state.userdata = action.payload;
     // console.log("hi")
      let loaddata = action.payload
      let lang = []
      let langarr = []
      let skil = []
      let userlabl =[]
      let comppost = 0
      for(let i=0;i<loaddata.length;i++ ){
        // console.log(loaddata[i]["task"]["taskname"] )

          // console.log(loaddata[i]["post"].length)   language
          userlabl.push(loaddata[i]["name"])
          lang.push((loaddata[i]["lang"].split(",")).length)
          skil.push((loaddata[i]["skills"].split(",")).length)
          langarr.push(i+1)
       }
                 state.userlabel = userlabl
              //  state.completepost = comppost
                state.language = lang
                state.langlabel = langarr
                state.skills = skil
                state.totaluser = loaddata.length 
    })
  }


});

export const { showuserdata,submit,complete,Updatedata } = dashboardSlice.actions;

export default dashboardSlice.reducer;