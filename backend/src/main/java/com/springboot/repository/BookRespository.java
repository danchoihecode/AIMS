package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.entity.Book;

public interface BookRespository extends JpaRepository<Book, Long> {
}
