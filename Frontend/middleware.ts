import { NextRequest, NextResponse } from "next/server";
import { getData, setData } from "./lib/cookies-data";
import { getEmptyCart } from "./api/DTO/apifunc";
const placeOrderURl = ['/orders/checkout', '/order/success', '/orders/failed-order']

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == '/cart') {
        if (!getData('cartId')) {
            const {data, error} = await getEmptyCart();
            if (error) {
                return NextResponse.error();
            }
            const response = NextResponse.next();
            response.cookies.set('cartId', data);
            return response;

        }
    }
    if (request.nextUrl.pathname.startsWith('/order/checkout')) {
        if (!getData('cartId')) {
            return NextResponse.redirect(new URL('/cart', request.url))
        }
    }
}