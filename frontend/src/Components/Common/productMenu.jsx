import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import  { useEffect, useState } from "react";

export default function ProductMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
    const [category, setCategory]=useState([]);
    
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={handleClick}
      >
        Product
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > { category.map((category,index) => (
                    <MenuItem key={index} value={category._id}>
                      {category.name}
                         <MenuItem ></MenuItem>
                    </MenuItem>
                    ))
                }
      </Menu>
    </>
  );
}