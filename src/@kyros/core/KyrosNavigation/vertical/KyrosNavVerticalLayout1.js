import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import KyrosNavItem from '../KyrosNavItem';

const StyledList = styled(List)(({ theme }) => ({
  '& .kyros-list-item': {
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)',
    },
    '&:focus:not(.active)': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)',
    },
  },
  '& .kyros-list-item-text': {
    margin: 0,
  },
  '& .kyros-list-item-text-primary': {
    lineHeight: '20px',
  },
  '&.active-square-list': {
    '& .kyros-list-item, & .active.kyros-list-item': {
      width: '100%',
      borderRadius: '0',
    },
  },
  '&.dense': {
    '& .kyros-list-item': {
      paddingTop: 0,
      paddingBottom: 0,
      height: 32,
    },
  },
}));

function KyrosNavVerticalLayout1(props) {
  const { navigation, layout, active, dense, className, onItemClick } = props;
  const dispatch = useDispatch();

  function handleItemClick(item) {
    onItemClick?.(item);
  }

  return (
    <StyledList
      className={clsx(
        'navigation whitespace-nowrap px-12 py-0',
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {navigation.map((_item) => (
        <KyrosNavItem
          key={_item.id}
          type={`vertical-${_item.type}`}
          item={_item}
          nestedLevel={0}
          onItemClick={handleItemClick}
        />
      ))}
    </StyledList>
  );
}

export default KyrosNavVerticalLayout1;
