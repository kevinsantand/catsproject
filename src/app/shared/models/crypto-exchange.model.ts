export interface Exchange {
  exchangeId: string;
  name: string;
  rank: number;
  percentTotalVolume: number;
  volumeUsd: number;
  tradingPairs: string;
  socket: boolean;
  exchangeUrl: string;
  updated: number;
}
