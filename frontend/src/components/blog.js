import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import "../App.css";
const URL = "https://blog-ratz.onrender.com"
const PopUp = ()=>{
   
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState();
    const postBlog = async ()=>{
        const newForm = new FormData();
        newForm.append('title',title);
        newForm.append('description',desc);  
        newForm.append('file',file);
        try {
            if(!desc || !title || !file){
                alert("Plese fill title/description/choose image");
            }
            const response = await axios.post(`${URL}/api/upload`, newForm);
            console.log(response.data);
            displayModal();
            setTitle("");
            setDesc("");
            setFile();
          } catch (error) {
            console.error(error);
          }
    };
    return (<div className="Popup"> 
            <div>
                <div><label>Title</label></div>
                <input type="text" className="title" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            </div>
            <div>
                <div><label >Description</label></div>
                <input type ="text" className="description" value={desc} onChange={(e)=>setDesc(e.target.value)}></input>
            </div>
            <div className="buttons">
                <input type="file" className="choose"  accept="image/png, image/jpeg"  onChange={(e)=> setFile(e.target.files[0])}/>

                <button className="upload" onClick={()=>postBlog()}>Create</button>
            </div>
    </div>);
};
const displayModal = ()=>{
    let modal = document.getElementsByClassName("Popup")[0];
    if(modal.style.display !== 'none'){
        modal.style.display = 'none'
    }
    else{
        modal.style.display = 'flex';
        let modal2 = document.getElementsByClassName("editBlog")[0];
        modal2.style.display ='none';
    }
}
const deleteBlog = async(id)=>{
    try{
      const response = await axios.delete(`${URL}/api/delete/${id}`);
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
}
let update_id;

const updateBlog = (id,title, description, image) => {
    try{
        check(true);
        update_id = id;

    } catch (error) {
        console.error(error);
      }
}
const EditBlog = ()=>{
    
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState();
    const updateBlog = async ()=>{
        const newForm = new FormData();
        newForm.append('title',title);
        newForm.append('description',desc);  
        newForm.append('file',file);
        try {
            // const data = await axios(`http://localhost:3001/api/get/${update_id}`);
            // const result = data?.data?.result;
            // setTitle(result.title);
            // setDesc(result.description);
            // setFile(result.image);
            const response= await axios.patch(`${URL}/api/update/${update_id}`,newForm);
            console.log(response.data);
            check(false);
            setTitle("");
            setDesc("");
          } catch (error) {
            console.error(error);
          }
    };
    return (<div className="editBlog"> 
            <div>
                <h3>Edit the blog</h3>
                <div><label>Title</label></div>
                <input type="text" className="title" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
            </div>
            <div>
                <div><label >Description</label></div>
                <input type="text" className="description" value={desc} onChange={(e)=>setDesc(e.target.value)}></input>
            </div>
            <div className="buttons">
                <input type="file" className="choose"  accept="image/png, image/jpeg"  onChange={(e)=> setFile(e.target.files[0])}/>

                <button className="upload" onClick={()=>updateBlog()}>EDIT</button>
            </div>
    </div>);
};


const OneBlog = (props)=>{
     return(<div className="one-blogdiv">
        <h4>Title</h4>
        <p>{props.title}</p>
        <h4>Description</h4>
        <p>{props.description}</p>
        
        <img src={ `${URL}/images/`+ props.image} alt="imag"className="image"/>
        <div className="update-btns">
            <div ><button className="update" onClick={()=> updateBlog(props.id, props.title, props.description, props.image)}>Update</button></div>
            <div ><button className="delete" onClick={()=> {deleteBlog(props.id)}}>Delete</button></div>
        </div>
       
     </div>)
}
const check = (flag)=> {
    if(flag){
        let modal = document.getElementsByClassName("Popup")[0];
        modal.style.display ='none';
        let modal2 = document.getElementsByClassName("editBlog")[0];
        modal2.style.display ='flex';
    }
    else{
        let modal = document.getElementsByClassName("editBlog")[0];
        modal.style.display ='none';
        // let modal2 = document.getElementsByClassName("Popup")[0];
        // modal2.style.display '';
    }
}
const Blog = ()=>{
   const [blogslist, setBlogsList] = useState([]);
//    const [flag, setFlag] = useState(false);

   const fetchData = async ()=>{
     const data = await axios( `${URL}/api/get`);
    //  console.log(data.data.result);
     setBlogsList(data.data.result);
   }
   useEffect(()=>{
     
    fetchData();
   },[blogslist]);
   useEffect(()=>{
    check();
   },[])
   return (
   
        <div className="">
            <div className="create">
                <button onClick = {()=>{displayModal() }}className="create-button">Create</button>
            </div>
        <div className="modal">
            <EditBlog/> <PopUp/>
        </div>
        <div className="body">
        
        <div className="blogs-list">
            {
                blogslist.map((blog)=>{
                    return <div key = {blog._id} className="one-blog"><OneBlog  title = {blog.title} description = {blog.description} image = {blog.image} id={blog._id} /></div>
                })
            }
        </div>
    </div>
    
   </div>);
};
export default Blog;