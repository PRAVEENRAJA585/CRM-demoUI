import { useSelector } from 'react-redux';
import KyrosScrollbars from '@kyros/core/KyrosScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/kyros/settingsSlice';
import clsx from 'clsx';

function KyrosPageSimpleSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <KyrosScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={clsx('KyrosPageSimple-sidebarHeader', props.variant)}>{props.header}</div>
        </ThemeProvider>
      )}

      {props.content && <div className="KyrosPageSimple-sidebarContent">{props.content}</div>}
    </KyrosScrollbars>
  );
}

export default KyrosPageSimpleSidebarContent;
