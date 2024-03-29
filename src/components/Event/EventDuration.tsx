import React, { useState } from "react";
import { Box, Grid, Typography, Divider, Button, Tooltip } from "@mui/material";

//

//lodash
// import { map } from "lodash";

//icons

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import JoinEvent from "./JoinEvent";
import PersonIcon from "@mui/icons-material/Person";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import demoImg6 from "../../assets/default_images/6.jpg";
import { useStyles } from "../HomePage/HomePage.style";
import { getImageUrl } from "../../utils/imageUrl";

const EventDuration = (data: any) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [eventSelected, setEventSelected] = useState(null);
  const handleViewDetail = (eventId: any) => {
    navigate(`/event-detail?eventid=${eventId}`);
  };

  const handleClickOpenDialog = (data: any) => {
    setOpenDialog(true);
    setEventSelected(data);
  };

  const eventImage = (image: any) => {
    const imageLink = image ? JSON.parse(image)[0] : null;
    if (imageLink) {
      return getImageUrl(imageLink);
    } else {
      return demoImg6;
    }
  };

  return (
    <>
      {data?.data?.map((item: any, index: number) => (
        <Box key={index} sx={{ minWidth: "100%", height: "fit-content", mb: 3 }}>
          <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
            <img src={eventImage(item?.eventDetail?.image)} alt="" />
            <Typography
              variant="subtitle1"
              sx={{ mt: 1, cursor: "pointer", textDecoration: "underline", width: "100%" }}
              onClick={() => handleViewDetail(item?.eventDetail?.id)}>
              {item?.eventDetail?.title}
            </Typography>
            <Typography variant="caption" sx={{ py: 1 }}>
              {item?.eventDetail?.description}
            </Typography>
          </Grid>
          <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
            <Tooltip title="Thời gian kết thúc sự kiện">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>
                  Từ{" "}
                  <span style={{ fontWeight: 500 }}>
                    {moment(item?.eventDetail?.createdAt).lang("vi").format("LL")}
                  </span>{" "}
                  tới ngày{" "}
                  <span style={{ fontWeight: 500 }}>{moment(item?.eventDetail?.endAt).lang("vi").format("LL")}</span>
                </Typography>
              </Box>
            </Tooltip>
            <Box sx={{ display: "flex" }}>
              <Grid container>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số người tham gia: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.eventUser?.numberOfUser}</Typography>
                  </Box>
                </Grid>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HowToRegIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số người tham gia hỗ trợ: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.eventUser?.numberOfSP}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Grid container>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <GppGoodIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số vấn đề hỗ trợ thành công: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.listPostDone}</Typography>
                  </Box>
                </Grid>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GppMaybeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số vấn đề đăng kí: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.listPost}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                sx={{ width: 200 }}
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleClickOpenDialog(item?.eventDetail)}>
                Đăng ký
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}

      <JoinEvent open={openDialog} onClose={() => setOpenDialog(false)} data={eventSelected}></JoinEvent>
    </>
  );
};

export default EventDuration;
