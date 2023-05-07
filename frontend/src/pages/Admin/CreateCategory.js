import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm.js'
import { Modal } from 'antd';

const CreateCategory = () => {

const[categories,setcategories] =  useState([]);
const[name,setName] = useState("");
const [open, setopen] = useState(false);
const [selected, setSelected] = useState(null);
const [updatedName, setUpdatedName] = useState("");
//handle form
const handleSubmit = async (e)=>{
  e.preventDefault()
  try {
    const {data} = await axios.post('http://localhost:8080/api/v1/category/create-category',{name,})
    if(data?.success){
      toast.success(` category "${name}" is created`);
      getAllCategory();
    }
  } catch (error) {
    console.log(error);
    toast.error('something went wrong in input form ')
  }
}
//get all category

const getAllCategory = async ()=>{
  try {
    const {data} = await axios.get('http://localhost:8080/api/v1/category/get-category');
  if(data?.success){
    setcategories(data?.category);
  }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting category");
  }
};

useEffect(() => {
  getAllCategory();  
}, []);


//update handle
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
      { name: updatedName }
    );
    if (data?.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setopen(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

//delete category
const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:8080/api/v1/category/delete-category/${pId}`,
      { name: updatedName }
    );
    if (data?.success) {
      toast.success(`category is deleted`);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
   <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
     
     <div className="col-md-3">
     <AdminMenu/>
     </div>
     <div className="col-md-9">
     <h1>Manage category</h1>
     <div className="p-3 w-50">
      <CategoryForm
      handleSubmit={handleSubmit}
      value={name}
      setValue={setName}
      
      />
     </div>
     <div className='w-75'>
     <table className='table'>
       <thead>
         <tr>
           <th scope='col'>Name</th>
           <th scope='col'>Actions</th>
         </tr>
       </thead>
  <tbody>
   {categories?.map((c)=>{
   return (
     <>
     <tr key={c._id}>
       <td key={c._id}>{c.name}</td>
       <td>
         <button className='btn btn-primary m-2 '
            onClick={() => {
              setopen(true);
              setUpdatedName(c.name);
              setSelected(c);
            }}
         >Edit</button>
         <button type="submit" className="btn btn-danger m-2" onClick={()=>{handleDelete(c._id)}}>
          Delete
        </button>
       </td>
     </tr>
     </>
   )
   })}
  </tbody>
     </table>
     </div>
   
     </div>
     <Modal onCancel={()=> setopen(false)}
     footer={null} open={open}>
      <CategoryForm 
      alue={updatedName}
      setValue={setUpdatedName}
      handleSubmit={handleUpdate}
      />
     </Modal>


  
 </div>
      </div>
    
   </Layout>
  )
}

export default CreateCategory
