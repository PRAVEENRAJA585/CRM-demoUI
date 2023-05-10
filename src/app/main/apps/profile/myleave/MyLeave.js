import React from 'react'
import MyLeaveView from './MyLeaveView'
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import MyLeaveHead from './MyLeaveHead';
import withReducer from 'app/store/withReducer';
import reducer from '../store';

function MyLeave() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
<KyrosPageCarded
 header={<MyLeaveHead />}
content={<MyLeaveView />}
scroll={isMobile ? 'normal' : 'content'}
/>
);
}

export default withReducer('profileApp', reducer)(MyLeave);