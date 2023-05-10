import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { selectReportingTo } from '../../store/reportingToSlice'; // implement
import { selectRole } from '../../store/roleSlice';
import { selectUserType } from '../../store/userTypeSlice'
import { InputAdornment, useAutocomplete } from '@mui/material';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import _ from '@lodash';
import { useSelector } from 'react-redux';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const reportingTo = useSelector(selectReportingTo);
  const role = useSelector(selectRole);
  const userType = useSelector(selectUserType);

  const { errors } = formState;

  let dirty = false;
  const { multiple, value, onChange, ...autocompleteProps } = useAutocomplete({
    ...props,
  });

  dirty = dirty || (multiple ? value.length > 0 : value !== null);

  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }

  return (
    <div>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.firstName} 
            required
            helperText={errors?.firstName?.message}
            placeholder="First Name"
            label="First Name"
            autoFocus
            id="firstName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.lastName}
            required
            helperText={errors?.lastName?.message}
            label="Last Name"
            id="lastName"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Email Address"
            required
            placeholder="Email Address"
            variant="outlined"
            fullWidth
            error={!!errors.emailAddress}
            helperText={errors?.emailAddress?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KyrosSvgIcon size={20}>heroicons-solid:mail</KyrosSvgIcon>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="phoneMobile"
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Phone(Mobile)"
            placeholder="Phone(Mobile)"
            variant="outlined"
            fullWidth
            required
            error={!!errors.phoneMobile}
            helperText={errors?.phoneMobile?.message}
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
        name="roleId"
        defaultValue={0}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="roleId"
              className="mt-8 mb-24"
              options={role}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option ? option.roleName : 'No title'}
              value={value ? _.find(role, { roleId: value }) : null}
              isOptionEqualToValue={isOptionEqualToValue}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.roleId : null);
              }}
              fullWidth
              renderInput={(params) => <TextField
                {...params}
                label="Role"
                required
                placeholder="Role"
                InputLabelProps={{
                  shrink: true,
                }}
              />} />
          );
        }}
      />

      <Controller
        control={control}
        defaultValue={0}
        name="userTypeId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="userTypeId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-8 mb-24"
              options={userType}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option ? option.userTypeName : " "}
              value={value ? _.find(userType, { userTypeId: value }) : 0}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.userTypeId : 0);
              }}
              fullWidth
              renderInput={(params) => <TextField
                {...params}
                label="User Type"
                required
                placeholder="User Type"
                InputLabelProps={{
                  shrink: true,
                }}
              />} />
          );
        }}
      />

      <Controller
        control={control}
        defaultValue={0}
        name="reportingToId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="reportingToId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-8 mb-16"
              options={reportingTo}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option ? option.firstName : ' '}
              value={value ? _.find(reportingTo, { reportingToId: value }) : 0}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.reportingToId : 0);
              }}
              fullWidth
              renderInput={(params) => <TextField
                {...params}
                label="Reporting To"
                required
                placeholder="Reporting To"
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

export default BasicInfoTab;
