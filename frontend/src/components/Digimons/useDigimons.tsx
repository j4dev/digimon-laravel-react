import { useEffect, useState } from "react";
import { DigimonsResponse, IDigimon } from "../../types/digimon";
import { API } from "../../config/Apis";
import { useAuthHeader } from "react-auth-kit"

const useDigimons = () => {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [isLoading,setIsLoading]= useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const authHeader = useAuthHeader();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = authHeader();
      const headers = new Headers();
headers.append("Authorization", token);
      const response = await fetch(API.DIGIMONS_API + "?pageSize=20",
      
      {
        headers
      });

      const json: DigimonsResponse = await response.json();
      setDigimons(json.digimons);
      setIsLoading(false);
    };

    fetchData();
  },[]);

  return {
    digimons,
    isLoading,
    open,
    handleClose,
    handleOpen
  };
};

export default useDigimons;
