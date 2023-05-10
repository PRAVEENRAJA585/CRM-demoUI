import KyrosUtils from '@kyros/utils';
import KyrosLoading from '@kyros/core/KyrosLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import userInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
// import SignInConfig from '../main/sign-in/SignInConfig';
// import SignUpConfig from '../main/sign-up/SignUpConfig';
// import SignOutConfig from '../main/sign-out/SignOutConfig';
// import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import appsConfigs from '../main/apps/appsConfigs';
// import pagesConfigs from '../main/pages/pagesConfigs';
// import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
// import DocumentationConfig from '../main/documentation/DocumentationConfig';

const routeConfigs = [
  ...appsConfigs,
  // ...dashboardsConfigs,
  // ...pagesConfigs,
  // ...authRoleExamplesConfigs,
  // ...userInterfaceConfigs,
  // DocumentationConfig,
  // SignOutConfig,
  // SignInConfig,
  // SignUpConfig,
];

const routes = [
  ...KyrosUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <KyrosLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
