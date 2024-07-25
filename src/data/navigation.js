import { routes } from "@/constants/constant";

export const menus = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Search",
        path: "/search",
    },
    {
        id: 3,
        name: "About us",
        path: "/about",
    },
    {
        id: 4,
        name: "Contact us",
        path: "/contact",
    },
    {
        id: 5,
        name: "Sign up",
        path: routes.Register,
    },
    {
        id: 6,
        name: "Sign in",
        path: "/login",
    }
];
export const loggedInMenu = [
    {
        id: 1,
        name: "Home",
        path: "/",
    },
    {
        id: 2,
        name: "Search",
        path: "/search",
    },
    {
        id: 3,
        name: "Contact us",
        path: "/contact",
    },
    {
        id: 4,
        name: "About us",
        path: "/about",
    },
    {
        id: 5,
        name: "My Profile",
        path: "/my-profile",
    }
];
