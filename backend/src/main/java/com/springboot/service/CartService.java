package com.springboot.service;

import java.util.List;

import com.springboot.exception.cart.CartItemNotFoundException;
import com.springboot.exception.cart.CartNotFoundException;
import com.springboot.exception.product.ProductNotFoundException;
import com.springboot.exception.product.ProductQuantityNotEnoughException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.dto.CartProductDTO;
import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.CartProductKey;
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
    private ProductService productService;

    public Cart createEmptyCart() {
        Cart cart = new Cart();
        cartRepository.save(cart);
        return cart;
    }

    public Cart getCartById(Long id) {
        return cartRepository.findById(id).orElseThrow(() -> new CartNotFoundException("Cart with id " + id + " not found"));
    }
    public List<CartProduct> getAllProductsInCart(Long cartId) {
        getCartById(cartId);
        return cartProductRepository.findByCartId(cartId);
    }

    private void checkValidCartProduct(Long cartId, Long productId, Integer qty) throws Exception {
        getCartById(cartId);
        if (!productService.isInventoryGreaterThanQty(productId, qty)) {
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


    public void updateCart(Long cartId, Long productId, Integer qty) throws Exception {
        Product product = productService.getProductById(productId);
        Cart cart = getCartById(cartId);
        if (!productService.isInventoryGreaterThanQty(productId, qty)) {
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

    public void deleteCartItem(Long cartId, Long productId) throws Exception {
        Cart cart = getCartById(cartId);
        productService.getProductById(productId);

        CartProductKey key = new CartProductKey(cartId, productId);
        cartProductRepository.findById(key).orElseThrow(() -> new CartItemNotFoundException("Product with id " + productId + " not found in cart"));
        cartProductRepository.deleteById(key);
        recalculateCartTotal(cart);

    }
}
