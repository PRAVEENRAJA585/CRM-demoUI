import React from "react";
import Button from "@mui/material/Button";
import NavLinkAdapter from "@kyros/core/NavLinkAdapter";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import { useDeepCompareEffect } from "@kyros/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import KyrosLoading from "@kyros/core/KyrosLoading";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import KyrosSvgIcon from "@kyros/core/KyrosSvgIcon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  getMyProfile,
  resetMyProfile,
  //   newProfile,
  selectMyProfile,
  updateMyProfile,
} from "../store/myProfileSlice";
import { selectReportingTo } from "../store/reportingToSlice";
import { selectRole } from "../store/roleSlice";
import { getUserType, selectUserType } from "../store/userTypeSlice";
import {
  getSalesRegions,
  selectSalesRegions,
} from "../store/salesRegionsSlice";
import { getCountry, selectCountry } from "../store/countrySlice";
import { getTeam } from "../store/teamSlice";
import { selectTeam } from "../store/teamSlice";
import { DatePicker } from "@mui/x-date-pickers";
import { getDateFormat, selectDateFormat } from "../store/dateFormatSlice";
import {
  getHolidayCalender,
  selectHolidayCalender,
} from "../store/holidayCalenderSlice";
// import { getWorkDayTemplate, selectWorkDayTemplate } from '../store/workDayTemplateSlice';
import { getWorkDayTemplate } from "../store/workDayTemplate";
import { selectWorkDayTemplate } from "../store/workDayTemplate";
import { useState } from "react";
import { getReportingTo } from "../store/reportingToSlice";
import { getRole } from "../store/roleSlice";
import axios from "axios";
import HelpIcon from "@mui/icons-material/Help";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

const ProfileForm = (props) => {
  const myProfile = useSelector(selectMyProfile);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportingTo = useSelector(selectReportingTo);
  const role = useSelector(selectRole);
  const userType = useSelector(selectUserType);
  const salesRegions = useSelector(selectSalesRegions);
  const country = useSelector(selectCountry);
  const dateFormat = useSelector(selectDateFormat);
  const team = useSelector(selectTeam);
  const holidayCalender = useSelector(selectHolidayCalender);
  const workDayTemplate = useSelector(selectWorkDayTemplate);
  const [options, setOptions] = useState([]);
  const [noMyProfile, setNoMyProfile] = useState(false);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();
  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }
  const timezones = [
    { label: "(GMT-12:00) International Date Line West" },

    {
      label: "(GMT-11:00) Coordinated Universal Time-11",
    },
    {
      label: "(GMT-10:00) Hawaii",
    },
    {
      label: "(GMT-09:00) Alaska",
    },
    {
      label: "(GMT-08:00) Pacific Time (US & Canada)",
    },
    {
      label: "(GMT-07:00) Arizona",
    },
    {
      label: "(GMT-07:00) Mountain Time (US & Canada)",
    },
    {
      label: "(GMT-06:00) Central Time (US & Canada)",
    },
    {
      label: "(GMT-05:00) Eastern Time (US & Canada)",
    },
    {
      label: "(GMT-04:00) Atlantic Time (Canada)",
    },
    {
      label: "(GMT-03:30) Newfoundland",
    },
    {
      label: "(GMT-03:00) Brasilia",
    },
    {
      label: "(GMT-02:00) Coordinated Universal Time-02",
    },
    {
      label: "(GMT-01:00) Azores",
    },
    {
      label: "(GMT+00:00) London, Dublin, Edinburgh",
    },
    {
      label: "(GMT+01:00) Berlin, Vienna, Rome",
    },
    {
      label: "(GMT+02:00) Athens, Istanbul, Jerusalem",
    },
    {
      label: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
    },
    {
      label: "(GMT+03:30) Tehran",
    },
    {
      label: "(GMT+04:00) Dubai, Abu Dhabi, Muscat",
    },
    {
      label: "(GMT+04:30) Kabul",
    },
    {
      label: "(GMT+05:00) Islamabad, Karachi, Tashkent",
    },
    {
      label: "(GMT+05:30) Chennai, Kolkata, Mumbai",
    },
    {
      label: "(GMT+05:45) Kathmandu",
    },
    {
      label: "(GMT+06:00) Astana, Dhaka",
    },
    {
      label: "(GMT+06:30) Yangon (Rangoon)",
    },
    {
      label: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
    },
    {
      label: "(GMT+08:00) Beijing, Hong Kong, Kuala Lumpur",
    },
    {
      label: "(GMT+08:45) Eucla",
    },
    {
      label: "(GMT+09:00) Tokyo, Seoul, Osaka",
    },
    {
      label: "(GMT+09:30) Adelaide",
    },
    {
      label: "(GMT+10:00) Canberra, Sydney, Melbourne",
    },
    {
      label: "(GMT+10:00) Brisbane",
    },
    {
      label: "(GMT+10:00) Hobart",
    },
    {
      label: "(GMT+10:00) Vladivostok",
    },
    {
      label: "(GMT+10:00) Guam, Port Moresby",
    },
    {
      label: "(GMT+11:00) Magadan, Solomon Islands, New Caledonia",
    },
    {
      label: "(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands",
    },
    {
      label: "(GMT+12:00) Auckland, Wellington",
    },
    {
      label: "(GMT+13:00) Nuku'alofa",
    },
  ];

  useDeepCompareEffect(() => {
    function updateUserState() {
      const { userId } = routeParams;
      dispatch(getMyProfile(userId));
    }

    updateUserState();
    dispatch(getReportingTo()); //implement
    dispatch(getRole(getValues()));
    dispatch(getUserType());
    dispatch(getDateFormat());
    dispatch(getTeam(getValues()));
    dispatch(getHolidayCalender());
    dispatch(getWorkDayTemplate());
    dispatch(getCountry());
    dispatch(getSalesRegions());
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!myProfile) {
      return;
    }
    reset(myProfile);
  }, [myProfile, reset]);

  useEffect(() => {
    return () => {
      dispatch(resetMyProfile());
      setNoMyProfile(false);
    };
  }, [dispatch]);

  function handleSaveUser() {
    const { userId } = routeParams;
    dispatch(updateMyProfile(getValues())).then(() => {
      navigate("/apps/profile/myprofile");
    });
  }

  return (
    <>
      <div className="ml-10 mt-20">
        <h1 className="text-2xl font-bold">
          My Profile <HelpIcon fontSize="small" color="disabled" />
        </h1>
        <h1 className="text-md" style={{ color: "gray" }}>
          Manage Your Personal Profile
        </h1>
        <hr className="border-t-2 border-black-400 " />
      </div>
      <div className="relative flex flex-col flex-auto px-24 pt-20">
        <div className="text-md font-medium pt-20 flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            First Name*
          </div>
          <div className=" text-left ">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1, width: "40ch" }}
                  {...field}
                  className="mt-8 mb-16"
                  required
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  autoFocus
                  id="firstName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Last Name*
          </div>
          <div className=" text-left ">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ m: 1, width: "40ch" }}
                  {...field}
                  className="mt-8 mb-16"
                  required
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  id="lastName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Email Addreess*
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="emailAddress"
              render={({ field }) => (
                <TextField
                  sx={{ m: 1, width: "40ch" }}
                  {...field}
                  className="mt-8 mb-16"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.emailAddress}
                  helperText={errors?.emailAddress?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Phone (Mobile)*
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="phoneMobile"
              render={({ field }) => (
                <TextField
                  sx={{ m: 1, width: "40ch" }}
                  {...field}
                  className="mt-8 mb-16"
                  variant="outlined"
                  required
                  fullWidth
                  error={!!errors.phoneMobile}
                  helperText={errors?.phoneMobile?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Role*
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="roleId"
              defaultValue={0}
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="roleId"
                    options={role}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.roleName : "No title"
                    }
                    value={value ? _.find(role, { roleId: value }) : null}
                    isOptionEqualToValue={isOptionEqualToValue}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.roleId : null);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
                        required
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            User Type*
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={0}
              name="userTypeId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="userTypeId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={userType}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.userTypeName : " "
                    }
                    value={value ? _.find(userType, { userTypeId: value }) : 0}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.userTypeId : 0);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
                        required
                        placeholder="User Type"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Reporting To*
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={0}
              name="reportingToId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="reportingToId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={reportingTo}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.firstName : " "
                    }
                    value={
                      value ? _.find(reportingTo, { reportingToId: value }) : 0
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.reportingToId : 0);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
                        required
                        placeholder="Reporting To"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Date Of Birth*
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={""}
              name="dateOfBirth"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  clearable
                  renderInput={(_props) => (
                    <TextField
                      {..._props}
                      sx={{ m: 1, width: "40ch" }}
                      className="mt-8 mb-16"
                      id="dateOfBirth"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                      error={false}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KyrosSvgIcon size={20}>
                              heroicons-solid:cake
                            </KyrosSvgIcon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Designation*
          </div>
          <div className=" text-left ">
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  error={!!errors.designation}
                  helperText={errors?.designation?.message}
                  id="designation"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Old Team
          </div>
          <div className=" text-left ">
            <Controller
              name="oldTeam"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  error={!!errors.oldTeam}
                  helperText={errors?.oldTeam?.message}
                  id="oldTeam"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Department
          </div>
          <div className=" text-left ">
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  error={!!errors.department}
                  helperText={errors?.department?.message}
                  id="department"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Sales Region
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="salesRegionsId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="salesRegionsId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={salesRegions}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option
                        ? option.districtName + ", " + option.stateName
                        : "No region"
                    }
                    value={
                      value
                        ? _.find(salesRegions, { salesRegionId: value })
                        : null
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.salesRegionId : null);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Skills
          </div>
          <div className=" text-left ">
            <Controller
              name="skills"
              control={control}
              defaultValue={[]} // set the default value here
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  options={options || []}
                  getOptionLabel={(option) => option}
                  value={value || []} // set the value prop to the value property of the field object provided by the Controller
                  onChange={(event, newValue) => {
                    onChange(newValue);
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ m: 1, width: "40ch" }}
                      className="mt-8 mb-16"
                      placeholder="Select multiple skills"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Country
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="countryId"
              render={({ field: { onChange, value } }) => {
                const filteredCountries = salesRegions
                  .filter(
                    (country) =>
                      country.salesRegionId === getValues().salesRegionsId
                  )
                  .map((country) => country.country);
                return (
                  <Autocomplete
                    id="countryId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={filteredCountries}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.countryName : " "
                    }
                    value={
                      value
                        ? _.find(filteredCountries, { countryId: value })
                        : null
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.countryId : null);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Phone (Main)
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="phoneMain"
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phoneMain}
                  helperText={errors?.phoneMain?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Phone (Others)
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              name="phoneOthers"
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phoneOthers}
                  helperText={errors?.phoneOthers?.message}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Time Zone
          </div>
          <div className=" text-left ">
            <Controller
              name="timeZone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={timezones || []}
                  error={!!errors.timeZone}
                  helperText={errors?.timeZone?.message}
                  value={value || ""}
                  onChange={(event, newValue) => {
                    onChange(newValue.label);
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{ m: 1, width: "40ch" }}
                      className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Date Format
          </div>
          <div className=" text-left ">
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
                    options={dateFormat}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.dateFormatType : " "
                    }
                    value={
                      value ? _.find(dateFormat, { dateFormatId: value }) : null
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.dateFormatId : null);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Team
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={0}
              name="teamId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="teamId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={team}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option ? option.teamName : " "
                    }
                    value={value ? _.find(team, { teamId: value }) : 0}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.teamId : 0);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Holiday Calender
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={0}
              name="holidayId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="holidayId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={holidayCalender}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option
                        ? option.holidayName + " - " + option.holidayDate
                        : " "
                    }
                    value={
                      value
                        ? _.find(holidayCalender, { holidayCalendarId: value })
                        : 0
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.holidayCalendarId : 0);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Work Day Template
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={0}
              name="workDayId"
              render={({ field: { onChange, value } }) => {
                return (
                  <Autocomplete
                    id="workDayId"
                    isOptionEqualToValue={isOptionEqualToValue}
                    options={workDayTemplate}
                    disableCloseOnSelect
                    getOptionSelected={(option, value) =>
                      option.value === value.value
                    }
                    getOptionLabel={(option) =>
                      option
                        ? option.name + " - " + option.workingHours + "(hrs)"
                        : " "
                    }
                    value={
                      value ? _.find(workDayTemplate, { workDayId: value }) : 0
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.workDayId : 0);
                    }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ m: 1, width: "40ch" }}
                        className="mt-8 mb-16"
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
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20 pt-10 relative left-0">
            Is Employee
          </div>
          <div className=" text-left ">
            <Controller
              name="employee"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  color="primary"
                  label="Yes"
                  inputProps={{ "aria-label": "employee checkbox" }}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Employee Id
          </div>
          <div className=" text-left ">
            <Controller
              name="employeeId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  error={!!errors.employeeId}
                  helperText={errors?.employeeId?.message}
                  id="employeeId"
                  variant="outlined"
                  fullWidth
                  clearable
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Date of Joining
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={""}
              name="dateOfJoining"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  clearable
                  renderInput={(_props) => (
                    <TextField
                      {..._props}
                      sx={{ m: 1, width: "40ch" }}
                      className="mt-8 mb-16"
                      id="dateOfJoining"
                      clearable
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                      error={false}
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Date Of Resignation
          </div>
          <div className=" text-left ">
            <Controller
              control={control}
              defaultValue={""}
              name="dateOfResignation"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  clearable
                  renderInput={(_props) => (
                    <TextField
                      {..._props}
                      sx={{ m: 1, width: "40ch" }}
                      className="mt-8 mb-16"
                      id="dateOfResignation"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      fullWidth
                      error={false}
                    />
                  )}
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Location Name
          </div>
          <div className=" text-left ">
            <Controller
              name="locationName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  id="locationName"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Address
          </div>
          <div className=" text-left ">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  id="address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            City
          </div>
          <div className=" text-left ">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  id="city"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            State
          </div>
          <div className=" text-left ">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  id="state"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </div>
        <div className="text-md font-medium flex">
          <div className="min-w-[17%] text-left mx-20	pt-20 relative left-0">
            Zipcode*
          </div>
          <div className=" text-left ">
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ m: 1, width: "40ch" }}
                  className="mt-8 mb-16"
                  id="zipCode"
                  variant="outlined"
                  error={!!errors.zipCode}
                  required
                  helperText={errors?.zipCode?.message}
                  fullWidth
                />
              )}
            />
          </div>
        </div>
      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: "background" }}
      >
        <Button
          className="ml-8"
          variant="contained"
          color="secondary"
          onClick={handleSaveUser}
          style={{
            WebkitAppearance: "button",
            backgroundColor: "rgb(55, 48, 163)",
            backgroundImage: "none",
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default withReducer("profileApp", reducer)(ProfileForm);
