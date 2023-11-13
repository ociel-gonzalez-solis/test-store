import { CartList } from "@/components/cart/CartList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ShopLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
} from "@mui/material";
import { useContext } from "react";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  const num_items = numberOfItems === 1 ? "Producto" : "Productos";

  if (!shippingAddress) {
    return <></>;
  }

  const {
    firstName,
    lastName,
    address,
    address2,
    zip,
    city,
    country,
    phone,
  } = shippingAddress;



  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({numberOfItems} {num_items})
              </Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>
                <NextLink href="/checkout/address" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address} {address2 ? `, ${address2}` : ""}
              </Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find(c => c.code === country)!.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
