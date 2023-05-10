import KyrosScrollbars from '@kyros/core/KyrosScrollbars';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx';
import { memo, useState } from 'react';
import KyrosSvgIcon from '../KyrosSvgIcon';

const Root = styled('div')(({ theme }) => ({
  '& .KyrosSidePanel-paper': {
    display: 'flex',
    width: 56,
    transition: theme.transitions.create(['transform', 'width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    paddingBottom: 64,
    height: '100%',
    maxHeight: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    '&.left': {
      '& .KyrosSidePanel-buttonWrapper': {
        left: 0,
        right: 'auto',
      },
      '& .KyrosSidePanel-buttonIcon': {
        transform: 'rotate(0deg)',
      },
    },
    '&.right': {
      '& .KyrosSidePanel-buttonWrapper': {
        right: 0,
        left: 'auto',
      },
      '& .KyrosSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)',
      },
    },
    '&.closed': {
      [theme.breakpoints.up('lg')]: {
        width: 0,
      },
      '&.left': {
        '& .KyrosSidePanel-buttonWrapper': {
          justifyContent: 'start',
        },
        '& .KyrosSidePanel-button': {
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          paddingLeft: 4,
        },
        '& .KyrosSidePanel-buttonIcon': {
          transform: 'rotate(-180deg)',
        },
      },
      '&.right': {
        '& .KyrosSidePanel-buttonWrapper': {
          justifyContent: 'flex-end',
        },
        '& .KyrosSidePanel-button': {
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          paddingRight: 4,
        },
        '& .KyrosSidePanel-buttonIcon': {
          transform: 'rotate(0deg)',
        },
      },
      '& .KyrosSidePanel-buttonWrapper': {
        width: 'auto',
      },
      '& .KyrosSidePanel-button': {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 38,
        transition: theme.transitions.create(
          ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
          {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }
        ),
        width: 24,
        '&:hover': {
          width: 52,
          paddingLeft: 8,
          paddingRight: 8,
        },
      },
      '& .KyrosSidePanel-content': {
        opacity: 0,
      },
    },
  },

  '& .KyrosSidePanel-content': {
    overflow: 'hidden',
    opacity: 1,
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },

  '& .KyrosSidePanel-buttonWrapper': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    width: '100%',
    minWidth: 56,
  },

  '& .KyrosSidePanel-button': {
    padding: 8,
    width: 40,
    height: 40,
  },

  '& .KyrosSidePanel-buttonIcon': {
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.short,
    }),
  },

  '& .KyrosSidePanel-mobileButton': {
    height: 40,
    position: 'absolute',
    zIndex: 99,
    bottom: 12,
    width: 24,
    borderRadius: 38,
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(
      ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
      {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }
    ),
    '&:hover': {
      width: 52,
      paddingLeft: 8,
      paddingRight: 8,
    },
    '&.left': {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 4,
      left: 0,
    },

    '&.right': {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      paddingRight: 4,
      right: 0,
      '& .KyrosSidePanel-buttonIcon': {
        transform: 'rotate(-180deg)',
      },
    },
  },
}));

function KyrosSidePanel(props) {
  const [opened, setOpened] = useState(props.opened);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleOpened() {
    setOpened(!opened);
  }

  function toggleMobileDrawer() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <Root>
      <Hidden lgDown>
        <Paper
          className={clsx(
            'KyrosSidePanel-paper',
            props.className,
            opened ? 'opened' : 'closed',
            props.position,
            'shadow-lg'
          )}
          square
        >
          <KyrosScrollbars className={clsx('content', 'KyrosSidePanel-content')}>
            {props.children}
          </KyrosScrollbars>

          <div className="KyrosSidePanel-buttonWrapper">
            <Tooltip
              title="Toggle side panel"
              placement={props.position === 'left' ? 'right' : 'right'}
            >
              <IconButton
                className="KyrosSidePanel-button"
                onClick={toggleOpened}
                disableRipple
                size="large"
              >
                <KyrosSvgIcon className="KyrosSidePanel-buttonIcon">
                  heroicons-outline:chevron-left
                </KyrosSvgIcon>
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </Hidden>
      <Hidden lgUp>
        <SwipeableDrawer
          classes={{
            paper: clsx('KyrosSidePanel-paper', props.className),
          }}
          anchor={props.position}
          open={mobileOpen}
          onOpen={(ev) => {}}
          onClose={toggleMobileDrawer}
          disableSwipeToOpen
        >
          <KyrosScrollbars className={clsx('content', 'KyrosSidePanel-content')}>
            {props.children}
          </KyrosScrollbars>
        </SwipeableDrawer>

        <Tooltip title="Hide side panel" placement={props.position === 'left' ? 'right' : 'right'}>
          <Fab
            className={clsx('KyrosSidePanel-mobileButton', props.position)}
            onClick={toggleMobileDrawer}
            disableRipple
          >
            <KyrosSvgIcon className="KyrosSidePanel-buttonIcon">
              heroicons-outline:chevron-right
            </KyrosSvgIcon>
          </Fab>
        </Tooltip>
      </Hidden>
    </Root>
  );
}

KyrosSidePanel.propTypes = {};
KyrosSidePanel.defaultProps = {
  position: 'left',
  opened: true,
};

export default memo(KyrosSidePanel);
