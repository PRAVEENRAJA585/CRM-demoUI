import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { memo } from 'react';
import _ from '@lodash';
import GlobalStyles from '@mui/material/GlobalStyles';
import KyrosNavHorizontalLayout1 from './horizontal/KyrosNavHorizontalLayout1';
import KyrosNavVerticalLayout1 from './vertical/KyrosNavVerticalLayout1';
import KyrosNavVerticalLayout2 from './vertical/KyrosNavVerticalLayout2';
import KyrosNavHorizontalCollapse from './horizontal/types/KyrosNavHorizontalCollapse';
import KyrosNavHorizontalGroup from './horizontal/types/KyrosNavHorizontalGroup';
import KyrosNavHorizontalItem from './horizontal/types/KyrosNavHorizontalItem';
import KyrosNavHorizontalLink from './horizontal/types/KyrosNavHorizontalLink';
import KyrosNavVerticalCollapse from './vertical/types/KyrosNavVerticalCollapse';
import KyrosNavVerticalGroup from './vertical/types/KyrosNavVerticalGroup';
import KyrosNavVerticalItem from './vertical/types/KyrosNavVerticalItem';
import KyrosNavVerticalLink from './vertical/types/KyrosNavVerticalLink';
import { registerComponent } from './KyrosNavItem';

const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '.popper-navigation-list': {
        '& .kyros-list-item': {
          padding: '8px 12px 8px 12px',
          height: 40,
          minHeight: 40,
          '& .kyros-list-item-text': {
            padding: '0 0 0 8px',
          },
        },
        '&.dense': {
          '& .kyros-list-item': {
            minHeight: 32,
            height: 32,
            '& .kyros-list-item-text': {
              padding: '0 0 0 8px',
            },
          },
        },
      },
    })}
  />
);

/*
Register Kyros Navigation Components
 */
registerComponent('vertical-group', KyrosNavVerticalGroup);
registerComponent('vertical-collapse', KyrosNavVerticalCollapse);
registerComponent('vertical-item', KyrosNavVerticalItem);
registerComponent('vertical-link', KyrosNavVerticalLink);
registerComponent('horizontal-group', KyrosNavHorizontalGroup);
registerComponent('horizontal-collapse', KyrosNavHorizontalCollapse);
registerComponent('horizontal-item', KyrosNavHorizontalItem);
registerComponent('horizontal-link', KyrosNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

function KyrosNavigation(props) {
  const options = _.pick(props, [
    'navigation',
    'layout',
    'active',
    'dense',
    'className',
    'onItemClick',
    'firstLevel',
    'selectedId',
  ]);
  if (props.navigation.length > 0) {
    return (
      <>
        {inputGlobalStyles}
        {props.layout === 'horizontal' && <KyrosNavHorizontalLayout1 {...options} />}
        {props.layout === 'vertical' && <KyrosNavVerticalLayout1 {...options} />}
        {props.layout === 'vertical-2' && <KyrosNavVerticalLayout2 {...options} />}
      </>
    );
  }
  return null;
}

KyrosNavigation.propTypes = {
  navigation: PropTypes.array.isRequired,
};

KyrosNavigation.defaultProps = {
  layout: 'vertical',
};

export default memo(KyrosNavigation);
