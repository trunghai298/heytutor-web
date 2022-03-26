import React, { useEffect, useState } from "react";
//material
import { Card, Box, Grid, Typography, Divider, Tooltip, CircularProgress, Button } from "@mui/material";

//
//lodash
// import { map } from "lodash";

//icons
import BuildIcon from "@mui/icons-material/Build";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Event } from "../../models/event";
import moment from "moment";
import { useStyles } from "./HomePage.style";
// import Image from "../../assets/27366933.jpg";
import EventDuration from "../Event/EventDuration";

import demoImg6 from "../../assets/default_images/6.jpg";

const OnGoingEvent = () => {
  const [value, setValue] = React.useState("1");
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const [data, setData]: any = useState(null);
  console.log(data, "event tham gia");

  const handleViewDetail = (eventId: any) => {
    //navigate sang URL detail EVENT
    navigate(`/event-detail?eventid=${eventId}`);
  };

  // const onClickShow = (id: any) => {
  //   setCheckShowMore(!checkShowMore);
  //   setItemCheck(id);
  // };
  // const [checkShowMore, setCheckShowMore] = useState(false);
  // const [itemCheck, setItemCheck] = useState();
  const [dataEventDuration, setDataEventDuration]: any = useState(null);

  const itemEvent = () => {
    if (!data) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </Box>
      );
    } else {
      return (
        <>
          {data?.slice(0, 3).map((item: any, index: number) => (
            <Box key={index} sx={{ minWidth: "100%", height: "fit-content", mr: 4, mb: 3 }}>
              <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
                <img src={demoImg6} alt="" />
                <Typography
                  variant="h5"
                  sx={{ ml: 1, cursor: "pointer" }}
                  onClick={() => handleViewDetail(item?.eventDetail?.id)}>
                  {item?.eventDetail?.title}
                </Typography>
                <Typography variant="body1" sx={{ ml: 2 }}>
                  Bạn có đủ tự tin kiến thức của mình sẽ pass môn CSD với điểm tuyệt đối
                </Typography>
              </Grid>
              <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
                <Tooltip title="Thời gian kết thúc sự kiện">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>
                      Từ{" "}
                      <span style={{ fontWeight: 600 }}>
                        {moment(item?.eventDetail?.createdAt).lang("vi").format("LL")}
                      </span>{" "}
                      tới ngày{" "}
                      <span style={{ fontWeight: 600 }}>
                        {moment(item?.eventDetail?.endAt).lang("vi").format("LL")}
                      </span>
                    </Typography>
                  </Box>
                </Tooltip>
                <Box sx={{ display: "flex" }}>
                  <Grid container>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <NotificationsActiveIcon sx={{ mr: 0.5, width: 20, height: 20, color: "#fd5050" }} />
                        <Typography variant="subtitle2">Vấn đề sắp hết hạn: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 1 }}>999</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EventNoteIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography variant="subtitle2">Số vấn đề đăng kí: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>999</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Grid container>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                        <PersonOffIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography variant="subtitle2">Chưa có người nhận hỗ trợ: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 1 }}>999</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BuildIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography variant="subtitle2">Số đăng kí hỗ trợ các vấn đề: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>999</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
          {data?.length > 2 && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1">Đã hiển thị 3 trên {data?.length} sự kiện </Typography>
              <Button variant="contained">Xem chi tiết</Button>
            </Box>
          )}
        </>
      );
    }
  };

  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();
    setData(data.listEvent);
  };
  const getDataEventDuration = async () => {
    const data = await Event.getEventDuration();
    setDataEventDuration(data);
  };

  useEffect(() => {
    getListEventByUser();
    getDataEventDuration();
  }, [data?.length]);

  console.log(dataEventDuration, "duration");

  return (
    <Card>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sự kiện đã tham gia" value="1" />
            <Tab label="Sự kiện chưa tham gia" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{itemEvent()}</TabPanel>
        <TabPanel value="2">
          <EventDuration data={dataEventDuration?.shortTermEvents} />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default OnGoingEvent;
