import { Box, Grid, Pagination, Typography } from "@mui/material";
import { IDigimon } from "../../types/digimon";
import DigimonInfo from "./DigimonInfo/DigimonInfo";
import useDigimons from "./useDigimons";
import ListSkeleton from "../Skeleton/ListSkeleton";
import ModalInfo from "./DigimonInfo/ModalInfo";
import { LoadingButton } from "@mui/lab";
import useAuth from "../Auth/useAuth";

const Digimons = () => {
  const { logOut, isDisable, isLoading: loading } = useAuth();
  const {
    digimons,
    pagination,
    isLoading,
    handleClose,
    handleOpen,
    open,
    digimonInfo,
    isModalLoading,
    handleChangePage,
  } = useDigimons();

  return (
    <>
      <ModalInfo
        digimonInfo={digimonInfo!}
        open={open}
        handleClose={handleClose}
        loading={isModalLoading}
      />

      <Box component="form" noValidate onSubmit={logOut} sx={{ mt: 3 }}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <LoadingButton
              type="submit"
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisable}
              loading={loading}
              loadingPosition="end"
            >
              Cerrar sesión
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: 3,
          }}
          variant="h4"
        >
          Digimons List
        </Typography>
      </Box>

      <Pagination
        sx={{
          marginTop: 3,
          marginBottom: 3,
        }}
        defaultPage={1}
        count={pagination?.totalPages}
        size="large"
        onChange={handleChangePage}
        showFirstButton
        showLastButton
      ></Pagination>

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
