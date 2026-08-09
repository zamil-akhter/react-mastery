import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./Layout";
import { About, Contact, User, Home, Github } from "./components";
import { githubProfileData } from "./components/Home/Github";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//     ],
//   },
// ]);

// Other way to create a router with the same configuration using the `createRoutesFromElements` function
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route loader={githubProfileData} path="github/:userid" element={<Github />} />
      <Route path="user/:userid" element={<User />} />
    </Route>,
  ),
);

export default router;
