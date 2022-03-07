import React from "react";
//material
import { Typography, Box, Button } from "@mui/material";
//components
import MainTabLayout from "../../layout/MainTabLayout";
//icons
import ArticleIcon from "@mui/icons-material/Article";

const MyPost = () => {
  const renderMyPostContent = (myPostData: any) => {
    if (myPostData.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: 1,
          }}>
          <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            Tạo bài viết ngay để tìm người giải quyết vấn đề của bạn
          </Typography>
          <Button variant="contained" color="primary">
            Tạo bài viết
          </Button>
        </Box>
      );
    }
  };
  return (
    <MainTabLayout title={"Bài đăng của tôi"} content={renderMyPostContent([])} type="myPost" icon={<ArticleIcon />} />
  );
};

export default MyPost;
