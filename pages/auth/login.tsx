import { AuthLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

const LoginPage = () => (
  <AuthLayout title={"Ingresar"}>
    <Box sx={{ width: 300, padding: "10px 20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" textAlign="center">
            Iniciar sesion
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Correo" variant="filled" fullWidth />
          <TextField
            label="Secreto"
            type="password"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            fullWidth
          >
            Ingresar
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <NextLink href="/checkout/address" legacyBehavior passHref>
            <Link underline="always">No tienes cuenta?</Link>
          </NextLink>
        </Grid>
      </Grid>
    </Box>
  </AuthLayout>
);

export default LoginPage;
