import type { Language } from '@/i18n/translations';

export type Category = 'Academic Blocks' | 'Labs' | 'Library' | 'Canteen' | 'Facilities';

export interface Floor {
  name: string;
  rooms: string[];
}

/** A locally-translated piece of text on a location. */
export type LocalizedText = Record<Language, string>;

export interface CampusLocation {
  id: string;
  name: string;
  nameKn?: string;
  nameHi?: string;
  category: Category;
  description: LocalizedText;
  image: string;
  departments: string[];
  floors: Floor[];
  facilities: string[];
  hours: string;
  // Position on the placeholder map, as percentages of the map area
  mapX: number;
  mapY: number;
}

export const CATEGORIES: Category[] = [
  'Academic Blocks',
  'Labs',
  'Library',
  'Canteen',
  'Facilities',
];

const en = (s: string): LocalizedText => ({ en: s, kn: s, hi: s });

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  {
    id: 'cse-block',
    name: 'CSE Block (apurva)',
    nameKn: 'ಸಿಎಸ್‌ಇ ಬ್ಲಾಕ್',
    nameHi: 'सीएसई ब्लॉक',
    category: 'Academic Blocks',
    description: {
      en: 'Home of the Computer Science & Engineering department — classrooms, faculty rooms and programming labs across four floors.',
      kn: 'ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ಇಲಾಖೆಯ ಕೇಂದ್ರ — ನಾಲ್ಕು ಮಹಡಿಗಳಲ್ಲಿ ತರಗತಿಗಳು ಮತ್ತು ಪ್ರಯೋಗಾಲಯಗಳು.',
      hi: 'कंप्यूटर साइंस और इंजीनियरिंग विभाग का केंद्र — चार फ्लोर में कक्षाएं और लैब।',
    },
    image:
      'https://images.pexels.com/photos/39972075/pexels-photo-39972075.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['CSE', 'CSE (AI & ML)', 'CSE (Data Science)', 'CSE (Cyber Security)'],
    floors: [
      { name: 'Ground Floor', rooms: ['Classrooms CS-01 to CS-06', 'HOD Cabin', 'Department Office'] },
      { name: 'First Floor', rooms: ['Programming Labs 1–3', 'Classrooms CS-101 to CS-106'] },
      { name: 'Second Floor', rooms: ['Project Labs', 'Faculty Cabins'] },
      { name: 'Third Floor', rooms: ['Classrooms CS-301 to CS-304', 'Seminar Hall'] },
    ],
    facilities: ['Computer Labs', 'Wi-Fi', 'Seminar Hall', 'Faculty Cabins'],
    hours: 'Mon–Sat, 8:30 AM – 5:00 PM',
    mapX: 28,
    mapY: 32,
  },
  {
    id: 'ece-block',
    name: 'ECE Block',
    nameKn: 'ಇಸಿಇ ಬ್ಲಾಕ್',
    nameHi: 'ईसीई ब्लॉक',
    category: 'Academic Blocks',
    description: {
      en: 'Electronics & Communication department with signal processing, communication and VLSI laboratories, including the EC VLSI programme.',
      kn: 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಸಂವಹನ ಇಲಾಖೆ — ಸಂಪರ್ಕ ಮತ್ತು ವಿಎಲ್‌ಎಸ್‌ಐ ಪ್ರಯೋಗಾಲಯಗಳೊಂದಿಗೆ.',
      hi: 'इलेक्ट्रॉनिक्स और कम्युनिकेशन विभाग — कम्युनिकेशन और वीएलएसआई लैब के साथ।',
    },
    image:
      'https://images.pexels.com/photos/35314982/pexels-photo-35314982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['ECE', 'EC (VLSI)'],
    floors: [
      { name: 'Ground Floor', rooms: ['Electronics Labs', 'HOD Cabin', 'Department Office'] },
      { name: 'First Floor', rooms: ['Communication Labs', 'Classrooms EC-201 to EC-206'] },
      { name: 'Second Floor', rooms: ['VLSI Lab', 'Faculty Cabins'] },
    ],
    facilities: ['VLSI Lab', 'Communication Labs', 'Wi-Fi', 'Tutorial Rooms'],
    hours: 'Mon–Sat, 8:30 AM – 5:00 PM',
    mapX: 50,
    mapY: 24,
  },
  {
    id: 'eee-block',
    name: 'EEE Block',
    nameKn: 'ಇಇಇ ಬ್ಲಾಕ್',
    nameHi: 'ईईई ब्लॉक',
    category: 'Academic Blocks',
    description: {
      en: 'Electrical & Electronics Engineering department with machine labs, power systems lab and circuits workshops.',
      kn: 'ವಿದ್ಯುತ್ ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಇಲಾಖೆ — ಯಂತ್ರ ಮತ್ತು ಶಕ್ತಿ ವ್ಯವಸ್ಥೆಯ ಪ್ರಯೋಗಾಲಯಗಳು.',
      hi: 'इलेक्ट्रिकल और इलेक्ट्रॉनिक्स इंजीनियरिंग विभाग — मशीन और पावर सिस्टम लैब।',
    },
    image:
      'https://images.pexels.com/photos/11932106/pexels-photo-11932106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['EEE'],
    floors: [
      { name: 'Ground Floor', rooms: ['Electrical Machine Labs', 'HOD Cabin'] },
      { name: 'First Floor', rooms: ['Power Systems Lab', 'Classrooms EE-201 to EE-204'] },
    ],
    facilities: ['Machine Labs', 'Power Systems Lab', 'Wi-Fi'],
    hours: 'Mon–Sat, 8:30 AM – 5:00 PM',
    mapX: 68,
    mapY: 38,
  },
  {
    id: 'mech-civil-block',
    name: 'Mechanical & Civil Block',
    nameKn: 'ಮೆಕ್ಯಾನಿಕಲ್ ಮತ್ತು ಸಿವಿಲ್ ಬ್ಲಾಕ್',
    nameHi: 'मैकेनिकल और सिविल ब्लॉक',
    category: 'Academic Blocks',
    description: {
      en: 'Shared block for the Mechanical and Civil engineering departments with workshops, drawing halls and materials testing labs.',
      kn: 'ಮೆಕ್ಯಾನಿಕಲ್ ಮತ್ತು ಸಿವಿಲ್ ಇಲಾಖೆಗಳ ಸಂಯುಕ್ತ ಬ್ಲಾಕ್ — ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಡ್ರಾಯಿಂಗ್ ಹಾಲ್‌ಗಳು.',
      hi: 'मैकेनिकल और सिविल विभागों का साझा ब्लॉक — वर्कशॉप और ड्राइंग हॉल।',
    },
    image:
      'https://images.pexels.com/photos/20200756/pexels-photo-20200756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Mechanical Engineering', 'Civil Engineering'],
    floors: [
      { name: 'Ground Floor', rooms: ['Workshops', 'Materials Testing Lab'] },
      { name: 'First Floor', rooms: ['Drawing Halls', 'Classrooms MC-201 to MC-206'] },
    ],
    facilities: ['Workshops', 'Drawing Hall', 'Materials Lab'],
    hours: 'Mon–Sat, 8:30 AM – 5:00 PM',
    mapX: 22,
    mapY: 62,
  },
  {
    id: 'mba-mca-block',
    name: 'MBA & MCA Block',
    nameKn: 'ಎಂಬಿಎ ಮತ್ತು ಎಂಸಿಎ ಬ್ಲಾಕ್',
    nameHi: 'एमबीए और एमसीए ब्लॉक',
    category: 'Academic Blocks',
    description: {
      en: 'Postgraduate block for the Management (MBA) and Computer Applications (MCA) programmes with case-study classrooms and a computer center.',
      kn: 'ಎಂಬಿಎ ಮತ್ತು ಎಂಸಿಎ ಕಾರ್ಯಕ್ರಮಗಳ ಸ್ನಾತಕೋತ್ತರ ಬ್ಲಾಕ್.',
      hi: 'एमबीए और एमसीए कार्यक्रमों का स्नातकोत्तर ब्लॉक।',
    },
    image:
      'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['MBA', 'MCA', 'CS Business Systems'],
    floors: [
      { name: 'Ground Floor', rooms: ['Case-Study Classrooms', 'Department Office'] },
      { name: 'First Floor', rooms: ['Computer Center', 'Seminar Hall'] },
    ],
    facilities: ['Computer Center', 'Seminar Hall', 'Wi-Fi'],
    hours: 'Mon–Sat, 8:30 AM – 5:00 PM',
    mapX: 62,
    mapY: 62,
  },
  {
    id: 'central-library',
    name: 'Central Library',
    nameKn: 'ಕೇಂದ್ರ ಗ್ರಂಥಾಲಯ',
    nameHi: 'केंद्रीय पुस्तकालय',
    category: 'Library',
    description: {
      en: 'Multi-floor library with reference sections, journals and a digital library zone for all RNSIT departments.',
      kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಎಲ್ಲಾ ಇಲಾಖೆಗಳಿಗೆ ಉಲ್ಲೇಖ ವಿಭಾಗ, ನಿಯತಕಾಲಿಕೆಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಗ್ರಂಥಾಲಯ.',
      hi: 'संदर्भ अनुभाग, जर्नल और डिजिटल लाइब्रेरी क्षेत्र के साथ बहुमंजिला पुस्तकालय।',
    },
    image:
      'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Circulation Desk', 'Reference Section', 'Digital Library'],
    floors: [
      { name: 'Ground Floor', rooms: ['Circulation Desk', 'Reading Hall'] },
      { name: 'First Floor', rooms: ['Reference Section', 'Journal Room'] },
      { name: 'Second Floor', rooms: ['Digital Library', 'Silent Study Zone'] },
    ],
    facilities: ['Digital Library', 'Reading Hall', 'Wi-Fi', 'Book Bank'],
    hours: 'Mon–Sat, 8:00 AM – 8:00 PM',
    mapX: 44,
    mapY: 44,
  },
  {
    id: 'samsung-ic',
    name: 'Samsung Innovation Center',
    nameKn: 'ಸ್ಯಾಮ್‌ಸಂಗ್ ಇನ್ನೋವೇಶನ್ ಸೆಂಟರ್',
    nameHi: 'सैमसंग इनोवेशन सेंटर',
    category: 'Labs',
    description: {
      en: 'Industry-backed innovation lab set up with Samsung for advanced training on emerging technologies and student projects.',
      kn: 'ಸ್ಯಾಮ್‌ಸಂಗ್ ಸಹಯೋಗದೊಂದಿಗೆ ಸ್ಥಾಪಿಸಲಾದ ಇನ್ನೋವೇಶನ್ ಪ್ರಯೋಗಾಲಯ.',
      hi: 'सैमसंग के सहयोग से स्थापित इनोवेशन लैब।',
    },
    image:
      'https://images.pexels.com/photos/8533136/pexels-photo-8533136.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Samsung R&D Training', 'Student Projects'],
    floors: [
      { name: 'Single Floor', rooms: ['Training Lab', 'Project Bays', 'Instructor Room'] },
    ],
    facilities: ['Advanced Training Lab', 'Wi-Fi', 'Project Space'],
    hours: 'Mon–Fri, 9:00 AM – 5:00 PM',
    mapX: 36,
    mapY: 56,
  },
  {
    id: 'research-labs',
    name: 'Research & Computing Labs',
    nameKn: 'ಸಂಶೋಧನೆ ಮತ್ತು ಕಂಪ್ಯೂಟಿಂಗ್ ಪ್ರಯೋಗಾಲಯಗಳು',
    nameHi: 'रिसर्च और कंप्यूटिंग लैब',
    category: 'Labs',
    description: {
      en: 'Shared computing and research facility with high-speed workstations, AI/ML lab time and project space for all branches.',
      kn: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳಿಗೆ ಕಂಪ್ಯೂಟಿಂಗ್ ಮತ್ತು ಸಂಶೋಧನಾ ಸೌಲಭ್ಯ.',
      hi: 'सभी शाखाओं के लिए कंप्यूटिंग और रिसर्च सुविधा।',
    },
    image:
      'https://images.pexels.com/photos/8533087/pexels-photo-8533087.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['AI & ML Lab', 'Data Science Lab', 'Cyber Security Lab'],
    floors: [
      { name: 'Ground Floor', rooms: ['Computing Labs 1–3', 'IT Help Desk'] },
      { name: 'First Floor', rooms: ['AI/ML Lab', 'Project Rooms'] },
    ],
    facilities: ['High-Speed Workstations', 'GPU Machines', 'Printing'],
    hours: 'Mon–Sat, 8:30 AM – 6:00 PM',
    mapX: 55,
    mapY: 60,
  },
  {
    id: 'main-canteen',
    name: 'Main Canteen',
    nameKn: 'ಮುಖ್ಯ ಅಪ್ಪಣೆ',
    nameHi: 'मुख्य कैंटीन',
    category: 'Canteen',
    description: {
      en: 'The central food hub of RNSIT with meals, snacks and beverages — the busiest spot during every break.',
      kn: 'ಆರ್‌ಎನ್‌ಎಸ್‌ಐಟಿ‌ನ ಕೇಂದ್ರ ಆಹಾರ ಕೇಂದ್ರ — ವಿರಾಮದ ಸಮಯದಲ್ಲಿ ಅತಿ ಜನನಿಬಿಡ ಸ್ಥಳ.',
      hi: 'आरएनएसआईटी का केंद्रीय भोजन केंद्र — ब्रेक के समय सबसे व्यस्त जगह।',
    },
    image:
      'https://images.pexels.com/photos/5506019/pexels-photo-5506019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Meal Counters', 'Juice Bar'],
    floors: [
      { name: 'Ground Level', rooms: ['Dining Hall', 'Counters 1–3', 'Wash Area'] },
    ],
    facilities: ['Vegetarian Counter', 'Card & UPI Accepted', 'Free Water Station'],
    hours: 'Mon–Sat, 7:30 AM – 6:00 PM',
    mapX: 70,
    mapY: 52,
  },
  {
    id: 'food-court',
    name: 'Food Court & Kiosk',
    nameKn: 'ಫುಡ್ ಕೋರ್ಟ್ ಮತ್ತು ಕಿಯಾಸ್ಕ್',
    nameHi: 'फूड कोर्ट और कियोस्क',
    category: 'Canteen',
    description: {
      en: 'Quick-bite kiosks and a juice corner between the academic blocks for coffee and snacks between lectures.',
      kn: 'ಉಪನ್ಯಾಸಗಳ ನಡುವೆ ಕಾಫಿ ಮತ್ತು ತಿಂಡಿಗಾಗಿ ಕಿಯಾಸ್ಕ್‌ಗಳು.',
      hi: 'लेक्चर के बीच कॉफी और स्नैक्स के लिए कियोस्क।',
    },
    image:
      'https://images.pexels.com/photos/36159723/pexels-photo-36159723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Coffee Kiosk', 'Snack Counter'],
    floors: [
      { name: 'Ground Level', rooms: ['Kiosks', 'Shaded Seating'] },
    ],
    facilities: ['Takeaway Window', 'Card & UPI Accepted'],
    hours: 'Mon–Sat, 8:00 AM – 6:00 PM',
    mapX: 40,
    mapY: 34,
  },
  {
    id: 'sports-ground',
    name: 'Sports Ground & Gym',
    nameKn: 'ಕ್ರೀಡಾ ಮೈದಾನ ಮತ್ತು ಜಿಮ್',
    nameHi: 'खेल मैदान और जिम',
    category: 'Facilities',
    description: {
      en: 'Large playground with cricket and football grounds, courts, and the RNSIT Sports Club activity area.',
      kn: 'ಕ್ರಿಕೆಟ್ ಮತ್ತು ಫುಟ್‌ಬಾಲ್ ಮೈದಾನಗಳು, ಕೋರ್ಟ್‌ಗಳು ಮತ್ತು ಕ್ರೀಡಾ ಕ್ಲಬ್ ಚಟುವಟಿಕೆ ಪ್ರದೇಶ.',
      hi: 'क्रिकेट और फुटबॉल मैदान, कोर्ट और स्पोर्ट्स क्लब गतिविधि क्षेत्र।',
    },
    image:
      'https://images.pexels.com/photos/5407033/pexels-photo-5407033.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Physical Education Dept', 'Sports Club'],
    floors: [
      { name: 'Ground Level', rooms: ['Playground', 'Courts', 'Gym Room'] },
    ],
    facilities: ['Cricket Ground', 'Indoor Games', 'Gym'],
    hours: 'Mon–Sat, 6:00 AM – 7:00 PM',
    mapX: 16,
    mapY: 80,
  },
  {
    id: 'admin-block',
    name: 'Administrative Block',
    nameKn: 'ಆಡಳಿತ ಬ್ಲಾಕ್',
    nameHi: 'प्रशासनिक ब्लॉक',
    category: 'Facilities',
    description: {
      en: 'Principal\'s office, admission cell, examination cell, accounts and other administrative offices near the main entrance.',
      kn: 'ಪ್ರಾಂಶುಪಾಲರ ಕಚೇರಿ, ಪ್ರವೇಶ ಕಚೇರಿ, ಪರೀಕ್ಷಾ ವಿಭಾಗ ಮತ್ತು ಇತರ ಆಡಳಿತ ಕಚೇರಿಗಳು.',
      hi: 'प्रिंसिपल कार्यालय, प्रवेश कक्ष, परीक्षा कक्ष और अन्य प्रशासनिक कार्यालय।',
    },
    image:
      'https://images.pexels.com/photos/32982365/pexels-photo-32982365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    departments: ['Principal\'s Office', 'Admission Cell', 'Examination Cell', 'Accounts'],
    floors: [
      { name: 'Ground Floor', rooms: ['Reception', 'Admission Cell', 'Examination Cell'] },
      { name: 'First Floor', rooms: ['Principal\'s Office', 'Accounts Section'] },
    ],
    facilities: ['Reception', 'Student Services', 'Fee Counter'],
    hours: 'Mon–Sat, 9:00 AM – 4:30 PM',
    mapX: 78,
    mapY: 30,
  },
];

/** All known names/keywords for a location (used by search + AI assistant matching). */
export function locationKeywords(loc: CampusLocation): string[] {
  return [
    loc.name,
    loc.nameKn ?? '',
    loc.nameHi ?? '',
    loc.category,
    ...loc.departments,
  ]
    .join(' ')
    .toLowerCase();
}

export function getLocationById(id: string | undefined): CampusLocation | undefined {
  return CAMPUS_LOCATIONS.find((l) => l.id === id);
}
