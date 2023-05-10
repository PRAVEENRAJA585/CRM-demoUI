import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import {
  getMyEmailSignature,
  selectMyEmailSignature,
} from "../store/myEmailSignatureSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import HelpIcon from "@mui/icons-material/Help";
import NavLinkAdapter from "@kyros/core/NavLinkAdapter";
import Button from "@mui/material/Button";

function MyEmailSignatureViewPage() {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const myEmailSignature = useSelector(selectMyEmailSignature);

  useEffect(() => {
    dispatch(getMyEmailSignature(1));
  }, [dispatch, routeParams]);

  return (
    <>
      <div className="ml-10 mt-20">
        <h1 className="text-2xl">
          My Email Signature <HelpIcon fontSize="small" color="disabled" />
        </h1>
        <div className="text-md font-medium flex">
          <div className="min-w-[85%]">
            <h1 className="text-md" style={{ color: "gray" }}>
              Update your HTML and text email signatures
            </h1>
          </div>
          <div className="min-w-[8%]"> </div>
          <Button
            variant="contained"
            color="secondary"
            component={NavLinkAdapter}
            to={`${myEmailSignature?.emailSignId}/edit`}
          >
            <span>Edit</span>
          </Button>
        </div>
        <hr className="border-t-2 border-black-400 " />
        <div class="text-md font-medium pt-20 flex">
          <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
            HTML SIGNATURE PAGE
          </div>
          <div className=" text-left ">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  name="htmlSignature"
                  id="htmlSignature"
                  multiline
                  rows={4}
                  defaultValue=""
                  value={myEmailSignature?.htmlSignature}
                  disabled
                />
              </div>
            </Box>
          </div>
        </div>
        <div class="text-md font-medium pt-20 flex">
          <div className="min-w-[11%] text-left mx-20	pt-20 relative  left-0">
            TEXT SIGNATURE
          </div>
          <div className=" text-left ">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "100ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  name="textSignature"
                  id="textSignature"
                  multiline
                  rows={4}
                  defaultValue=""
                  value={myEmailSignature?.textSignature}
                  disabled
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyEmailSignatureViewPage;
