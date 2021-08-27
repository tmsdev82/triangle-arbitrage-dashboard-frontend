class OfferData {
  price: number;
  size: number;

  constructor(price: number, size: number) {
    this.price = price;
    this.size = size;
  }
}

class DepthStreamData {
  last_update_id: number;
  asks: Array<OfferData>;
  bids: Array<OfferData>;

  constructor(
    last_update_id: number,
    asks: Array<OfferData>,
    bids: Array<OfferData>
  ) {
    this.last_update_id = last_update_id;
    this.asks = asks;
    this.bids = bids;
  }
}

class DepthStreamWrapper {
  stream: String;
  data: DepthStreamData;

  constructor(stream: String, data: DepthStreamData) {
    this.stream = stream;
    this.data = data;
  }
}

class TriangleArbitrageData {
  triangle: Array<String>;
  profits: Array<number>;
  start_pair_data: DepthStreamWrapper;
  mid_pair_data: DepthStreamWrapper;
  end_pair_data: DepthStreamWrapper;

  constructor(
    triangle: Array<String>,
    profits: Array<number>,
    start_pair_data: DepthStreamWrapper,
    mid_pair_data: DepthStreamWrapper,
    end_pair_data: DepthStreamWrapper
  ) {
    this.triangle = triangle;
    this.profits = profits;
    this.start_pair_data = start_pair_data;
    this.mid_pair_data = mid_pair_data;
    this.end_pair_data = end_pair_data;
  }
}

export { OfferData, DepthStreamData, DepthStreamWrapper, TriangleArbitrageData };
