import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getCustomLogo, saveCustomLogo, selectCustomLogo } from "../store/customLogoSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));

function CustomLogo() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [image, setImage] = useState("http://www.kyrostechnologies.com/wp-content/uploads/2022/11/Kyros-Logo_v2.png");
  const customLogo = useSelector(selectCustomLogo);
  const id = 1;
  useEffect(() => {
    dispatch(getCustomLogo(id))
},[dispatch]);

  useEffect(() => {
    setImage(`http://192.168.1.8/api/CustomLogo/GetLogo?id=${id}`)
},[id]);

  const handleUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
    setImage(URL.createObjectURL(event.target.files[0])?? null);
    const formData = new FormData();
    formData.append('UpdateLogo', event.target.files[0]);
    dispatch(saveCustomLogo(formData))
    }
  };
 
  const handleRevert = () => {
    setImage("http://www.kyrostechnologies.com/wp-content/uploads/2022/11/Kyros-Logo_v2.png");
  };
  
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src={image} alt="Preview" width="50" height="30" />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            value = {customLogo}
            onChange={handleUpload}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
            >
              Upload
            </Button>
          </label>
          <Button onClick={handleRevert}>Revert to Default</Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default CustomLogo;