import { styled } from "@mui/material/styles";
import { Button, Grid } from "@mui/material/index";
import { Link } from "react-router-dom";

const ImageUploadButton = styled(Button)(({ theme }) => ({
    maxHeight: 610,
    maxWidth: 610,
    paddingRight: "17px",
    textTransform: "none",
    // border: `0.2px solid ${theme.palette.prime_psycheColors.prime_psyche_charcoal3}`,
    marginRight: theme.spacing(0.4),
  }));

export {
  ImageUploadButton,
  };
  