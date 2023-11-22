import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Container, CssBaseline, Grid, Link, TextField } from "@mui/material";
import useAuth from "../useAuth";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Login() {
const { login, isDisable,isLoading } = useAuth();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDisable}
            loading={isLoading}
            loadingPosition="end"
          >
            Iniciar sesión
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Crear una nueva cuenta.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
