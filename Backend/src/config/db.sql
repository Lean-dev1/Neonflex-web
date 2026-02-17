CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('carteleria', 'impresion3d', 'insumos')),
    image_url TEXT NOT NULL,
    public_id TEXT, -- Para poder borrar la foto de Cloudinary después
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);