package com.srikanth.practise.java.task3_pagination.service;

import com.srikanth.practise.java.task3_pagination.dto.PageResponseDTO;
import com.srikanth.practise.java.task3_pagination.entity.Product;

public interface ProductService {
    PageResponseDTO<Product> getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir);
    PageResponseDTO<Product> getProductsByCategory(String category, int pageNo, int pageSize);
}