import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMyEmailSignature,
  resetMyEmailSignature,
  selectMyEmailSignature,
  updateMyEmailSignature,
} from "../store/myEmailSignatureSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { Box } from "@mui/system";

  // function MyComponent({ html }) {
  //   return <div dangerouslySetInnerHTML={{ __html: html }} />;
  // }


  const HtmlEditor = () => {
    const { control, reset, getValues, setValue } = useForm({
      mode: 'onChange',
      //resolver: yupResolver(schema),
    });
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myEmailSignature = useSelector(selectMyEmailSignature)
    const routeParams = useParams();
    const { emailSignId } = routeParams;

    // useEffect(() => {
    //   if (editorRef.current) {
    //     let textContainer = document.createElement('span');
    //     textContainer.innerHTML = 'Add custom text to the editor on mount';
    //     editorRef.current.selection.insertNode(textContainer);
    //   }
    // }, [editorRef]);
    // useEffect(() => {
    //   if (editorRef.current) {
    //     let textContainer = document.createElement('span');
    //     textContainer.innerHTML = 'Add custom text to the editor on mount';
    //     editorRef.current.selection.insertNode(textContainer);
    //   }
    // }, [editorRef]);

    useEffect(() => {
      dispatch(getMyEmailSignature(emailSignId));
    }, [dispatch, routeParams]);
    useEffect(() => {
      dispatch(getMyEmailSignature(emailSignId));
    }, [dispatch, routeParams]);

  useEffect(() => {
    if (!myEmailSignature) {
      return;
    }
    reset(myEmailSignature);
  }, [myEmailSignature, reset]);

    useEffect(() => {
      return () => {
        dispatch(resetMyEmailSignature());
      };
    }, [dispatch]);
    useEffect(() => {
      return () => {
        dispatch(resetMyEmailSignature());
      };
    }, [dispatch]);

  function handleRemoveEmailSignature() {
    navigate("/apps/profile/myemailsignature");
  }

  function handleSaveEmailSignature() {
    dispatch(updateMyEmailSignature(getValues())).then(() => {
      navigate("/apps/profile/myemailsignature");
    });
  }

  const config = {
    readonly: false,
    height: "400px",
    width: "1000px",
    removeButtons: ["eraser", "about", "video"],
    uploader: {
      url: "/your-file-upload-api-url",
      url: "/your-image-upload-api-url",
      format: "json",
      method: "POST",
      error: (e) => {
        console.log("Upload error", e);
      },
      success: (res) => {
        console.log("Upload success", res);
      },
      beforeSend: (xhr) => {
        console.log("Before send", xhr);
      },
    },
    cleanHTML: true, // this option will remove unnecessary HTML tags<p><p>stringssss123455</p></p>
  };

  const handleHtmlSignatureChange = (content) => {
    // const strippedContent = content.replace(/<\/?p>/g, "");
    setValue("htmlSignature", content);
  };
  // const handleHtmlSignatureChange = (content) => {
  //   setHtml(content);
  // };

  return (
    <>
      <div class="text-md font-medium pt-20 flex">
        <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
          HTML Signature
        </div>
        <div class="relative flex flex-col flex-auto w-full">
          {/* <MyComponent html={myEmailSignature?.htmlSignature} /> */}

          <Controller
            name="htmlSignature"
            control={control}
            render={({ field }) => {
              //const content = field.value || myEmailSignature?.htmlSignature ;
             // const strippedContent = content.replace(/(<([^>]+)>)/ig, '').replace(/(<([^>]+)>)/ig, '');
             
              return (
                <JoditEditor
                ref={editorRef}
                  //value={} 
                  value={field.value || `${myEmailSignature?.htmlSignature}`}
                  config={config}
                  onBlur={(newContent) => {
                    //const contentWithoutPTags = newContent.replace(/(<([^>]+)>)/ig, '');
                    handleHtmlSignatureChange(newContent);
                  }}
                    //handleHtmlSignatureChange(contentWithoutPTags)}}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="text-md font-medium pt-20 flex">
        <div className="min-w-[9.5%] text-left mx-20	pt-20 relative left-0">
        Text Signature
      </div>
      <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "119ch" },
              }}
              noValidate
              autoComplete="off"
            >
        <div class="relative flex flex-col flex-auto w-full">
          <Controller
            name="textSignature"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-24"
                multiline
                rows={4}
                value={field.value || `${myEmailSignature?.textSignature}`}
                onChange={(event) => field.onChange(event.target.value)}
                id="textSignature"
                variant="outlined"
              />
            )}
          />
        </div>
        </Box>
      </div>
      <div class="mt-20 md:px-200 ">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveEmailSignature}
          style={{
            WebkitAppearance: "button",
            backgroundColor: "rgb(55, 48, 163)",
            backgroundImage: "none",
          }}
        >
          Save
        </Button>
        <Button variant="contained" onClick={handleRemoveEmailSignature}>
          Cancel
        </Button>
      </div>
    </>
  );
};

// export default HtmlEditor;
export default withReducer("profileApp", reducer)(HtmlEditor);
