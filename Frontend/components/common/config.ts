export const headerSupportPages = ['/', '/order', '/cart', '/checkout/delivery', '/checkout/review', '/order/failed-order'];
export const isContainHeading = (pathname: string) => {
    const productDetailPattern = /\/\d+/;
    if (productDetailPattern.test(pathname)) {
        return true;
    }
    return headerSupportPages.includes(pathname);
}