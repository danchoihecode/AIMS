PRAGMA foreign_keys = OFF;
ATTACH "aims.sdb" AS "aims";
BEGIN;
CREATE TABLE "aims"."DeliveryInfo"(
  "id" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "province" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "instructions" TEXT,
  "deliveryTime" DATETIME,
  "isRushOrder" BOOLEAN NOT NULL
);
CREATE TABLE "aims"."Product"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  "weight" REAL NOT NULL,
  "imageURL" TEXT NOT NULL,
  "rushOrderEligible" BOOLEAN NOT NULL
);
CREATE TABLE "aims"."Order"(
  "id" INTEGER PRIMARY KEY,
  "cartId" INTEGER NOT NULL,
  "shippingFees" REAL NOT NULL,
  "deliveryInfoId" INTEGER NOT NULL,
  CONSTRAINT "fk_order_cart"
    FOREIGN KEY("cartId")
    REFERENCES "Cart"("id"),
  CONSTRAINT "fk_order_deliveryinfo"
    FOREIGN KEY("deliveryInfoId")
    REFERENCES "DeliveryInfo"("id")
);
CREATE INDEX "aims"."Order.fk_order_cart_idx" ON "Order" ("cartId");
CREATE INDEX "aims"."Order.fk_order_deliveryinfo_idx" ON "Order" ("deliveryInfoId");

CREATE TABLE "aims"."TransactionInfo"(
  "id" INTEGER PRIMARY KEY,
  "amount" REAL NOT NULL,
  "bankCode" TEXT NOT NULL,
  "bankTranNo" TEXT,
  "cardType" TEXT,
  "payDate" DATE,
  "content" TEXT NOT NULL,
  "transactionNo" TEXT NOT NULL
);
CREATE TABLE "aims"."Invoice"(
  "id" INTEGER PRIMARY KEY,
  "currency" TEXT NOT NULL,
  "amount" REAL NOT NULL,
  "orderId" INTEGER NOT NULL,
  "transactionInfoId" INTEGER,
  CONSTRAINT "fk_invoice_order"
    FOREIGN KEY("orderId")
    REFERENCES "Order"("id"),
  CONSTRAINT "fk_invoice_transactioninfo"
    FOREIGN KEY("transactionInfoId")
    REFERENCES "TransactionInfo"("id")
);
CREATE INDEX "aims"."Invoice.fk_invoice_order_idx" ON "Invoice" ("orderId");
CREATE INDEX "aims"."Invoice.fk_invoice_transactioninfo_idx" ON "Invoice" ("transactionInfoId");

CREATE TABLE "aims"."Cart"(
  "id" INTEGER PRIMARY KEY,
  "subTotal" REAL
);
CREATE TABLE "aims"."CartProduct"(
  "cartId" INTEGER NOT NULL,
  "productId" INTEGER NOT NULL,
  "quantity" INTEGER NOT NULL,
  PRIMARY KEY("cartId", "productId"),
  CONSTRAINT "fk_cartproduct_cart"
    FOREIGN KEY("cartId")
    REFERENCES "Cart"("id"),
  CONSTRAINT "fk_cartproduct_product"
    FOREIGN KEY("productId")
    REFERENCES "Product"("id")
);
CREATE INDEX "aims"."CartProduct.fk_cartproduct_cart_idx" ON "CartProduct" ("cartId");
CREATE INDEX "aims"."CartProduct.fk_cartproduct_product_idx" ON "CartProduct" ("productId");

COMMIT;
