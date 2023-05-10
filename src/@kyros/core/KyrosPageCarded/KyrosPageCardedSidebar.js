import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import KyrosPageCardedSidebarContent from './KyrosPageCardedSidebarContent';

const KyrosPageCardedSidebar = forwardRef((props, ref) => {
  const { open, position, variant, rootRef } = props;

  const [isOpen, setIsOpen] = useState(open);

  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));

  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);

  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);

  return (
    <>
      <Hidden lgUp={variant === 'permanent'}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={(ev) => {}}
          onClose={() => props?.onClose()}
          disableSwipeToOpen
          classes={{
            root: clsx('KyrosPageCarded-sidebarWrapper', variant),
            paper: clsx(
              'KyrosPageCarded-sidebar',
              variant,
              position === 'left' ? 'KyrosPageCarded-leftSidebar' : 'KyrosPageCarded-rightSidebar'
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'KyrosPageCarded-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <KyrosPageCardedSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>
      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'KyrosPageCarded-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'KyrosPageCarded-leftSidebar' : 'KyrosPageCarded-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('KyrosPageCarded-sidebar', variant),
            }}
          >
            <KyrosPageCardedSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

KyrosPageCardedSidebar.defaultProps = {
  open: true,
};

export default KyrosPageCardedSidebar;
