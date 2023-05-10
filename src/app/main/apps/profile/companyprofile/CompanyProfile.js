import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { Autocomplete, Button, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectDateFormat } from "../store/dateFormatSlice";
import { getDateFormat } from "../store/dateFormatSlice";
import { useSelector } from "react-redux";
import { useDeepCompareEffect } from "@kyros/hooks";
import {
  getPhoneNoFormate,
  selectPhoneNoFormate,
} from "../store/phoneNoFormateSlice";
import {
  getDefaultCountryCode,
  selectDefaultCountryCode,
} from "../store/defaultCountryCodeSlice";
import { getCountry, selectCountry } from "../store/countrySlice";
import {
  resetCompanyProfile,
  saveCompanyProfile,
  selectCompanyProfile,
  updateCompanyProfile,
} from "../store/companyProfileSlice";
import { getCompanyProfile } from "../store/companyProfileSlice";

const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

function CompanyProfile() {
  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const dateFormat = useSelector(selectDateFormat);
  const phoneNoFormate = useSelector(selectPhoneNoFormate);
  const defaultCountryCode = useSelector(selectDefaultCountryCode);
  const companyProfile = useSelector(selectCompanyProfile);
  const country = useSelector(selectCountry);
  const [noCompanyProfile, setNoCompanyProfile] = useState(false);

  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }

  const timezones = [
    { label: "(GMT-12:00) International Date Line West" },

        {
            label: '(GMT-11:00) Coordinated Universal Time-11'
        },
        {
            label: '(GMT-10:00) Hawaii'
        },
        {
            label: '(GMT-09:00) Alaska'
        },
        {
            label: '(GMT-08:00) Pacific Time (US & Canada)'
        },
        {
            label: '(GMT-07:00) Arizona'
        },
        {
            label: '(GMT-07:00) Mountain Time (US & Canada)'
        },
        {
            label: '(GMT-06:00) Central Time (US & Canada)'
        },
        {
            label: '(GMT-05:00) Eastern Time (US & Canada)'
        },
        {
            label: '(GMT-04:00) Atlantic Time (Canada)'
        },
        {
            label: '(GMT-03:30) Newfoundland'
        },
        {
            label: '(GMT-03:00) Brasilia'
        },
        {
            label: '(GMT-02:00) Coordinated Universal Time-02'
        },
        {
            label: '(GMT-01:00) Azores'
        },
        {
            label: '(GMT+00:00) London, Dublin, Edinburgh'
        },
        {
            label: '(GMT+01:00) Berlin, Vienna, Rome'
        },
        {
            label: '(GMT+02:00) Athens, Istanbul, Jerusalem'
        },
        {
            label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd'
        },
        {
            label: '(GMT+03:30) Tehran'
        },
        {
            label: '(GMT+04:00) Dubai, Abu Dhabi, Muscat'
        },
        {
            label: '(GMT+04:30) Kabul'
        },
        {
            label: '(GMT+05:00) Islamabad, Karachi, Tashkent'
        },
        {
            label: '(GMT+05:30) Chennai, Kolkata, Mumbai'
        },
        {
            label: '(GMT+05:45) Kathmandu'
        },
        {
            label: '(GMT+06:00) Astana, Dhaka'
        },
        {
            label: '(GMT+06:30) Yangon (Rangoon)'
        },
        {
            label: '(GMT+07:00) Bangkok, Hanoi, Jakarta'
        },
        {
            label: '(GMT+08:00) Beijing, Hong Kong, Kuala Lumpur'
        },
        {
            label: '(GMT+08:45) Eucla'
        },
        {
            label: '(GMT+09:00) Tokyo, Seoul, Osaka'
        },
        {
            label: '(GMT+09:30) Adelaide'
        },
        {
            label: '(GMT+10:00) Canberra, Sydney, Melbourne'
        },
        {
            label: '(GMT+10:00) Brisbane'
        },
        {
            label: '(GMT+10:00) Hobart'
        },
        {
            label: '(GMT+10:00) Vladivostok'
        },
        {
            label: '(GMT+10:00) Guam, Port Moresby'
        },
        {
            label: '(GMT+11:00) Magadan, Solomon Islands, New Caledonia'
        },
        {
            label: '(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands'
        },
        {
            label: '(GMT+12:00) Auckland, Wellington'
        },
        {
            label: "(GMT+13:00) Nuku'alofa"
        },
    ];
 
    useDeepCompareEffect(() => {
        function updateUserState() {
            dispatch(getCompanyProfile(1));
        }

    updateUserState();
    dispatch(getDateFormat());
    dispatch(getPhoneNoFormate());
    dispatch(getDefaultCountryCode());
    dispatch(getCountry());
  }, [dispatch]);

  console.log(companyProfile);

  useEffect(() => {
    if (!companyProfile) {
      return;
    }
    reset(companyProfile);
  }, [companyProfile, reset]);

  useEffect(() => {
    return () => {
      dispatch(resetCompanyProfile());
      setNoCompanyProfile(false);
    };
  }, [dispatch]);

  function handleSaveProfile() {
    dispatch(updateCompanyProfile(getValues()));
  }

  return (
    <>
      <div className="ml-10 mt-20">
        <h1 className="text-2xl">
          Company Profile
          <HelpIcon fontSize="small" color="disabled" />
        </h1>
        <h1 className="text-md" style={{ color: "gray" }}>
          Update your organization profile
        </h1>
        <hr className="border-t-2 border-black-400 " />
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
        <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Company Name
            </div>
            <div className="min-w-[10%]"> </div>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required
                    autoFocus
                    id="companyName"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Date Format
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                control={control}
                name="dateFormatId"
                render={({ field: { onChange, value } }) => {
                  const options = dateFormat.map((option) => ({
                    value: option.dateFormatId,
                    label: option.dateFormatType || "",
                  }));
                  return (
                    <Autocomplete
                      id="dateFormatId"
                      isOptionEqualToValue={isOptionEqualToValue}
                      className="mt-8 mb-16"
                      options={dateFormat}
                      disableCloseOnSelect
                      getOptionSelected={(option, value) =>
                        option.value === value.value
                      }
                      getOptionLabel={(option) =>
                        option ? option.dateFormatType : " "
                      }
                      value={
                        value
                          ? _.find(dateFormat, { dateFormatId: value })
                          : null
                      }
                      onChange={(event, newValue) => {
                        onChange(newValue ? newValue.dateFormatId : null);
                      }}
                      size="small"
                      // fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Phone No. Format
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                control={control}
                name="phoneNoFormateId"
                defaultValue={0}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Autocomplete
                      id="phoneNoFormateId"
                      className="mt-8 mb-24"
                      options={phoneNoFormate}
                      disableCloseOnSelect
                      getOptionSelected={(option, value) =>
                        option.value === value.value
                      }
                      getOptionLabel={(option) =>
                        option ? option.countryCode + ", " + option.number : ""
                      }
                      value={
                        value
                          ? _.find(phoneNoFormate, { phoneNoFormateId: value })
                          : 0
                      }
                      isOptionEqualToValue={isOptionEqualToValue}
                      onChange={(event, newValue) => {
                        onChange(newValue ? newValue.phoneNoFormateId : 0);
                      }}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Default Country Code
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                control={control}
                defaultValue={0}
                name="defaultCountryCodeId"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Autocomplete
                      id="defaultCountryCodeId"
                      isOptionEqualToValue={isOptionEqualToValue}
                      className="mt-5 mb-20"
                      options={defaultCountryCode}
                      disableCloseOnSelect
                      getOptionSelected={(option, value) =>
                        option.value === value.value
                      }
                      getOptionLabel={(option) =>
                        option
                          ? option.countryName + ", " + option.countryCode
                          : ""
                      }
                      value={
                        value
                          ? _.find(defaultCountryCode, {
                              defaultCountryCodeId: value,
                            })
                          : 0
                      }
                      onChange={(event, newValue) => {
                        onChange(newValue ? newValue.defaultCountryCodeId : 0);
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          // label="Team"
                          // placeholder="Team"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
          </div>
          <div class="text-md font-medium flex ">
            <div className="min-w-[15%]  text-left pt-20 relative  left-0">
              Default Currency
            </div>
            <div className="min-w-[10%]"> </div>
            <div class="text-md font-medium flex">
              <div className="min-w-[15%] text-left pt-20 relative  left-0">
                Symbol
              </div>
              <div className="min-w-[10%]"> </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    ml: 2,
                    mt: 1,
                    mr: 5,
                    width: "10ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                    name="symbol"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required

                        id="symbol"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
              </Box>
            </div>
            <div class="text-md font-medium flex">
              <div className="min-w-[15%] text-left pt-20 relative  left-0">
                Abbriviation
              </div>
              <div className="min-w-[10%]"> </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    ml: 2,
                    mt: 1,
                    mr: 5,
                    width: "15ch",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                    name="abbreviation"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required

                        id="abbreviation"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
              </Box>
            </div>
            <div class="text-md font-medium flex">
              <div className="min-w-[15%] text-left pt-20 relative  left-0">
                Name
              </div>
              <div className="min-w-[10%]"> </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { mt: 1, width: "20ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8 mb-16"
                        required

                        id="name"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
              </Box>
            </div>
          </div>
          <div class="text-md font-medium flex ">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Time Zone
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="timeZone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    className="mt-8 mb-24"
                    options={timezones || []}
                    error={!!errors.timeZone}
                    helperText={errors?.timeZone?.message}
                    value={value || ""}
                    onChange={(event, newValue) => {
                      onChange(newValue.label);
                    }}
                    // fullWidth
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex pt-10">
            <div className="min-w-[15%]">Website </div>
            <div className="min-w-[10%]"> </div> 
            <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // className="mt-8 mb-16"
                    required

                    id="website"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex ">
            <div className="min-w-[15%] text-left pt-20 relative  left-0]">
              Street 1
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="street1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required

                    id="street1"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Street 2
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="street2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required

                    id="street2"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              City
            </div>
            <div className="min-w-[10%]"> </div>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required

                    id="city"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              State
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="sate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required

                    id="sate"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Country
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                control={control}
                defaultValue={0}
                name="countryId"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Autocomplete
                      id="countryId"
                      isOptionEqualToValue={isOptionEqualToValue}
                      className="mt-5 mb-20"
                      options={country}
                      disableCloseOnSelect
                      getOptionSelected={(option, value) =>
                        option.value === value.value
                      }
                      getOptionLabel={(option) =>
                        option ? option.countryName : " "
                      }
                      value={value ? _.find(country, { countryId: value }) : 0}
                      onChange={(event, newValue) => {
                        onChange(newValue ? newValue.countryId : 0);
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Zip
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="zip"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required

                    id="zip"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Fax
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="fax"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required

                    id="fax"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%] text-left pt-20 relative left-0">
              Phone
            </div>
            <div className="min-w-[10%]"> </div>
            <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required
                    id="phone"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
          <div class="text-md font-medium flex">
            <div className="min-w-[15%]">Allowed User Email Domains </div>
            <div className="min-w-[10%]"> </div> 
            <Controller
                name="allowedUserEmailDomains"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 mb-16"
                    required
                    //  
                    id="allowedUserEmailDomains"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
          </div>
        </Box>
      </div>
      <div className="ml-200">
        <Button
          className="ml-25 "
          variant="contained"
          color="secondary"
          onClick={handleSaveProfile}
          style={{
            WebkitAppearance: "button",
            backgroundColor: "rgb(55, 48, 163)",
            backgroundImage: "none",
          }}
        >
          Save
        </Button>
        <Button
          className="ml-8 "
          variant="contained"
          color="secondary"
          // onClick={handleSavePassword}
          style={{
            WebkitAppearance: "button",
            backgroundColor: "rgb(55, 48, 163)",
            backgroundImage: "none",
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default withReducer("profileApp", reducer)(CompanyProfile);
