import { makeStyles } from "@mui/styles";

export const useStyles: any = makeStyles(
  () => ({
    container: {
      position: "relative",
      padding: 16,
      marginBottom: 62,
      width: "100%",
      height: "calc(100vh - 62px)",
      alignItems: "center",
      justifyContent: "center",
    },
    searchDialog: {
      width: "100%",
      flexWrap: "nowrap",
      height: 60,
      zIndex: 10,
      background: "#FFFFFF",
      alignItems: "center",
    },
    search: {
      "& > div": {
        background: "#F8F8F8",
        minHeight: 36,
        height: 46,
        padding: `3px 16px`,
        fontSize: "0.75rem",
        boxSizing: "border-box",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        "& > input": {
          color: "#3C3C43",
          fontSize: 17,
          fontWeight: 400,
          border: "unset",
          backgroundColor: "#F8F8F8",
          padding: 0,
        },
      },
    },
    searchIcon: {
      width: 20,
    },
    noBorder: {
      border: "none",
      borderStyle: "unset !important",
    },
    content: {
      width: "100%",
      "& > p:first-child": {
        fontSize: 18,
        fontWeight: 700,
        textAlign: "left",
        color: "#0288d1",
      },
    },
    homeContent: {
      width: "100%",
      height: "auto",
      display: "flex",
    },
    listPost: {
      // marginTop: 20,
      zIndex: 20,
      width: "100%",
      maxWidth: "500px",
      margin: "0 auto",

      "@media(min-width:600)": {
        marginLeft: "calc(50% - 250px)",
      },
    },
    post: {
      width: "100%",
      height: "auto",
      backgroundColor: "#F8F8F8",
      padding: 15,
      borderRadius: 8,
      marginBottom: 16,
    },
    userPanel: {
      "& > div": {
        "&:first-child": {
          maxWidth: 43,
          margin: 0,
          borderRadius: "50%",
          border: "1px solid #0288d1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "&:nth-child(2)": {
          marginLeft: 10,
        },
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        "&:last-child": {
          alignItems: "flex-end",
        },
      },
    },
    userAvatar: {
      width: 43,
      height: 43,
    },
    userNameAndPostTime: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      "& > p:nth-child(1)": {
        fontSize: 16,
        lineHeight: "16px",
        letterSpacing: -0.2,
        fontWeight: 700,
        color: "#0288d1",
      },
      "& > p:nth-child(2)": {
        marginTop: 4,
        fontSize: 12,
        lineHeight: "16px",
        letterSpacing: -0.2,
        fontWeight: 400,
        color: "#727477",
      },
    },
    postContent: {
      width: "100%",
      height: "calc(100% - 40px)",
      position: "relative",
      "& > p": {
        textAlign: "left",
      },
    },
    mainContent: {
      marginTop: 10,
    },
    postActions: {
      marginTop: 30,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& > div": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "&:last-child": {
          justifyContent: "flex-end",
        },
        "& > div": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginRight: 20,
          "&:last-child": {
            margin: 0,
          },
          "& > p": {
            marginLeft: 6,
          },
        },
      },
    },
    dialogContent: {
      padding: 16,
      height: "100vh",
    },
    dialogHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    backBtn: {
      "& > svg": {
        width: 20,
        height: 20,
      },
    },
    moreBtn: {
      display: "flex",
      justifyContent: "flex-end",
    },
    postTitle: {
      textAlign: "center",
      "& > p": {
        fontSize: 16,
        fontWeight: 500,
        color: "#0288d1",
      },
    },
    simpleActions: {
      marginTop: "30px !important",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > div": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    inputComment: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 40,
      display: "flex",
      margin: "0 auto",
      alignContent: "center",
      "& > input": {
        width: "85%",
        height: "auto",
        border: "1px solid black",
        borderRadius: "7px",
        paddingLeft: "10px",
      },
      "& > div": {
        textAlign: "center",
        width: "15%",
        height: "auto",
        marginTop: "auto",
        marginBottom: "auto",
      },
    },
    loading: {
      width: "100%",
      position: "absolute",
      top: "50%",
      right: "50%",
      transform: "translate(50%, -50%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    hashTag: {
      width: "100%",
      color: "#0288d1",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      "& > p": {
        textAlign: "left",
        textDecoration: "underline",
        marginRight: 8,
      },
    },
    commentSection: {
      marginTop: 20,
    },
    commentItem: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    commentRow: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    commentContent: {
      marginLeft: 8,
      background: "#F8F8F8",
      padding: 8,
      borderRadius: 12,
      "& > p:first-child": {
        fontSize: 16,
        fontWeight: 500,
      },
    },
    commentAt: {
      "& > p": {
        fontSize: 14,
        color: "#727477",
        textAlign: "left",
        marginTop: 4,
      },
    },
    // chatListEngine: {
    //   position: "absolute",
    //   width: 500,
    //   height: "auto",
    //   right: 0,
    //   "@media(max-width:1500px)": {
    //     display: "none",
    //   },
    // },
  }),

  { index: 1 }
);
