package com.amigoscode.interaction;

import com.amigoscode.customer.CustomerDao;
import com.amigoscode.exception.RequestValidationException;
import com.amigoscode.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/v1/customers/{customerId}/interactions")
public class CustomerInteractionController {
    private final CustomerInteractionRepository repository;
    private final CustomerDao customerDao;

    public CustomerInteractionController(CustomerInteractionRepository repository,
                                         @Qualifier("jdbc") CustomerDao customerDao) {
        this.repository = repository;
        this.customerDao = customerDao;
    }

    @GetMapping
    public List<CustomerInteraction> getInteractions(@PathVariable Integer customerId) {
        ensureCustomerExists(customerId);
        return repository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    @PostMapping
    public CustomerInteraction addInteraction(@PathVariable Integer customerId,
                                               @RequestBody CreateInteractionRequest request,
                                               Authentication authentication) {
        ensureCustomerExists(customerId);
        if (request.type() == null || request.notes() == null || request.notes().isBlank()) {
            throw new RequestValidationException("interaction type and notes are required");
        }
        return repository.save(new CustomerInteraction(
                customerId, request.type(), request.notes().trim(), authentication.getName()));
    }

    private void ensureCustomerExists(Integer customerId) {
        if (!customerDao.existsCustomerById(customerId)) {
            throw new ResourceNotFoundException("customer with id [%s] not found".formatted(customerId));
        }
    }
}
