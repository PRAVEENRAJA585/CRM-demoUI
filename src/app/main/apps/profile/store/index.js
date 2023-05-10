import reportingTo from './reportingToSlice';
import role from './roleSlice';
import myProfile from './myProfileSlice';
// import myProfiles from './myProfilesSlice';
import userType from './userTypeSlice';
import dateFormat from './dateFormatSlice';
import team from '../../usermanagement/store/teamSlice';
import holidayCalender from '../../usermanagement/store/holidayCalenderSlice';
import workDayTemplate from '../../usermanagement/store/workDayTemplateSlice';
import country from './countrySlice';
import salesRegions from './salesRegionsSlice';
import myPassword from './myPasswordSlice';
import myEmailSignature from './myEmailSignatureSlice';
import myLeave from './myLeaveSlice';
import countries from "./countriesSlice";
import myLeaves from './myLeavesSlice';
import customLogo from './customLogoSlice';
import phoneNoFormate from './phoneNoFormateSlice';
import defaultCountryCode from './defaultCountryCodeSlice';
import { combineReducers } from '@reduxjs/toolkit';
import companyProfile from './companyProfileSlice';

const reducer = combineReducers({
  myProfile,
  reportingTo,
  role, 
  userType,
  dateFormat,
  team,
  holidayCalender,
  workDayTemplate,
  country,
  salesRegions,
  myPassword,
  myEmailSignature,
  myLeave,
  myLeaves,
  countries, 
  customLogo,
  phoneNoFormate,
  defaultCountryCode,
  companyProfile

});

export default reducer;
