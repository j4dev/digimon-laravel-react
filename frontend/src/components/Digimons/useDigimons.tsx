import { useEffect, useState } from "react";
import { DigimonsResponse, IDigimon } from "../../types/digimon";
import { API } from "../../config/Apis";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { DigimonInfoResponse } from "../../types/digimonInfo";
import { useNavigate } from "react-router-dom";

const useDigimons = () => {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [digimonInfo, setDigimonInfo] = useState<DigimonInfoResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalLoading, setModalLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authHeader = useAuthHeader();
  const token = authHeader();
  const isAuthenticated = useIsAuthenticated();

  const handleOpen = (id: number) => {
    setOpen(true);
    fetchDigimonInfo(id);
  };
  const handleClose = () => setOpen(false);

  const fetchDigimonInfo = async (id: number) => {
    setModalLoading(true);
    const response = await fetch(`${API.DIGIMONS_API}/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    const json: DigimonInfoResponse = await response.json();
    setDigimonInfo(json);
    setModalLoading(false);
    setIsLoading(false);
  };

  const fetchDigimonList = async () => {
    const response = await fetch(`${API.DIGIMONS_API}?pageSize=20`, {
      headers: {
        Authorization: token,
      },
    });

    const json: DigimonsResponse = await response.json();
    setDigimons(json.digimons);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchDigimonList();
    } else {
      navigate("/login");
    }
  }, []);

  return {
    digimons,
    isLoading,
    isModalLoading: modalLoading,
    open,
    handleClose,
    handleOpen,
    digimonInfo,
  };
};

export default useDigimons;
