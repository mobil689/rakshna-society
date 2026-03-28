import { createBrowserRouter } from "react-router";
import { BlogList } from "./pages/BlogList";
import { BlogPost } from "./pages/BlogPost";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: BlogList,
  },
  {
    path: "/blog/:slug",
    Component: BlogPost,
  },
]);
