package com.springboot.model.response;

import com.springboot.model.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientProductDTO {
    private Product product;
    private Book book;
    private DVD dvd;
    private CD cd;
    private LP lp;


//    public static ClientProductDTO fromEntity(Product product, Book book, DVD dvd, CD cd, LP lp){
//        return new ClientProductDTO(
//                product,
//                book,
//                dvd,
//                cd,
//                lp
//        );
//    }


}
