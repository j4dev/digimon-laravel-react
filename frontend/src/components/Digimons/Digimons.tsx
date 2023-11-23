import { Box, Typography } from "@mui/material";
import { IDigimon } from "../../types/digimon";
import DigimonInfo from "./DigimonInfo/DigimonInfo";
import useDigimons from "./useDigimons";
import ListSkeleton from "../Skeleton/ListSkeleton";
import ModalInfo from "./DigimonInfo/ModalInfo";

const Digimons = () => {
  const {
    digimons,
    isLoading,
    handleClose,
    handleOpen,
    open,
    digimonInfo,
    isModalLoading,
  } = useDigimons();

  return (
    <>
      <ModalInfo
        digimonInfo={digimonInfo!}
        open={open}
        handleClose={handleClose}
        loading={isModalLoading}
      />

      <Box>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: 3,
          }}
          variant="h5"
        >
          Digimons List
        </Typography>
      </Box>
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill,minmax(15rem,1fr))",
          }}
        >
          {digimons.map((digimon: IDigimon) => (
            <DigimonInfo
              key={digimon.id}
              digimon={digimon}
              onClick={() => handleOpen(digimon.id)}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default Digimons;
