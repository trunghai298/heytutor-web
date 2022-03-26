import { makeStyles } from "@mui/styles";
import demoImg3 from "../../assets/default_images/3.jpg";

export const useStyles: any = makeStyles(() => ({
  wrapPostItem: {
    width: "90%",
    height: "auto",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#fff",
    margin: "10px 5%",
    padding: 20,
    wordBreak: "break-word",
  },

  userPanel: {
    marginTop: 16,
  },
  postTitleAndAction: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userNameAndAvatar: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  isResolve: {
    display: "flex",
  },

  hashTag: {
    "& > div": {
      backgroundColor: "whitesmoke",
      width: "fit-content",
      padding: 3,
      borderRadius: 5,
    },
  },
  postImage: {
    width: "100%",
    height: 200,
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  slideImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: 200,
  },
  deadline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    "& > div": {
      display: "flex",
    },
  },
  postContent: {
    marginTop: 20,
    backgroundImage: `url(${demoImg3})`,
    width: "100%",
    height: 400,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userAvatar: {
    border: "2px solid #94a4c4",
    borderRadius: "50%",
  },
  senderAvatar: {
    borderRadius: "50%",
    width: 28,
    fontSize: 14,
    height: 28,
  },
  userStats: {
    width: "100%",
    display: "flex",
    padding: 16,
    background: "#edf2fa",
    borderRadius: 8,
  },
  userPostDetail: {
    display: "flex",
    flexDirection: "column",
  },
  postStatus: {
    padding: "2px 10px",
    color: "#fff",
    borderRadius: 8,
    "&.isActive": {
      background: "#FF6B6B",
    },
    "&.isConfirmed": {
      background: "#4D96FF",
    },
    "&.isPending": {
      background: "#FFC107",
    },
    "&.isDone": {
      background: "#4CAF50",
    },
  },
  messageBox: {
    position: "fixed",
    minWidth: 375,
  },
  noConversation: {
    "& > img": {
      width: 250,
      height: 250,
    },
    height: 375,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  messageContent: {
    maxHeight: 350,
    overflowY: "scroll",
  },
  messageRow: {
    padding: "8px 0",
    alignItems: "flex-start",
  },
  message: {
    padding: 16,
    maxWidth: 250,
    borderRadius: "0px 8px 8px",
    backgroundColor: "#eceff5",
  },
}));
