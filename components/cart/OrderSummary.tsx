import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container sx={{ mt: 3 }}>
      <Grid item xs={6}>
        <Typography>No. Products</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${1553.53}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuesto (15%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${53.53}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">${1584.04}</Typography>
      </Grid>
    </Grid>
  );
};
