import { AuthLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router           = useRouter();
  const { registerUser } = useContext(AuthContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError]                         = useState<boolean>(false);
  const [errorMessage, setErrorMessage]                   = useState<string>('');
  
  const onRegisterFrom = async ({ name, email, password }: FormData) => {
    setShowError((prev) => false);

    const {hasError, message} = await registerUser(name, email, password);

    if (hasError) {
      setShowError((prev) => true);
      setErrorMessage((prev) => message!);
      setTimeout(() => setShowError((prev) => false), 3000);
      return;
    }
    // const destination = router.query.p?.toString() || '/'
    // router.replace(destination);
    await signIn('credentials', {email, password});
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onRegisterFrom)}>
        <Box sx={{ width: 300, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1" textAlign="center">
                Crear cuenta
              </Typography>
              <Chip
                label="No reconocemos este usuario / secreto"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre completo"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "Al menos 2 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Secreto"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: { value: 5, message: "Al menos 5 caracteres" },
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
                Registrar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : "/auth/login"
                }
                legacyBehavior
                passHref
              >
                <Link underline="always">Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const session = await getSession({req});
  // console.log(session);

  const {p = '/'} = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent  : false,
      }
    }
  }

  return {
    props: {

    }
  }
}

export default RegisterPage;
