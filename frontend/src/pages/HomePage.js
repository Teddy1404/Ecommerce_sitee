import React, { useState, useEffect } from "react";
import Layout from '../components/Layout/Layout'
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    
    }
  };
  useEffect(() => {
    getAllCategory();  
  }, []);
  
   //getall products
   const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    
    }
  };

//filter by category
const handleFilter = (value, id) => {
  let all = checked.slice(); // create a new array
  if (value) {
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setChecked(all); // update the state
};



   //lifecycle method
   useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
    
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
             <Checkbox
             key={c._id}
             onChange={(e) => handleFilter(e.target.checked, c._id)}
             checked={checked.includes(c._id)}
           >
             {c.name}
           </Checkbox>
            ))}
          </div>
         {/* price filter */}
         <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
         
        </div>
        <div className="col-md-9 ">
          {/* {JSON.stringify(checked,null,4)} */}
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <button className="btn btn-primary m-2">More Details</button>
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
                        
              </div>
            ))}

          </div>
      
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
