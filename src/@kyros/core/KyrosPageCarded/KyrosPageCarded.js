import KyrosScrollbars from '@kyros/core/KyrosScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import KyrosPageCardedHeader from './KyrosPageCardedHeader';
import KyrosPageCardedSidebar from './KyrosPageCardedSidebar';

const Root = styled('div')(({ theme, ...props }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
  minHeight: '100%',
  position: 'relative',
  flex: '1 1 auto',
  width: '100%',
  height: 'auto',
  backgroundColor: theme.palette.background.default,

  '& .KyrosPageCarded-scroll-content': {
    height: '100%',
  },

  '& .KyrosPageCarded-wrapper': {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    zIndex: 2,
    maxWidth: '100%',
    minWidth: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,

    ...(props.scroll === 'content' && {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      overflow: 'hidden',
    }),
  },

  '& .KyrosPageCarded-header': {
    display: 'flex',
    flex: '0 0 auto',
  },

  '& .KyrosPageCarded-contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    zIndex: 9999,
  },

  '& .KyrosPageCarded-toolbar': {
    height: toolbarHeight,
    minHeight: toolbarHeight,
    display: 'flex',
    alignItems: 'center',
  },

  '& .KyrosPageCarded-content': {
    flex: '1 0 auto',
  },

  '& .KyrosPageCarded-sidebarWrapper': {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    position: 'absolute',
    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        position: 'relative',
        marginLeft: 0,
        marginRight: 0,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        '&.closed': {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),

          '&.KyrosPageCarded-leftSidebar': {
            marginLeft: -props.leftsidebarwidth,
          },
          '&.KyrosPageCarded-rightSidebar': {
            marginRight: -props.rightsidebarwidth,
          },
        },
      },
    },
  },

  '& .KyrosPageCarded-sidebar': {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    '&.permanent': {
      [theme.breakpoints.up('lg')]: {
        position: 'relative',
      },
    },
    maxWidth: '100%',
    height: '100%',
  },

  '& .KyrosPageCarded-leftSidebar': {
    width: props.leftsidebarwidth,

    [theme.breakpoints.up('lg')]: {
      // borderRight: `1px solid ${theme.palette.divider}`,
      // borderLeft: 0,
    },
  },

  '& .KyrosPageCarded-rightSidebar': {
    width: props.rightsidebarwidth,

    [theme.breakpoints.up('lg')]: {
      // borderLeft: `1px solid ${theme.palette.divider}`,
      // borderRight: 0,
    },
  },

  '& .KyrosPageCarded-sidebarHeader': {
    height: headerHeight,
    minHeight: headerHeight,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },

  '& .KyrosPageCarded-sidebarHeaderInnerSidebar': {
    backgroundColor: 'transparent',
    color: 'inherit',
    height: 'auto',
    minHeight: 'auto',
  },

  '& .KyrosPageCarded-sidebarContent': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },

  '& .KyrosPageCarded-backdrop': {
    position: 'absolute',
  },
}));

const headerHeight = 120;
const toolbarHeight = 64;

const KyrosPageCarded = forwardRef((props, ref) => {
  // console.info("render::KyrosPageCarded");
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const rootRef = useRef(null);

  useImperativeHandle(ref, () => ({
    rootRef,
    toggleLeftSidebar: (val) => {
      leftSidebarRef.current.toggleSidebar(val);
    },
    toggleRightSidebar: (val) => {
      rightSidebarRef.current.toggleSidebar(val);
    },
  }));

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          ...(props.scroll !== 'page' && {
            '#kyros-toolbar': {
              position: 'static',
            },
            '#kyros-footer': {
              position: 'static',
            },
          }),
          ...(props.scroll === 'page' && {
            '#kyros-toolbar': {
              position: 'sticky',
              top: 0,
            },
            '#kyros-footer': {
              position: 'sticky',
              bottom: 0,
            },
          }),
        })}
      />
      <Root
        className={clsx(
          'KyrosPageCarded-root',
          `KyrosPageCarded-scroll-${props.scroll}`,
          props.className
        )}
        ref={rootRef}
        scroll={props.scroll}
        leftsidebarwidth={props.leftSidebarWidth}
        rightsidebarwidth={props.rightSidebarWidth}
      >
        {props.header && <KyrosPageCardedHeader header={props.header} />}

        <div className="flex flex-auto flex-col container z-10 h-full shadow-1 rounded-t-16 relative overflow-hidden">
          <div className="KyrosPageCarded-wrapper">
            {props.leftSidebarContent && (
              <KyrosPageCardedSidebar
                position="left"
                content={props.leftSidebarContent}
                variant={props.leftSidebarVariant || 'permanent'}
                ref={leftSidebarRef}
                rootRef={rootRef}
                open={props.leftSidebarOpen}
                onClose={props.leftSidebarOnClose}
              />
            )}
            <KyrosScrollbars
              className="KyrosPageCarded-contentWrapper"
              enable={props.scroll === 'content'}
            >
              {props.content && (
                <div className={clsx('KyrosPageCarded-content')}>{props.content}</div>
              )}
            </KyrosScrollbars>
            {props.rightSidebarContent && (
              <KyrosPageCardedSidebar
                position="right"
                content={props.rightSidebarContent}
                variant={props.rightSidebarVariant || 'permanent'}
                ref={rightSidebarRef}
                rootRef={rootRef}
                open={props.rightSidebarOpen}
                onClose={props.rightSidebarOnClose}
              />
            )}
          </div>
        </div>
      </Root>
    </>
  );
});

KyrosPageCarded.propTypes = {
  leftSidebarHeader: PropTypes.node,
  leftSidebarContent: PropTypes.node,
  leftSidebarVariant: PropTypes.node,
  rightSidebarContent: PropTypes.node,
  rightSidebarVariant: PropTypes.node,
  header: PropTypes.node,
  content: PropTypes.node,
  contentToolbar: PropTypes.node,
  scroll: PropTypes.oneOf(['normal', 'page', 'content']),
  leftSidebarOpen: PropTypes.bool,
  rightSidebarOpen: PropTypes.bool,
  leftSidebarWidth: PropTypes.number,
  rightSidebarWidth: PropTypes.number,
  rightSidebarOnClose: PropTypes.func,
  leftSidebarOnClose: PropTypes.func,
};

KyrosPageCarded.defaultProps = {
  classes: {},
  scroll: 'page',
  leftSidebarOpen: false,
  rightSidebarOpen: false,
  rightSidebarWidth: 240,
  leftSidebarWidth: 240,
};

export default memo(styled(KyrosPageCarded)``);
