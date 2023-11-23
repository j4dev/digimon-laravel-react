import { useState } from "react";
import { API } from "../../config/Apis";
import IUserResponse from "./Auth.interface";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisable(true);
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(API.USERS_API + "/register", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData: IUserResponse = await response.json();
        setDisable(false);
        setLoading(false);
        alert(responseData.message);
      } else {
        setDisable(false);
        setLoading(false);
        alert("No se pudo crear el usuario");
      }
    } catch {
      console.error("Error during registration");
    }
  };

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisable(true);
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(API.USERS_API + "/login", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData: IUserResponse = await response.json();
        signIn({
          token: responseData.token!,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: data.get("email") },
        });
        setDisable(false);
        setLoading(false);
        navigate("/digimons");
      } else {
        setDisable(false);
        setLoading(false);
        alert("No se pudo iniciar sesion");
      }
    } catch {
      console.error("Error during registration");
    }
  };

  return {
    login,
    register,
    isDisable: disable,
    isLoading: loading,
  };
};

export default useAuth;
