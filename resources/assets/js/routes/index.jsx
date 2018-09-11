import Dashboard from "../layouts/Dashboard/container";
import Login from '../views/Login/container';
import Register from '../views/Register/container';

const indexRoutes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: "/", component: Dashboard },
];

export default indexRoutes;
