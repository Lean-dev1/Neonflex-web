CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('carteleria', 'impresion3d', 'insumos')),
    image_url TEXT NOT NULL,
    public_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password) 
VALUES ('admin', '$2b$10$fS8V1eW.P.B/y.sgT0.xEO.W.d.w.h.u.r.t.e.x.t');