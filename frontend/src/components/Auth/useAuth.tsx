import { useState } from "react";
import { API } from "../../config/Apis";
import IUserResponse from "./Auth.interface";
import { useSignIn, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";

const useAuth = () => {
  const [disable, setDisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageResponse,setMessageResponse] = useState("");
  const [showSuccess,setShowSuccess] = useState<boolean>(false); 
  const [showError,setShowError] = useState<boolean>(false);
  const signOut = useSignOut()
  const authHeader = useAuthHeader();
  const token = authHeader();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisable(true);
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${API.USERS_API}/register`, {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const responseData: IUserResponse = await response.json();
        setMessageResponse(`${responseData.message}. Ya puede iniciar sesión. 👇`);
        setShowSuccess(true);
        setShowError(false);
        setDisable(false);
        setLoading(false);
      } else {
        const responseData: IUserResponse = await response.json();
        setMessageResponse(`${responseData.details?.email[0]} Valida los datos.`);
        setShowError(true);
        setShowSuccess(false);
        setDisable(false);
        setLoading(false);
      }
    } catch {
      console.error("No se pudo crear el usuario");
    }
  };

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisable(true);
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${API.USERS_API}/login`, {
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
      console.error("No se pudo iniciar sesión. Intentelo mas tarde.");
    }
  };

  const logOut = async(event: React.FormEvent<HTMLFormElement>) =>{
    setDisable(true);
    setLoading(true);
    event.preventDefault();

    try {
      const response = await fetch(`${API.USERS_API}/logout`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        signOut();
        setDisable(false);
        setLoading(false);
        navigate("/login");
      } else {
        setDisable(false);
        setLoading(false);
        alert("No se pudo iniciar sesion");
      }
    } catch {
      console.error("No se pudo cerrar sesión correctamente");
    }
  }

  return {
    login,
    logOut,
    register,
    messageResponse,
    showSuccess,
    showError,
    isDisable: disable,
    isLoading: loading,
  };
};

export default useAuth;
