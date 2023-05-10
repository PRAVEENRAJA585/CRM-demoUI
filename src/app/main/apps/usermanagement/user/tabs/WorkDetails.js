import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  useAutocomplete,
} from "@mui/material";
import _ from "@lodash";
import { useSelector } from "react-redux";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { selectTeam } from "../../store/teamSlice";
import { selectHolidayCalender } from "../../store/holidayCalenderSlice";
import { selectWorkDayTemplate } from "../../store/workDayTemplateSlice";

function WorkDetails(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const team = useSelector(selectTeam);
  const workDayTemplate = useSelector(selectWorkDayTemplate);
  const holidayCalender = useSelector(selectHolidayCalender);

  const isOptionEqualToValue = (option, value) => option.value === value;
  let dirty = false;


  return (
    <div>
      <Controller
        control={control}
        defaultValue={0}
        name="teamId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="teamId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-5 mb-20"
              options={team}
              disableCloseOnSelect
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={(option) => (option ? option.teamName : " ")}
              value={value ? _.find(team, { teamId: value }) : 0}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.teamId : 0);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Team"
                  placeholder="Team"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />
      <Controller
        control={control}
        defaultValue={0}
        name="holidayId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="holidayId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-5 mb-20"
              options={holidayCalender}
              disableCloseOnSelect
              getOptionSelected={(option, value) =>
                option.value === value.value
              }
              getOptionLabel={(option) =>
                option ? option.holidayName + " - " + option.holidayDate : " "
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
                  label="Holiday Calender"
                  placeholder="Holiday Calender"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />
      <Controller
        control={control}
        defaultValue={0}
        name="workDayId"
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              id="workDayId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-5 mb-20"
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
              value={value ? _.find(workDayTemplate, { workDayId: value }) : 0}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.workDayId : 0);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Work Day Template"
                  placeholder="Work Day Template"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          );
        }}
      />
      Is Employee
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
      <Controller
        name="employeeId"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.employeeId}
            helperText={errors?.employeeId?.message}
            label="Employee Id"
            autoFocus
            id="employeeId"
            variant="outlined"
            fullWidth
            clearable

          />
        )}
      />
      <Controller
        control={control}
        defaultValue={''}
        name="dateOfJoining"
        render={({ field }) => (
          <DatePicker
            {...field}
            className="mt-5 mb-16 w-full"
            clearable
            renderInput={(_props) => (
              <TextField
                {..._props}
                className="mt-5"
                id="dateOfJoining"
                label="Date of Joining"
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
      <Controller
        control={control}
        defaultValue={''}
        name="dateOfResignation"
        render={({ field }) => (
          <DatePicker
            {...field}
            className="mt-5 mb-16 w-full"
            clearable
           
            renderInput={(_props) => (
              <TextField
                {..._props}
                className="mt-24"
                id="dateOfResignation"
                label="Date Of Resignation"
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
  );
}

export default WorkDetails;
