import { ShopLayout } from "@/components/layouts";
import { countries, customJWT } from "@/utils";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName : string;
  address  : string;
  address2 : string;
  zip      : string;
  city     : string;
  country  : string;
  phone    : string;
};

const AddressPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmitAddress = (data: FormData) => {

  }

  return (
    <ShopLayout
      title="Direccion"
      pageDescription="Confirmar direccion del destino"
    >
      <form onSubmit={handleSubmit(onSubmitAddress)}></form>
      <Typography variant="h1" component="h1">
        Direccion
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            variant="filled"
            fullWidth
            {...register("firstName", {
              required: "Este campo es requerido",
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Apellido"
            variant="filled"
            fullWidth
            {...register("lastName", {
              required: "Este campo es requerido",
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Direccion"
            variant="filled"
            fullWidth
            {...register("address", {
              required: "Este campo es requerido",
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Direccion 2 (opcional)"
            variant="filled"
            fullWidth
            {...register("address2")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Codigo Postal"
            variant="filled"
            fullWidth
            {...register("zip", {
              required: "Este campo es requerido",
            })}
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Ciudad"
            variant="filled"
            fullWidth
            {...register("city", {
              required: "Este campo es requerido",
            })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              variant="filled"
              label="Pais"
              value={"MEX"}
              {...register("country", {
                required: "Este campo es requerido",
              })}
              error={!!errors.country}
              // helperText={errors.country?.message}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Telefono"
            variant="filled"
            fullWidth
            {...register("phone", {
              required: "Este campo es requerido",
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button
          color="secondary"
          type="submit"
          className="circular-btn"
          size="large"
        >
          Revisar Pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token = "" } = req.cookies;
  let isValidToken = false;

  try {
    await customJWT.isValidToken(token);
    isValidToken = true;
  } catch (error) {
    isValidToken = false;
  }

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/auth/login?p=/checkout/address",
        permanent  : false,
      },
    };
  }

  return {
    props: {},
  };
};
