import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import NavLinkAdapter from "@kyros/core/NavLinkAdapter";
import {
  getMyEmailSignature,
  selectMyEmailSignature,
} from "../store/myEmailSignatureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function MyEmailHeader(props) {
  const navigate = useNavigate();
  const routeParams = useParams();
  const dispatch = useDispatch();
  const myEmailSignture = useSelector(selectMyEmailSignature);

  useEffect(() => {
    dispatch(getMyEmailSignature(1));
  }, [dispatch, routeParams]);

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/usermanagement/users"
            color="inherit"
          >
            <h1 className="flex mx-4 font-medium">My Email Signature </h1>
            <HelpTwoToneIcon />

            <p>Update your HTML and text email signatures</p>
            <hr className="border-t-2 border-gray-400 my-20" />
          </Typography>
        </motion.div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        component={NavLinkAdapter}
        to={`${myEmailSignture?.emailSignId}/edit`}
      >
        <span>Edit</span>
      </Button>
    </div>
  );
}

export default MyEmailHeader;
