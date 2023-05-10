import { useSelector } from 'react-redux';
import KyrosScrollbars from '@kyros/core/KyrosScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/kyros/settingsSlice';
import clsx from 'clsx';

function KyrosPageCardedSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <KyrosScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div
            className={clsx(
              'KyrosPageCarded-sidebarHeader',
              props.variant,
              props.sidebarInner && 'KyrosPageCarded-sidebarHeaderInnerSidebar'
            )}
          >
            {props.header}
          </div>
        </ThemeProvider>
      )}

      {props.content && <div className="KyrosPageCarded-sidebarContent">{props.content}</div>}
    </KyrosScrollbars>
  );
}

export default KyrosPageCardedSidebarContent;
