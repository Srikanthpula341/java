package com.srikanth.practise.java.task3_pagination.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.srikanth.practise.java.task3_pagination.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(String category, Pageable pageable);
} 