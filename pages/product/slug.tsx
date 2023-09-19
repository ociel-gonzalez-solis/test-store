import { ShopLayout } from "@/components/layouts";
import { initialData } from "@/database/products";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

const product = initialData.products[0];

const Product = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* SlideShow */}
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Title */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>

            <Typography variant="subtitle1" component="h2">
              {`$${product.price}`}
            </Typography>

            <Box>
              <Typography variant="subtitle2">Cantidad</Typography>
              {/* ItemCounter */}
            </Box>

            {/* Agregar al Carrito */}
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>

            <Chip label="No hay disponibles" color="error" variant="outlined" />
            {/* Desc */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default Product;
