import { useEffect, useState } from "react";
import { DigimonsResponse, IDigimon } from "../../types/digimon";
import { API } from "../../config/Apis";

const useDigimons = () => {
  const [digimons, setDigimons] = useState<IDigimon[]>([]);
  const [isLoading,setIsLoading]= useState<boolean>(true);

  const buildUrlWithQueryParams = (
    baseUrl: string,
    queryParams: Record<string, string>,
  ): string => {
    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`,
      )
      .join("&");

    return `${baseUrl}?${queryString}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API.GET_LIST_DIGIMON + "?pageSize=20");

      const json: DigimonsResponse = await response.json();
      setDigimons(json.digimons);
      setIsLoading(false);
    };

    fetchData();
  },[]);

  return {
    digimons,
    isLoading
  };
};

export default useDigimons;
