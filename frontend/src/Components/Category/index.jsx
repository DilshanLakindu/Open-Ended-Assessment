import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import men from "../../Assets/Images/men.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { Grid } from "@mui/material";

function Category() {
  let navigate = useNavigate();
  const [category, setCategory]=useState([]);
  console.log("🚀 ~ file: index.jsx:15 ~ Category ~ category", category)

  const subCateList = (Sid) => {
    navigate(`/subCategory/list/${Sid}`);
  };
   
  useEffect(() => {
    const getMainCategory = async () => {
      await axios
        .get(
          `http://localhost:5000/api/MainCategory/`
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

  return (
    <div>
      <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
     >
      <Grid 
       container
       direction="row"
       justifyContent="flex-start"
       alignItems="center">
      { category.map((category,index) => (
        <ImageList sx={{ width: 550, height: 450 }}>
        <ImageListItem key="Subheader" cols={3}>
        </ImageListItem>

        <ImageListItem onClick={e=>subCateList(category._id)}>
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
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about `}
              >
                <InfoIcon />
              </IconButton>
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

export default Category;
