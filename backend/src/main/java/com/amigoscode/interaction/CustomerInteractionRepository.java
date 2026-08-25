package com.amigoscode.interaction;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerInteractionRepository extends JpaRepository<CustomerInteraction, Long> {
    List<CustomerInteraction> findByCustomerIdOrderByCreatedAtDesc(Integer customerId);
}
