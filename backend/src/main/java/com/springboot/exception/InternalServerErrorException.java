package com.springboot.exception;;

public class InternalServerErrorException extends PaymentException {

	public InternalServerErrorException() {
		super("ERROR: Internal Server Error!");
	}

}
