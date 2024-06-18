package com.springboot.model.dto;

import com.springboot.model.entity.Book;
import com.springboot.model.entity.CD;
import com.springboot.model.entity.DVD;
import com.springboot.model.entity.LP;
import com.springboot.model.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
