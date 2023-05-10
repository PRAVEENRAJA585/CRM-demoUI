import React from "react";
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import countryList from "country-list";
import { Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectSalesRegions } from "../../store/salesRegionsSlice";
function LocationDetails(props) {
  const methods = useFormContext();
  const { control, formState, getValues } = methods;
  const { errors } = formState;
  const salesRegions = useSelector(selectSalesRegions);
  
  function isOptionEqualToValue(option, value) {
    return option === value || (option === "" && value === "");
  }
  return (
    <div>
      <Controller
        name="locationName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-16 mb-16"
            label="Location Name"
            id="locationName"
            variant="outlined"
            placeholder="Location Name"
            fullWidth
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Address"
            id="address"
            variant="outlined"
            placeholder="Address"
            fullWidth
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="City"
            id="city"
            variant="outlined"
            placeholder="City"
            fullWidth
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="State"
            id="state"
            variant="outlined"
            placeholder="State"
            fullWidth
          />
        )}
      />

<Controller
        control={control}
        name="countryId"
        render={({ field: { onChange, value } }) => {
          const filteredCountries = salesRegions.filter(
            (country) => country.salesRegionId === getValues().salesRegionsId
          ).map((country) => country.country)
          return (
            <Autocomplete
              id="countryId"
              isOptionEqualToValue={isOptionEqualToValue}
              className="mt-8 mb-16"
              options={filteredCountries}
              disableCloseOnSelect
              getOptionSelected={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option ? option.countryName : ' '}
              value={value ? _.find(filteredCountries, { countryId: value }) : null}
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.countryId : null);
              }}
              fullWidth
              renderInput={(params) => <TextField
                {...params}
                label="Country"
                placeholder="Country"
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
        name="zipCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Zipcode"
            autoFocus
            placeholder='Zipcode'
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
  );
}

export default LocationDetails;
