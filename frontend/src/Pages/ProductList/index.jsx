import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Category from '../../Components/Category';
import { Typography } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SubCategory from '../../Components/SubCategory';
import ProductCard from '../../Components/ProductCard';
import axios from 'axios';
export default function ProductList() {
  const params = useParams();
  const parentId = params.Sid;
  const productId = params.Pid;
  const [category, setCategory]=useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const getMainCategory = async () => {
      await axios
        .get(
          `http://localhost:5000/api/OneCategory/${productId}`,
        )
        .then((res) => {
          console.log(res);
          setCategory(res.data.data);
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.jsx:252 ~ getAllCategory ~ err", err.massage)
        });
    };

    getMainCategory();
  }, []);
   
  const AddCate =()=>{
    navigate ("/category/add")
  } 
  return (
    <div>
        <Box
        padding={"10px"}
        sx={{ background: "white", width: "100%", height: "900px" }}
        fullWidth
      >
        <Grid container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        lg={12}
        
        >   
        <Grid item xs={6}>
        <Typography
                padding={"10px"}
                variant="h4"
                gutterBottom
                sx={{ background: "white", textAlign: "left" }}
              >
                {category.name} Category
              </Typography>
        </Grid> 
        
       </Grid> 
       
       <Box padding={"10px"}
        sx={{ background: "white", width: "auto", height: "auto" ,margin: "10px" }}
        fullWidth>
          
          <ProductCard SubCategory={parentId} ProductCategory={productId}/>


       </Box>
     </Box>
    </div>
  )
}
