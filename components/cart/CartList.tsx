import { NextLink } from "@/constants";
import { initialData } from "@/database/products";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { CartContext } from "@/context/cart";
import { ICartProduct } from "@/interfaces";

// const productsInCart = initialData.products.slice(0, 3);

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateQuantity(product);
  };

  const removeProductInCart = (product: ICartProduct) => {
    removeCartProduct(product);
  }

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: 2 }}
        >
          <Grid item xs={3}>
            {/* TODO: Llevar a la pagina del producto */}
            <NextLink href={`/product/${product.slug}`} legacyBehavior>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>

          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product, value)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "productos" : "producto"}
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">${product.price}</Typography>
            {editable ? (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeProductInCart(product)}
              >
                Remover
              </Button>
            ) : null}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
