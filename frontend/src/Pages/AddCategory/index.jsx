import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { color } from "@mui/system";
import TextField from "@mui/material/TextField";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Form from "react-bootstrap/Form";
import AddSubCategory from "../../Components/AddSubCategory";
import { ImageUploadButton } from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddCategory() {
  
  const [name, setName] = useState();
  const [image, setImage] = useState(false);
  const [error, setError] = useState({ message: "" });
  console.log("🚀 ~ file: index.jsx:21 ~ AddCategory ~ image", image)

  const onChangeInput = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else setError({ message: "" });
  }
  const onClickShare = async (e) => {
    
    e.preventDefault();
    if (name === "" ||image==="") {
      alert("Fill all the fields");
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/category/create",
          { name,image }
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



  const handleChange = async (e) => {
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





  return (
    <div>
      <ToastContainer />
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
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          lg={12}
        >
          <Grid
            xs={2}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Typography
              padding={"5px"}
              variant="h4"
              gutterBottom
              sx={{
                background: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Our Category
            </Typography>
          </Grid>
          <Grid
            xs={0.3}
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            sx={{ background: "white" }}
          >
            <ArrowForwardIosIcon sx={{ color: "blue" }} />
          </Grid>
          <Grid xs={8.5} sx={{ background: "white" }}>
            <Typography
              padding={"5px"}
              variant="h12"
              gutterBottom
              sx={{
                color: "#1976d2",
                background: "white",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Add new category
            </Typography>
          </Grid>
        </Grid>
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
            Main Category
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
                  Category Name
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
                  placeholder="Category name"
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
                  Category Image
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
                {/* <Form.Group controlId="formFile" className="mb-3" color="blue">
                  
                  <Form.Control type="file" />
                </Form.Group> */}
                <ImageUploadButton component="label">
              <input type="file" hidden onChange={handleChange}  />
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
                {/* <Button onClick={onClickShare}>ADD</Button> */}
              </Grid>
          </Box>
        </Grid>
        <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center">
         <Button variant="contained" onClick={onClickShare} >Add Main Category</Button>
        </Grid>
        <br/>
        <AddSubCategory/>
        <br/>
        
      </Box>
    </div>
  );
}
