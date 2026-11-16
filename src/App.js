import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./assets/fontawesome-pro-6.1.0-web/css/all.css";
import "./App.css";
import Login from "./pages/Authentification/Login/Login";
import OublierMotDePass from "./pages/Authentification/OublierMotDePass/OublierMotDePass";
import MessageEnvoyer from "./pages/Authentification/MessageEnvoyer/MessageEnvoyer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404/notFound";
import Home from "./pages/home/sites";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from "./pages/Authentification/AuthGard/ProtectedRoutes";
import Templates from "./pages/templatesite/templates";
import axios from "axios";
import Editor from "./pages/editor/editor";
import {  logout } from "./redux/features/user";
import Cookies from "universal-cookie";
import TemplatePreview from "./components/templatePreview/TemplatePreview";
import { useEffect } from "react";
import Sitepreview from "./components/SitePreview/Sitepreview";
import SitePreviewClient from "./components/SitePreviewClient/SitePreviewClient";
import GestionClient from "./components/clientequipe/gestionclient/GestionClient";

// import { Toaster } from "react-hot-toast";
// import StatsClient from "./pages/stats/statsClient/StatsClient";
import StatistiqueGlobal from "./components/StatistiqueGlobal/StatistiqueGlobal";
import Detailclient from "./components/clientequipe/gestionclient/detailclient/Detailclient";
import Autorisation from "./components/clientequipe/gestionmembre/Autorisation";
import StatistiqueClient from "./components/StatistiqueClient/StatistiqueClient";
import SiteListClient from "./components/clientequipe/gestionclient/siteListClient/siteListClient";
import LoginClient from "./pages/Authentification/Login/LoginClient";
import EditorClient from "./pages/editor/editorClient";
import ProtectedRoutesClient from "./pages/Authentification/AuthGard/ProtectedRoutesClient";
import Modelpersonalise from "./components/modelpersonalise/modelpersonalise";
import toast from "react-hot-toast";

function App() {
  const cookies = new Cookies();
  axios.defaults.withCredentials = true;
  const state = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  // Add a request interceptor
  axios.interceptors.request.use(async (config) => {
    config.headers["Authorization"] = cookies.get("authorization");
    config.headers["Refresh"] = cookies.get("refresh");

    return config;
  });

  // Add a response interceptor
  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
    function (error) {
      if (
        typeof error.response.status != "undefined" &&
        error.response.status == 401
      ) {
        dispatch(logout());
        //window.location.href = "/login";
      } 
      else {
        return Promise.reject(error);
      }
    }
  );
  // const handleClearConsole = () => {
  //   console.clear();
  // };
  // useEffect(() => {
  // handleClearConsole();
  // });

  return (
    <div className="App content-desk" id="app">
      <BrowserRouter>
        <Routes>
          <Route
            index
            path={"/"}
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            index
            path={"/sites"}
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            index
            path={"/accueil"}
            element={
              <ProtectedRoutesClient>
                <SiteListClient />
              </ProtectedRoutesClient>
            }
          />
          <Route
            index
            path={"/clientequipe/gestionclient"}
            element={
              <ProtectedRoutes>
                <GestionClient />
              </ProtectedRoutes>
            }
          />
          <Route
            index
            path={"/clientequipe/autorisation"}
            element={
              <ProtectedRoutes>
                <Autorisation />
              </ProtectedRoutes>
            }
          />
          <Route
            path={"/clientequipe/gestionclient/detailclient/:id"}
            element={
              <ProtectedRoutes>
                <Detailclient />
              </ProtectedRoutes>
            }
          />
          {/* <Route
            path="/StatsGlobal"
            element={
              <ProtectedRoutes>
                <StatsGlobal />
              </ProtectedRoutes>
            }
          /> 
            <Route
            path="/StatsClient"
            element={
              <ProtectedRoutes>
                <StatsClient />
              </ProtectedRoutes>
            }
          />     */}

          <Route
            path="/statistiqueclient"
            element={
              <ProtectedRoutesClient>
                <StatistiqueClient />
              </ProtectedRoutesClient>
            }
          /> 
          <Route
            path="/modelpersonalise"
            element={
              <ProtectedRoutes>
                <Modelpersonalise />
                </ProtectedRoutes>
            }
          />
          <Route
            path="/statistiqueglobal"
            element={
              <ProtectedRoutes>
                <StatistiqueGlobal />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/sites/templates"
            element={
              <ProtectedRoutes>
                <Templates />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editor/:siteId/:type/:pageId"
            element={
              <ProtectedRoutes>
                <Editor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editor/:siteId/:type"
            element={
              <ProtectedRoutes>
                <Editor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editorclient/:siteId/:type/:pageId"
            element={
              <ProtectedRoutesClient>
                <EditorClient />
              </ProtectedRoutesClient>
            }
          />
          <Route
            path="/preview/:siteId"
            element={
              <ProtectedRoutes>
                <Sitepreview className={"active"} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/previewclient/:siteId"
            element={<SitePreviewClient className={"active"} />}
          />
          <Route
            path="/template/:Id"
            element={
              <ProtectedRoutes>
                <TemplatePreview />
              </ProtectedRoutes>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/loginclient/:token" element={<LoginClient />} />
          <Route path="/oubliermotdepass" element={<OublierMotDePass />} />
          <Route path="/messageenvoyer" element={<MessageEnvoyer />} />
          {/*              
            <Route path="Clients" element={<Clients />} />
            <Route path="Statistique" element={<Statistique />} />
          
            <Route path="/editor/:siteId/:pageId" element={<Editor />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
