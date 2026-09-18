import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './index.css';

// --- EmailJS Configuration (v4 Pattern) ---
const EMAILJS_SERVICE_ID = 'service_8wqlo1l';
const EMAILJS_TEMPLATE_ID = 'template_cgljsyo';
const EMAILJS_PUBLIC_KEY = '7EcCv5WYAvoAx4-I-';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// --- ScrollReveal Wrapper Component ---
const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
      style={isVisible ? { animationDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
};

// --- Translation Dictionary ---
const translations = {
  en: {
    brand: "Sachhetvastu",
    navHome: "Home",
    navCatalog: "Catalog",
    bookCall: "Book Discovery Call",
    heroTag: "VIBRANT SPACES & ENERGIES",
    heroTitle1: "Harmonize Your",
    heroTitle2: "Living Spaces",
    heroDesc: "Expert Vastu guidance, numerology, and healing modalities tailored to align your environment with natural energies, maximizing prosperity, health, and peace of mind.",
    viewCatalog: "Explore Catalog",
    aboutTitle1: "The Science of",
    aboutTitle2: "Vastu & Energy",
    aboutDesc: "Vastu is the ancient Indian science of architecture and design, aimed at creating a harmonious environment. By balancing the five elements of nature—earth, water, fire, air, and space—we can unlock positive energy, bringing prosperity, happiness, and health into your residential and commercial spaces.",
    servicesTitle: "Services Offered",
    testimonialsTitle: "Client Success Stories",
    contactTitle: "Get in Touch",
    contactDesc: "Ready to harmonize your space? Leave your details below and view our complete catalog of professional services.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formPropType: "Property Type",
    formResidential: "Residential",
    formCommercial: "Commercial",
    formSubmit: "Send Request",
    footerRights: "All rights reserved.",
    searchPlaceholder: "Search services...",
    allCategories: "All Services",
    numerology: "Numerology",
    vastu: "Vastu Consultation",
    healing: "Healing",
    backToHome: "← Back to Home"
  },
  hi: {
    brand: "सचेतवास्तु",
    navHome: "होम",
    navCatalog: "कैटलॉग",
    bookCall: "परामर्श बुक करें",
    heroTag: "ऊर्जा और वास्तु उत्कृष्टता",
    heroTitle1: "अपने स्थानों को",
    heroTitle2: "सामंजस्यपूर्ण बनाएं",
    heroDesc: "विशेषज्ञ वास्तु मार्गदर्शन, अंक ज्योतिष और हीलिंग पद्धतियाँ जो आपके पर्यावरण को प्राकृतिक ऊर्जा के साथ संरेखित करती हैं।",
    viewCatalog: "कैटलॉग देखें",
    aboutTitle1: "विज्ञान:",
    aboutTitle2: "वास्तु और ऊर्जा",
    aboutDesc: "वास्तु वास्तुकला और डिजाइन का प्राचीन भारतीय विज्ञान है। प्रकृति के पांच तत्वों को संतुलित करके, हम सकारात्मक ऊर्जा को खोलते हैं, जिससे समृद्धि और शांति आती है।",
    servicesTitle: "प्रदान की जाने वाली सेवाएँ",
    testimonialsTitle: "ग्राहकों के अनुभव",
    contactTitle: "हमसे संपर्क करें",
    contactDesc: "क्या आप अपने स्थान को सामंजस्यपूर्ण बनाने के लिए तैयार हैं? अपना विवरण नीचे दें और हमारा संपूर्ण कैटलॉग देखें।",
    formName: "पूरा नाम",
    formEmail: "ईमेल पता",
    formPhone: "फोन नंबर",
    formPropType: "संपत्ति का प्रकार",
    formResidential: "आवासीय",
    formCommercial: "व्यावसायिक",
    formSubmit: "अनुरोध भेजें",
    footerRights: "सर्वाधिकार सुरक्षित。",
    searchPlaceholder: "सेवाएँ खोजें...",
    allCategories: "सभी सेवाएँ",
    numerology: "अंक ज्योतिष (Numerology)",
    vastu: "वास्तु परामर्श (Vastu)",
    healing: "हीलिंग (Healing)",
    backToHome: "← होम पर वापस जाएँ"
  }
};

// --- Updated Notebook Pricing & Images ---
const catalogItems = [
  // Numerology
  { 
    id: 1, categoryKey: "numerology", price: 3200, 
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
    name: { en: "Name Correction", hi: "नाम सुधार (Name Correction)" }, 
    desc: { en: "Auspicious name adjustments for enhanced personal vibration.", hi: "बेहतर व्यक्तिगत कंपन के लिए शुभ नाम समायोजन।" } 
  },
  { 
    id: 2, categoryKey: "numerology", price: 3200, 
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    name: { en: "Vehicle, House & Phone Number Suggestions", hi: "वाहन, मकान और फोन नंबर सुझाव" }, 
    desc: { en: "Aligning everyday digits with your lucky numerology matrix.", hi: "दैनिक अंकों को आपके भाग्यशाली अंक ज्योतिष मैट्रिक्स के साथ संरेखित करना।" } 
  },
  { 
    id: 3, categoryKey: "numerology", price: 3200, 
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    name: { en: "DOB Analysis & Life Transforming Remedies", hi: "जन्मतिथि विश्लेषण और जीवन बदलने वाले उपाय" }, 
    desc: { en: "Detailed date-of-birth breakdown with practical corrective measures.", hi: "व्यावहारिक सुधारात्मक उपायों के साथ विस्तृत जन्मतिथि विश्लेषण।" } 
  },
  { 
    id: 4, categoryKey: "numerology", price: 3200, 
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop",
    name: { en: "Newborn Baby Name Recommendation", hi: "नवजात शिशु का नामकरण सुझाव" }, 
    desc: { en: "Vibrationally aligned auspicious naming for newborns.", hi: "नवजात शिशुओं के लिए ऊर्जावान रूप से संरेखित शुभ नामकरण।" } 
  },
  { 
    id: 5, categoryKey: "numerology", price: 5500, 
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    name: { en: "Complete Numerology Consultation", hi: "संपूर्ण अंक ज्योतिष परामर्श" }, 
    desc: { en: "Comprehensive numerological deep dive covering all life aspects.", hi: "सभी जीवन पहलुओं को कवर करने वाली व्यापक अंक ज्योतिष रिपोर्ट।" } 
  },

  // Vastu Consultation
  { 
    id: 6, categoryKey: "vastu", price: 10000, 
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
    name: { en: "Online Vastu Consultations (Residential / Business)", hi: "ऑनलाइन वास्तु परामर्श (आवासीय / व्यावसायिक)" }, 
    desc: { en: "Remote blueprint analysis and energy correction guidance.", hi: "रिमोट ब्लूप्रिंट विश्लेषण और ऊर्जा सुधार मार्गदर्शन।" } 
  },
  { 
    id: 7, categoryKey: "vastu", price: 23000, 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    name: { en: "Residential Vastu (Local Site Visit)", hi: "आवासीय वास्तु (लोकल साइट विजिट)" }, 
    desc: { en: "For properties up to 2,000 sq. ft. per floor.", hi: "2,000 वर्ग फुट प्रति मंजिल तक की संपत्तियों के लिए।" } 
  },
  { 
    id: 8, categoryKey: "vastu", price: 32000, 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    name: { en: "Commercial Vastu (Local Site Visit)", hi: "व्यावसायिक वास्तु (लोकल साइट विजिट)" }, 
    desc: { en: "For commercial spaces up to 2,000 sq. ft. per floor.", hi: "2,000 वर्ग फुट प्रति मंजिल तक के व्यावसायिक स्थानों के लिए।" } 
  },
  { 
    id: 9, categoryKey: "vastu", price: 55000, 
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    name: { en: "Factory Vastu (Local Site Visit)", hi: "फैक्ट्री वास्तु (लोकल साइट विजिट)" }, 
    desc: { en: "For industrial units & factories up to 5,000 sq. ft. per floor.", hi: "5,000 वर्ग फुट प्रति मंजिल तक की औद्योगिक इकाइयों और फैक्ट्रियों के लिए।" } 
  },

  // Healing
  { 
    id: 10, categoryKey: "healing", price: 5000, 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    name: { en: "Reiki Healing (Long Distance with Symbols - 5 Days)", hi: "रेiki हीलिंग (दूरस्थ प्रतीकों के साथ - 5 दिन)" }, 
    desc: { en: "Powerful distance energy clearing and chakra balancing over 5 days.", hi: "5 दिनों में शक्तिशाली दूरस्थ ऊर्जा सफाई और चक्र संतुलन।" } 
  },
  { 
    id: 11, categoryKey: "healing", price: 5000, 
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    name: { en: "Angelic Healing (5 Days)", hi: "एंजेलिक हीलिंग (5 दिन)" }, 
    desc: { en: "Divine light intervention and emotional trauma clearing.", hi: "दिव्य प्रकाश हस्तक्षेप और भावनात्मक आघात सफाई।" } 
  },
  { 
    id: 12, categoryKey: "healing", price: 11000, 
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", // Replaced with serene spiritual meditation image
    name: { en: "Angelic Healing (11 Days - Deep Immersion)", hi: "एंजेलिक हीलिंग (11 दिन - गहन सत्र)" }, 
    desc: { en: "Extended 11-day intensive spiritual rejuvenation program.", hi: "विस्तृत 11-दिवसीय गहन आध्यात्मिक कायाकल्प कार्यक्रम।" } 
  }
];

const reviews = [
  { 
    id: 1, 
    name: "Aarav Sharma", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", 
    text: { en: "Sachhetvastu completely transformed the energy in our new office. Productivity has noticeably increased!", hi: "सचेतवास्तु ने हमारे नए कार्यालय में ऊर्जा को पूरी तरह से बदल दिया है। उत्पादकता में काफी वृद्धि हुई है!" } 
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop", 
    text: { en: "The 1-on-1 consultation was incredibly eye-opening. Simple spatial shifts brought so much peace to our home.", hi: "परामर्श बहुत ही ज्ञानवर्धक था। सरल स्थानिक परिवर्तनों से हमारे घर में बहुत शांति आई।" } 
  },
  { 
    id: 3, 
    name: "Rohan Desai", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop", 
    text: { en: "Highly recommend their Property Analysis Report before buying any real estate. It saved us from a bad investment.", hi: "किसी भी संपत्ति को खरीदने से पहले उनकी रिपोर्ट की अत्यधिक अनुशंसा करता हूं। इसने हमें गलत निवेश से बचाया।" } 
  }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form reference for EmailJS
  const formRef = useRef();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const scrollToSection = (id) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // EmailJS Form Submit Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current)
      .then(() => {
        alert(lang === 'hi' 
          ? "धन्यवाद! आपका अनुरोध प्राप्त हुआ है। हम जल्द ही आपसे संपर्क करेंगे।" 
          : "Thank you! Your request has been received. We will contact you shortly."
        );
        e.target.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert("Something went wrong. Please try contacting us via WhatsApp.");
      });
  };

  const filteredProducts = catalogItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.categoryKey === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = item.name.en.toLowerCase().includes(query) || item.name.hi.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-500 bg-[#FAF8F5] dark:bg-[#1A1614] text-stone-800 dark:text-stone-200 selection:bg-amber-200 selection:text-amber-900 dark:selection:bg-amber-900 dark:selection:text-amber-100 font-sans">
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 transition-all duration-300 bg-[#FAF8F5]/85 dark:bg-[#1A1614]/85 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo / Brand Image */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Sachhetvastu Logo" className="w-10 h-10 object-contain drop-shadow-sm" />
              <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-amber-900 dark:from-stone-100 dark:to-amber-400">
                {t.brand}
              </h1>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6 font-medium text-sm">
              <button onClick={() => setCurrentPage('home')} className={`hover:text-amber-700 transition-colors ${currentPage === 'home' ? 'text-amber-700 dark:text-amber-400 font-bold' : ''}`}>
                {t.navHome}
              </button>
              <button onClick={() => setCurrentPage('catalog')} className={`hover:text-amber-700 transition-colors ${currentPage === 'catalog' ? 'text-amber-700 dark:text-amber-400 font-bold' : ''}`}>
                {t.navCatalog}
              </button>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* Language Toggle */}
              <button 
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors tracking-widest uppercase shadow-sm"
              >
                {lang === 'en' ? 'HI' : 'EN'}
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-amber-400 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors shadow-sm"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              {/* Header Book Call CTA */}
              <button 
                onClick={() => scrollToSection('contact')}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white px-5 py-2 rounded-full shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm font-semibold"
              >
                {t.bookCall}
              </button>
            </div>
          </div>
        </nav>

        {/* --- MAIN PAGE VIEW --- */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <header className="relative pt-36 pb-28 px-6 overflow-hidden">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center filter blur-[6px] opacity-25 dark:opacity-15 scale-105 pointer-events-none"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5] dark:from-[#1A1614]/80 dark:via-transparent dark:to-[#1A1614] pointer-events-none z-0"></div>

              <ScrollReveal delay={0} className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-amber-100 dark:bg-stone-800/90 border border-amber-200 dark:border-stone-700 text-amber-900 dark:text-amber-400 text-xs font-bold tracking-widest mb-6 shadow-sm">
                    {t.heroTag}
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
                    {t.heroTitle1} <br className="hidden md:block"/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-800 to-orange-800 dark:from-amber-400 dark:to-orange-500">
                      {t.heroTitle2}
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-6 max-w-2xl mx-auto leading-relaxed font-normal">
                    {t.heroDesc}
                  </p>
                </div>
              </ScrollReveal>
            </header>

            {/* About Vastu Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-amber-900/10 via-amber-900/5 to-transparent dark:from-amber-950/30 dark:via-amber-950/10 dark:to-transparent border-y border-amber-200/50 dark:border-amber-900/30">
              <ScrollReveal delay={100} className="text-center max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-black text-stone-900 dark:text-stone-100 mb-6">
                  {t.aboutTitle1} <span className="text-amber-700 dark:text-amber-500">{t.aboutTitle2}</span>
                </h3>
                <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed mb-8 font-normal">
                  {t.aboutDesc}
                </p>
                <div className="w-24 h-1.5 bg-amber-700 dark:bg-amber-500 mx-auto rounded-full"></div>
              </ScrollReveal>
            </section>

            {/* Services Offered Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
              <ScrollReveal delay={100} className="text-center mb-16">
                <h3 className="text-3xl font-black text-stone-900 dark:text-stone-100 mb-4">{t.servicesTitle}</h3>
                <div className="w-24 h-1.5 bg-amber-700 dark:bg-amber-500 mx-auto rounded-full"></div>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Numerology Card */}
                <ScrollReveal delay={150} className="h-full">
                  <div 
                    onClick={() => { setSelectedCategory('numerology'); setCurrentPage('catalog'); }}
                    className="bg-white dark:bg-[#241F1C] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-2xl hover:border-amber-300 dark:hover:border-amber-900 transition-all duration-300 group h-full flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="w-14 h-14 bg-amber-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-800 dark:group-hover:bg-amber-600 transition-all duration-300 shadow-sm">
                        <span className="text-amber-800 dark:text-amber-400 group-hover:text-white font-black text-xl">01</span>
                      </div>
                      <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {lang === 'hi' ? 'अंक ज्योतिष' : 'Numerology'}
                      </h4>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                        {lang === 'hi' ? 'नाम सुधार, जन्मतिथि विश्लेषण और जीवन परिवर्तन करने वाले संख्यात्मक उपाय।' : 'Name correction, date of birth analysis, and life-transforming numerical remedies.'}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      View Pricing & Catalog →
                    </span>
                  </div>
                </ScrollReveal>

                {/* Vastu Consultation Card */}
                <ScrollReveal delay={300} className="h-full">
                  <div 
                    onClick={() => { setSelectedCategory('vastu'); setCurrentPage('catalog'); }}
                    className="bg-white dark:bg-[#241F1C] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-2xl hover:border-amber-300 dark:hover:border-amber-900 transition-all duration-300 group h-full flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="w-14 h-14 bg-amber-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-800 dark:group-hover:bg-amber-600 transition-all duration-300 shadow-sm">
                        <span className="text-amber-800 dark:text-amber-400 group-hover:text-white font-black text-xl">02</span>
                      </div>
                      <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {lang === 'hi' ? 'वास्तु परामर्श' : 'Vastu Consultation'}
                      </h4>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                        {lang === 'hi' ? 'आवासीय, व्यावसायिक और फैक्ट्री वास्तु साइट विजिट और ऑनलाइन समीक्षा।' : 'Residential, commercial, and factory Vastu site visits and remote blueprint audits.'}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      View Pricing & Catalog →
                    </span>
                  </div>
                </ScrollReveal>

                {/* Healing Card */}
                <ScrollReveal delay={450} className="h-full">
                  <div 
                    onClick={() => { setSelectedCategory('healing'); setCurrentPage('catalog'); }}
                    className="bg-white dark:bg-[#241F1C] p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-2xl hover:border-amber-300 dark:hover:border-amber-900 transition-all duration-300 group h-full flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="w-14 h-14 bg-amber-50 dark:bg-stone-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-800 dark:group-hover:bg-amber-600 transition-all duration-300 shadow-sm">
                        <span className="text-amber-800 dark:text-amber-400 group-hover:text-white font-black text-xl">03</span>
                      </div>
                      <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {lang === 'hi' ? 'हीलिंग सेवाएँ' : 'Healing Services'}
                      </h4>
                      <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                        {lang === 'hi' ? 'रेकी और एंजेलिक हीलिंग सत्र आपके शरीर और ऊर्जा क्षेत्र को शुद्ध करने के लिए।' : 'Reiki and angelic healing sessions designed to cleanse your energy field and aura.'}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      View Pricing & Catalog →
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            {/* Testimonials Section with Blurred Exterior House Background */}
            <section className="relative py-24 px-6 overflow-hidden border-t border-stone-200 dark:border-stone-800/50">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center filter blur-[8px] opacity-15 dark:opacity-10 scale-105 pointer-events-none"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-[#FAF8F5]/90 dark:from-[#1A1614]/90 dark:via-[#1A1614]/60 dark:to-[#1A1614]/90 pointer-events-none z-0"></div>

              <div className="relative z-10 max-w-7xl mx-auto">
                <ScrollReveal delay={100} className="text-center mb-16">
                  <h3 className="text-3xl font-black text-stone-900 dark:text-stone-100 mb-4">{t.testimonialsTitle}</h3>
                  <div className="w-24 h-1.5 bg-amber-700 dark:bg-amber-500 mx-auto rounded-full"></div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {reviews.map((review, index) => (
                    <ScrollReveal key={review.id} delay={(index + 1) * 150}>
                      <div className="bg-white/90 dark:bg-[#241F1C]/90 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-stone-100 dark:border-stone-800 relative mt-8 h-full flex flex-col">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-16 h-16 rounded-full border-4 border-white dark:border-[#241F1C] object-cover absolute -top-8 left-8 shadow-md"
                        />
                        <svg className="w-8 h-8 text-amber-200 dark:text-stone-700 mb-4 mt-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                        <p className="text-stone-600 dark:text-stone-300 italic mb-6 flex-grow font-normal">"{review.text[lang]}"</p>
                        <h5 className="font-bold text-stone-900 dark:text-stone-200">{review.name}</h5>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            {/* Lead Capture Form Section */}
            <section id="contact" className="py-24 px-6 bg-amber-50/50 dark:bg-[#151211] border-t border-stone-200 dark:border-stone-800/50">
              <div className="max-w-4xl mx-auto bg-white dark:bg-[#241F1C] rounded-3xl shadow-2xl overflow-hidden border border-stone-100 dark:border-stone-800 flex flex-col md:flex-row">
                
                {/* Left Info Column with updated phone & email */}
                <div className="bg-amber-800 dark:bg-[#110e0c] text-white p-10 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700 dark:bg-stone-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                  <div>
                    <h3 className="text-3xl font-black mb-4 relative z-10">{t.contactTitle}</h3>
                    <p className="text-amber-100 dark:text-stone-300 mb-8 relative z-10 leading-relaxed font-normal">{t.contactDesc}</p>
                    <div className="space-y-4 relative z-10 text-sm">
                      <p className="flex items-center gap-3 font-medium"><svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> +91 98363 45800</p>
                      <p className="flex items-center gap-3 font-medium"><svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> Sachhetvastu@gmail.com</p>
                    </div>
                  </div>

                  {/* View Catalog Button inside Contact Card */}
                  <div className="mt-10 relative z-10">
                    <button 
                      onClick={() => setCurrentPage('catalog')}
                      className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold text-sm tracking-wide transition-all text-center flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>📂 {t.viewCatalog}</span>
                    </button>
                  </div>
                </div>

                {/* Right Form Column with ref={formRef} */}
                <div className="p-10 md:w-3/5 flex flex-col justify-center">
                  <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">{t.formName}</label>
                        <input type="text" name="from_name" required className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">{t.formPhone}</label>
                        <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">{t.formEmail}</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">{t.formPropType}</label>
                      <select name="propertyType" className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow text-sm">
                        <option value="Residential">{t.formResidential}</option>
                        <option value="Commercial">{t.formCommercial}</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors text-sm">
                      {t.formSubmit}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </>
        )}

        {/* --- CATALOG PAGE VIEW --- */}
        {currentPage === 'catalog' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            
            {/* Back to Home & Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="text-amber-700 dark:text-amber-400 font-bold text-sm mb-3 inline-block hover:underline"
                >
                  {t.backToHome}
                </button>
                <h2 className="text-4xl md:text-5xl font-black text-stone-900 dark:text-stone-100">
                  {t.navCatalog}
                </h2>
              </div>

              {/* Search Bar */}
              <div className="w-full md:w-80 relative">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-2xl bg-white dark:bg-[#241F1C] border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 shadow-sm text-sm"
                />
                <svg className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Layout Grid: Side Navigation & Catalog Items */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              
              {/* Side Navigation Categories */}
              <div className="bg-white dark:bg-[#241F1C] p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm lg:sticky lg:top-28">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">Categories</h3>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                  <button 
                    onClick={() => setSelectedCategory('all')} 
                    className={`px-4 py-3 rounded-xl font-bold text-sm text-left transition-all whitespace-nowrap ${selectedCategory === 'all' ? 'bg-amber-800 text-white shadow-md' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'}`}
                  >
                    ✦ {t.allCategories}
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('numerology')} 
                    className={`px-4 py-3 rounded-xl font-bold text-sm text-left transition-all whitespace-nowrap ${selectedCategory === 'numerology' ? 'bg-amber-800 text-white shadow-md' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'}`}
                  >
                    ◈ {t.numerology}
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('vastu')} 
                    className={`px-4 py-3 rounded-xl font-bold text-sm text-left transition-all whitespace-nowrap ${selectedCategory === 'vastu' ? 'bg-amber-800 text-white shadow-md' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'}`}
                  >
                    ❖ {t.vastu}
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('healing')} 
                    className={`px-4 py-3 rounded-xl font-bold text-sm text-left transition-all whitespace-nowrap ${selectedCategory === 'healing' ? 'bg-amber-800 text-white shadow-md' : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'}`}
                  >
                    ✧ {t.healing}
                  </button>
                </div>
              </div>

              {/* Main Catalog Cards Grid */}
              <div className="lg:col-span-3">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-[#241F1C] rounded-3xl border border-stone-200 dark:border-stone-800">
                    <p className="text-stone-500 dark:text-stone-400 font-medium">No services found matching your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="bg-white dark:bg-[#241F1C] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-900 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                      >
                        {/* Contextual Image Banner */}
                        <div className="h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800 relative">
                          <img 
                            src={product.image} 
                            alt={product.name.en} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                          <span className="absolute bottom-3 left-4 px-2.5 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider rounded-md">
                            {product.categoryKey}
                          </span>
                        </div>

                        <div className="p-7 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                              {product.name[lang]}
                            </h4>
                            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6 font-normal">
                              {product.desc[lang]}
                            </p>
                          </div>
                          <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-4">
                            <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {/* WhatsApp Booking Button */}
                            <a 
                              href="https://wa.me/919836345800?text=I'm%20interested%20in%20booking%20a%20consultation"
                              target="_blank" rel="noopener noreferrer"
                              className="w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95"
                              title="Book via WhatsApp"
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Compact Footer with Brand Logo */}
        <footer className="bg-stone-900 dark:bg-black text-stone-400 dark:text-stone-500 py-8 px-6 mt-20 border-t border-stone-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Brand Logo Image */}
            <div className="flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Sachhetvastu Logo" className="w-8 h-8 object-contain" />
              <span className="font-bold text-stone-200 text-base">{t.brand}</span>
            </div>

            {/* Social Media & WhatsApp Links with updated number */}
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/919836345800" 
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                title="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-all shadow-md" title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-all shadow-md" title="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.5 0 9 1.5 9 4.615V8z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 transition-all shadow-md" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>

            <p className="text-xs font-normal">&copy; {new Date().getFullYear()} {t.brand}. {t.footerRights}</p>
          </div>
        </footer>

      </div>
    </div>
  );
}