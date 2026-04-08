export type KYCStatus = "pending" | "approved" | "rejected";

export interface KYCStartRequest {
  walletAddress: string;
}

export interface KYCSession {
  id: string;
  walletAddress: string;
  status: KYCStatus;
}
