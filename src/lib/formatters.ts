export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('en-US')} MAD`;
};

export const formatPriceDH = (price: number): string => {
  return `${price.toLocaleString('en-US')} DH`;
};
