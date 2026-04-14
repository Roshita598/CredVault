import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    walletAddress: string;
  };
}

interface CustomJwtPayload extends JwtPayload {
  walletAddress: string;
}

function isCustomJwtPayload(payload: unknown): payload is CustomJwtPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "walletAddress" in payload &&
    typeof (payload as { walletAddress: unknown }).walletAddress === "string"
  );
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!isCustomJwtPayload(decoded)) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = {
      walletAddress: decoded.walletAddress,
    };

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
