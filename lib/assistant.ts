/**
 * Palm AI — bilingual (English / தமிழ்) school knowledge base & matching engine.
 *
 * Mirrors public information on palmschooledu.com. Dependency-free: questions
 * are scored against bilingual keyword sets and the best match wins. When
 * nothing matches confidently we fall back to a hand-off that escalates to
 * WhatsApp / phone / email.
 */

export type Lang = "en" | "ta";

export type Knowledge = {
  id: string;
  /** English + Tanglish trigger words/phrases. */
  en: string[];
  /** Tamil script trigger words/phrases (stems work — prefix matching). */
  ta: string[];
  /** The answer in both languages. "\n" renders as line breaks. */
  a: { en: string; ta: string };
  /** Show WhatsApp / call / email escalation actions with this answer. */
  escalate?: boolean;
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Lower-case, strip punctuation, collapse whitespace (keeps Tamil letters). */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s:]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when the text contains Tamil script (U+0B80–U+0BFF). */
export function containsTamil(s: string): boolean {
  return /[\u0B80-\u0BFF]/.test(s);
}

/* ------------------------------------------------------------------ */
/* Fallback + greeting                                                */
/* ------------------------------------------------------------------ */

export const FALLBACK: Record<Lang, string> = {
  en: "I'm not sure about that one yet! Try asking me about admissions, fees, timings, streams, transport or facilities — or reach the school directly:\n📞 +91 99404 85774 · ✉️ palmmatric@gmail.com",
  ta: "இதுபற்றி எனக்கு உறுதியாகத் தெரியவில்லை! சேர்க்கை, கட்டணம், நேரம், பாடக் குழுக்கள், போக்குவரத்து அல்லது வசதிகள் பற்றி கேட்டுப் பாருங்கள் — அல்லது பள்ளியை நேரில் தொடர்புகொள்ளுங்கள்:\n📞 +91 99404 85774 · ✉️ palmmatric@gmail.com",
};

export const GREETING: Record<Lang, string> = {
  en: "Hello! I'm Palm AI, the assistant of Palm Matric Hr. Sec. School. Ask me anything about admissions, fees, timings, streams, transport or campus life — in English or Tamil.",
  ta: "வணக்கம்! நான் Palm AI — பாம் மெட்ரிக் மேல்நிலைப் பள்ளியின் உதவியாளர். சேர்க்கை, கட்டணம், நேரம், பாடக் குழுக்கள், போக்குவரத்து அல்லது வளாக வாழ்க்கை பற்றி எதை வேண்டுமானாலும் தமிழிலோ ஆங்கிலத்திலோ கேளுங்கள்.",
};

/* ------------------------------------------------------------------ */
/* Knowledge base                                                     */
/* ------------------------------------------------------------------ */

export const KNOWLEDGE: Knowledge[] = [
  {
    id: "admission-apply",
    en: [
      "admission", "admissions", "apply", "application", "enquire", "enquiry",
      "how to join", "join your school", "seat", "registration", "form",
    ],
    ta: ["சேர்க்கை", "சேர", "விண்ணப்பம்", "விண்ணப்பிக்க", "இடம்", "பதிவு"],
    a: {
      en: "Admissions for the 2026 academic year are open! Four simple steps:\n1) Enquire — call or visit our office to learn about courses, fees and facilities.\n2) Apply — fill in the admission form (on our Admissions page or at the office).\n3) Meet Us — a friendly interaction with the student and parents.\n4) Confirm — submit the required documents and confirm the seat.\nCall +91 99404 85774 and our office will call you back within one working day.",
      ta: "2026 கல்வியாண்டுக்கான சேர்க்கைத் திறந்துள்ளது! நான்கு எளிய படிகள்:\n1) விசாரணை — பாடங்கள், கட்டணம், வசதிகள் பற்றி அறிய அலுவலகத்தை அழையுங்கள் அல்லது நேரில் பார்வையிடுங்கள்.\n2) விண்ணப்பம் — சேர்க்கைப் படிவத்தை நிரப்புங்கள்.\n3) எங்களைச் சந்தியுங்கள் — மாணவர் மற்றும் பெற்றோருடன் நட்பான சந்திப்பு.\n4) உறுதிப்படுத்துங்கள் — தேவையான ஆவணங்களைச் சமர்ப்பித்து இடத்தை உறுதிப்படுத்துங்கள்.\n+91 99404 85774 என்ற எண்ணில் அழையுங்கள் — ஒரு வேலை நாளுக்குள் அலுவலகம் உங்களைத் தொடர்புகொள்ளும்.",
    },
    escalate: true,
  },
  {
    id: "admission-documents",
    en: ["document", "documents", "certificate", "transfer certificate", "tc", "mark sheet", "id proof", "what to bring"],
    ta: ["ஆவணம்", "ஆவணங்கள்", "சான்றிதழ்", "மதிப்பெண்", "மாற்றச் சான்றிதழ்"],
    a: {
      en: "For admission you'll generally need the child's transfer certificate (TC), previous mark sheets, birth certificate and ID/address proof. Our office will confirm the exact list for your child's grade — call +91 99404 85774.",
      ta: "சேர்க்கைக்கு பொதுவாகக் குழந்தையின் இடமாற்றச் சான்றிதழ் (TC), முந்தைய மதிப்பெண் சான்றிதழ்கள், பிறப்புச் சான்றிதழ் மற்றும் அடையாள/முகவரிச் சான்று தேவை. உங்கள் குழந்தையின் வகுப்புக்கான சரியான பட்டியலை அலுவலகம் உறுதிப்படுத்தும் — +91 99404 85774.",
    },
    escalate: true,
  },
  {
    id: "fees",
    en: ["fee", "fees", "fee structure", "cost", "price", "tuition", "how much", "affordable", "payment", "pay"],
    ta: ["கட்டணம்", "கட்டணங்கள்", "செலவு", "விலை", "எவ்வளவு"],
    a: {
      en: "We believe in quality education at an affordable cost. The fee structure varies by grade — please contact the office on +91 99404 85774 or mail palmmatric@gmail.com for the current year's detailed fee structure.",
      ta: "தரமான கல்வியை மலிவான செலவில் வழங்குவதில் நாங்கள் நம்பிக்கை கொண்டுள்ளோம். கட்டண அமைப்பு வகுப்புக்கு வகுப்பு மாறுபடுகிறது — நடப்பாண்டு விரிவான கட்டண விவரங்களுக்கு +91 99404 85774 என்ற எண்ணில் அலுவலகத்தைத் தொடர்புகொள்ளுங்கள் அல்லது palmmatric@gmail.com க்கு மின்னஞ்சல் அனுப்புங்கள்.",
    },
    escalate: true,
  },
  {
    id: "timings",
    en: ["timing", "timings", "time", "hours", "schedule", "when", "open", "close", "monday", "saturday", "9 am", "4 pm"],
    ta: ["நேரம்", "நேரங்கள்", "அட்டவணை", "எப்போது", "திற", "மூட"],
    a: {
      en: "Classes generally run from 9:00 AM to 4:00 PM, Monday to Saturday. Office hours are 9:00 AM to 5:00 PM. Exact timings for your child's grade are shared at the time of admission.",
      ta: "வகுப்புகள் பொதுவாக திங்கள் முதல் சனி வரை காலை 9:00 முதல் மாலை 4:00 வரை நடைபெறும். அலுவலக நேரம் காலை 9:00 முதல் மாலை 5:00 வரை. உங்கள் குழந்தையின் வகுப்புக்கான சரியான நேரங்கள் சேர்க்கையின் போது பகிர்ந்தளிக்கப்படும்.",
    },
  },
  {
    id: "curriculum",
    en: ["curriculum", "syllabus", "board", "state board", "tamil nadu", "which syllabus", "education system", "matric"],
    ta: ["பாடத்திட்டம்", "பாடம்", "பாடங்கள்", "கல்வி", "மெட்ரிக்"],
    a: {
      en: "We follow the Tamil Nadu State Board curriculum for Classes 1 to 12, with four specialised academic groups offered at the higher secondary level (Classes 11 and 12).",
      ta: "நாங்கள் தமிழ்நாடு மாநிலக் கல்விவாரியப் பாடத்திட்டத்தை வகுப்பு 1 முதல் 12 வரை பின்பற்றுகிறோம்; உயர்நிலைப் பள்ளி நிலையில் (வகுப்பு 11 மற்றும் 12) நான்கு சிறப்புக் கல்விக் குழுக்கள் வழங்கப்படுகின்றன.",
    },
  },
  {
    id: "streams",
    en: ["stream", "streams", "group", "groups", "science", "biology", "commerce", "computer science", "zoology", "botany", "accountancy", "economics", "physics", "chemistry", "maths", "mathematics", "which group", "subjects"],
    ta: ["குழு", "பாடக் குழு", "அறிவியல்", "உயிரியல்", "வணிகம்", "கணினி", "பாடங்கள் என்ன"],
    a: {
      en: "Four academic groups at Classes 11–12:\n1) Science & Technology — Computer Science, Mathematics, Physics, Chemistry\n2) Life Sciences — Biology, Mathematics, Physics, Chemistry\n3) Advanced Sciences — Physics, Chemistry, Botany, Zoology\n4) Business Studies — Computer Application, Commerce, Economics, Accountancy\nNot sure which fits your child? Our teachers will help you choose.",
      ta: "வகுப்பு 11–12-ல் நான்கு கல்விக் குழுக்கள்:\n1) அறிவியல் & தொழில்நுட்பம் — கணினி அறிவியல், கணிதம், இயற்பியல், வேதியியல்\n2) உயிர்அறிவியல்கள் — உயிரியல், கணிதம், இயற்பியல், வேதியியல்\n3) மேம்பட்ட அறிவியல்கள் — இயற்பியல், வேதியியல், தாவரவியல், விலங்கியல்\n4) வணிகப் படிப்புகள் — கணினி பயன்பாடு, வணிகம், பொருளாதாரம், கணக்கியல்\nஎந்தக் குழு உங்கள் குழந்தைக்குப் பொருந்தும் என்று தெரியவில்லையா? எங்கள் ஆசிரியர்கள் தேர்ந்தெடுக்க உதவுவார்கள்.",
    },
  },
  {
    id: "classes",
    en: ["class", "classes", "grade", "grades", "standard", "lkg", "ukg", "which class", "primary", "middle", "secondary", "higher secondary", "age"],
    ta: ["வகுப்பு", "வகுப்புகள்", "தரம்", "எந்த வகுப்பு", "முதல் வகுப்பு", "பத்தாம் வகுப்பு"],
    a: {
      en: "We offer LKG and UKG through Class 10, plus Classes 11 and 12 (higher secondary). Journey: Primary (1–5), Middle (6–8), Secondary (9–10), Higher Secondary (11–12).",
      ta: "LKG, UKG முதல் 10-ஆம் வகுப்பு வரை, மேலும் 11 மற்றும் 12 (உயர்நிலை) வகுப்புகள் உள்ளன. பயணம்: தொடக்க (1–5), நடுநிலை (6–8), இரண்டாம் நிலை (9–10), உயர்நிலை (11–12).",
    },
  },
  {
    id: "transport",
    en: ["transport", "bus", "route", "drop", "pickup", "conveyance", "van"],
    ta: ["போக்குவரத்து", "பேருந்து", "வழி", "வண்டி"],
    a: {
      en: "Yes — school transport is available for students across Thiruthuraipoondi and nearby areas. Contact our office for routes and fees.",
      ta: "ஆம் — திருத்துறைப்பூண்டி மற்றும் சுற்றுவட்டாரப் பகுதிகளில் உள்ள மாணவர்களுக்குப் பள்ளிப் போக்குவரத்து வசதி உள்ளது. வழித்தடங்கள் மற்றும் கட்டணங்களுக்கு எங்கள் அலுவலகத்தைத் தொடர்புகொள்ளுங்கள்.",
    },
    escalate: true,
  },
  {
    id: "facilities",
    en: ["facility", "facilities", "lab", "laboratory", "library", "classroom", "smart class", "computer lab", "science lab", "infrastructure", "campus", "ground", "amenities"],
    ta: ["வசதி", "வசதிகள்", "ஆய்வகம்", "நூலகம்", "வகுப்பறை", "வளாகம்"],
    a: {
      en: "Our facilities: modern classrooms with smart-class support, physics/chemistry/biology labs, a computer lab, a growing library, a sports ground (volleyball, throwball, athletics) and a safe, caring campus.",
      ta: "எங்கள் வசதிகள்: ஸ்மார்ட் வகுப்பு ஆதரவுடன் கூடிய நவீன வகுப்பறைகள், இயற்பியல்/வேதியியல்/உயிரியல் ஆய்வகங்கள், கணினி ஆய்வகம், வளர்ந்து வரும் நூலகம், விளையாட்டு மைதானம் (வாலிபால், த்ரோபால், தடகளம்) மற்றும் பாதுகாப்பான அக்கறையான வளாகம்.",
    },
  },
  {
    id: "activities",
    en: ["activity", "activities", "sports", "extracurricular", "extra curricular", "annual day", "science expo", "cultural", "competition", "volleyball", "throwball", "athletics", "club"],
    ta: ["விளையாட்டு", "நிகழ்வு", "நிகழ்வுகள்", "போட்டி", "கலை", "விளையாட்டுகள்"],
    a: {
      en: "Students enjoy sports (volleyball, throwball, athletics), science expos, annual day, cultural programmes, graduation day and inter-school competitions — our teams have even won district-level trophies!",
      ta: "மாணவர்கள் விளையாட்டுகள் (வாலிபால், த்ரோபால், தடகளம்), அறிவியல் கண்காட்சி, ஆண்டுவிழா, பண்பாட்டு நிகழ்ச்சிகள், பட்டமளிப்பு விழா மற்றும் பள்ளிகளுக்கு இடையேயான போட்டிகளை அனுபவிக்கிறார்கள் — எங்கள் அணிகள் மாவட்டக் கோப்பைகளையும் வென்றுள்ளன!",
    },
  },
  {
    id: "events",
    en: ["event", "events", "news", "celebration", "republic day", "independence day", "annual day", "sports day", "expo", "latest", "happening"],
    ta: ["செய்தி", "செய்திகள்", "நிகழ்வுகள்", "கொண்டாட்டம்", "விழா"],
    a: {
      en: "Recent highlights: 77th Republic Day & 10th Annual Day (Jan 2026), 9th Annual Sports Day, Science Expo 2025, Independence Day, UKG Graduation — plus district wins in 200m/400m, volleyball and throwball. See our News & Events page!",
      ta: "சமீபத்திய நிகழ்வுகள்: 77-வது குடியரசு தினம் & 10-வது ஆண்டுவிழா (ஜனவரி 2026), 9-வது ஆண்டு விளையாட்டு தினம், அறிவியல் கண்காட்சி 2025, சுதந்திர தினம், UKG பட்டமளிப்பு — மேலும் 200m/400m, வாலிபால், த்ரோபாலில் மாவட்ட வெற்றிகள். எங்கள் செய்திகள் & நிகழ்வுகள் பக்கத்தைப் பாருங்கள்!",
    },
  },
  {
    id: "teachers",
    en: ["teacher", "teachers", "faculty", "staff", "principal", "contact a teacher", "mentor", "who teaches"],
    ta: ["ஆசிரியர்", "ஆசிரியர்கள்", "முதல்வர்", "பணியாளர்"],
    a: {
      en: "Our experienced, caring faculty know every student by name and mentor them through exams and career choices. To reach a teacher, contact the office on +91 99404 85774 or mail palmmatric@gmail.com — parents' meetings are held regularly.",
      ta: "எங்கள் அனுபவமிக்க, அக்கறையான ஆசிரியர்கள் ஒவ்வொரு மாணவரையும் பெயரால் அறிவார்கள்; தேர்வுகள் மற்றும் தொழில் தேர்வில் வழிநடத்துவார்கள். ஆசிரியரைத் தொடர்புகொள்ள +91 99404 85774 அல்லது palmmatric@gmail.com — பெற்றோர் சந்திப்புகள் தவறாமல் நடைபெறும்.",
    },
    escalate: true,
  },
  {
    id: "contact",
    en: ["contact", "phone", "number", "call", "email", "mail", "address", "where", "location", "reach you", "office", "whatsapp", "directions"],
    ta: ["தொடர்பு", "தொலைபேசி", "மின்னஞ்சல்", "முகவரி", "எங்கே", "அழை", "எண்"],
    a: {
      en: "📞 Phone: +91 99404 85774\n✉️ Email: palmmatric@gmail.com\n📍 Address: ECR Road, Kallikkudi, Thiruthuraipoondi - TK, Thiruvarur District - 614703\n🕘 Office hours: Monday–Saturday, 9:00 AM – 5:00 PM",
      ta: "📞 தொலைபேசி: +91 99404 85774\n✉️ மின்னஞ்சல்: palmmatric@gmail.com\n📍 முகவரி: ECR சாலை, கல்லிக்குடி, திருத்துறைப்பூண்டி - TK, திருவாரூர் மாவட்டம் - 614703\n🕘 அலுவலக நேரம்: திங்கள்–சனி, காலை 9:00 – மாலை 5:00",
    },
    escalate: true,
  },
  {
    id: "about",
    en: ["about", "history", "established", "founded", "since", "2012", "who are you", "what is palm", "palm matric", "chairman", "arif"],
    ta: ["பற்றி", "அறிமுகம்", "நிறுவப்பட்டது", "யார்", "பாம் மெட்ரிக்"],
    a: {
      en: "Palm Matric Hr. Sec. School was established in 2012 in Thiruthuraipoondi and has since taught 10,000+ students. Led by Chairman Dr. Arif, we offer the Tamil Nadu State Board curriculum (Classes 1–12) with affordable fees, modern facilities and a caring campus.",
      ta: "பாம் மெட்ரிக் மேல்நிலைப் பள்ளி 2012-ல் திருத்துறைப்பூண்டியில் நிறுவப்பட்டது; அதன் பின் 10,000+ மாணவர்களுக்குக் கல்வி அளித்துள்ளது. தலைவர் டாக்டர் ஆரிப் தலைமையில், தமிழ்நாடு மாநிலக் கல்விவாரியப் பாடத்திட்டம் (வகுப்பு 1–12), மலிவான கட்டணம், நவீன வசதிகள் மற்றும் அக்கறையான வளாகம் வழங்கப்படுகிறது.",
    },
  },
  {
    id: "achievements",
    en: ["result", "results", "achievement", "achievements", "record", "district", "winner", "won", "prize", "rank", "selection", "topper"],
    ta: ["சாதனை", "சாதனைகள்", "வெற்றி", "மதிப்பெண்", "பரிசு"],
    a: {
      en: "Our students shine! Recent achievements: 1st place in district Under-19 200m, 2nd place in 400m (both district-selected), district-level winners in Under-17 volleyball and Under-14 throwball.",
      ta: "எங்கள் மாணவர்கள் சிறக்கிறார்கள்! சமீபத்திய சாதனைகள்: மாவட்ட அளவில் U-19 200-மீட்டரில் 1-ம் இடம், 400-மீட்டரில் 2-ம் இடம் (இருவரும் மாவட்டத் தேர்வு), U-17 வாலிபால் மற்றும் U-14 த்ரோபாலில் மாவட்ட அளவில் வெற்றியாளர்கள்.",
    },
  },
  {
    id: "safety",
    en: ["safe", "safety", "security", "bullying", "care", "caring", "discipline", "hostel"],
    ta: ["பாதுகாப்பு", "பாதுகாப்பான", "ஒழுக்கம்"],
    a: {
      en: "Student safety comes first — our campus is a secure, caring environment where children thrive, with staff looking after them throughout the school day.",
      ta: "மாணவர் பாதுகாப்பே முதன்மை — பள்ளி நாள் முழுவதும் பணியாளர்கள் கவனிப்புடன், பாதுகாப்பான அக்கறையான சூழலில் குழந்தைகள் செழித்து வளர்கிறார்கள்.",
    },
  },
  {
    id: "medium",
    en: ["medium", "language", "english", "tamil", "instruction", "english medium", "tamil medium", "speak"],
    ta: ["மொழி", "ஆங்கிலம்", "தமிழ்", "கற்பித்தல் மொழி"],
    a: {
      en: "For details about the medium of instruction for your child's grade, please ask the office on +91 99404 85774 — they'll confirm what's available for each class.",
      ta: "உங்கள் குழந்தையின் வகுப்புக்கான கற்பித்தல் மொழி விவரங்களுக்கு +91 99404 85774 என்ற எண்ணில் அலுவலகத்திடம் கேளுங்கள் — ஒவ்வொரு வகுப்புக்கும் என்ன உள்ளது என்று உறுதிப்படுத்துவார்கள்.",
    },
    escalate: true,
  },
  {
    id: "visit",
    en: ["visit", "tour", "campus visit", "come and see", "walk around", "see the school", "appointment"],
    ta: ["வருகை", "பார்வை", "சுற்றுலா", "பார்க்க வரலாமா"],
    a: {
      en: "We'd love to show you around! Book a campus visit by calling +91 99404 85774, mailing palmmatric@gmail.com, or via our Contact page — our team will happily walk you through the classrooms, labs and grounds.",
      ta: "உங்களைச் சுற்றிக் காட்ட விரும்புகிறோம்! +91 99404 85774 என்ற எண்ணில் அழைத்தோ, palmmatric@gmail.com-க்கு மின்னஞ்சல் அனுப்பியோ, தொடர்புப் பக்கத்தின் வழியாகவோ வளாகப் பார்வையை முன்பதிவு செய்யுங்கள் — வகுப்பறைகள், ஆய்வகங்கள் மற்றும் மைதானங்களைக் காட்ட எங்கள் குழு மகிழ்ச்சியடையும்.",
    },
    escalate: true,
  },
  {
    id: "whatsapp",
    en: ["whatsapp", "whats app", "chat", "message us", "text us", "online"],
    ta: ["வாட்ஸ்அப்", "வாட்ஸ்ஆப்", "உரையாடல்"],
    a: {
      en: "Sure! Tap 'Continue on WhatsApp' below and you'll open a chat with our school (+91 99404 85774). You can also call or email us anytime.",
      ta: "நிச்சயமாக! கீழே உள்ள 'WhatsApp-இல் தொடருங்கள்' என்பதை அழுத்தினால் எங்கள் பள்ளியுடன் (+91 99404 85774) உரையாடல் திறக்கும். நீங்கள் எப்போது வேண்டுமானாலும் அழைக்கவோ மின்னஞ்சல் அனுப்பவோ முடியும்.",
    },
    escalate: true,
  },
  {
    id: "holidays",
    en: ["holiday", "holidays", "leave", "vacation", "closed", "break", "diwali", "puja"],
    ta: ["விடுமுறை", "விடுமுறைகள்", "விழா"],
    a: {
      en: "For holiday lists and vacation dates, please check our News & Events page or ask the office on +91 99404 85774.",
      ta: "விடுமுறைப் பட்டியல் மற்றும் விடுமுறை தேதிகளுக்கு எங்கள் செய்திகள் & நிகழ்வுகள் பக்கத்தைப் பாருங்கள் அல்லது +91 99404 85774 என்ற எண்ணில் அலுவலகத்திடம் கேளுங்கள்.",
    },
    escalate: true,
  },
  {
    id: "results-board",
    en: ["board exam", "pass percentage", "exam result", "sslc result", "public exam", "10th result", "12th result"],
    ta: ["பொதுத்தேர்வு", "வாரியத் தேர்வு", "தேர்வு முடிவு", "பத்தாம் வகுப்பு முடிவு"],
    a: {
      en: "For our latest board exam results and highlights, please contact the office on +91 99404 85774 or mail palmmatric@gmail.com — we're happy to share the details.",
      ta: "எங்கள் சமீபத்திய வாரியத் தேர்வு முடிவுகள் மற்றும் சிறப்பம்சங்களுக்கு +91 99404 85774 என்ற எண்ணில் அலுவலகத்தைத் தொடர்புகொள்ளுங்கள் அல்லது palmmatric@gmail.com க்கு மின்னஞ்சல் அனுப்புங்கள்.",
    },
    escalate: true,
  },
];

/* ------------------------------------------------------------------ */
/* Matching engine                                                     */
/* ------------------------------------------------------------------ */

export type Reply = {
  /** Answer text in the resolved language. */
  text: string;
  /** Resolved language (Tamil input always wins; otherwise the site language). */
  lang: Lang;
  /** Whether to show escalation actions under this reply. */
  escalate: boolean;
};

/** Score one entry against a normalized query. */
function score(qTokens: string[], qNorm: string, entry: Knowledge): number {
  let s = 0;
  const all = [...entry.en, ...entry.ta];
  for (const raw of all) {
    const kw = normalize(raw);
    if (!kw) continue;
    if (kw.includes(" ")) {
      // multi-word phrase: must appear as a substring
      if (qNorm.includes(kw)) s += 2;
    } else {
      // single word: exact token, or stem/prefix match either way
      const hit = qTokens.some(
        (t) => t === kw || (kw.length > 3 && t.startsWith(kw)) || (t.length > 3 && t.startsWith(kw)),
      );
      if (hit) s += 1;
    }
  }
  return s;
}

/**
 * Resolve an answer for `input`.
 * - Tamil script in the input → Tamil reply (auto-detect).
 * - Otherwise the site language decides.
 * - Below a confidence threshold we hand off to the school.
 */
export function getReply(input: string, siteLang: Lang): Reply {
  const lang: Lang = containsTamil(input) ? "ta" : siteLang;
  const qNorm = normalize(input);
  const qTokens = qNorm ? qNorm.split(" ") : [];
  if (qTokens.length === 0) return { text: GREETING[lang], lang, escalate: false };

  // very short greetings
  const greetings = ["hi", "hello", "hey", "vanakkam", "வணக்கம்", "good morning", "good evening", "salaam"];
  if (qTokens.length <= 3 && greetings.some((g) => qTokens.includes(normalize(g)))) {
    return { text: GREETING[lang], lang, escalate: false };
  }

  let best: Knowledge | null = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE) {
    const s = score(qTokens, qNorm, entry);
    if (s > bestScore) {
      bestScore = s;
      best = entry;
    }
  }

  // a single solid keyword match is enough to answer
  if (best && bestScore >= 1) {
    return { text: best.a[lang], lang, escalate: best.escalate ?? false };
  }

  return { text: FALLBACK[lang], lang, escalate: true };
}
