import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete, Popper, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useDispatch } from "react-redux";
import { saveMyLeave } from "../store/myLeaveSlice";

function createData(reason, partial, from, to, modifiedBy, modifiedOn, action) {
  return {
    reason,
    partial,
    from,
    to,
    modifiedBy,
    modifiedOn,
    action,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "partial";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar() { }

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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

export default function MyLeaveView() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
    }
  );

  const form = watch();
  const [days, setDays] = React.useState("");

  React.useEffect(() => {
    const fromDate = new Date(form.from);
    const toDate = new Date(form.to);
    const daysDiff = getBusinessDays(fromDate, toDate);
    setDays(daysDiff);
  }, [form.from, form.to]);

  function getBusinessDays(fromDate, toDate) {
    let count = 0;
    let currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return count;
  }

  const leave = [
    {
      id: 1,
      label: "FullDay",
    },
    {
      id: 2,
      label: "Partial",
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    const data = { ...getValues(), days };
    dispatch(saveMyLeave(data));
    setOpen(false);
  };

  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);

  const AutocompletePaper = React.forwardRef(
    ({ style, ...otherProps }, ref) => (
      <Popper
        {...otherProps}
        ref={ref}
        style={{
          ...style,
          zIndex: 9999,
          position: "absolute",
          marginTop: "10px",
        }}
      />
    )
  );

  return (
    <div class="ml-10 mt-20">
      <h1 class="text-2xl">
        My Leaves <HelpIcon fontSize="small" color="disabled" />
      </h1>
      <h1 class="text-md" style={{ color: "gray" }}>
        View And Manage Your Leaves
      </h1>
      <hr className="border-t-2 border-black-400 " />
      <Table sx={{ minWidth: "110ch" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <Button variant="outlined"
                style={{
                  WebkitAppearance: "button",
                  backgroundColor: "rgb(55, 48, 163)",
                  backgroundImage: "none",
                  color: "white",
                }}
                onClick={handleClickOpen}>
                Add Leave
              </Button>

            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Leave
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="text-md font-medium  flex">
            <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
              Leave Type
            </div>
            <div className=" text-left ">
              <Controller
                name="leaveType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    PopperComponent={AutocompletePaper}
                    className="mt-8 mb-24"
                    size="small"
                    options={leave || []}
                    value={value || ""}
                    onChange={(event, newValue) => {
                      onChange(newValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ m: 1, width: "35ch" }}
                        {...params}
                        id="leaveType"
                        required
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>

          <div className="text-md font-medium flex">
            <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
              From
            </div>
            <div className=" text-left ">
              <Controller
                control={control}
                defaultValue={""}
                name="from"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    variant="inline"
                    format="DD/MM/YYYY"
                    className="mt-5 mb-16 w-full"
                    clearable
                    PopperProps={{
                      style: {
                        zIndex: 9999,
                        position: "absolute",
                        marginTop: "10px",
                      },
                    }}
                    renderInput={(_props) => (
                      <TextField
                        sx={{ m: 1, width: "35ch" }}
                        size="small"
                        {..._props}
                        className="mt-24"
                        id="from"
                        // label="from"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        fullWidth
                        error={false}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>

          <div className="text-md font-medium flex">
            <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
              To
            </div>
            <div className=" text-left ">
              <Controller
                control={control}
                defaultValue={""}
                name="to"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="DD/MM/YYYY"
                    className="mt-5 mb-16 w-full"
                    clearable
                    PopperProps={{
                      style: {
                        zIndex: 9999,
                        position: "absolute",
                        marginTop: "10px",
                      },
                    }}
                    renderInput={(_props) => (
                      <TextField
                        sx={{ m: 1, width: "35ch" }}
                        size="small"
                        {..._props}
                        className="mt-24"
                        id="to"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        fullWidth
                        error={false}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>

          <div className="text-md font-medium pt-20 flex">
            <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
              Days
            </div>
            <div className=" text-left ">
              <Controller
                control={control}
                name="days"
                render={({ field }) => (
                  <TextField
                    sx={{ m: 1, width: "35ch" }}
                    size="small"
                    {...field}
                    className="mt-8 mb-16"
                    label="days"
                    value={days}
                  />
                )}
              />
            </div>
          </div>

          <div className="text-md font-medium pt-20 flex">
            <div className="min-w-[10%] text-left mx-20	pt-20 relative  left-0">
              Reason
            </div>
            <div className=" text-left ">
              <Controller
                control={control}
                name="reason"
                render={({ field }) => (
                  <TextField
                    sx={{ m: 1, width: "35ch" }}
                    {...field}
                    className="mt-8 mb-16"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
