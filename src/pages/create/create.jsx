import { Box, Button, InputAdornment, TextField, styled } from "@mui/material";
import "./create.css";
import { purple } from "@mui/material/colors";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  // @ts-ignore
  backgroundColor: theme.palette.ilyess.main,
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const Create = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const navigate= useNavigate()
  return (
    <div>
      <Helmet>
        <title>create</title>
      </Helmet>
      <Box sx={{ width: "366px" }} component="form">
        <TextField
          onChange={(eo) => {
            setTitle(eo.target.value)
          }}
          fullWidth
          sx={{ display: "block", mb: "20px" }}
          label="Transaction title"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#128073;</InputAdornment>
            ),
          }}
          variant="filled"
        />
        <TextField
        onChange={(eo) => {
          setPrice(Number(eo.target.value))
        }}
          fullWidth
          label=" Amount:"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          variant="filled"
        />
        <ColorButton
          onClick={() => {
            fetch("http://localhost:3100/mydata", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({title, price}),
            }).then(() => {
              navigate("/")
            });
          }}
          sx={{ mt: "20px" }}
          variant="contained"
        >
          Submit
        </ColorButton>
      </Box>
    </div>
  );
};

export default Create;
