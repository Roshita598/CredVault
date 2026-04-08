import type { KYCSession } from "../types/kyc.types.js";

const kycStore = new Map<string, KYCSession>();

export const createKYCSession = (walletAddress: string) => {
  const session: KYCSession = {
    id: Math.random().toString(36).substring(2),
    walletAddress,
    status: "pending",
  };

  kycStore.set(walletAddress, session);

  return {
    session,
    url: `https://mock-kyc.com/session/${session.id}`,
  };
};

export const getKYCStatus = (walletAddress: string) => {
  return kycStore.get(walletAddress);
};

export const completeKYC = (walletAddress: string) => {
  const session = kycStore.get(walletAddress);

  if (session) {
    session.status = "approved";
    kycStore.set(walletAddress, session);
  }

  return session;
};
