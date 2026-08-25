ALTER TABLE customer
ADD COLUMN role VARCHAR(32) NOT NULL DEFAULT 'ROLE_EMPLOYEE';

UPDATE customer SET role = 'ROLE_ADMIN';

CREATE TABLE customer_interaction (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customer(id) ON DELETE CASCADE,
    type VARCHAR(32) NOT NULL,
    notes TEXT NOT NULL,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX customer_interaction_customer_id_idx
ON customer_interaction(customer_id, created_at DESC);
