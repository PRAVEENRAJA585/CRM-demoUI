import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { InputAdornment, useAutocomplete } from '@mui/material';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { selectTimeZone } from '../../store/timeZoneSlice';
import { selectDateFormat } from '../../store/dateFormatSlice';
import { selectSalesRegions } from '../../store/salesRegionsSlice';
import { selectCountry } from '../../store/countrySlice';
import { selectFilteredCountries } from '../../store/countrySlice';
import { useSelector } from 'react-redux';

function PersonalDetailsTab(props) {
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { errors } = formState;
  const timeZone = useSelector(selectTimeZone);
  const dateFormat = useSelector(selectDateFormat);
  const salesRegions = useSelector(selectSalesRegions);
  const country = useSelector(selectCountry);
  const [options, setOptions] = useState([]);


  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");

  }

  const timezones = [
    { label: '(GMT-12:00) International Date Line West' },

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

  return (
    <div>
    
       <Controller
        control={control}
        defaultValue={''}
        name="dateOfBirth"
        render={({ field }) => (
          <DatePicker
            {...field}
            className="mt-5 mb-16 w-full"
            clearable
           
            renderInput={(_props) => (
              <TextField
                {..._props}
                className="mt-24"
                id="dateOfBirth"
                label="Date Of Birth"
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

      <Controller
        name="designation"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-24 mb-16"
            error={!!errors.designation}
            helperText={errors?.designation?.message}
            label="Designation"
            autoFocus
            id="designation"
            variant="outlined"
            fullWidth
          />
        )}
      />


      <Controller
        name="oldTeam"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.oldTeam}
            helperText={errors?.oldTeam?.message}
            label="Old Team"
            autoFocus
            id="oldTeam"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="department"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.department}
            helperText={errors?.department?.message}
            label="Department"
            autoFocus
            id="department"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="salesRegionsId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="salesRegionsId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-8 mb-16"
              options={salesRegions}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option ? option.districtName + ", " + option.stateName : 'No region'}
              value={value ? _.find(salesRegions, { salesRegionId: value }) : null}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.salesRegionId : null);
              }}
              fullWidth
              renderInput={(params) => <TextField
                {...params}
                label="Sales Region"
                placeholder="Sales Region"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              }
            />
          );
        }}
      />

      <Controller
        name="skills"
        control={control}
        defaultValue={[]} // set the default value here
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={options || []}
            getOptionLabel={(option) => option}
            value={value || []} // set the value prop to the value property of the field object provided by the Controller
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple skills"
                label="Skills"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="agentPhoneNumbers"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.agentPhoneNumbers}
            helperText={errors?.agentPhoneNumbers?.message}
            label="Agent Phone Numbers"
            autoFocus
            id="agentPhoneNumbers"
            placeholder="Agent Phone Numbers"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneMain"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Phone (Main)"
            placeholder="Phone (Main)"
            variant="outlined"
            fullWidth
            error={!!errors.phoneMain}
            helperText={errors?.phoneMain?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="phoneOthers"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Phone (Others)"
            placeholder="Phone (Others)"
            variant="outlined"
            fullWidth
            error={!!errors.phoneOthers}
            helperText={errors?.phoneOthers?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
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
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Time Zone"
                label="Time Zone"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
      <Controller
        control={control}
        name="dateFormatId"
        render={({ field: { onChange, value } }) => {
          const options = dateFormat.map((option) => ({
            value: option.dateFormatId,
            label: option.dateFormatType || '',
          }));
          return (
            <Autocomplete
              id="dateFormatId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-8 mb-16"
              options={dateFormat}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option ? option.dateFormatType : ' '}
              value={value ? _.find(dateFormat, { dateFormatId: value }) : null}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.dateFormatId : null);
              }}
              fullWidth
              renderInput={(params) => <TextField
                {...params}
                label="Date Format"
                placeholder="Date Format"
                InputLabelProps={{
                  shrink: true,
                }}

              />
              }
            />
          );
        }}
      />

    </div>
  );
}

export default PersonalDetailsTab;
