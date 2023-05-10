import KyrosLoading from '@kyros/core/KyrosLoading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function KyrosSuspense(props) {
  return <Suspense fallback={<KyrosLoading {...props.loadingProps} />}>{props.children}</Suspense>;
}

KyrosSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

KyrosSuspense.defaultProps = {
  loadingProps: {
    delay: 0,
  },
};

export default KyrosSuspense;
