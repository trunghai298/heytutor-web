import React, { useState } from "react";
import { useStyles } from "./ManagerCTV.style";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  // Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  DialogActions,
  Autocomplete,
  Popover,
} from "@mui/material";
// icon
// import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
// help

// import { stringAvatar } from "../../UserProfile/helper";
// component

import DialogEditManageCTV from "./DialogEditManageCTV";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NotificationCtx } from "../../../context/notification/state";
import { useNavigate } from "react-router-dom";
import { DateRange } from "@mui/lab/DateRangePicker";
import DateRangePicker from "../../ListData/DateTimePicker/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const ManagerCTV = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  function createData(
    id: number,
    name: string,
    gmail: string,
    nbOfEventManager: number,
    nbOfEventDone: number,
    nbOfEventReported: number,
    approvedBy: string,
    status: number
  ) {
    return { id, name, gmail, nbOfEventManager, nbOfEventDone, nbOfEventReported, approvedBy, status };
  }

  const dataUser = [
    createData(1, "Cao Duc Anh", "anhcd1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(2, "Cao Duc Anh", "anhcd5@gmail.com", 0, 2, 2, "anhcdh4", 2),
    createData(3, "Nguyen Trung Hai", "haint1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(4, "Le Huy Chuong", "chuonglh1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(5, "Nguyen DN Long", "longndn1@gmail.com", 0, 2, 2, "anhcdh4", 2),
    createData(6, "Nguyen DN Long", "longndn1@gmail.com", 2, 2, 2, "anhcdh4", 2),
    createData(7, "Le Huy Chuong", "chuonglh1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(8, "Nguyen Trung Hai", "haint1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(9, "Cao Duc Anh", "anhcd5@gmail.com", 0, 2, 2, "anhcdh4", 2),
    createData(10, "Cao Duc Anh", "anhcd1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(11, "Cao Duc Anh", "anhcd1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(12, "Cao Duc Anh", "anhcd5@gmail.com", 0, 2, 2, "anhcdh4", 2),
    createData(13, "Nguyen Trung Hai", "haint1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(14, "Le Huy Chuong", "chuonglh1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(15, "Nguyen DN Long", "longndn1@gmail.com", 0, 2, 2, "anhcdh4", 2),
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { setNotificationError } = React.useContext(NotificationCtx);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [filters, setFilters]: any = useState({ status: "joined" });
  const [sortBy, setSortBy]: any = useState("");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  // const [dataPick, setDataPick] = useState(null);
  const roleProps = {
    options: [
      { id: 1, title: "CTV1" },
      { id: 2, title: "CTV2" },
      { id: 3, title: "CTV3" },
      { id: 4, title: "Admin1" },
      { id: 5, title: "Admin2" },
    ],
    getOptionLabel: (option: any) => option.title,
  };

  const permissionsProps = {
    options: [
      { id: 1, title: "Quản lí event" },
      { id: 2, title: "Quản lí người dùng" },
      { id: 3, title: "Quản lí bài viết" },
    ],
    getOptionLabel: (option: any) => option.title,
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenDialogEdit(true);
  };
  const closeDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeTab = (path: string, id: number) => {
    navigate(`/dashboard/manage-ctv/${path}?id=${id}`);
  };
  const [visible, setVisible] = useState("");
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(null);
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(null);
  const [
    data = {
      selected: [],
      open: false,
      sortByOpts: [
        { value: "asc", label: "Tăng dần" },
        { value: "desc", label: "Giảm dần" },
      ],
      sortOpts: [
        { value: "isActive", label: "Đang quản lí" },
        { value: "isPending", label: "Đang chờ phê duyệt" },
      ],
      timeOpts: [
        { value: "currentWeek", label: "Tuần này" },
        { value: "currentMonth", label: "Tháng này" },
      ],
    },
  ]: // setData,
  any = useState();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "",
      permissions: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().email("Must not be null").max(255).required("Username is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      role: Yup.string().email("Must not be null").max(255).required("Role is required"),
      permissions: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
    }),
    onSubmit: () => {
      try {
        console.log(formik.values.email);
        if (formik.values.email.includes("Admin")) {
          setNotificationError("Email này đã tồn tại");
        }
        console.log("on submit");
      } catch (e) {
        console.log(e);
      }
    },
  });

  const onSubmitDialog = () => {
    console.log(formik.values.email);
    if (formik.values.email.includes("admin")) {
      setNotificationError("Email này đã tồn tại");
    }
    console.log("on submit");
  };
  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };
  const renderDialog = () => {
    return (
      <Dialog open={openDialog} onClose={onCloseDialog}>
        <DialogTitle>Thêm cộng tác viên</DialogTitle>
        <DialogContent>
          <Container maxWidth="xs">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="username"
                value={formik.values.username}
                variant="outlined"
                disabled={formik.isSubmitting}
              />
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
                disabled={formik.isSubmitting}
              />
              <Autocomplete
                sx={{ mt: 2 }}
                {...roleProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => <TextField {...params} label="Choose role" variant="standard" />}
              />
              <Autocomplete
                sx={{ mt: 2 }}
                {...permissionsProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => <TextField {...params} label="Add permissions" variant="standard" />}
              />
            </form>
          </Container>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={onSubmitDialog}
            variant="outlined"
            color="primary"
            disabled={Boolean(formik.touched.email && formik.errors.email)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className={classes.root}>
      {renderDialog()}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            variant="contained"
            color="primary"
            // onClick={() => setOpenDialog(true)}
          >
            Add user
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Grid container item xs={12} spacing={1} sx={{ mt: 1, width: "100%" }}>
            <Grid item xs={12} lg={4} md={4}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Thời gian"
                  defaultValue="currentWeek"
                  // value={filters.time}
                  // onChange={(e: any) => onChangeFilter(e, "time")}
                >
                  {data.timeOpts.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày bắt đầu"
                  inputFormat="dd/MM/yyyy"
                  value={valueFilterStartDate}
                  onChange={(newValue) => {
                    setValueFilterStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày kết thúc"
                  inputFormat="dd/MM/yyyy"
                  value={valueFilterEndDate}
                  onChange={(newValue) => {
                    setValueFilterEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  autoFocus
                  classes={{ root: classes.textField }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  placeholder="Tìm kiếm..."
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Hiển thị theo"
                  defaultValue="isNotResolve"
                  value={visible}
                  onChange={(e: any) => setVisible(e.target.value)}>
                  {data.sortOpts.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={4} md={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Sắp xếp"
                  defaultValue="desc"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}>
                  {data.sortByOpts.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Popover
                open={openDatePicker}
                onClose={onCloseDatePicker}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                transformOrigin={{ vertical: "center", horizontal: "center" }}>
                <DateRangePicker setValue={setDateData} value={dateData} />
              </Popover>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="ctv table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Thông số sự kiện</TableCell>
                  <TableCell>Cập nhật bởi</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Quản lí</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataUser?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex" }}>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => handleChangeTab("profile", row.id)}>
                            {row.name}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                            {row.gmail}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Đang quản lí : {row.nbOfEventManager}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        Chờ phê duyệt : {row.nbOfEventManager}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {row.approvedBy}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ color: row.status === 1 ? "green" : "red" }}>
                      {row.status === 1 ? (
                        <Chip label="Hoạt động" variant="outlined" color="primary" />
                      ) : (
                        <Chip label="Bị khóa" variant="outlined" color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      {/* Ban cộng tác viên */}
                      <IconButton aria-label="Quản lí cộng tác viên" onClick={handleOpenEdit}>
                        <Tooltip title="Quản lí cộng tác viên">
                          <EditIcon color="error" />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <DialogEditManageCTV open={openDialogEdit} onClose={closeDialogEdit} />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={dataUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default ManagerCTV;
