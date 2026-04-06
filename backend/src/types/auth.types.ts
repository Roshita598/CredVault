export interface NonceRequest {
  walletAddress: string;
}

export interface VerifyRequest {
  walletAddress: string;
  signature: string;
}
