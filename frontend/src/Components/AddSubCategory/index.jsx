import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { color } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageUploadButton } from "../../Pages/AddCategory/styles";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import axios from "axios";
export default function AddSubCategory() {
    const [name, setName] = useState();
    const [category, setCategory]=useState([]);
    const [parent, setParent]=useState("");
    const [image, setImage]=useState(false);
    const [error, setError] = useState({ message: "" });
    
   const handleChange = (event) => {
    setParent(event.target.value);
    };
    const onChangeInput = (e) => {
      if (e.target.name === "name") {
        setName(e.target.value);
      } else setError({ message: "" });
    }



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

    const handleImage = async (e) => {
      e.preventDefault();
      try {
        const file = e.target.files[0];
        if (!file) return alert("File not exist.");
        if (file.size > 1024 * 1024)
          // 1mb
          return alert("Size too large!");
        if (file.type !== "image/jpeg" && file.type !== "image/png")
          // 1mb
          return alert("File format is incorrect.");
        let formData = new FormData();
        formData.append("file", file);
  
        const res = await axios.post(
          "http://localhost:5000/api/categoryImageUpload",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        setImage(res.data.url);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        toast.error(err.response.data.msg, {
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

    const onClickShare = async (e) => {
    
      e.preventDefault();
      if (name === "" ||image==="") {
        alert("Fill all the fields");
      } else {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/category/create",
            {name,parent,image }
          );
          console.log(res);
          // alert(res.data)
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          //  window.location.href = '/pharmacist'
        } catch (err) {
          console.log(err);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }; 





  return (
    <div>
      <Box
        padding={"40px"}
        sx={{
          background: "white",
          width: "auto",
          height: "auto",
          margin: "20px",
        }}
        fullWidth
      >
        
        <Box
          padding={"10px"}
          sx={{
            background: "white",
            width: "auto",
            height: "auto",
            margin: "5px",
          }}
          fullWidth
        >
          <Typography
            padding={"3px"}
            variant="h5"
            gutterBottom
            sx={{
              background: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Sub Category
          </Typography>
          <hr color="black" width="450px"></hr>
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box
            padding={"20px"}
            sx={{
              background: "white",
              width: "50%",
              height: "auto",
              margin: "10px",
            }}
            fullWidth
          >
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{ background: "white", textAlign: "center",fontWeight: "bold" }}
                >
                  Sub Category Name
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                   label="Name"
                   name="name"
                  id="outlined-size-small"
                  placeholder="Sub Category name"
                  size="small"
                  onChange={(e) => onChangeInput(e)}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{ background: "white", textAlign: "center",fontWeight: "bold" }}
                >
                  Main Category 
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Main Category</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={parent}
                onChange={handleChange}
                label="Age"
                >
                { category.map((category,index) => (
                    <MenuItem key={index} value={category._id}>
                      {category.name}
                    </MenuItem>
                    ))
                }
             </Select>
           </FormControl>
              </Grid>
            </Grid>
            <br/>
            <Grid container direction="row" justifyContent="center">
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  padding={"3px"}
                  variant="h7"
                  gutterBottom
                  sx={{ background: "white", textAlign: "center",fontWeight: "bold" }}
                >
                  Sub Category Image
                </Typography>
              </Grid>
              <Grid
                xs={4}
                sx={{ background: "white" }}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleImage}  />
              {image ? (
                <img
                  alt="forum_post"
                  src={image}
                  style={{ minHeight: 400, minWidth: 400 }}
                />
              ) : (
                <ImageOutlinedIcon sx={{ minHeight: 400, minWidth: 400 }} />
              )}
            </ImageUploadButton>
              </Grid>

            </Grid>
            <br/>
              <Grid
              xs={8}
              sx={{ background: "white" }}
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start">
                <Typography
                  padding={"3px"}
                  gutterBottom
                  sx={{ background: "white", textAlign: "center",fontSize:"10px" }}
                >
                  JPEG, PNG, SVG or GIF <br/>
                 (Maximum file size 50MB)

                </Typography>
                
              </Grid>
          </Box>
        </Grid>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
         <Button variant="contained" onClick={onClickShare} >Add Sub Category</Button>
        </Grid>
      </Box>
    </div>
  );
}


