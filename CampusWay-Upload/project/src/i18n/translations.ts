export type Language = 'en' | 'kn' | 'hi';

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

export const RNSIT = {
  fullName: 'R N S Institute of Technology',
  shortName: 'RNSIT',
  tagline: {
    en: 'Smart Campus Navigation for RNSIT',
    kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಗಾಗಿ ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಂಪಸ್ ನ್ಯಾವಿಗೇಶನ್',
    hi: 'आरएनएसआईटी के लिए स्मार्ट कैंपस नेविगेशन',
  },
  established: 2001,
  contact: {
    email: 'principal@rnsit.ac.in',
    phone: '+91 80 2861 1886',
    address: 'RNSIT Campus, Dr. Vishnuvardhan Road, Channasandra, Bengaluru – 560098',
  },
};

type Dict = Record<string, Record<Language, string>>;

const T: Dict = {
  // Navbar
  'nav.home': { en: 'Home', kn: 'ಮುಖಪುಟ', hi: 'होम' },
  'nav.explore': { en: 'Explore', kn: 'ಅನ್ವೇಷಿಸಿ', hi: 'एक्सप्लोर' },
  'nav.directory': { en: 'Directory', kn: 'ಡೈರೆಕ್ಟರಿ', hi: 'डायरेक्टरी' },
  'nav.about': { en: 'About', kn: 'ನಮ್ಮ ಬಗ್ಗೆ', hi: 'हमारे बारे में' },
  'nav.find': { en: 'Find a Location', kn: 'ಸ್ಥಳ ಹುಡುಕಿ', hi: 'स्थान खोजें' },

  // Hero
  'hero.badge': { en: 'Smart Campus Navigation', kn: 'ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಂಪಸ್ ನ್ಯಾವಿಗೇಶನ್', hi: 'स्मार्ट कैंपस नेविगेशन' },
  'hero.title1': { en: 'Find Your Way Around', kn: 'ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ನಿಮ್ಮ ದಾರಿ', hi: 'कैंपस में अपना रास्ता' },
  'hero.title2': { en: 'RNSIT Campus', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್', hi: 'आरएनएसआईटी कैंपस' },
  'hero.subtitle': {
    en: 'CampusWay helps students, faculty and visitors find RNSIT locations that have been checked against their published sources, with a live map and searchable directory.',
    kn: 'ಪ್ರಕಟಿತ ಮೂಲಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿದ ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಸ್ಥಳಗಳನ್ನು ಲೈವ್ ನಕ್ಷೆ ಮತ್ತು ಹುಡುಕಬಹುದಾದ ಡೈರೆಕ್ಟರಿಯ ಮೂಲಕ ಹುಡುಕಲು ಕ್ಯಾಂಪಸ್‌ವೇ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    hi: 'कैंपसवे लाइव मानचित्र और खोज योग्य डायरेक्टरी के माध्यम से प्रकाशित स्रोतों से सत्यापित आरएनएसआईटी स्थान खोजने में मदद करता है।',
  },
  'hero.searchPlaceholder': { en: 'Search a location — e.g. library, canteen, ECE dept…', kn: 'ಸ್ಥಳ ಹುಡುಕಿ — ಉದಾ. ಗ್ರಂಥಾಲಯ, ಅಪ್ಪಣೆ…', hi: 'स्थान खोजें — जैसे पुस्तकालय, कैंटीन…' },
  'hero.search': { en: 'Search', kn: 'ಹುಡುಕಿ', hi: 'खोजें' },
  'hero.explore': { en: 'Explore Campus', kn: 'ಕ್ಯಾಂಪಸ್ ಅನ್ವೇಷಿಸಿ', hi: 'कैंपस एक्सप्लोर करें' },
  'hero.browse': { en: 'Browse Directory', kn: 'ಡೈರೆಕ್ಟರಿ ನೋಡಿ', hi: 'डायरेक्टरी देखें' },
  'hero.nearest': { en: 'Nearest open now', kn: 'ಹತ್ತಿರದ ತೆರೆದಿರುವಿಕೆ', hi: 'निकटतम खुला' },

  // Quick links
  'quick.library': { en: 'Library', kn: 'ಗ್ರಂಥಾಲಯ', hi: 'पुस्तकालय' },
  'quick.canteen': { en: 'Canteen', kn: 'ಅಪ್ಪಣೆ', hi: 'कैंटीन' },
  'quick.labs': { en: 'Labs', kn: 'ಪ್ರಯೋಗಾಲಯಗಳು', hi: 'लैब' },
  'quick.departments': { en: 'Departments', kn: 'ಇಲಾಖೆಗಳು', hi: 'विभाग' },

  // Stats
  'stats.locations': { en: 'Verified Locations', kn: 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳು', hi: 'सत्यापित स्थान' },
  'stats.categories': { en: 'Active Categories', kn: 'ಸಕ್ರಿಯ ವರ್ಗಗಳು', hi: 'सक्रिय श्रेणियां' },
  'stats.walkable': { en: 'Route-ready locations', kn: 'ದಾರಿಗೆ ಸಿದ್ಧ ಸ್ಥಳಗಳು', hi: 'मार्ग-तैयार स्थान' },

  // Sections
  'section.everything.title': { en: 'Everything at RNSIT, One Search Away', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಎಲ್ಲವೂ, ಒಂದೇ ಹುಡುಕಾಟದಲ್ಲಿ', hi: 'आरएनएसआईटी का सब कुछ, एक खोज में' },
  'section.everything.sub': { en: 'Browse locations by category or jump straight into the interactive campus map.', kn: 'ವರ್ಗದ ಮೂಲಕ ಸ್ಥಳಗಳನ್ನು ನೋಡಿ ಅಥವಾ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆಯನ್ನು ತೆರೆಯಿರಿ.', hi: 'श्रेणी के अनुसार स्थान देखें या इंटरैक्टिव मैप खोलें।' },
  'section.how.title': { en: 'How CampusWay Works', kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ', hi: 'कैंपसवे कैसे काम करता है' },
  'section.how.sub': { en: 'Three simple steps from "Where is it?" to "I\'m here."', kn: '"ಎಲ್ಲಿದೆ?" ದಿಂದ "ನಾನು ಬಂದಿದ್ದೇನೆ" ವರೆಗೆ ಮೂರು ಸರಳ ಹಂತಗಳು.', hi: '"यह कहां है?" से "मैं आ गया" तक तीन आसान कदम।' },
  'section.testimonial': {
    en: 'Locations appear only with verified coordinates and a published source; approximate campus references are clearly labeled.',
    kn: 'ಪರಿಶೀಲಿಸಿದ ನಿರ್ದೇಶಾಂಕಗಳು ಮತ್ತು ಪ್ರಕಟಿತ ಮೂಲವಿರುವ ಸ್ಥಳಗಳು ಮಾತ್ರ ಕಾಣಿಸುತ್ತವೆ; ಅಂದಾಜು ಕ್ಯಾಂಪಸ್ ಉಲ್ಲೇಖಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗುತ್ತದೆ.',
    hi: 'स्थान केवल सत्यापित निर्देशांक और प्रकाशित स्रोत के साथ दिखते हैं; अनुमानित परिसर संदर्भ स्पष्ट रूप से चिह्नित हैं।',
  },
  'section.testimonial.author': { en: 'CampusWay data standard', kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಡೇಟಾ ಮಾನದಂಡ', hi: 'कैंपसवे डेटा मानक' },
  'section.cta': { en: 'Start Exploring', kn: 'ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ', hi: 'एक्सप्लोर करना शुरू करें' },
  'section.locations': { en: 'locations', kn: 'ಸ್ಥಳಗಳು', hi: 'स्थान' },

  // Steps
  'step1.title': { en: 'Search or Browse', kn: 'ಹುಡುಕಿ ಅಥವಾ ನೋಡಿ', hi: 'खोजें या ब्राउज़ करें' },
  'step1.text': { en: 'Type a building name, a department, or pick a category from the campus directory.', kn: 'ಕಟ್ಟಡದ ಹೆಸರು ಅಥವಾ ಇಲಾಖೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ, ಅಥವಾ ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.', hi: 'भवन का नाम या विभाग टाइप करें, या श्रेणी चुनें।' },
  'step2.title': { en: 'See It on the Map', kn: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ', hi: 'मैप पर देखें' },
  'step2.text': { en: 'Only campus locations with verified coordinates appear on the map; approximate reference points are clearly labeled.', kn: 'ಪರಿಶೀಲಿಸಿದ ನಿರ್ದೇಶಾಂಕಗಳಿರುವ ಸ್ಥಳಗಳು ಮಾತ್ರ ನಕ್ಷೆಯಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ; ಅಂದಾಜು ಉಲ್ಲೇಖ ಬಿಂದುಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗುತ್ತದೆ.', hi: 'मानचित्र पर केवल सत्यापित निर्देशांक वाले स्थान दिखते हैं; अनुमानित संदर्भ बिंदुओं को स्पष्ट रूप से चिह्नित किया जाता है।' },
  'step3.title': { en: 'Get Walking Directions', kn: 'ನಡೆದು ಹೋಗುವ ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ', hi: 'पैदल दिशा-निर्देश पाएं' },
  'step3.text': { en: 'Share your location and request a route only to a verified, precise destination supported by the walking network.', kn: 'ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿ, ನಡೆದು ಹೋಗುವ ಜಾಲ ಬೆಂಬಲಿಸುವ ಪರಿಶೀಲಿಸಿದ ನಿಖರ ಗಮ್ಯಸ್ಥಾನಕ್ಕೆ ಮಾತ್ರ ದಾರಿ ಕೇಳಿ.', hi: 'अपना स्थान साझा करें और पैदल नेटवर्क द्वारा समर्थित सत्यापित, सटीक गंतव्य के लिए ही मार्ग मांगें।' },

  // Explore
  'explore.title': { en: 'Explore RNSIT Campus', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್ ಅನ್ವೇಷಿಸಿ', hi: 'आरएनएसआईटी कैंपस एक्सप्लोर करें' },
  'explore.subtitle': { en: 'Search verified campus locations, select a map pin, and request walking directions when an exact, routeable destination is available.', kn: 'ಪರಿಶೀಲಿಸಿದ ಕ್ಯಾಂಪಸ್ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ, ನಕ್ಷೆಯಲ್ಲಿ ಆಯ್ಕೆಮಾಡಿ, ನಿಖರವಾದ ದಾರಿ-ಸಾಧ್ಯ ಗಮ್ಯಸ್ಥಾನ ಲಭ್ಯವಿದ್ದಾಗ ನಡೆದು ಹೋಗುವ ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ.', hi: 'सत्यापित कैंपस स्थान खोजें, मानचित्र पर चुनें और सटीक मार्ग-योग्य गंतव्य उपलब्ध होने पर पैदल दिशा-निर्देश पाएं।' },
  'explore.search': { en: 'Search Location', kn: 'ಸ್ಥಳ ಹುಡುಕಿ', hi: 'स्थान खोजें' },
  'explore.searchPlaceholder': { en: 'Building, department, facility…', kn: 'ಕಟ್ಟಡ, ಇಲಾಖೆ, ಸೌಲಭ್ಯ…', hi: 'भवन, विभाग, सुविधा…' },
  'explore.categories': { en: 'Categories', kn: 'ವರ್ಗಗಳು', hi: 'श्रेणियां' },
  'explore.all': { en: 'All', kn: 'ಎಲ್ಲಾ', hi: 'सभी' },
  'explore.plan': { en: 'Plan a Route', kn: 'ದಾರಿ ಯೋಜಿಸಿ', hi: 'रास्ता योजना' },
  'explore.start': { en: 'Main Gate (Default)', kn: 'ಮುಖ್ಯ ದ್ವಾರ (ಪೂರ್ವನಿಯೋಜಿತ)', hi: 'मुख्य गेट (डिफ़ॉल्ट)' },
  'explore.destination': { en: 'Choose destination…', kn: 'ಗಮ್ಯಸ್ಥಾನ ಆಯ್ಕೆ ಮಾಡಿ…', hi: 'गंतव्य चुनें…' },
  'explore.navigate': { en: 'Navigate Here', kn: 'ಇಲ್ಲಿಗೆ ನ್ಯಾವಿಗೇಟ್', hi: 'यहां नेविगेट करें' },
  'explore.results': { en: 'locations', kn: 'ಸ್ಥಳಗಳು', hi: 'स्थान' },
  'explore.noResults': { en: 'No locations match your search.', kn: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಸ್ಥಳಗಳು ಸಿಗಲಿಲ್ಲ.', hi: 'आपकी खोज से मेल खाता कोई स्थान नहीं।' },
  'explore.routeHint': { en: 'Tap any pin on the map, or choose a destination from the list, to highlight a route.', kn: 'ದಾರಿ ಗುರುತಿಸಲು ನಕ್ಷೆಯಲ್ಲಿ ಪಿನ್ ಒತ್ತಿ ಅಥವಾ ಗಮ್ಯಸ್ಥಾನ ಆಯ್ಕೆ ಮಾಡಿ.', hi: 'रास्ता दिखाने के लिए मैप पर कोई पिन टैप करें या सूची से गंतव्य चुनें।' },
  'explore.route': { en: 'Route', kn: 'ದಾರಿ', hi: 'रास्ता' },
  'explore.walk': { en: 'min walk from Main Gate', kn: 'ನಿಮಿಷ ಮುಖ್ಯ ದ್ವಾರದಿಂದ', hi: 'मिनट पैदल मुख्य गेट से' },
  'explore.tapWalkPrefix': { en: 'Approx.', kn: 'ಸುಮಾರು', hi: 'लगभग' },
  'explore.follow': { en: 'Follow the teal path on the map.', kn: 'ನಕ್ಷೆಯಲ್ಲಿ ಹಸಿರು ದಾರಿಯನ್ನು ಅನುಸರಿಸಿ.', hi: 'मैप पर हरे रास्ते का पालन करें।' },
  'explore.tapPin': { en: 'Interactive preview · tap a pin', kn: 'ಸಂವಾದಾತ್ಮಕ ನೋಟ · ಪಿನ್ ಒತ್ತಿ', hi: 'इंटरैक्टिव प्रीव्यू · पिन टैप करें' },

  // Directory
  'dir.title': { en: 'RNSIT Campus Directory', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್ ಡೈರೆಕ್ಟರಿ', hi: 'आरएनएसआईटी कैंपस डायरेक्टरी' },
  'dir.subtitle': { en: 'Search locations reviewed against their linked sources, or filter the verified campus directory by category.', kn: 'ಮೂಲಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ ಅಥವಾ ಪರಿಶೀಲಿಸಿದ ಕ್ಯಾಂಪಸ್ ಡೈರೆಕ್ಟರಿಯನ್ನು ವರ್ಗದ ಮೂಲಕ ವಿಂಗಡಿಸಿ.', hi: 'स्रोतों से सत्यापित स्थान खोजें या सत्यापित कैंपस डायरेक्टरी को श्रेणी के अनुसार फ़िल्टर करें।' },
  'dir.searchPlaceholder': { en: 'Search buildings, labs, departments…', kn: 'ಕಟ್ಟಡಗಳು, ಪ್ರಯೋಗಾಲಯಗಳು, ಇಲಾಖೆಗಳು…', hi: 'भवन, लैब, विभाग खोजें…' },
  'dir.allLocations': { en: 'All Locations', kn: 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು', hi: 'सभी स्थान' },
  'dir.showing': { en: 'Showing', kn: 'ತೋರಿಸಲಾಗಿದೆ', hi: 'दिखा रहे हैं' },
  'dir.of': { en: 'of', kn: 'ರಲ್ಲಿ', hi: 'में से' },
  'dir.viewDetails': { en: 'View details', kn: 'ವಿವರ ನೋಡಿ', hi: 'विवरण देखें' },
  'dir.notFound.title': { en: 'No locations found', kn: 'ಸ್ಥಳಗಳು ಸಿಗಲಿಲ್ಲ', hi: 'कोई स्थान नहीं मिला' },
  'dir.notFound.text': { en: "Try a different name or clear the category filter to see everything on campus.", kn: 'ಬೇರೆ ಹೆಸರನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ವರ್ಗ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.', hi: 'दूसरा नाम आज़माएं या श्रेणी फ़िल्टर हटाएं।' },
  'dir.cantFind': { en: "Can't find what you're looking for?", kn: 'ನೀವು ಹುಡುಕುತ್ತಿರುವುದು ಸಿಗಲಿಲ್ಲವೇ?', hi: 'जो आप खोज रहे हैं वह नहीं मिल रहा?' },
  'dir.cantFind.text': { en: 'Open the interactive map to explore the verified locations currently available.', kn: 'ಪ್ರಸ್ತುತ ಲಭ್ಯವಿರುವ ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆಯನ್ನು ತೆರೆಯಿರಿ.', hi: 'वर्तमान में उपलब्ध सत्यापित स्थानों को देखने के लिए इंटरैक्टिव मानचित्र खोलें।' },
  'dir.openMap': { en: 'Open Campus Map', kn: 'ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆ ತೆರೆಯಿರಿ', hi: 'कैंपस मैप खोलें' },

  // Details
  'det.notFound': { en: 'Location not found', kn: 'ಸ್ಥಳ ಸಿಗಲಿಲ್ಲ', hi: 'स्थान नहीं मिला' },
  'det.notFound.text': { en: "The location you're looking for isn't in the RNSIT campus directory.", kn: 'ನೀವು ಹುಡುಕುತ್ತಿರುವ ಸ್ಥಳವು ಡೈರೆಕ್ಟರಿಯಲ್ಲಿ ಇಲ್ಲ.', hi: 'आप जो खोज रहे हैं वह डायरेक्टरी में नहीं है।' },
  'det.backToDirectory': { en: 'Back to Directory', kn: 'ಡೈರೆಕ್ಟರಿಗೆ ಹಿಂದಿರುಗಿ', hi: 'डायरेक्टरी पर वापस' },
  'det.back': { en: 'Back to directory', kn: 'ಡೈರೆಕ್ಟರಿಗೆ ಹಿಂದಿರುಗಿ', hi: 'डायरेक्टरी पर वापस' },
  'det.depts': { en: 'Departments & Offices', kn: 'ಇಲಾಖೆಗಳು ಮತ್ತು ಕಚೇರಿಗಳು', hi: 'विभाग और कार्यालय' },
  'det.facilities': { en: 'Facilities Available', kn: 'ಲಭ್ಯವಿರುವ ಸೌಲಭ್ಯಗಳು', hi: 'उपलब्ध सुविधाएं' },
  'det.map': { en: 'Location on Campus Map', kn: 'ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆಯಲ್ಲಿ ಸ್ಥಳ', hi: 'कैंपस मैप पर स्थान' },
  'det.floors': { en: 'Floors & Rooms', kn: 'ಮಹಡಿಗಳು ಮತ್ತು ಕೋಣೆಗಳು', hi: 'फ्लोर और कमरे' },
  'det.floor': { en: 'floor', kn: 'ಮಹಡಿ', hi: 'फ्लोर' },
  'det.floorsPlural': { en: 'floors', kn: 'ಮಹಡಿಗಳು', hi: 'फ्लोर' },
  'det.singleFloor': { en: 'Single Floor', kn: 'ಒಂದು ಮಹಡಿ', hi: 'एक फ्लोर' },
  'det.more': { en: 'More in', kn: 'ಇನ್ನಷ್ಟು', hi: 'इसमें और भी' },
  'det.allLocations': { en: 'All Locations', kn: 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು', hi: 'सभी स्थान' },

  // About
  'about.badge': { en: 'About the Project', kn: 'ಯೋಜನೆಯ ಬಗ್ಗೆ', hi: 'परियोजना के बारे में' },
  'about.title': { en: 'Making Every Corner of RNSIT Easy to Find', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಎಲ್ಲಾ ಮೂಲೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಹುಡುಕಿ', hi: 'आरएनएसआईटी का हर कोना खोजना आसान' },
  'about.purpose': { en: 'Our Purpose', kn: 'ನಮ್ಮ ಉದ್ದೇಶ', hi: 'हमारा उद्देश्य' },
  'about.purposeText': {
    en: 'Large campuses like RNSIT can be confusing — especially during admissions, orientation week and examination days. CampusWay was created to remove that confusion with a single, easy-to-use map and directory that works on any device.',
    kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನಂತಹ ದೊಡ್ಡ ಕ್ಯಾಂಪಸ್‌ಗಳು ಗೊಂದಲ ಉಂಟುಮಾಡಬಹುದು — ವಿಶೇಷವಾಗಿ ಪ್ರವೇಶ ಮತ್ತು ಪರೀಕ್ಷೆಯ ದಿನಗಳಲ್ಲಿ. ಕ್ಯಾಂಪಸ್‌ವೇ ಆ ಗೊಂದಲವನ್ನು ನಿವಾರಿಸಲು ರಚಿಸಲಾಗಿದೆ.',
    hi: 'आरएनएसआईटी जैसे बड़े कैंपस में भ्रम हो सकता है — विशेषकर प्रवेश और परीक्षा के दिनों में। कैंपसवे उस भ्रम को दूर करने के लिए बनाया गया है।',
  },
  'about.purposeText2': {
    en: 'CampusWay now reads verified location records from the connected campus database. The map labels approximate references, and walking directions remain disabled until precise building or entrance coordinates are verified.',
    kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಸಂಪರ್ಕಿತ ಡೇಟಾಬೇಸ್‌ನಿಂದ ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳದ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯುತ್ತದೆ. ಅಂದಾಜು ಉಲ್ಲೇಖಗಳನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಲಾಗುತ್ತದೆ; ಕಟ್ಟಡ ಅಥವಾ ಪ್ರವೇಶದ್ವಾರದ ನಿಖರ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ಪರಿಶೀಲಿಸುವವರೆಗೆ ನಡೆದು ಹೋಗುವ ದಿಕ್ಕುಗಳು ಲಭ್ಯವಿರುವುದಿಲ್ಲ.',
    hi: 'कैंपसवे अब जुड़े हुए कैंपस डेटाबेस से सत्यापित स्थान रिकॉर्ड पढ़ता है। अनुमानित संदर्भों को मानचित्र पर चिह्नित किया जाता है और सटीक भवन या प्रवेश निर्देशांक सत्यापित होने तक पैदल दिशा-निर्देश उपलब्ध नहीं होंगे।',
  },
  'about.includes': { en: 'What CampusWay Includes', kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ‌ನಲ್ಲಿ ಏನಿದೆ', hi: 'कैंपसवे में क्या शामिल है' },
  'about.includesSub': { en: 'Everything works together as one complete navigation experience.', kn: 'ಎಲ್ಲವೂ ಒಟ್ಟಿಗೆ ಸಂಪೂರ್ಣ ನ್ಯಾವಿಗೇಶನ್ ಅನುಭವವನ್ನು ನೀಡುತ್ತದೆ.', hi: 'सब कुछ मिलकर एक संपूर्ण नेविगेशन अनुभव बनाता है।' },
  'about.contact': { en: 'Contact & Feedback', kn: 'ಸಂಪರ್ಕ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆ', hi: 'संपर्क और प्रतिक्रिया' },
  'about.contactText': { en: 'Spotted a wrong room number, a missing facility, or have an idea to improve CampusWay? Send us a note — every suggestion helps make the map better.', kn: 'ತಪ್ಪು ಕೋಣೆ ಸಂಖ್ಯೆ ಅಥವಾ ಕಾಣೆಯಾದ ಸೌಲಭ್ಯ ಕಂಡಿರಾ? ನಮಗೆ ತಿಳಿಸಿ — ಪ್ರತಿಯೊಂದು ಸಲಹೆ ನಕ್ಷೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸುತ್ತದೆ.', hi: 'गलत कमरा नंबर या कोई सुविधा गायब दिखी? हमें बताएं — हर सुझाव मैप को बेहतर बनाता है।' },
  'about.name': { en: 'Name', kn: 'ಹೆಸರು', hi: 'नाम' },
  'about.namePlaceholder': { en: 'Your name', kn: 'ನಿಮ್ಮ ಹೆಸರು', hi: 'आपका नाम' },
  'about.email': { en: 'Email', kn: 'ಇಮೇಲ್', hi: 'ईमेल' },
  'about.emailPlaceholder': { en: 'you@rnsit.ac.in', kn: 'ನಿಮ್ಮ ಇಮೇಲ್', hi: 'आपका ईमेल' },
  'about.message': { en: 'Message', kn: 'ಸಂದೇಶ', hi: 'संदेश' },
  'about.messagePlaceholder': { en: 'Share feedback, a correction, or an idea…', kn: 'ಪ್ರತಿಕ್ರಿಯೆ ಅಥವಾ ಸಲಹೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ…', hi: 'प्रतिक्रिया या सुझाव साझा करें…' },
  'about.send': { en: 'Send Feedback', kn: 'ಪ್ರತಿಕ್ರಿಯೆ ಕಳುಹಿಸಿ', hi: 'प्रतिक्रिया भेजें' },
  'about.thanks': { en: 'Thank you', kn: 'ಧನ್ಯವಾದಗಳು', hi: 'धन्यवाद' },
  'about.thanksText': { en: 'Your feedback has been recorded. The CampusWay team reviews every message.', kn: 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ. ಕ್ಯಾಂಪಸ್‌ವೇ ತಂಡ ಪ್ರತಿಯೊಂದು ಸಂದೇಶವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.', hi: 'आपकी प्रतिक्रिया दर्ज कर ली गई है। कैंपसवे टीम हर संदेश की समीक्षा करती है।' },
  'about.sendAnother': { en: 'Send another message', kn: 'ಇನ್ನೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ', hi: 'दूसरा संदेश भेजें' },
  'about.errFill': { en: 'Please fill in your name, email and message.', kn: 'ದಯವಿಟ್ಟು ಹೆಸರು, ಇಮೇಲ್ ಮತ್ತು ಸಂದೇಶ ಭರ್ತಿ ಮಾಡಿ.', hi: 'कृपया नाम, ईमेल और संदेश भरें।' },
  'about.errEmail': { en: 'Please enter a valid email address.', kn: 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ.', hi: 'कृपया मान्य ईमेल पता दर्ज करें।' },
  'about.campus': { en: 'RNSIT Campus, Channasandra, Bengaluru', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್, ಚನ್ನಸಂದ್ರ, ಬೆಂಗಳೂರು', hi: 'आरएनएसआईटी कैंपस, चन्नासंद्र, बेंगलुरु' },

  // Benefits
  'benefit1.title': { en: 'Save Time Every Day', kn: 'ಪ್ರತಿದಿನ ಸಮಯ ಉಳಿಸಿ', hi: 'हर दिन समय बचाएं' },
  'benefit1.text': { en: 'Stop asking for directions — reach any classroom, lab or office in minutes, even on your first visit.', kn: 'ದಾರಿ ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ — ಮೊದಲ ಭೇಟಿಯಲ್ಲೇ ನಿಮಿಷಗಳಲ್ಲಿ ತಲುಪಿ.', hi: 'रास्ता पूछना बंद करें — पहली बार में ही मिनटों में पहुंचें।' },
  'benefit2.title': { en: 'Welcome for Visitors', kn: 'ಸಂದರ್ಶಕರಿಗೆ ಸ್ವಾಗತ', hi: 'आगंतुकों के लिए स्वागत' },
  'benefit2.text': { en: 'Guests, parents and new joiners can navigate the RNSIT campus confidently without a personal guide.', kn: 'ಅತಿಥಿಗಳು, ಪೋಷಕರು ಮತ್ತು ಹೊಸಬರು ಮಾರ್ಗದರ್ಶಕರಿಲ್ಲದೆ ಕ್ಯಾಂಪಸ್ ಅನ್ನು ವಿಶ್ವಾಸದಿಂದ ನೋಡಬಹುದು.', hi: 'मेहमान, अभिभावक और नए लोग बिना गाइड के आत्मविश्वास से कैंपस देख सकते हैं।' },
  'benefit3.title': { en: 'Accessible for Everyone', kn: 'ಎಲ್ಲರಿಗೂ ಸುಲಭ', hi: 'सबके लिए सुलभ' },
  'benefit3.text': { en: 'Three languages — Kannada, English and Hindi — plus clear categories make it easy for everyone to get around.', kn: 'ಮೂರು ಭಾಷೆಗಳು — ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಹಿಂದಿ — ಎಲ್ಲರಿಗೂ ಸುಲಭವಾಗಿ ಬಳಸಬಹುದು.', hi: 'तीन भाषाएं — कन्नड़, अंग्रेज़ी और हिंदी — सबके लिए आसान।' },
  'benefit4.title': { en: 'One Source of Truth', kn: 'ಒಂದೇ ವಿಶ್ವಾಸಾರ್ಹ ಮೂಲ', hi: 'एक विश्वसनीय स्रोत' },
  'benefit4.text': { en: 'Room lists, departments and facility details stay consistent for the whole campus in one place.', kn: 'ಕೋಣೆ ಪಟ್ಟಿಗಳು, ಇಲಾಖೆಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳ ವಿವರಗಳು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಸ್ಥಿರವಾಗಿರುತ್ತವೆ.', hi: 'कमरा सूची, विभाग और सुविधा विवरण एक जगह स्थिर रहते हैं।' },

  // Feature cards
  'feature1.title': { en: 'Interactive Campus Map', kn: 'ಸಂವಾದಾತ್ಮಕ ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆ', hi: 'इंटरैक्टिव कैंपस मैप' },
  'feature1.text': { en: 'Verified campus coordinates appear as interactive pins; select one to see its source and location details.', kn: 'ಪರಿಶೀಲಿಸಿದ ಕ್ಯಾಂಪಸ್ ನಿರ್ದೇಶಾಂಕಗಳು ಸಂವಾದಾತ್ಮಕ ಪಿನ್‌ಗಳಾಗಿ ಕಾಣಿಸುತ್ತವೆ; ಮೂಲ ಮತ್ತು ವಿವರಗಳನ್ನು ನೋಡಲು ಆಯ್ಕೆಮಾಡಿ.', hi: 'सत्यापित कैंपस निर्देशांक इंटरैक्टिव पिन के रूप में दिखते हैं; स्रोत और विवरण देखने के लिए चुनें।' },
  'feature2.title': { en: 'Searchable Directory', kn: 'ಹುಡುಕಬಹುದಾದ ಡೈರೆಕ್ಟರಿ', hi: 'खोज योग्य डायरेक्टरी' },
  'feature2.text': { en: 'Search verified locations, review their descriptions and sources, then highlight a result on the map.', kn: 'ಪರಿಶೀಲಿಸಿದ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಿ, ವಿವರಣೆ ಮತ್ತು ಮೂಲಗಳನ್ನು ನೋಡಿ, ನಂತರ ಫಲಿತಾಂಶವನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಿ.', hi: 'सत्यापित स्थान खोजें, विवरण और स्रोत देखें, फिर परिणाम को मानचित्र पर हाइलाइट करें।' },
  'feature3.title': { en: 'Walking Directions', kn: 'ನಡೆಯುವ ದಿಕ್ಕುಗಳು', hi: 'पैदल दिशा-निर्देश' },
  'feature3.text': { en: 'Request a walking route from your current location when a precise, verified destination is supported.', kn: 'ನಿಖರವಾದ, ಪರಿಶೀಲಿಸಿದ ಗಮ್ಯಸ್ಥಾನ ಬೆಂಬಲಿತವಾಗಿದ್ದಾಗ ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳದಿಂದ ನಡೆದು ಹೋಗುವ ದಾರಿಯನ್ನು ಕೇಳಿ.', hi: 'सटीक, सत्यापित गंतव्य समर्थित होने पर अपने वर्तमान स्थान से पैदल मार्ग मांगें।' },

  // AI assistant
  'ai.title': { en: 'CampusWay Assistant', kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಸಹಾಯಕ', hi: 'कैंपसवे सहायक' },
  'ai.subtitle': { en: 'Ask me anything about RNSIT', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ', hi: 'आरएनएसआईटी के बारे में कुछ भी पूछें' },
  'ai.placeholder': { en: 'Ask about a building, dept, facility…', kn: 'ಕಟ್ಟಡ, ಇಲಾಖೆ ಬಗ್ಗೆ ಕೇಳಿ…', hi: 'भवन, विभाग के बारे में पूछें…' },
  'ai.greeting': { en: "Hi! I'm the CampusWay assistant for RNSIT. Ask me things like \"Where is the library?\" or \"Where is the ECE department?\"", kn: 'ನಮಸ್ಕಾರ! ನಾನು ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಕ್ಯಾಂಪಸ್‌ವೇ ಸಹಾಯಕ. "ಗ್ರಂಥಾಲಯ ಎಲ್ಲಿದೆ?" ಎಂದು ಕೇಳಿ.', hi: 'नमस्ते! मैं आरएनएसआईटी का कैंपसवे सहायक हूं. "पुस्तकालय कहां है?" पूछें।' },
  'ai.notFound': { en: "I couldn't find that location. Try asking about the library, canteen, a department block, or any facility.", kn: 'ಆ ಸ್ಥಳ ನನಗೆ ಸಿಗಲಿಲ್ಲ. ಗ್ರಂಥಾಲಯ, ಅಪ್ಪಣೆ ಅಥವಾ ಇಲಾಖೆ ಬಗ್ಗೆ ಕೇಳಿ.', hi: 'वह स्थान नहीं मिला. पुस्तकालय, कैंटीन या विभाग के बारे में पूछें।' },
  'ai.whereIs': { en: 'is on the campus map', kn: 'ಕ್ಯಾಂಪಸ್ ನಕ್ಷೆಯಲ್ಲಿದೆ', hi: 'कैंपस मैप पर है' },
  'ai.walkTime': { en: 'min walk from the Main Gate', kn: 'ನಿಮಿಷ ಮುಖ್ಯ ದ್ವಾರದಿಂದ', hi: 'मिनट पैदल मुख्य गेट से' },
  'ai.viewDetails': { en: 'View details', kn: 'ವಿವರ ನೋಡಿ', hi: 'विवरण देखें' },
  'ai.navigateTo': { en: 'Navigate here', kn: 'ಇಲ್ಲಿಗೆ ನ್ಯಾವಿಗೇಟ್', hi: 'यहां नेविगेट करें' },
  'ai.you': { en: 'You', kn: 'ನೀವು', hi: 'आप' },

  // Footer
  'footer.tagline': { en: 'The smart way to find buildings, classrooms, labs and facilities across the RNSIT campus — built for students, faculty and visitors.', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ಕಟ್ಟಡಗಳು, ತರಗತಿ ಕೋಣೆಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕುವ ಸ್ಮಾರ್ಟ್ ವಿಧಾನ.', hi: 'आरएनएसआईटी कैंपस में भवन, कक्षाएं, लैब और सुविधाएं खोजने का स्मार्ट तरीका।' },
  'footer.explore': { en: 'Explore', kn: 'ಅನ್ವೇಷಿಸಿ', hi: 'एक्सप्लोर' },
  'footer.contact': { en: 'Contact', kn: 'ಸಂಪರ್ಕ', hi: 'संपर्क' },
  'footer.note': { en: 'Campus locations are shown only when their coordinates and source have been verified.', kn: 'ನಿರ್ದೇಶಾಂಕಗಳು ಮತ್ತು ಮೂಲವನ್ನು ಪರಿಶೀಲಿಸಿದಾಗ ಮಾತ್ರ ಕ್ಯಾಂಪಸ್ ಸ್ಥಳಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತದೆ.', hi: 'कैंपस स्थान तभी दिखाए जाते हैं जब उनके निर्देशांक और स्रोत सत्यापित हों।' },
  'footer.rights': { en: 'Smart Campus Navigation Platform', kn: 'ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಂಪಸ್ ನ್ಯಾವಿಗೇಶನ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್', hi: 'स्मार्ट कैंपस नेविगेशन प्लेटफॉर्म' },

  // Categories
  'cat.Academic Blocks': { en: 'Academic Blocks', kn: 'ಶೈಕ್ಷಣಿಕ ಬ್ಲಾಕ್‌ಗಳು', hi: 'शैक्षणिक ब्लॉक' },
  'cat.Labs': { en: 'Labs', kn: 'ಪ್ರಯೋಗಾಲಯಗಳು', hi: 'प्रयोगशालाएं' },
  'cat.Library': { en: 'Library', kn: 'ಗ್ರಂಥಾಲಯ', hi: 'पुस्तकालय' },
  'cat.Canteen': { en: 'Canteen', kn: 'ಅಪ್ಪಣೆ', hi: 'कैंटीन' },
  'cat.Facilities': { en: 'Facilities', kn: 'ಸೌಲಭ್ಯಗಳು', hi: 'सुविधाएं' },
};

export function translate(key: string, lang: Language): string {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}
