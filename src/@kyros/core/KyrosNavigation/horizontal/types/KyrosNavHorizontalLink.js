import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import withRouter from '@kyros/core/withRouter';
import KyrosNavBadge from '../../KyrosNavBadge';
import KyrosSvgIcon from '../../../KyrosSvgIcon';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none!important',
  minHeight: 48,
  '&.active': {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.contrastText}!important`,
    pointerEvents: 'none',
    '& .kyros-list-item-text-primary': {
      color: 'inherit',
    },
    '& .kyros-list-item-icon': {
      color: 'inherit',
    },
  },
  '& .kyros-list-item-icon': {},
  '& .kyros-list-item-text': {
    padding: '0 0 0 16px',
  },
}));

function KyrosNavHorizontalLink(props) {
  const { item } = props;

  return useMemo(
    () => (
      <StyledListItem
        button
        component="a"
        href={item.url}
        target={item.target ? item.target : '_blank'}
        className={clsx('kyros-list-item')}
        role="button"
        sx={item.sx}
        disabled={item.disabled}
      >
        {item.icon && (
          <KyrosSvgIcon
            className={clsx('kyros-list-item-icon shrink-0', item.iconClass)}
            color="action"
          >
            {item.icon}
          </KyrosSvgIcon>
        )}

        <ListItemText
          className="kyros-list-item-text"
          primary={item.title}
          classes={{ primary: 'text-13 kyros-list-item-text-primary truncate' }}
        />

        {item.badge && <KyrosNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />}
      </StyledListItem>
    ),
    [item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
  );
}

KyrosNavHorizontalLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
  }),
};

KyrosNavHorizontalLink.defaultProps = {};

const NavHorizontalLink = withRouter(memo(KyrosNavHorizontalLink));

export default NavHorizontalLink;
