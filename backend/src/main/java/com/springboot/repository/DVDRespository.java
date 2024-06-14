package com.springboot.repository;

import com.springboot.model.entity.DVD;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DVDRespository extends JpaRepository<DVD, Long> {
}
