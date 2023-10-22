import "./home.css";
import { IconButton, Typography, Paper, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
const Home = () => {
  const [mydata, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3100/mydata")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  let TotalPrice = 0;
  return (
    <div>
      <Helmet>
        <title>home</title>
      </Helmet>
      <Box component="section">
        {mydata.map((item) => {
          TotalPrice += item.price;
          return (
            <Paper
              sx={{ mb: "20px" }}
              key={item.id}
              className="paper"
              elevation={3}
            >
              <div className="typo">
                <Typography
                  sx={{ ml: "16px", fontWeight: "500" }}
                  variant="body1"
                  color="inherit"
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{ mr: "40px", opacity: "0.8" }}
                  variant="body1"
                  color="inherit"
                >
                  ${item.price}
                </Typography>
              </div>
              <IconButton
                onClick={() => {
                  fetch(`http://localhost:3100/mydata/${item.id}`, {
                    method: "DELETE",
                  });
                  const newData =mydata.filter((objc) => {
                    return objc.id!==item.id
                  })
                  setData(newData)
                }}
                className="close"
              >
                <Close sx={{ fontSize: "20px" }} />
              </IconButton>
            </Paper>
          );
        })}
        <Typography sx={{ textAlign: "center", mt: "20px", mb:"35px" }} variant="h6">
          &#128073; You spend ${TotalPrice}
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
