import NavLinkAdapter from '@kyros/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import KyrosNavBadge from '../../KyrosNavBadge';
import KyrosSvgIcon from '../../../KyrosSvgIcon';

const Root = styled(ListItem)(({ theme, ...props }) => ({
  minHeight: 44,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 16,
  paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
  paddingTop: 10,
  paddingBottom: 10,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .kyros-list-item-text-primary': {
      color: 'inherit',
    },
    '& > .kyros-list-item-icon': {
      color: 'inherit',
    },
  },
  '& >.kyros-list-item-icon': {
    marginRight: 16,
    color: 'inherit',
  },
  '& > .kyros-list-item-text': {},
}));

function KyrosNavVerticalItem(props) {
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  return useMemo(
    () => (
      <Root
        button
        component={NavLinkAdapter}
        to={item.url || ''}
        activeClassName={item.url ? 'active' : ''}
        className={clsx('kyros-list-item', item.active && 'active')}
        onClick={() => onItemClick && onItemClick(item)}
        end={item.end}
        itempadding={itempadding}
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
          secondary={item.subtitle}
          classes={{
            primary: 'text-13 font-medium kyros-list-item-text-primary truncate',
            secondary: 'text-11 font-medium kyros-list-item-text-secondary leading-normal truncate',
          }}
        />
        {item.badge && <KyrosNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick]
  );
}

KyrosNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

KyrosNavVerticalItem.defaultProps = {};

const NavVerticalItem = KyrosNavVerticalItem;

export default NavVerticalItem;
