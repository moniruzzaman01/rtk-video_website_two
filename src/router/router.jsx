import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import Video from "../components/pages/Video";
import Edit from "../components/pages/Edit";
import Add from "../components/pages/Add";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/videos/:videoId",
        element: <Video />,
      },
      {
        path: "/videos/add",
        element: <Add />,
      },
      {
        path: "/videos/edit/:videoId",
        element: <Edit />,
      },
    ],
  },
]);

export default router;
