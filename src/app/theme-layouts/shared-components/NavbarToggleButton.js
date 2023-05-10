import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectKyrosCurrentSettings, setDefaultSettings } from 'app/store/kyros/settingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@kyros/hooks/useThemeMediaQuery';
import { navbarToggle, navbarToggleMobile } from 'app/store/kyros/navbarSlice';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';

function NavbarToggleButton(props) {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const settings = useSelector(selectKyrosCurrentSettings);
  const { config } = settings.layout;

  return (
    <IconButton
      className={props.className}
      color="inherit"
      size="small"
      onClick={(ev) => {
        if (isMobile) {
          dispatch(navbarToggleMobile());
        } else if (config.navbar.style === 'style-2') {
          dispatch(
            setDefaultSettings(
              _.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
            )
          );
        } else {
          dispatch(navbarToggle());
        }
      }}
    >
      {props.children}
    </IconButton>
  );
}

NavbarToggleButton.defaultProps = {
  children: (
    <KyrosSvgIcon size={20} color="action">
      heroicons-outline:view-list
    </KyrosSvgIcon>
  ),
};

export default NavbarToggleButton;
