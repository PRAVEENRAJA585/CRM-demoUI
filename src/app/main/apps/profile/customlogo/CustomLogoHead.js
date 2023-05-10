import React from 'react'
import { useThemeMediaQuery } from '@kyros/hooks';
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import CustomLogo from './CustomLogo';

function CustomLogoHead() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
<KyrosPageCarded
content={<CustomLogo />}
scroll={isMobile ? 'normal' : 'content'}
/>
);
}

export default withReducer('profileApp', reducer)(CustomLogoHead);