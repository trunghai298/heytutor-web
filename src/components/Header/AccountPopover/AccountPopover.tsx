import React, { useContext, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from "@mui/material";
// components
import Iconify from "./Iconify";
import MenuPopover from "./MenuPopover";

import { UserCtx } from "../../../context/user/state";
import { stringAvatar } from "../../UserProfile/helper";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "/profile",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "#",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { user } = useContext(UserCtx);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}>
        <Avatar {...stringAvatar(user?.name)} alt="photoURL" />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}>
            <Iconify
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={() => {
              localStorage.removeItem("heytutor-user");
              window.location.reload();
            }}
            fullWidth
            color="inherit"
            variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}