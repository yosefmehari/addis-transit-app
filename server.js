const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection (Supabase / Postgres)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:yourpassword@db.supabase.co:5432/postgres',
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// ====================================================================
// Full Addis Ababa Transit Network Dataset (25 Stations & Terminals)
// ====================================================================
const fullStops = [
  { id: 1, name_en: 'Mexico Square', name_am: 'ሜክሲኮ አደባባይ', name_ti: 'መክሲኮ ኣደባባይ', category: 'interchange', subcity: 'Kirkos', latitude: 9.0108, longitude: 38.7511 },
  { id: 2, name_en: 'Bole Medhanialem', name_am: 'ቦሌ መድኃኔዓለም', name_ti: 'ቦሌ መድኃኔዓለም', category: 'terminal', subcity: 'Bole', latitude: 8.9902, longitude: 38.7865 },
  { id: 3, name_en: 'Bole Airport (Terminal 2)', name_am: 'ቦሌ አየር ማረፊያ', name_ti: 'ቦሌ ኤርፖርት', category: 'terminal', subcity: 'Bole', latitude: 8.9806, longitude: 38.7997 },
  { id: 4, name_en: 'Piazza (De Gaulle Square)', name_am: 'ፒያሳ (ደጎል አደባባይ)', name_ti: 'ፒያሳ', category: 'interchange', subcity: 'Arada', latitude: 9.0353, longitude: 38.7533 },
  { id: 5, name_en: 'Megenagna Terminal', name_am: 'መገናኛ ተርሚናል', name_ti: 'መገናኛ ተርሚናል', category: 'interchange', subcity: 'Yeka', latitude: 9.0204, longitude: 38.8014 },
  { id: 6, name_en: 'Tor Hailoch (West Terminus)', name_am: 'ጦር ኃይሎች (ምዕራብ ተርሚነስ)', name_ti: 'ጦር ኃይሎች', category: 'lrt_station', subcity: 'Lideta', latitude: 9.0118, longitude: 38.7248 },
  { id: 7, name_en: 'Stadium / Legehar', name_am: 'ስቴዲየም / ለገሃር', name_ti: 'ስቴዲየም / ለገሃር', category: 'interchange', subcity: 'Kirkos', latitude: 9.0135, longitude: 38.7569 },
  { id: 8, name_en: 'Meskel Square', name_am: 'መስቀል አደባባይ', name_ti: 'መስቀል ኣደባባይ', category: 'bus_stop', subcity: 'Kirkos', latitude: 9.0102, longitude: 38.7628 },
  { id: 9, name_en: 'Ayat Terminal (East Terminus)', name_am: 'አያት ተርሚናል', name_ti: 'ኣያት ተርሚናል', category: 'lrt_station', subcity: 'Yeka', latitude: 9.0252, longitude: 38.8631 },
  { id: 10, name_en: 'Mercato (Autobus Tera)', name_am: 'መርካቶ (አውቶቡስ ተራ)', name_ti: 'መርካቶ', category: 'interchange', subcity: 'Addis Ketema', latitude: 9.0315, longitude: 38.7368 },
  { id: 11, name_en: 'Arat Kilo (King George VI)', name_am: 'አራት ኪሎ', name_ti: 'ኣርባዕተ ኪሎ', category: 'bus_stop', subcity: 'Arada', latitude: 9.0334, longitude: 38.7618 },
  { id: 12, name_en: 'Siddist Kilo (Yekatit 12)', name_am: 'ስድስት ኪሎ', name_ti: 'ሽዱሽተ ኪሎ', category: 'bus_stop', subcity: 'Gullele', latitude: 9.0435, longitude: 38.7625 },
  { id: 13, name_en: 'Kality Terminal (South Terminus)', name_am: 'ቃሊቲ ተርሚናል', name_ti: 'ቃሊቲ ተርሚናል', category: 'lrt_station', subcity: 'Akaki Kality', latitude: 8.9056, longitude: 38.7561 },
  { id: 14, name_en: 'Saris Abo', name_am: 'ሳሪስ አቦ', name_ti: 'ሳሪስ ኣቦ', category: 'terminal', subcity: 'Nifas Silk', latitude: 8.9554, longitude: 38.7651 },
  { id: 15, name_en: 'CMC Michael', name_am: 'ሲኤምሲ ሚካኤል', name_ti: 'ሲኤምሲ ሚካኤል', category: 'lrt_station', subcity: 'Yeka', latitude: 9.0229, longitude: 38.8317 },
  { id: 16, name_en: 'Gurd Shola', name_am: 'ጉርድ ሾላ', name_ti: 'ጉርድ ሾላ', category: 'lrt_station', subcity: 'Yeka', latitude: 9.0210, longitude: 38.8160 },
  { id: 17, name_en: 'Haya Hulet (22 Mazoria)', name_am: 'ሃያ ሁለት (22 ማዞሪያ)', name_ti: 'ሃያ ክልተ (22)', category: 'lrt_station', subcity: 'Bole', latitude: 9.0162, longitude: 38.7845 },
  { id: 18, name_en: 'Gotera (Lancia)', name_am: 'ጎተራ (ላንቻ)', name_ti: 'ጎተራ', category: 'bus_stop', subcity: 'Kirkos', latitude: 8.9862, longitude: 38.7570 },
  { id: 19, name_en: 'Kazanchis (ECA)', name_am: 'ካዛንቺስ', name_ti: 'ካዛንቺስ', category: 'terminal', subcity: 'Kirkos', latitude: 9.0175, longitude: 38.7712 },
  { id: 20, name_en: 'Shiro Meda', name_am: 'ሽሮ ሜዳ', name_ti: 'ሽሮ ሜዳ', category: 'terminal', subcity: 'Gullele', latitude: 9.0601, longitude: 38.7620 },
  { id: 21, name_en: 'Jomo Terminal', name_am: 'ጆሞ ተርሚናል', name_ti: 'ጆሞ ተርሚናል', category: 'terminal', subcity: 'Nifas Silk', latitude: 8.9610, longitude: 38.7075 },
  { id: 22, name_en: 'Lebu (Haile Garment)', name_am: 'ለቡ (ሀይሌ ጋርመንት)', name_ti: 'ለቡ', category: 'terminal', subcity: 'Nifas Silk', latitude: 8.9560, longitude: 38.7280 },
  { id: 23, name_en: 'Alem Bank (Ayer Tena)', name_am: 'ዓለም ባንክ (አየር ጤና)', name_ti: 'ዓለም ባንክ', category: 'terminal', subcity: 'Kolfe Keranio', latitude: 9.0020, longitude: 38.6950 },
  { id: 24, name_en: 'Kera (Bulbula)', name_am: 'ቄራ', name_ti: 'ቄራ', category: 'bus_stop', subcity: 'Kirkos', latitude: 8.9950, longitude: 38.7480 },
  { id: 25, name_en: 'Lideta (Balcha)', name_am: 'ልደታ (ባልቻ)', name_ti: 'ልደታ', category: 'lrt_station', subcity: 'Lideta', latitude: 9.0125, longitude: 38.7390 }
];

// ====================================================================
// Full Addis Ababa Transit Network Lines (15 Corridors)
// ====================================================================
const fullRoutes = [
  {
    id: 1,
    route_code: 'LRT-EW',
    title_en: 'LRT East-West: Tor Hailoch to Ayat',
    title_am: 'ቀላል ባቡር፡ ጦር ኃይሎች - አያት',
    title_ti: 'ቀሊል ባቡር፡ ጦር ኃይሎች - ኣያት',
    transport_type: 'lrt',
    fare_etb: 10.00,
    estimated_mins: 38,
    distance_km: 17.4,
    frequency_mins: 6,
    operating_hours: '06:00 - 22:00',
    color_hex: '#16a34a',
    origin_stop_id: 6,
    destination_stop_id: 9,
    stop_ids: [6, 25, 1, 7, 17, 5, 16, 15, 9],
    path_coordinates: [
      [9.0118, 38.7248],
      [9.0125, 38.7390],
      [9.0108, 38.7511],
      [9.0135, 38.7569],
      [9.0162, 38.7845],
      [9.0204, 38.8014],
      [9.0210, 38.8160],
      [9.0229, 38.8317],
      [9.0252, 38.8631]
    ]
  },
  {
    id: 2,
    route_code: 'LRT-NS',
    title_en: 'LRT North-South: Piazza to Kality',
    title_am: 'ቀላል ባቡር፡ ፒያሳ - ቃሊቲ',
    title_ti: 'ቀሊል ባቡር፡ ፒያሳ - ቃሊቲ',
    transport_type: 'lrt',
    fare_etb: 10.00,
    estimated_mins: 42,
    distance_km: 16.9,
    frequency_mins: 6,
    operating_hours: '06:00 - 22:00',
    color_hex: '#2563eb',
    origin_stop_id: 4,
    destination_stop_id: 13,
    stop_ids: [4, 10, 25, 1, 7, 8, 18, 14, 13],
    path_coordinates: [
      [9.0353, 38.7533],
      [9.0315, 38.7368],
      [9.0125, 38.7390],
      [9.0108, 38.7511],
      [9.0135, 38.7569],
      [9.0102, 38.7628],
      [8.9862, 38.7570],
      [8.9554, 38.7651],
      [8.9056, 38.7561]
    ]
  },
  {
    id: 3,
    route_code: 'MB-01',
    title_en: 'Minibus: Mexico to Bole Airport',
    title_am: 'ታክሲ፡ ሜክሲኮ - ቦሌ ኤርፖርት',
    title_ti: 'ታክሲ፡ መክሲኮ - ቦሌ',
    transport_type: 'minibus',
    fare_etb: 15.00,
    estimated_mins: 22,
    distance_km: 6.8,
    frequency_mins: 2,
    operating_hours: '05:30 - 23:00',
    color_hex: '#0284c7',
    origin_stop_id: 1,
    destination_stop_id: 3,
    stop_ids: [1, 8, 2, 3],
    path_coordinates: [
      [9.0108, 38.7511],
      [9.0102, 38.7628],
      [8.9902, 38.7865],
      [8.9806, 38.7997]
    ]
  },
  {
    id: 4,
    route_code: 'MB-02',
    title_en: 'Minibus: Megenagna to Bole',
    title_am: 'ታክሲ፡ መገናኛ - ቦሌ መድኃኔዓለም',
    title_ti: 'ታክሲ፡ መገናኛ - ቦሌ',
    transport_type: 'minibus',
    fare_etb: 12.00,
    estimated_mins: 15,
    distance_km: 4.8,
    frequency_mins: 2,
    operating_hours: '05:30 - 23:00',
    color_hex: '#0284c7',
    origin_stop_id: 5,
    destination_stop_id: 2,
    stop_ids: [5, 17, 2],
    path_coordinates: [
      [9.0204, 38.8014],
      [9.0162, 38.7845],
      [8.9902, 38.7865]
    ]
  },
  {
    id: 5,
    route_code: 'MB-03',
    title_en: 'Minibus: Piazza to Megenagna',
    title_am: 'ታክሲ፡ ፒያሳ - መገናኛ',
    title_ti: 'ታክሲ፡ ፒያሳ - መገናኛ',
    transport_type: 'minibus',
    fare_etb: 12.00,
    estimated_mins: 22,
    distance_km: 6.9,
    frequency_mins: 3,
    operating_hours: '06:00 - 22:30',
    color_hex: '#0284c7',
    origin_stop_id: 4,
    destination_stop_id: 5,
    stop_ids: [4, 11, 17, 5],
    path_coordinates: [
      [9.0353, 38.7533],
      [9.0334, 38.7618],
      [9.0162, 38.7845],
      [9.0204, 38.8014]
    ]
  },
  {
    id: 6,
    route_code: 'MB-04',
    title_en: 'Minibus: Tor Hailoch to Mercato',
    title_am: 'ታክሲ፡ ጦር ኃይሎች - መርካቶ',
    title_ti: 'ታክሲ፡ ጦር ኃይሎች - መርካቶ',
    transport_type: 'minibus',
    fare_etb: 10.00,
    estimated_mins: 15,
    distance_km: 3.8,
    frequency_mins: 2,
    operating_hours: '05:30 - 22:30',
    color_hex: '#0284c7',
    origin_stop_id: 6,
    destination_stop_id: 10,
    stop_ids: [6, 25, 10],
    path_coordinates: [
      [9.0118, 38.7248],
      [9.0125, 38.7390],
      [9.0315, 38.7368]
    ]
  },
  {
    id: 7,
    route_code: 'MB-05',
    title_en: 'Minibus: Saris to Mexico',
    title_am: 'ታክሲ፡ ሳሪስ አቦ - ሜክሲኮ',
    title_ti: 'ታክሲ፡ ሳሪስ - መክሲኮ',
    transport_type: 'minibus',
    fare_etb: 15.00,
    estimated_mins: 25,
    distance_km: 7.5,
    frequency_mins: 3,
    operating_hours: '06:00 - 22:00',
    color_hex: '#0284c7',
    origin_stop_id: 14,
    destination_stop_id: 1,
    stop_ids: [14, 18, 24, 1],
    path_coordinates: [
      [8.9554, 38.7651],
      [8.9862, 38.7570],
      [8.9950, 38.7480],
      [9.0108, 38.7511]
    ]
  },
  {
    id: 8,
    route_code: 'MB-06',
    title_en: 'Minibus: Jomo to Mexico',
    title_am: 'ታክሲ፡ ጆሞ - ሜክሲኮ',
    title_ti: 'ታክሲ፡ ጆሞ - መክሲኮ',
    transport_type: 'minibus',
    fare_etb: 18.00,
    estimated_mins: 30,
    distance_km: 8.6,
    frequency_mins: 4,
    operating_hours: '05:30 - 22:00',
    color_hex: '#0284c7',
    origin_stop_id: 21,
    destination_stop_id: 1,
    stop_ids: [21, 22, 24, 1],
    path_coordinates: [
      [8.9610, 38.7075],
      [8.9560, 38.7280],
      [8.9950, 38.7480],
      [9.0108, 38.7511]
    ]
  },
  {
    id: 9,
    route_code: 'ANB-24',
    title_en: 'Anbessa Bus 24: Mercato to Kera',
    title_am: 'አንበሳ አውቶቡስ 24፡ መርካቶ - ቄራ',
    title_ti: 'ኣንበሳ ኣውቶቡስ 24፡ መርካቶ - ቄራ',
    transport_type: 'anbessa',
    fare_etb: 7.00,
    estimated_mins: 25,
    distance_km: 7.2,
    frequency_mins: 15,
    operating_hours: '06:00 - 21:00',
    color_hex: '#ea580c',
    origin_stop_id: 10,
    destination_stop_id: 24,
    stop_ids: [10, 25, 1, 24],
    path_coordinates: [
      [9.0315, 38.7368],
      [9.0125, 38.7390],
      [9.0108, 38.7511],
      [8.9950, 38.7480]
    ]
  },
  {
    id: 10,
    route_code: 'ANB-01',
    title_en: 'Anbessa Bus 1: Legehar to Shiro Meda',
    title_am: 'አንበሳ አውቶቡስ 1፡ ለገሃር - ሽሮ ሜዳ',
    title_ti: 'ኣንበሳ ኣውቶቡስ 1፡ ለገሃር - ሽሮ ሜዳ',
    transport_type: 'anbessa',
    fare_etb: 6.00,
    estimated_mins: 26,
    distance_km: 6.8,
    frequency_mins: 12,
    operating_hours: '06:00 - 21:30',
    color_hex: '#ea580c',
    origin_stop_id: 7,
    destination_stop_id: 20,
    stop_ids: [7, 4, 11, 12, 20],
    path_coordinates: [
      [9.0135, 38.7569],
      [9.0353, 38.7533],
      [9.0334, 38.7618],
      [9.0435, 38.7625],
      [9.0601, 38.7620]
    ]
  },
  {
    id: 11,
    route_code: 'ANB-48',
    title_en: 'Anbessa Bus 48: Tor Hailoch to Alem Bank',
    title_am: 'አንበሳ አውቶቡስ 48፡ ጦር ኃይሎች - ዓለም ባንክ',
    title_ti: 'ኣንበሳ ኣውቶቡስ 48፡ ጦር ኃይሎች - ዓለም ባንክ',
    transport_type: 'anbessa',
    fare_etb: 7.00,
    estimated_mins: 24,
    distance_km: 6.4,
    frequency_mins: 15,
    operating_hours: '06:00 - 21:00',
    color_hex: '#ea580c',
    origin_stop_id: 6,
    destination_stop_id: 23,
    stop_ids: [6, 23],
    path_coordinates: [
      [9.0118, 38.7248],
      [9.0060, 38.7100],
      [9.0020, 38.6950]
    ]
  },
  {
    id: 12,
    route_code: 'SHG-01',
    title_en: 'Sheger Express 1: Tor Hailoch to Megenagna',
    title_am: 'ሸገር ኤክስፕረስ 1፡ ጦር ኃይሎች - መገናኛ',
    title_ti: 'ሸገር ኤክስፕረስ 1፡ ጦር ኃይሎች - መገናኛ',
    transport_type: 'sheger',
    fare_etb: 8.00,
    estimated_mins: 25,
    distance_km: 9.5,
    frequency_mins: 10,
    operating_hours: '06:00 - 21:30',
    color_hex: '#059669',
    origin_stop_id: 6,
    destination_stop_id: 5,
    stop_ids: [6, 1, 7, 8, 17, 5],
    path_coordinates: [
      [9.0118, 38.7248],
      [9.0108, 38.7511],
      [9.0135, 38.7569],
      [9.0102, 38.7628],
      [9.0162, 38.7845],
      [9.0204, 38.8014]
    ]
  },
  {
    id: 13,
    route_code: 'SHG-02',
    title_en: 'Sheger Express 2: Piazza to Bole Airport',
    title_am: 'ሸገር ኤክስፕረስ 2፡ ፒያሳ - ቦሌ ኤርፖርት',
    title_ti: 'ሸገር ኤክስፕረስ 2፡ ፒያሳ - ቦሌ ኤርፖርት',
    transport_type: 'sheger',
    fare_etb: 10.00,
    estimated_mins: 28,
    distance_km: 8.2,
    frequency_mins: 12,
    operating_hours: '06:00 - 21:30',
    color_hex: '#059669',
    origin_stop_id: 4,
    destination_stop_id: 3,
    stop_ids: [4, 19, 2, 3],
    path_coordinates: [
      [9.0353, 38.7533],
      [9.0175, 38.7712],
      [8.9902, 38.7865],
      [8.9806, 38.7997]
    ]
  },
  {
    id: 14,
    route_code: 'SHG-03',
    title_en: 'Sheger Express 3: Kality to Legehar',
    title_am: 'ሸገር ኤክስፕረስ 3፡ ቃሊቲ - ለገሃር',
    title_ti: 'ሸገር ኤክስፕረስ 3፡ ቃሊቲ - ለገሃር',
    transport_type: 'sheger',
    fare_etb: 9.00,
    estimated_mins: 32,
    distance_km: 11.5,
    frequency_mins: 12,
    operating_hours: '06:00 - 21:30',
    color_hex: '#059669',
    origin_stop_id: 13,
    destination_stop_id: 7,
    stop_ids: [13, 14, 18, 7],
    path_coordinates: [
      [8.9056, 38.7561],
      [8.9554, 38.7651],
      [8.9862, 38.7570],
      [9.0135, 38.7569]
    ]
  },
  {
    id: 15,
    route_code: 'HGR-01',
    title_en: 'Higer Midibus: Megenagna to Ayat',
    title_am: 'ሃይገር፡ መገናኛ - አያት',
    title_ti: 'ሃይገር፡ መገናኛ - ኣያት',
    transport_type: 'higer',
    fare_etb: 9.00,
    estimated_mins: 20,
    distance_km: 6.5,
    frequency_mins: 5,
    operating_hours: '06:00 - 22:00',
    color_hex: '#d97706',
    origin_stop_id: 5,
    destination_stop_id: 9,
    stop_ids: [5, 16, 15, 9],
    path_coordinates: [
      [9.0204, 38.8014],
      [9.0210, 38.8160],
      [9.0229, 38.8317],
      [9.0252, 38.8631]
    ]
  }
];

function geojsonToLatLngs(geojson) {
  if (!geojson || !geojson.coordinates) return [];
  return geojson.coordinates.map(pt => [pt[1], pt[0]]);
}

// ====================================================================
// Intelligent Multi-Leg Transfer Routing Engine
// ====================================================================
function findSmartJourney(originId, destId, routesList) {
  const o = parseInt(originId, 10);
  const d = parseInt(destId, 10);
  if (o === d) return null;

  const fromStop = fullStops.find(s => s.id === o);
  const toStop = fullStops.find(s => s.id === d);

  // 1. Direct check: Is both o and d on the same route?
  const directRoutes = routesList.filter(r => r.stop_ids && r.stop_ids.includes(o) && r.stop_ids.includes(d));
  if (directRoutes.length > 0) {
    const best = directRoutes[0];
    return {
      type: 'direct',
      transfers: 0,
      fromStop,
      toStop,
      totalFare: Number(best.fare_etb),
      totalMinutes: best.estimated_mins,
      totalDistanceKm: Number(best.distance_km),
      legs: [{
        route: best,
        fromStopId: o,
        toStopId: d,
        mode: best.transport_type,
        fare: Number(best.fare_etb),
        minutes: best.estimated_mins,
        path: best.path_coordinates
      }]
    };
  }

  // 2. 1-Transfer connection check (Stop A -> Intermediate Station X -> Stop B)
  const routesFromOrigin = routesList.filter(r => r.stop_ids && r.stop_ids.includes(o));
  const routesToDest = routesList.filter(r => r.stop_ids && r.stop_ids.includes(d));

  for (const leg1 of routesFromOrigin) {
    for (const leg2 of routesToDest) {
      if (leg1.id === leg2.id) continue;
      // find intersection of stop_ids
      const commonStops = leg1.stop_ids.filter(sid => sid !== o && sid !== d && leg2.stop_ids.includes(sid));
      if (commonStops.length > 0) {
        const transferStopId = commonStops[0];
        const transferStop = fullStops.find(s => s.id === transferStopId);
        const totalFare = Number(leg1.fare_etb) + Number(leg2.fare_etb);
        const totalMinutes = Math.round(leg1.estimated_mins * 0.6 + leg2.estimated_mins * 0.6 + 5);
        const totalDistanceKm = Number((Number(leg1.distance_km) * 0.6 + Number(leg2.distance_km) * 0.6).toFixed(1));

        return {
          type: 'transfer',
          transfers: 1,
          fromStop,
          toStop,
          transferStop,
          totalFare,
          totalMinutes,
          totalDistanceKm,
          legs: [
            {
              route: leg1,
              fromStopId: o,
              toStopId: transferStopId,
              mode: leg1.transport_type,
              fare: Number(leg1.fare_etb),
              minutes: Math.round(leg1.estimated_mins * 0.6),
              path: leg1.path_coordinates
            },
            {
              route: leg2,
              fromStopId: transferStopId,
              toStopId: d,
              mode: leg2.transport_type,
              fare: Number(leg2.fare_etb),
              minutes: Math.round(leg2.estimated_mins * 0.6),
              path: leg2.path_coordinates
            }
          ]
        };
      }
    }
  }

  return null;
}

// ====================================================================
// API Endpoints
// ====================================================================

// API 1: All transit stops
app.get('/api/v1/stops', async (req, res) => {
  try {
    const query = `
      SELECT 
        id, 
        name_en, 
        name_am, 
        name_ti,
        category,
        subcity,
        ST_X(location::geometry) AS longitude,
        ST_Y(location::geometry) AS latitude
      FROM stops
      ORDER BY id ASC;
    `;
    const { rows } = await pool.query(query);
    if (rows.length > 0) {
      return res.json({ success: true, count: rows.length, data: rows });
    }
    res.json({ success: true, count: fullStops.length, data: fullStops, mock: true });
  } catch (error) {
    res.json({ success: true, count: fullStops.length, data: fullStops, mock: true });
  }
});

// API 2: All transit routes with filtering
app.get('/api/v1/routes', async (req, res) => {
  const { transportType } = req.query;
  try {
    let query = `
      SELECT 
        r.id, 
        r.route_code,
        r.title_en,
        r.title_am,
        r.title_ti,
        r.transport_type, 
        r.fare_etb,
        r.estimated_mins,
        r.distance_km,
        r.frequency_mins,
        r.operating_hours,
        r.color_hex,
        r.origin_stop_id,
        r.destination_stop_id,
        ST_AsGeoJSON(r.path::geometry)::json AS path_geojson
      FROM routes r
    `;
    const params = [];
    if (transportType && transportType !== 'all') {
      query += ` WHERE r.transport_type = $1`;
      params.push(transportType);
    }
    query += ` ORDER BY r.id ASC;`;

    const { rows } = await pool.query(query, params);
    if (rows.length > 0) {
      const formatted = rows.map(r => ({
        ...r,
        path_coordinates: geojsonToLatLngs(r.path_geojson)
      }));
      return res.json({ success: true, count: formatted.length, data: formatted });
    }

    let filtered = fullRoutes;
    if (transportType && transportType !== 'all') {
      filtered = fullRoutes.filter(r => r.transport_type === transportType);
    }
    res.json({ success: true, count: filtered.length, data: filtered, mock: true });
  } catch (error) {
    let filtered = fullRoutes;
    if (transportType && transportType !== 'all') {
      filtered = fullRoutes.filter(r => r.transport_type === transportType);
    }
    res.json({ success: true, count: filtered.length, data: filtered, mock: true });
  }
});

// API 3: Smart Journey Planner (Direct + Multi-hop Transfers)
app.get('/api/v1/routes/plan', async (req, res) => {
  const { originId, destId } = req.query;
  if (!originId || !destId) {
    return res.status(400).json({ success: false, error: 'originId and destId are required' });
  }

  const journey = findSmartJourney(originId, destId, fullRoutes);
  if (journey) {
    return res.json({ success: true, plan: journey });
  }
  return res.json({ success: false, message: 'No viable direct or 1-transfer route found between selected terminals.' });
});

// API 4: Network Overview & Statistics
app.get('/api/v1/network/stats', (req, res) => {
  const totalStops = fullStops.length;
  const totalRoutes = fullRoutes.length;
  const totalKm = fullRoutes.reduce((acc, r) => acc + Number(r.distance_km), 0);
  const byMode = fullRoutes.reduce((acc, r) => {
    acc[r.transport_type] = (acc[r.transport_type] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      city: 'Addis Ababa, Ethiopia',
      totalStops,
      totalRoutes,
      totalNetworkCoverageKm: Number(totalKm.toFixed(1)),
      breakdownByMode: byMode,
      modesSupported: ['lrt', 'minibus', 'anbessa', 'sheger', 'higer']
    }
  });
});

// ====================================================================
// Addis Ababa Full Taxi Ecosystem & Locations (ተራዎች እና የጥሪ ታክሲዎች)
// ====================================================================
const taxiTeras = [
  {
    id: 'tera-1',
    name_en: 'Mexico Taxi Tera',
    name_am: 'ሜክሲኮ ታክሲ ተራ',
    name_ti: 'መክሲኮ ታክሲ ተራ',
    subcity: 'Kirkos',
    exact_location_en: 'Under Mexico Flyover beside Bunna & Shay Building & Genete Eyesus',
    exact_location_am: 'በሜክሲኮ አደባባይ ድልድይ ስር፣ ከቡናና ሻይ ህንፃ ፊት ለፊት',
    exact_location_ti: 'ኣብ ትሕቲ ድልድል መክሲኮ፡ ኣብ ጥቓ ህንጻ ቡንን ሻህን',
    latitude: 9.0108,
    longitude: 38.7511,
    weyala_shout: 'ቦሌ ቦሌ! ሜክሲኮ ሳሪስ! ጆሞ ጆሞ! ቄራ!',
    destinations: [
      { to: 'Bole Airport / Medhanialem', to_am: 'ቦሌ ኤርፖርት / መድኃኔዓለም', to_ti: 'ቦሌ ኤርፖርት', keywords: ['bole', 'ቦሌ', 'airport', 'ኤርፖርት', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 15, duration_mins: 22 },
      { to: 'Saris Abo / Gotera', to_am: 'ሳሪስ አቦ / ጎተራ', to_ti: 'ሳሪስ ኣቦ', keywords: ['saris', 'ሳሪስ', 'gotera', 'ጎተራ', 'abo', 'አቦ'], fare_etb: 15, duration_mins: 25 },
      { to: 'Kera / Bulbula', to_am: 'ቄራ / ቡልቡላ', to_ti: 'ቄራ', keywords: ['kera', 'ቄራ', 'bulbula', 'ቡልቡላ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Jomo 1, 2, 3', to_am: 'ጆሞ 1፣ 2፣ 3', to_ti: 'ጆሞ', keywords: ['jomo', 'ጆሞ', 'condo', 'ኮንዶሚኒየም'], fare_etb: 18, duration_mins: 30 },
      { to: 'Tor Hailoch / Ayer Tena', to_am: 'ጦር ኃይሎች / አየር ጤና', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች', 'ayer tena', 'አየር ጤና'], fare_etb: 12, duration_mins: 18 },
      { to: 'Mercato (Autobus Tera)', to_am: 'መርካቶ (አውቶቡስ ተራ)', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ', 'autobus tera', 'አውቶቡስ ተራ'], fare_etb: 10, duration_mins: 20 }
    ],
    operating_hours: '05:30 - 23:00',
    queue_tips_en: 'Very busy 07:00-09:00 AM and 05:00-07:30 PM. Line up in designated queue lanes.'
  },
  {
    id: 'tera-2',
    name_en: 'Megenagna Taxi Tera',
    name_am: 'መገናኛ ታክሲ ተራ',
    name_ti: 'መገናኛ ታክሲ ተራ',
    subcity: 'Yeka',
    exact_location_en: 'Around Megenagna Square, behind Lem Hotel turn & CMC entrance',
    exact_location_am: 'በመገናኛ አደባባይ ዙሪያ፣ ወደ ለም ሆቴል በሚወስደው መንገድና ሲኤምሲ መግቢያ',
    exact_location_ti: 'ኣብ ዙርያ ኣደባባይ መገናኛ፡ መንገዲ ለም ሆቴል',
    latitude: 9.0204,
    longitude: 38.8014,
    weyala_shout: 'ቦሌ ቦሌ! ሲኤምሲ አያት! ፒያሳ ፒያሳ! ኮተቤ!',
    destinations: [
      { to: 'Bole Medhanialem / Edna Mall', to_am: 'ቦሌ መድኃኔዓለም / ኤድና ሞል', to_ti: 'ቦሌ መድኃኔዓለም', keywords: ['bole', 'ቦሌ', 'edna mall', 'ኤድና ሞል', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 12, duration_mins: 15 },
      { to: 'CMC Michael & Ayat', to_am: 'ሲኤምሲ ሚካኤልና አያት', to_ti: 'ሲኤምሲን ኣያትን', keywords: ['cmc', 'ሲኤምሲ', 'ayat', 'አያት', 'michael', 'ሚካኤል'], fare_etb: 12, duration_mins: 20 },
      { to: 'Piazza / Arat Kilo', to_am: 'ፒያሳ / አራት ኪሎ', to_ti: 'ፒያሳ / ኣርባዕተ ኪሎ', keywords: ['piazza', 'ፒያሳ', 'arat kilo', 'አራት ኪሎ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Kazanchis / Stadium', to_am: 'ካዛንቺስ / ስቴዲየም', to_ti: 'ካዛንቺስ / ስቴዲየም', keywords: ['kazanchis', 'ካዛንቺስ', 'stadium', 'ስቴዲየም'], fare_etb: 12, duration_mins: 18 },
      { to: 'Kotebe / 02', to_am: 'ኮተቤ / 02', to_ti: 'ኮተቤ', keywords: ['kotebe', 'ኮተቤ', 'kara', 'ካራ'], fare_etb: 10, duration_mins: 15 }
    ],
    operating_hours: '05:30 - 23:00',
    queue_tips_en: 'Major interchange connecting East Addis Ababa with Bole and Downtown.'
  },
  {
    id: 'tera-3',
    name_en: 'Piazza (De Gaulle) Taxi Tera',
    name_am: 'ፒያሳ (ደጎል) ታክሲ ተራ',
    name_ti: 'ፒያሳ ታክሲ ተራ',
    subcity: 'Arada',
    exact_location_en: 'De Gaulle Square in front of Taitu Hotel & Cinema Empire',
    exact_location_am: 'ደጎል አደባባይ ከጣይቱ ሆቴልና ኤምፓየር ሲኒማ ፊት ለፊት',
    exact_location_ti: 'ደጎል ኣደባባይ ኣብ ቅድሚ ጣይቱ ሆቴል',
    latitude: 9.0353,
    longitude: 38.7533,
    weyala_shout: 'አራት ኪሎ መገናኛ! ሽሮሜዳ! መርካቶ መርካቶ!',
    destinations: [
      { to: 'Arat Kilo & Siddist Kilo', to_am: 'አራት ኪሎና ስድስት ኪሎ', to_ti: 'ኣርባዕተ ኪሎን ሽዱሽተ ኪሎን', keywords: ['arat kilo', 'አራት ኪሎ', 'siddist kilo', 'ስድስት ኪሎ', 'university', 'ዩኒቨርስቲ'], fare_etb: 8, duration_mins: 10 },
      { to: 'Megenagna via Arat Kilo', to_am: 'መገናኛ በአራት ኪሎ', to_ti: 'መገናኛ ብኣርባዕተ ኪሎ', keywords: ['megenagna', 'መገናኛ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Shiro Meda (Entoto)', to_am: 'ሽሮ ሜዳ (እንጦጦ)', to_ti: 'ሽሮ ሜዳ', keywords: ['shiro meda', 'ሽሮ ሜዳ', 'entoto', 'እንጦጦ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ ኣደባባይ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 15 }
    ],
    operating_hours: '06:00 - 22:30',
    queue_tips_en: 'Central northern hub for Arada, Gullele, and Entoto lines.'
  },
  {
    id: 'tera-4',
    name_en: 'Mercato Taxi Tera',
    name_am: 'መርካቶ ታክሲ ተራ',
    name_ti: 'መርካቶ ታክሲ ተራ',
    subcity: 'Addis Ketema',
    exact_location_en: 'Military Sefer & Sebategna terminal next to Autobus Tera',
    exact_location_am: 'ሚሊተሪ ሰፈር እና ሰባተኛ ተርሚናል ከአውቶቡስ ተራ አጠገብ',
    exact_location_ti: 'ሚሊተሪ ሰፈርን ሰባተኛ ተርሚናልን ጥቓ ኣውቶቡስ ተራ',
    latitude: 9.0315,
    longitude: 38.7368,
    weyala_shout: 'ጦር ኃይሎች! ሜክሲኮ! ዓለም ባንክ! አስኮ!',
    destinations: [
      { to: 'Tor Hailoch', to_am: 'ጦር ኃይሎች', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 20 },
      { to: 'Piazza', to_am: 'ፒያሳ', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Ayer Tena / Alem Bank', to_am: 'አየር ጤና / ዓለም ባንክ', to_ti: 'ኣየር ጤና / ዓለም ባንክ', keywords: ['ayer tena', 'አየር ጤና', 'alem bank', 'ዓለም ባንክ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Asco / Wingate', to_am: 'አስኮ / ዊንጌት', to_ti: 'ኣስኮ / ዊንጌት', keywords: ['asco', 'አስኮ', 'wingate', 'ዊንጌት'], fare_etb: 12, duration_mins: 20 }
    ],
    operating_hours: '05:30 - 22:00',
    queue_tips_en: 'Largest open market terminal. Keep eye on belongings during boarding.'
  },
  {
    id: 'tera-5',
    name_en: 'Bole Medhanialem Taxi Stand',
    name_am: 'ቦሌ መድኃኔዓለም ታክሲ ተራ',
    name_ti: 'ቦሌ መድኃኔዓለም ታክሲ ተራ',
    subcity: 'Bole',
    exact_location_en: 'Camroon Street near Edna Mall and Bole Medhanialem Cathedral',
    exact_location_am: 'ካሜሩን መንገድ ከኤድና ሞልና መድኃኔዓለም ካቴድራል አጠገብ',
    exact_location_ti: 'መንገዲ ካሜሩን ጥቓ ኤድና ሞል',
    latitude: 8.9902,
    longitude: 38.7865,
    weyala_shout: 'ሜክሲኮ ሜክሲኮ! መገናኛ! ሳሪስ!',
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 15, duration_mins: 20 },
      { to: 'Megenagna', to_am: 'መገናኛ', to_ti: 'መገናኛ', keywords: ['megenagna', 'መገናኛ'], fare_etb: 12, duration_mins: 15 },
      { to: 'Saris Abo', to_am: 'ሳሪስ አቦ', to_ti: 'ሳሪስ ኣቦ', keywords: ['saris', 'ሳሪስ', 'abo', 'አቦ'], fare_etb: 15, duration_mins: 22 },
      { to: 'Kazanchis / Stadium', to_am: 'ካዛንቺስ / ስቴዲየም', to_ti: 'ካዛንቺስ / ስቴዲየም', keywords: ['kazanchis', 'ካዛንቺስ', 'stadium', 'ስቴዲየም'], fare_etb: 12, duration_mins: 18 }
    ],
    operating_hours: '05:30 - 23:30',
    queue_tips_en: 'Primary terminal for Bole district, airport staff, and business travelers.'
  },
  {
    id: 'tera-6',
    name_en: 'Stadium & Legehar Stand',
    name_am: 'ስቴዲየም ታክሲ ተራ',
    name_ti: 'ስቴዲየም ታክሲ ተራ',
    subcity: 'Kirkos',
    exact_location_en: 'In front of Addis Ababa Stadium & near National Theatre / Legehar',
    exact_location_am: 'ከአዲስ አበባ ስቴዲየም ፊት ለፊት እና ከብሔራዊ ቴአትር / ለገሃር አጠገብ',
    exact_location_ti: 'ኣብ ቅድሚ ስቴዲየም ኣዲስ ኣበባ',
    latitude: 9.0135,
    longitude: 38.7569,
    weyala_shout: 'ቦሌ ቦሌ! ሳሪስ ቃሊቲ! ፒያሳ!',
    destinations: [
      { to: 'Bole Airport', to_am: 'ቦሌ ኤርፖርት', to_ti: 'ቦሌ ኤርፖርት', keywords: ['bole', 'ቦሌ', 'airport', 'ኤርፖርት'], fare_etb: 15, duration_mins: 18 },
      { to: 'Saris / Kality', to_am: 'ሳሪስ / ቃሊቲ', to_ti: 'ሳሪስ / ቃሊቲ', keywords: ['saris', 'ሳሪስ', 'kality', 'ቃሊቲ'], fare_etb: 15, duration_mins: 25 },
      { to: 'Gotera / Lancia', to_am: 'ጎተራ / ላንቻ', to_ti: 'ጎተራ / ላንቻ', keywords: ['gotera', 'ጎተራ', 'lancia', 'ላንቻ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Piazza', to_am: 'ፒያሳ', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ'], fare_etb: 10, duration_mins: 15 }
    ],
    operating_hours: '06:00 - 22:30',
    queue_tips_en: 'Interchange directly accessible from East-West and North-South LRT lines.'
  },
  {
    id: 'tera-7',
    name_en: 'Tor Hailoch Taxi Stand',
    name_am: 'ጦር ኃይሎች ታክሲ ተራ',
    name_ti: 'ጦር ኃይሎች ታክሲ ተራ',
    subcity: 'Lideta',
    exact_location_en: 'Under Tor Hailoch LRT Overpass next to Total gas station',
    exact_location_am: 'በጦር ኃይሎች ባቡር ድልድይ ስር ከቶታል ነዳጅ ማደያ አጠገብ',
    exact_location_ti: 'ኣብ ትሕቲ ድልድል ባቡር ጦር ኃይሎች',
    latitude: 9.0118,
    longitude: 38.7248,
    weyala_shout: 'መርካቶ መርካቶ! ዓለም ባንክ! ሜክሲኮ!',
    destinations: [
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Ayer Tena / Alem Bank', to_am: 'አየር ጤና / ዓለም ባንክ', to_ti: 'ኣየር ጤና / ዓለም ባንክ', keywords: ['ayer tena', 'አየር ጤና', 'alem bank', 'ዓለም ባንክ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Jomo', to_am: 'ጆሞ', to_ti: 'ጆሞ', keywords: ['jomo', 'ጆሞ'], fare_etb: 15, duration_mins: 20 }
    ],
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Gateway connecting West Addis Ababa (Alem Bank, Kolfe) to city center.'
  },
  {
    id: 'tera-8',
    name_en: 'Saris Abo Taxi Tera',
    name_am: 'ሳሪስ አቦ ታክሲ ተራ',
    name_ti: 'ሳሪስ ኣቦ ታክሲ ተራ',
    subcity: 'Nifas Silk',
    exact_location_en: 'Around Saris Abo Church under the ring road interchange',
    exact_location_am: 'በሳሪስ አቦ ቤተክርስቲያን ዙሪያ ከቀለበት መንገድ ስር',
    exact_location_ti: 'ኣብ ዙርያ ቤተክርስቲያን ሳሪስ ኣቦ',
    latitude: 8.9554,
    longitude: 38.7651,
    weyala_shout: 'ሜክሲኮ ሜክሲኮ! ስቴዲየም! ቃሊቲ!',
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 15, duration_mins: 25 },
      { to: 'Stadium', to_am: 'ስቴዲየም', to_ti: 'ስቴዲየም', keywords: ['stadium', 'ስቴዲየም'], fare_etb: 15, duration_mins: 25 },
      { to: 'Kality Terminal', to_am: 'ቃሊቲ ተርሚናል', to_ti: 'ቃሊቲ ተርሚናል', keywords: ['kality', 'ቃሊቲ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Lebu / Jomo', to_am: 'ለቡ / ጆሞ', to_ti: 'ለቡ / ጆሞ', keywords: ['lebu', 'ለቡ', 'jomo', 'ጆሞ'], fare_etb: 15, duration_mins: 20 }
    ],
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'South Addis connector for Nifas Silk, Gotera, and Akaki Kality.'
  },
  {
    id: 'tera-9',
    name_en: 'Jomo 1 & 2 Taxi Stand',
    name_am: 'ጆሞ ታክሲ ተራ',
    name_ti: 'ጆሞ ታክሲ ተራ',
    subcity: 'Nifas Silk',
    exact_location_en: 'Jomo Roundabout near Gate 1 Commercial Center',
    exact_location_am: 'በጆሞ አደባባይ በር 1 የገበያ ማዕከል አጠገብ',
    exact_location_ti: 'ኣብ ኣደባባይ ጆሞ በር 1',
    latitude: 8.9610,
    longitude: 38.7075,
    weyala_shout: 'ሜክሲኮ ሜክሲኮ! ጦር ኃይሎች!',
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 18, duration_mins: 30 },
      { to: 'Tor Hailoch', to_am: 'ጦር ኃይሎች', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች'], fare_etb: 15, duration_mins: 22 },
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 18, duration_mins: 32 }
    ],
    operating_hours: '05:30 - 22:00',
    queue_tips_en: 'Southwest residential corridor with high morning demand.'
  },
  {
    id: 'tera-10',
    name_en: 'Kality Taxi Tera',
    name_am: 'ቃሊቲ ታክሲ ተራ',
    name_ti: 'ቃሊቲ ታክሲ ተራ',
    subcity: 'Akaki Kality',
    exact_location_en: 'Beside Kality LRT Terminal & Akaki Customs office',
    exact_location_am: 'ከቃሊቲ ቀላል ባቡር ተርሚናልና ከጉምሩክ ጽ/ቤት አጠገብ',
    exact_location_ti: 'ጥቓ ተርሚናል ባቡር ቃሊቲ',
    latitude: 8.9056,
    longitude: 38.7561,
    weyala_shout: 'ሳሪስ ስቴዲየም! ሜክሲኮ! አቃቂ!',
    destinations: [
      { to: 'Saris / Stadium', to_am: 'ሳሪስ / ስቴዲየም', to_ti: 'ሳሪስ / ስቴዲየም', keywords: ['saris', 'ሳሪስ', 'stadium', 'ስቴዲየም'], fare_etb: 15, duration_mins: 25 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 18, duration_mins: 35 },
      { to: 'Akaki / Tulu Dimtu', to_am: 'አቃቂ / ቱሉ ዲምቱ', to_ti: 'ኣቃቂ / ቱሉ ዲምቱ', keywords: ['akaki', 'አቃቂ', 'tulu dimtu', 'ቱሉ ዲምቱ'], fare_etb: 10, duration_mins: 15 }
    ],
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Southern gateway connecting Addis Ababa to Bishoftu corridor.'
  },
  {
    id: 'tera-11',
    name_en: 'Arat Kilo & Siddist Kilo Taxi Stand',
    name_am: 'አራት ኪሎና ስድስት ኪሎ ታክሲ ተራ',
    name_ti: 'ኣርባዕተ ኪሎ ታክሲ ተራ',
    subcity: 'Arada & Gullele',
    exact_location_en: 'King George VI Square around Addis Ababa University Main Campus entrance',
    exact_location_am: 'በአራት ኪሎ አደባባይና በአዲስ አበባ ዩኒቨርሲቲ ዋና በር ዙሪያ',
    exact_location_ti: 'ኣብ ኣደባባይ ኣርባዕተ ኪሎ ኣብ ጥቓ ዩኒቨርስቲ',
    latitude: 9.0334,
    longitude: 38.7618,
    weyala_shout: 'ፒያሳ ፒያሳ! መገናኛ! ሽሮሜዳ! ካዛንቺስ!',
    destinations: [
      { to: 'Piazza (De Gaulle)', to_am: 'ፒያሳ (ደጎል)', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ', 'de gaulle', 'ደጎል'], fare_etb: 8, duration_mins: 10 },
      { to: 'Megenagna', to_am: 'መገናኛ', to_ti: 'መገናኛ', keywords: ['megenagna', 'መገናኛ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Shiro Meda', to_am: 'ሽሮ ሜዳ', to_ti: 'ሽሮ ሜዳ', keywords: ['shiro meda', 'ሽሮ ሜዳ', 'entoto', 'እንጦጦ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Kazanchis / Stadium', to_am: 'ካዛንቺስ / ስቴዲየም', to_ti: 'ካዛንቺስ / ስቴዲየም', keywords: ['kazanchis', 'ካዛንቺስ', 'stadium', 'ስቴዲየም'], fare_etb: 10, duration_mins: 14 }
    ],
    operating_hours: '06:00 - 22:30',
    queue_tips_en: 'Major student and civil service hub. High frequency of minibuses.'
  },
  {
    id: 'tera-12',
    name_en: 'CMC Michael & Ayat Taxi Stand',
    name_am: 'ሲኤምሲ ሚካኤልና አያት ታክሲ ተራ',
    name_ti: 'ሲኤምሲን ኣያትን ታክሲ ተራ',
    subcity: 'Yeka',
    exact_location_en: 'In front of CMC Michael Church and Ayat LRT Terminus',
    exact_location_am: 'በሲኤምሲ ሚካኤል ቤተክርስቲያን ፊት ለፊትና አያት ባቡር ማቆሚያ',
    exact_location_ti: 'ኣብ ቅድሚ ቤተክርስቲያን ሲኤምሲ ሚካኤል',
    latitude: 9.0229,
    longitude: 38.8317,
    weyala_shout: 'መገናኛ መገናኛ! ገርጂ! ቦሌ!',
    destinations: [
      { to: 'Megenagna Terminal', to_am: 'መገናኛ ተርሚናል', to_ti: 'መገናኛ ተርሚናል', keywords: ['megenagna', 'መገናኛ'], fare_etb: 12, duration_mins: 18 },
      { to: 'Gerji / Imperial', to_am: 'ገርጂ / ኢምፔሪያል', to_ti: 'ገርጂ', keywords: ['gerji', 'ገርጂ', 'imperial', 'ኢምፔሪያል'], fare_etb: 12, duration_mins: 15 },
      { to: 'Bole Medhanialem', to_am: 'ቦሌ መድኃኔዓለም', to_ti: 'ቦሌ መድኃኔዓለም', keywords: ['bole', 'ቦሌ', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 15, duration_mins: 22 }
    ],
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Serves Eastern condominium districts and connects to the Light Rail.'
  },
  {
    id: 'tera-13',
    name_en: 'Ayer Tena & Alem Bank Taxi Stand',
    name_am: 'አየር ጤናና ዓለም ባንክ ታክሲ ተራ',
    name_ti: 'ኣየር ጤናን ዓለም ባንክን ታክሲ ተራ',
    subcity: 'Kolfe Keranio',
    exact_location_en: 'Ayer Tena Roundabout along Jimma Road',
    exact_location_am: 'በአየር ጤና አደባባይ በጅማ መንገድ ላይ',
    exact_location_ti: 'ኣብ ኣደባባይ ኣየር ጤና መንገዲ ጅማ',
    latitude: 9.0020,
    longitude: 38.6950,
    weyala_shout: 'ጦር ኃይሎች! መርካቶ! ሜክሲኮ!',
    destinations: [
      { to: 'Tor Hailoch', to_am: 'ጦር ኃይሎች', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 15, duration_mins: 25 }
    ],
    operating_hours: '05:30 - 22:00',
    queue_tips_en: 'Primary western portal for Kolfe Keranio and Jimma road travelers.'
  },
  {
    id: 'tera-14',
    name_en: 'Shiro Meda (Entoto) Taxi Stand',
    name_am: 'ሽሮ ሜዳ (እንጦጦ) ታክሲ ተራ',
    name_ti: 'ሽሮ ሜዳ ታክሲ ተራ',
    subcity: 'Gullele',
    exact_location_en: 'Shiro Meda market next to the US Embassy turn',
    exact_location_am: 'በሽሮ ሜዳ ባህላዊ አልባሳት ገበያ ከአሜሪካ ኤምባሲ መታጠፊያ አጠገብ',
    exact_location_ti: 'ኣብ ዕዳጋ ሽሮ ሜዳ ጥቓ ኤምባሲ ኣሜሪካ',
    latitude: 9.0601,
    longitude: 38.7620,
    weyala_shout: 'ፒያሳ ፒያሳ! አራት ኪሎ! እንጦጦ ፓርክ!',
    destinations: [
      { to: 'Piazza (De Gaulle)', to_am: 'ፒያሳ (ደጎል)', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Arat Kilo', to_am: 'አራት ኪሎ', to_ti: 'ኣርባዕተ ኪሎ', keywords: ['arat kilo', 'አራት ኪሎ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Entoto Park Terminus', to_am: 'እንጦጦ ፓርክ', to_ti: 'እንጦጦ ፓርክ', keywords: ['entoto', 'እንጦጦ', 'park', 'ፓርክ'], fare_etb: 8, duration_mins: 10 }
    ],
    operating_hours: '06:00 - 21:30',
    queue_tips_en: 'Access station for Entoto Park, traditional cotton market, and North Addis.'
  },
  {
    id: 'tera-15',
    name_en: 'Gotera & Kera Taxi Stand',
    name_am: 'ጎተራና ቄራ ታክሲ ተራ',
    name_ti: 'ጎተራን ቄራን ታክሲ ተራ',
    subcity: 'Kirkos',
    exact_location_en: 'Gotera Interchange under the Lancia flyover',
    exact_location_am: 'በጎተራ ማስተላለፊያ በላንቻ ድልድይ ስር',
    exact_location_ti: 'ኣብ ጎተራ ትሕቲ ድልድል ላንቻ',
    latitude: 8.9862,
    longitude: 38.7570,
    weyala_shout: 'ሜክሲኮ ሜክሲኮ! ሳሪስ! ቦሌ!',
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Saris Abo', to_am: 'ሳሪስ አቦ', to_ti: 'ሳሪስ ኣቦ', keywords: ['saris', 'ሳሪስ', 'abo', 'አቦ'], fare_etb: 10, duration_mins: 14 },
      { to: 'Bole Medhanialem', to_am: 'ቦሌ መድኃኔዓለም', to_ti: 'ቦሌ', keywords: ['bole', 'ቦሌ', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 12, duration_mins: 15 }
    ],
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Central junction between Debre Zeyit Road and Ring Road corridor.'
  }
];

const taxiServices = [
  {
    id: 'ride',
    name: 'RIDE (Hybrid Designs)',
    name_am: 'ራይድ ታክሲ',
    shortcode: '8294',
    type: 'Ride-Hailing (App & Call Center)',
    availability: '24/7 Across all Addis Ababa',
    rates_info: 'Base Fare ~100 ETB + ~28 ETB/km (Night tariff applies after 22:00)',
    how_to_get: 'Dial 8294 on any phone (Ethio Telecom / Safaricom) or book via RIDE App.',
    badge: 'Popular'
  },
  {
    id: 'feres',
    name: 'Feres (ፈረስ)',
    name_am: 'ፈረስ ታክሲ',
    shortcode: '6090',
    type: 'Ride-Hailing (App & Call Center)',
    availability: '24/7 Across all Addis Ababa',
    rates_info: 'Base Fare ~100 ETB + ~25 ETB/km (Earn miles & rewards)',
    how_to_get: 'Dial 6090 or book on Feres Passenger App with instant driver dispatch.',
    badge: 'Best Value'
  },
  {
    id: 'yango',
    name: 'Yango Ethiopia',
    name_am: 'ያንጎ ታክሲ',
    shortcode: 'App only',
    type: 'App-Based Ride-Hailing',
    availability: '24/7 Central & Suburban Addis',
    rates_info: 'Economy & Comfort classes with upfront fixed pricing in app',
    how_to_get: 'Download Yango App on iOS/Android; pin location for nearest driver.',
    badge: 'Modern GPS'
  },
  {
    id: 'zayride',
    name: 'ZayRide',
    name_am: 'ዛይራይድ',
    shortcode: '6303',
    type: 'Ride-Hailing & On-Demand',
    availability: '24/7 Citywide',
    rates_info: 'Standard meter rates + hourly rental options available',
    how_to_get: 'Dial 6303 or use ZayRide App.',
    badge: 'Established'
  },
  {
    id: 'airport_yellow',
    name: 'Airport Yellow Taxis',
    name_am: 'ቢጫ የኤርፖርት ታክሲዎች',
    shortcode: 'Terminal Desk',
    type: 'Official Airport Transport',
    availability: '24/7 at Bole International Airport',
    rates_info: 'Flat-rate zones: Bole ~300 ETB, Downtown ~500-700 ETB, Suburbs ~800+ ETB',
    how_to_get: 'Book at official dispatch desk inside Terminal 1 or Terminal 2 arrival halls.',
    badge: 'Official Airport'
  },
  {
    id: 'lada_contract',
    name: 'Blue Lada Contract Taxis',
    name_am: 'ሰማያዊ ላዳ ኮንትራት',
    shortcode: 'Street Hail',
    type: 'Private Traditional Taxi (ኮንትራት)',
    availability: 'Found outside major hotels, hospitals & squares',
    rates_info: 'Negotiated flat rate (usually 200 - 500 ETB depending on distance)',
    how_to_get: 'Walk up to parked blue Lada outside Sheraton, Hilton, Tikur Anbessa, or flag on street.',
    badge: 'Traditional'
  }
];

// ====================================================================
// Addis Ababa Regional & Intercity Bus Terminals (የክልል አውቶቡስ ተርሚናሎች)
// ====================================================================
const regionalTerminals = [
  {
    id: 'reg-1',
    name_en: 'Autobus Tera (Mercato Intercity Terminal)',
    name_am: 'መርካቶ አውቶቡስ ተራ',
    name_ti: 'መርካቶ ኣውቶቡስ ተራ',
    subcity: 'Addis Ketema',
    exact_location_en: 'Mercato, near Military Sefer & Sebategna',
    exact_location_am: 'መርካቶ ሚሊተሪ ሰፈርና ሰባተኛ አጠገብ',
    exact_location_ti: 'መርካቶ ጥቓ ሚሊተሪ ሰፈር',
    latitude: 9.0315,
    longitude: 38.7368,
    corridor_served: 'North & Northwest Ethiopia',
    destinations: ['Bahir Dar', 'Gondar', 'Dessie', 'Debre Markos', 'Mekelle', 'Woldia', 'Lalibela'],
    bus_companies: ['Selam Bus', 'Sky Bus', 'Abay Bus', 'Golden Bus', 'Public Level 1 & 2'],
    operating_hours: '05:00 - 18:00 (Early departures 05:30 - 06:30 AM)'
  },
  {
    id: 'reg-2',
    name_en: 'Lamberet Intercity Bus Terminal',
    name_am: 'ላምበረት የክልል አውቶቡስ ተርሚናል',
    name_ti: 'ላምበረት ተርሚናል',
    subcity: 'Yeka',
    exact_location_en: 'Yeka, on Dessie / Asmara Road past Megenagna',
    exact_location_am: 'የካ፣ ከመገናኛ አለፍ ብሎ በደሴ/አስመራ መንገድ',
    exact_location_ti: 'የካ፡ ካብ መገናኛ ንደሴ ኣብ ዝወስድ መንገዲ',
    latitude: 9.0280,
    longitude: 38.8150,
    corridor_served: 'East & Northeast Ethiopia',
    destinations: ['Debre Birhan', 'Dire Dawa', 'Harar', 'Jigjiga', 'Awash', 'Semera / Afar'],
    bus_companies: ['Selam Bus', 'Oda Bus', 'Harar Express', 'Public Regional Buses'],
    operating_hours: '05:00 - 18:00'
  },
  {
    id: 'reg-3',
    name_en: 'Kality Intercity Bus Terminal',
    name_am: 'ቃሊቲ የክልል አውቶቡስ ተርሚናል',
    name_ti: 'ቃሊቲ ናይ ክልል ተርሚናል',
    subcity: 'Akaki Kality',
    exact_location_en: 'Akaki Kality, next to Kality Customs & Express Highway entrance',
    exact_location_am: 'ቃሊቲ፣ ከጉምሩክ አጠገብ ወደ አዳማ ፈጣን መንገድ መግቢያ',
    exact_location_ti: 'ቃሊቲ ጥቓ ጉምሩክን መእተዊ ፈጣን መንገዲ ኣዳማን',
    latitude: 8.9056,
    longitude: 38.7561,
    corridor_served: 'South & Southeast (Rift Valley & Oromia/Sidama)',
    destinations: ['Hawassa', 'Adama (Nazret)', 'Shashemene', 'Bishoftu (Debre Zeyit)', 'Arba Minch', 'Dilla', 'Moyale', 'Bale Robe'],
    bus_companies: ['Selam Bus', 'Walya Bus', 'Zemen Bus', 'Public Regional Buses'],
    operating_hours: '05:00 - 19:00'
  },
  {
    id: 'reg-4',
    name_en: 'Ashewa Meda (Ayer Tena Terminal)',
    name_am: 'አሸዋ ሜዳ (አየር ጤና) ተርሚናል',
    name_ti: 'ኣሸዋ ሜዳ (ኣየር ጤና) ተርሚናል',
    subcity: 'Kolfe Keranio',
    exact_location_en: 'Past Tor Hailoch, Ayer Tena along Jimma Road',
    exact_location_am: 'ከጦር ኃይሎች አለፍ ብሎ አየር ጤና በጅማ መንገድ',
    exact_location_ti: 'ካብ ጦር ኃይሎች ሓሊፍካ ኣየር ጤና ብመንገዲ ጅማ',
    latitude: 9.0020,
    longitude: 38.6950,
    corridor_served: 'West & Southwest Ethiopia',
    destinations: ['Jimma', 'Ambo', 'Nekemte', 'Woliso', 'Bedele', 'Gambella', 'Asosa'],
    bus_companies: ['Geda Bus', 'Public Regional Level 1 & 2'],
    operating_hours: '05:00 - 18:00'
  }
];

// ====================================================================
// Feeder Bajaj & Auto-Rickshaw Zones (ባጃጅ የመጋቢ ትራንስፖርት ቀጠናዎች)
// ====================================================================
const feederBajajZones = [
  {
    id: 'bajaj-1',
    zone_name_en: 'CMC & Ayat Feeder Zone',
    zone_name_am: 'ሲኤምሲና አያት የባጃጅ ቀጠና',
    subcity: 'Yeka & Bole',
    feed_to: 'Ayat LRT Terminus, CMC Michael LRT Station, Meri',
    tariff_etb: '5 - 10 ETB',
    rules_en: 'Connects residential condominiums (Ayat Zone 1-8, CMC blocks) to main train stations. Forbidden from highway.'
  },
  {
    id: 'bajaj-2',
    zone_name_en: 'Jomo & Lebu Feeder Zone',
    zone_name_am: 'ጆሞና ለቡ የባጃጅ ቀጠና',
    subcity: 'Nifas Silk',
    feed_to: 'Jomo Roundabout Taxi Stand, Haile Garment, Lebu Varnero',
    tariff_etb: '5 - 12 ETB',
    rules_en: 'Internal neighborhood circulation inside Jomo 1, 2, 3 and Lebu residential sites.'
  },
  {
    id: 'bajaj-3',
    zone_name_en: 'Kotebe & Hana Mariam Zone',
    zone_name_am: 'ኮተቤና ሐና ማሪያም የባጃጅ ቀጠና',
    subcity: 'Yeka',
    feed_to: 'Kotebe 02 Minibus Stand, Kara Bus Stop',
    tariff_etb: '5 - 10 ETB',
    rules_en: 'Serves hilly interior access roads connecting to Dessie main avenue.'
  },
  {
    id: 'bajaj-4',
    zone_name_en: 'Akaki & Kality Suburb Zone',
    zone_name_am: 'አቃቂና ቃሊቲ የባጃጅ ቀጠና',
    subcity: 'Akaki Kality',
    feed_to: 'Kality LRT Station, Tulu Dimtu Condominiums, Kality Industry Zone',
    tariff_etb: '5 - 15 ETB',
    rules_en: 'Crucial last-mile link for industrial workers and residential estates.'
  }
];

// API 5: Get all Taxi Ranks (ተራዎች)
app.get('/api/v1/taxi-teras', (req, res) => {
  res.json({ success: true, count: taxiTeras.length, data: taxiTeras });
});

// API 6: Get all Taxi Dispatch & On-demand Services (የጥሪ ታክሲዎች)
app.get('/api/v1/taxi-services', (req, res) => {
  res.json({ success: true, count: taxiServices.length, data: taxiServices });
});

// API 7: Find Taxi Place ("Where can I get a taxi to [destination]?")
app.get('/api/v1/taxi/find-place', (req, res) => {
  const { to } = req.query;
  if (!to) {
    return res.status(400).json({ success: false, error: 'Destination parameter "to" is required' });
  }

  const query = to.toLowerCase().trim();
  const matchingTeras = [];

  for (const tera of taxiTeras) {
    const isTeraMatch = 
      tera.name_en.toLowerCase().includes(query) ||
      (tera.name_am && tera.name_am.includes(query)) ||
      (tera.name_ti && tera.name_ti.includes(query)) ||
      tera.subcity.toLowerCase().includes(query);

    const matchedDestinations = tera.destinations.filter(d =>
      d.to.toLowerCase().includes(query) ||
      (d.to_am && d.to_am.includes(query)) ||
      (d.to_ti && d.to_ti.includes(query)) ||
      (d.keywords && d.keywords.some(k => k.toLowerCase().includes(query)))
    );

    if (matchedDestinations.length > 0 || isTeraMatch) {
      matchingTeras.push({
        tera_id: tera.id,
        tera_name_en: tera.name_en,
        tera_name_am: tera.name_am,
        tera_name_ti: tera.name_ti,
        subcity: tera.subcity,
        exact_location_en: tera.exact_location_en,
        exact_location_am: tera.exact_location_am,
        exact_location_ti: tera.exact_location_ti,
        latitude: tera.latitude,
        longitude: tera.longitude,
        weyala_shout: tera.weyala_shout,
        operating_hours: tera.operating_hours,
        queue_tips_en: tera.queue_tips_en,
        matched_destinations: matchedDestinations.length > 0 ? matchedDestinations : tera.destinations
      });
    }
  }

  res.json({
    success: true,
    destination_queried: to,
    matches_count: matchingTeras.length,
    data: matchingTeras
  });
});

// API 8: Regional & Intercity Terminals
app.get('/api/v1/regional-terminals', (req, res) => {
  res.json({ success: true, count: regionalTerminals.length, data: regionalTerminals });
});

// API 9: Feeder Bajaj & Auto-Rickshaw Zones
app.get('/api/v1/feeder-bajaj', (req, res) => {
  res.json({ success: true, count: feederBajajZones.length, data: feederBajajZones });
});

// API 10: Addis Transit Slang & Weyala Voice Dictionary
const slangDictionary = [
  {
    phrase_am: 'ወራጅ አለ!',
    phrase_en: 'Waraj Ale!',
    translation_en: 'Drop off here / Stop the taxi!',
    usage_context: 'Shouted loudly by passengers when their destination stop is approaching so driver pulls over.',
    audio_text: 'ወራጅ አለ'
  },
  {
    phrase_am: 'ሞላ ሞላ! አንድ ሰው!',
    phrase_en: 'Mola Mola! And Sew!',
    translation_en: 'Almost full! Only one seat left!',
    usage_context: 'Weyala conductor shout to fill the final passenger seat before vehicle departs.',
    audio_text: 'ሞላ ሞላ አንድ ሰው'
  },
  {
    phrase_am: 'ዝርዝር ያዙ!',
    phrase_en: 'Zirzir Yazu!',
    translation_en: 'Hold exact change!',
    usage_context: 'Conductors demand small notes (5, 10, 50 ETB) to avoid change delays during peak trips.',
    audio_text: 'ዝርዝር ያዙ'
  },
  {
    phrase_am: 'ቦሌ ቦሌ!',
    phrase_en: 'Bole Bole!',
    translation_en: 'Bole direction!',
    usage_context: 'Common conductor route call in Mexico, Piazza, and Megenagna.',
    audio_text: 'ቦሌ ቦሌ'
  },
  {
    phrase_am: 'ሜክሲኮ ሳሪስ!',
    phrase_en: 'Mexico Saris!',
    translation_en: 'Mexico to Saris corridor!',
    usage_context: 'Major north-south transit artery call shouted at Legehar and Gotera.',
    audio_text: 'ሜክሲኮ ሳሪስ'
  },
  {
    phrase_am: 'መርካቶ ተራ!',
    phrase_en: 'Mercato Tera!',
    translation_en: 'To Mercato terminal!',
    usage_context: 'Call for the bustling open-air market hub in Addis Ketema.',
    audio_text: 'መርካቶ ተራ'
  },
  {
    phrase_am: 'መገናኛ አያት!',
    phrase_en: 'Megenagna Ayat!',
    translation_en: 'East Addis / LRT terminus call!',
    usage_context: 'Call for passengers heading towards the residential condominiums.',
    audio_text: 'መገናኛ አያት'
  },
  {
    phrase_am: 'ኮንትራት ብቻ!',
    phrase_en: 'Contract Bicha!',
    translation_en: 'Private charter only!',
    usage_context: 'Used by Blue Lada and private taxis when not picking shared passengers.',
    audio_text: 'ኮንትራት ብቻ'
  }
];

app.get('/api/v1/slang-dictionary', (req, res) => {
  res.json({ success: true, count: slangDictionary.length, data: slangDictionary });
});

// API 11: Real-time Transit Fare Comparison by Distance
app.get('/api/v1/fare-compare', (req, res) => {
  const km = parseFloat(req.query.distanceKm) || 8.0;

  // Official regulated minibus tariff
  let minibusFare = 7.00;
  if (km > 4 && km <= 8) minibusFare = 12.00;
  else if (km > 8 && km <= 12) minibusFare = 15.00;
  else if (km > 12) minibusFare = 20.00;

  const comparison = [
    {
      mode: 'lrt',
      title: 'Light Rail (LRT)',
      fare_etb: 10.00,
      note: 'Fixed flat fare across all lines (East-West & North-South)',
      best_for: 'Avoiding road traffic & longest trips across the city'
    },
    {
      mode: 'minibus',
      title: 'Minibus Taxi (ህዝባዊ ታክሲ)',
      fare_etb: minibusFare,
      note: `Regulated bracket for ${km} km`,
      best_for: 'Frequent departures, widespread neighborhood stops'
    },
    {
      mode: 'anbessa',
      title: 'Anbessa City Bus',
      fare_etb: km <= 8 ? 6.00 : 8.00,
      note: 'Subsidized municipal mass transit',
      best_for: 'Cheapest commuter option for daily workers and students'
    },
    {
      mode: 'sheger',
      title: 'Sheger Express Bus',
      fare_etb: km <= 8 ? 8.00 : 10.00,
      note: 'Comfortable express seating',
      best_for: 'Direct cross-city express corridors'
    },
    {
      mode: 'ridehail',
      title: 'Ride / Feres (ጥሪ ታክሲ)',
      fare_etb: Math.round(100 + (km * 26)),
      note: 'Base 100 ETB + ~26 ETB/km meter',
      best_for: 'Door-to-door comfort, luggage, night travel'
    }
  ];

  res.json({
    success: true,
    distance_km: km,
    comparison
  });
});

// API 12: Addis Traffic & Rush Hour Advisory
app.get('/api/v1/traffic-advisory', (req, res) => {
  const now = new Date();
  // Addis Ababa is UTC+3
  const utcHours = now.getUTCHours();
  const eatHours = (utcHours + 3) % 24;

  const isMorningPeak = eatHours >= 7 && eatHours < 10;
  const isEveningPeak = eatHours >= 17 && eatHours < 20;
  const isPeak = isMorningPeak || isEveningPeak;

  res.json({
    success: true,
    eat_time_hours: eatHours,
    is_peak_hours: isPeak,
    peak_status: isMorningPeak ? 'Morning Peak Rush (07:00 - 09:30)' : (isEveningPeak ? 'Evening Peak Rush (17:00 - 19:45)' : 'Normal Flow / Off-Peak'),
    hotspots: [
      { area: 'Mexico Square Flyover', level: isPeak ? 'Heavy Congestion' : 'Moderate', advice: 'Use LRT overpass or queue early at bunna & shay terminal.' },
      { area: 'Megenagna Roundabout', level: isPeak ? 'Very High Demand' : 'Moderate', advice: 'Feeder queues for Ayat and Bole extend onto pedestrian paths.' },
      { area: 'Gotera Lancia Junction', level: isPeak ? 'Heavy' : 'Smooth', advice: 'Major bottleneck connecting Debre Zeyit Road to city center.' },
      { area: 'Bole Road (Africa Avenue)', level: isPeak ? 'Heavy Traffic' : 'Light', advice: 'Peak airport transfer traffic.' }
    ]
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Addis Transit & Taxi System API (መገዲ መጓዓዝያ ኣዲስ ኣበባ)',
    version: '3.3.0 (Full Transit, Taxi, Regional, Bajaj, Slang & Fare Calculator)',
    endpoints: [
      '/api/v1/stops',
      '/api/v1/routes',
      '/api/v1/routes?transportType=lrt',
      '/api/v1/routes/plan?originId=6&destId=3',
      '/api/v1/network/stats',
      '/api/v1/taxi-teras',
      '/api/v1/taxi-services',
      '/api/v1/taxi/find-place?to=Bole',
      '/api/v1/regional-terminals',
      '/api/v1/feeder-bajaj',
      '/api/v1/slang-dictionary',
      '/api/v1/fare-compare?distanceKm=8',
      '/api/v1/traffic-advisory'
    ]
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Addis Transit API Server running on http://localhost:${PORT}`);
});
