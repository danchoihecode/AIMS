package com.springboot.service;

import com.springboot.model.entity.Book;
import com.springboot.model.entity.CD;
import com.springboot.model.entity.DVD;
import com.springboot.model.entity.LP;
import com.springboot.model.response.ClientProductDTO;
import com.springboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springboot.model.entity.Product;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BookRespository bookRespository;
    @Autowired
    private CDRespository cdRespository;
    @Autowired
    private DVDRespository dvdRespository;
    @Autowired
    private LPRespository lpRespository;

    public boolean checkInventory(Long productId, Integer qty) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));
        return product.getQtyInStock() >= qty;
    }

    public List<Product> getAllProducts(){
        List<Product> products = new ArrayList<>(productRepository.findAll());
        List<Book> books = bookRespository.findAll();
        products.addAll(books.stream().map(Book::getProduct).collect(Collectors.toList()));
        List<CD> cds = cdRespository.findAll();
        products.addAll(cds.stream().map(CD::getProduct).collect(Collectors.toList()));

        List<DVD> dvds = dvdRespository.findAll();
        products.addAll(dvds.stream().map(DVD::getProduct).collect(Collectors.toList()));

        List<LP> lps = lpRespository.findAll();
        products.addAll(lps.stream().map(LP::getProduct).collect(Collectors.toList()));

        return products;
    }

    public Optional<Product> getProductById(Long id){
        return productRepository.findById(id);
    }

    public ClientProductDTO getProductDetailById(Long id) throws Exception{
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found"));
//        System.out.print(product.getCategory());

        Book book = null;
        CD cd = null;
        DVD dvd = null;
        LP lp = null;

        switch (product.getCategory()){
            case "Books":
                book = bookRespository.findById(id).orElse(null);
                break;
            case "CD":
                cd = cdRespository.findById(id).orElse(null);
                break;
            case "DVD":
                dvd = dvdRespository.findById(id).orElse(null);
                break;
            case "LP":
                lp = lpRespository.findById(id).orElse(null);
                break;
            default: System.out.print(product.getCategory());
        }
        return ClientProductDTO.fromEntity(product, book, dvd, cd, lp);
    }


}

