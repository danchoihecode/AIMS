import { NextRequest, NextResponse } from "next/server";
const placeOrderURl = ['/orders/checkout', '/order/success', '/orders/failed-order'];
export function middleware(req: NextRequest) {
    // if (placeOrderURl.includes(req.nextUrl.pathname)) {
    //     return NextResponse.next();
    // }
    return NextResponse.next();
}