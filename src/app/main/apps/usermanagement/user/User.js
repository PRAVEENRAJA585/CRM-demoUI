import React, { useEffect, useState } from 'react';
import KyrosLoading from '@kyros/core/KyrosLoading';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import { useDeepCompareEffect } from '@kyros/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import { getUser, newUser, resetUser, selectUser } from '../store/userSlice';
import { getReportingTo } from '../store/reportingToSlice';
import { getUserType } from '../store/userTypeSlice';
import { getRole } from '../store/roleSlice';
import { getTimeZone } from '../store/timeZoneSlice';
import { getDateFormat } from '../store/dateFormatSlice';
import { getTeam } from '../store/teamSlice';
import { getHolidayCalender } from '../store/holidayCalenderSlice';
import { getWorkDayTemplate } from '../store/workDayTemplateSlice';
import { getCountry } from '../store/countrySlice';
import { getSalesRegions } from '../store/salesRegionsSlice';
import reducer from '../store';
import UserHeader from './UserHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import PersonalDetailsTab from './tabs/PersonalDetailsTab';
import WorkDetails from './tabs/WorkDetails';
import LocationDetails from './tabs/LocationDetails';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup
    .string('Please enter your first name')
    .required('You must enter a first name'),
  lastName: yup
    .string('Please enter your last name')
    .required('You must enter a last name'),

  emailAddress: yup
    .string()
    .email('You must enter a valid email')
    .notOneOf(['john@example.com'], 'This email address is already in use. Please try another email address.')
    .required('You must enter a email'),

  phoneMobile: yup.string()
    .matches(/[0-9]/, "only numbers are allowed")
    .min(8, "Phone number should be alteast 8 digits")
    .required("Phone Number is Required"),

  phoneMain: yup.string()
    .matches(/[0-9]/, "only numbers are allowed")
    .min(8, "Phone number should be alteast 8 digits")
    .required("Phone Number is Required"),

  phoneOthers: yup.string()
    .matches(/[0-9]/, "only numbers are allowed")
    .min(8, "Phone number should be alteast 8 digits")
    .required("Phone Number is Required"),

  roleId: yup.string()
    .required("Role is Required"),

  userTypeId: yup.string()
    .required("User Type is Required"),

  reportingToId: yup.string()
    .required("Reporting to is Required"),
  
    agentPhoneNumbers: yup.string()
    .matches(/[0-9]/, "only numbers are allowed")
    .min(8, "Phone number should be alteast 8 digits")
    .required("Phone Number is Required"),

  zipCode: yup.string()
    .matches(/[0-9]/, "only numbers are allowed")
    .min(6, "Zipcode Number should be  6 digits")
    .max(6, "Zipcode Number should be  6 digits")
    .required("Phone Number is Required"),

});

function User(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();

  const [tabValue, setTabValue] = useState(0);
  const [noUser, setNoUser] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, getValues } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateUserState() {
      const { userId } = routeParams;
      if (userId === 'new') {
        /**
         * Create New User data
         */
        dispatch(newUser());
      } else {
        /**
         * Get User data
         */
        dispatch(getUser(userId)).then((action) => {
          /**
           * If the requested user is not exist show message
           */
          if (!action.payload) {
            setNoUser(true);
          }
        });
      }
    }

    updateUserState();
    dispatch(getReportingTo());//implement
    dispatch(getRole(getValues()));
    dispatch(getUserType());
    dispatch(getTimeZone());
    dispatch(getDateFormat());
    dispatch(getTeam());
    dispatch(getHolidayCalender());
    dispatch(getWorkDayTemplate());
    dispatch(getCountry());
    dispatch(getSalesRegions());

  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!user) {
      return;
    }
    /**
     * Reset the form on user state changes
     */
    reset(user);
  }, [user, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset User on component unload
       */
      dispatch(resetUser());
      setNoUser(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested users is not exists
   */
  if (noUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such user!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/usermanagement/users"
          color="inherit"
        >
          Go to Users Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while user data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (user && routeParams.userId !== user.id && routeParams.userId !== 'new')
  // ) {
  //   return <KyrosLoading />;
  // }

  return (
    <FormProvider {...methods}>
      <KyrosPageCarded
        header={<UserHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Personal Details" />
              <Tab className="h-64" label="Work Details" />
              <Tab className="h-64" label="Location Details" />
              <Tab className="h-64" label="Manage Permissions" />
              <Tab className="h-64" label="Other Details" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? 'hidden' : ''}>
                <PersonalDetailsTab />
              </div>

              <div className={tabValue !== 2 ? 'hidden' : ''}>
                <WorkDetails />
              </div>
              <div className={tabValue !== 3 ? 'hidden' : ''}>
                <LocationDetails />
              </div>

            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('userManagementApp', reducer)(User);
