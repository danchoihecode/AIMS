package com.springboot.service;

import java.util.ArrayList;
import java.util.List;

import com.springboot.model.entity.*;
import com.springboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.exception.product.ProductNotFoundException;
import com.springboot.model.dto.ClientProductDTO;

@Service
public class ProductService {
	@Autowired
    private CartProductRepository cartProductRepository;
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

    public boolean isInventoryGreaterThanQty(Long productId, Integer qty) throws Exception {
        Product product = getProductById(productId);
        return product.getQtyInStock() >= qty;
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("The product with id " + id + " does not exist"));
    }
    public List<Product> getAllProducts(){
        return new ArrayList<>(productRepository.findAll());
    }
    public ClientProductDTO getProductDetailById(Long id) throws Exception{
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("The product with id " + id + " does not exist"));

        Book book = null;
        CD cd = null;
        DVD dvd = null;
        LP lp = null;

        List<CartProduct> cartProducts = cartProductRepository.findByProductId(id);


        switch (product.getCategory()){
            case "Book":
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
        return new ClientProductDTO(product, book, dvd, cd, lp);
    }



}

