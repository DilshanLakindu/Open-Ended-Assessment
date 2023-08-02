
import { width } from '@mui/system';
import React, { useEffect, useState } from 'react';
import men from "../../Assets/Images/men.png"
import { Button } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CreateIcon from '@mui/icons-material/Create';
import {Grid} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function ProductCard({ProductCategory,SubCategory}) {

  const [open, setOpen] = React.useState(false);
  const SubCategoryID=SubCategory
  const categories=ProductCategory
  const [product, setProduct]=useState([]);
  const [deleteId, setDeleteId]=useState();
  console.log("🚀 ~ file: index.jsx:41 ~ ProductCard ~ deleteId", deleteId)
  let navigate = useNavigate();
  const handleOpen = (Did) => {
    setOpen(true);
    setDeleteId(Did)
  }
  const handleClose = () => setOpen(false);
  const editProduct = (PEid) => {
    navigate(`/subCategory/list/${SubCategoryID}/${categories}/${PEid}`);
  };

  useEffect(() => {
    const getProductCategory = async () => {
      await axios
        .post(
          `http://localhost:5000/api/categoryProduct/`,{categories:categories}
        )
        .then((res) => {
          console.log(res);
          setProduct(res.data.data);
        })
        .catch((err) => {
          console.log("🚀 ~ file: index.jsx:252 ~ getAllCategory ~ err", err.massage)
        });
    };

    getProductCategory();
  }, [open]);
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/Product/delete/${deleteId}`
      );
      console.log(res.data);
      setOpen(false);
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setOpen(false);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  
  return (
    <div>
      <ToastContainer />
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
      { product.map((product,index) => (
        <ImageList sx={{ width: 700, height: 450 }}>
        <ImageListItem key="Subheader" cols={6}>
        
        </ImageListItem>
      
        <ImageListItem >
          <img
            src={product.productImage}
            // srcSet={}
            // alt={}
            loading="lazy"
          />
          <ImageListItemBar
             title={product.name}
             subtitle={product.price}
             actionIcon={
              <>
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                spacing={{ xs: 2, md: 3 }}
                onClick={e=>editProduct(product._id)}
              >
                <CreateIcon sx={{color:"white"}} />
                
                {/* <DeleteIcon sx={{color:"white"}}/> */}
                

              </IconButton>

              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                spacing={{ xs: 2, md: 3 }}
                onClick={e=>handleOpen(product._id)}
              >
                {/* <CreateIcon sx={{color:"white"}} /> */}
                
                <DeleteIcon sx={{color:"white"}}/>
                

              </IconButton>
              </>
              
              
            }
            
          />
        </ImageListItem>
        
       
      </ImageList>
      
      
      ))}
      </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              You want delete this product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <Button onClick={handleDelete}>Delete</Button>
                 <Button onClick={handleClose}>Cancel</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
    
  );
}

export default ProductCard
