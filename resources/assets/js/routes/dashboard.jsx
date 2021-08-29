// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import BubbleChart from "@material-ui/icons/BubbleChart"
// core components/views
import DashboardPage from "../views/Dashboard/container"
import UserProfile from "../views/UserProfile/container"
import UserManagement from "../views/UserManagement/container"
import UserManagementForm from "../views/UserManagementForm/container"
import Category from "../views/Category/container"
import ItemForm from "../views/ItemForm/container"
import Item from "../views/Item/container"
import StockIn from '../views/StockIn/container'
import StockInForm from '../views/StockInForm/container'
import StockInReport from '../views/StockInReport/container'
import StockOut from '../views/StockOut/container'
import StockOutForm from '../views/StockOutForm/container'
import StockOutReport from '../views/StockOutReport/container'
import Stock from '../views/Stock/container'
import StockDetail from '../views/StockDetail/container'

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Beranda",
    navbarName: "Beranda",
    icon: Dashboard,
    component: DashboardPage,
  },
  {
    path: "/profile",
    sidebarName: "Profil Pengguna",
    navbarName: "Profil Pengguna",
    icon: Person,
    hide: true,
    component: UserProfile
  },
  {
    path: "/category",
    sidebarName: "Kategori",
    navbarName: "Kategori",
    icon: LibraryBooks,
    component: Category
  },
  {
    path: "/item/edit/:id",
    sidebarName: "Produk",
    navbarName: "Produk - Ubah",
    icon: BubbleChart,
    hide: true,
    component: ItemForm
  },
  {
    path: "/item/create",
    sidebarName: "Produk",
    navbarName: "Produk - Tambah Baru",
    icon: BubbleChart,
    hide: true,
    component: ItemForm
  },
  {
    path: "/item",
    sidebarName: "Produk",
    navbarName: "Produk",
    icon: BubbleChart,
    component: Item
  },
  {
    path: "/stock-in/edit/:id",
    sidebarName: "Barang Masuk",
    navbarName: "Barang Masuk - Ubah",
    icon: 'input',
    hide: true,
    component: StockInForm
  },
  {
    path: "/stock-in/create",
    sidebarName: "Barang Masuk",
    navbarName: "Barang Masuk - Tambah Baru",
    icon: 'input',
    hide: true,
    component: StockInForm
  },
  {
    path: "/stock-in/report",
    sidebarName: "Barang Masuk",
    navbarName: "Barang Masuk - Laporan",
    icon: 'input',
    hide: true,
    component: StockInReport
  },
  {
    path: "/stock-in/:id",
    sidebarName: "Barang Masuk",
    navbarName: "Barang Masuk - Detail",
    icon: 'input',
    hide: true,
    component: StockInForm
  },
  {
    path: "/stock-in",
    sidebarName: "Barang Masuk",
    navbarName: "Barang Masuk",
    icon: 'input',
    component: StockIn
  },
  {
    path: "/stock-out/edit/:id",
    sidebarName: "Barang Keluar",
    navbarName: "Barang Keluar - Ubah",
    icon: 'launch',
    hide: true,
    component: StockOutForm
  },
  {
    path: "/stock-out/create",
    sidebarName: "Barang Keluar",
    navbarName: "Barang Keluar - Tambah Baru",
    icon: 'launch',
    hide: true,
    component: StockOutForm
  },
  {
    path: "/stock-out/report",
    sidebarName: "Barang Keluar",
    navbarName: "Barang Keluar - Laporan",
    icon: 'launch',
    hide: true,
    component: StockOutReport
  },
  {
    path: "/stock-out/:id",
    sidebarName: "Barang Keluar",
    navbarName: "Barang Keluar - Detail",
    icon: 'launch',
    hide: true,
    component: StockOutForm
  },
  {
    path: "/stock-out",
    sidebarName: "Barang Keluar",
    navbarName: "Barang Keluar",
    icon: 'launch',
    component: StockOut
  },
  {
    path: "/stock-on-hand/:id",
    sidebarName: "Kartu Stok",
    navbarName: "Kartu Stok",
    icon: 'swap_horiz',
    hide: true,
    component: StockDetail
  },
  {
    path: "/stock-on-hand",
    sidebarName: "Stok Opname",
    navbarName: "Stok Opname",
    icon: 'swap_horiz',
    component: Stock
  },
  {
    path: "/user/edit/:id",
    sidebarName: "Pengguna",
    navbarName: "Pengguna - Ubah",
    icon: Person,
    hide: true,
    component: UserManagementForm
  },
  {
    path: "/user/create",
    sidebarName: "Pengguna",
    navbarName: "Pengguna - Tambah Baru",
    icon: Person,
    hide: true,
    component: UserManagementForm
  },
  {
    path: "/user",
    sidebarName: "Pengguna",
    navbarName: "Pengguna",
    icon: Person,
    component: UserManagement
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
