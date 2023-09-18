import { ShopLayout } from "@/components/layouts";
import { initialData } from "@/database/products";
import { Grid } from "@mui/material";

const product = initialData.products[0];

const Product = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* SlideShow */}
        </Grid>
        <Grid item xs={12} sm={5}>
          
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default Product;
