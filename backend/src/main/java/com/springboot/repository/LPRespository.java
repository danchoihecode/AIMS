package com.springboot.repository;

import com.springboot.model.entity.LP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LPRespository extends JpaRepository<LP, Long> {
}
