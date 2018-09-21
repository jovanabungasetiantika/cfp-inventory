// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "../views/Dashboard/container.jsx";
import UserProfile from "../views/UserProfile/container";
import TableList from "../views/TableList/TableList.jsx";
import Category from "../views/Category/container.jsx";
import ItemForm from "../views/ItemForm/container.jsx";
import Typography from "../views/Typography/Typography.jsx";
import Icons from "../views/Icons/Icons.jsx";
import Item from "../views/Item/container.jsx";
import Maps from "../views/Maps/Maps.jsx";
import NotificationsPage from "../views/Notifications/Notifications.jsx";
import StockIn from '../views/StockIn/container'
import StockInForm from '../views/StockInForm/container'
import StockInReport from '../views/StockInReport/container'
import StockOut from '../views/StockOut/container'
import StockOutForm from '../views/StockOutForm/container'
import StockOutReport from '../views/StockOutReport/container'
import Stock from '../views/Stock/container'
import StockDetail from '../views/StockDetail/container'
// import UpgradeToPro from "../views/UpgradeToPro/UpgradeToPro.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    hide: true,
    component: UserProfile
  },
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: "content_paste",
  //   component: TableList
  // },
  {
    path: "/category",
    sidebarName: "Category",
    navbarName: "Category",
    icon: LibraryBooks,
    component: Category
  },
  {
    path: "/item/edit/:id",
    sidebarName: "Item",
    navbarName: "Item - Edit",
    icon: BubbleChart,
    hide: true,
    component: ItemForm
  },
  {
    path: "/item/create",
    sidebarName: "Item",
    navbarName: "Item - Add New",
    icon: BubbleChart,
    hide: true,
    component: ItemForm
  },
  {
    path: "/item",
    sidebarName: "Item",
    navbarName: "Item",
    icon: BubbleChart,
    component: Item
  },
  {
    path: "/stock-in/edit/:id",
    sidebarName: "Stock In",
    navbarName: "Stock In - Edit",
    icon: 'input',
    hide: true,
    component: StockInForm
  },
  {
    path: "/stock-in/create",
    sidebarName: "Stock In",
    navbarName: "Stock In - Add New",
    icon: 'input',
    hide: true,
    component: StockInForm
  },
  {
    path: "/stock-in/report",
    sidebarName: "Stock In",
    navbarName: "Stock In - Report",
    icon: 'input',
    hide: true,
    component: StockInReport
  },
  {
    path: "/stock-in/:id",
    sidebarName: "Stock In",
    navbarName: "Stock In - Detail",
    icon: 'input',
    hide: true,
    component: StockInForm
  },
  {
    path: "/stock-in",
    sidebarName: "Stock In",
    navbarName: "Stock In",
    icon: 'input',
    component: StockIn
  },
  {
    path: "/stock-out/edit/:id",
    sidebarName: "Stock Out",
    navbarName: "Stock Out - Edit",
    icon: 'launch',
    hide: true,
    component: StockOutForm
  },
  {
    path: "/stock-out/create",
    sidebarName: "Stock Out",
    navbarName: "Stock Out - Add New",
    icon: 'launch',
    hide: true,
    component: StockOutForm
  },
  {
    path: "/stock-out/report",
    sidebarName: "Stock Out",
    navbarName: "Stock Out - Report",
    icon: 'launch',
    hide: true,
    component: StockOutReport
  },
  {
    path: "/stock-out/:id",
    sidebarName: "Stock Out",
    navbarName: "Stock Out - Detail",
    icon: 'launch',
    hide: true,
    component: StockOutForm
  },
  {
    path: "/stock-out",
    sidebarName: "Stock Out",
    navbarName: "Stock Out",
    icon: 'launch',
    component: StockOut
  },
  {
    path: "/stock-on-hand/:id",
    sidebarName: "Stock Card",
    navbarName: "Stock Card",
    icon: 'swap_horiz',
    hide: true,
    component: StockDetail
  },
  {
    path: "/stock-on-hand",
    sidebarName: "Stock In Hand",
    navbarName: "Stock In Hand",
    icon: 'swap_horiz',
    component: Stock
  },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   sidebarName: "Upgrade To PRO",
  //   navbarName: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
