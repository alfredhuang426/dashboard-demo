import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { drawerWidth } from "./dashboard-config";
import { useEffect, useState } from "react";
import { DrawerContent } from "./adminComponents/DrawerContent/DrawerContent";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];
  axios.defaults.headers.common["Authorization"] = token;

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const logout = () => {
    document.cookie = `hexToken=;expires=;`;
    navigate("/login");
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    (async () => {
      try {
        const result = await axios.post("/v2/api/user/check");
        if (result.data.success) {
          setIsUserValid(true);
        }
      } catch (error: any) {
        if (!error?.response?.data.success) {
          console.log(error);
          navigate("/login");
        }
      }
    })();
  }, [navigate, token]);

  return (
    <>
      {!isUserValid && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      )}
      {isUserValid && (
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                後台管理系統
              </Typography>
              <Button color="inherit" onClick={logout}>
                登出
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <DrawerContent />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              <DrawerContent />
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {token && <Outlet />}
          </Box>
        </Box>
      )}
    </>
  );
};
