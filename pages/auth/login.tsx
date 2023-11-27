import { GetServerSideProps } from "next";
import { signIn, getSession, getProviders } from "next-auth/react";
import { AuthLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import { AuthContext } from "@/context";
import { validations } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email   : string;
  password: string;
};

const LoginPage = () => {
  const router        = useRouter()
  const { loginUser } = useContext(AuthContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError]                         = useState<boolean>(false);
  const [providers, setProviders]                         = useState<any>({});


  useEffect(() => {
    getProviders().then(prov => {
      setProviders(prov);
    })
  }, [])
  

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError((prev) => false);
    await signIn('credentials', {email, password});
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
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                legacyBehavior
                passHref
              >
                <Link underline="always">No tienes cuenta?</Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
              <Divider sx={{width: '100%', mb: 2}} />
              {
                Object.values(providers)
                .filter((provider: any) => provider.id !== 'credentials')
                .map((provider: any) => {

                  // if(provider.id === 'credentials') return (<div key="credentials"></div>);
                  
                  return  (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color='primary'
                      sx={{mb: 1}}
                      onClick={()=> signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  )
                })
              }
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

export default LoginPage;
