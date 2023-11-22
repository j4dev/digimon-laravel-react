import { Box, Modal, Typography } from "@mui/material";
import { IDigimon } from "../../types/digimon";
import DigimonInfo from "./DigimonInfo/DigimonInfo";
import useDigimons from "./useDigimons";
import ListSkeleton from "../Skeleton/ListSkeleton";
import style from "./Digimons.style";

const Digimons = () => {
  const { digimons, isLoading, handleClose, handleOpen, open } = useDigimons();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      <Box>
        <Typography
          sx={{
            textAlign: "center",
          }}
          variant="h5"
        >
          Digimons List
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill,minmax(15rem,1fr))",
        }}
      >
        {isLoading ? (
          <ListSkeleton />
        ) : (
          digimons.map((digimon: IDigimon) => (
            <DigimonInfo digimon={digimon} onClick={handleOpen} />
          ))
        )}
      </Box>
    </>
  );
};

export default Digimons;
