import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Auth/login/Login';
import Register from "./components/Auth/register/Register";
import { RequireAuth } from "react-auth-kit";
import Digimons from "./components/Digimons/Digimons";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/digimons"
          element={
            <RequireAuth loginPath="/login">
              <Digimons />
            </RequireAuth>
          }
        />
        <Route path={"/"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
