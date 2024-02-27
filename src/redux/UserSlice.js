import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const  loginUser =  createAsyncThunk(
    "user/login", 
    async(userCredentials) =>{
        const res =  await axios.post("http://localhost:3000/users", userCredentials)
        localStorage.setItem("user", JSON.stringify(res.data))
        return res.data
    }
)

const userSlice =  createSlice({
    name:"user",
    initialState:{
        loading:false, 
        user:null, 
        error:null
    }, 
    extraReducers:((builder)=>{
        builder.addCase(loginUser.pending, (state)=>{
            state.loading =  true 
            state.user =  null
            state.error= null
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading =  false
            state.user =  action.payload
            state.error= null
        }).addCase(loginUser.rejected, (state, action)=>{
            state.loading =  false 
            state.user =  null
            if (action.error.message === "Request failed with status code 401") {
                state.error =  "Access Denied! Invalid Credentails"
            } else {
                state.error =  action.error.message
            }
            state.error= null
        })
    })
})

export default userSlice.reducer