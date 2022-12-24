import { HomePage } from "../pages/home";
import { TravelBlogPage } from "../pages/blog/travel";
import { RecipiesBlogPage } from "../pages/blog/recipies";
import { VanLifeBlogPage } from "../pages/blog/vanlife";
import { AboutPage } from "../pages/about";
import { ContactPage } from "../pages/contact";
import { EditBlogPostPage } from "../pages/blog/edit";
import { BlogPostPage } from "../pages/blog";

const authRoutes = [
    
];

const blogRoutes = [
    {
        path: '/blog/travel',
        exact: true,
        auth: false,
        component: TravelBlogPage,
        name: 'Travel'
    },
    {
        path: '/blog/recipies',
        exact: true,
        auth: false,
        component: RecipiesBlogPage,
        name: 'Recipies'
    },
    {
        path: '/blog/vanlife',
        exact: true,
        auth: false,
        component: VanLifeBlogPage,
        name: 'VanLife'
    },
    {
        path: '/blog/post/:id',
        exact: true,
        auth: false,
        component: BlogPostPage,
        name: 'BlogPost'
    },
    {
        path: '/blog/edit',
        exact: true,
        auth: true,
        component: EditBlogPostPage,
        name: 'CreateBlogPost'
    },
    {
        path: '/blog/edit/:id',
        exact: true,
        auth: true,
        component: EditBlogPostPage,
        name: 'EditBlogPost'
    }
];

const mainRoutes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: HomePage,
        name: 'Home'
    },
    {
        path: '/about',
        exact: true,
        auth: false,
        component: AboutPage,
        name: 'About'
    },
    {
        path: '/contact',
        exact: true,
        auth: false,
        component: ContactPage,
        name: 'Contact'
    }
];

const routes = [
    ...authRoutes,
    ...blogRoutes,
    ...mainRoutes
];

export default routes;