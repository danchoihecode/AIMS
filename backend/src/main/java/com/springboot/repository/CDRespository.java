package com.springboot.repository;

import com.springboot.model.entity.CD;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CDRespository extends JpaRepository<CD, Long> {
}
