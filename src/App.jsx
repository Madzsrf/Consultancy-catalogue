import React, { useState, useEffect, useRef } from 'react';
import './index.css';

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
    waBtn: "WhatsApp Us",
    heroTag: "CONSULTING EXCELLENCE",
    heroTitle1: "Harmonize Your",
    heroTitle2: "Living Spaces",
    heroDesc: "Expert Vastu guidance tailored to align your environment with natural energies, maximizing prosperity, health, and peace of mind.",
    bookCall: "Book Discovery Call",
    viewCatalog: "View Catalog",
    aboutTitle1: "The Science of",
    aboutTitle2: "Vastu Shastra",
    aboutDesc: "Vastu is the ancient Indian science of architecture and design, aimed at creating a harmonious environment. By balancing the five elements of nature—earth, water, fire, air, and space—we can unlock positive energy, bringing prosperity, happiness, and health into your residential and commercial spaces.",
    expertise: "Our Expertise",
    catalogTitle: "Catalog",
    catalogDesc: "Resources, consultations, and energy remedies to elevate your space.",
    testimonialsTitle: "Client Success Stories",
    contactTitle: "Get in Touch",
    contactDesc: "Ready to harmonize your space? Leave your details below and we will get back to you shortly.",
    formName: "Full Name",
    formEmail: "Email Address",
    formPhone: "Phone Number",
    formPropType: "Property Type",
    formResidential: "Residential",
    formCommercial: "Commercial",
    formSubmit: "Send Request",
    footerRights: "All rights reserved."
  },
  hi: {
    brand: "सचेतवास्तु",
    waBtn: "संपर्क करें",
    heroTag: "उत्कृष्ट परामर्श",
    heroTitle1: "अपने स्थानों को",
    heroTitle2: "सामंजस्यपूर्ण बनाएं",
    heroDesc: "विशेषज्ञ वास्तु मार्गदर्शन आपके पर्यावरण को प्राकृतिक ऊर्जा के साथ संरेखित करने के लिए, जिससे समृद्धि, स्वास्थ्य और मन की शांति अधिकतम हो।",
    bookCall: "परामर्श बुक करें",
    viewCatalog: "कैटलॉग देखें",
    aboutTitle1: "विज्ञान:",
    aboutTitle2: "वास्तु शास्त्र",
    aboutDesc: "वास्तु वास्तुकला और डिजाइन का प्राचीन भारतीय विज्ञान है, जिसका उद्देश्य एक सामंजस्यपूर्ण वातावरण बनाना है। प्रकृति के पांच तत्वों—पृथ्वी, जल, अग्नि, वायु और अंतरिक्ष—को संतुलित करके, हम सकारात्मक ऊर्जा को खोल सकते हैं, जिससे आपके आवासीय और व्यावसायिक स्थानों में समृद्धि आती है।",
    expertise: "हमारी विशेषज्ञता",
    catalogTitle: "कैटलॉग",
    catalogDesc: "आपके स्थान को समृद्ध बनाने के लिए संसाधन, परामर्श और उपाय।",
    testimonialsTitle: "ग्राहकों के अनुभव",
    contactTitle: "हमसे संपर्क करें",
    contactDesc: "क्या आप अपने स्थान को सामंजस्यपूर्ण बनाने के लिए तैयार हैं? अपना विवरण नीचे दें और हम आपसे संपर्क करेंगे।",
    formName: "पूरा नाम",
    formEmail: "ईमेल पता",
    formPhone: "फोन नंबर",
    formPropType: "संपत्ति का प्रकार",
    formResidential: "आवासीय",
    formCommercial: "व्यावसायिक",
    formSubmit: "अनुरोध भेजें",
    footerRights: "सर्वाधिकार सुरक्षित।"
  }
};

const services = [
  { 
    id: 1, icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", 
    title: { en: "Spatial Planning", hi: "स्थानिक योजना" }, 
    description: { en: "Strategic layout designs to optimize energy flow and bring harmony to your living spaces.", hi: "ऊर्जा प्रवाह को अनुकूलित करने और आपके रहने के स्थानों में सामंजस्य लाने के लिए रणनीतिक लेआउट।" } 
  },
  { 
    id: 2, icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", 
    title: { en: "Energy Auditing", hi: "ऊर्जा ऑडिटिंग" }, 
    description: { en: "Comprehensive review of elemental balance, identifying blocks and suggesting remedies.", hi: "तत्वों के संतुलन की व्यापक समीक्षा, रुकावटों की पहचान करना और उपाय सुझाना।" } 
  },
  { 
    id: 3, icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", 
    title: { en: "Site Alignment", hi: "साइट संरेखण" }, 
    description: { en: "In-depth directional analysis for new properties to ensure prosperity before construction.", hi: "निर्माण से पहले समृद्धि सुनिश्चित करने के लिए नई संपत्तियों का गहन दिशात्मक विश्लेषण।" } 
  }
];

const products = [
  { id: 1, price: 2499, category: { en: "Digital", hi: "डिजिटल" }, name: { en: "Vastu Framework Template", hi: "वास्तु फ्रेमवर्क टेम्पलेट" } },
  { id: 2, price: 5999, category: { en: "Service", hi: "सेवा" }, name: { en: "1-on-1 Consultation (1hr)", hi: "1-ऑन-1 परामर्श (1 घंटा)" } },
  { id: 3, price: 999, category: { en: "Physical", hi: "भौतिक" }, name: { en: "Vastu Energy Planner 2027", hi: "वास्तु एनर्जी प्लानर 2027" } },
  { id: 4, price: 8999, category: { en: "Digital", hi: "डिजिटल" }, name: { en: "Property Analysis Report", hi: "संपत्ति विश्लेषण रिपोर्ट" } },
  { id: 5, price: 3499, category: { en: "Digital", hi: "डिजिटल" }, name: { en: "Office Layout Blueprint", hi: "कार्यालय लेआउट ब्लूप्रिंट" } },
  { id: 6, price: 4499, category: { en: "Service", hi: "सेवा" }, name: { en: "Commercial Site Visit", hi: "व्यावसायिक साइट विजिट" } },
  { id: 7, price: 1499, category: { en: "Physical", hi: "भौतिक" }, name: { en: "Copper Helix Energy Remedy", hi: "कॉपर हेलिक्स एनर्जी रेमेडी" } },
  { id: 8, price: 12999, category: { en: "Service", hi: "सेवा" }, name: { en: "Complete Villa Energy Scan", hi: "पूर्ण विला एनर्जी स्कैन" } },
  { id: 9, price: 1899, category: { en: "Physical", hi: "भौतिक" }, name: { en: "Brass Swastik Energy Pyramid", hi: "ब्रास स्वास्तिक एनर्जी पिरामिड" } },
  { id: 10, price: 18999, category: { en: "Service", hi: "सेवा" }, name: { en: "Industrial & Factory Vastu Audit", hi: "औद्योगिक एवं फैक्ट्री वास्तु ऑडिट" } }
];

const reviews = [
  { id: 1, name: "Aarav Sharma", image: "https://randomuser.me/api/portraits/men/43.jpg", text: { en: "Sachhetvastu completely transformed the energy in our new office. Productivity has noticeably increased!", hi: "सचेतवास्तु ने हमारे नए कार्यालय में ऊर्जा को पूरी तरह से बदल दिया है। उत्पादकता में काफी वृद्धि हुई है!" } },
  { id: 2, name: "Priya Patel", image: "https://randomuser.me/api/portraits/women/44.jpg", text: { en: "The 1-on-1 consultation was incredibly eye-opening. Simple spatial shifts brought so much peace to our home.", hi: "परामर्श बहुत ही ज्ञानवर्धक था। सरल स्थानिक परिवर्तनों से हमारे घर में बहुत शांति आई।" } },
  { id: 3, name: "Rohan Desai", image: "https://randomuser.me/api/portraits/men/46.jpg", text: { en: "Highly recommend their Property Analysis Report before buying any real estate. It saved us from a bad investment.", hi: "किसी भी संपत्ति को खरीदने से पहले उनकी रिपोर्ट की अत्यधिक अनुशंसा करता हूं। इसने हमें गलत निवेश से बचाया।" } }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(lang === 'hi' 
      ? "धन्यवाद! आपका अनुरोध प्राप्त हुआ है। हम जल्द ही आपसे संपर्क करेंगे।" 
      : "Thank you! Your request has been received. We will contact you shortly."
    );
    e.target.reset();
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-500 bg-[#FAF8F5] dark:bg-[#1A1614] text-stone-800 dark:text-stone-200 selection:bg-amber-200 selection:text-amber-900 dark:selection:bg-amber-900 dark:selection:text-amber-100">
        
        {/* Navigation */}
        <nav className="sticky top-0 z-50 transition-all duration-300 bg-[#FAF8F5]/80 dark:bg-[#1A1614]/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-700 to-amber-900 dark:from-amber-600 dark:to-orange-800 flex items-center justify-center shadow-lg shadow-amber-900/20">
                <span className="text-white font-bold text-sm tracking-widest">SV</span>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-amber-900 dark:from-stone-100 dark:to-amber-500">
                {t.brand}
              </h1>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* Language Toggle */}
              <button 
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors tracking-widest uppercase"
              >
                {lang === 'en' ? 'HI' : 'EN'}
              </button>

              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-amber-400 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              {/* WhatsApp Button */}
              <a 
                href={`https://wa.me/919876543210?text=Hello%20${t.brand}!`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-4 md:px-5 py-2 rounded-full shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span className="font-semibold text-sm hidden md:inline">{t.waBtn}</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative pt-32 pb-20 px-6 overflow-hidden">
          <ScrollReveal delay={0}>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-amber-100 dark:bg-stone-900 border border-amber-200 dark:border-stone-700 text-amber-900 dark:text-amber-500 text-sm font-bold tracking-widest mb-6">
                {t.heroTag}
              </span>
              <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-stone-900 dark:text-stone-100">
                {t.heroTitle1} <br className="hidden md:block"/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-400 dark:to-amber-600">
                  {t.heroTitle2}
                </span>
              </h2>
              <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-8 py-4 bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-full font-semibold shadow-lg shadow-amber-900/20 transition-all hover:-translate-y-1 text-center">
                  {t.bookCall}
                </button>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 rounded-full font-semibold shadow-sm transition-all hover:-translate-y-1"
                >
                  {t.viewCatalog}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </header>

        {/* About Vastu Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800/50">
          <ScrollReveal delay={100} className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              {t.aboutTitle1} <span className="text-amber-700 dark:text-amber-500">{t.aboutTitle2}</span>
            </h3>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              {t.aboutDesc}
            </p>
            <div className="w-24 h-1 bg-amber-700 dark:bg-amber-500 mx-auto rounded-full"></div>
          </ScrollReveal>
        </section>

        {/* Services Section */}
        <section className="pb-24 px-6 max-w-7xl mx-auto">
          <ScrollReveal delay={100} className="text-center mb-16">
            <h3 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">{t.expertise}</h3>
            <div className="w-24 h-1 bg-amber-700 dark:bg-amber-500 mx-auto rounded-full"></div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={(index + 1) * 150} className="h-full">
                <div className="bg-white dark:bg-[#241F1C] p-8 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-900/50 transition-all duration-300 group h-full">
                  <div className="w-14 h-14 bg-amber-50 dark:bg-stone-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-800 dark:group-hover:bg-amber-600 transition-all duration-300">
                    <svg className="w-7 h-7 text-amber-800 dark:text-amber-500 group-hover:text-white dark:group-hover:text-stone-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-3">{service.title[lang]}</h4>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{service.description[lang]}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Catalog Section with Custom 4-4-2 Grid Layout and Center Alignment */}
        <section id="catalog" className="py-24 px-6 bg-stone-100/50 dark:bg-[#151211] border-t border-stone-200 dark:border-stone-800/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal delay={100} className="mb-12">
              <h3 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">{t.catalogTitle}</h3>
              <p className="text-stone-600 dark:text-stone-400">{t.catalogDesc}</p>
            </ScrollReveal>
            
            {/* Grid configured to handle 4 columns on large screens, with items 9 and 10 placed in columns 2 and 3 to center them */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => {
                // For the last 2 items (indices 8 and 9), apply grid positioning classes on large screens to create the centered 2-item final row: . .
                let customLayoutClass = "";
                if (index === 8) {
                  // 9th item starts at column 2 on desktop
                  customLayoutClass = "lg:col-start-2";
                } else if (index === 9) {
                  // 10th item starts at column 3 on desktop
                  customLayoutClass = "lg:col-start-3";
                }

                return (
                  <ScrollReveal key={product.id} delay={(index % 4) * 100} className={`h-full ${customLayoutClass}`}>
                    <div className="bg-white dark:bg-[#241F1C] rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group h-full text-center items-center">
                      <div className="h-48 w-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center relative overflow-hidden">
                         <div className="w-24 h-24 bg-white/20 dark:bg-black/20 rounded-full blur-xl absolute -top-4 -left-4"></div>
                         <div className="w-32 h-32 bg-amber-900/10 dark:bg-amber-500/10 rounded-full blur-xl absolute -bottom-8 -right-8"></div>
                         <span className="text-stone-500 dark:text-stone-500 font-semibold tracking-widest uppercase text-sm z-10">
                           {t.brand}
                         </span>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col justify-between w-full items-center text-center">
                        <div>
                          <span className="inline-block px-2 py-1 bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-500 text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                            {product.category[lang]}
                          </span>
                          <h4 className="text-lg font-bold text-stone-800 dark:text-stone-200 leading-tight mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                            {product.name[lang]}
                          </h4>
                        </div>
                        <div className="mt-6 flex items-center justify-center gap-6 border-t border-stone-100 dark:border-stone-800 pt-4 w-full">
                          <span className="text-2xl font-black text-stone-900 dark:text-stone-100">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <a 
                            href={`https://wa.me/919876543210?text=I'm%20interested%20in%20${encodeURIComponent(product.name.en)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white hover:shadow-md transition-all active:scale-95"
                            title="Message on WhatsApp"
                          >
                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800/50">
          <ScrollReveal delay={100} className="text-center mb-16">
            <h3 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">{t.testimonialsTitle}</h3>
            <div className="w-24 h-1 bg-amber-700 dark:bg-amber-500 mx-auto rounded-full"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ScrollReveal key={review.id} delay={(index + 1) * 150}>
                <div className="bg-white dark:bg-[#241F1C] p-8 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 relative mt-8 h-full flex flex-col">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-16 h-16 rounded-full border-4 border-white dark:border-[#241F1C] object-cover absolute -top-8 left-8 shadow-md"
                  />
                  <svg className="w-8 h-8 text-amber-200 dark:text-stone-700 mb-4 mt-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  <p className="text-stone-600 dark:text-stone-400 italic mb-6 flex-grow">"{review.text[lang]}"</p>
                  <h5 className="font-bold text-stone-900 dark:text-stone-200">{review.name}</h5>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Lead Capture Form Section */}
        <section id="contact" className="py-24 px-6 bg-amber-50 dark:bg-[#1A1614] border-t border-stone-200 dark:border-stone-800/50">
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#241F1C] rounded-3xl shadow-xl overflow-hidden border border-stone-100 dark:border-stone-800 flex flex-col md:flex-row">
            
            <div className="bg-amber-800 dark:bg-[#151211] text-white p-10 md:w-2/5 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-700 dark:bg-stone-800 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
              <h3 className="text-3xl font-bold mb-4 relative z-10">{t.contactTitle}</h3>
              <p className="text-amber-100 dark:text-stone-400 mb-8 relative z-10 leading-relaxed">{t.contactDesc}</p>
              <div className="space-y-4 relative z-10">
                <p className="flex items-center gap-3 font-medium"><svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> +91 98765 43210</p>
                <p className="flex items-center gap-3 font-medium"><svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> hello@sachhetvastu.com</p>
              </div>
            </div>

            <div className="p-10 md:w-3/5">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.formName}</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.formPhone}</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.formEmail}</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">{t.formPropType}</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-stone-50 dark:bg-[#1A1614] border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-stone-200 transition-shadow">
                    <option>{t.formResidential}</option>
                    <option>{t.formCommercial}</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-bold py-4 rounded-lg shadow-md transition-colors">
                  {t.formSubmit}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-900 dark:bg-black text-stone-400 dark:text-stone-500 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-800 dark:bg-amber-700 flex items-center justify-center">
                <span className="text-white font-bold text-xs">SV</span>
              </div>
              <span className="font-semibold text-stone-300">{t.brand}</span>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-700 text-stone-300 hover:text-white flex items-center justify-center transition-all"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-700 text-stone-300 hover:text-white flex items-center justify-center transition-all"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.5 0 9 1.5 9 4.615V8z"/>
                </svg>
              </a>

              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-700 text-stone-300 hover:text-white flex items-center justify-center transition-all"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>

            <p className="text-sm">&copy; {new Date().getFullYear()} {t.brand}. {t.footerRights}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}