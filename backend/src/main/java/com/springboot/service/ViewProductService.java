package com.springboot.service;

import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.User;
import com.springboot.repository.CartProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.springboot.model.entity.Product;
import com.springboot.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ViewProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartProductRepository cartProductRepository;

    private CartProductService cardProductService;

    public boolean checkInventory(Long productId, Integer qty) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));
        return product.getQtyInStock() >= qty;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        product.setTitle(productDetails.getTitle());
        product.setValue(productDetails.getValue());
        product.setPrice(productDetails.getPrice());
        product.setQtyInStock(productDetails.getQtyInStock());
        product.setWeight(productDetails.getWeight());
        product.setImage(productDetails.getImage());
        product.setYear(productDetails.getYear());
        product.setCategory(productDetails.getCategory());
        product.setRushOrderEligible(productDetails.isRushOrderEligible());

        return productRepository.save(product);
    }

    public void save(Product product) {
        productRepository.save(product);
    }
    public ResponseEntity<String> deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));
        List<CartProduct> cardProduct = cartProductRepository.findByProductId(id);
        if (!cardProduct.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Product cannot be deleted because it is in the cart.");
        }
        productRepository.delete(product);

        return ResponseEntity.ok("Product deleted successfully.");    }
}

