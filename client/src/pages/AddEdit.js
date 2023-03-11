import React,{useEffect, useState} from 'react'
import {useNavigate,useParams,Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import "./AddEdit.css";

const initialState={
    name:"",
    email:"",
    contact:"",
};




function AddEdit() {
    const navigate=useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>setState({...resp.data[0]}));
    },[id]);

    const [state,setState] = useState(initialState);

    const {name,email,contact} = state;

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(!name || !email || !contact){
            toast.error("Please provide value in each input");
        }else{
            if(!id){
            axios.post("http://localhost:5000/api/post",{
                name,
                email,
                contact
            })
            .then(()=>{
                setState({name:"",email:"",contact:""});
            })
            .catch((err)=>toast.error(err.response.data));
            toast.success("Contact added successfully");
        }else{
            axios.put(`http://localhost:5000/api/update/${id}`,{
                name,
                email,
                contact
            })
            .then(()=>{
                setState({name:"",email:"",contact:""});
            })
            .catch((err)=>toast.error(err.response.data));
            toast.success("Contact Updated successfully");

        }
            setTimeout(()=>navigate("/"),500);
        }
    };

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setState({...state,[name]: value});
    }
  return (
    <div style={{marginTop:"150px"}}>
      <form style={{
        margin:"auto",
        padding:"15px",
        maxWidth:"400px",
        alignContent: "center"
      }} onSubmit={handleSubmit} >

        <label htmlFor="name">Name</label>
        <input type="text"
        id="name"
        name="name"
        placeholder="Your name ..."
        value={name || ""}
        onChange={handleInputChange} />

<label htmlFor="email">Email</label>
        <input type="text"
        id="email"
        name="email"
        placeholder="Your Email ..."
        value={email || ""}
        onChange={handleInputChange} />

<label htmlFor="contact">Contact</label>
        <input type="number"
        id="contact"
        name="contact"
        placeholder="Your Contact No ..."
        value={contact || ""}
        onChange={handleInputChange} />
        <input type="submit"  value={id?"Update":"Save"}/>
        <Link to="/">
            <button id="bt">Go back</button>
        </Link>
      </form>
    </div>
  )
}

export default AddEdit
