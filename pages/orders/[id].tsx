import { CartList } from "@/components/cart/CartList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { ShopLayout } from "@/components/layouts";
import { NextLink } from "@/constants";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Link,
  Chip,
} from "@mui/material";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Resumen de orden 254"
      pageDescription="Resumen de la orden 254"
    >
      <Typography variant="h1" component="h1">
        Orden ABC123
      </Typography>

      {/* <Chip
        sx={{ my:2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Orden Pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>
                <NextLink href="/checkout/address" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Ociel Gonzalez Solis</Typography>
              <Typography>323 Villa Bonita</Typography>
              <Typography>Calle Primera, 22885</Typography>
              <Typography>Baja California</Typography>
              <Typography>+1 854 242 4545</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" legacyBehavior passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* TODO */}
                <h1>Pagar</h1>

                <Chip
                  sx={{ my: 2 }}
                  label="Orden Pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
