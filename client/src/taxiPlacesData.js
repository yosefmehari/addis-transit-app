// ====================================================================
// Addis Ababa Taxi Stations, Landmarks & Walking Guides Dataset
// Complete physical place details, landmarks, queue lanes & walking directions
// ====================================================================

export const ADDIS_STARTING_LANDMARKS = [
  { id: 'meskel', name_en: 'Meskel Square (City Center)', name_am: 'መስቀል አደባባይ (መሃል ከተማ)', name_ti: 'መስቀል ኣደባባይ', lat: 9.0102, lng: 38.7628 },
  { id: 'stadium', name_en: 'Stadium / Legehar Train Station', name_am: 'ስቴዲየም / ለገሃር ባቡር ጣቢያ', name_ti: 'ስቴዲየም / ለገሃር', lat: 9.0135, lng: 38.7569 },
  { id: 'mexico', name_en: 'Mexico Square / Underpass', name_am: 'ሜክሲኮ አደባባይ', name_ti: 'መክሲኮ ኣደባባይ', lat: 9.0108, lng: 38.7511 },
  { id: 'bole_med', name_en: 'Bole Medhanialem / Edna Mall', name_am: 'ቦሌ መድኃኔዓለም / ኤድና ሞል', name_ti: 'ቦሌ መድኃኔዓለም', lat: 8.9902, lng: 38.7865 },
  { id: 'bole_air', name_en: 'Bole International Airport (Terminal 2)', name_am: 'ቦሌ ኤርፖርት ተርሚናል 2', name_ti: 'ቦሌ ኤርፖርት', lat: 8.9806, lng: 38.7997 },
  { id: 'megenagna', name_en: 'Megenagna Roundabout & Zefmesh', name_am: 'መገናኛ አደባባይና ዘፍመሽ ሞል', name_ti: 'መገናኛ ኣደባባይ', lat: 9.0204, lng: 38.8014 },
  { id: 'piazza', name_en: 'Piazza De Gaulle Square / Taitu Hotel', name_am: 'ፒያሳ ደጎል አደባባይ / ጣይቱ ሆቴል', name_ti: 'ፒያሳ ደጎል', lat: 9.0353, lng: 38.7533 },
  { id: 'mercato', name_en: 'Mercato Autobus Tera / Military Sefer', name_am: 'መርካቶ አውቶቡስ ተራ / ሚሊተሪ ሰፈር', name_ti: 'መርካቶ ኣውቶቡስ ተራ', lat: 9.0315, lng: 38.7368 },
  { id: 'arat_kilo', name_en: 'Arat Kilo (AAU Science Campus)', name_am: 'አራት ኪሎ (ዩኒቨርስቲ)', name_ti: 'ኣርባዕተ ኪሎ', lat: 9.0334, lng: 38.7618 },
  { id: 'siddist_kilo', name_en: 'Siddist Kilo (Yekatit 12 Monument)', name_am: 'ስድስት ኪሎ (የካቲት 12)', name_ti: 'ሽዱሽተ ኪሎ', lat: 9.0435, lng: 38.7625 },
  { id: 'kazanchis', name_en: 'Kazanchis / ECA / Intercontinental', name_am: 'ካዛንቺስ ኢሲኤ', name_ti: 'ካዛንቺስ', lat: 9.0175, lng: 38.7712 },
  { id: 'tor_hailoch', name_en: 'Tor Hailoch (Armed Forces Hospital)', name_am: 'ጦር ኃይሎች', name_ti: 'ጦር ኃይሎች', lat: 9.0118, lng: 38.7248 },
  { id: 'saris_abo', name_en: 'Saris Abo Church / Ring Road', name_am: 'ሳሪስ አቦ ቤተክርስቲያን', name_ti: 'ሳሪስ ኣቦ', lat: 8.9554, lng: 38.7651 },
  { id: 'kality', name_en: 'Kality LRT Terminus & Customs', name_am: 'ቃሊቲ ባቡር ተርሚናል', name_ti: 'ቃሊቲ ተርሚናል', lat: 8.9056, lng: 38.7561 },
  { id: 'cmc', name_en: 'CMC Michael Church', name_am: 'ሲኤምሲ ሚካኤል', name_ti: 'ሲኤምሲ ሚካኤል', lat: 9.0229, lng: 38.8317 },
  { id: 'ayat', name_en: 'Ayat Terminal & Roundabout', name_am: 'አያት ተርሚናል', name_ti: 'ኣያት ተርሚናል', lat: 9.0252, lng: 38.8631 },
  { id: 'haya_hulet', name_en: '22 Mazoria (Golagul Tower)', name_am: '22 ማዞሪያ (ጎላጉል)', name_ti: '22 ማዞሪያ', lat: 9.0162, lng: 38.7845 },
  { id: 'gotera', name_en: 'Gotera Interchange / Lancia', name_am: 'ጎተራ / ላንቻ', name_ti: 'ጎተራ / ላንቻ', lat: 8.9862, lng: 38.7570 },
  { id: 'jomo', name_en: 'Jomo 1 Roundabout & CBE Bank', name_am: 'ጆሞ 1 አደባባይ', name_ti: 'ጆሞ 1', lat: 8.9610, lng: 38.7075 },
  { id: 'lebu', name_en: 'Lebu Haile Garment Junction', name_am: 'ለቡ ሃይሌ ጋርመንት', name_ti: 'ለቡ', lat: 8.9560, lng: 38.7280 },
  { id: 'ayer_tena', name_en: 'Ayer Tena Roundabout (Jimma Rd)', name_am: 'አየር ጤና አደባባይ', name_ti: 'ኣየር ጤና', lat: 9.0020, lng: 38.6950 },
  { id: 'shiro_meda', name_en: 'Shiro Meda Traditional Market', name_am: 'ሽሮ ሜዳ ባህላዊ ገበያ', name_ti: 'ሽሮ ሜዳ', lat: 9.0601, lng: 38.7620 },
  { id: 'lideta', name_en: 'Lideta Balcha Hospital & Church', name_am: 'ልደታ ባልቻ', name_ti: 'ልደታ', lat: 9.0125, lng: 38.7390 },
  { id: 'gurd_shola', name_en: 'Gurd Shola (Athletics Federation)', name_am: 'ጉርድ ሾላ', name_ti: 'ጉርድ ሾላ', lat: 9.0210, lng: 38.8160 }
];

export const COMPLETE_TAXI_TERAS = [
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
    operating_hours: '05:30 - 23:00',
    queue_tips_en: 'Very busy 07:00-09:00 AM and 05:00-07:30 PM. Line up in designated queue lanes.',
    landmarks: [
      { name: 'Bunna & Shay Building', name_am: 'ቡናና ሻይ ህንፃ', icon: '☕', lat: 9.0113, lng: 38.7518, tip: 'Main Bole queue on the ground floor pavement' },
      { name: 'Mexico Flyover Underpass', name_am: 'የሜክሲኮ ድልድይ ስር', icon: '🌉', lat: 9.0108, lng: 38.7511, tip: 'Sheltered loading bays underneath the road bridge' },
      { name: 'Genete Eyesus Church', name_am: 'ገነተ ኢየሱስ ቤተክርስቲያን', icon: '⛪', lat: 9.0121, lng: 38.7504, tip: 'South-east exit toward Saris & Gotera minibuses' },
      { name: 'Mexico LRT Station', name_am: 'ሜክሲኮ ባቡር ጣቢያ', icon: '🚊', lat: 9.0104, lng: 38.7516, tip: 'Elevated railway stairs exit directly onto the rank' }
    ],
    walking_steps_en: [
      'Reach Mexico Roundabout from Churchill Ave, Debre Zeit Rd, or LRT stairs.',
      'Head towards the eastern ground pavement beside Bunna & Shay Building.',
      'Listen for conductors shouting "Bole! Bole!" or "Saris! Saris!".',
      'Minibuses to Bole load under the east ramp; minibuses to Saris/Kera queue on the south lane.'
    ],
    walking_steps_am: [
      'ከቸርችል ጎዳና፣ ደብረዘይት መንገድ ወይም ከባቡር ጣቢያው ወደ ሜክሲኮ አደባባይ ይምጡ።',
      'ከቡናና ሻይ ህንፃ ጎን ወዳለው የምስራቅ የእግረኛ መተላለፊያ ያምሩ።',
      'ወያላዎች "ቦሌ! ቦሌ!" ወይም "ሳሪስ! ሳሪስ!" እያሉ የሚጠሩበትን ድምጽ ያዳምጡ።',
      'ወደ ቦሌ የሚሄዱ ታክሲዎች በድልድዩ ምስራቅ በኩል፤ ወደ ሳሪስና ቄራ ደግሞ በደቡብ በኩል ይጫናሉ።'
    ],
    queue_spots: [
      { dest: 'Bole Airport & Medhanialem', bay: 'East Ramp (Bunna & Shay side)', fare: 15 },
      { dest: 'Saris Abo & Gotera', bay: 'South Ramp (Genete Eyesus side)', fare: 15 },
      { dest: 'Kera & Bulbula', bay: 'South-West Lane', fare: 10 },
      { dest: 'Jomo 1, 2, 3 & Lebu', bay: 'West Ramp (Facing Tor Hailoch)', fare: 18 },
      { dest: 'Tor Hailoch & Ayer Tena', bay: 'North-West Ramp Lane', fare: 12 },
      { dest: 'Mercato (Autobus Tera)', bay: 'North Ramp (Facing Legehar)', fare: 10 }
    ],
    destinations: [
      { to: 'Bole Airport / Medhanialem', to_am: 'ቦሌ ኤርፖርት / መድኃኔዓለም', to_ti: 'ቦሌ ኤርፖርት', keywords: ['bole', 'ቦሌ', 'airport', 'ኤርፖርት', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 15, duration_mins: 22 },
      { to: 'Saris Abo / Gotera', to_am: 'ሳሪስ አቦ / ጎተራ', to_ti: 'ሳሪስ ኣቦ', keywords: ['saris', 'ሳሪስ', 'gotera', 'ጎተራ', 'abo', 'አቦ'], fare_etb: 15, duration_mins: 25 },
      { to: 'Kera / Bulbula', to_am: 'ቄራ / ቡልቡላ', to_ti: 'ቄራ', keywords: ['kera', 'ቄራ', 'bulbula', 'ቡልቡላ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Jomo 1, 2, 3', to_am: 'ጆሞ 1፣ 2፣ 3', to_ti: 'ጆሞ', keywords: ['jomo', 'ጆሞ', 'condo', 'ኮንዶሚኒየም'], fare_etb: 18, duration_mins: 30 },
      { to: 'Tor Hailoch / Ayer Tena', to_am: 'ጦር ኃይሎች / አየር ጤና', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች', 'ayer tena', 'አየር ጤና'], fare_etb: 12, duration_mins: 18 },
      { to: 'Mercato (Autobus Tera)', to_am: 'መርካቶ (አውቶቡስ ተራ)', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ', 'autobus tera', 'አውቶቡስ ተራ'], fare_etb: 10, duration_mins: 20 }
    ]
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
    operating_hours: '05:30 - 23:00',
    queue_tips_en: 'Major interchange connecting East Addis Ababa with Bole and Downtown.',
    landmarks: [
      { name: 'Megenagna LRT Station', name_am: 'መገናኛ ባቡር ጣቢያ', icon: '🚊', lat: 9.0207, lng: 38.8018, tip: 'Underpass crosswalk directly connects to taxi lanes' },
      { name: 'Zefmesh Grand Mall', name_am: 'ዘፍመሽ ግራንድ ሞል', icon: '🏬', lat: 9.0201, lng: 38.8023, tip: 'Use the pedestrian footbridge from the mall side' },
      { name: 'Lem Hotel Road Turn', name_am: 'ወደ ለም ሆቴል መታጠፊያ', icon: '🏨', lat: 9.0195, lng: 38.8009, tip: 'Bole & Edna Mall minibuses queue in front' },
      { name: 'Total Gas Station', name_am: 'ቶታል ነዳጅ ማደያ', icon: '⛽', lat: 9.0212, lng: 38.8028, tip: 'CMC & Ayat minibus ranks start here' }
    ],
    walking_steps_en: [
      'From Megenagna underpass or LRT exit, take the pedestrian walkway towards Zefmesh Mall.',
      'Cross via the pedestrian overpass or zebra crossing towards Lem Hotel junction.',
      'Bole and Edna Mall minibuses queue in the front row facing south.',
      'CMC, Ayat, and Kotebe minibuses line up 50m further east beside Total station.'
    ],
    walking_steps_am: [
      'ከመገናኛ ባቡር መውጫ ወይም የድልድይ ስር እግረኛ መንገድ ወደ ዘፍመሽ ሞል ያምሩ።',
      'በእግረኛ ድልድዩ ወይም በሜዳው መተላለፊያ ወደ ለም ሆቴል መታጠፊያ ይሻገሩ።',
      'ወደ ቦሌና ኤድና ሞል የሚሄዱ ታክሲዎች በደቡብ በኩል በመጀመሪያው ረድፍ ይሰለፋሉ።',
      'ወደ ሲኤምሲ፣ አያትና ኮተቤ የሚሄዱት 50 ሜትር ዝቅ ብለው ከቶታል ማደያ ጎን ይገኛሉ።'
    ],
    queue_spots: [
      { dest: 'Bole Medhanialem & Edna Mall', bay: 'South Lane (Lem Hotel turn side)', fare: 12 },
      { dest: 'CMC Michael & Ayat', bay: 'East Lane (Beside Total Station)', fare: 12 },
      { dest: 'Piazza & Arat Kilo', bay: 'West Lane (Facing Downtown)', fare: 12 },
      { dest: 'Kazanchis & Stadium', bay: 'South-West Lane', fare: 12 },
      { dest: 'Kotebe & 02', bay: 'North-East Rank', fare: 10 }
    ],
    destinations: [
      { to: 'Bole Medhanialem / Edna Mall', to_am: 'ቦሌ መድኃኔዓለም / ኤድና ሞል', to_ti: 'ቦሌ መድኃኔዓለም', keywords: ['bole', 'ቦሌ', 'edna mall', 'ኤድና ሞል', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 12, duration_mins: 15 },
      { to: 'CMC Michael & Ayat', to_am: 'ሲኤምሲ ሚካኤልና አያት', to_ti: 'ሲኤምሲን ኣያትን', keywords: ['cmc', 'ሲኤምሲ', 'ayat', 'አያት', 'michael', 'ሚካኤል'], fare_etb: 12, duration_mins: 20 },
      { to: 'Piazza / Arat Kilo', to_am: 'ፒያሳ / አራት ኪሎ', to_ti: 'ፒያሳ / ኣርባዕተ ኪሎ', keywords: ['piazza', 'ፒያሳ', 'arat kilo', 'አራት ኪሎ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Kazanchis / Stadium', to_am: 'ካዛንቺስ / ስቴዲየም', to_ti: 'ካዛንቺስ / ስቴዲየም', keywords: ['kazanchis', 'ካዛንቺስ', 'stadium', 'ስቴዲየም'], fare_etb: 12, duration_mins: 18 },
      { to: 'Kotebe / 02', to_am: 'ኮተቤ / 02', to_ti: 'ኮተቤ', keywords: ['kotebe', 'ኮተቤ', 'kara', 'ካራ'], fare_etb: 10, duration_mins: 15 }
    ]
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
    operating_hours: '06:00 - 22:30',
    queue_tips_en: 'Central northern hub for Arada, Gullele, and Entoto lines.',
    landmarks: [
      { name: 'Cinema Empire', name_am: 'ኤምፓየር ሲኒማ', icon: '🎬', lat: 9.0351, lng: 38.7529, tip: 'Mercato & Mexico minibus loading bay' },
      { name: 'Itegue Taitu Hotel', name_am: 'እቴጌ ጣይቱ ሆቴል', icon: '🏨', lat: 9.0360, lng: 38.7538, tip: 'Arat Kilo & Megenagna taxis turn here' },
      { name: 'St. George Cathedral', name_am: 'ቅዱስ ጊዮርጊስ ካቴድራል', icon: '⛪', lat: 9.0370, lng: 38.7525, tip: 'Shiro Meda & Entoto taxis load on the uphill side' },
      { name: 'De Gaulle Monument', name_am: 'ደጎል አደባባይ ሐውልት', icon: '🏛️', lat: 9.0353, lng: 38.7533, tip: 'Central meeting landmark of Piazza' }
    ],
    walking_steps_en: [
      'Head to De Gaulle Square at the top of Churchill Avenue.',
      'Stand in front of Cinema Empire and look downhill towards Cunningham Street.',
      'Minibuses to Mercato and Mexico load right along the sidewalk of Cinema Empire.',
      'Taxis to Arat Kilo, Siddist Kilo, and Shiro Meda load across the square near Taitu Hotel turn.'
    ],
    walking_steps_am: [
      'በቸርችል ጎዳና አናት ላይ ወደሚገኘው ደጎል አደባባይ ይድረሱ።',
      'ከኤምፓየር ሲኒማ ፊት ለፊት ቆመው ወደ ከኒንግሃም መንገድ ቁልቁል ይመልከቱ።',
      'ወደ መርካቶና ሜክሲኮ የሚሄዱ ሰማያዊ ታክሲዎች በሲኒማ ኤምፓየር የእግረኛ መንገድ ላይ ይጫናሉ።',
      'ወደ አራት ኪሎ፣ ስድስት ኪሎና ሽሮሜዳ የሚሄዱት ከጣይቱ ሆቴል መታጠፊያ አጠገብ ይሰለፋሉ።'
    ],
    queue_spots: [
      { dest: 'Mercato & Sebategna', bay: 'Empire Sidewalk (Downhill)', fare: 8 },
      { dest: 'Mexico Square', bay: 'Cunningham Street descent', fare: 10 },
      { dest: 'Arat Kilo & Siddist Kilo', bay: 'Taitu Hotel Turn (Eastbound)', fare: 8 },
      { dest: 'Megenagna via Arat Kilo', bay: 'De Gaulle East Rank', fare: 12 },
      { dest: 'Shiro Meda & Entoto', bay: 'Giorgis Cathedral Gate (Uphill)', fare: 10 }
    ],
    destinations: [
      { to: 'Arat Kilo & Siddist Kilo', to_am: 'አራት ኪሎና ስድስት ኪሎ', to_ti: 'ኣርባዕተ ኪሎን ሽዱሽተ ኪሎን', keywords: ['arat kilo', 'አራት ኪሎ', 'siddist kilo', 'ስድስት ኪሎ'], fare_etb: 8, duration_mins: 10 },
      { to: 'Megenagna via Arat Kilo', to_am: 'መገናኛ በአራት ኪሎ', to_ti: 'መገናኛ ብኣርባዕተ ኪሎ', keywords: ['megenagna', 'መገናኛ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Shiro Meda (Entoto)', to_am: 'ሽሮ ሜዳ (እንጦጦ)', to_ti: 'ሽሮ ሜዳ', keywords: ['shiro meda', 'ሽሮ ሜዳ', 'entoto', 'እንጦጦ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ ኣደባባይ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 15 }
    ]
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
    operating_hours: '05:30 - 22:00',
    queue_tips_en: 'Largest open market terminal. Keep eye on belongings during boarding.',
    landmarks: [
      { name: 'Autobus Tera Gate', name_am: 'የአውቶቡስ ተራ ዋና በር', icon: '🚌', lat: 9.0322, lng: 38.7360, tip: 'Main entrance gate for long-distance transport' },
      { name: 'Grand Anwar Mosque', name_am: 'ታላቁ አንዋር መስጂድ', icon: '🕌', lat: 9.0305, lng: 38.7380, tip: 'South landmark; cross pedestrian alley to reach taxis' },
      { name: 'Military Sefer Arcade', name_am: 'ሚሊተሪ ሰፈር', icon: '🏢', lat: 9.0312, lng: 38.7365, tip: 'Taxis to Tor Hailoch & Mexico line up along the wall' },
      { name: 'Sebategna Terminal', name_am: 'ሰባተኛ ተርሚናል', icon: '🏬', lat: 9.0328, lng: 38.7372, tip: 'Ayer Tena & Asco minibuses load here' }
    ],
    walking_steps_en: [
      'From Autobus Tera main gate, walk 70m south towards Military Sefer.',
      'Follow the designated pedestrian fence lane separating taxis from merchant stalls.',
      'Taxis for Tor Hailoch and Ayer Tena load directly along the paved rank.',
      'Keep your phone and bag zipped and secure while joining the queue.'
    ],
    walking_steps_am: [
      'ከአውቶቡስ ተራ ዋና በር 70 ሜትር ወደ ሚሊተሪ ሰፈር በእግር ይሂዱ።',
      'እግረኞችን ከነጋዴዎች ሱቅ የሚለየውን የታጠረ መተላለፊያ ይከተሉ።',
      'ወደ ጦር ኃይሎችና አየር ጤና የሚሄዱ ታክሲዎች በኮንክሪት ተርሚናሉ ላይ ይሰለፋሉ።',
      'በሰልፍ ወቅት ስልክዎንና ቦርሳዎን በጥንቃቄ ይያዙ።'
    ],
    queue_spots: [
      { dest: 'Tor Hailoch', bay: 'Bay A (Military Sefer)', fare: 10 },
      { dest: 'Mexico Square', bay: 'Bay B (Center Pavement)', fare: 10 },
      { dest: 'Ayer Tena & Alem Bank', bay: 'Bay C (Sebategna side)', fare: 12 },
      { dest: 'Asco & Wingate', bay: 'Bay D (North gate)', fare: 12 },
      { dest: 'Piazza', bay: 'Bay E (East exit)', fare: 8 }
    ],
    destinations: [
      { to: 'Tor Hailoch', to_am: 'ጦር ኃይሎች', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 20 },
      { to: 'Piazza', to_am: 'ፒያሳ', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Ayer Tena / Alem Bank', to_am: 'አየር ጤና / ዓለም ባንክ', to_ti: 'ኣየር ጤና / ዓለም ባንክ', keywords: ['ayer tena', 'አየር ጤና', 'alem bank', 'ዓለም ባንክ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Asco / Wingate', to_am: 'አስኮ / ዊንጌት', to_ti: 'ኣስኮ / ዊንጌት', keywords: ['asco', 'አስኮ', 'wingate', 'ዊንጌት'], fare_etb: 12, duration_mins: 20 }
    ]
  },
  {
    id: 'tera-5',
    name_en: 'Bole Medhanialem Taxi Stand',
    name_am: 'ቦሌ መድኃኔዓለም ታክሲ ተራ',
    name_ti: 'ቦሌ መድኃኔዓለም ታክሲ ተራ',
    subcity: 'Bole',
    exact_location_en: 'Cameroon Street near Edna Mall and Bole Medhanialem Cathedral',
    exact_location_am: 'ካሜሩን መንገድ ከኤድና ሞልና መድኃኔዓለም ካቴድራል አጠገብ',
    exact_location_ti: 'መንገዲ ካሜሩን ጥቓ ኤድና ሞል',
    latitude: 8.9902,
    longitude: 38.7865,
    weyala_shout: 'ሜክሲኮ ሜክሲኮ! መገናኛ! ሳሪስ!',
    operating_hours: '05:30 - 23:30',
    queue_tips_en: 'Primary terminal for Bole district, airport staff, and business travelers.',
    landmarks: [
      { name: 'Edna Mall Cinema', name_am: 'ኤድና ሞል ሲኒማ', icon: '🛍️', lat: 8.9897, lng: 38.7869, tip: 'Main intersection landmark in Bole' },
      { name: 'Medhanialem Cathedral', name_am: 'መድኃኔዓለም ካቴድራል', icon: '⛪', lat: 8.9920, lng: 38.7875, tip: 'Monumental church right across Cameroon Street' },
      { name: 'Morning Star Mall', name_am: 'ሞርኒንግ ስታር ሞል', icon: '🏬', lat: 8.9905, lng: 38.7858, tip: 'Queue for Mexico starts on this sidewalk' },
      { name: 'Brass Hospital Turn', name_am: 'ብራስ ሆስፒታል', icon: '🏥', lat: 8.9892, lng: 38.7852, tip: 'Service road taxi loading point' }
    ],
    walking_steps_en: [
      'From Edna Mall intersection, walk 50m west along Cameroon Street.',
      'The taxi queue lines are stationed directly on the service road opposite Brass Hospital.',
      'Look for the queue signs for Mexico and Megenagna.',
      'During evening rush, queue starts outside Morning Star Mall.'
    ],
    walking_steps_am: [
      'ከኤድና ሞል አደባባይ በካሜሩን መንገድ 50 ሜትር ወደ ምዕራብ በእግር ይሂዱ።',
      'የታክሲ ሰልፉ ከብራስ ሆስፒታል ፊት ለፊት ባለው የአገልግሎት መንገድ ላይ ይገኛል።',
      'ወደ ሜክሲኮ እና መገናኛ የሚያሳዩትን ሰሌዳዎች ይመልከቱ።',
      'በምሽት ሰዓት ሰልፉ ከሞርኒንግ ስታር ሞል ፊት ለፊት ይጀምራል።'
    ],
    queue_spots: [
      { dest: 'Mexico Square', bay: 'Lane 1 (Cameroon St Service Rd)', fare: 15 },
      { dest: 'Megenagna', bay: 'Lane 2 (Beside Edna Mall)', fare: 12 },
      { dest: 'Saris Abo & Gotera', bay: 'Lane 3 (Facing Airport link)', fare: 15 },
      { dest: 'Kazanchis & Stadium', bay: 'Lane 4 (Northbound)', fare: 12 }
    ],
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 15, duration_mins: 20 },
      { to: 'Megenagna', to_am: 'መገናኛ', to_ti: 'መገናኛ', keywords: ['megenagna', 'መገናኛ'], fare_etb: 12, duration_mins: 15 },
      { to: 'Saris Abo', to_am: 'ሳሪስ አቦ', to_ti: 'ሳሪስ ኣቦ', keywords: ['saris', 'ሳሪስ', 'abo', 'አቦ'], fare_etb: 15, duration_mins: 22 },
      { to: 'Kazanchis / Stadium', to_am: 'ካዛንቺስ / ስቴዲየም', to_ti: 'ካዛንቺስ / ስቴዲየም', keywords: ['kazanchis', 'ካዛንቺስ', 'stadium', 'ስቴዲየም'], fare_etb: 12, duration_mins: 18 }
    ]
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
    operating_hours: '06:00 - 22:30',
    queue_tips_en: 'Interchange directly accessible from East-West and North-South LRT lines.',
    landmarks: [
      { name: 'Addis Ababa Stadium Gate 1', name_am: 'ስቴዲየም በር 1', icon: '🏟️', lat: 9.0132, lng: 38.7575, tip: 'Main queue directly along the stadium fence' },
      { name: 'Legehar Historical Station', name_am: 'ለገሃር ባቡር ጣቢያ', icon: '🚂', lat: 9.0125, lng: 38.7558, tip: 'Ghion Hotel and Meskel Square connecting path' },
      { name: 'National Theatre Roundabout', name_am: 'ብሔራዊ ቴአትር አደባባይ', icon: '🎭', lat: 9.0150, lng: 38.7550, tip: 'Piazza-bound taxis pick up here' },
      { name: 'Stadium LRT Station', name_am: 'ስቴዲየም ባቡር ጣቢያ', icon: '🚊', lat: 9.0138, lng: 38.7580, tip: 'Fast train transfer within 2 mins walk' }
    ],
    walking_steps_en: [
      'From Stadium LRT exit or Meskel Square, walk down towards Legehar train station.',
      'The taxi rank is located along the wide paved bay directly facing Stadium Gate 1.',
      'Weyalas call passengers for Bole, Saris, and Piazza from distinct curbs.',
      'Line up on Curb A for Bole, Curb B for Saris & Kality.'
    ],
    walking_steps_am: [
      'ከስቴዲየም ባቡር ጣቢያ ወይም ከመስቀል አደባባይ ወደ ለገሃር ባቡር ጣቢያ ቁልቁል ይሂዱ።',
      'የታክሲ ማቆሚያው ከስቴዲየም በር 1 ፊት ለፊት ባለው ሰፊ አስፋልት ላይ ይገኛል።',
      'ወያላዎች ወደ ቦሌ፣ ሳሪስና ፒያሳ የሚሄዱ ሰዎችን ከተለያዩ ረድፎች ይጠራሉ።',
      'ወደ ቦሌ በረድፍ ሀ፣ ወደ ሳሪስና ቃሊቲ ደግሞ በረድፍ ለ ይሰለፉ።'
    ],
    queue_spots: [
      { dest: 'Bole Airport & Medhanialem', bay: 'Curb A (Facing East)', fare: 15 },
      { dest: 'Saris & Kality', bay: 'Curb B (Facing South)', fare: 15 },
      { dest: 'Gotera & Lancia', bay: 'Curb C (Underpass lane)', fare: 10 },
      { dest: 'Piazza (Churchill Ave)', bay: 'Curb D (Facing North)', fare: 10 }
    ],
    destinations: [
      { to: 'Bole Airport', to_am: 'ቦሌ ኤርፖርት', to_ti: 'ቦሌ ኤርፖርት', keywords: ['bole', 'ቦሌ', 'airport', 'ኤርፖርት'], fare_etb: 15, duration_mins: 18 },
      { to: 'Saris / Kality', to_am: 'ሳሪስ / ቃሊቲ', to_ti: 'ሳሪስ / ቃሊቲ', keywords: ['saris', 'ሳሪስ', 'kality', 'ቃሊቲ'], fare_etb: 15, duration_mins: 25 },
      { to: 'Gotera / Lancia', to_am: 'ጎተራ / ላንቻ', to_ti: 'ጎተራ / ላንቻ', keywords: ['gotera', 'ጎተራ', 'lancia', 'ላንቻ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Piazza', to_am: 'ፒያሳ', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ'], fare_etb: 10, duration_mins: 15 }
    ]
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
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Gateway connecting West Addis Ababa (Alem Bank, Kolfe) to city center.',
    landmarks: [
      { name: 'Tor Hailoch LRT Overpass', name_am: 'የጦር ኃይሎች ባቡር ድልድይ', icon: '🚊', lat: 9.0118, lng: 38.7248, tip: 'Direct covered access right below the bridge span' },
      { name: 'Total Gas Station', name_am: 'ቶታል ማደያ', icon: '⛽', lat: 9.0115, lng: 38.7255, tip: 'Ayer Tena & Alem Bank taxi rank starts here' },
      { name: 'Armed Forces Hospital Gate', name_am: 'የጦር ኃይሎች ሆስፒታል በር', icon: '🏥', lat: 9.0125, lng: 38.7240, tip: 'Pedestrian crossing landmark' },
      { name: 'Footbridge Staircase', name_am: 'የእግረኛ ድልድይ ደረጃ', icon: '🌉', lat: 9.0112, lng: 38.7245, tip: 'Safe crossing above fast highway traffic' }
    ],
    walking_steps_en: [
      'From Tor Hailoch LRT platform, take the pedestrian staircase down to street level.',
      'Walk 30m towards Total gas station along the Ambo/Jimma road junction.',
      'Minibuses to Ayer Tena and Alem Bank queue right next to the service station entrance.',
      'Mercato minibuses load directly under the bridge span.'
    ],
    walking_steps_am: [
      'ከጦር ኃይሎች ቀላል ባቡር ጣቢያ በእግረኛ ደረጃው ወደ መሬት ይውረዱ።',
      'በጅማ መንገድ መታጠፊያ ወደ ቶታል ነዳጅ ማደያ 30 ሜትር ያህል ይራመዱ።',
      'ወደ አየር ጤናና ዓለም ባንክ የሚሄዱ ታክሲዎች ከማደያው መግቢያ ጎን ይሰለፋሉ።',
      'ወደ መርካቶ የሚሄዱት በቀጥታ በድልድዩ ስር ይጫናሉ።'
    ],
    queue_spots: [
      { dest: 'Mercato (Autobus Tera)', bay: 'Under Bridge (Northbound)', fare: 10 },
      { dest: 'Ayer Tena & Alem Bank', bay: 'Total Station Entrance (Westbound)', fare: 10 },
      { dest: 'Mexico Square', bay: 'Under Bridge (Eastbound)', fare: 10 },
      { dest: 'Jomo Condominium', bay: 'Service Road Rank', fare: 15 }
    ],
    destinations: [
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Ayer Tena / Alem Bank', to_am: 'አየር ጤና / ዓለም ባንክ', to_ti: 'ኣየር ጤና / ዓለም ባንክ', keywords: ['ayer tena', 'አየር ጤና', 'alem bank', 'ዓለም ባንክ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Jomo', to_am: 'ጆሞ', to_ti: 'ጆሞ', keywords: ['jomo', 'ጆሞ'], fare_etb: 15, duration_mins: 20 }
    ]
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
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'South Addis connector for Nifas Silk, Gotera, and Akaki Kality.',
    landmarks: [
      { name: 'Saris Abo Orthodox Church', name_am: 'ሳሪስ አቦ ቤተክርስቲያን', icon: '⛪', lat: 8.9560, lng: 38.7655, tip: 'Prominent circular church gate' },
      { name: 'Debre Zeit Road Flyover', name_am: 'የደብረዘይት መንገድ ድልድይ', icon: '🌉', lat: 8.9554, lng: 38.7651, tip: 'Taxi bays sheltered under the bridge structure' },
      { name: 'St. George Brewery Turn', name_am: 'የቅዱስ ጊዮርጊስ ቢራ ፋብሪካ', icon: '🍺', lat: 8.9545, lng: 38.7645, tip: 'Industrial junction with high pedestrian flow' },
      { name: 'Saris LRT Station', name_am: 'ሳሪስ ባቡር ጣቢያ', icon: '🚊', lat: 8.9570, lng: 38.7660, tip: 'LRT train transfer point' }
    ],
    walking_steps_en: [
      'Cross via the pedestrian footbridge over Debre Zeit road to the eastern service lane.',
      'The taxi rank starts 40m past the church gate under the shade of the flyover.',
      'Line up according to your destination signpost.',
      'Taxis to Mexico load on the left side, Kality on the right.'
    ],
    walking_steps_am: [
      'በደብረዘይት መንገድ ላይ ባለው የእግረኛ ድልድይ ወደ ምስራቁ የአገልግሎት መንገድ ይሻገሩ።',
      'የታክሲ ተራው ከቤተክርስቲያኑ በር 40 ሜትር ዝቅ ብሎ ከድልድዩ ጥላ ስር ይጀምራል።',
      'በመዳረሻዎ ምልክት ሰሌዳ መሰረት በሰልፉ ውስጥ ይቁሙ።',
      'ወደ ሜክሲኮ የሚሄዱት በግራ በኩል፣ ወደ ቃሊቲ የሚሄዱት በቀኝ በኩል ይጫናሉ።'
    ],
    queue_spots: [
      { dest: 'Mexico Square', bay: 'Bay 1 (Debrezeit Rd Northbound)', fare: 15 },
      { dest: 'Stadium & Legehar', bay: 'Bay 2 (Facing Gotera)', fare: 15 },
      { dest: 'Kality Terminal & Akaki', bay: 'Bay 3 (Southbound Ramp)', fare: 10 },
      { dest: 'Lebu & Jomo via Ring Road', bay: 'Bay 4 (Ring Rd West Ramp)', fare: 15 }
    ],
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 15, duration_mins: 25 },
      { to: 'Stadium', to_am: 'ስቴዲየም', to_ti: 'ስቴዲየም', keywords: ['stadium', 'ስቴዲየም'], fare_etb: 15, duration_mins: 25 },
      { to: 'Kality Terminal', to_am: 'ቃሊቲ ተርሚናል', to_ti: 'ቃሊቲ ተርሚናል', keywords: ['kality', 'ቃሊቲ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Lebu / Jomo', to_am: 'ለቡ / ጆሞ', to_ti: 'ለቡ / ጆሞ', keywords: ['lebu', 'ለቡ', 'jomo', 'ጆሞ'], fare_etb: 15, duration_mins: 20 }
    ]
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
    operating_hours: '05:30 - 22:00',
    queue_tips_en: 'Southwest residential corridor with high morning demand.',
    landmarks: [
      { name: 'Jomo Gate 1 Condominium', name_am: 'ጆሞ በር 1 ኮንዶሚኒየም', icon: '🏢', lat: 8.9615, lng: 38.7080, tip: 'Main entrance archway for Jomo residential site' },
      { name: 'Commercial Bank of Ethiopia', name_am: 'የኢትዮጵያ ንግድ ባንክ ጆሞ', icon: '🏦', lat: 8.9608, lng: 38.7072, tip: 'Sidewalk in front serves as the primary taxi rank' },
      { name: 'Jomo Central Roundabout', name_am: 'የጆሞ አደባባይ', icon: '🔄', lat: 8.9610, lng: 38.7075, tip: 'Feeder bajaj and minibus convergence node' },
      { name: 'Jomo Fresh Market', name_am: 'የጆሞ አትክልት ተራ', icon: '🛒', lat: 8.9602, lng: 38.7068, tip: 'Busy shopping arcade next to rank' }
    ],
    walking_steps_en: [
      'Walk towards the central roundabout of Jomo 1.',
      'Minibuses line up along the dual carriageway right outside CBE Bank.',
      'Join the line for Mexico or Tor Hailoch.',
      'During morning rush (06:30-08:30), arrive early as queue moves fast.'
    ],
    walking_steps_am: [
      'ወደ ጆሞ 1 ማዕከላዊ አደባባይ ይራመዱ።',
      'ሰማያዊ ታክሲዎች ከንግድ ባንኩ ፊት ለፊት ባለው ዋና አስፋልት ላይ ይሰለፋሉ።',
      'ወደ ሜክሲኮ ወይም ጦር ኃይሎች ወደሚሄደው ሰልፍ ይቀላቀሉ።',
      'በጠዋት ሰዓት (12:30 - 2:30) ሰልፉ በፍጥነት ስለሚንቀሳቀስ ቀደም ብለው ይድረሱ።'
    ],
    queue_spots: [
      { dest: 'Mexico Square', bay: 'Line 1 (Outside CBE Bank)', fare: 18 },
      { dest: 'Tor Hailoch', bay: 'Line 2 (Facing Ayer Tena link)', fare: 15 },
      { dest: 'Mercato', bay: 'Line 3 (North exit)', fare: 18 }
    ],
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 18, duration_mins: 30 },
      { to: 'Tor Hailoch', to_am: 'ጦር ኃይሎች', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች'], fare_etb: 15, duration_mins: 22 },
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 18, duration_mins: 32 }
    ]
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
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Southern gateway connecting Addis Ababa to Bishoftu corridor.',
    landmarks: [
      { name: 'Kality LRT South Terminus', name_am: 'የቃሊቲ ባቡር ተርሚናል', icon: '🚊', lat: 8.9052, lng: 38.7565, tip: 'End of the North-South blue railway line' },
      { name: 'Akaki Customs Office', name_am: 'የአቃቂ ጉምሩክ ጽ/ቤት', icon: '🏛️', lat: 8.9062, lng: 38.7555, tip: 'Prominent government complex across the terminal' },
      { name: 'Sheger Bus Southern Depot', name_am: 'የሸገር አውቶቡስ ዲፖ', icon: '🚌', lat: 8.9048, lng: 38.7570, tip: 'City bus connections point' },
      { name: 'Kality Total Roundabout', name_am: 'የቃሊቲ ቶታል አደባባይ', icon: '🔄', lat: 8.9070, lng: 38.7550, tip: 'Feeder transport hub towards Tulu Dimtu' }
    ],
    walking_steps_en: [
      'Exit Kality LRT Station through the north pedestrian gate.',
      'Walk 40m towards the asphalt terminal loop.',
      'Minibuses to Saris, Stadium, and Mexico load continuously on the right lane.',
      'Taxis heading further south towards Akaki & Tulu Dimtu queue at the southern gate.'
    ],
    walking_steps_am: [
      'ከቃሊቲ ባቡር ጣቢያ በሰሜኑ የእግረኛ በር በኩል ይውጡ።',
      '40 ሜትር ያህል ወደ አስፋልቱ የተርሚናል መታጠፊያ ይራመዱ።',
      'ወደ ሳሪስ፣ ስቴዲየምና ሜክሲኮ የሚሄዱ ታክሲዎች በቀኙ መስመር ላይ ያለማቋረጥ ይጫናሉ።',
      'ወደ አቃቂና ቱሉ ዲምቱ የሚሄዱት በደቡቡ መውጫ በር በኩል ይገኛሉ።'
    ],
    queue_spots: [
      { dest: 'Saris & Stadium', bay: 'Lane 1 (Northbound Express)', fare: 15 },
      { dest: 'Mexico Square', bay: 'Lane 2 (Ring Road Connector)', fare: 18 },
      { dest: 'Akaki & Tulu Dimtu', bay: 'Lane 3 (Southbound Bishoftu Rd)', fare: 10 }
    ],
    destinations: [
      { to: 'Saris / Stadium', to_am: 'ሳሪስ / ስቴዲየም', to_ti: 'ሳሪስ / ስቴዲየም', keywords: ['saris', 'ሳሪስ', 'stadium', 'ስቴዲየም'], fare_etb: 15, duration_mins: 25 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 18, duration_mins: 35 },
      { to: 'Akaki / Tulu Dimtu', to_am: 'አቃቂ / ቱሉ ዲምቱ', to_ti: 'ኣቃቂ / ቱሉ ዲምቱ', keywords: ['akaki', 'አቃቂ', 'tulu dimtu', 'ቱሉ ዲምቱ'], fare_etb: 10, duration_mins: 15 }
    ]
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
    operating_hours: '06:00 - 22:30',
    queue_tips_en: 'Major student and civil service hub. High frequency of minibuses.',
    landmarks: [
      { name: 'AAU Science Faculty Campus', name_am: 'አዲስ አበባ ዩኒቨርሲቲ ሳይንስ ፋከልቲ', icon: '🎓', lat: 9.0340, lng: 38.7625, tip: 'Taxis to Megenagna queue directly along the campus fence' },
      { name: 'Holy Trinity Cathedral', name_am: 'ቅድስት ሥላሴ ካቴድራል', icon: '⛪', lat: 9.0325, lng: 38.7635, tip: 'Historic national landmark turn' },
      { name: 'King George VI Monument', name_am: 'የአራት ኪሎ የድል ሐውልት', icon: '🏛️', lat: 9.0334, lng: 38.7618, tip: 'Roundabout center point' },
      { name: 'Parliament & Palace Corridor', name_am: 'የፓርላማና ቤተመንግስት መንገድ', icon: '🏛️', lat: 9.0318, lng: 38.7620, tip: 'South corridor heading towards Meskel Square' }
    ],
    walking_steps_en: [
      'From Arat Kilo roundabout, walk 50m along Queen Elizabeth II Street.',
      'Minibuses towards Megenagna line up beside the AAU Science Faculty fence.',
      'Minibuses towards Piazza and Shiro Meda load across the street near Trinity turn.',
      'Listen for conductors calling Megenagna or Piazza.'
    ],
    walking_steps_am: [
      'ከአራት ኪሎ አደባባይ በንግስት ኤልሳቤጥ መንገድ 50 ሜትር ያህል በእግር ይሂዱ።',
      'ወደ መገናኛ የሚሄዱ ታክሲዎች በዩኒቨርሲቲው አጥር ጎን ይሰለፋሉ።',
      'ወደ ፒያሳና ሽሮሜዳ የሚሄዱት በመንገዱ ማዶ ከሥላሴ መታጠፊያ አጠገብ ይጫናሉ።',
      'የወያላዎችን መገናኛ ወይም ፒያሳ የሚል ጥሪ ያዳምጡ።'
    ],
    queue_spots: [
      { dest: 'Megenagna via Kazanchis', bay: 'AAU Science Faculty Fence', fare: 10 },
      { dest: 'Piazza (De Gaulle)', bay: 'Monument South Curve', fare: 8 },
      { dest: 'Shiro Meda & Entoto', bay: 'North Gate towards Siddist Kilo', fare: 8 },
      { dest: 'Kazanchis & Stadium', bay: 'Palace Corridor Rank', fare: 10 }
    ],
    destinations: [
      { to: 'Piazza (De Gaulle)', to_am: 'ፒያሳ (ደጎል)', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ', 'de gaulle', 'ደጎል'], fare_etb: 8, duration_mins: 10 },
      { to: 'Megenagna', to_am: 'መገናኛ', to_ti: 'መገናኛ', keywords: ['megenagna', 'መገናኛ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Shiro Meda', to_am: 'ሽሮ ሜዳ', to_ti: 'ሽሮ ሜዳ', keywords: ['shiro meda', 'ሽሮ ሜዳ', 'entoto', 'እንጦጦ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Kazanchis / Stadium', to_am: 'ካዛንቺስ / ስቴዲየም', to_ti: 'ካዛንቺስ / ስቴዲየም', keywords: ['kazanchis', 'ካዛንቺስ', 'stadium', 'ስቴዲየም'], fare_etb: 10, duration_mins: 14 }
    ]
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
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Serves Eastern condominium districts and connects to the Light Rail.',
    landmarks: [
      { name: 'CMC Saint Michael Church', name_am: 'ሲኤምሲ ቅዱስ ሚካኤል', icon: '⛪', lat: 9.0235, lng: 38.8322, tip: 'Massive white domed cathedral landmark' },
      { name: 'Ayat LRT East Terminus', name_am: 'የአያት ባቡር ተርሚናል', icon: '🚊', lat: 9.0252, lng: 38.8631, tip: 'Eastern final terminus of the Light Rail' },
      { name: 'Ayat Roundabout Mall', name_am: 'የአያት አደባባይ የገበያ ማዕከል', icon: '🏬', lat: 9.0225, lng: 38.8310, tip: 'Commercial shops and cafes flanking the stand' },
      { name: 'Tsega Hospital Turn', name_am: 'ፀጋ ሆስፒታል መታጠፊያ', icon: '🏥', lat: 9.0218, lng: 38.8305, tip: 'Feeder bajaj stand connection' }
    ],
    walking_steps_en: [
      'From Ayat LRT terminus or CMC Michael gate, walk to the paved roadside rank.',
      'Minibuses to Megenagna load in the front queue bay.',
      'Minibuses to Gerji and Bole load on the southern turnaround.',
      'Check destination shouts before boarding.'
    ],
    walking_steps_am: [
      'ከአያት ባቡር ጣቢያ ወይም ከሲኤምሲ ሚካኤል በር ወደ አስፋልቱ የታክሲ ማቆሚያ ይምጡ።',
      'ወደ መገናኛ የሚሄዱ ታክሲዎች በዋናው የፊት ሰልፍ ላይ ይጫናሉ።',
      'ወደ ገርጂና ቦሌ የሚሄዱት በደቡቡ መታጠፊያ በኩል ይሰለፋሉ።',
      'ከመሳፈርዎ በፊት የወያላውን ጥሪ ያረጋግጡ።'
    ],
    queue_spots: [
      { dest: 'Megenagna Terminal', bay: 'Bay 1 (Main Roadside Line)', fare: 12 },
      { dest: 'Gerji & Imperial', bay: 'Bay 2 (South Turnaround)', fare: 12 },
      { dest: 'Bole Medhanialem', bay: 'Bay 3 (Edna Mall Express)', fare: 15 }
    ],
    destinations: [
      { to: 'Megenagna Terminal', to_am: 'መገናኛ ተርሚናል', to_ti: 'መገናኛ ተርሚናል', keywords: ['megenagna', 'መገናኛ'], fare_etb: 12, duration_mins: 18 },
      { to: 'Gerji / Imperial', to_am: 'ገርጂ / ኢምፔሪያል', to_ti: 'ገርጂ', keywords: ['gerji', 'ገርጂ', 'imperial', 'ኢምፔሪያል'], fare_etb: 12, duration_mins: 15 },
      { to: 'Bole Medhanialem', to_am: 'ቦሌ መድኃኔዓለም', to_ti: 'ቦሌ መድኃኔዓለም', keywords: ['bole', 'ቦሌ', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 15, duration_mins: 22 }
    ]
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
    operating_hours: '05:30 - 22:00',
    queue_tips_en: 'Primary western portal for Kolfe Keranio and Jimma road travelers.',
    landmarks: [
      { name: 'Ayer Tena Roundabout', name_am: 'የአየር ጤና አደባባይ', icon: '🔄', lat: 9.0020, lng: 38.6950, tip: 'Central circular junction of West Addis' },
      { name: 'Jimma Road Arterial', name_am: 'የጅማ መንገድ', icon: '🛣️', lat: 9.0015, lng: 38.6942, tip: 'Main transport arterial heading west' },
      { name: 'Ayer Tena Total Station', name_am: 'አየር ጤና ቶታል', icon: '⛽', lat: 9.0028, lng: 38.6958, tip: 'Taxi bays stationed right in front' },
      { name: 'Alem Bank Arcade', name_am: 'የዓለም ባንክ ህንፃዎች', icon: '🏬', lat: 8.9980, lng: 38.6950, tip: 'Feeder terminal connecting further southwest' }
    ],
    walking_steps_en: [
      'Arrive at Ayer Tena Roundabout along Jimma Road.',
      'Head to the designated taxi bay alongside the outbound Jimma Road.',
      'Join the queue for Tor Hailoch or Mercato.',
      'Minibuses to Mexico load on the inner lane beside the Total station.'
    ],
    walking_steps_am: [
      'በጅማ መንገድ ላይ ወደሚገኘው የአየር ጤና አደባባይ ይድረሱ።',
      'በዋናው መንገድ አጠገብ ወዳለው የታክሲ ማቆሚያ ያምሩ።',
      'ወደ ጦር ኃይሎች ወይም መርካቶ በሚሄደው ሰልፍ ውስጥ ይግቡ።',
      'ወደ ሜክሲኮ የሚሄዱት ከቶታል ማደያው ጎን ባለው ውስጠኛ መስመር ላይ ይሰለፋሉ።'
    ],
    queue_spots: [
      { dest: 'Tor Hailoch', bay: 'Lane 1 (Direct Express)', fare: 10 },
      { dest: 'Mercato', bay: 'Lane 2 (Autobus Tera link)', fare: 12 },
      { dest: 'Mexico Square', bay: 'Lane 3 (Inner Lane beside Total)', fare: 15 }
    ],
    destinations: [
      { to: 'Tor Hailoch', to_am: 'ጦር ኃይሎች', to_ti: 'ጦር ኃይሎች', keywords: ['tor hailoch', 'ጦር ኃይሎች'], fare_etb: 10, duration_mins: 15 },
      { to: 'Mercato', to_am: 'መርካቶ', to_ti: 'መርካቶ', keywords: ['mercato', 'መርካቶ'], fare_etb: 12, duration_mins: 22 },
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 15, duration_mins: 25 }
    ]
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
    operating_hours: '06:00 - 21:30',
    queue_tips_en: 'Access station for Entoto Park, traditional cotton market, and North Addis.',
    landmarks: [
      { name: 'Shiro Meda Textile Market', name_am: 'የሽሮ ሜዳ የባህል አልባሳት ገበያ', icon: '🧵', lat: 9.0598, lng: 38.7615, tip: 'Famous cultural woven clothes bazaar' },
      { name: 'US Embassy Security Gate', name_am: 'የአሜሪካ ኤምባሲ መታጠፊያ', icon: '🏛️', lat: 9.0585, lng: 38.7628, tip: 'High security landmark down the hill' },
      { name: 'Entoto Park Road Ascent', name_am: 'የእንጦጦ ፓርክ አቀበት መንገድ', icon: '🌲', lat: 9.0615, lng: 38.7625, tip: 'Scenic road ascending into the eucalyptus hills' },
      { name: 'Raguel Church Turn', name_am: 'የእንጦጦ ራጉኤል ቤተክርስቲያን', icon: '⛪', lat: 9.0630, lng: 38.7635, tip: 'Pilgrim & tourist transport junction' }
    ],
    walking_steps_en: [
      'Walk along Entoto Avenue to the entrance of Shiro Meda market.',
      'The taxi stand is situated right in front of the craft shops.',
      'Minibuses to Piazza and Arat Kilo load downhill; minibuses to Entoto Park load uphill.',
      'Listen for the conductor shouting "Piazza" or "Entoto Park".'
    ],
    walking_steps_am: [
      'በእንጦጦ ጎዳና ወደ ሽሮ ሜዳ የባህል ገበያ መግቢያ በእግር ይሂዱ።',
      'የታክሲ ማቆሚያው ከባህላዊ ሱቆቹ ፊት ለፊት ይገኛል።',
      'ወደ ፒያሳና አራት ኪሎ የሚሄዱት ወደ ቁልቁለቱ፤ ወደ እንጦጦ ፓርክ የሚሄዱት ደግሞ ወደ አቀበቱ ይጫናሉ።',
      'የወያላውን "ፒያሳ" ወይም "እንጦጦ ፓርክ" የሚለውን ጥሪ ያዳምጡ።'
    ],
    queue_spots: [
      { dest: 'Piazza (De Gaulle)', bay: 'Downhill curb (Facing South)', fare: 10 },
      { dest: 'Arat Kilo', bay: 'Downhill queue (Facing University)', fare: 8 },
      { dest: 'Entoto Park Terminus', bay: 'Uphill curb (Facing Mountain)', fare: 8 }
    ],
    destinations: [
      { to: 'Piazza (De Gaulle)', to_am: 'ፒያሳ (ደጎል)', to_ti: 'ፒያሳ', keywords: ['piazza', 'ፒያሳ'], fare_etb: 10, duration_mins: 15 },
      { to: 'Arat Kilo', to_am: 'አራት ኪሎ', to_ti: 'ኣርባዕተ ኪሎ', keywords: ['arat kilo', 'አራት ኪሎ'], fare_etb: 8, duration_mins: 12 },
      { to: 'Entoto Park Terminus', to_am: 'እንጦጦ ፓርክ', to_ti: 'እንጦጦ ፓርክ', keywords: ['entoto', 'እንጦጦ', 'park', 'ፓርክ'], fare_etb: 8, duration_mins: 10 }
    ]
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
    operating_hours: '05:30 - 22:30',
    queue_tips_en: 'Crucial interchange linking Kirkos subcity to Bole and Nifas Silk.',
    landmarks: [
      { name: 'Gotera Triple Flyover', name_am: 'የጎተራ ባለሶስት ድልድይ', icon: '🌉', lat: 8.9862, lng: 38.7570, tip: 'Addis Ababa landmark triple-tier interchange' },
      { name: 'Lancia Commercial Center', name_am: 'ላንቻ ህንፃ', icon: '🏢', lat: 8.9875, lng: 38.7562, tip: 'Meeting spot with cafes and passenger waiting arcade' },
      { name: 'Kera Municipal Abattoir', name_am: 'የቄራ ማዘጋጃ', icon: '🥩', lat: 8.9950, lng: 38.7480, tip: 'North-west pedestrian access point' },
      { name: 'Lancia LRT Station', name_am: 'ላንቻ ባቡር ጣቢያ', icon: '🚊', lat: 8.9880, lng: 38.7575, tip: 'Direct elevated train access' }
    ],
    walking_steps_en: [
      'Walk under the Gotera interchange ramps near Lancia.',
      'The loading bay is protected under the bridge span with direct pedestrian access.',
      'Check destination signs for Mexico, Saris, or Bole.',
      'Use the painted pedestrian crossings when traversing the interchange slip roads.'
    ],
    walking_steps_am: [
      'ከላንቻ አጠገብ ባለው የጎተራ ማስተላለፊያ ድልድይ ስር በእግር ይሂዱ።',
      'የታክሲ መጫኛ ቦታው በድልድዩ ስር ከዝናብና ከፀሐይ ተከልሎ ይገኛል።',
      'የሜክሲኮ፣ ሳሪስ ወይም የቦሌ መዳረሻ ሰሌዳዎችን ይመልከቱ።',
      'የማስተላለፊያ መንገዶችን ሲያቋርጡ የእግረኛ መስመሮችን ይጠቀሙ።'
    ],
    queue_spots: [
      { dest: 'Mexico Square', bay: 'Ramp 1 (Northbound)', fare: 10 },
      { dest: 'Saris Abo', bay: 'Ramp 2 (Southbound to Debre Zeit)', fare: 10 },
      { dest: 'Bole Medhanialem', bay: 'Ramp 3 (Eastbound via Olympia)', fare: 12 }
    ],
    destinations: [
      { to: 'Mexico Square', to_am: 'ሜክሲኮ አደባባይ', to_ti: 'መክሲኮ', keywords: ['mexico', 'ሜክሲኮ'], fare_etb: 10, duration_mins: 12 },
      { to: 'Saris Abo', to_am: 'ሳሪስ አቦ', to_ti: 'ሳሪስ ኣቦ', keywords: ['saris', 'ሳሪስ', 'abo', 'አቦ'], fare_etb: 10, duration_mins: 14 },
      { to: 'Bole Medhanialem', to_am: 'ቦሌ መድኃኔዓለም', to_ti: 'ቦሌ', keywords: ['bole', 'ቦሌ', 'medhanialem', 'መድኃኔዓለም'], fare_etb: 12, duration_mins: 15 }
    ]
  }
];
