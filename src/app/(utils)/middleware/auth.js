// import { NextResponse } from "next/server";
// import { verifyToken } from "../auth/auth";

// export function authMiddleware(handler) {
//   return async (req, params) => {
//     const authHeader = req.headers.get("Authorization");

//     if (!authHeader) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const user = verifyToken(token);

//     if (!user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Attach user to request
//     req.user = user;

//     return handler(req, params);
//   };
// }
import { NextResponse } from "next/server";
import { verifyToken } from "../auth/auth";

export function authMiddleware(handler) {
  return async (req, params) => {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Attach user to request
    req.user = user;

    return handler(req, params);
  };
}

export const config = {
  matcher: [
    "/api/authCheck",
    "/api/post/create",
    "/api/user/me",
    "/api/post/fetch-posts",
  ], // Apply to specific route or routes
};
