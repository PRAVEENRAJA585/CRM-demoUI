import React from 'react';
import SignaturePage from './SignaturePage'
import KyrosPageCarded from '@kyros/core/KyrosPageCarded/KyrosPageCarded';
import { useThemeMediaQuery } from '@kyros/hooks';
import reducer from '../store';
import withReducer from 'app/store/withReducer';

function MyEmailSignature() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    <>
      <KyrosPageCarded
        content={
          <SignaturePage />
        }
        scroll={isMobile ? 'normal' : 'content'}
      />

    </>
  )
}

export default withReducer('profileApp', reducer)(MyEmailSignature);