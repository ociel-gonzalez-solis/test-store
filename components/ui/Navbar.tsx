import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Link,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";

import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UIContext } from "@/context";

export const Navbar = () => {
  const router             = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const activeLink         = (href: string) =>
    href === router.asPath ? "primary" : "info";

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Soulis |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop |</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href="/category/men" passHref legacyBehavior>
            <Link>
              <Button variant="contained" color={activeLink("/category/men")}>
                Hombres
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/women" passHref legacyBehavior>
            <Link>
              <Button color={activeLink("/category/women")}>Mujeres</Button>
            </Link>
          </NextLink>

          <NextLink href="/category/kid" passHref legacyBehavior>
            <Link>
              <Button color={activeLink("/category/kid")}>Chicos</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref legacyBehavior>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
