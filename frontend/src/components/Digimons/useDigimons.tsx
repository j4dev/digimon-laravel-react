import { useEffect, useState } from "react";
import { DigimonsResponse, IDigimon, IPagination } from "../../types/digimon";
import { API } from "../../config/Apis";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { DigimonInfoResponse } from "../../types/digimonInfo";
import { useNavigate } from "react-router-dom";

const useDigimons = () => {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const handleChangePage=(_: React.ChangeEvent<unknown>, value: number)=>{
    setCurrentPage(value);
  }

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
    setIsLoading(true);
    const response = await fetch(`${API.DIGIMONS_API}?pageSize=20&page=${currentPage}`, {
      headers: {
        Authorization: token,
      },
    });

    const json: DigimonsResponse = await response.json();
    setDigimons(json.digimons);
    setPagination(json.pagination);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      fetchDigimonList();
    } else {
      navigate("/login");
    }
  }, [currentPage,isAuthenticated()]);

  return {
    digimons,
    pagination,
    isLoading,
    isModalLoading: modalLoading,
    open,
    handleClose,
    handleOpen,
    handleChangePage,
    digimonInfo,
  };
};

export default useDigimons;
