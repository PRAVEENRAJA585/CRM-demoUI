import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
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
  '&.active': {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.contrastText}!important`,
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .kyros-list-item-text-primary': {
      color: 'inherit',
    },
    '& > .kyros-list-item-icon': {
      color: 'inherit',
    },
  },
  '& > .kyros-list-item-icon': {
    marginRight: 16,
  },
  '& > .kyros-list-item-text': {},
  color: theme.palette.text.primary,
  textDecoration: 'none!important',
}));

function KyrosNavVerticalLink(props) {
  const dispatch = useDispatch();
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  return useMemo(
    () => (
      <Root
        button
        component="a"
        href={item.url}
        target={item.target ? item.target : '_blank'}
        className="kyros-list-item"
        onClick={() => onItemClick && onItemClick(item)}
        role="button"
        itempadding={itempadding}
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

KyrosNavVerticalLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
  }),
};
KyrosNavVerticalLink.defaultProps = {};

const NavVerticalLink = KyrosNavVerticalLink;

export default NavVerticalLink;
