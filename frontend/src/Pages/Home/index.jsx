import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Category from '../../Components/Category';
import { Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Home() {

  let navigate = useNavigate();
   
  const AddCate =()=>{
    navigate ("/category/add")
  } 

  const AddProd =()=>{
    navigate ("/Product/add")
  } 

  
  return (
    <div>
        <Box
        padding={"10px"}
        sx={{ background: "#0000", width: "100%", height: "900px" }}
        fullWidth
      >
        <Grid container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        lg={12}
        >   
        <Grid item xs={8}>
        <Typography
                padding={"10px"}
                variant="h4"
                gutterBottom
                sx={{ background: "white", textAlign: "left" }}
              >
                Our Category
              </Typography>
        </Grid> 
        <Grid item xs={4} 
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
        <Grid >
           <Button onClick={AddCate} variant="contained" disableElevation >
            Add Category
           </Button>    
        </Grid> 
        <Grid >
            <Button onClick={AddProd} variant="contained" disableElevation>
            Add product
            </Button>
       </Grid>
       </Grid> 
       </Grid>
       <Box padding={"40px"}
        sx={{ background: "white", width: "auto", height: "auto" ,margin: "20px" }}
        fullWidth>
          
          <Category/>


       </Box>
     </Box>
    </div>
  )
}
