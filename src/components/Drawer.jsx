import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Create,
  Home,
  Logout,
  Person2,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Drawerr = ({
  drawerWidth,
  settheme,
  display,
  typeDrawer, hideDrawer
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  let location = useLocation();
  const iconList = [
    {primary:"Home", icon:<Home />, path:"/"},
    {primary:"Create", icon:<Create />, path:"/create"},
    {primary:"Profile", icon:<Person2 />, path:"/profile"},
    {primary:"Setting", icon:<Settings />, path:"/setting"},
  ];
  return (
    <Drawer
      sx={{
        display: { xs: display, sm: "block" },
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant={typeDrawer}
      anchor="left"
      open={true}
      onClose={() => {
        hideDrawer()
      }}
    >
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
          disablePadding
        >
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "light" ? "dark" : "light"
              );
              settheme(theme.palette.mode === "light" ? "dark" : "light");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7 sx={{ color: "orange" }} />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
        </ListItem>
        <Divider />


      {
        iconList.map((item) => {
          return (
          <ListItem
            disablePadding
            key={item.primary}
            sx={{
              bgcolor:
                // @ts-ignore
                location.pathname === item.path ? theme.palette.favcolor.main : null,
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemIcon>
                {item.icon} 
              </ListItemIcon>
              <ListItemText primary={item.primary} />
            </ListItemButton>
          </ListItem>);
        })
      }            


        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="LogOut" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Drawerr;
