-- 001_communes.sql
-- Table des communes de livraison O'Black

CREATE TABLE IF NOT EXISTS communes (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nom         TEXT NOT NULL UNIQUE,
  tarif       INTEGER NOT NULL CHECK (tarif >= 0),
  actif       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO communes (nom, tarif) VALUES
('Plateau', 1000),
('Cocody', 1000),
('Marcory', 1000),
('Treichville', 1000),
('Adjamé', 1000),
('Attécoubé', 1500),
('Koumassi', 1500),
('Abobo', 1500),
('Yopougon', 1500),
('Port-Bouët', 2000),
('Anyama', 2000),
('Bingerville', 2000),
('Bassam', 3000),
('Songon', 3000)
ON CONFLICT (nom) DO UPDATE SET tarif = EXCLUDED.tarif;

SELECT * FROM communes ORDER BY tarif, nom;