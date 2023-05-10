import React from 'react';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import reducer from '../store';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';

function Users() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
   return (
    <KyrosPageCarded
      header={<UsersHeader />}
      content={<UsersTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('userManagementApp', reducer)(Users);
