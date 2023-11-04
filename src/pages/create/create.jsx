import { Box, Button, InputAdornment, TextField, styled } from "@mui/material";
import "./create.css";
import { purple } from "@mui/material/colors";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  // @ts-ignore
  backgroundColor: theme.palette.ilyess.main,
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ title, price }) => {
    price = Number(price);
    fetch("http://localhost:3100/mydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price }),
    }).then(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <Helmet>
        <title>create</title>
      </Helmet>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "366px" }}
        component="form"
      >
        <TextField
          error={Boolean(errors.title)}
          fullWidth
          sx={{ display: "block", mb: "20px" }}
          label="Transaction title"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">&#128073;</InputAdornment>
            ),
          }}
          {...register("title", {
            required: { value: true, message: "Requierd Field" },
            minLength: { value: 3, message: "Minimum Length is 3 " },
          })}
          variant="filled"
          helperText={
            Boolean(errors.title) ? errors.title?.message.toString() : null
          }
        />
        <TextField
          error={Boolean(errors.price)}
          fullWidth
          label=" Amount:"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          {...register("price", {
            required: { value: true, message: "Requierd Field" },
          })}
          variant="filled"
          helperText={
            Boolean(errors.price) ? errors.price?.message.toString() : null
          }
        />
        <ColorButton type="submit" sx={{ mt: "20px" }} variant="contained">
          Submit
        </ColorButton>
      </Box>
    </div>
  );
};

export default Create;
