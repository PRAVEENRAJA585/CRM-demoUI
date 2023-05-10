import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams } from 'react-router-dom';
import KyrosSvgIcon from '@kyros/core/KyrosSvgIcon';
// import { selectUser } from 'app/store/userSlice';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removeMyLeave } from '../store/myLeaveSlice';


function UserMenu(props) {
  const [userMenu, setUserMenu] = useState(null);
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { leaveId } = props;


  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };
 const handleDeleteClick = () => {
    const confirmed = window.confirm('Are you sure you want to delete this leave?');
    if (confirmed) {
    dispatch(removeMyLeave(leaveId ))
    };

 }
  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
       
        <SettingsIcon/>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {/* {!user.role || user.role.length === 0 ? ( */}
          <>
            <MenuItem
            //  component={Link} 
            //  to="/sign-in" 
            // onClick={handleEditClick}
             role="button">
              <ListItemIcon className="min-w-40">
                {/* <KyrosSvgIcon>heroicons-outline:lock-closed</KyrosSvgIcon> */}
                <EditIcon />

              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
            <MenuItem
            //  component={Link}
            //   to="/sign-up"
              role="button">
              <ListItemIcon className="min-w-40">
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Delete" 
              onClick={handleDeleteClick}

              />
            </MenuItem>
          </>
        {/* ) : ( */}
          {/* <>
                     </> */}
        {/* )} */}
      </Popover>
    </>
  );
}

export default UserMenu;
