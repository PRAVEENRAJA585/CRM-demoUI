import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import KyrosNavVerticalTab from './types/KyrosNavVerticalTab';

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
  '& .kyros-list-item-text-primary': {
    lineHeight: '1',
  },
  '&.active-square-list': {
    '& .kyros-list-item, & .active.kyros-list-item': {
      width: '100%',
      borderRadius: '0',
    },
  },
  '&.dense': {},
}));

function KyrosNavVerticalLayout2(props) {
  const { navigation, layout, active, dense, className, onItemClick, firstLevel, selectedId } =
    props;
  const theme = useTheme();

  function handleItemClick(item) {
    onItemClick?.(item);
  }

  return (
    <StyledList
      className={clsx(
        'navigation whitespace-nowrap items-center flex flex-col',
        `active-${active}-list`,
        dense && 'dense',
        className
      )}
    >
      {navigation.map((_item) => (
        <KyrosNavVerticalTab
          key={_item.id}
          type={`vertical-${_item.type}`}
          item={_item}
          nestedLevel={0}
          onItemClick={handleItemClick}
          firstLevel={firstLevel}
          dense={dense}
          selectedId={selectedId}
        />
      ))}
    </StyledList>
  );
}

export default KyrosNavVerticalLayout2;
