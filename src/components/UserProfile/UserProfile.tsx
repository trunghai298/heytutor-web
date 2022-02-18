import React, { useContext, useRef, useState } from "react";
import { useStyles } from "./UserProfile.style";
import { stringAvatar } from "./helper";
import { Grid, Avatar, Typography, Button } from "@mui/material";
import Header from "../Common/Header/Header";
import { UserCtx } from "../../context/user/state";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarsIcon from "@mui/icons-material/Stars";
import CreateIcon from "@mui/icons-material/Create";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UpgradeIcon from "@mui/icons-material/Upgrade";
const UserProfile = () => {
  const classes = useStyles();
  const { user }: any = useContext(UserCtx);
  const inputStory: any = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  //information of user

  const userRanking = 100;
  const userStory = "Thích tìm hiểu những cái mới lạ";
  const userName = "Cao Duc Anh";
  const userMajor = "SE";
  const userSemester = 13;

  const [story, setStory] = useState(userStory);
  // begin set tab view

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // end set tab view

  // begin edit story
  const handleEditStory = () => {
    inputStory && inputStory?.current?.focus();
    setIsEdit(true);
    console.log(isEdit);
  };

  // begin change story
  const handleChangeStory = (e: any) => {
    setStory(e.target.value);
    if (e.target.value !== story) {
      setIsUpdate(true);
    }
  };

  const handleUpdateStory = (e: any) => {
    // lưu lại update
    setIsUpdate(false);
    setIsEdit(false);
    setStory(story);
  };

  // end change story

  //begin style
  const styleColor = {
    background: "linear-gradient(to right, #430089, #82ffa1)",
  };
  //end style
  // end edit story
  return (
    <div className={classes.root}>
      <Header titleCenter={"Profile"} />
      <div className={classes.wrap}>
        <Grid item className={classes.userHeader}>
          <div className={classes.header} style={styleColor}>
            <div className={classes.avatar}>
              <Avatar {...stringAvatar(userName)} className={classes.roundedAvt} />
            </div>
            {/* tom tat ca nhan */}
            <div className={classes.userSumarry}>
              <div className={classes.userName}>{userName}</div>
              <div className={classes.userMajor}>
                <CoPresentIcon />
                {"K" + userSemester + "-" + userMajor}
              </div>
              <div className={classes.userRanking}>
                <StarsIcon /> Điểm uy tín hiện tại: {userRanking}/100
              </div>
              <div className={classes.userStory}>
                <BorderColorIcon />
                <textarea
                  maxLength={60}
                  ref={inputStory}
                  className={classes.storyInput}
                  value={story}
                  onChange={handleChangeStory}
                  readOnly={!isEdit}></textarea>
                {isEdit && <div className={classes.countLenght}>Ký tự còn lại: {60 - story.length}/60</div>}
              </div>
              <div className={classes.buttonFixStory}>
                <Button
                  onClick={handleEditStory}
                  endIcon={<CreateIcon />}
                  sx={{ color: "black", background: "white" }}
                  variant="contained">
                  Chỉnh sửa
                </Button>

                {isUpdate && (
                  <Button
                    onClick={handleUpdateStory}
                    endIcon={<UpgradeIcon />}
                    sx={{ color: "white" }}
                    variant="contained">
                    Lưu chỉnh sửa
                  </Button>
                )}
              </div>
            </div>

            <Typography className={classes.name}>{user?.name}</Typography>
          </div>
          {/* chuyen tab */}
          <div className={classes.userView}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Bài đăng" {...a11yProps(0)} />
                  <Tab label="Đánh giá" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                Bài đăng
              </TabPanel>
              <TabPanel value={value} index={1}>
                Đánh giá
              </TabPanel>
            </Box>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default UserProfile;