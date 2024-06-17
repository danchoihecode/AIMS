package com.springboot.service;

import java.util.List;

import com.springboot.dto.CartProductDTO;
import com.springboot.exception.cart.CartItemNotFoundException;
import com.springboot.exception.cart.CartNotFoundException;
import com.springboot.exception.product.ProductNotFoundException;
import com.springboot.exception.product.ProductQuantityNotEnoughException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.CartProductKey;
import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.Product;
import com.springboot.repository.CartProductRepository;
import com.springboot.repository.CartRepository;
import com.springboot.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartProductRepository cartProductRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart createEmptyCart() {
        Cart cart = new Cart();
        cartRepository.save(cart);
        return cart;
    }
    public List<CartProductDTO> getAllProductsInCart(Long cartId) {
        cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart with id " + cartId + " not found"));
        List<CartProduct> cartProduct = cartProductRepository.findByCartId(cartId);
        return cartProduct.stream().map(CartProductDTO::new).toList();
    }
    private void checkValidCartProduct(Long cartId, Long productId, Integer qty) {
        cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart with id " + cartId + " not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product with id " + productId + " not found"));
        if (product.getQtyInStock() < qty) {
            throw new ProductQuantityNotEnoughException("Not enough product in stock");
        }
    }
    public void addItemToCart(Long cartId, Long productId, Integer qty) throws Exception {
        checkValidCartProduct(cartId, productId, qty);
        CartProductKey key = new CartProductKey(cartId, productId);
        CartProduct cartProduct = cartProductRepository.findById(key).orElse(null);
        if (cartProduct == null) {
            this.updateCart(cartId, productId, qty);
        } else {
            this.updateCart(cartId, productId, cartProduct.getQty() + qty);
        }
    }


    public void updateCart(Long cartId, Long productId, Integer qty) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product with id " + productId + " not found"));
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart with id " + cartId + " not found"));
        if (product.getQtyInStock() < qty) {
            throw new ProductQuantityNotEnoughException("Not enough product in stock");
        }

        CartProductKey key = new CartProductKey(cartId, productId);

        CartProduct cartProduct = cartProductRepository.findById(key).orElse(new CartProduct(key, cart, product, qty));
        cartProduct.setQty(qty);

        cartProductRepository.save(cartProduct);
        recalculateCartTotal(cart);
    }
    private void recalculateCartTotal(Cart cart) {
        List<CartProduct> cartProducts = cartProductRepository.findByCartId(cart.getId());
        double subTotal = cartProducts.stream().mapToDouble(cp -> cp.getProduct().getPrice() * cp.getQty()).sum();
        cart.setSubTotal(subTotal);
        cartRepository.save(cart);
    }

    public Cart getCartByCartId(Long id) throws Exception {
        return cartRepository.findById(id).orElseThrow(() -> new Exception("Cart not found"));
    }

    public void deleteCartItem(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new CartNotFoundException("Cart with id " + cartId + " not found"));
        productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product with id " + productId + " not found"));

        CartProductKey key = new CartProductKey(cartId, productId);
        cartProductRepository.findById(key).orElseThrow(() -> new CartItemNotFoundException("Product with id " + productId + " not found in cart"));
        cartProductRepository.deleteById(key);
        recalculateCartTotal(cart);

    }
}
