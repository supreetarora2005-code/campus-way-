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
    en: 'CampusWay helps students, faculty and visitors instantly locate buildings, classrooms, laboratories and facilities across the RNSIT campus — no more wandering the corridors asking for directions.',
    kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ಕಟ್ಟಡಗಳು, ತರಗತಿ ಕೋಣೆಗಳು, ಪ್ರಯೋಗಾಲಯಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳನ್ನು ತಕ್ಷಣ ಹುಡುಕಲು ವಿದ್ಯಾರ್ಥಿಗಳು, ಶಿಕ್ಷಕರು ಮತ್ತು ಸಂದರ್ಶಕರಿಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    hi: 'कैंपसवे छात्रों, शिक्षकों और आगंतुकों को आरएनएसआईटी कैंपस में भवन, कक्षाएं, प्रयोगशालाएं और सुविधाएं तुरंत खोजने में मदद करता है।',
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
  'stats.locations': { en: 'Mapped Locations', kn: 'ನಕ್ಷೆಯ ಸ್ಥಳಗಳು', hi: 'मैप किए स्थान' },
  'stats.departments': { en: 'Departments', kn: 'ಇಲಾಖೆಗಳು', hi: 'विभाग' },
  'stats.categories': { en: 'Categories', kn: 'ವರ್ಗಗಳು', hi: 'श्रेणियां' },
  'stats.available': { en: 'Always Available', kn: 'ಯಾವಾಗಲೂ ಲಭ್ಯ', hi: 'हमेशा उपलब्ध' },

  // Sections
  'section.everything.title': { en: 'Everything at RNSIT, One Search Away', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಎಲ್ಲವೂ, ಒಂದೇ ಹುಡುಕಾಟದಲ್ಲಿ', hi: 'आरएनएसआईटी का सब कुछ, एक खोज में' },
  'section.everything.sub': { en: 'Browse locations by category or jump straight into the interactive campus map.', kn: 'ವರ್ಗದ ಮೂಲಕ ಸ್ಥಳಗಳನ್ನು ನೋಡಿ ಅಥವಾ ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆಯನ್ನು ತೆರೆಯಿರಿ.', hi: 'श्रेणी के अनुसार स्थान देखें या इंटरैक्टिव मैप खोलें।' },
  'section.how.title': { en: 'How CampusWay Works', kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ', hi: 'कैंपसवे कैसे काम करता है' },
  'section.how.sub': { en: 'Three simple steps from "Where is it?" to "I\'m here."', kn: '"ಎಲ್ಲಿದೆ?" ದಿಂದ "ನಾನು ಬಂದಿದ್ದೇನೆ" ವರೆಗೆ ಮೂರು ಸರಳ ಹಂತಗಳು.', hi: '"यह कहां है?" से "मैं आ गया" तक तीन आसान कदम।' },
  'section.testimonial': {
    en: '"As a first-year student, CampusWay saved me during orientation week — I found every lab and lecture hall without asking anyone."',
    kn: '"ಪ್ರಥಮ ವರ್ಷದ ವಿದ್ಯಾರ್ಥಿಯಾಗಿ, ಓರಿಯೆಂಟೇಶನ್ ವಾರದಲ್ಲಿ ಕ್ಯಾಂಪಸ್‌ವೇ ನನಗೆ ಉಳಿಸಿದೆ — ಯಾರನ್ನೂ ಕೇಳದೆ ಎಲ್ಲಾ ಪ್ರಯೋಗಾಲಯಗಳನ್ನು ಕಂಡುಕೊಂಡೆ."',
    hi: '"प्रथम वर्ष के छात्र के रूप में, कैंपसवे ने ओरिएंटेशन सप्ताह में मेरी मदद की — बिना किसी से पूछे हर लैब और लेक्चर हॉल मिल गया।"',
  },
  'section.testimonial.author': { en: 'Ananya R. · First-year CSE student, RNSIT', kn: 'ಅನನ್ಯಾ ಆರ್. · ಪ್ರಥಮ ವರ್ಷದ ಸಿಎಸ್‌ಇ ವಿದ್ಯಾರ್ಥಿನಿ, ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ', hi: 'अनन्या आर. · प्रथम वर्ष सीएसई छात्रा, आरएनएसआईटी' },
  'section.cta': { en: 'Start Exploring', kn: 'ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ', hi: 'एक्सप्लोर करना शुरू करें' },
  'section.locations': { en: 'locations', kn: 'ಸ್ಥಳಗಳು', hi: 'स्थान' },

  // Steps
  'step1.title': { en: 'Search or Browse', kn: 'ಹುಡುಕಿ ಅಥವಾ ನೋಡಿ', hi: 'खोजें या ब्राउज़ करें' },
  'step1.text': { en: 'Type a building name, a department, or pick a category from the campus directory.', kn: 'ಕಟ್ಟಡದ ಹೆಸರು ಅಥವಾ ಇಲಾಖೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ, ಅಥವಾ ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.', hi: 'भवन का नाम या विभाग टाइप करें, या श्रेणी चुनें।' },
  'step2.title': { en: 'See It on the Map', kn: 'ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ', hi: 'मैप पर देखें' },
  'step2.text': { en: 'Every location is pinned on the campus map so you know exactly where it sits.', kn: 'ಪ್ರತಿಯೊಂದು ಸ್ಥಳವು ನಕ್ಷೆಯಲ್ಲಿ ಗುರುತಿಸಲ್ಪಟ್ಟಿದೆ, ಹೀಗಾಗಿ ನಿಖರವಾದ ಸ್ಥಳ ಗೊತ್ತಾಗುತ್ತದೆ.', hi: 'हर स्थान मैप पर पिन किया गया है, इसलिए आपको सटीक जगह पता चलती है।' },
  'step3.title': { en: 'Navigate There', kn: 'ಅಲ್ಲಿಗೆ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ', hi: 'वहां नेविगेट करें' },
  'step3.text': { en: 'Set your starting point and destination to see the walking route across campus.', kn: 'ನಿಮ್ಮ ಆರಂಭ ಸ್ಥಳ ಮತ್ತು ಗಮ್ಯಸ್ಥಾನವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ದಾರಿಯನ್ನು ನೋಡಿ.', hi: 'शुरुआती और गंतव्य स्थान चुनें और पैदल रास्ता देखें।' },

  // Explore
  'explore.title': { en: 'Explore RNSIT Campus', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್ ಅನ್ವೇಷಿಸಿ', hi: 'आरएनएसआईटी कैंपस एक्सप्लोर करें' },
  'explore.subtitle': { en: 'Pick a category, search for a location, then set your start and destination to plan your route across campus.', kn: 'ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ಸ್ಥಳ ಹುಡುಕಿ, ನಂತರ ಆರಂಭ ಮತ್ತು ಗಮ್ಯಸ್ಥಾನವನ್ನು ಹೊಂದಿಸಿ.', hi: 'श्रेणी चुनें, स्थान खोजें, फिर शुरुआत और गंतव्य सेट करें।' },
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
  'dir.subtitle': { en: 'Every building and facility at RNSIT — search by name, department or facility, or filter by category.', kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಎಲ್ಲಾ ಕಟ್ಟಡ ಮತ್ತು ಸೌಲಭ್ಯಗಳು — ಹೆಸರು, ಇಲಾಖೆ ಅಥವಾ ವರ್ಗದ ಮೂಲಕ ಹುಡುಕಿ.', hi: 'आरएनएसआईटी की हर इमारत और सुविधा — नाम, विभाग या श्रेणी से खोजें।' },
  'dir.searchPlaceholder': { en: 'Search buildings, labs, departments…', kn: 'ಕಟ್ಟಡಗಳು, ಪ್ರಯೋಗಾಲಯಗಳು, ಇಲಾಖೆಗಳು…', hi: 'भवन, लैब, विभाग खोजें…' },
  'dir.allLocations': { en: 'All Locations', kn: 'ಎಲ್ಲಾ ಸ್ಥಳಗಳು', hi: 'सभी स्थान' },
  'dir.showing': { en: 'Showing', kn: 'ತೋರಿಸಲಾಗಿದೆ', hi: 'दिखा रहे हैं' },
  'dir.of': { en: 'of', kn: 'ರಲ್ಲಿ', hi: 'में से' },
  'dir.viewDetails': { en: 'View details', kn: 'ವಿವರ ನೋಡಿ', hi: 'विवरण देखें' },
  'dir.notFound.title': { en: 'No locations found', kn: 'ಸ್ಥಳಗಳು ಸಿಗಲಿಲ್ಲ', hi: 'कोई स्थान नहीं मिला' },
  'dir.notFound.text': { en: "Try a different name or clear the category filter to see everything on campus.", kn: 'ಬೇರೆ ಹೆಸರನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ವರ್ಗ ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ.', hi: 'दूसरा नाम आज़माएं या श्रेणी फ़िल्टर हटाएं।' },
  'dir.cantFind': { en: "Can't find what you're looking for?", kn: 'ನೀವು ಹುಡುಕುತ್ತಿರುವುದು ಸಿಗಲಿಲ್ಲವೇ?', hi: 'जो आप खोज रहे हैं वह नहीं मिल रहा?' },
  'dir.cantFind.text': { en: 'Open the interactive campus map and explore every pin, or ask the AI assistant.', kn: 'ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ ತೆರೆದು ಎಲ್ಲಾ ಪಿನ್‌ಗಳನ್ನು ನೋಡಿ, ಅಥವಾ ಎಐ ಸಹಾಯಕರನ್ನು ಕೇಳಿ.', hi: 'इंटरैक्टिव मैप खोलें और हर पिन देखें, या एआई सहायक से पूछें।' },
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
    en: 'The project demonstrates a complete navigation experience for the RNSIT campus using sample data, with a clean structure that can later be connected to a live map service, indoor routing and real-time updates.',
    kn: 'ಈ ಯೋಜನೆ ಮಾದರಿ ಡೇಟಾವನ್ನು ಬಳಸಿ ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಕ್ಯಾಂಪಸ್‌ಗಾಗಿ ಸಂಪೂರ್ಣ ನ್ಯಾವಿಗೇಶನ್ ಅನುಭವವನ್ನು ತೋರಿಸುತ್ತದೆ.',
    hi: 'यह परियोजना नमूना डेटा का उपयोग करके आरएनएसआईटी कैंपस के लिए एक संपूर्ण नेविगेशन अनुभव प्रदर्शित करती है।',
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
  'feature1.text': { en: 'A campus overview with pins for every RNSIT location — tap a pin to see what it is.', kn: 'ಪ್ರತಿಯೊಂದು ಸ್ಥಳಕ್ಕೂ ಪಿನ್ ಹೊಂದಿದ ಕ್ಯಾಂಪಸ್ ನೋಟ — ಪಿನ್ ಒತ್ತಿ ವಿವರ ನೋಡಲು.', hi: 'हर आरएनएसआईटी स्थान के पिन के साथ कैंपस अवलोकन — पिन टैप करें।' },
  'feature2.title': { en: 'Searchable Directory', kn: 'ಹುಡುಕಬಹುದಾದ ಡೈರೆಕ್ಟರಿ', hi: 'खोज योग्य डायरेक्टरी' },
  'feature2.text': { en: 'Mapped locations with photos, departments, floor-wise room lists and facility details.', kn: 'ಫೋಟೋ, ಇಲಾಖೆಗಳು, ಮಹಡಿ-ವಾರು ಕೋಣೆ ಪಟ್ಟಿಗಳೊಂದಿಗೆ ನಕ್ಷೆಯ ಸ್ಥಳಗಳು.', hi: 'फोटो, विभाग, फ्लोर-वार कमरा सूची के साथ मैप किए स्थान।' },
  'feature3.title': { en: 'Route Planning', kn: 'ದಾರಿ ಯೋಜನೆ', hi: 'रास्ता योजना' },
  'feature3.text': { en: 'Pick a starting point and destination to highlight a walking route across campus.', kn: 'ಆರಂಭ ಸ್ಥಳ ಮತ್ತು ಗಮ್ಯಸ್ಥಾನ ಆಯ್ಕೆ ಮಾಡಿ ದಾರಿಯನ್ನು ನೋಡಿ.', hi: 'शुरुआत और गंतव्य चुनें और पैदल रास्ता देखें।' },

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
  'footer.note': { en: 'CampusWay is a demonstration project built with sample RNSIT campus data.', kn: 'ಕ್ಯಾಂಪಸ್‌ವೇ ಮಾದರಿ ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ ಡೇಟಾವನ್ನು ಬಳಸಿ ನಿರ್ಮಿತ ಪ್ರಾಜೆಕ್ಟ್.', hi: 'कैंपसवे नमूना आरएनएसआईटी डेटा के साथ बनाई गई एक प्रदर्शन परियोजना है।' },
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
