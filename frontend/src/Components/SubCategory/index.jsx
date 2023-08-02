import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import men2 from "../../Assets/Images/men2.png"
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {Grid} from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';



function SubCategory({SubCategory}) {
  let navigate = useNavigate();
  const parent=SubCategory
  const [category, setCategory]=useState([]);
  console.log("🚀 ~ file: index.jsx:18 ~ SubCategory ~ category", category)
  useEffect(() => {
    const getMainCategory = async () => {
      await axios
        .post(
          `http://localhost:5000/api/IdSubCategory/`,{parent:parent}
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

  const subProductList = (Pid) => {
    navigate(`/subCategory/list/${parent}/${Pid}`);
  };
  return (
    <div>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
     >
      <Grid 
       container
       direction="row"
       justifyContent="flex-start"
       alignItems="center">
        { category.map((category,index) => (
        <ImageList sx={{ width: 550, height: 450 }}>
        <ImageListItem key="Subheader" cols={6}>
        </ImageListItem>

        <ImageListItem onClick={e=>subProductList(category._id)}>
          <img
            src={category.image}
            // srcSet={}
            // alt={}
            loading="lazy"
          />
          <ImageListItemBar
            title={category.name+" collection"}
            subtitle={category.name+" collection"}
             actionIcon={
              <>
              

               <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about `}
               >
               {/* <CreateIcon sx={{color:"white"}}/> */}
              </IconButton>

              <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about `}
               >
               {/* <DeleteIcon sx={{color:"white"}}/> */}
              </IconButton>
              </>
             }
            
          />
        </ImageListItem>
      </ImageList>
      ))}
      </Grid>
      </Grid>
    </div>
    
  );
}

export default SubCategory
