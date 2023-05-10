import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  
     
      {
        id: 'apps.profile',
        title: 'Profile',
        type: 'collapse',
        icon: 'heroicons-outline:user-group',
        translate: 'Profile',
        children: [
          {
            id: 'profile-myprofile',
            title: 'My Profile',
            type: 'item',
            url: 'apps/profile/myprofile',
            end: true,
          },
          {
            id: 'profile-mypassword',
            title: 'My Password',
            type: 'item',
            url: 'apps/profile/mypassword',
            end: true,
          },
          {
            id: 'profile-myemailsignature',
            title: 'My Email Signature',
            type: 'item',
            url: 'apps/profile/myemailsignature',
            end: true,
          },
          {
            id: 'profile-myleave',
            title: 'My Leave',
            type: 'item',
            url: 'apps/profile/myleave',
            end: true,
          },

          {
            id: 'profile-companyprofile',
            title: 'Company Profile',
            type: 'item',
            url: 'apps/profile/companyprofile',
            end: true,
          },

          {
            id: 'profile-myreportsubscription',
            title: 'My Report Subscription',
            type: 'item',
            url: 'apps/profile/myreportsubscription',
            end: true,
          },
          {
            id: 'profile-customlogo',
            title: 'Custom Logo',
            type: 'item',
            url: 'apps/profile/customlogo',
            end: true,
          },
          // {
          //   id: 'profile-useravailability',
          //   title: 'User Availability',
          //   type: 'item',
          //   url: 'apps/profile/useravailability',
          //   end: true,
          // },
         
        ],
      }, {
        id: 'apps.usermanagement',
        title: 'User Management',
        type: 'collapse',
        icon: 'heroicons-outline:user-group',
        translate: 'ECOMMERCE',
        children: [
          {
            id: 'usermanagement-users',
            title: 'Users',
            type: 'item',
            url: 'apps/usermanagement/users',
            end: true,
          },
          {
            id: 'usermanagement-new-user',
            title: 'New User',
            type: 'item',
            url: 'apps/usermanagement/users/new',
          },
          {
            id: 'usermanagement-salesgroups',
            title: 'Sales Groups',
            type: 'item',
            url: 'apps/usermanagement/salesgroups',
          },
        ],
      },
 ];

export default navigationConfig;
