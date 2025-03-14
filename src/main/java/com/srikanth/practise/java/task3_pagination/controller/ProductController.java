package com.srikanth.practise.java.task3_pagination.controller;

import com.srikanth.practise.java.task3_pagination.dto.PageResponseDTO;
import com.srikanth.practise.java.task3_pagination.entity.Product;
import com.srikanth.practise.java.task3_pagination.service.ProductService;
import com.srikanth.practise.java.util.ApiConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiConstants.TASK3_URL)
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<PageResponseDTO<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        return ResponseEntity.ok(productService.getAllProducts(pageNo, pageSize, sortBy, sortDir));
    }

    @GetMapping("/products/category/{category}")
    public ResponseEntity<PageResponseDTO<Product>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        
        return ResponseEntity.ok(productService.getProductsByCategory(category, pageNo, pageSize));
    }
} 