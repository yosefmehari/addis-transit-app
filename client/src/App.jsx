import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ==========================================
// Translations (English, Amharic, Tigrinya)
// ==========================================
const I18N = {
  en: {
    appTitle: 'Addis Transit & Taxi Hub',
    appSubtitle: 'Unified Addis Ababa Public Transport, Taxi & Regional Directory',
    tabPlanner: 'Trip Planner',
    tabTaxiFinder: 'Find Taxi Place 🔍',
    tabTaxiTeras: 'Taxi Ranks 🚕',
    tabFareCalc: 'Fare Calculator 💰',
    tabSlang: 'Conductor Voice 🗣️',
    tabTraffic: 'Traffic & Rush 🚦',
    tabRideHail: 'Call Taxis 📱',
    tabRegional: 'Regional Buses 🚌',
    tabBajaj: 'Feeder Bajaj 🛺',
    tabTariff: 'Tariff & Info 📋',
    tabRoutes: 'Transit Lines 🚏',
    tabStops: 'Stations 📍',
    originLabel: 'Origin',
    destLabel: 'Destination',
    selectOrigin: 'Select departure station...',
    selectDest: 'Select arrival station...',
    findRouteBtn: 'Calculate Best Route',
    clearRouteBtn: 'Clear',
    swapBtn: 'Swap',
    allModes: 'All Modes',
    lrtMode: 'Light Rail (LRT)',
    minibusMode: 'Minibus Taxi',
    anbessaMode: 'Anbessa Bus',
    shegerMode: 'Sheger Express',
    higerMode: 'Higer Midibus',
    fare: 'Total Fare',
    estTime: 'Total Time',
    distance: 'Distance',
    transfers: 'Transfers',
    directJourney: 'Direct Journey',
    transferAt: 'Transfer At',
    setAsOrigin: 'Set as Origin 🟢',
    setAsDest: 'Set as Destination 🔴',
    noRouteFound: 'No viable direct or 1-transfer route found between selected stations. Try different hubs.',
    stopsPassing: 'Lines serving this station:',
    mapStyle: 'Theme:',
    recenter: 'Recenter Addis',
    loading: 'Loading transit & taxi directory...',
    mins: 'mins',
    km: 'km',
    etb: 'ETB',
    openSidebar: 'Menu',
    closeSidebar: 'Hide',
    frequency: 'Every',
    hours: 'Hours',
    subcity: 'Subcity',
    searchPlaceholder: 'Search station, tera, or subcity...',
    whereDoYouWantToGo: 'Where do you want to go in Addis?',
    findTaxiPlacePrompt: 'Type your destination to find which Taxi Tera to board at:',
    matchingTerasFor: 'Taxi Ranks with minibuses going to',
    noMatchingTeras: 'No specific taxi tera found for this keyword. Try Bole, Piazza, Mexico, Saris, Mercato, Jomo, Kality, Ayat, or Kera.',
    whereToGet: 'Where to get:',
    callNow: 'Call Dispatch',
    queueTips: 'Tips & Queue:',
    weyalaCall: 'Conductor Shout:',
    locateMe: 'Find Nearest To Me 📍',
    yourLocation: 'Your Location / Selected Point',
    distanceFromYou: 'Distance from you',
    listenShout: 'Listen Shout 🔊',
    tariffTitle: 'Official Transport Tariffs & Guidelines',
    emergencyHotlines: 'Emergency & Transport Hotlines',
    walkPathBtn: 'Show Walking Path 🚶',
    openGoogleMaps: 'Navigate via Google Maps 🗺️',
    walkingDistTitle: 'Walking to',
    compareTitle: 'Compare Fares Across Modes',
    tripDistance: 'Trip Distance (km):',
    trafficAlerts: 'Addis Real-Time Traffic & Rush Hours',
    slangTitle: 'Addis Taxi Slang & Passenger Culture',
    tabAllTaxiLines: 'Taxi Lines (Beg ➔ End) 🚏',
    allTaxiLinesTitle: 'All Addis Ababa Taxi Stations & Terminals',
    beginning: 'Beginning (Origin)',
    ending: 'End (Destination)',
    clearMap: 'Clear Map 🧹',
    fullMap: 'Full Map ⛶',
    showMenu: 'Show Menu ◀',
    fitCity: 'Addis Full View 🌍',
    layerTaxi: 'Taxis',
    layerLrt: 'LRT Train',
    layerBus: 'City Bus',
    layerRegional: 'Regional',
    layerLabels: 'Labels',
    mapLegend: 'Map Legend',
    searchOriginOrDest: 'Search Beginning station or Ending destination...',
    allFares: 'All Fares',
    viewOnMap: 'View Route on Map 🗺️',
    walkToTera: 'Walk to Station 🚶',
    routesFound: 'routes found'
  },
  am: {
    appTitle: 'አዲስ ትራንዚትና ታክሲ ማዕከል',
    appSubtitle: 'የአዲስ አበባ ሙሉ የትራንስፖርት፣ የታክሲና የክልል አውቶቡስ መመሪያ',
    tabPlanner: 'የጉዞ እቅድ',
    tabTaxiFinder: 'ተራ ፈላጊ 🔍',
    tabTaxiTeras: 'የታክሲ ተራዎች 🚕',
    tabFareCalc: 'የታሪፍ ማስያ 💰',
    tabSlang: 'የወያላ ድምጽ 🗣️',
    tabTraffic: 'የትራፊክ ሁኔታ 🚦',
    tabRideHail: 'የጥሪ ታክሲ 📱',
    tabRegional: 'የክልል አውቶቡስ 🚌',
    tabBajaj: 'ባጃጅ 🛺',
    tabTariff: 'ታሪፍና መረጃ 📋',
    tabRoutes: 'መስመሮች 🚏',
    tabStops: 'ጣቢያዎች 📍',
    originLabel: 'መነሻ',
    destLabel: 'መድረሻ',
    selectOrigin: 'የመነሻ ጣቢያ ይምረጡ...',
    selectDest: 'የመድረሻ ጣቢያ ይምረጡ...',
    findRouteBtn: 'ምርጥ መስመር ፈልግ',
    clearRouteBtn: 'አጥፋ',
    swapBtn: 'ቀይር',
    allModes: 'ሁሉም',
    lrtMode: 'ቀላል ባቡር',
    minibusMode: 'ሰማያዊ ታክሲ',
    anbessaMode: 'አንበሳ አውቶቡስ',
    shegerMode: 'ሸገር ኤክስፕረስ',
    higerMode: 'ሃይገር ሚዲባስ',
    fare: 'ጠቅላላ ታሪፍ',
    estTime: 'የጉዞ ጊዜ',
    distance: 'ርቀት',
    transfers: 'መቀያየሪያ',
    directJourney: 'ቀጥታ ጉዞ',
    transferAt: 'መቀያየሪያ ጣቢያ',
    setAsOrigin: 'እንደ መነሻ አድርግ 🟢',
    setAsDest: 'እንደ መድረሻ አድርግ 🔴',
    noRouteFound: 'በተመረጡት ጣቢያዎች መካከል ቀጥተኛ ወይም በ1-መቀያየር የሚገኝ መስመር አልተገኘም።',
    stopsPassing: 'የሚያልፉ መስመሮች፡',
    mapStyle: 'የካርታ አይነት፡',
    recenter: 'ወደ አዲስ አበባ መልስ',
    loading: 'የትራንዚትና የታክሲ መረጃዎችን በማምጣት ላይ...',
    mins: 'ደቂቃ',
    km: 'ኪ.ሜ',
    etb: 'ብር',
    openSidebar: 'ምናሌ',
    closeSidebar: 'ደብቅ',
    frequency: 'በየ',
    hours: 'የስራ ሰዓት',
    subcity: 'ክፍለ ከተማ',
    searchPlaceholder: 'ጣቢያ፣ ተራ ወይም ክፍለ ከተማ ፈልግ...',
    whereDoYouWantToGo: 'የት መሄድ ይፈልጋሉ?',
    findTaxiPlacePrompt: 'የሚሄዱበትን ቦታ ይጻፉ፤ የሚሳፈሩበትን የታክሲ ተራ ያግኙ፡',
    matchingTerasFor: 'ወደዚህ ቦታ ታክሲ የሚገኝባቸው ተራዎች፡',
    noMatchingTeras: 'ለዚህ ቦታ ታክሲ ተራ አልተገኘም። ቦሌ፣ ፒያሳ፣ ሜክሲኮ፣ ሳሪስ፣ መርካቶ፣ ጆሞ፣ ቃሊቲ፣ አያት ወይም ቄራ ብለው ይሞክሩ።',
    whereToGet: 'የት ይገኛል፡',
    callNow: 'አሁን ይደውሉ',
    queueTips: 'ጠቃሚ መረጃና ሰልፍ፡',
    weyalaCall: 'የወያላ ጥሪ፡',
    locateMe: 'የቅርቤን ፈልግ 📍',
    yourLocation: 'የእርስዎ መገኛ',
    distanceFromYou: 'ከእርስዎ ርቀት',
    listenShout: 'ጥሪውን አድምጥ 🔊',
    tariffTitle: 'ህጋዊ የታክሲና ትራንስፖርት ታሪፍ',
    emergencyHotlines: 'አስቸኳይ እና የትራንስፖርት ስልክ ቁጥሮች',
    walkPathBtn: 'የእግር መንገድ አሳይ 🚶',
    openGoogleMaps: 'በጎግል ካርታ ምራ 🗺️',
    walkingDistTitle: 'የእግር መንገድ ወደ',
    compareTitle: 'የትራንስፖርት አማራጮች የዋጋ ንጽጽር',
    tripDistance: 'የጉዞ ርቀት (ኪሎሜትር)፡',
    trafficAlerts: 'የአዲስ አበባ የቀጥታ ትራፊክና መጨናነቅ መረጃ',
    slangTitle: 'የታክሲ ባህልና የወያላ መዝገበ ቃላት',
    tabAllTaxiLines: 'የታክሲ መስመሮች (መነሻ ➔ መድረሻ) 🚏',
    allTaxiLinesTitle: 'የአዲስ አበባ ሙሉ የታክሲ ተራዎችና መዳረሻዎች',
    beginning: 'መነሻ ተራ',
    ending: 'መድረሻ',
    clearMap: 'ካርታ አፅዳ 🧹',
    fullMap: 'ሙሉ ካርታ ⛶',
    showMenu: 'ምናሌ አሳይ ◀',
    fitCity: 'ሙሉ አዲስ አበባ 🌍',
    layerTaxi: 'ታክሲዎች',
    layerLrt: 'ቀላል ባቡር',
    layerBus: 'የከተማ አውቶቡስ',
    layerRegional: 'የክልል አውቶቡስ',
    layerLabels: 'ስሞች',
    mapLegend: 'የካርታ ምልክቶች',
    searchOriginOrDest: 'መነሻ ተራ ወይም መድረሻ ፈልግ...',
    allFares: 'ሁሉም ታሪፍ',
    viewOnMap: 'በካርታ ላይ አሳይ 🗺️',
    walkToTera: 'በእግር ሂድ 🚶',
    routesFound: 'መስመሮች ተገኝተዋል'
  },
  ti: {
    appTitle: 'ኣዲስ ትራንዚትን ታክሲን',
    appSubtitle: 'መገዲ መጓዓዝያን መምርሒ ታክሲ ኣዲስ ኣበባን',
    tabPlanner: 'መደብ ጉዕዞ',
    tabTaxiFinder: 'ተራ ድለይ 🔍',
    tabTaxiTeras: 'ተራታት ታክሲ 🚕',
    tabFareCalc: 'ናይ ዋጋ መተመኒ 💰',
    tabSlang: 'ጻውዒት ወያላ 🗣️',
    tabTraffic: 'ኩነታት ትራፊክ 🚦',
    tabRideHail: 'ናይ ጻውዒት ታክሲ 📱',
    tabRegional: 'ናይ ክልል ኣውቶቡስ 🚌',
    tabBajaj: 'ባጃጅ 🛺',
    tabTariff: 'ዋጋን ሓበሬታን 📋',
    tabRoutes: 'መስመራት 🚏',
    tabStops: 'መዕረፍታት 📍',
    originLabel: 'መበገሲ',
    destLabel: 'መዕረፊ',
    selectOrigin: 'መበገሲ ጣብያ ምረጽ...',
    selectDest: 'መዕረፊ ጣብያ ምረጽ...',
    findRouteBtn: 'መስመር ድለይ',
    clearRouteBtn: 'ኣጥፍእ',
    swapBtn: 'ቀይር',
    allModes: 'ኩሎም',
    lrtMode: 'ቀሊል ባቡር',
    minibusMode: 'ታክሲ',
    anbessaMode: 'ኣንበሳ ኣውቶቡስ',
    shegerMode: 'ሸገር ኤክስፕረስ',
    higerMode: 'ሃይገር ሚዲባስ',
    fare: 'ጠቕላላ ዋጋ',
    estTime: 'ዝወስዶ ግዜ',
    distance: 'ርሕቐት',
    transfers: 'ምቕያር',
    directJourney: 'ቀጥታዊ ጉዕዞ',
    transferAt: 'መቐየሪ ጣብያ',
    setAsOrigin: 'መበገሲ ግበሮ 🟢',
    setAsDest: 'መዕረፊ ግበሮ 🔴',
    noRouteFound: 'ኣብ መንጎ ዝተመርጹ ጣብያታት ዝተረኽበ መስመር የለን።',
    stopsPassing: 'ዝሓልፉ መስመራት፡',
    mapStyle: 'ቅዲ ካርታ፡',
    recenter: 'ናብ ኣዲስ ኣበባ መልስ',
    loading: 'ሓበሬታ ይዳሎ ኣሎ...',
    mins: 'ደቒቕ',
    km: 'ኪ.ሜ',
    etb: 'ቅርሺ',
    openSidebar: 'ዝርዝር',
    closeSidebar: 'ሕባእ',
    frequency: 'ኣብ ነፍሲ ወከፍ',
    hours: 'ሰዓታት ስራሕ',
    subcity: 'ክፍለ ከተማ',
    searchPlaceholder: 'ጣብያ ወይ ክፍለ ከተማ ድለይ...',
    whereDoYouWantToGo: 'ናበይ ክትከይድ ትደሊ?',
    findTaxiPlacePrompt: 'እትኸዶ ቦታ ጽሓፍ፤ እትሳፈረሉ ተራ ታክሲ ርኸብ፡',
    matchingTerasFor: 'ናብዚ ቦታ ታክሲ ዝርከበሉ ተራታት፡',
    noMatchingTeras: 'ተራ ኣይተረኽበን።',
    whereToGet: 'ኣበይ ይርከብ፡',
    callNow: 'ሕጂ ደውሉ',
    queueTips: 'ሓበሬታን ተርታን፡',
    weyalaCall: 'ጻውዒት ወያላ፡',
    locateMe: 'ናተይ ቀረባ ድለይ 📍',
    yourLocation: 'ናትካ ቦታ',
    distanceFromYou: 'ካባኻ ርሕቐት',
    listenShout: 'ጻውዒት ስማዕ 🔊',
    tariffTitle: 'ሕጋዊ ዋጋታት መጓዓዝያ',
    emergencyHotlines: 'ናይ ህጹጽ ሓደጋ ቁጽርታት',
    walkPathBtn: 'ናይ እግሪ መንገዲ ርአ 🚶',
    openGoogleMaps: 'ብጎጉል ካርታ ኽፈት 🗺️',
    walkingDistTitle: 'ናይ እግሪ መንገዲ ናብ',
    compareTitle: 'ምውድዳር ዋጋታት መጓዓዝያ',
    tripDistance: 'ርሕቐት ጉዕዞ (ኪሎሜተር)፡',
    trafficAlerts: 'ሓበሬታ ፅቕጥቕጥ ትራፊክ ኣዲስ ኣበባ',
    slangTitle: 'ባህሊ ታክሲን መዝገበ ቃላት ወያላን',
    tabAllTaxiLines: 'መስመራት ታክሲ (መበገሲ ➔ መዕረፊ) 🚏',
    allTaxiLinesTitle: 'ናይ ኣዲስ ኣበባ ምሉእ ተራታት ታክሲን መዕረፍታትን',
    beginning: 'መበገሲ ተራ',
    ending: 'መዕረፊ',
    clearMap: 'ካርታ ኣጽሪ 🧹',
    fullMap: 'ምሉእ ካርታ ⛶',
    showMenu: 'ዝርዝር ኣርኢ ◀',
    fitCity: 'ምሉእ ኣዲስ ኣበባ 🌍',
    layerTaxi: 'ታክሲታት',
    layerLrt: 'ቀሊል ባቡር',
    layerBus: 'ኣውቶቡስ ከተማ',
    layerRegional: 'ናይ ክልል',
    layerLabels: 'ስማት',
    mapLegend: 'መብርሂ ምልክታት',
    searchOriginOrDest: 'መበገሲ ወይ መዕረፊ ድለይ...',
    allFares: 'ኩሉ ዋጋ',
    viewOnMap: 'ኣብ ካርታ ርአ 🗺️',
    walkToTera: 'ብእግሪ ኺድ 🚶',
    routesFound: 'መስመራት ተረኺቦም'
  }
};

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Speech synthesis for Conductor Call
function playWeyalaAudio(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    // Prefer Amharic or default
    const voices = window.speechSynthesis.getVoices();
    const amVoice = voices.find(v => v.lang.includes('am') || v.lang.includes('eth'));
    if (amVoice) utterance.voice = amVoice;
    window.speechSynthesis.speak(utterance);
  }
}

// Custom Leaflet Markers
function createCustomIcon(category, isSelected = false, isOrigin = false, isDest = false, isTransfer = false, isTaxiTera = false, isRegional = false, isUserLocation = false) {
  let bgColor = '#0284c7';
  let iconSvg = `<circle cx="16" cy="16" r="6" fill="#ffffff" />`;

  if (isUserLocation) {
    bgColor = '#3b82f6';
    iconSvg = `<circle cx="16" cy="16" r="6" fill="#ffffff" /><circle cx="16" cy="16" r="10" stroke="#ffffff" stroke-width="2" fill="none"/>`;
  } else if (isRegional) {
    bgColor = '#c026d3';
    iconSvg = `<path d="M7 10h18v10H7zM9 20v2M23 20v2M10 14h12M12 7l4-3 4 3" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  } else if (isTaxiTera) {
    bgColor = '#eab308';
    iconSvg = `<path d="M7 17l2-5h14l2 5v7h-3v-2H10v2H7v-7zM10 17h12M11 20h2M19 20h2M13 9h6v3h-6z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  } else if (category === 'lrt_station') {
    bgColor = '#16a34a';
    iconSvg = `<path d="M10 11h12v7H10zM12 21l-2 3M20 21l2 3M12 15h.01M20 15h.01" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  } else if (category === 'interchange') {
    bgColor = '#8b5cf6';
    iconSvg = `<path d="M9 12l-4 4 4 4M23 12l4 4-4 4M5 16h22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  } else if (category === 'bus_stop') {
    bgColor = '#ea580c';
    iconSvg = `<path d="M10 10h12v9H10zM12 22v-3M20 22v-3M13 14h6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  }

  if (isOrigin) bgColor = '#10b981';
  if (isDest) bgColor = '#ef4444';
  if (isTransfer) bgColor = '#f59e0b';

  const size = isSelected || isOrigin || isDest || isTransfer ? 38 : (isTaxiTera || isRegional || isUserLocation ? 32 : 30);
  const stroke = isSelected ? '#ffffff' : (isTaxiTera ? '#000000' : 'rgba(255,255,255,0.85)');
  const strokeWidth = isSelected ? 3 : 2;

  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${bgColor};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: ${strokeWidth}px solid ${stroke};
      box-shadow: 0 4px 12px rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    ">
      <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center;">
        <svg width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 32 32" fill="none">
          ${iconSvg}
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-transit-pin',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
}

function MapController({ center, zoom, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    } else if (center) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, bounds, map]);
  return null;
}

// Common Addis Ababa Destination Coordinates for Direct Line Tracing
const DEST_COORDS = {
  'bole': [8.9902, 38.7865],
  'airport': [8.9806, 38.7994],
  'medhanialem': [8.9902, 38.7865],
  'edna mall': [8.9902, 38.7865],
  'saris': [8.9554, 38.7651],
  'gotera': [8.9862, 38.7570],
  'kera': [8.9950, 38.7480],
  'bulbula': [8.9720, 38.7900],
  'jomo': [8.9610, 38.7075],
  'tor hailoch': [9.0118, 38.7248],
  'ayer tena': [9.0020, 38.7020],
  'alem bank': [8.9980, 38.6950],
  'mercato': [9.0315, 38.7368],
  'piazza': [9.0353, 38.7533],
  'arat kilo': [9.0334, 38.7618],
  'siddist kilo': [9.0435, 38.7620],
  'megenagna': [9.0204, 38.8014],
  'cmc': [9.0229, 38.8317],
  'ayat': [9.0252, 38.8631],
  'kazanchis': [9.0162, 38.7680],
  'stadium': [9.0135, 38.7569],
  'kotebe': [9.0280, 38.8250],
  'shiro meda': [9.0601, 38.7620],
  'entoto': [9.0750, 38.7650],
  'asco': [9.0550, 38.7050],
  'wingate': [9.0480, 38.7180],
  'mexico': [9.0108, 38.7511],
  'kality': [8.9056, 38.7561],
  'tuludimtu': [8.8750, 38.7750],
  'tulu dimtu': [8.8750, 38.7750],
  'akaki': [8.8850, 38.7800],
  'lebu': [8.9650, 38.7190],
  'gerji': [8.9950, 38.8050],
  'imperial': [8.9980, 38.7950],
  'lancia': [8.9920, 38.7550]
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('alltaxilines');

  const [stops, setStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stats, setStats] = useState(null);
  const [taxiTeras, setTaxiTeras] = useState([]);
  const [taxiServices, setTaxiServices] = useState([]);
  const [regionalTerminals, setRegionalTerminals] = useState([]);
  const [feederBajaj, setFeederBajaj] = useState([]);
  const [slangList, setSlangList] = useState([]);
  const [trafficInfo, setTrafficInfo] = useState(null);
  const [fareKm, setFareKm] = useState(8);
  const [fareComparison, setFareComparison] = useState(null);
  const [walkingDestination, setWalkingDestination] = useState(null);
  const [selectedSubcityFilter, setSelectedSubcityFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // User Geolocation
  const [userLocation, setUserLocation] = useState(null);
  const [locatingUser, setLocatingUser] = useState(false);

  // Search & Filter
  const [activeMode, setActiveMode] = useState('all');
  const [originId, setOriginId] = useState('');
  const [destId, setDestId] = useState('');
  const [journeyPlan, setJourneyPlan] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [taxiDestinationQuery, setTaxiDestinationQuery] = useState('Bole');
  const [searchQuery, setSearchQuery] = useState('');
  const [mapStyle, setMapStyle] = useState('light'); // default to 'light' for crystal clear high-contrast view
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Map Layer Toggles for Maximum Clarity
  const [showTaxiLayer, setShowTaxiLayer] = useState(true);
  const [showLrtLayer, setShowLrtLayer] = useState(true);
  const [showBusLayer, setShowBusLayer] = useState(true);
  const [showRegionalLayer, setShowRegionalLayer] = useState(true);
  const [showStationLabels, setShowStationLabels] = useState(false);
  const [showMapLegend, setShowMapLegend] = useState(true);

  // Beginning ➔ End Taxi Line Selection & Filtering
  const [selectedTaxiLine, setSelectedTaxiLine] = useState(null);
  const [taxiLineQuery, setTaxiLineQuery] = useState('');
  const [originFilter, setOriginFilter] = useState('all');
  const [fareFilter, setFareFilter] = useState('all');

  const [mapCenter, setMapCenter] = useState([9.0108, 38.7511]);
  const [mapZoom, setMapZoom] = useState(13);
  const [routeBounds, setRouteBounds] = useState(null);

  const t = I18N[lang] || I18N.en;

  const tileLayers = {
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap'
    },
    light: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CartoDB & OpenStreetMap'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CartoDB & OpenStreetMap'
    }
  };

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/v1/stops').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/routes').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/network/stats').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/taxi-teras').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/taxi-services').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/regional-terminals').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/feeder-bajaj').then(res => res.json()),
      fetch('http://localhost:5000/api/v1/slang-dictionary').then(res => res.json()).catch(() => ({ success: false })),
      fetch('http://localhost:5000/api/v1/traffic-advisory').then(res => res.json()).catch(() => ({ success: false }))
    ])
      .then(([stopsRes, routesRes, statsRes, terasRes, servicesRes, regionalRes, bajajRes, slangRes, trafficRes]) => {
        if (stopsRes.success) setStops(stopsRes.data);
        if (routesRes.success) setRoutes(routesRes.data);
        if (statsRes.success) setStats(statsRes.data);
        if (terasRes.success) setTaxiTeras(terasRes.data);
        if (servicesRes.success) setTaxiServices(servicesRes.data);
        if (regionalRes.success) setRegionalTerminals(regionalRes.data);
        if (bajajRes.success) setFeederBajaj(bajajRes.data);
        if (slangRes && slangRes.success) setSlangList(slangRes.data);
        if (trafficRes && trafficRes.success) setTrafficInfo(trafficRes);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  // Fetch Fare Comparison when fareKm changes
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/fare-compare?distanceKm=${fareKm}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setFareComparison(data.comparison);
      })
      .catch(err => console.error('Fare compare error:', err));
  }, [fareKm]);

  const filteredRoutes = useMemo(() => {
    if (activeMode === 'all') return routes;
    return routes.filter(r => r.transport_type === activeMode);
  }, [routes, activeMode]);

  // Multilingual Matching Taxi Teras for Destination Query
  const matchingTeras = useMemo(() => {
    if (!taxiDestinationQuery.trim()) return [];
    const q = taxiDestinationQuery.toLowerCase().trim();
    let matches = taxiTeras.filter(tera => {
      const isTeraMatch =
        tera.name_en.toLowerCase().includes(q) ||
        (tera.name_am && tera.name_am.includes(q)) ||
        (tera.name_ti && tera.name_ti.includes(q)) ||
        tera.subcity.toLowerCase().includes(q);

      const hasDestMatch = tera.destinations.some(d =>
        d.to.toLowerCase().includes(q) ||
        (d.to_am && d.to_am.includes(q)) ||
        (d.to_ti && d.to_ti.includes(q)) ||
        (d.keywords && d.keywords.some(k => k.toLowerCase().includes(q)))
      );

      return isTeraMatch || hasDestMatch;
    }).map(tera => {
      let dist = null;
      if (userLocation) {
        dist = calculateDistanceKm(userLocation.lat, userLocation.lng, Number(tera.latitude), Number(tera.longitude));
      }
      const relevant = tera.destinations.filter(d =>
        d.to.toLowerCase().includes(q) ||
        (d.to_am && d.to_am.includes(q)) ||
        (d.to_ti && d.to_ti.includes(q)) ||
        (d.keywords && d.keywords.some(k => k.toLowerCase().includes(q)))
      );
      return {
        ...tera,
        distanceFromUser: dist,
        relevantDestinations: relevant.length > 0 ? relevant : tera.destinations
      };
    });

    if (userLocation) {
      matches.sort((a, b) => (a.distanceFromUser || 999) - (b.distanceFromUser || 999));
    }
    return matches;
  }, [taxiTeras, taxiDestinationQuery, userLocation]);

  // Flatten all 15 Taxi Hubs into individual Beginning ➔ End Minibus lines
  const allTaxiLines = useMemo(() => {
    const list = [];
    taxiTeras.forEach(tera => {
      if (tera.destinations) {
        tera.destinations.forEach((d, idx) => {
          let destCoord = null;
          const searchKey = (d.to + ' ' + (d.keywords ? d.keywords.join(' ') : '')).toLowerCase();
          for (const [key, coord] of Object.entries(DEST_COORDS)) {
            if (searchKey.includes(key)) {
              destCoord = coord;
              break;
            }
          }
          if (!destCoord) {
            const matchedStop = stops.find(s => searchKey.includes(s.name_en.toLowerCase()));
            if (matchedStop) {
              destCoord = [Number(matchedStop.latitude), Number(matchedStop.longitude)];
            } else {
              destCoord = [Number(tera.latitude) + 0.015, Number(tera.longitude) + 0.015];
            }
          }

          let distFromUser = null;
          if (userLocation) {
            distFromUser = calculateDistanceKm(userLocation.lat, userLocation.lng, Number(tera.latitude), Number(tera.longitude));
          }

          list.push({
            id: `${tera.id}-line-${idx}`,
            tera,
            origin_en: tera.name_en,
            origin_am: tera.name_am,
            origin_ti: tera.name_ti,
            origin_subcity: tera.subcity,
            origin_location_en: tera.exact_location_en,
            origin_location_am: tera.exact_location_am,
            origin_lat: Number(tera.latitude),
            origin_lng: Number(tera.longitude),
            weyala_shout: tera.weyala_shout,
            dest_en: d.to,
            dest_am: d.to_am,
            dest_ti: d.to_ti,
            fare_etb: d.fare_etb,
            duration_mins: d.duration_mins,
            keywords: d.keywords || [],
            destCoord,
            distFromUser
          });
        });
      }
    });
    return list;
  }, [taxiTeras, stops, userLocation]);

  const filteredTaxiLines = useMemo(() => {
    return allTaxiLines.filter(line => {
      if (originFilter !== 'all' && line.tera.id !== originFilter) return false;
      if (fareFilter === 'under10' && line.fare_etb > 10) return false;
      if (fareFilter === '10to15' && (line.fare_etb < 10 || line.fare_etb > 15)) return false;
      if (fareFilter === 'over15' && line.fare_etb <= 15) return false;
      if (taxiLineQuery.trim()) {
        const q = taxiLineQuery.toLowerCase().trim();
        const matchesOrigin =
          line.origin_en.toLowerCase().includes(q) ||
          (line.origin_am && line.origin_am.includes(q)) ||
          (line.origin_ti && line.origin_ti.includes(q));
        const matchesDest =
          line.dest_en.toLowerCase().includes(q) ||
          (line.dest_am && line.dest_am.includes(q)) ||
          (line.dest_ti && line.dest_ti.includes(q));
        const matchesSubcity = line.origin_subcity.toLowerCase().includes(q);
        const matchesKeywords = line.keywords.some(k => k.toLowerCase().includes(q));
        if (!matchesOrigin && !matchesDest && !matchesSubcity && !matchesKeywords) return false;
      }
      return true;
    });
  }, [allTaxiLines, originFilter, fareFilter, taxiLineQuery]);

  const handleSelectTaxiLine = (line) => {
    setSelectedTaxiLine(line);
    setSelectedRoute(null);
    setJourneyPlan(null);
    setWalkingDestination(null);
    if (line.destCoord) {
      setRouteBounds([
        [line.origin_lat, line.origin_lng],
        line.destCoord
      ]);
    } else {
      setMapCenter([line.origin_lat, line.origin_lng]);
      setMapZoom(15);
    }
  };

  const handleClearMap = () => {
    setSelectedRoute(null);
    setSelectedTaxiLine(null);
    setWalkingDestination(null);
    setJourneyPlan(null);
    setOriginId('');
    setDestId('');
    setRouteBounds(null);
    setMapCenter([9.0108, 38.7511]);
    setMapZoom(13);
  };

  const handleFitAddisCity = () => {
    setRouteBounds([
      [9.0900, 38.6800],
      [8.8800, 38.8850]
    ]);
  };

  // Handle Geolocation
  const handleLocateMe = () => {
    setLocatingUser(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(loc);
          setMapCenter([loc.lat, loc.lng]);
          setMapZoom(15);
          setLocatingUser(false);
        },
        () => {
          // Default to Meskel Square if permission denied or desktop
          const fallbackLoc = { lat: 9.0102, lng: 38.7628 };
          setUserLocation(fallbackLoc);
          setMapCenter([fallbackLoc.lat, fallbackLoc.lng]);
          setMapZoom(15);
          setLocatingUser(false);
        }
      );
    } else {
      const fallbackLoc = { lat: 9.0102, lng: 38.7628 };
      setUserLocation(fallbackLoc);
      setMapCenter([fallbackLoc.lat, fallbackLoc.lng]);
      setMapZoom(15);
      setLocatingUser(false);
    }
  };

  const handleFindRoute = () => {
    if (!originId || !destId) return;
    fetch(`http://localhost:5000/api/v1/routes/plan?originId=${originId}&destId=${destId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.plan) {
          setJourneyPlan(data.plan);
          const allCoords = data.plan.legs.flatMap(l => l.path || []);
          if (allCoords.length > 0) {
            setRouteBounds(allCoords);
          }
        } else {
          setJourneyPlan('not_found');
        }
      })
      .catch(err => {
        console.error('Plan error:', err);
        setJourneyPlan('not_found');
      });
  };

  const handleClearRoute = () => {
    setOriginId('');
    setDestId('');
    setJourneyPlan(null);
    setSelectedRoute(null);
    setRouteBounds(null);
    setMapCenter([9.0108, 38.7511]);
    setMapZoom(13);
  };

  const handleSwap = () => {
    setOriginId(destId);
    setDestId(originId);
  };

  const getStopName = (stop) => {
    if (!stop) return '';
    if (lang === 'am' && stop.name_am) return stop.name_am;
    if (lang === 'ti' && stop.name_ti) return stop.name_ti;
    return stop.name_en;
  };

  const getRouteTitle = (route) => {
    if (!route) return '';
    if (lang === 'am' && route.title_am) return route.title_am;
    if (lang === 'ti' && route.title_ti) return route.title_ti;
    return route.title_en;
  };

  const modeInfo = {
    lrt: { label: t.lrtMode, color: '#16a34a', icon: '🚊' },
    minibus: { label: t.minibusMode, color: '#0284c7', icon: '🚐' },
    anbessa: { label: t.anbessaMode, color: '#ea580c', icon: '🚌' },
    sheger: { label: t.shegerMode, color: '#059669', icon: '🚍' },
    higer: { label: t.higerMode, color: '#d97706', icon: '🚐' }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* ==================================================== */}
      {/* Modern Collapsible Sidebar                           */}
      {/* ==================================================== */}
      <div style={{
        width: isSidebarOpen ? '450px' : '0px',
        minWidth: isSidebarOpen ? '450px' : '0px',
        height: '100%',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
        zIndex: 1000,
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #090d16 0%, #1a2234 100%)',
          color: '#ffffff',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', height: '3px', position: 'absolute', top: 0, left: 0, right: 0 }}>
            <div style={{ flex: 1, background: '#009A44' }} />
            <div style={{ flex: 1, background: '#FED100' }} />
            <div style={{ flex: 1, background: '#EF3340' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '22px' }}>🚕</span>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '800', letterSpacing: '-0.3px', color: '#f8fafc' }}>
                  {t.appTitle}
                </h1>
              </div>
              <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#94a3b8' }}>
                {t.appSubtitle}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '3px', borderRadius: '8px' }}>
              {[
                { code: 'en', label: 'EN' },
                { code: 'am', label: 'አማ' },
                { code: 'ti', label: 'ትግ' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  style={{
                    border: 'none',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: lang === item.code ? '700' : '500',
                    background: lang === item.code ? '#eab308' : 'transparent',
                    color: lang === item.code ? '#000000' : '#ffffff',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Locate & Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '10px', color: '#cbd5e1' }}>
              <span>🚉 <strong>{stops.length}</strong> Stations</span> • <span>🚕 <strong>{taxiTeras.length}</strong> Teras</span>
            </div>
            <button
              onClick={handleLocateMe}
              style={{
                border: 'none',
                background: userLocation ? '#10b981' : 'rgba(255,255,255,0.15)',
                color: '#ffffff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>📍</span> {locatingUser ? 'Locating...' : (userLocation ? 'Location Active' : t.locateMe)}
            </button>
          </div>
        </div>

        {/* Scrollable Tabs */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          padding: '6px',
          borderBottom: '1px solid #e2e8f0',
          overflowX: 'auto',
          gap: '4px'
        }}>
          {[
            { id: 'alltaxilines', label: t.tabAllTaxiLines, icon: '🚏' },
            { id: 'taxifinder', label: t.tabTaxiFinder, icon: '🔍' },
            { id: 'taxiteras', label: t.tabTaxiTeras, icon: '🚕' },
            { id: 'farecalc', label: t.tabFareCalc, icon: '💰' },
            { id: 'slang', label: t.tabSlang, icon: '🗣️' },
            { id: 'traffic', label: t.tabTraffic, icon: '🚦' },
            { id: 'planner', label: t.tabPlanner, icon: '🧭' },
            { id: 'ridehail', label: t.tabRideHail, icon: '📱' },
            { id: 'regional', label: t.tabRegional, icon: '🚌' },
            { id: 'bajaj', label: t.tabBajaj, icon: '🛺' },
            { id: 'tariff', label: t.tabTariff, icon: '📋' },
            { id: 'routes', label: t.tabRoutes, icon: '🚏' },
            { id: 'stops', label: t.tabStops, icon: '📍' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: '6px 10px',
                border: 'none',
                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                color: activeTab === tab.id ? '#0f172a' : '#64748b',
                fontWeight: activeTab === tab.id ? '700' : '500',
                fontSize: '11px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

          {/* ==================== TAB: ALL TAXI LINES (BEGINNING ➔ END) ==================== */}
          {activeTab === 'alltaxilines' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Header Card */}
              <div style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
                border: '1.5px solid #facc15',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#713f12', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🚏</span>
                    <span>{t.allTaxiLinesTitle}</span>
                  </h3>
                  <span style={{ fontSize: '11px', background: '#eab308', color: '#000000', fontWeight: '800', padding: '2px 8px', borderRadius: '12px' }}>
                    {filteredTaxiLines.length} {t.routesFound}
                  </span>
                </div>
                <p style={{ margin: '0 0 12px', fontSize: '11.5px', color: '#854d0e', lineHeight: '1.4' }}>
                  {lang === 'am'
                    ? 'በአዲስ አበባ የሚገኙ ሁሉንም የታክሲ ተራዎች መነሻና መድረሻ፣ ታሪፍ፣ የጉዞ ጊዜና የወያላ ጥሪ ይመልከቱ።'
                    : 'Every direct minibus taxi line in Addis Ababa with origin station, arrival destination, official tariff, and conductor shouts.'}
                </p>

                {/* Instant Search Bar */}
                <input
                  type="text"
                  placeholder={t.searchOriginOrDest}
                  value={taxiLineQuery}
                  onChange={e => setTaxiLineQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '9px',
                    border: '1.5px solid #eab308',
                    background: '#ffffff',
                    fontSize: '12.5px',
                    color: '#0f172a',
                    fontWeight: '600',
                    outline: 'none',
                    marginBottom: '10px'
                  }}
                />

                {/* Origin Hub Quick Filter Pills */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', color: '#713f12', marginBottom: '4px' }}>
                    🟢 {t.beginning}:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxHeight: '82px', overflowY: 'auto' }}>
                    <button
                      onClick={() => setOriginFilter('all')}
                      style={{
                        padding: '3px 8px',
                        background: originFilter === 'all' ? '#713f12' : '#ffffff',
                        color: originFilter === 'all' ? '#ffffff' : '#713f12',
                        border: '1px solid #facc15',
                        borderRadius: '6px',
                        fontSize: '10.5px',
                        fontWeight: originFilter === 'all' ? '800' : '500',
                        cursor: 'pointer'
                      }}
                    >
                      All Teras ({allTaxiLines.length})
                    </button>
                    {taxiTeras.map(tera => (
                      <button
                        key={tera.id}
                        onClick={() => setOriginFilter(tera.id)}
                        style={{
                          padding: '3px 8px',
                          background: originFilter === tera.id ? '#713f12' : '#ffffff',
                          color: originFilter === tera.id ? '#ffffff' : '#713f12',
                          border: '1px solid #facc15',
                          borderRadius: '6px',
                          fontSize: '10.5px',
                          fontWeight: originFilter === tera.id ? '800' : '500',
                          cursor: 'pointer'
                        }}
                      >
                        {lang === 'am' ? tera.name_am.replace(' ታክሲ ተራ', '').replace(' ታክሲ ማቆሚያ', '') : tera.name_en.replace(' Taxi Tera', '').replace(' Taxi Stand', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fare Filter Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#713f12' }}>💰 Tariff:</span>
                  {[
                    { id: 'all', label: t.allFares },
                    { id: 'under10', label: '≤ 10 ETB' },
                    { id: '10to15', label: '11 - 15 ETB' },
                    { id: 'over15', label: '> 15 ETB' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFareFilter(f.id)}
                      style={{
                        padding: '3px 7px',
                        background: fareFilter === f.id ? '#15803d' : '#ffffff',
                        color: fareFilter === f.id ? '#ffffff' : '#15803d',
                        border: '1px solid #86efac',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: fareFilter === f.id ? '800' : '600',
                        cursor: 'pointer'
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* List of Beginning ➔ End Routes */}
              {filteredTaxiLines.length === 0 ? (
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                  No taxi routes matched your filter. Try clearing the search or choosing "All Teras".
                </div>
              ) : (
                filteredTaxiLines.map(line => {
                  const isLineSelected = selectedTaxiLine && selectedTaxiLine.id === line.id;
                  return (
                    <div
                      key={line.id}
                      style={{
                        background: '#ffffff',
                        border: isLineSelected ? '2px solid #2563eb' : '1.5px solid #fde047',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        boxShadow: isLineSelected ? '0 4px 16px rgba(37,99,235,0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Beginning ➔ End Main Line */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ color: '#16a34a', fontWeight: '800', fontSize: '13px' }}>
                            🟢 {lang === 'am' ? line.origin_am.replace(' ታክሲ ተራ', '').replace(' ታክሲ ማቆሚያ', '') : line.origin_en.replace(' Taxi Tera', '').replace(' Taxi Stand', '')}
                          </span>
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>➔</span>
                          <span style={{ color: '#dc2626', fontWeight: '800', fontSize: '13px' }}>
                            🔴 {lang === 'am' && line.dest_am ? line.dest_am : line.dest_en}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 7px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '800' }}>
                            {line.fare_etb} ETB
                          </span>
                          <span style={{ color: '#64748b', fontSize: '10px', background: '#f1f5f9', padding: '2px 5px', borderRadius: '4px' }}>
                            ~{line.duration_mins}m
                          </span>
                        </div>
                      </div>

                      {/* Origin Details */}
                      <div style={{ fontSize: '11px', color: '#334155', marginBottom: '6px' }}>
                        📍 <strong>{t.whereToGet}</strong> {lang === 'am' ? line.origin_location_am : line.origin_location_en} <span style={{ color: '#854d0e', fontWeight: '600' }}>({line.origin_subcity})</span>
                      </div>

                      {/* Conductor Shout */}
                      {line.weyala_shout && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: '#fefce8',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          marginBottom: '8px',
                          borderLeft: '3px solid #eab308'
                        }}>
                          <span style={{ fontSize: '10.5px', color: '#713f12', fontWeight: '600' }}>
                            🗣️ <em>"{line.weyala_shout}"</em>
                          </span>
                          <button
                            onClick={() => playWeyalaAudio(line.weyala_shout)}
                            style={{
                              border: 'none',
                              background: '#fef08a',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer',
                              fontWeight: '700'
                            }}
                          >
                            🔊 Shout
                          </button>
                        </div>
                      )}

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleSelectTaxiLine(line)}
                          style={{
                            flex: 1,
                            padding: '7px',
                            background: isLineSelected ? '#2563eb' : '#fef08a',
                            border: isLineSelected ? '1px solid #1d4ed8' : '1px solid #facc15',
                            color: isLineSelected ? '#ffffff' : '#713f12',
                            borderRadius: '7px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>🗺️</span>
                          <span>{isLineSelected ? 'Showing on Map' : t.viewOnMap}</span>
                        </button>
                        <button
                          onClick={() => {
                            setWalkingDestination(line.tera);
                            if (!userLocation) handleLocateMe();
                            if (userLocation) {
                              setRouteBounds([
                                [userLocation.lat, userLocation.lng],
                                [line.origin_lat, line.origin_lng]
                              ]);
                            }
                          }}
                          style={{
                            flex: 1,
                            padding: '7px',
                            background: '#f0fdf4',
                            border: '1px solid #86efac',
                            color: '#166534',
                            borderRadius: '7px',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>🚶</span>
                          <span>{t.walkToTera}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ==================== TAB: FIND TAXI PLACE ==================== */}
          {activeTab === 'taxifinder' && (
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
                border: '1.5px solid #facc15',
                borderRadius: '14px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <h3 style={{ margin: '0 0 4px', fontSize: '14.5px', fontWeight: '800', color: '#713f12' }}>
                  🚕 {t.whereDoYouWantToGo}
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: '11.5px', color: '#854d0e' }}>
                  {t.findTaxiPlacePrompt}
                </p>

                <input
                  type="text"
                  placeholder="e.g. Bole / ቦሌ, Piazza / ፒያሳ, Mexico / ሜክሲኮ, Saris..."
                  value={taxiDestinationQuery}
                  onChange={e => setTaxiDestinationQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '9px',
                    border: '1.5px solid #eab308',
                    background: '#ffffff',
                    fontSize: '13px',
                    color: '#0f172a',
                    fontWeight: '600',
                    outline: 'none',
                    marginBottom: '10px'
                  }}
                />

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {[
                    { en: 'Bole', am: 'ቦሌ' },
                    { en: 'Piazza', am: 'ፒያሳ' },
                    { en: 'Mexico', am: 'ሜክሲኮ' },
                    { en: 'Mercato', am: 'መርካቶ' },
                    { en: 'Saris', am: 'ሳሪስ' },
                    { en: 'Jomo', am: 'ጆሞ' },
                    { en: 'Kality', am: 'ቃሊቲ' },
                    { en: 'Tor Hailoch', am: 'ጦር ኃይሎች' },
                    { en: 'Ayat', am: 'አያት' },
                    { en: 'Arat Kilo', am: 'አራት ኪሎ' },
                    { en: 'Shiro Meda', am: 'ሽሮ ሜዳ' },
                    { en: 'Kera', am: 'ቄራ' }
                  ].map(dest => {
                    const label = lang === 'am' ? dest.am : `${dest.en} (${dest.am})`;
                    const isSelected = taxiDestinationQuery.toLowerCase() === dest.en.toLowerCase() || taxiDestinationQuery.includes(dest.am);
                    return (
                      <button
                        key={dest.en}
                        onClick={() => setTaxiDestinationQuery(lang === 'am' ? dest.am : dest.en)}
                        style={{
                          padding: '4px 8px',
                          background: isSelected ? '#713f12' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#713f12',
                          border: '1px solid #facc15',
                          borderRadius: '6px',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>
                  {t.matchingTerasFor} "<strong>{taxiDestinationQuery}</strong>" ({matchingTeras.length}):
                </div>

                {matchingTeras.length === 0 ? (
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                    {t.noMatchingTeras}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {matchingTeras.map(tera => (
                      <div
                        key={tera.id}
                        style={{
                          background: '#ffffff',
                          border: '1.5px solid #fde047',
                          borderRadius: '12px',
                          padding: '14px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                            {lang === 'am' ? tera.name_am : tera.name_en}
                          </span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {tera.distanceFromUser && (
                              <span style={{ fontSize: '10.5px', color: '#047857', background: '#d1fae5', padding: '2px 5px', borderRadius: '4px', fontWeight: '700' }}>
                                🚶 ~{Math.round((tera.distanceFromUser / 4.5) * 60)} {t.mins} ({tera.distanceFromUser < 1 ? `${Math.round(tera.distanceFromUser * 1000)}m` : `${tera.distanceFromUser.toFixed(1)}km`})
                              </span>
                            )}
                            <span style={{ fontSize: '11px', background: '#fef9c3', color: '#854d0e', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                              {tera.subcity}
                            </span>
                          </div>
                        </div>

                        <div style={{ fontSize: '11.5px', color: '#334155', marginBottom: '8px', lineHeight: '1.4' }}>
                          📍 <strong>{t.whereToGet}</strong> {lang === 'am' ? tera.exact_location_am : tera.exact_location_en}
                        </div>

                        {tera.weyala_shout && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fefce8', padding: '5px 8px', borderRadius: '6px', borderLeft: '3px solid #eab308', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10.5px', color: '#713f12', fontWeight: '600' }}>
                              🗣️ <em>"{tera.weyala_shout}"</em>
                            </span>
                            <button
                              onClick={() => playWeyalaAudio(tera.weyala_shout)}
                              title={t.listenShout}
                              style={{
                                border: 'none',
                                background: '#fef08a',
                                borderRadius: '4px',
                                padding: '3px 6px',
                                fontSize: '10px',
                                cursor: 'pointer',
                                fontWeight: '700'
                              }}
                            >
                              🔊 Shout
                            </button>
                          </div>
                        )}

                        <div style={{ background: '#fafaf9', padding: '8px', borderRadius: '8px', marginBottom: '10px' }}>
                          {tera.relevantDestinations.map((d, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#15803d', marginBottom: '3px' }}>
                              <span>• {lang === 'am' && d.to_am ? d.to_am : d.to}:</span>
                              <span>{d.fare_etb} ETB <small style={{ color: '#78716c' }}>(~{d.duration_mins} mins)</small></span>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setMapCenter([Number(tera.latitude), Number(tera.longitude)]);
                              setMapZoom(16);
                            }}
                            style={{
                              flex: 1,
                              padding: '8px',
                              background: '#fef08a',
                              border: '1px solid #facc15',
                              color: '#713f12',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            🎯 View on Map
                          </button>
                          <button
                            onClick={() => {
                              setWalkingDestination(tera);
                              if (!userLocation) handleLocateMe();
                              if (userLocation) {
                                setRouteBounds([
                                  [userLocation.lat, userLocation.lng],
                                  [Number(tera.latitude), Number(tera.longitude)]
                                ]);
                              }
                            }}
                            style={{
                              flex: 1,
                              padding: '8px',
                              background: '#f0fdf4',
                              border: '1px solid #86efac',
                              color: '#166534',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            🚶 {t.walkPathBtn}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== TAB: FARE CALCULATOR ==================== */}
          {activeTab === 'farecalc' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                  💰 {t.compareTitle}
                </h3>
                <p style={{ margin: '0 0 14px', fontSize: '11.5px', color: '#64748b' }}>
                  Slide to select your trip distance across Addis Ababa:
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={fareKm}
                    onChange={e => setFareKm(Number(e.target.value))}
                    style={{ flex: 1, cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#2563eb', minWidth: '60px', textAlign: 'right' }}>
                    {fareKm} {t.km}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[3, 5, 8, 12, 16, 22].map(k => (
                    <button
                      key={k}
                      onClick={() => setFareKm(k)}
                      style={{
                        padding: '4px 8px',
                        background: fareKm === k ? '#2563eb' : '#ffffff',
                        color: fareKm === k ? '#ffffff' : '#475569',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {k} km
                    </button>
                  ))}
                </div>
              </div>

              {fareComparison && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {fareComparison.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: idx === 0 ? '1.5px solid #16a34a' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a' }}>
                            {item.title}
                          </span>
                          {idx === 0 && (
                            <span style={{ background: '#dcfce7', color: '#166534', fontSize: '9.5px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px' }}>
                              FASTEST & GREEN
                            </span>
                          )}
                          {item.mode === 'anbessa' && (
                            <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '9.5px', fontWeight: '800', padding: '2px 5px', borderRadius: '4px' }}>
                              CHEAPEST
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                          {item.note}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#475569', marginTop: '2px', fontStyle: 'italic' }}>
                          💡 {item.best_for}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '17px', fontWeight: '800', color: '#15803d' }}>
                          {item.fare_etb} ETB
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB: CONDUCTOR VOICE & SLANG ==================== */}
          {activeTab === 'slang' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#fefce8', padding: '14px', borderRadius: '12px', border: '1px solid #facc15' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '800', color: '#713f12' }}>
                  🗣️ {t.slangTitle}
                </h3>
                <p style={{ margin: 0, fontSize: '11.5px', color: '#854d0e', lineHeight: '1.4' }}>
                  Tap the audio button 🔊 to hear real Addis Ababa conductor shouts pronounced aloud!
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {slangList.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
                        {item.phrase_am} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>({item.phrase_en})</span>
                      </span>
                      <button
                        onClick={() => playWeyalaAudio(item.audio_text || item.phrase_am)}
                        style={{
                          background: '#fef08a',
                          border: '1px solid #facc15',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        🔊 Listen
                      </button>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#166534', marginBottom: '4px' }}>
                      🇬🇧 "{item.translation_en}"
                    </div>

                    <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                      {item.usage_context}
                    </div>
                  </div>
                ))}
              </div>

              {/* Passenger Etiquette Guide */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                  📜 Addis Passenger Etiquette Tips
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', color: '#475569', lineHeight: '1.6' }}>
                  <li><strong>Passing Money:</strong> Pass your fare forward through passengers ahead of you. Say <em>"ይሄው ሂሳብ"</em> (Yihew hisab).</li>
                  <li><strong>Front Seat Duty:</strong> If sitting next to driver, you are expected to assist in collecting fares.</li>
                  <li><strong>Prepare Change:</strong> Avoid giving 100 or 200 ETB banknotes for a 7 ETB short trip.</li>
                  <li><strong>Requesting Drop-off:</strong> Shout <em>"ወራጅ አለ!"</em> ~50 meters before your intended corner.</li>
                </ul>
              </div>
            </div>
          )}

          {/* ==================== TAB: TRAFFIC & RUSH HOURS ==================== */}
          {activeTab === 'traffic' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {trafficInfo && (
                <div style={{
                  background: trafficInfo.is_peak_hours ? '#fef2f2' : '#f0fdf4',
                  border: `1.5px solid ${trafficInfo.is_peak_hours ? '#f87171' : '#4ade80'}`,
                  borderRadius: '12px',
                  padding: '14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: trafficInfo.is_peak_hours ? '#991b1b' : '#166534' }}>
                      🚦 {trafficInfo.peak_status}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>
                      Addis Time: ~{trafficInfo.eat_time_hours}:00 EAT
                    </span>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '11.5px', color: trafficInfo.is_peak_hours ? '#b91c1c' : '#15803d' }}>
                    {trafficInfo.is_peak_hours
                      ? 'Expect higher queues at taxi teras and longer journey times across main corridors.'
                      : 'Traffic flow is steady. Good time to travel with minimal queues.'}
                  </p>
                </div>
              )}

              <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '14px' }}>
                <h4 style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                  ⚠️ Addis Bottlenecks & Advice
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {trafficInfo && trafficInfo.hotspots && trafficInfo.hotspots.map((hs, i) => (
                    <div key={i} style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <strong style={{ fontSize: '12px', color: '#0f172a' }}>{hs.area}</strong>
                        <span style={{ fontSize: '10.5px', fontWeight: '700', color: hs.level.includes('Heavy') ? '#dc2626' : '#d97706' }}>
                          {hs.level}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#475569' }}>
                        💡 {hs.advice}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corridor Development Note */}
              <div style={{ background: '#eff6ff', padding: '12px 14px', borderRadius: '12px', border: '1px solid #bfdbfe', fontSize: '11.5px', color: '#1e40af', lineHeight: '1.5' }}>
                🏗️ <strong>Corridor Development (የኮሪደር ልማት):</strong> Addis Ababa's wide new pedestrian sidewalks and designated smart bus shelters from Piazza to Mexico and Bole make walking between interchanges much faster and safer!
              </div>
            </div>
          )}

          {/* ==================== TAB: TARIFFS & INFO ==================== */}
          {activeTab === 'tariff' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '13.5px', fontWeight: '800', color: '#0f172a' }}>
                  📋 {t.tariffTitle}
                </h3>
                <div style={{ fontSize: '11.5px', color: '#475569', lineHeight: '1.5' }}>
                  Regulated tariffs set by the Addis Ababa City Transport Bureau for white & blue minibus taxis:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px', background: '#ffffff', borderRadius: '6px' }}>
                    <span>Distance: <strong>1 - 4 km</strong></span>
                    <strong style={{ color: '#16a34a' }}>5.00 - 7.00 ETB</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px', background: '#ffffff', borderRadius: '6px' }}>
                    <span>Distance: <strong>5 - 8 km</strong></span>
                    <strong style={{ color: '#16a34a' }}>10.00 - 12.00 ETB</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px', background: '#ffffff', borderRadius: '6px' }}>
                    <span>Distance: <strong>9 - 12 km</strong></span>
                    <strong style={{ color: '#16a34a' }}>15.00 ETB</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px', background: '#ffffff', borderRadius: '6px' }}>
                    <span>Distance: <strong>13+ km</strong></span>
                    <strong style={{ color: '#16a34a' }}>18.00 - 25.00 ETB</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px', background: '#ffffff', borderRadius: '6px' }}>
                    <span>Light Rail (LRT): <strong>Any zone</strong></span>
                    <strong style={{ color: '#2563eb' }}>10.00 ETB</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px', background: '#ffffff', borderRadius: '6px' }}>
                    <span>Night Tariff (After 22:00):</span>
                    <strong style={{ color: '#d97706' }}>+20% Standard</strong>
                  </div>
                </div>
              </div>

              {/* Emergency Hotlines */}
              <div style={{ background: '#fef2f2', padding: '14px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '13.5px', fontWeight: '800', color: '#991b1b' }}>
                  🚨 {t.emergencyHotlines}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <a href="tel:945" style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: '#0f172a', background: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                    <span>👮 Traffic Police Addis:</span>
                    <strong style={{ color: '#dc2626' }}>945 (Free)</strong>
                  </a>
                  <a href="tel:907" style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: '#0f172a', background: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                    <span>🚑 Red Cross Ambulance:</span>
                    <strong style={{ color: '#dc2626' }}>907</strong>
                  </a>
                  <a href="tel:991" style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: '#0f172a', background: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                    <span>🚨 Federal Police:</span>
                    <strong style={{ color: '#dc2626' }}>991</strong>
                  </a>
                  <a href="tel:9088" style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: '#0f172a', background: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '12px' }}>
                    <span>📢 Overcharging Complaints:</span>
                    <strong style={{ color: '#2563eb' }}>9088 (Transport Bureau)</strong>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: ALL TAXI TERAS ==================== */}
          {activeTab === 'taxiteras' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Subcity filter pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '4px' }}>
                {['all', 'Kirkos', 'Yeka', 'Arada', 'Bole', 'Addis Ketema', 'Lideta', 'Nifas Silk', 'Akaki Kality', 'Gullele', 'Kolfe Keranio'].map(sc => (
                  <button
                    key={sc}
                    onClick={() => setSelectedSubcityFilter(sc)}
                    style={{
                      padding: '3px 7px',
                      background: selectedSubcityFilter === sc ? '#0f172a' : '#f1f5f9',
                      color: selectedSubcityFilter === sc ? '#ffffff' : '#475569',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '10.5px',
                      fontWeight: selectedSubcityFilter === sc ? '700' : '500',
                      cursor: 'pointer'
                    }}
                  >
                    {sc === 'all' ? 'All Subcities' : sc}
                  </button>
                ))}
              </div>

              {taxiTeras.filter(tera => selectedSubcityFilter === 'all' || tera.subcity.toLowerCase() === selectedSubcityFilter.toLowerCase()).map(tera => (
                <div
                  key={tera.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #fde047',
                    borderRadius: '12px',
                    padding: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                      {lang === 'am' ? tera.name_am : tera.name_en}
                    </span>
                    <span style={{ fontSize: '10.5px', background: '#fef9c3', color: '#854d0e', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                      {tera.subcity}
                    </span>
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#334155', marginBottom: '6px' }}>
                    📍 <strong>{t.whereToGet}</strong> {lang === 'am' ? tera.exact_location_am : tera.exact_location_en}
                  </div>

                  {tera.weyala_shout && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fefce8', padding: '4px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10.5px', color: '#713f12' }}>🗣️ <em>"{tera.weyala_shout}"</em></span>
                      <button onClick={() => playWeyalaAudio(tera.weyala_shout)} style={{ border: 'none', background: '#fef08a', padding: '2px 5px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>🔊</button>
                    </div>
                  )}

                  <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '8px', marginBottom: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#475569', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>🚏 Lines from here (Beginning ➔ End):</span>
                      <span>Fare & Time</span>
                    </div>
                    {tera.destinations.map((d, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', padding: '4px 0', borderBottom: i < tera.destinations.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                          <span style={{ color: '#16a34a', fontWeight: '700' }}>🟢 {lang === 'am' ? tera.name_am.replace(' ታክሲ ተራ', '').replace(' ታክሲ ማቆሚያ', '') : tera.name_en.replace(' Taxi Tera', '').replace(' Taxi Stand', '')}</span>
                          <span style={{ color: '#94a3b8' }}>➔</span>
                          <span style={{ color: '#dc2626', fontWeight: '700' }}>🔴 {lang === 'am' && d.to_am ? d.to_am : d.to}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <strong style={{ color: '#15803d' }}>{d.fare_etb} ETB</strong>
                          <span style={{ color: '#64748b', fontSize: '10px' }}>(~{d.duration_mins}m)</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const lineItem = allTaxiLines.find(l => l.tera.id === tera.id && l.dest_en === d.to);
                              if (lineItem) handleSelectTaxiLine(lineItem);
                            }}
                            style={{
                              border: '1px solid #facc15',
                              background: '#fef9c3',
                              color: '#854d0e',
                              borderRadius: '4px',
                              padding: '2px 5px',
                              fontSize: '9.5px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                            title="Trace Beginning ➔ End on map"
                          >
                            🗺️ Trace
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => {
                        setMapCenter([Number(tera.latitude), Number(tera.longitude)]);
                        setMapZoom(16);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px',
                        background: '#fef08a',
                        border: '1px solid #facc15',
                        color: '#713f12',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      🎯 View on Map
                    </button>
                    <button
                      onClick={() => {
                        setWalkingDestination(tera);
                        if (!userLocation) handleLocateMe();
                      }}
                      style={{
                        flex: 1,
                        padding: '6px',
                        background: '#f0fdf4',
                        border: '1px solid #86efac',
                        color: '#166534',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      🚶 {t.walkPathBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ==================== TAB: CALL TAXIS & APPS ==================== */}
          {activeTab === 'ridehail' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {taxiServices.map(srv => (
                <div
                  key={srv.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '14px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                      {srv.name}
                    </span>
                    <span style={{
                      padding: '2px 7px',
                      borderRadius: '6px',
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '10.5px',
                      fontWeight: '700'
                    }}>
                      {srv.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#64748b', marginBottom: '6px' }}>
                    {srv.type} • {srv.availability}
                  </div>

                  <div style={{ fontSize: '11px', color: '#0f172a', background: '#f8fafc', padding: '8px', borderRadius: '8px', marginBottom: '10px' }}>
                    💰 <strong>Rates:</strong> {srv.rates_info}
                    <br />
                    📍 <strong>How to book:</strong> {srv.how_to_get}
                  </div>

                  {srv.shortcode && srv.shortcode !== 'App only' && srv.shortcode !== 'Terminal Desk' && srv.shortcode !== 'Street Hail' && (
                    <a
                      href={`tel:${srv.shortcode}`}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '8px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textDecoration: 'none'
                      }}
                    >
                      📞 {t.callNow} ({srv.shortcode})
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ==================== TAB: REGIONAL BUS TERMINALS ==================== */}
          {activeTab === 'regional' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {regionalTerminals.map(reg => (
                <div
                  key={reg.id}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e879f9',
                    borderRadius: '12px',
                    padding: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                      {lang === 'am' ? reg.name_am : reg.name_en}
                    </span>
                    <span style={{ fontSize: '10px', background: '#fae8ff', color: '#86198f', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                      {reg.subcity}
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#86198f', fontWeight: '700', marginBottom: '6px' }}>
                    🧭 {reg.corridor_served}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#334155', marginBottom: '6px' }}>
                    📍 <strong>Where:</strong> {lang === 'am' ? reg.exact_location_am : reg.exact_location_en}
                  </div>

                  <div style={{ fontSize: '11px', color: '#475569', background: '#faf5ff', padding: '8px', borderRadius: '8px', marginBottom: '8px' }}>
                    🏙️ <strong>Destinations:</strong> {reg.destinations.join(', ')}
                    <br />
                    🚌 <strong>Operators:</strong> {reg.bus_companies ? reg.bus_companies.join(', ') : 'All Level 1 Buses'}
                    <br />
                    ⏰ <strong>Departure:</strong> {reg.operating_hours}
                  </div>

                  <button
                    onClick={() => {
                      setMapCenter([Number(reg.latitude), Number(reg.longitude)]);
                      setMapZoom(16);
                    }}
                    style={{
                      width: '100%',
                      padding: '6px',
                      background: '#fdf4ff',
                      border: '1px solid #f0abfc',
                      color: '#a21caf',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    🎯 View Terminal on Map
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ==================== TAB: FEEDER BAJAJ ==================== */}
          {activeTab === 'bajaj' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {feederBajaj.map(bj => (
                <div
                  key={bj.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #fed7aa',
                    borderRadius: '12px',
                    padding: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a' }}>
                      🛺 {lang === 'am' ? bj.zone_name_am : bj.zone_name_en}
                    </span>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#ea580c' }}>
                      {bj.tariff_etb}
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#7c2d12', fontWeight: '600', marginBottom: '4px' }}>
                    Feeds into: <strong>{bj.feed_to}</strong>
                  </div>

                  <div style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4' }}>
                    {bj.rules_en}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ==================== TAB: TRIP PLANNER ==================== */}
          {activeTab === 'planner' && (
            <div>
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                    🧭 {t.plannerTitle}
                  </span>
                  {(originId || destId || journeyPlan) && (
                    <button
                      onClick={handleClearRoute}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '11px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      {t.clearRouteBtn}
                    </button>
                  )}
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>
                    🟢 {t.originLabel}
                  </label>
                  <select
                    value={originId}
                    onChange={e => setOriginId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '12.5px',
                      color: '#0f172a',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">{t.selectOrigin}</option>
                    {stops.map(s => (
                      <option key={s.id} value={s.id}>{getStopName(s)} ({s.name_en})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '-4px 0 6px' }}>
                  <button
                    onClick={handleSwap}
                    title={t.swapBtn}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ⇅
                  </button>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>
                    🔴 {t.destLabel}
                  </label>
                  <select
                    value={destId}
                    onChange={e => setDestId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '9px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      fontSize: '12.5px',
                      color: '#0f172a',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">{t.selectDest}</option>
                    {stops.map(s => (
                      <option key={s.id} value={s.id}>{getStopName(s)} ({s.name_en})</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleFindRoute}
                  disabled={!originId || !destId}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '9px',
                    border: 'none',
                    background: (!originId || !destId) ? '#94a3b8' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: (!originId || !destId) ? 'not-allowed' : 'pointer'
                  }}
                >
                  🔍 {t.findRouteBtn}
                </button>
              </div>

              {journeyPlan && (
                <div style={{
                  background: journeyPlan === 'not_found' ? '#fef2f2' : '#f0fdf4',
                  border: `1px solid ${journeyPlan === 'not_found' ? '#fecaca' : '#bbf7d0'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '16px'
                }}>
                  {journeyPlan === 'not_found' ? (
                    <div style={{ color: '#991b1b', fontSize: '12.5px', textAlign: 'center' }}>
                      ⚠️ {t.noRouteFound}
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: journeyPlan.transfers === 0 ? '#16a34a' : '#d97706',
                          color: '#ffffff',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {journeyPlan.transfers === 0 ? `✓ ${t.directJourney}` : `🔄 ${journeyPlan.transfers} ${t.transfers}`}
                        </span>
                        <span style={{ fontSize: '17px', fontWeight: '800', color: '#166534' }}>
                          {Number(journeyPlan.totalFare).toFixed(2)} {t.etb}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', background: '#ffffff', padding: '10px', borderRadius: '10px', border: '1px solid #dcfce7', marginBottom: '14px' }}>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>{t.estTime}</div>
                          <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>~{journeyPlan.totalMinutes} {t.mins}</div>
                        </div>
                        <div style={{ width: '1px', background: '#e2e8f0' }} />
                        <div style={{ flex: 1, textAlign: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>{t.distance}</div>
                          <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>{journeyPlan.totalDistanceKm} {t.km}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {journeyPlan.legs.map((leg, index) => (
                          <div key={index} style={{
                            background: '#ffffff',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                              <span style={{
                                fontSize: '11px',
                                fontWeight: '700',
                                color: modeInfo[leg.mode]?.color || '#2563eb'
                              }}>
                                {modeInfo[leg.mode]?.icon} {leg.route.route_code || modeInfo[leg.mode]?.label}
                              </span>
                              <span style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>
                                {leg.fare.toFixed(2)} {t.etb} • ~{leg.minutes} {t.mins}
                              </span>
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: '#0f172a' }}>
                              {getRouteTitle(leg.route)}
                            </div>
                            {index === 0 && journeyPlan.transfers > 0 && journeyPlan.transferStop && (
                              <div style={{
                                marginTop: '8px',
                                paddingTop: '8px',
                                borderTop: '1px dashed #cbd5e1',
                                fontSize: '11px',
                                color: '#b45309',
                                fontWeight: '600'
                              }}>
                                🔄 {t.transferAt}: <strong>{getStopName(journeyPlan.transferStop)}</strong>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB: TRANSIT LINES ==================== */}
          {activeTab === 'routes' && (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                {[
                  { id: 'all', label: t.allModes, icon: '🌟' },
                  { id: 'lrt', label: t.lrtMode, icon: '🚊' },
                  { id: 'minibus', label: t.minibusMode, icon: '🚐' },
                  { id: 'anbessa', label: t.anbessaMode, icon: '🚌' },
                  { id: 'sheger', label: t.shegerMode, icon: '🚍' },
                  { id: 'higer', label: t.higerMode, icon: '🚐' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setActiveMode(mode.id);
                      setSelectedRoute(null);
                    }}
                    style={{
                      border: '1px solid',
                      borderColor: activeMode === mode.id ? '#2563eb' : '#e2e8f0',
                      background: activeMode === mode.id ? '#eff6ff' : '#ffffff',
                      color: activeMode === mode.id ? '#1d4ed8' : '#475569',
                      fontWeight: activeMode === mode.id ? '700' : '500',
                      padding: '5px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{mode.icon}</span> {mode.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredRoutes.map(route => {
                  const isSelected = selectedRoute && selectedRoute.id === route.id;
                  return (
                    <div
                      key={route.id}
                      onClick={() => {
                        setSelectedRoute(route);
                        if (route.path_coordinates && route.path_coordinates.length > 0) {
                          setRouteBounds(route.path_coordinates);
                        }
                      }}
                      style={{
                        padding: '12px',
                        background: isSelected ? '#eff6ff' : '#ffffff',
                        border: `1.5px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '2px 7px',
                          borderRadius: '6px',
                          background: route.color_hex || '#2563eb',
                          color: '#ffffff',
                          fontSize: '10.5px',
                          fontWeight: '700'
                        }}>
                          {modeInfo[route.transport_type]?.icon} {route.route_code || modeInfo[route.transport_type]?.label}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#166534' }}>
                          {Number(route.fare_etb).toFixed(2)} {t.etb}
                        </span>
                      </div>

                      <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>
                        {getRouteTitle(route)}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                        <span>⏱️ ~{route.estimated_mins} {t.mins} ({route.distance_km} {t.km})</span>
                        <span>🔄 {t.frequency} {route.frequency_mins} {t.mins}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== TAB: STATIONS ==================== */}
          {activeTab === 'stops' && (
            <div>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '9px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12.5px',
                  marginBottom: '12px',
                  outline: 'none'
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {stops.filter(s => !searchQuery || s.name_en.toLowerCase().includes(searchQuery.toLowerCase()) || (s.name_am && s.name_am.includes(searchQuery))).map(stop => {
                  const isOrigin = parseInt(originId, 10) === stop.id;
                  const isDest = parseInt(destId, 10) === stop.id;
                  return (
                    <div
                      key={stop.id}
                      onClick={() => {
                        setMapCenter([Number(stop.latitude), Number(stop.longitude)]);
                        setMapZoom(15);
                      }}
                      style={{
                        padding: '10px 12px',
                        background: isOrigin ? '#ecfdf5' : isDest ? '#fef2f2' : '#ffffff',
                        border: `1px solid ${isOrigin ? '#10b981' : isDest ? '#ef4444' : '#e2e8f0'}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                          {getStopName(stop)}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          {stop.name_en} • <span style={{ color: '#2563eb', fontWeight: '500' }}>{stop.subcity}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOriginId(String(stop.id));
                            setActiveTab('planner');
                          }}
                          title={t.setAsOrigin}
                          style={{
                            border: '1px solid #bbf7d0',
                            background: '#f0fdf4',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            fontSize: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          🟢
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDestId(String(stop.id));
                            setActiveTab('planner');
                          }}
                          title={t.setAsDest}
                          style={{
                            border: '1px solid #fecaca',
                            background: '#fef2f2',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            fontSize: '10px',
                            cursor: 'pointer'
                          }}
                        >
                          🔴
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{ padding: '10px 16px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '11px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
          <span>PostGIS + Leaflet + All Addis Taxis</span>
          <span>Addis Ababa, ET 🇪🇹</span>
        </div>
      </div>

      {/* ==================================================== */}
      {/* Interactive Map Canvas                               */}
      {/* ==================================================== */}
      <div style={{ flex: 1, position: 'relative', height: '100%' }}>

        {/* Floating Menu Button when sidebar is closed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 1000,
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 15px',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>☰</span>
            <span>{t.openSidebar}</span>
          </button>
        )}

        {/* Floating Controls Bar */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center',
          maxWidth: 'calc(100% - 100px)',
          justifyContent: 'flex-end'
        }}>
          {/* Full Map / Show Menu */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#0f172a',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>{isSidebarOpen ? '⛶' : '◀'}</span>
            <span>{isSidebarOpen ? t.fullMap : t.showMenu}</span>
          </button>

          {/* Clear Map */}
          <button
            onClick={handleClearMap}
            title="Clear all active routes, lines & selections"
            style={{
              background: '#ffffff',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#dc2626',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>🧹</span>
            <span>{t.clearMap}</span>
          </button>

          {/* Addis Full View */}
          <button
            onClick={handleFitAddisCity}
            title="Fit complete Addis Ababa metropolitan area"
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '700',
              color: '#0f172a',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>🌍</span>
            <span>{t.fitCity}</span>
          </button>

          {/* Layer Toggles Group */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', marginRight: '2px' }}>Layers:</span>
            {[
              { key: 'taxi', label: '🚕 Taxi', active: showTaxiLayer, toggle: () => setShowTaxiLayer(!showTaxiLayer) },
              { key: 'lrt', label: '🚊 LRT', active: showLrtLayer, toggle: () => setShowLrtLayer(!showLrtLayer) },
              { key: 'bus', label: '🚌 Bus', active: showBusLayer, toggle: () => setShowBusLayer(!showBusLayer) },
              { key: 'regional', label: '🏢 Reg', active: showRegionalLayer, toggle: () => setShowRegionalLayer(!showRegionalLayer) },
              { key: 'labels', label: '🏷️ Names', active: showStationLabels, toggle: () => setShowStationLabels(!showStationLabels) }
            ].map(layer => (
              <button
                key={layer.key}
                onClick={layer.toggle}
                style={{
                  border: 'none',
                  padding: '4px 7px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: layer.active ? '700' : '500',
                  background: layer.active ? '#0f172a' : '#f1f5f9',
                  color: layer.active ? '#ffffff' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {layer.label}
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '2px',
            display: 'flex',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
          }}>
            {[
              { id: 'standard', label: '🗺️ Map' },
              { id: 'light', label: '☀️ Light' },
              { id: 'dark', label: '🌙 Dark' }
            ].map(style => (
              <button
                key={style.id}
                onClick={() => setMapStyle(style.id)}
                style={{
                  border: 'none',
                  padding: '6px 9px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: mapStyle === style.id ? '700' : '500',
                  background: mapStyle === style.id ? '#0f172a' : 'transparent',
                  color: mapStyle === style.id ? '#ffffff' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Active Beginning ➔ End Taxi Card */}
        {selectedTaxiLine && (
          <div style={{
            position: 'absolute',
            top: '74px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(8px)',
            border: '2px solid #eab308',
            borderRadius: '14px',
            padding: '10px 16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            maxWidth: '92%',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px' }}>🚕</span>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#16a34a' }}>🟢 {lang === 'am' ? selectedTaxiLine.origin_am : selectedTaxiLine.origin_en}</span>
                  <span>➔</span>
                  <span style={{ color: '#dc2626' }}>🔴 {lang === 'am' && selectedTaxiLine.dest_am ? selectedTaxiLine.dest_am : selectedTaxiLine.dest_en}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  📍 {lang === 'am' ? selectedTaxiLine.origin_location_am : selectedTaxiLine.origin_location_en} ({selectedTaxiLine.origin_subcity})
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderLeft: '1px solid #e2e8f0', paddingLeft: '12px' }}>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>
                {selectedTaxiLine.fare_etb} ETB
              </span>
              <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' }}>
                ~{selectedTaxiLine.duration_mins} mins
              </span>
              {selectedTaxiLine.weyala_shout && (
                <button
                  onClick={() => playWeyalaAudio(selectedTaxiLine.weyala_shout)}
                  style={{
                    border: 'none',
                    background: '#fef08a',
                    color: '#713f12',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  title={selectedTaxiLine.weyala_shout}
                >
                  🔊 Shout
                </button>
              )}
              <button
                onClick={() => {
                  setWalkingDestination(selectedTaxiLine.tera);
                  if (!userLocation) handleLocateMe();
                }}
                style={{
                  border: '1px solid #86efac',
                  background: '#f0fdf4',
                  color: '#166534',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🚶 Walk
              </button>
              <button
                onClick={() => setSelectedTaxiLine(null)}
                style={{
                  border: 'none',
                  background: '#fee2e2',
                  color: '#991b1b',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Leaflet Map */}
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <MapController center={mapCenter} zoom={mapZoom} bounds={routeBounds} />

          <TileLayer
            url={tileLayers[mapStyle].url}
            attribution={tileLayers[mapStyle].attribution}
          />

          {/* Active Beginning ➔ End Minibus Route Line */}
          {selectedTaxiLine && selectedTaxiLine.destCoord && (
            <>
              <Polyline
                positions={[
                  [selectedTaxiLine.origin_lat, selectedTaxiLine.origin_lng],
                  selectedTaxiLine.destCoord
                ]}
                pathOptions={{
                  color: '#eab308',
                  weight: 6,
                  dashArray: '10, 8',
                  opacity: 0.95
                }}
              />
              {/* Highlight Origin Marker */}
              <Marker
                position={[selectedTaxiLine.origin_lat, selectedTaxiLine.origin_lng]}
                icon={createCustomIcon('terminal', true, true, false, false, true, false, false)}
              >
                <Popup>
                  <div style={{ padding: '6px', minWidth: '180px' }}>
                    <div style={{ color: '#16a34a', fontWeight: '800', fontSize: '13px' }}>
                      🟢 {lang === 'am' ? selectedTaxiLine.origin_am : selectedTaxiLine.origin_en} (Beginning)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      {lang === 'am' ? selectedTaxiLine.origin_location_am : selectedTaxiLine.origin_location_en}
                    </div>
                  </div>
                </Popup>
                <Tooltip permanent={true} direction="top">
                  <span style={{ fontWeight: '800', color: '#16a34a' }}>
                    🟢 {lang === 'am' ? selectedTaxiLine.origin_am.replace(' ታክሲ ተራ', '').replace(' ታክሲ ማቆሚያ', '') : selectedTaxiLine.origin_en.replace(' Taxi Tera', '').replace(' Taxi Stand', '')}
                  </span>
                </Tooltip>
              </Marker>
              {/* Highlight Destination Marker */}
              <Marker
                position={selectedTaxiLine.destCoord}
                icon={createCustomIcon('terminal', true, false, true, false, false, false, false)}
              >
                <Popup>
                  <div style={{ padding: '6px', minWidth: '180px' }}>
                    <div style={{ color: '#dc2626', fontWeight: '800', fontSize: '13px' }}>
                      🔴 {lang === 'am' && selectedTaxiLine.dest_am ? selectedTaxiLine.dest_am : selectedTaxiLine.dest_en} (End)
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Fare: {selectedTaxiLine.fare_etb} ETB • Est: ~{selectedTaxiLine.duration_mins} mins
                    </div>
                  </div>
                </Popup>
                <Tooltip permanent={true} direction="top">
                  <span style={{ fontWeight: '800', color: '#dc2626' }}>
                    🔴 {lang === 'am' && selectedTaxiLine.dest_am ? selectedTaxiLine.dest_am : selectedTaxiLine.dest_en}
                  </span>
                </Tooltip>
              </Marker>
            </>
          )}

          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={createCustomIcon('terminal', true, false, false, false, false, false, true)}
            >
              <Popup>
                <div style={{ padding: '4px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#2563eb' }}>📍 {t.yourLocation}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>GPS / Selected Center</div>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Walking Path Polyline */}
          {walkingDestination && userLocation && (
            <Polyline
              positions={[
                [userLocation.lat, userLocation.lng],
                [Number(walkingDestination.latitude), Number(walkingDestination.longitude)]
              ]}
              pathOptions={{
                color: '#8b5cf6',
                weight: 4,
                dashArray: '6, 8'
              }}
            />
          )}

          {/* Render Route Polylines */}
          {filteredRoutes.map(route => {
            const isLrt = route.transport_type === 'lrt';
            const isBus = ['anbessa', 'sheger', 'higer'].includes(route.transport_type);
            if (isLrt && !showLrtLayer) return null;
            if (isBus && !showBusLayer) return null;

            const isSelected = selectedRoute && selectedRoute.id === route.id;
            const lineColor = isSelected ? '#ef4444' : (route.color_hex || '#2563eb');
            const lineWeight = isSelected ? 6 : 4;
            const lineOpacity = selectedRoute ? (isSelected ? 1.0 : 0.2) : 0.8;

            if (!route.path_coordinates || route.path_coordinates.length === 0) return null;

            return (
              <Polyline
                key={`route-${route.id}`}
                positions={route.path_coordinates}
                pathOptions={{
                  color: lineColor,
                  weight: lineWeight,
                  opacity: lineOpacity,
                  dashArray: route.transport_type === 'lrt' ? '8, 8' : undefined
                }}
                eventHandlers={{
                  click: () => {
                    setSelectedRoute(route);
                    setRouteBounds(route.path_coordinates);
                  }
                }}
              >
                <Tooltip sticky>
                  <div style={{ padding: '2px', fontSize: '11.5px', fontWeight: '600' }}>
                    {getRouteTitle(route)} ({Number(route.fare_etb).toFixed(2)} {t.etb})
                  </div>
                </Tooltip>
              </Polyline>
            );
          })}

          {/* Regional Terminals Purple Markers */}
          {showRegionalLayer && regionalTerminals.map(reg => (
            <Marker
              key={reg.id}
              position={[Number(reg.latitude), Number(reg.longitude)]}
              icon={createCustomIcon('terminal', false, false, false, false, false, true, false)}
            >
              <Popup>
                <div style={{ minWidth: '220px', padding: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '16px' }}>🚌</span>
                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>
                      {lang === 'am' ? reg.name_am : reg.name_en}
                    </strong>
                  </div>
                  <div style={{ fontSize: '11px', color: '#86198f', fontWeight: '700', marginBottom: '6px' }}>
                    🧭 {reg.corridor_served}
                  </div>
                  <div style={{ fontSize: '11px', color: '#334155', marginBottom: '6px' }}>
                    📍 <strong>Where:</strong> {lang === 'am' ? reg.exact_location_am : reg.exact_location_en}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#475569', background: '#faf5ff', padding: '6px', borderRadius: '6px' }}>
                    Destinations: <strong>{reg.destinations.slice(0, 4).join(', ')}...</strong>
                  </div>
                </div>
              </Popup>
              {showStationLabels && (
                <Tooltip permanent direction="bottom">
                  <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#86198f' }}>
                    {lang === 'am' ? reg.name_am : reg.name_en}
                  </span>
                </Tooltip>
              )}
            </Marker>
          ))}

          {/* Taxi Tera Yellow Markers */}
          {showTaxiLayer && taxiTeras.map(tera => (
            <Marker
              key={tera.id}
              position={[Number(tera.latitude), Number(tera.longitude)]}
              icon={createCustomIcon('terminal', false, false, false, false, true, false, false)}
            >
              <Popup>
                <div style={{ minWidth: '220px', padding: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span style={{ fontSize: '16px' }}>🚕</span>
                    <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>
                      {lang === 'am' ? tera.name_am : tera.name_en}
                    </strong>
                  </div>
                  <div style={{ fontSize: '11px', color: '#854d0e', fontWeight: '600', marginBottom: '6px' }}>
                    {tera.subcity} Subcity
                  </div>
                  <div style={{ fontSize: '11px', color: '#334155', marginBottom: '8px' }}>
                    📍 <strong>{t.whereToGet}</strong> {lang === 'am' ? tera.exact_location_am : tera.exact_location_en}
                  </div>
                  {tera.weyala_shout && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', background: '#fef9c3', padding: '4px 6px', borderRadius: '4px', marginBottom: '8px' }}>
                      <span>🗣️ <em>"{tera.weyala_shout}"</em></span>
                      <button onClick={() => playWeyalaAudio(tera.weyala_shout)} style={{ border: 'none', background: '#fef08a', padding: '2px 4px', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>🔊</button>
                    </div>
                  )}
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '6px', marginBottom: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '3px' }}>
                      Destinations from here:
                    </div>
                    {tera.destinations.slice(0, 4).map((d, i) => (
                      <div key={i} style={{ fontSize: '10.5px', display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                        <span>• {lang === 'am' && d.to_am ? d.to_am : d.to}</span>
                        <strong>{d.fare_etb} ETB</strong>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setWalkingDestination(tera);
                      if (!userLocation) handleLocateMe();
                    }}
                    style={{
                      width: '100%',
                      padding: '6px',
                      background: '#f0fdf4',
                      border: '1px solid #86efac',
                      color: '#166534',
                      borderRadius: '6px',
                      fontSize: '10.5px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    🚶 {t.walkPathBtn}
                  </button>
                </div>
              </Popup>
              {showStationLabels && (
                <Tooltip permanent direction="bottom">
                  <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#854d0e' }}>
                    {lang === 'am' ? tera.name_am.replace(' ታክሲ ተራ', '').replace(' ታክሲ ማቆሚያ', '') : tera.name_en.replace(' Taxi Tera', '').replace(' Taxi Stand', '')}
                  </span>
                </Tooltip>
              )}
            </Marker>
          ))}

          {/* Stop / Station Markers */}
          {stops.map(stop => {
            const isLrtStop = stop.category === 'lrt_station';
            const isBusStop = stop.category === 'bus_stop';
            if (isLrtStop && !showLrtLayer) return null;
            if (isBusStop && !showBusLayer) return null;

            const isOrigin = parseInt(originId, 10) === stop.id;
            const isDest = parseInt(destId, 10) === stop.id;
            const isTransfer = journeyPlan && journeyPlan.transferStop && journeyPlan.transferStop.id === stop.id;
            const isSelected = isOrigin || isDest || isTransfer;

            const passingRoutes = routes.filter(r => r.stop_ids && r.stop_ids.includes(stop.id));

            return (
              <Marker
                key={`stop-${stop.id}`}
                position={[Number(stop.latitude), Number(stop.longitude)]}
                icon={createCustomIcon(stop.category, isSelected, isOrigin, isDest, isTransfer, false, false, false)}
              >
                <Popup>
                  <div style={{ minWidth: '200px', padding: '4px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>
                      {getStopName(stop)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                      {stop.name_en} • <span style={{ color: '#2563eb', fontWeight: '600' }}>{stop.subcity}</span>
                    </div>

                    {passingRoutes.length > 0 && (
                      <div style={{ marginBottom: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                        <div style={{ fontSize: '10.5px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                          {t.stopsPassing}
                        </div>
                        {passingRoutes.map(r => (
                          <div key={r.id} style={{ fontSize: '10.5px', color: r.color_hex || '#2563eb', marginBottom: '2px' }}>
                            • {getRouteTitle(r)}
                          </div>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
                      <button
                        onClick={() => {
                          setOriginId(String(stop.id));
                          setActiveTab('planner');
                        }}
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: '#ecfdf5',
                          border: '1px solid #10b981',
                          color: '#065f46',
                          borderRadius: '6px',
                          fontSize: '10.5px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {t.setAsOrigin}
                      </button>
                      <button
                        onClick={() => {
                          setDestId(String(stop.id));
                          setActiveTab('planner');
                        }}
                        style={{
                          flex: 1,
                          padding: '6px',
                          background: '#fef2f2',
                          border: '1px solid #ef4444',
                          color: '#991b1b',
                          borderRadius: '6px',
                          fontSize: '10.5px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {t.setAsDest}
                      </button>
                    </div>
                  </div>
                </Popup>
                {showStationLabels && (
                  <Tooltip permanent direction="bottom">
                    <span style={{ fontSize: '9.5px', fontWeight: '700', color: '#334155' }}>
                      {getStopName(stop)}
                    </span>
                  </Tooltip>
                )}
              </Marker>
            );
          })}
        </MapContainer>

        {/* Collapsible Floating Map Legend */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '16px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          padding: showMapLegend ? '10px 14px' : '6px 10px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.15)',
          maxWidth: '220px',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowMapLegend(!showMapLegend)}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a' }}>
              🗺️ {t.mapLegend}
            </span>
            <button style={{ border: 'none', background: 'transparent', fontSize: '11px', color: '#64748b', cursor: 'pointer' }}>
              {showMapLegend ? '▼' : '▲'}
            </button>
          </div>
          {showMapLegend && (
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308', display: 'inline-block' }}></span>
                <span>🚕 <strong>Minibus Taxi Tera</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
                <span>🚊 <strong>Light Rail (LRT)</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ea580c', display: 'inline-block' }}></span>
                <span>🚌 <strong>Anbessa / Sheger Bus</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#c026d3', display: 'inline-block' }}></span>
                <span>🏢 <strong>Regional Bus Terminal</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                <span>🟢 <strong>Beginning / Origin</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                <span>🔴 <strong>End / Destination</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Floating Walking Navigation Bar */}
        {walkingDestination && userLocation && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: '#ffffff',
            borderRadius: '12px',
            padding: '10px 16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            border: '1.5px solid #8b5cf6',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '90%'
          }}>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#0f172a' }}>
                🚶 {t.walkingDistTitle} {lang === 'am' ? walkingDestination.name_am : walkingDestination.name_en}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                ~{Math.round((calculateDistanceKm(userLocation.lat, userLocation.lng, Number(walkingDestination.latitude), Number(walkingDestination.longitude)) / 4.5) * 60)} {t.mins} ({calculateDistanceKm(userLocation.lat, userLocation.lng, Number(walkingDestination.latitude), Number(walkingDestination.longitude)).toFixed(1)} km)
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${walkingDestination.latitude},${walkingDestination.longitude}&travelmode=walking`}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '6px 12px',
                background: '#8b5cf6',
                color: '#ffffff',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: '700',
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              🗺️ Maps
            </a>

            <button
              onClick={() => setWalkingDestination(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#94a3b8'
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
