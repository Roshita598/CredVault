import type { Request, Response } from "express";
import nacl from "tweetnacl";
import bs58 from "bs58";
import jwt from "jsonwebtoken";

const nonces = new Map<string, string>();

export const getNonce = (req: Request, res: Response) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "walletAddress required" });
  }

  const nonce = Math.random().toString(36).substring(2);

  nonces.set(walletAddress, nonce);

  res.json({
    message: `Sign this message to authenticate: ${nonce}`,
  });
};

export const verifySignature = (req: Request, res: Response) => {
  const { walletAddress, signature } = req.body;

  if (!walletAddress || !signature) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const nonce = nonces.get(walletAddress);

  if (!nonce) {
    return res.status(400).json({ error: "Nonce not found" });
  }

  const message = `Sign this message to authenticate: ${nonce}`;

  const isValid = nacl.sign.detached.verify(
    new TextEncoder().encode(message),
    bs58.decode(signature),
    bs58.decode(walletAddress),
  );

  if (!isValid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const token = jwt.sign(
    { walletAddress },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1d" },
  );

  nonces.delete(walletAddress);

  res.json({ token });
};
