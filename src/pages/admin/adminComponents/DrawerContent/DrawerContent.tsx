import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { pageList } from "./page-list-config";
import CategoryIcon from "@mui/icons-material/Category";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";

export const DrawerContent = () => {
  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/products">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={pageList?.[0]?.title} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/coupons">
            <ListItemIcon>
              <ConfirmationNumberIcon />
            </ListItemIcon>
            <ListItemText primary={pageList?.[1]?.title} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/orders">
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={pageList?.[2]?.title} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};
