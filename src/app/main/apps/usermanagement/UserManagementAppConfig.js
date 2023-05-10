import { lazy } from 'react';
import { Navigate } from 'react-router-dom';


const User = lazy(() => import('./user/User'));
const Users = lazy(() => import('./users/Users'));
const SalesGroups = lazy(() => import('./salesGroups/SalesGroups'));

const UserManagementAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/usermanagement/users',
      element: <Users />,
    },
    {
      path: 'apps/usermanagement/users/:userId/*',   
      element:<User />,
    },
    
    {
      path: 'apps/usermanagement/salesgroups',   
      element:<SalesGroups />,
    },
    
   
    {
      path: 'apps/usermanagement',
      element: <Navigate to="users" />,
    },
  ],
};

export default UserManagementAppConfig;
