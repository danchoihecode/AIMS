export const fetchDelivery = async (cartId: string, provinceId: string, isRushDelivery: boolean) => {
    if (isRushDelivery) return {
        isRushDelivery: provinceId == "01",
        normalShippingFee: 20000,
        rushShippingFee: 30000
    }
    return {
        normalShippingFee: 20000,
        rushShippingFee: 0
    }
    // const response = await fetch(`/api/delivery/${id}`);
    // return response.json();
}