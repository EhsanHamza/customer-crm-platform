package com.amigoscode.customer;

import java.util.List;

public record CustomerPage(
        List<CustomerDTO> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {}
