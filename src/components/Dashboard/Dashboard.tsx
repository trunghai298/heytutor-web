import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  FormControl,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  InputLabel,
  InputAdornment,
  Input,
  TextField,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CookieIcon from "@mui/icons-material/Cookie";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Students } from "../../models/student";
import { keys, map, filter, pick } from "lodash";
import { TERMS } from "../../constants/terms";
import { useStyles } from "./Dashboard.style";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashboard = () => {
  const theme = useTheme();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dataStudent, setDataStudent]: any = useState(null);
  const [term, setTerm] = useState(TERMS[3]);
  const [loading, setLoading] = useState(false);

  const onClickFetchData = () => {
    setLoading(true);
  };

  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const onChangeTerm = (event: any) => {
    setTerm(event.target.value);
  };

  const onOpenDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const renderDemoData = () => {
    if (!dataStudent) return "Loading...";
    return (
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          {...dataStudent}
          pageSize={20}
          rowsPerPageOptions={[20, 40, 60]}
          loading={!dataStudent}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    );
  };

  const renderHeaderName = (field: string) => {
    switch (field) {
      case "id": {
        return "Id";
      }
      case "stdId": {
        return "Student Id";
      }
      case "stdCode": {
        return "Student Code";
      }
      case "fullName": {
        return "Full Name";
      }
      case "classId": {
        return "Class Id";
      }
      case "major": {
        return "Major";
      }
      case "imageUrl": {
        return "Image Url";
      }
    }
  };

  const renderHeaderWidth = (field: string) => {
    if (field === "imageUrl") return 300;
    return 70 + field.length * 15;
  };

  const getStudentData = async () => {
    const res: any = await Students.list("", { limit: 100, offset: 0 });
    const columns = filter(keys(res.rows[0]), (key: string) => key !== "createdAt" && key !== "updatedAt");
    const formatColumns = map(columns, (cl: any) => {
      return {
        field: cl,
        headerName: renderHeaderName(cl),
        width: renderHeaderWidth(cl),
      };
    });
    const rows = map(res.rows, (row: any) => pick(row, columns));
    setDataStudent({ columns: formatColumns, rows });
  };

  useEffect(() => {
    getStudentData();
  }, []);

  // useEffect(() => {
  //   const es = new EventSource("http://localhost:3001/fap-data");

  //   const listener = function (event: any) {
  //     const type = event.type;

  //     window.console.log(`${type}: ${event.data || es.url}`);

  //     if (type === "result") {
  //       es.close();
  //     }
  //   };

  //   es.addEventListener("open", listener);
  //   es.addEventListener("message", listener);
  //   es.addEventListener("error", listener);
  //   es.addEventListener("result", listener);
  // }, []);

  const renderImportDataUI = () => {
    return (
      <div className={classes.importContainer}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Paste FAP cookie here</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <CookieIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          classes={{ root: classes.selectTerm }}
          id="outlined-select-currency"
          select
          label="Select"
          value={term}
          onChange={onChangeTerm}
          helperText="Please select term">
          {TERMS.map((option) => (
            <MenuItem key={option.termId} value={option.termId}>
              {option.termName}
            </MenuItem>
          ))}
        </TextField>
        <LoadingButton
          classes={{ root: classes.buttonFetch }}
          fullWidth
          onClick={onClickFetchData}
          loading={loading}
          loadingIndicator="Loading..."
          variant="outlined">
          Fetch data
        </LoadingButton>
      </div>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpenDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={onCloseDrawer}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Import Data", "Export Data"].map((text, index) => (
            <ListItem button key={text} onClick={() => onChangeTab(index === 0 ? "dashboard" : "export")}>
              <ListItemIcon>{index === 0 ? <CloudDownloadIcon /> : <CloudUploadIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {activeTab === "dashboard" ? renderImportDataUI() : renderDemoData()}
      </Main>
    </Box>
  );
};

export default Dashboard;