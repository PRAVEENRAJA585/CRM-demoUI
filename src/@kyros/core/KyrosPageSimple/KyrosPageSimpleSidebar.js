import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import KyrosPageSimpleSidebarContent from './KyrosPageSimpleSidebarContent';

const KyrosPageSimpleSidebar = forwardRef((props, ref) => {
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
            root: clsx('KyrosPageSimple-sidebarWrapper', variant),
            paper: clsx(
              'KyrosPageSimple-sidebar',
              variant,
              position === 'left' ? 'KyrosPageSimple-leftSidebar' : 'KyrosPageSimple-rightSidebar'
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: 'KyrosPageSimple-backdrop',
            },
          }}
          style={{ position: 'absolute' }}
        >
          <KyrosPageSimpleSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === 'permanent' && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              'KyrosPageSimple-sidebarWrapper',
              variant,
              isOpen ? 'opened' : 'closed',
              position === 'left' ? 'KyrosPageSimple-leftSidebar' : 'KyrosPageSimple-rightSidebar'
            )}
            open={isOpen}
            onClose={props?.onClose}
            classes={{
              paper: clsx('KyrosPageSimple-sidebar border-0', variant),
            }}
          >
            <KyrosPageSimpleSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});

KyrosPageSimpleSidebar.defaultProps = {
  open: true,
};

export default KyrosPageSimpleSidebar;
