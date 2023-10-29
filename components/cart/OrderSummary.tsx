import { useContext } from "react";
import { CartContext } from "@/context/cart";
import { Grid, Typography } from "@mui/material";
import { currency } from "@/utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  const taxRate = +process.env.NEXT_PUBLIC_TAX_RATE! || 0;


  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "productos" : "producto"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuesto ({taxRate*100}%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
