import React, { useEffect, useState, useContext } from "react";
import { useStyles } from "./EventDetail.style";
// import { Document, Page } from "react-pdf";
// component custom
import Page from "../../layout/Page";

//component material
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// icon
import { Event } from "../../models/event";
import { ListPost } from "../ListData/ListRequest/ListPost";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/home_event_images/14.png";
import moment from "moment";
import "moment/locale/vi";
import { map } from "lodash";
import { NotificationCtx } from "../../context/notification/state";
import LoadingState from "../Common/LoadingState";
import { getImageUrl } from "../../utils/imageUrl";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import SearchIcon from "@mui/icons-material/Search";
import { isEmpty, compact } from "lodash";

const EventDetail = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const [event, setEvent]: any = useState(null);
  const [listPost, setListPost]: any = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedContent, setExpandedContent] = useState(isJoined);
  const { setNotificationSuccess, setNotificationInfo, setNotificationError } = useContext(NotificationCtx);

  const eventIdParam = urlParams.get("eventid");
  const eventId = eventIdParam ? parseInt(eventIdParam) : "";
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<any>(null);

  const onChangeSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (isEmpty(searchQuery)) {
      setSearchData(listPost);
    } else {
      const listPostSearch = listPost?.map((item: any) => {
        if (item.postData.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return item;
        }
      });
      setSearchData(compact(listPostSearch));
    }
  }, [searchQuery]);

  useEffect(() => {
    setSearchData(listPost);
  }, [listPost]);

  const getEventDetailByEventId = async (eventId: number | string) => {
    const data = await Event.getEventDetailByEventId(eventId);
    setEvent(data);
  };

  const onChangeExpandContent = () => {
    setExpandedContent(!expandedContent);
  };

  const getListPostOfEvent = async (eventId: number | string) => {
    const res = await Event.getListPostOnEvent(eventId);
    setListPost(res);
  };

  const onClickPostDetail = (postId: number | string) => {
    navigate(`/post-detail?postId=${postId}&from=event&eventId=${eventId}`);
  };

  const onJoinEvent = async (eventId: number | string) => {
    setIsLoading(true);
    const res = await Event.joinEvent(eventId);
    if (res.status === 200) {
      setNotificationSuccess("Tham gia sự kiện thành công");
      checkIsJoined(eventId);
    } else {
      setNotificationError("Tham gia sự kiện thất bại!");
    }
    setIsLoading(false);
  };

  const onUnJoinEvent = async (eventId: number | string) => {
    setIsLoading(true);
    const res = await Event.unjoinEvent(eventId);
    if (res.status === 200) {
      setNotificationInfo("Bạn đã rời sự kiện");
      checkIsJoined(eventId);
    } else {
      setNotificationError("Đã xảy ra lỗi! Vui lòng thử lại sau");
    }
    setIsLoading(false);
  };

  const checkIsJoined = async (eventId: number | string) => {
    const res = await Event.isJoinEvent(eventId);
    setIsJoined(res);
  };

  useEffect(() => {
    if (eventId) {
      getEventDetailByEventId(eventId);
      checkIsJoined(eventId);
    }
  }, [eventId]);

  useEffect(() => {
    setExpandedContent(!isJoined);
    if (isJoined) {
      getListPostOfEvent(eventId);
    } else {
      setListPost(null);
    }
  }, [isJoined, eventId]);

  const eventImage = (image: any) => {
    const imageLink = image ? JSON.parse(image)[0] : null;
    if (imageLink) {
      return getImageUrl(imageLink);
    } else {
      return img1;
    }
  };

  const beautifyContent = (content: string) => {
    const newContent = content.replace(/\n/g, "<br>");
    const splitData = newContent.split("<br>");
    return map(splitData, (row: string, index: number) => (
      <Typography key={index}>
        {row}
        {index % 2 !== 0 && <br></br>}
      </Typography>
    ));
  };

  if (!event) {
    return (
      <Page className={classes.root}>
        <LoadingState />
      </Page>
    );
  } else {
    return (
      <>
        <Page maxWidth="md" className={classes.root}>
          <Box>
            <BreadcrumbsTab history={[{ title: "Trang chủ", href: "/" }]} current={{ title: "Sự kiện" }} />
            <Box display="flex" alignItems="flex-start">
              <img
                style={{ borderRadius: 8, height: 250, width: "100%" }}
                src={eventImage(event?.eventDetail.image)}
                alt=""
              />
            </Box>
            <Paper sx={{ mt: 1, p: 2, width: "100%" }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box width={"75%"}>
                  <Typography variant="h6">{event?.eventDetail.title}</Typography>
                </Box>
                <Box width={"25%"} display="flex" justifyContent="flex-end">
                  {!isJoined ? (
                    <Button
                      disabled={isLoading}
                      sx={{
                        maxHeight: 30,
                        fontSize: "12px",
                        fontWeight: "bold",
                        px: 0.75,
                        py: 0.5,
                        ml: 2,
                        textTransform: " none",
                      }}
                      variant="contained"
                      onClick={() => onJoinEvent(eventId)}>
                      Tham gia sự kiện ngay
                    </Button>
                  ) : (
                    <Button
                      disabled={isLoading}
                      size="small"
                      sx={{
                        maxHeight: 30,
                        fontSize: "12px",
                        fontWeight: "bold",
                        px: 1,
                        py: 0.5,
                        ml: 2,
                        textTransform: " none",
                      }}
                      variant="outlined"
                      color="error"
                      onClick={() => onUnJoinEvent(eventId)}>
                      Thoát khỏi sự kiện
                    </Button>
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="flex-start" sx={{ background: "#d8dfe6", borderRadius: 1, p: 1, mt: 1 }}>
                <Box sx={{ width: 1 / 2 }}>
                  <Typography variant="subtitle2">
                    Tổng số vấn đề:
                    <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                      {event?.totalPost}
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle2">
                    Thời gian kết thúc sự kiện:
                    <Typography component="span" variant="caption" sx={{ ml: 1 }}>
                      {moment(event?.eventDetail.endAt).fromNow()}
                    </Typography>
                  </Typography>
                  {isJoined && (
                    <Typography variant="subtitle2">
                      Bài viết của bạn trong sự kiện:
                      <Typography sx={{ ml: 1 }} component="span" variant="caption">
                        {event?.listPostInEventOfUser}
                      </Typography>
                    </Typography>
                  )}
                </Box>
                <Box sx={{ width: 1 / 2 }}>
                  <Typography variant="subtitle2">
                    Vấn đề chưa có người đăng kí:
                    <Typography sx={{ ml: 1 }} component="span" variant="caption">
                      {event?.listNonRegisterPost}
                    </Typography>
                  </Typography>
                  <Typography variant="subtitle2">
                    Bài viết sắp đến hạn cần giải quyết:
                    <Typography sx={{ ml: 1 }} component="span" variant="caption">
                      {event?.listPostNearDeadline}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Accordion expanded={expandedContent} onChange={onChangeExpandContent}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="subtitle1">Nội dung sự kiện</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ mt: 2, mb: 2 }}>{event?.eventDetail.description}</Typography>
                  {beautifyContent(event?.eventDetail.content)}
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Box>
          <Paper sx={{ mt: 1, p: 2, width: "100%" }}>
            {listPost && (
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                <TextField
                  autoFocus
                  fullWidth
                  classes={{ root: classes.textField }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={onChangeSearch}
                  id="outlined-basic"
                  placeholder="Tìm kiếm theo tiêu đề sự kiện..."
                  variant="outlined"
                />
              </Box>
            )}
            {isJoined && (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <ListPost
                  hideOption
                  data={searchData}
                  onClickPostDetail={onClickPostDetail}
                  selectItem={{}}
                  onOpenMenu={() => {}}
                  renderRegisterAndSupporter={null}
                />
              </Grid>
            )}
          </Paper>
        </Page>
      </>
    );
  }
};

export default EventDetail;
