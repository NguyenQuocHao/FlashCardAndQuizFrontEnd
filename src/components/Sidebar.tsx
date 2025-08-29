import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { HOME_PATH, MY_LISTS_PATH } from "../const/paths.tsx";
import { useBearStore } from "../App.tsx";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const mobileOpen = useBearStore((state) => state.mobileOpen);
  const setMobileOpenToFalse = useBearStore(
    (state) => state.setMobileOpenToFalse
  );
  const setIsClosingToTrue = useBearStore((state) => state.setIsClosingToTrue);
  const setIsClosingToFalse = useBearStore(
    (state) => state.setIsClosingToFalse
  );

  const { window } = props;
  const menuList = [
    { text: "Home", icon: <InboxIcon />, link: HOME_PATH },
    { text: "My Lists", icon: <MailIcon />, link: MY_LISTS_PATH },
  ];

  const handleDrawerClose = () => {
    setIsClosingToTrue();
    setMobileOpenToFalse();
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosingToFalse();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((item) => (
          <a
            href={item.link}
            key={item.text}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
