package com.srikanth.practise.java.task3_pagination.service.impl;

import com.srikanth.practise.java.task3_pagination.dto.PageResponseDTO;
import com.srikanth.practise.java.task3_pagination.entity.Product;
import com.srikanth.practise.java.task3_pagination.repository.ProductRepository;
import com.srikanth.practise.java.task3_pagination.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    
    private final ProductRepository productRepository;

    @Override
    public PageResponseDTO<Product> getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? 
            Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Page<Product> products = productRepository.findAll(PageRequest.of(pageNo, pageSize, sort));
        
        return createPageResponse(products);
    }

    @Override
    public PageResponseDTO<Product> getProductsByCategory(String category, int pageNo, int pageSize) {
        Page<Product> products = productRepository.findByCategory(
            category, 
            PageRequest.of(pageNo, pageSize)
        );
        
        return createPageResponse(products);
    }

    private PageResponseDTO<Product> createPageResponse(Page<Product> page) {
        PageResponseDTO<Product> response = new PageResponseDTO<>();
        response.setContent(page.getContent());
        response.setPageNo(page.getNumber());
        response.setPageSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setLast(page.isLast());
        return response;
    }
} 