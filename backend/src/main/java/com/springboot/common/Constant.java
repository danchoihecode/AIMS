package com.springboot.common;

public class Constant {
    public static final String[] RUSH_SUPPORTED_PROVINCES = {"01"};
    public static final String[] BIG_CITIES = {"01", "79"};
    public static final int BIG_CITY_BASE_SHIPPING_COST = 22000;
    public static final int BIG_CITY_BASE_SHIPPING_WEIGHT = 3;
    public static final int PROVINCE_BASE_SHIPPING_COST = 30000;
    public static final double PROVINCE_BASE_SHIPPING_WEIGHT = 0.5;
    public static final int ADDITIONAL_FEE = 2500;
    public static final double TAX_RATE = 0.1;
    public static final String ORDER_STATUS_PENDING = "PENDING";
    public static final String ORDER_STATUS_CREATED = "CREATED";
    public static final String ORDER_STATUS_CANCELLED = "CANCELLED";
}
