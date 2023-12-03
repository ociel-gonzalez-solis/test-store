import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRETE });
  // console.log(session);
  // if (!session){
  //   const requestedPage = req.nextUrl.pathname;
  //   const url           = req.nextUrl.clone();

  //   url.pathname = `/auth/login`;
  //   url.search   = `p=${requestedPage}`;
    
    // return NextResponse.redirect(url);
    // }

  const requestedPage = req.nextUrl.pathname;

  if (req.nextUrl.pathname.startsWith("/checkout/address")) {
    //* Informacion util de la session de next auth
    const session = await getToken({
      req   : req,
      secret: process.env.NEXTAUTH_SECRETE,
      raw   : true,
    });
    console.log(session);

    if (!session) {
      return NextResponse.redirect(new URL(`/auth/login?p=${requestedPage}`, req.url));
    }
  }

  // return NextResponse.redirect(new URL('/', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/address", "/checkout/summary"],
};