import { soulisStoreApi } from "@/api";
import { AuthLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import { validations } from "@/utils";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    try {
      const { data } = await soulisStoreApi.post("/user/login", {
        email,
        password,
      });
      const {token, user} = data;
      console.log({token, user});
    } catch (error) {
      console.log('Error de credenciales');
    }
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 300, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Iniciar sesion
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                type="email"
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Secreto"
                variant="filled"
                fullWidth
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "Al menos 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/register" legacyBehavior passHref>
                <Link underline="always">No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
