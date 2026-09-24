-- ====================================================================
-- Addis Transit PostGIS Database Schema (Complete Transit System)
-- መገዲ መጓዓዝያ ኣዲስ ኣበባ / የአዲስ አበባ ሙሉ የትራንስፖርት መረብ
-- ====================================================================

-- 1. Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Table: Stops (ተራታት / ማቆሚያዎች)
CREATE TABLE IF NOT EXISTS stops (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_am VARCHAR(100),
    name_ti VARCHAR(100),
    category VARCHAR(50) DEFAULT 'terminal', -- 'terminal', 'lrt_station', 'bus_stop', 'interchange'
    subcity VARCHAR(50),
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    location GEOGRAPHY(Point, 4326) NOT NULL
);

-- 3. Table: Routes (መስመራት / መስመሮች)
CREATE TABLE IF NOT EXISTS routes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    route_code VARCHAR(30),
    title_en VARCHAR(120) NOT NULL,
    title_am VARCHAR(120),
    title_ti VARCHAR(120),
    transport_type VARCHAR(50) NOT NULL, -- 'lrt', 'minibus', 'anbessa', 'sheger', 'higer'
    fare_etb DECIMAL(6, 2) NOT NULL,
    estimated_mins INT DEFAULT 20,
    distance_km DECIMAL(5, 2) DEFAULT 5.0,
    frequency_mins INT DEFAULT 10,
    operating_hours VARCHAR(50) DEFAULT '06:00 - 22:00',
    color_hex VARCHAR(20) DEFAULT '#2563eb',
    origin_stop_id BIGINT REFERENCES stops(id) ON DELETE CASCADE,
    destination_stop_id BIGINT REFERENCES stops(id) ON DELETE CASCADE,
    path GEOGRAPHY(LineString, 4326)
);

-- 4. High-Performance Spatial & Foreign Key Indexes
CREATE INDEX IF NOT EXISTS idx_stops_location ON stops USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_routes_path ON routes USING GIST (path);
CREATE INDEX IF NOT EXISTS idx_routes_origin_dest ON routes (origin_stop_id, destination_stop_id);
CREATE INDEX IF NOT EXISTS idx_routes_dest ON routes (destination_stop_id);
CREATE INDEX IF NOT EXISTS idx_routes_transport_type ON routes (transport_type);

-- 5. Row Level Security (RLS)
ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'stops' AND policyname = 'Allow public read access to stops'
    ) THEN
        CREATE POLICY "Allow public read access to stops" ON stops FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'routes' AND policyname = 'Allow public read access to routes'
    ) THEN
        CREATE POLICY "Allow public read access to routes" ON routes FOR SELECT USING (true);
    END IF;
END $$;

-- 6. Comprehensive Addis Ababa Stops (25 Major Transit Nodes)
INSERT INTO stops (name_en, name_am, name_ti, category, subcity, latitude, longitude, location) VALUES 
('Mexico Square', 'ሜክሲኮ አደባባይ', 'መክሲኮ ኣደባባይ', 'interchange', 'Kirkos', 9.0108, 38.7511, ST_SetSRID(ST_MakePoint(38.7511, 9.0108), 4326)),
('Bole Medhanialem', 'ቦሌ መድኃኔዓለም', 'ቦሌ መድኃኔዓለም', 'terminal', 'Bole', 8.9902, 38.7865, ST_SetSRID(ST_MakePoint(38.7865, 8.9902), 4326)),
('Bole Airport (Terminal 2)', 'ቦሌ አየር ማረፊያ', 'ቦሌ ኤርፖርት', 'terminal', 'Bole', 8.9806, 38.7997, ST_SetSRID(ST_MakePoint(38.7997, 8.9806), 4326)),
('Piazza (De Gaulle Square)', 'ፒያሳ (ደጎል አደባባይ)', 'ፒያሳ', 'interchange', 'Arada', 9.0353, 38.7533, ST_SetSRID(ST_MakePoint(38.7533, 9.0353), 4326)),
('Megenagna Terminal', 'መገናኛ ተርሚናል', 'መገናኛ ተርሚናል', 'interchange', 'Yeka', 9.0204, 38.8014, ST_SetSRID(ST_MakePoint(38.8014, 9.0204), 4326)),
('Tor Hailoch (West Terminus)', 'ጦር ኃይሎች (ምዕራብ ተርሚነስ)', 'ጦር ኃይሎች', 'lrt_station', 'Lideta', 9.0118, 38.7248, ST_SetSRID(ST_MakePoint(38.7248, 9.0118), 4326)),
('Stadium / Legehar', 'ስቴዲየም / ለገሃር', 'ስቴዲየም / ለገሃር', 'interchange', 'Kirkos', 9.0135, 38.7569, ST_SetSRID(ST_MakePoint(38.7569, 9.0135), 4326)),
('Meskel Square', 'መስቀል አደባባይ', 'መስቀል ኣደባባይ', 'bus_stop', 'Kirkos', 9.0102, 38.7628, ST_SetSRID(ST_MakePoint(38.7628, 9.0102), 4326)),
('Ayat Terminal (East Terminus)', 'አያት ተርሚናል', 'ኣያት ተርሚናል', 'lrt_station', 'Yeka', 9.0252, 38.8631, ST_SetSRID(ST_MakePoint(38.8631, 9.0252), 4326)),
('Mercato (Autobus Tera)', 'መርካቶ (አውቶቡስ ተራ)', 'መርካቶ', 'interchange', 'Addis Ketema', 9.0315, 38.7368, ST_SetSRID(ST_MakePoint(38.7368, 9.0315), 4326)),
('Arat Kilo (King George VI)', 'አራት ኪሎ', 'ኣርባዕተ ኪሎ', 'bus_stop', 'Arada', 9.0334, 38.7618, ST_SetSRID(ST_MakePoint(38.7618, 9.0334), 4326)),
('Siddist Kilo (Yekatit 12)', 'ስድስት ኪሎ', 'ሽዱሽተ ኪሎ', 'bus_stop', 'Gullele', 9.0435, 38.7625, ST_SetSRID(ST_MakePoint(38.7625, 9.0435), 4326)),
('Kality Terminal (South Terminus)', 'ቃሊቲ ተርሚናል', 'ቃሊቲ ተርሚናል', 'lrt_station', 'Akaki Kality', 8.9056, 38.7561, ST_SetSRID(ST_MakePoint(38.7561, 8.9056), 4326)),
('Saris Abo', 'ሳሪስ አቦ', 'ሳሪስ ኣቦ', 'terminal', 'Nifas Silk', 8.9554, 38.7651, ST_SetSRID(ST_MakePoint(38.7651, 8.9554), 4326)),
('CMC Michael', 'ሲኤምሲ ሚካኤል', 'ሲኤምሲ ሚካኤል', 'lrt_station', 'Yeka', 9.0229, 38.8317, ST_SetSRID(ST_MakePoint(38.8317, 9.0229), 4326)),
('Gurd Shola', 'ጉርድ ሾላ', 'ጉርድ ሾላ', 'lrt_station', 'Yeka', 9.0210, 38.8160, ST_SetSRID(ST_MakePoint(38.8160, 9.0210), 4326)),
('Haya Hulet (22 Mazoria)', 'ሃያ ሁለት (22 ማዞሪያ)', 'ሃያ ክልተ (22)', 'lrt_station', 'Bole', 9.0162, 38.7845, ST_SetSRID(ST_MakePoint(38.7845, 9.0162), 4326)),
('Gotera (Lancia)', 'ጎተራ (ላንቻ)', 'ጎተራ', 'bus_stop', 'Kirkos', 8.9862, 38.7570, ST_SetSRID(ST_MakePoint(38.7570, 8.9862), 4326)),
('Kazanchis (ECA)', 'ካዛንቺስ', 'ካዛንቺስ', 'terminal', 'Kirkos', 9.0175, 38.7712, ST_SetSRID(ST_MakePoint(38.7712, 9.0175), 4326)),
('Shiro Meda', 'ሽሮ ሜዳ', 'ሽሮ ሜዳ', 'terminal', 'Gullele', 9.0601, 38.7620, ST_SetSRID(ST_MakePoint(38.7620, 9.0601), 4326)),
('Jomo Terminal', 'ጆሞ ተርሚናል', 'ጆሞ ተርሚናል', 'terminal', 'Nifas Silk', 8.9610, 38.7075, ST_SetSRID(ST_MakePoint(38.7075, 8.9610), 4326)),
('Lebu (Haile Garment)', 'ለቡ (ሀይሌ ጋርመንት)', 'ለቡ', 'terminal', 'Nifas Silk', 8.9560, 38.7280, ST_SetSRID(ST_MakePoint(38.7280, 8.9560), 4326)),
('Alem Bank (Ayer Tena)', 'ዓለም ባንክ (አየር ጤና)', 'ዓለም ባንክ', 'terminal', 'Kolfe Keranio', 9.0020, 38.6950, ST_SetSRID(ST_MakePoint(38.6950, 9.0020), 4326)),
('Kera (Bulbula)', 'ቄራ', 'ቄራ', 'bus_stop', 'Kirkos', 8.9950, 38.7480, ST_SetSRID(ST_MakePoint(38.7480, 8.9950), 4326)),
('Lideta (Balcha)', 'ልደታ (ባልቻ)', 'ልደታ', 'lrt_station', 'Lideta', 9.0125, 38.7390, ST_SetSRID(ST_MakePoint(38.7390, 9.0125), 4326))
ON CONFLICT DO NOTHING;

-- 7. Complete Network of Transit Lines Across Addis Ababa
INSERT INTO routes (route_code, title_en, title_am, title_ti, transport_type, fare_etb, estimated_mins, distance_km, frequency_mins, operating_hours, color_hex, origin_stop_id, destination_stop_id, path) VALUES 
-- 1. LRT East-West Corridor (Green Line)
('LRT-EW', 'LRT East-West: Tor Hailoch to Ayat', 'ቀላል ባቡር፡ ጦር ኃይሎች - አያት', 'ቀሊል ባቡር፡ ጦር ኃይሎች - ኣያት', 'lrt', 10.00, 38, 17.4, 6, '06:00 - 22:00', '#16a34a', 6, 9,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7248, 9.0118),
    ST_MakePoint(38.7390, 9.0125),
    ST_MakePoint(38.7511, 9.0108),
    ST_MakePoint(38.7569, 9.0135),
    ST_MakePoint(38.7845, 9.0162),
    ST_MakePoint(38.8014, 9.0204),
    ST_MakePoint(38.8160, 9.0210),
    ST_MakePoint(38.8317, 9.0229),
    ST_MakePoint(38.8631, 9.0252)
  ]), 4326)),

-- 2. LRT North-South Corridor (Blue Line)
('LRT-NS', 'LRT North-South: Piazza to Kality', 'ቀላል ባቡር፡ ፒያሳ - ቃሊቲ', 'ቀሊል ባቡር፡ ፒያሳ - ቃሊቲ', 'lrt', 10.00, 42, 16.9, 6, '06:00 - 22:00', '#2563eb', 4, 13,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7533, 9.0353),
    ST_MakePoint(38.7368, 9.0315),
    ST_MakePoint(38.7511, 9.0108),
    ST_MakePoint(38.7569, 9.0135),
    ST_MakePoint(38.7628, 9.0102),
    ST_MakePoint(38.7570, 8.9862),
    ST_MakePoint(38.7651, 8.9554),
    ST_MakePoint(38.7561, 8.9056)
  ]), 4326)),

-- 3. Minibus: Mexico to Bole Airport
('MB-01', 'Minibus: Mexico to Bole Airport', 'ታክሲ፡ ሜክሲኮ - ቦሌ ኤርፖርት', 'ታክሲ፡ መክሲኮ - ቦሌ', 'minibus', 15.00, 22, 6.8, 2, '05:30 - 23:00', '#0284c7', 1, 3,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7511, 9.0108),
    ST_MakePoint(38.7628, 9.0102),
    ST_MakePoint(38.7865, 8.9902),
    ST_MakePoint(38.7997, 8.9806)
  ]), 4326)),

-- 4. Minibus: Megenagna to Bole Medhanialem
('MB-02', 'Minibus: Megenagna to Bole', 'ታክሲ፡ መገናኛ - ቦሌ መድኃኔዓለም', 'ታክሲ፡ መገናኛ - ቦሌ', 'minibus', 12.00, 15, 4.8, 2, '05:30 - 23:00', '#0284c7', 5, 2,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.8014, 9.0204),
    ST_MakePoint(38.7910, 9.0060),
    ST_MakePoint(38.7865, 8.9902)
  ]), 4326)),

-- 5. Minibus: Piazza to Megenagna via Arat Kilo
('MB-03', 'Minibus: Piazza to Megenagna', 'ታክሲ፡ ፒያሳ - መገናኛ', 'ታክሲ፡ ፒያሳ - መገናኛ', 'minibus', 12.00, 22, 6.9, 3, '06:00 - 22:30', '#0284c7', 4, 5,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7533, 9.0353),
    ST_MakePoint(38.7618, 9.0334),
    ST_MakePoint(38.7845, 9.0162),
    ST_MakePoint(38.8014, 9.0204)
  ]), 4326)),

-- 6. Minibus: Tor Hailoch to Mercato
('MB-04', 'Minibus: Tor Hailoch to Mercato', 'ታክሲ፡ ጦር ኃይሎች - መርካቶ', 'ታክሲ፡ ጦር ኃይሎች - መርካቶ', 'minibus', 10.00, 15, 3.8, 2, '05:30 - 22:30', '#0284c7', 6, 10,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7248, 9.0118),
    ST_MakePoint(38.7390, 9.0125),
    ST_MakePoint(38.7368, 9.0315)
  ]), 4326)),

-- 7. Minibus: Saris Abo to Mexico Square
('MB-05', 'Minibus: Saris to Mexico', 'ታክሲ፡ ሳሪስ አቦ - ሜክሲኮ', 'ታክሲ፡ ሳሪስ - መክሲኮ', 'minibus', 15.00, 25, 7.5, 3, '06:00 - 22:00', '#0284c7', 14, 1,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7651, 8.9554),
    ST_MakePoint(38.7570, 8.9862),
    ST_MakePoint(38.7480, 8.9950),
    ST_MakePoint(38.7511, 9.0108)
  ]), 4326)),

-- 8. Minibus: Jomo to Mexico Square
('MB-06', 'Minibus: Jomo to Mexico', 'ታክሲ፡ ጆሞ - ሜክሲኮ', 'ታክሲ፡ ጆሞ - መክሲኮ', 'minibus', 18.00, 30, 8.6, 4, '05:30 - 22:00', '#0284c7', 21, 1,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7075, 8.9610),
    ST_MakePoint(38.7280, 8.9560),
    ST_MakePoint(38.7480, 8.9950),
    ST_MakePoint(38.7511, 9.0108)
  ]), 4326)),

-- 9. Anbessa Bus Line 24: Mercato to Kera via Mexico
('ANB-24', 'Anbessa Bus 24: Mercato to Kera', 'አንበሳ አውቶቡስ 24፡ መርካቶ - ቄራ', 'ኣንበሳ ኣውቶቡስ 24፡ መርካቶ - ቄራ', 'anbessa', 7.00, 25, 7.2, 15, '06:00 - 21:00', '#ea580c', 10, 24,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7368, 9.0315),
    ST_MakePoint(38.7390, 9.0125),
    ST_MakePoint(38.7511, 9.0108),
    ST_MakePoint(38.7480, 8.9950)
  ]), 4326)),

-- 10. Anbessa Bus Line 1: Legehar to Shiro Meda
('ANB-01', 'Anbessa Bus 1: Legehar to Shiro Meda', 'አንበሳ አውቶቡስ 1፡ ለገሃር - ሽሮ ሜዳ', 'ኣንበሳ ኣውቶቡስ 1፡ ለገሃር - ሽሮ ሜዳ', 'anbessa', 6.00, 26, 6.8, 12, '06:00 - 21:30', '#ea580c', 7, 20,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7569, 9.0135),
    ST_MakePoint(38.7533, 9.0353),
    ST_MakePoint(38.7618, 9.0334),
    ST_MakePoint(38.7625, 9.0435),
    ST_MakePoint(38.7620, 9.0601)
  ]), 4326)),

-- 11. Anbessa Bus Line 48: Tor Hailoch to Alem Bank
('ANB-48', 'Anbessa Bus 48: Tor Hailoch to Alem Bank', 'አንበሳ አውቶቡስ 48፡ ጦር ኃይሎች - ዓለም ባንክ', 'ኣንበሳ ኣውቶቡስ 48፡ ጦር ኃይሎች - ዓለም ባንክ', 'anbessa', 7.00, 24, 6.4, 15, '06:00 - 21:00', '#ea580c', 6, 23,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7248, 9.0118),
    ST_MakePoint(38.7100, 9.0060),
    ST_MakePoint(38.6950, 9.0020)
  ]), 4326)),

-- 12. Sheger Express Line 1: Tor Hailoch to Megenagna
('SHG-01', 'Sheger Express 1: Tor Hailoch to Megenagna', 'ሸገር ኤክስፕረስ 1፡ ጦር ኃይሎች - መገናኛ', 'ሸገር ኤክስፕረስ 1፡ ጦር ኃይሎች - መገናኛ', 'sheger', 8.00, 25, 9.5, 10, '06:00 - 21:30', '#059669', 6, 5,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7248, 9.0118),
    ST_MakePoint(38.7511, 9.0108),
    ST_MakePoint(38.7569, 9.0135),
    ST_MakePoint(38.7628, 9.0102),
    ST_MakePoint(38.7845, 9.0162),
    ST_MakePoint(38.8014, 9.0204)
  ]), 4326)),

-- 13. Sheger Express Line 2: Piazza to Bole Airport
('SHG-02', 'Sheger Express 2: Piazza to Bole Airport', 'ሸገር ኤክስፕረስ 2፡ ፒያሳ - ቦሌ ኤርፖርት', 'ሸገር ኤክስፕረስ 2፡ ፒያሳ - ቦሌ ኤርፖርት', 'sheger', 10.00, 28, 8.2, 12, '06:00 - 21:30', '#059669', 4, 3,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7533, 9.0353),
    ST_MakePoint(38.7712, 9.0175),
    ST_MakePoint(38.7865, 8.9902),
    ST_MakePoint(38.7997, 8.9806)
  ]), 4326)),

-- 14. Sheger Express Line 3: Kality to Legehar
('SHG-03', 'Sheger Express 3: Kality to Legehar', 'ሸገር ኤክስፕረስ 3፡ ቃሊቲ - ለገሃር', 'ሸገር ኤክስፕረስ 3፡ ቃሊቲ - ለገሃር', 'sheger', 9.00, 32, 11.5, 12, '06:00 - 21:30', '#059669', 13, 7,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.7561, 8.9056),
    ST_MakePoint(38.7651, 8.9554),
    ST_MakePoint(38.7570, 8.9862),
    ST_MakePoint(38.7569, 9.0135)
  ]), 4326)),

-- 15. Higer Midibus Line: Megenagna to Ayat
('HGR-01', 'Higer Midibus: Megenagna to Ayat', 'ሃይገር፡ መገናኛ - አያት', 'ሃይገር፡ መገናኛ - ኣያት', 'higer', 9.00, 20, 6.5, 5, '06:00 - 22:00', '#d97706', 5, 9,
  ST_SetSRID(ST_MakeLine(ARRAY[
    ST_MakePoint(38.8014, 9.0204),
    ST_MakePoint(38.8160, 9.0210),
    ST_MakePoint(38.8317, 9.0229),
    ST_MakePoint(38.8631, 9.0252)
  ]), 4326))
ON CONFLICT DO NOTHING;

-- ====================================================================
-- 8. Table: Taxi Teras (የታክሲ ተራዎች)
-- ====================================================================
CREATE TABLE IF NOT EXISTS taxi_teras (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(120) NOT NULL,
    name_am VARCHAR(120),
    name_ti VARCHAR(120),
    subcity VARCHAR(50),
    exact_location_en TEXT,
    exact_location_am TEXT,
    exact_location_ti TEXT,
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    weyala_shout TEXT,
    operating_hours VARCHAR(50),
    queue_tips_en TEXT,
    location GEOGRAPHY(Point, 4326) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_taxi_teras_location ON taxi_teras USING GIST (location);
ALTER TABLE taxi_teras ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'taxi_teras' AND policyname = 'Allow public read access to taxi_teras'
    ) THEN
        CREATE POLICY "Allow public read access to taxi_teras" ON taxi_teras FOR SELECT USING (true);
    END IF;
END $$;

INSERT INTO taxi_teras (id, name_en, name_am, name_ti, subcity, exact_location_en, exact_location_am, exact_location_ti, latitude, longitude, weyala_shout, operating_hours, queue_tips_en, location) VALUES
('tera-1', 'Mexico Taxi Tera', 'ሜክሲኮ ታክሲ ተራ', 'መክሲኮ ታክሲ ተራ', 'Kirkos', 'Under Mexico Flyover beside Bunna & Shay Building & Genete Eyesus', 'በሜክሲኮ አደባባይ ድልድይ ስር፣ ከቡናና ሻይ ህንፃ ፊት ለፊት', 'ኣብ ትሕቲ ድልድል መክሲኮ፡ ኣብ ጥቓ ህንጻ ቡንን ሻህን', 9.0108, 38.7511, 'ቦሌ ቦሌ! ሜክሲኮ ሳሪስ! ጆሞ ጆሞ! ቄራ!', '05:30 - 23:00', 'Very busy 07:00-09:00 AM and 05:00-07:30 PM. Line up in designated queue lanes.', ST_SetSRID(ST_MakePoint(38.7511, 9.0108), 4326)),
('tera-2', 'Megenagna Taxi Tera', 'መገናኛ ታክሲ ተራ', 'መገናኛ ታክሲ ተራ', 'Yeka', 'Around Megenagna Square, behind Lem Hotel turn & CMC entrance', 'በመገናኛ አደባባይ ዙሪያ፣ ወደ ለም ሆቴል በሚወስደው መንገድና ሲኤምሲ መግቢያ', 'ኣብ ዙርያ ኣደባባይ መገናኛ፡ መንገዲ ለም ሆቴል', 9.0204, 38.8014, 'ቦሌ ቦሌ! ሲኤምሲ አያት! ፒያሳ ፒያሳ! ኮተቤ!', '05:30 - 23:00', 'Major interchange connecting East Addis Ababa with Bole and Downtown.', ST_SetSRID(ST_MakePoint(38.8014, 9.0204), 4326)),
('tera-3', 'Piazza (De Gaulle) Taxi Tera', 'ፒያሳ (ደጎል) ታክሲ ተራ', 'ፒያሳ ታክሲ ተራ', 'Arada', 'De Gaulle Square in front of Taitu Hotel & Cinema Empire', 'ደጎል አደባባይ ከጣይቱ ሆቴልና ኤምፓየር ሲኒማ ፊት ለፊት', 'ደጎል ኣደባባይ ኣብ ቅድሚ ጣይቱ ሆቴል', 9.0353, 38.7533, 'አራት ኪሎ መገናኛ! ሽሮሜዳ! መርካቶ መርካቶ!', '06:00 - 22:30', 'Central northern hub for Arada, Gullele, and Entoto lines.', ST_SetSRID(ST_MakePoint(38.7533, 9.0353), 4326)),
('tera-4', 'Mercato Taxi Tera', 'መርካቶ ታክሲ ተራ', 'መርካቶ ታክሲ ተራ', 'Addis Ketema', 'Military Sefer & Sebategna terminal next to Autobus Tera', 'ሚሊተሪ ሰፈር እና ሰባተኛ ተርሚናል ከአውቶቡስ ተራ አጠገብ', 'ሚሊተሪ ሰፈርን ሰባተኛ ተርሚናልን ጥቓ ኣውቶቡስ ተራ', 9.0315, 38.7368, 'ጦር ኃይሎች! ሜክሲኮ! ዓለም ባንክ! አስኮ!', '05:30 - 22:00', 'Largest open market terminal. Keep eye on belongings during boarding.', ST_SetSRID(ST_MakePoint(38.7368, 9.0315), 4326)),
('tera-5', 'Bole Medhanialem Taxi Stand', 'ቦሌ መድኃኔዓለም ታክሲ ተራ', 'ቦሌ መድኃኔዓለም ታክሲ ተራ', 'Bole', 'Camroon Street near Edna Mall and Bole Medhanialem Cathedral', 'ካሜሩን መንገድ ከኤድና ሞልና መድኃኔዓለም ካቴድራል አጠገብ', 'መንገዲ ካሜሩን ጥቓ ኤድና ሞል', 8.9902, 38.7865, 'ሜክሲኮ ሜክሲኮ! መገናኛ! ሳሪስ!', '05:30 - 23:30', 'Primary terminal for Bole district, airport staff, and business travelers.', ST_SetSRID(ST_MakePoint(38.7865, 8.9902), 4326)),
('tera-6', 'Stadium & Legehar Stand', 'ስቴዲየም ታክሲ ተራ', 'ስቴዲየም ታክሲ ተራ', 'Kirkos', 'In front of Addis Ababa Stadium & near National Theatre / Legehar', 'ከአዲስ አበባ ስቴዲየም ፊት ለፊት እና ከብሔራዊ ቴአትር / ለገሃር አጠገብ', 'ኣብ ቅድሚ ስቴዲየም ኣዲስ ኣበባ', 9.0135, 38.7569, 'ቦሌ ቦሌ! ሳሪስ ቃሊቲ! ፒያሳ!', '06:00 - 22:30', 'Interchange directly accessible from East-West and North-South LRT lines.', ST_SetSRID(ST_MakePoint(38.7569, 9.0135), 4326)),
('tera-7', 'Tor Hailoch Taxi Stand', 'ጦር ኃይሎች ታክሲ ተራ', 'ጦር ኃይሎች ታክሲ ተራ', 'Lideta', 'Under Tor Hailoch LRT Overpass next to Total gas station', 'በጦር ኃይሎች ባቡር ድልድይ ስር ከቶታል ነዳጅ ማደያ አጠገብ', 'ኣብ ትሕቲ ድልድል ባቡር ጦር ኃይሎች', 9.0118, 38.7248, 'መርካቶ መርካቶ! ዓለም ባንክ! ሜክሲኮ!', '05:30 - 22:30', 'Gateway connecting West Addis Ababa (Alem Bank, Kolfe) to city center.', ST_SetSRID(ST_MakePoint(38.7248, 9.0118), 4326)),
('tera-8', 'Saris Abo Taxi Tera', 'ሳሪስ አቦ ታክሲ ተራ', 'ሳሪስ ኣቦ ታክሲ ተራ', 'Nifas Silk', 'Around Saris Abo Church under the ring road interchange', 'በሳሪስ አቦ ቤተክርስቲያን ዙሪያ ከቀለበት መንገድ ስር', 'ኣብ ዙርያ ቤተክርስቲያን ሳሪስ ኣቦ', 8.9554, 38.7651, 'ሜክሲኮ ሜክሲኮ! ስቴዲየም! ቃሊቲ!', '05:30 - 22:30', 'South Addis connector for Nifas Silk, Gotera, and Akaki Kality.', ST_SetSRID(ST_MakePoint(38.7651, 8.9554), 4326)),
('tera-9', 'Jomo 1 & 2 Taxi Stand', 'ጆሞ ታክሲ ተራ', 'ጆሞ ታክሲ ተራ', 'Nifas Silk', 'Jomo Roundabout near Gate 1 Commercial Center', 'በጆሞ አደባባይ በር 1 የገበያ ማዕከል አጠገብ', 'ኣብ ኣደባባይ ጆሞ በር 1', 8.9610, 38.7075, 'ሜክሲኮ ሜክሲኮ! ጦር ኃይሎች!', '05:30 - 22:00', 'Southwest residential corridor with high morning demand.', ST_SetSRID(ST_MakePoint(38.7075, 8.9610), 4326)),
('tera-10', 'Kality Taxi Tera', 'ቃሊቲ ታክሲ ተራ', 'ቃሊቲ ታክሲ ተራ', 'Akaki Kality', 'Beside Kality LRT Terminal & Akaki Customs office', 'ከቃሊቲ ቀላል ባቡር ተርሚናልና ከጉምሩክ ጽ/ቤት አጠገብ', 'ጥቓ ተርሚናል ባቡር ቃሊቲ', 8.9056, 38.7561, 'ሳሪስ ስቴዲየም! ሜክሲኮ! አቃቂ!', '05:30 - 22:30', 'Southern gateway connecting Addis Ababa to Bishoftu corridor.', ST_SetSRID(ST_MakePoint(38.7561, 8.9056), 4326))
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- 9. Table: Regional Terminals (የክልል አውቶቡስ ተርሚናሎች)
-- ====================================================================
CREATE TABLE IF NOT EXISTS regional_terminals (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(120) NOT NULL,
    name_am VARCHAR(120),
    name_ti VARCHAR(120),
    subcity VARCHAR(50),
    exact_location_en TEXT,
    exact_location_am TEXT,
    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),
    corridor_served VARCHAR(120),
    operating_hours VARCHAR(80),
    location GEOGRAPHY(Point, 4326) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_regional_terminals_location ON regional_terminals USING GIST (location);
ALTER TABLE regional_terminals ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'regional_terminals' AND policyname = 'Allow public read access to regional_terminals'
    ) THEN
        CREATE POLICY "Allow public read access to regional_terminals" ON regional_terminals FOR SELECT USING (true);
    END IF;
END $$;

INSERT INTO regional_terminals (id, name_en, name_am, name_ti, subcity, exact_location_en, exact_location_am, latitude, longitude, corridor_served, operating_hours, location) VALUES
('reg-1', 'Autobus Tera (Mercato Intercity Terminal)', 'መርካቶ አውቶቡስ ተራ', 'መርካቶ ኣውቶቡስ ተራ', 'Addis Ketema', 'Mercato, near Military Sefer & Sebategna', 'መርካቶ ሚሊተሪ ሰፈርና ሰባተኛ አጠገብ', 9.0315, 38.7368, 'North & Northwest Ethiopia', '05:00 - 18:00', ST_SetSRID(ST_MakePoint(38.7368, 9.0315), 4326)),
('reg-2', 'Lamberet Intercity Bus Terminal', 'ላምበረት የክልል አውቶቡስ ተርሚናል', 'ላምበረት ተርሚናል', 'Yeka', 'Yeka, on Dessie / Asmara Road past Megenagna', 'የካ፣ ከመገናኛ አለፍ ብሎ በደሴ/አስመራ መንገድ', 9.0280, 38.8150, 'East & Northeast Ethiopia', '05:00 - 18:00', ST_SetSRID(ST_MakePoint(38.8150, 9.0280), 4326)),
('reg-3', 'Kality Intercity Bus Terminal', 'ቃሊቲ የክልል አውቶቡስ ተርሚናል', 'ቃሊቲ ናይ ክልል ተርሚናል', 'Akaki Kality', 'Akaki Kality, next to Kality Customs & Express Highway entrance', 'ቃሊቲ፣ ከጉምሩክ አጠገብ ወደ አዳማ ፈጣን መንገድ መግቢያ', 8.9056, 38.7561, 'South & Southeast (Rift Valley & Oromia/Sidama)', '05:00 - 19:00', ST_SetSRID(ST_MakePoint(38.7561, 8.9056), 4326)),
('reg-4', 'Ashewa Meda (Ayer Tena Terminal)', 'አሸዋ ሜዳ (አየር ጤና) ተርሚናል', 'ኣሸዋ ሜዳ (ኣየር ጤና) ተርሚናል', 'Kolfe Keranio', 'Past Tor Hailoch, Ayer Tena along Jimma Road', 'ከጦር ኃይሎች አለፍ ብሎ አየር ጤና በጅማ መንገድ', 9.0020, 38.6950, 'West & Southwest Ethiopia', '05:00 - 18:00', ST_SetSRID(ST_MakePoint(38.6950, 9.0020), 4326))
ON CONFLICT (id) DO NOTHING;
