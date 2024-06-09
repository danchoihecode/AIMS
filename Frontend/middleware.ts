import { NextRequest, NextResponse } from "next/server";
import { getData, setData } from "./lib/cookies-data";
const placeOrderURl = ['/orders/checkout', '/order/success', '/orders/failed-order']

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == '/cart') {
    }
    if (request.nextUrl.pathname.startsWith('/order/checkout')) {
        if (!getData('cartId')) {
            return NextResponse.redirect(new URL('/cart', request.url))
        }
    }
}