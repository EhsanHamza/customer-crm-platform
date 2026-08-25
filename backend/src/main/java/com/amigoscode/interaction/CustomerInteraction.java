package com.amigoscode.interaction;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "customer_interaction")
public class CustomerInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "customer_id", nullable = false)
    private Integer customerId;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InteractionType type;
    @Column(nullable = false)
    private String notes;
    @Column(name = "created_by", nullable = false)
    private String createdBy;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    protected CustomerInteraction() {}

    public CustomerInteraction(Integer customerId, InteractionType type, String notes, String createdBy) {
        this.customerId = customerId;
        this.type = type;
        this.notes = notes;
        this.createdBy = createdBy;
        this.createdAt = OffsetDateTime.now();
    }

    public Long getId() { return id; }
    public Integer getCustomerId() { return customerId; }
    public InteractionType getType() { return type; }
    public String getNotes() { return notes; }
    public String getCreatedBy() { return createdBy; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
