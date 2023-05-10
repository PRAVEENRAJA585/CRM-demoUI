import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDialog,
  selectKyrosDialogOptions,
  selectKyrosDialogState,
} from 'app/store/kyros/dialogSlice';

function KyrosDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectKyrosDialogState);
  const options = useSelector(selectKyrosDialogOptions);

  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(closeDialog())}
      aria-labelledby="kyros-dialog-title"
      classes={{
        paper: 'rounded-8',
      }}
      {...options}
    />
  );
}

export default KyrosDialog;
