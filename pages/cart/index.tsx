import React, { useContext, useEffect } from "react";
import { ShopLayout } from "@/components/layouts";
import { CartContext } from "@/context";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CartList } from "../../components/cart/CartList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { useRouter } from "next/router";

const CartPage = () => {
  const { isLoaded, numberOfItems, cart } = useContext(CartContext);
  const router                            = useRouter();

  useEffect(() => {
    if (isLoaded && !numberOfItems) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!numberOfItems) {
    router.replace("/cart/empty");
    return null; // Evita el renderizado temporal del componente
  }

  return (
    <ShopLayout
      title="Carrito - 3"
      pageDescription="Carrito de compras de la tienda"
    >
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>

      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  href="/checkout/address"
                  className="circular-btn"
                  fullWidth
                >
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

export default CartPage;
