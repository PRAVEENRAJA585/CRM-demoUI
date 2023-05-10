import { lazy } from 'react';
import Password from './mypassword/Password';
import MyEmailSignature from './myemailsignature/MyEmailSignature';
import MyLeave from './myleave/MyLeave';
import HtmlEditor from './myemailsignature/HtmlEditor';
import UserAvailability from './useravailability/userAvailability';
import CustomLogo from './customlogo/CustomLogo';
import MyReportSubscription from './myreportsubscription/MyReportSubscription';
import CompanyProfile from './companyprofile/CompanyProfile';
import CustomLogoHead from './customlogo/CustomLogoHead';

const ProfileForm = lazy(() => import('./myprofile/ProfileForm'));
const Profile = lazy(() => import ('./profile'))

const ProfileAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/profile/myprofile/',
      element: <Profile />,
    },
    {
      path: 'apps/profile/myprofile/:userId/edit',   
      element:<ProfileForm />,
    },
    {
      path: 'apps/profile/mypassword',   
      element:<Password />,
    },   
       {
        path: 'apps/profile/myemailsignature',
        element:<MyEmailSignature />,

       },
       {
        path: 'apps/profile/myemailsignature/:emailSignId/edit',
        element:<HtmlEditor/>,

       },
       {
        path: 'apps/profile/myleave',
        element:<MyLeave />

       },
      //  {
      //   path: 'apps/profile/useravailability',
      //   element:<UserAvailability />

      //  },

       {
        path: 'apps/profile/companyProfile',
        element:<CompanyProfile />

       },
       {
        path: 'apps/profile/customlogo',
        element:<CustomLogoHead />

       },

       {
        path: 'apps/profile/myreportsubscription',
        element:<MyReportSubscription />

       },
       {
        path: 'apps/profile/customlogo',
        element:<CustomLogoHead />

       },


       
       
       
       
  ],
};

export default ProfileAppConfig;
