import React, { useEffect } from "react";
import { useStyles } from "./BottomNavigation.style";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("home");
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const onChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  useEffect(() => {
    setValue(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <>
      <div id="bottom-nav" className={classes.bottomNavigation}>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={onChange}>
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Event" value="event" icon={<CelebrationIcon />} />
          <BottomNavigationAction label="Post" value="post" icon={<AddIcon />} />
          <BottomNavigationAction label="Notification" value="notification" icon={<NotificationsNoneRoundedIcon />} />
          <BottomNavigationAction label="Profile" value="profile" icon={<PermIdentityIcon />} />
        </BottomNavigation>
      </div>
    </>
  );
};

export default BottomNav;