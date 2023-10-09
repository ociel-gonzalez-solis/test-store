import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";
import { useProducts } from "@/hooks";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const GenderPage = () => {
  const router = useRouter();

  const { gender = "all" } = router.query;
  console.log(gender);

  const genderCategory = `${
    gender.toString().charAt(0).toUpperCase() + gender.slice(1)
  }`;

  const { products, isLoading } = useProducts(`/products?gender=${gender}`);

  return (
    <ShopLayout
      title={"Teslo Shop - " + genderCategory}
      pageDescription={"Find the best product of teslo here"}
    >
      <Typography variant="h1" component="h1">
        {genderCategory}
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {genderCategory} products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default GenderPage;
