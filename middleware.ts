import { isValidToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const previousPage = req.nextUrl.pathname;

  // if (previousPage.startsWith("/checkout")) {
  //   const token = req.cookies.get("token")?.value;
  //   console.log(token);
  //   if (!token) {
  //     console.log('fallo');
  //     return NextResponse.redirect(
  //       new URL(`/auth/login?p=${previousPage}`, req.url)
  //     );
  //   }
  //   try {
  //     await isValidToken(token);
  //     return NextResponse.next();
  //   } catch (error) {
  //     console.log(error);
  //     return NextResponse.redirect(
  //       new URL(`/auth/login?p=${previousPage}`, req.url)
  //     );
  //   }
  // }
}

export const config = {
  matcher: ["/checkout/:path*"],
};



// export async function middleware2(req: NextRequest) {
//   const previousPage = req.nextUrl.pathname

//   if (previousPage.startsWith("/checkout")) {
//     const token = req.cookies.get("token")?.value
//     if (!token || !(await isValidToken(token))) {
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, req.url)
//       )
//     }

//     try {
//       await isValidToken(token)
//       return NextResponse.next()
//     } catch (error) {
//       return NextResponse.redirect(
//         new URL(`/auth/login?p=${previousPage}`, req.url)
//       )
//     }
//   }
// }