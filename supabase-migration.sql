-- Jalankan di Supabase SQL Editor (atau psql) setelah setup project.
-- Menambahkan kolom user_id ke tabel yang sudah ada.

-- Products
ALTER TABLE products ADD COLUMN IF NOT EXISTS user_id UUID;
-- Jika tabel masih kosong, set NOT NULL langsung:
-- ALTER TABLE products ALTER COLUMN user_id SET NOT NULL;

-- Transactions
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS user_id UUID;

-- Index untuk query per-user
CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);

-- (Opsional) Row Level Security — jika ingin query langsung dari client
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users own products" ON products FOR ALL USING (auth.uid() = user_id);
-- CREATE POLICY "Users own transactions" ON transactions FOR ALL USING (auth.uid() = user_id);
