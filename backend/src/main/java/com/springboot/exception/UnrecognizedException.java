package com.springboot.exception;;

public class UnrecognizedException extends RuntimeException {
	public UnrecognizedException() {
		super("ERROR: Something went wrong!");
	}
}
