import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { initialData } from "@/database/products";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";
import { FullScreenLoading } from "../components/ui/FullScreenLoading";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  const { products, isError, isLoading } = useProducts("/products");

  console.log({ products });

  return (
    <ShopLayout
      title={"SoulisStore - Home"}
      pageDescription={"Encuentra los mejores productos de SoulisStore aqui"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
