import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HelpIcon from '@mui/icons-material/Help';
import "tailwindcss/tailwind.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function MyReportSubscription() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRevert = () => {

  }
  return (
    <>
      <div class="ml-20 mt-20">
        <h1 class="text-2xl">
          My Report Subscriptions <HelpIcon fontSize="small" color="disabled" />
        </h1>
        <h1 class="text-md" style={{ color: "gray" }}>
          Manage your report subscriptions </h1>
        <hr className="border-t-2 border-black-400 " />


        <div className="text-md font-medium pt-20 flex"><div className='min-w-[50%]'><FormControlLabel
          value="Daily User Tasks Report"
          control={<Checkbox />}
          label="Daily User Tasks Report"
          labelPlacement="Daily User Tasks Report"
        /></div><div className='min-w-[40%]'> </div> </div>
        <h1 class="text-md" style={{ color: "gray" }}>
          User Tasks Reports Summarizing the pending tasks for today </h1>
        <hr className="border-t-2 border-black-400 " />

        <div className="text-md font-medium pt-20 flex"><div className='min-w-[50%]'><FormControlLabel
          value="Daily User Tasks Report"
          control={<Checkbox />}
          label="Daily User Tasks Report"
          labelPlacement="Daily User Tasks Report"
        /></div><div className='min-w-[40%]'> </div> <Link component="button"
          variant="outlined"
          onClick={handleClickOpen}
        > Select Colum</Link></div>
        <h1 class="text-md" style={{ color: "gray" }}>
          Lead Activity Report Summarizing The New Leads And Most Active leads in the past day </h1>
        <hr className="border-t-2 border-black-400 " />

        <div className="text-md font-medium pt-20 flex"><div className='min-w-[50%]'><FormControlLabel
          value="Daily Report For Owner"
          control={<Checkbox />}
          label="Daily Report For Owner"
          labelPlacement="Daily Report For Owner"
        /> </div><div className='min-w-[40%]'> </div><Link component="button"
          variant="outlined"
          onClick={handleClickOpen}
        > Select Colum
          </Link></div>
        <h1 class="text-md" style={{ color: "gray" }}>
          Lead Activity Report Summarizing The New Leads And Most Active leads in the past day where the user</h1>
        <hr className="border-t-2 border-black-400 " />

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth='md'
          fullWidth
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Select Lead Fields
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <FormControlLabel
                control={<Checkbox />}

              />
            </Typography>
            <hr className="border-t-2 border-black-400 " />
            <Typography gutterBottom>
              <FormControlLabel
                control={<Checkbox />}
              />
            </Typography>
            <hr className="border-t-2 border-black-400 " />
            <Typography gutterBottom>
              <FormControlLabel
                control={<Checkbox />}
              />
            </Typography>
            <hr className="border-t-2 border-black-400 " />
            <Typography gutterBottom>
              <FormControlLabel
                control={<Checkbox />}
              />
            </Typography>
            <hr className="border-t-2 border-black-400 " />
            <Typography gutterBottom>
              <FormControlLabel
                control={<Checkbox />}
              />
            </Typography>
            <hr className="border-t-2 border-black-400 " />

            <Typography gutterBottom>
              <FormControlLabel
                control={<Checkbox />}
              />
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save Selected
            </Button>
            <Button onClick={handleRevert}>Restore Default</Button>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>



        </BootstrapDialog>
      </div>
    </>
  );
}
