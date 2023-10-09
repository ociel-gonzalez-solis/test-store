import { ShopLayout } from "@/components/layouts";
import { ProductSlideShow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { dbProducts } from "@/database";
import { useProducts } from "@/hooks";
import { IProduct } from "@/interfaces";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { NextPage, GetServerSideProps,GetStaticPaths } from "next";
import { useRouter } from "next/router";

interface Props {
  product: IProduct;
}

const Product: NextPage<Props> = ({ product }) => {
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(
  //   `/products/${router.query.slug}`
  // );

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
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

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[3]}
                sizes={product.sizes}
              />
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await  // your fetch function here 

  return {
    paths: [
      {
        params: {
          
        }
      }
    ],
    fallback: "blocking"
  }
}

// ! NO usar SSR
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const product = await dbProducts.getProductBySlot(`${query.slug}`);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { product },
//   };
// };
