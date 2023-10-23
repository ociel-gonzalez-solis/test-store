import { useContext, useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductSlideShow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";

import { dbProducts } from "@/database";
import { ICartProduct, IProduct } from "@/interfaces";
import { ISize } from "@/types";
import { CartContext } from "@/context/cart";

interface Props {
  product: IProduct;
}

const Product: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const {addProductToCart} = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id     : product._id,
    images  : product.images[0],
    price   : product.price,
    size    : undefined,
    slug    : product.slug,
    title   : product.title,
    gender  : product.gender,
    quantity: 1,
  });

  const addProduct = () => {
    if (!tempCartProduct.size) return;
    
    addProductToCart(tempCartProduct);
    router.push('/cart')
  };

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((prevCartProduct) => ({
      ...prevCartProduct,
      size,
    }));
  };

  const updatedQuantity = (quantity: number) => {
    setTempCartProduct((prevCartProduct) => ({
      ...prevCartProduct,
      quantity,
    }));
  };

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={updatedQuantity}
                maxValue={
                  product.inStock < tempCartProduct.quantity
                    ? tempCartProduct.quantity
                    : product.inStock
                }
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
              />
            </Box>
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={addProduct}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}

            {/* Agregar al Carrito */}
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
  const productSlugs = await dbProducts.getAllProductsBySlot();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlot(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
