import { HomePage } from "../pages/home";
import { Travel } from "../pages/travel";
import { Recipies } from "../pages/recipies";
import { VanLife } from "../pages/vanlife";

const authRoutes = [];

const blogRoutes = [
    {
        path: '/travel',
        exact: true,
        auth: false,
        component: Travel,
        name: 'Travel'
    },
    {
        path: '/recipies',
        exact: true,
        auth: false,
        component: Recipies,
        name: 'Recipies'
    },
    {
        path: '/vanlife',
        exact: true,
        auth: false,
        component: VanLife,
        name: 'VanLife'
    }
];

const mainRoutes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: HomePage,
        name: 'Home'
    }
];

const routes = [
    ...authRoutes,
    ...blogRoutes,
    ...mainRoutes
];

export default routes;