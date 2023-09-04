import Head from "next/head";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl ? <meta name="og:image" content={imageFullUrl} /> : null}
      </Head>
      <nav>{/* TODO: Navbar */}</nav>

      {/* TODO: SideBar */}

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        {children}
      </main>

      <footer>{/* TODO: Navbar */}</footer>
    </>
  );
};
