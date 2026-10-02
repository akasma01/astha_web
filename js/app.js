/**
 * Astha Road Services - Main Application Script
 * Fleet Owners & Transport Contractors - Pan-India Logistics
 * Dynamically Customized & Mobile Optimized
 */
(function() {
  'use strict';
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// Verified Contact Details from asc contact
const CONTACT_INFO = {
  name: 'ASTHA ROAD SERVICES',
  subtitle: 'Fleet Owners & Transport Contractors',
  tagline: 'A Complete Solution For Transportation For All Over India',
  email: 'info@astharoadservices.com',
  phones: [{
    number: '+91 99138 85099',
    raw: '9913885099',
    whatsapp: true
  }, {
    number: '+91 98251 77247',
    raw: '9825177247',
    whatsapp: false
  }, {
    number: '+91 99245 85099',
    raw: '9924585099',
    whatsapp: true
  }],
  offices: [{
    title: 'Operational Office',
    location: 'Dindoli, Surat',
    address: 'Shop No. 10, 3rd Floor, Madhuram Arcade-2, Near Madhuram Circle, Saniya Kharwasa Road, Dindoli, Surat - 394210',
    mapLink: 'https://maps.google.com/?q=Madhuram+Arcade+2+Dindoli+Surat'
  }, {
    title: 'Registered Office',
    location: 'Parvat Gam, Surat',
    address: 'Plot No. 196, Chandralok Society, Godadara Road, Behind Ganga Sagar Row-House, Parvat Gam, Parvat, Surat - 395012',
    mapLink: 'https://maps.google.com/?q=Chandralok+Society+Parvat+Gam+Surat'
  }]
};
const VEHICLE_SPECS = {
  '32ft-mxl': {
    name: '32 Ft MXL Container',
    payload: '18 - 20 Tons',
    volume: '2,150 Cu.Ft',
    dimensions: '32 ft x 8.5 ft x 9.5 ft',
    axles: 'Multi-Axle (10-Wheeler)',
    bestFor: 'Textiles, Yarns, FMCG, Electronics, Pharmaceuticals',
    desc: 'All-weather, sealed container guaranteeing zero moisture and zero pilferage on long-haul routes.',
    ratePerKm: 72,
    image: 'assets/images/fleet-32ft-mxl.jpg'
  },
  '40ft-trailer': {
    name: '40 Ft Heavy Trailer',
    payload: '28 - 35 Tons',
    volume: 'Flat Platform / High-Bed',
    dimensions: '40 ft x 8.5 ft Flatbed',
    axles: 'Multi-Axle Heavy Hauler (18-Wheeler)',
    bestFor: 'Industrial Machinery, Steel Coils, Structural Beams, Heavy ODC',
    desc: 'Engineered for over-dimensional consignments and heavy industrial plant equipment.',
    ratePerKm: 95,
    image: 'assets/images/fleet-40ft-trailer.jpg'
  },
  '24ft-open': {
    name: '24 Ft Open Body Truck',
    payload: '12 - 15 Tons',
    volume: '1,350 Cu.Ft',
    dimensions: '24 ft x 7.5 ft x 7.5 ft',
    axles: '6 to 10 Wheeler',
    bestFor: 'Agricultural Goods, Hardware, Construction Materials',
    desc: 'Rapid overhead crane loading with heavy-duty reinforced sidewalls.',
    ratePerKm: 58,
    image: 'assets/images/fleet-24ft-open.jpg'
  },
  '19ft-open': {
    name: '19 Ft Medium Freight Truck',
    payload: '7 - 9 Tons',
    volume: '950 Cu.Ft',
    dimensions: '19 ft x 7 ft x 7 ft',
    axles: '6-Wheeler Medium Hauler',
    bestFor: 'Inter-City Medium Freight, Express Parcels, Surat Local Distribution',
    desc: 'Agile transit truck for high-frequency regional factory-to-warehouse placement.',
    ratePerKm: 48,
    image: 'assets/images/fleet-19ft-truck.jpg'
  }
};
const ROUTES = {
  'Surat-Mumbai': {
    distance: 285,
    transit: '12 - 18 Hours (Overnight)'
  },
  'Surat-Delhi': {
    distance: 1150,
    transit: '48 - 60 Hours'
  },
  'Surat-Ahmedabad': {
    distance: 265,
    transit: '6 - 8 Hours'
  },
  'Surat-Pune': {
    distance: 410,
    transit: '18 - 24 Hours'
  },
  'Surat-Bengaluru': {
    distance: 1240,
    transit: '3 - 4 Days'
  },
  'Surat-Hyderabad': {
    distance: 935,
    transit: '2 - 3 Days'
  },
  'Surat-Kolkata': {
    distance: 1860,
    transit: '4 - 5 Days'
  },
  'Surat-Jaipur': {
    distance: 885,
    transit: '36 - 48 Hours'
  }
};
const SAMPLE_TRACKING = {
  'ARS-SUR-8842': {
    origin: 'Surat Central Hub, Gujarat',
    destination: 'Mumbai Terminal, MH',
    status: 'In Transit on NH-48 Express Corridor',
    checkpoint: 'Passing Vapi Toll Checkpoint',
    eta: 'Today, 09:30 PM',
    speed: '68 km/h',
    step: 3
  },
  'ARS-99138': {
    origin: 'Surat Central Hub, Gujarat',
    destination: 'New Delhi NCR Hub',
    status: 'In Transit on Western Freight Corridor',
    checkpoint: 'Near Jaipur Highway Bypass',
    eta: 'Tomorrow, 02:00 PM',
    speed: '64 km/h',
    step: 3
  }
};

// Scroll Reveal Hook
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.unobserve(el);
      }
    }, {
      threshold
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, revealed];
}

// Animated Metric Counter - Mobile Optimized
function MetricCounter({
  value,
  suffix = '',
  label,
  isFloat = false,
  duration = 1600
}) {
  const [ref, revealed] = useScrollReveal(0.2);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!revealed) return;
    let current = 0;
    const target = parseFloat(value);
    const steps = 35;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.round(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [revealed, value]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight font-heading"
  }, count, suffix), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 sm:mt-2 font-mono"
  }, label));
}
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('32ft-mxl');

  // Video Autoplay Reference
  const truckVideoRef = useRef(null);

  // Smooth Continuous Video Playback
  useEffect(() => {
    const vid = truckVideoRef.current;
    if (vid) {
      vid.muted = true;
      vid.playsInline = true;
      vid.play().catch(() => {});
    }
  }, []);

  // Calculator State
  const [source, setSource] = useState('Surat');
  const [dest, setDest] = useState('Delhi');
  const [truckType, setTruckType] = useState('32ft-mxl');
  const [calculatedQuote, setCalculatedQuote] = useState(null);

  // Tracking State
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState('');

  // Dynamic Scroll Listener for Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = id => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Freight Rate Calculation triggered on button click
  const handleCalculateQuote = () => {
    const key = `${source}-${dest}`;
    const revKey = `${dest}-${source}`;
    let dist = 650;
    let time = '2 - 3 Days';
    if (ROUTES[key]) {
      dist = ROUTES[key].distance;
      time = ROUTES[key].transit;
    } else if (ROUTES[revKey]) {
      dist = ROUTES[revKey].distance;
      time = ROUTES[revKey].transit;
    } else if (source === dest) {
      dist = 50;
      time = 'Same Day';
    }
    const t = VEHICLE_SPECS[truckType] || VEHICLE_SPECS['32ft-mxl'];
    const base = dist * t.ratePerKm;
    const minRate = Math.round(base * 0.95);
    const maxRate = Math.round(base * 1.15);
    const waMsg = encodeURIComponent(`Hello Astha Road Services,\nI would like to inquire about freight transport:\n• Route: ${source} to ${dest} (~${dist} KM)\n• Vehicle: ${t.name} (${t.payload})\n• Estimated Rate: ₹${minRate.toLocaleString('en-IN')} - ₹${maxRate.toLocaleString('en-IN')}\n• Transit: ${time}\nPlease share vehicle availability.`);
    setCalculatedQuote({
      dist,
      time,
      truckName: t.name,
      payload: t.payload,
      minRate: minRate.toLocaleString('en-IN'),
      maxRate: maxRate.toLocaleString('en-IN'),
      waLink: `https://wa.me/919913885099?text=${waMsg}`
    });
  };
  const handleTrackingSearch = e => {
    if (e) e.preventDefault();
    const q = trackingCode.trim().toUpperCase();
    if (!q) {
      setTrackingError('Please enter a Docket / LR number to track.');
      setTrackingResult(null);
      return;
    }
    setTrackingError('');
    if (SAMPLE_TRACKING[q]) {
      setTrackingResult(SAMPLE_TRACKING[q]);
    } else {
      setTrackingResult({
        origin: `${source} Hub, Gujarat`,
        destination: `${dest} Terminal`,
        status: 'In Transit • Active GPS Beacon',
        checkpoint: 'NH-48 National Highway Corridor',
        eta: 'Within 24 - 48 Hours',
        speed: '65 km/h',
        step: 3
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 pb-24 md:pb-0 relative overflow-x-hidden w-full"
  }, /*#__PURE__*/React.createElement("header", {
    className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs text-slate-900 py-2.5 sm:py-3.5' : 'bg-slate-950/70 backdrop-blur-md border-b border-white/10 text-white py-3 sm:py-4'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#cover",
    onClick: e => {
      e.preventDefault();
      scrollToSection('cover');
    },
    className: "flex items-center gap-2.5 sm:gap-3.5 group shrink min-w-0"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/images/as logo.png",
    alt: "Astha Road Services Logo",
    className: "h-8 sm:h-11 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-sm sm:text-lg font-extrabold tracking-tight sm:tracking-wide block truncate font-heading ${isScrolled ? 'text-slate-950' : 'text-white drop-shadow-sm'}`
  }, "ASTHA ROAD SERVICES"), /*#__PURE__*/React.createElement("span", {
    className: `text-[10px] sm:text-xs font-medium tracking-wide hidden xs:block truncate ${isScrolled ? 'text-slate-500' : 'text-slate-300'}`
  }, "Fleet Owners & Transport Contractors"))), /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex items-center gap-6 lg:gap-10 text-sm font-medium"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('services'),
    className: `transition-colors duration-200 ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`
  }, "Services"), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('fleet'),
    className: `transition-colors duration-200 ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`
  }, "Fleet Specs"), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('estimator'),
    className: `transition-colors duration-200 ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`
  }, "Rate & Tracking"), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('operations'),
    className: `transition-colors duration-200 ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`
  }, "Operations"), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('contact'),
    className: `transition-colors duration-200 ${isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-200 hover:text-white'}`
  }, "Contact Us")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 sm:gap-3 shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('estimator'),
    className: `hidden sm:inline-flex px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm active:scale-95 whitespace-nowrap ${isScrolled ? 'bg-slate-950 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'}`
  }, "Instant Quote"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
    className: `md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`,
    "aria-label": "Toggle Menu"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, mobileMenuOpen ? /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2.2,
    d: "M6 18L18 6M6 6l12 12"
  }) : /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2.2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))))), mobileMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "md:hidden bg-white/95 backdrop-blur-lg text-slate-900 border-b border-slate-200 px-5 py-5 space-y-4 shadow-xl animate-fade-in"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "flex flex-col space-y-1 font-semibold text-sm"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('services'),
    className: "text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-800"
  }, /*#__PURE__*/React.createElement("span", null, "Services"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-xs"
  }, "\u2192")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('fleet'),
    className: "text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-800"
  }, /*#__PURE__*/React.createElement("span", null, "Fleet Specifications"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-xs"
  }, "\u2192")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('estimator'),
    className: "text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-800"
  }, /*#__PURE__*/React.createElement("span", null, "Rate Estimator & GPS Tracking"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-xs"
  }, "\u2192")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('operations'),
    className: "text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-800"
  }, /*#__PURE__*/React.createElement("span", null, "Surat Hub Operations"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-xs"
  }, "\u2192")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('contact'),
    className: "text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-center justify-between text-slate-800"
  }, /*#__PURE__*/React.createElement("span", null, "Contact Us"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 text-xs"
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 border-t border-slate-100 grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:9913885099",
    className: "py-2.5 px-3 rounded-lg bg-slate-900 text-white text-center text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
  })), /*#__PURE__*/React.createElement("span", null, "Call Hotline")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('estimator'),
    className: "py-2.5 px-3 rounded-lg bg-blue-600 text-white text-center text-xs font-semibold shadow-sm"
  }, "Freight Estimate")))), /*#__PURE__*/React.createElement("section", {
    id: "cover",
    className: "relative w-full min-h-[85vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-slate-950 text-white pt-20 sm:pt-32 pb-6 sm:pb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 z-0 overflow-hidden"
  }, /*#__PURE__*/React.createElement("video", {
    ref: truckVideoRef,
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "auto",
    poster: "assets/images/astha-cover-poster.jpg",
    className: "absolute inset-0 w-full h-full object-cover",
    style: {
      transform: 'scale(1.01)'
    }
  }, /*#__PURE__*/React.createElement("source", {
    src: "assets/videos/astha-cover-video.mp4",
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/70 pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none w-full md:w-3/5"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative z-20 w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 my-auto text-left py-6 sm:py-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl space-y-4 sm:space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-0.5 w-6 sm:w-8 bg-blue-500 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] text-blue-400 uppercase font-mono"
  }, "Pan-India Commercial Fleet Operations")), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight sm:tracking-[0.035em] text-white leading-[1.15] sm:leading-[1.1] font-heading drop-shadow-md"
  }, "ASTHA ROAD SERVICES"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl"
  }, "Direct Full Truckload (FTL) Freight Across All Indian States \u2022 Operating 550+ GPS Monitored Commercial Trucks & Trailers \u2022 Surat Central Logistics Hub"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('estimator'),
    className: "w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-blue-600/30 active:scale-95 text-center flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Calculate Freight Rate"), /*#__PURE__*/React.createElement("span", null, "\u2192")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('fleet'),
    className: "w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 transition-all duration-200 active:scale-95 text-center flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Explore Fleet Specifications"), /*#__PURE__*/React.createElement("span", null, "\u2193"))))), /*#__PURE__*/React.createElement("div", {
    className: "relative z-20 w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-300 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    className: "text-white font-semibold"
  }, "Surat Hubs:"), " Madhuram Arcade-2, Dindoli & Parvat Gam")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('services'),
    className: "flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium group transition-colors"
  }, /*#__PURE__*/React.createElement("span", null, "EXPLORE FLEET & SERVICES"), /*#__PURE__*/React.createElement("span", {
    className: "group-hover:translate-y-0.5 transition-transform text-blue-400"
  }, "\u2193")))), /*#__PURE__*/React.createElement("section", {
    className: "py-10 sm:py-16 bg-slate-50/70 border-b border-slate-100 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
  }, /*#__PURE__*/React.createElement(MetricCounter, {
    value: "550",
    suffix: "+",
    label: "Commercial Fleet Units"
  }), /*#__PURE__*/React.createElement(MetricCounter, {
    value: "100",
    suffix: "%",
    label: "GPS Monitored Fleet"
  }), /*#__PURE__*/React.createElement(MetricCounter, {
    value: "28",
    suffix: "+",
    label: "States & UTs Covered"
  }), /*#__PURE__*/React.createElement(MetricCounter, {
    value: "99.4",
    suffix: "%",
    label: "On-Time Delivery Rate",
    isFloat: true
  })))), /*#__PURE__*/React.createElement("section", {
    id: "services",
    className: "py-14 sm:py-24 bg-white border-b border-slate-100 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mb-10 sm:mb-16 space-y-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-0.5 w-6 bg-blue-600 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 font-mono"
  }, "Core Logistics Capabilities")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-normal font-heading"
  }, "Engineered For Industrial Cargo & High-Value Freight"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-600 leading-relaxed pt-1"
  }, "Astha Road Services delivers turnkey transportation services with guaranteed placement SLAs and zero transshipment damage.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h2m-6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-bold text-slate-900 mb-2 font-heading"
  }, "Full Truckload (FTL) Direct"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4"
  }, "Exclusive dedicated trucks assigned directly from your factory floor to destination warehouse with zero intermediate handling."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/60"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Sealed 32ft MXL & SXL containers"), /*#__PURE__*/React.createElement("li", null, "\u2022 Digital dispatch e-waybill compliance"), /*#__PURE__*/React.createElement("li", null, "\u2022 Point-to-point guaranteed transit"))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-bold text-slate-900 mb-2 font-heading"
  }, "Heavy Machinery & ODC"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4"
  }, "40ft low-bed and multi-axle hydraulic trailers for transporting oversized industrial equipment, boiler tanks, and structural steel."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/60"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Route survey & toll clearance"), /*#__PURE__*/React.createElement("li", null, "\u2022 Specialized lashing and heavy tarpaulin"), /*#__PURE__*/React.createElement("li", null, "\u2022 Escort vehicle support when required"))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-bold text-slate-900 mb-2 font-heading"
  }, "Textile & Yarn Express Lines"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4"
  }, "Originating from Surat's major industrial textile hubs (Sachin, Pandesara, Godadara) to key garment markets across Delhi NCR, Kolkata, and Tirupur."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/60"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Moisture-proof high cube containers"), /*#__PURE__*/React.createElement("li", null, "\u2022 High-density roll stacking safety"), /*#__PURE__*/React.createElement("li", null, "\u2022 Daily scheduled evening dispatches"))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-bold text-slate-900 mb-2 font-heading"
  }, "24/7 GPS Fleet Telematics"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4"
  }, "Every commercial vehicle in our 550+ fleet is fitted with AIS-140 standard satellite tracking with live speed and location reporting."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/60"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Live customer tracking portal"), /*#__PURE__*/React.createElement("li", null, "\u2022 Geofence entry and exit alerts"), /*#__PURE__*/React.createElement("li", null, "\u2022 Surat Central Control Room monitoring"))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-bold text-slate-900 mb-2 font-heading"
  }, "Annual Corporate Contracts"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4"
  }, "Long-term transportation agreements for FMCG brands, chemical manufacturers, and retail chains with SLA guarantees and fixed rate cards."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/60"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Monthly billing with consolidated PODs"), /*#__PURE__*/React.createElement("li", null, "\u2022 Priority vehicle allocation during peak"), /*#__PURE__*/React.createElement("li", null, "\u2022 Dedicated key account manager"))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-slate-50/50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-bold text-slate-900 mb-2 font-heading"
  }, "Safe Freight & Risk Mitigation"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 sm:mb-4"
  }, "Trained highway pilots, verified driver records, dual-driver long haul dispatches, and full transit safety standards on every shipment."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-500 space-y-1.5 pt-2 border-t border-slate-200/60"
  }, /*#__PURE__*/React.createElement("li", null, "\u2022 Zero pilferage tamper-proof seals"), /*#__PURE__*/React.createElement("li", null, "\u2022 Standard driver background verifications"), /*#__PURE__*/React.createElement("li", null, "\u2022 Highway emergency breakdown support")))))), /*#__PURE__*/React.createElement("section", {
    id: "fleet",
    className: "py-14 sm:py-24 bg-slate-50/50 border-b border-slate-100 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mb-8 sm:mb-12 space-y-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-0.5 w-6 bg-blue-600 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 font-mono"
  }, "Fleet Profile & Configurations")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-normal font-heading"
  }, "Heavy-Duty Vehicles Built For Indian Expressways"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-600 leading-relaxed pt-1"
  }, "Explore dimensions, tonnages, and payload capacities of our 550+ commercial transport fleet.")), /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-4xl lg:max-w-5xl mb-6 sm:mb-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-2 w-full p-1.5 bg-white border border-slate-200 rounded-xl shadow-xs"
  }, Object.entries(VEHICLE_SPECS).map(([key, v]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    onClick: () => setSelectedVehicle(key),
    className: `py-2.5 px-2 rounded-lg text-xs font-semibold transition-all text-center flex flex-col items-center justify-center ${selectedVehicle === key ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "block truncate w-full text-center"
  }, v.name), /*#__PURE__*/React.createElement("span", {
    className: `text-[10px] block mt-0.5 font-mono ${selectedVehicle === key ? 'text-slate-300' : 'text-slate-400'}`
  }, v.payload))))), (() => {
    const v = VEHICLE_SPECS[selectedVehicle];
    return /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-8 shadow-xs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "lg:col-span-6 order-first lg:order-last"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 aspect-[16/10] flex items-center justify-center p-2"
    }, /*#__PURE__*/React.createElement("img", {
      src: v.image,
      alt: v.name,
      className: "w-full h-full object-contain"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "lg:col-span-6 space-y-4 sm:space-y-6 order-last lg:order-first"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold uppercase tracking-wider text-blue-600 font-mono"
    }, "Technical Specifications"), /*#__PURE__*/React.createElement("h3", {
      className: "text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-heading"
    }, v.name), /*#__PURE__*/React.createElement("p", {
      className: "text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed"
    }, v.desc)), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-2.5 sm:gap-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] sm:text-xs text-slate-400 font-medium"
    }, "Payload Capacity"), /*#__PURE__*/React.createElement("div", {
      className: "text-sm sm:text-lg font-bold text-slate-900 mt-0.5"
    }, v.payload)), /*#__PURE__*/React.createElement("div", {
      className: "p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] sm:text-xs text-slate-400 font-medium"
    }, "Volumetric Space"), /*#__PURE__*/React.createElement("div", {
      className: "text-sm sm:text-lg font-bold text-slate-900 mt-0.5"
    }, v.volume)), /*#__PURE__*/React.createElement("div", {
      className: "p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] sm:text-xs text-slate-400 font-medium"
    }, "Dimensions"), /*#__PURE__*/React.createElement("div", {
      className: "text-xs sm:text-base font-bold text-slate-900 mt-0.5 truncate"
    }, v.dimensions)), /*#__PURE__*/React.createElement("div", {
      className: "p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-[11px] sm:text-xs text-slate-400 font-medium"
    }, "Axles"), /*#__PURE__*/React.createElement("div", {
      className: "text-xs sm:text-base font-bold text-slate-900 mt-0.5 truncate"
    }, v.axles))), /*#__PURE__*/React.createElement("div", {
      className: "p-3 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-100"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-blue-900 block mb-1"
    }, "Recommended Cargo Categories:"), /*#__PURE__*/React.createElement("span", {
      className: "text-xs sm:text-sm text-blue-800"
    }, v.bestFor)), /*#__PURE__*/React.createElement("div", {
      className: "pt-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setTruckType(selectedVehicle);
        scrollToSection('estimator');
      },
      className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold tracking-wide transition-colors"
    }, /*#__PURE__*/React.createElement("span", null, "Calculate Rate For This Vehicle"), /*#__PURE__*/React.createElement("span", null, "\u2192")))));
  })())), /*#__PURE__*/React.createElement("section", {
    id: "estimator",
    className: "py-14 sm:py-24 bg-white border-b border-slate-100 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mb-8 sm:mb-12 space-y-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-0.5 w-6 bg-blue-600 rounded-sm"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 font-mono"
  }, "Logistics Operations Hub")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-normal font-heading"
  }, "Freight Estimator & Live Tracker"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-600 leading-relaxed pt-1"
  }, "Calculate realistic long-haul rates between Surat and major Indian corridors or inspect real-time GPS docket status.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50/70 p-4 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between h-full space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-200/80 pb-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h2m-6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-xl font-bold text-slate-900 font-heading"
  }, "Route & Price Estimator")), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider font-mono bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200"
  }, "Direct Rates")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-600 block mb-1"
  }, "Origin City (Hub)"), /*#__PURE__*/React.createElement("select", {
    value: source,
    onChange: e => setSource(e.target.value),
    className: "w-full h-11 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Surat"
  }, "Surat, Gujarat (Central Hub)"), /*#__PURE__*/React.createElement("option", {
    value: "Mumbai"
  }, "Mumbai / JNPT Port, MH"), /*#__PURE__*/React.createElement("option", {
    value: "Ahmedabad"
  }, "Ahmedabad, Gujarat"), /*#__PURE__*/React.createElement("option", {
    value: "Delhi"
  }, "Delhi NCR Hub"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-600 block mb-1"
  }, "Destination City"), /*#__PURE__*/React.createElement("select", {
    value: dest,
    onChange: e => setDest(e.target.value),
    className: "w-full h-11 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Delhi"
  }, "New Delhi / NCR"), /*#__PURE__*/React.createElement("option", {
    value: "Mumbai"
  }, "Mumbai Terminal, MH"), /*#__PURE__*/React.createElement("option", {
    value: "Bengaluru"
  }, "Bengaluru, Karnataka"), /*#__PURE__*/React.createElement("option", {
    value: "Hyderabad"
  }, "Hyderabad, Telangana"), /*#__PURE__*/React.createElement("option", {
    value: "Kolkata"
  }, "Kolkata, West Bengal"), /*#__PURE__*/React.createElement("option", {
    value: "Pune"
  }, "Pune, Maharashtra"), /*#__PURE__*/React.createElement("option", {
    value: "Jaipur"
  }, "Jaipur, Rajasthan")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-600 block mb-1"
  }, "Commercial Vehicle Type"), /*#__PURE__*/React.createElement("select", {
    value: truckType,
    onChange: e => setTruckType(e.target.value),
    className: "w-full h-11 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
  }, Object.entries(VEHICLE_SPECS).map(([k, v]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, v.name, " (", v.payload, " Payload)")))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCalculateQuote,
    className: "w-full h-12 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
  }, /*#__PURE__*/React.createElement("span", null, "Calculate Freight Estimate"), /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14 5l7 7m0 0l-7 7m7-7H3"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, calculatedQuote ? /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 font-medium"
  }, "Highway Transit"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs sm:text-sm font-bold text-slate-800 mt-0.5"
  }, "~", calculatedQuote.dist, " KM \u2022 ", calculatedQuote.time)), /*#__PURE__*/React.createElement("div", {
    className: "sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 font-medium"
  }, "Estimated Freight Range"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg sm:text-xl font-extrabold text-slate-950 font-heading"
  }, "\u20B9", calculatedQuote.minRate, " - \u20B9", calculatedQuote.maxRate))), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-100 pt-2"
  }, "* Inclusive of fuel & toll estimates. Final rate confirmed via dispatch order."), /*#__PURE__*/React.createElement("a", {
    href: calculatedQuote.waLink,
    target: "_blank",
    rel: "noopener",
    className: "w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
  }, /*#__PURE__*/React.createElement("span", null, "Confirm Vehicle on WhatsApp"), /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.63 13.48 14.47 13.44 14.3 13.68C14.14 13.93 13.67 14.49 13.53 14.65C13.39 14.81 13.24 14.83 12.99 14.71C12.75 14.59 11.96 14.33 11.02 13.49C10.29 12.84 9.8 12.03 9.65 11.78C9.51 11.54 9.64 11.4 9.76 11.28C9.87 11.17 10.01 10.99 10.13 10.84C10.26 10.7 10.3 10.59 10.38 10.43C10.46 10.26 10.42 10.12 10.36 10C10.3 9.88 9.81 8.68 9.61 8.18C9.41 7.69 9.21 7.76 9.06 7.75C8.92 7.74 8.76 7.74 8.59 7.74C8.43 7.74 8.16 7.8 7.94 8.05C7.71 8.29 7.08 8.88 7.08 10.09C7.08 11.3 7.96 12.47 8.08 12.63C8.21 12.8 9.81 15.28 12.27 16.34C12.86 16.59 13.31 16.74 13.67 16.86C14.26 17.05 14.8 17.02 15.22 16.96C15.69 16.89 16.66 16.37 16.86 15.79C17.07 15.22 17.07 14.73 17.01 14.63C16.95 14.52 16.81 14.49 16.56 14.37Z"
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-xl border border-dashed border-slate-300/80 bg-white/70 text-center flex flex-col items-center justify-center min-h-[120px] text-xs text-slate-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-700 block mb-1"
  }, "Awaiting Route Selection"), /*#__PURE__*/React.createElement("span", null, "Select cities and vehicle above, then tap Calculate.")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50/70 p-4 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between h-full space-y-5"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleTrackingSearch,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-200/80 pb-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-xl font-bold text-slate-900 font-heading"
  }, "Live GPS Consignment Tracking")), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200"
  }, "AIS-140 GPS")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-600 block mb-1"
  }, "Enter Docket / LR Number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: trackingCode,
    onChange: e => {
      setTrackingCode(e.target.value);
      setTrackingError('');
    },
    placeholder: "e.g. ARS-SUR-8842",
    className: "w-full h-11 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-semibold"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-600 block mb-1"
  }, "Transit Network Corridor"), /*#__PURE__*/React.createElement("select", {
    disabled: true,
    className: "w-full h-11 px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-600 text-xs sm:text-sm font-medium cursor-not-allowed"
  }, /*#__PURE__*/React.createElement("option", null, "Pan-India NH Express Corridors")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-semibold text-slate-600 block mb-1"
  }, "Quick Demo Dockets"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 h-11"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "h-11 px-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 font-mono text-xs sm:text-sm text-blue-700 font-bold transition-colors cursor-pointer flex items-center justify-center text-center shadow-2xs",
    onClick: () => {
      setTrackingCode('ARS-SUR-8842');
      setTrackingError('');
    }
  }, "ARS-SUR-8842"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "h-11 px-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 font-mono text-xs sm:text-sm text-blue-700 font-bold transition-colors cursor-pointer flex items-center justify-center text-center shadow-2xs",
    onClick: () => {
      setTrackingCode('ARS-99138');
      setTrackingError('');
    }
  }, "ARS-99138"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full h-12 px-4 rounded-lg bg-slate-900 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
  }, /*#__PURE__*/React.createElement("span", null, "Track Live Consignment"), /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14 5l7 7m0 0l-7 7m7-7H3"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, trackingError ? /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 rounded-xl border border-rose-200 bg-rose-50/80 text-center flex flex-col items-center justify-center min-h-[120px] text-xs text-rose-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-rose-900 block mb-1"
  }, "Docket Not Found"), /*#__PURE__*/React.createElement("span", null, trackingError)) : trackingResult ? /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-5 rounded-xl bg-white border border-blue-100 shadow-xs space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-100 pb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-bold text-blue-900 uppercase font-mono"
  }, trackingResult.status), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] sm:text-xs font-semibold text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200"
  }, "GPS ACTIVE")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[10px] sm:text-[11px]"
  }, "Origin Hub:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-900"
  }, trackingResult.origin)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[10px] sm:text-[11px]"
  }, "Destination:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-900"
  }, trackingResult.destination)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[10px] sm:text-[11px]"
  }, "Checkpoint:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-blue-700"
  }, trackingResult.checkpoint)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block text-[10px] sm:text-[11px]"
  }, "Arrival ETA:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-900"
  }, trackingResult.eta))), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-100 rounded-sm h-1.5 overflow-hidden mt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-600 h-1.5 rounded-sm w-3/4 animate-pulse"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-xl border border-dashed border-slate-300/80 bg-white/70 text-center flex flex-col items-center justify-center min-h-[120px] text-xs text-slate-500"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-700 block mb-1"
  }, "Awaiting Docket Input"), /*#__PURE__*/React.createElement("span", null, "Enter your LR/Docket number above and tap Track."))))))), /*#__PURE__*/React.createElement("section", {
    id: "operations",
    className: "py-14 sm:py-24 bg-slate-50/50 border-b border-slate-100 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-6 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[4/3] relative"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/images/indian-logistics-coordinator.jpg",
    alt: "Astha Road Services Logistics Operations Supervisor at Surat Terminal",
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] sm:text-xs font-semibold text-blue-300"
  }, "Surat Central Dispatch Facility"), /*#__PURE__*/React.createElement("div", {
    className: "text-base sm:text-lg font-bold"
  }, "24/7 Coordinated Logistics Operations"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] sm:text-xs text-slate-300 mt-1"
  }, "Direct oversight on loading, cargo weight distribution, and road permits.")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-6 space-y-4 sm:space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-0.5 w-6 bg-blue-600 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 font-mono"
  }, "Surat Terminal Logistics")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-normal font-heading"
  }, "Surat's Commercial Transport Backbone"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-600 leading-relaxed"
  }, "Astha Road Services operates out of prime logistics nodes in Surat, spanning Dindoli and Parvat Gam. We coordinate end-to-end industrial cargo transportation for textile mills, chemical manufacturing units, and heavy engineering facilities."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 sm:space-y-4 pt-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 13l4 4L19 7"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs sm:text-sm font-bold text-slate-900"
  }, "Direct Factory Placements"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] sm:text-xs text-slate-600 mt-0.5"
  }, "Containers stationed right at your factory bay within 2 hours of booking notice."))), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 13l4 4L19 7"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs sm:text-sm font-bold text-slate-900"
  }, "Weatherproof All-Weather Fleet"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] sm:text-xs text-slate-600 mt-0.5"
  }, "Zero monsoon water seepage or dust contamination for sensitive textiles, yarn, and FMCG."))), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3 sm:gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 13l4 4L19 7"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs sm:text-sm font-bold text-slate-900"
  }, "Rapid Toll & Border Clearance"), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] sm:text-xs text-slate-600 mt-0.5"
  }, "Fastag-enabled seamless transit through interstate check posts with zero administrative delays.")))))))), /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "py-14 sm:py-24 bg-white border-b border-slate-100 w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mb-8 sm:mb-12 space-y-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-0.5 w-6 bg-blue-600 rounded-sm"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-[0.2em] text-blue-600 font-mono"
  }, "Contact Us")), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-normal font-heading"
  }, "Direct Contact Lines & Head Office"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-600 leading-relaxed pt-1"
  }, "Connect directly with Astha Road Services for vehicle placements, consignment tracking, and freight contracts. Verified Surat offices and direct operational phone lines.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50/70 p-4 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between h-full space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-200/80 pb-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-xl font-bold text-slate-900 font-heading"
  }, "Direct Phone Numbers")), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-200"
  }, "Direct Lines")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 sm:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-base sm:text-lg font-bold text-slate-900 font-heading tracking-wide"
  }, "+91 99138 85099")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:9913885099",
    className: "py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
  })), /*#__PURE__*/React.createElement("span", null, "Call")), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/919913885099?text=Hello%20Astha%20Road%20Services",
    target: "_blank",
    rel: "noopener",
    className: "py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.63 13.48 14.47 13.44 14.3 13.68C14.14 13.93 13.67 14.49 13.53 14.65C13.39 14.81 13.24 14.83 12.99 14.71C12.75 14.59 11.96 14.33 11.02 13.49C10.29 12.84 9.8 12.03 9.65 11.78C9.51 11.54 9.64 11.4 9.76 11.28C9.87 11.17 10.01 10.99 10.13 10.84C10.26 10.7 10.3 10.59 10.38 10.43C10.46 10.26 10.42 10.12 10.36 10C10.3 9.88 9.81 8.68 9.61 8.18C9.41 7.69 9.21 7.76 9.06 7.75C8.92 7.74 8.76 7.74 8.59 7.74C8.43 7.74 8.16 7.8 7.94 8.05C7.71 8.29 7.08 8.88 7.08 10.09C7.08 11.3 7.96 12.47 8.08 12.63C8.21 12.8 9.81 15.28 12.27 16.34C12.86 16.59 13.31 16.74 13.67 16.86C14.26 17.05 14.8 17.02 15.22 16.96C15.69 16.89 16.66 16.37 16.86 15.79C17.07 15.22 17.07 14.73 17.01 14.63C16.95 14.52 16.81 14.49 16.56 14.37Z"
  })), /*#__PURE__*/React.createElement("span", null, "WhatsApp")))), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 sm:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-base sm:text-lg font-bold text-slate-900 font-heading tracking-wide"
  }, "+91 98251 77247")), /*#__PURE__*/React.createElement("div", {
    className: "w-full sm:w-auto"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:9825177247",
    className: "w-full sm:w-auto py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
  })), /*#__PURE__*/React.createElement("span", null, "Call")))), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5 sm:gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-base sm:text-lg font-bold text-slate-900 font-heading tracking-wide"
  }, "+91 99245 85099")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:9924585099",
    className: "py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
  })), /*#__PURE__*/React.createElement("span", null, "Call")), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/919924585099?text=Hello%20Astha%20Road%20Services",
    target: "_blank",
    rel: "noopener",
    className: "py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.63 13.48 14.47 13.44 14.3 13.68C14.14 13.93 13.67 14.49 13.53 14.65C13.39 14.81 13.24 14.83 12.99 14.71C12.75 14.59 11.96 14.33 11.02 13.49C10.29 12.84 9.8 12.03 9.65 11.78C9.51 11.54 9.64 11.4 9.76 11.28C9.87 11.17 10.01 10.99 10.13 10.84C10.26 10.7 10.3 10.59 10.38 10.43C10.46 10.26 10.42 10.12 10.36 10C10.3 9.88 9.81 8.68 9.61 8.18C9.41 7.69 9.21 7.76 9.06 7.75C8.92 7.74 8.76 7.74 8.59 7.74C8.43 7.74 8.16 7.8 7.94 8.05C7.71 8.29 7.08 8.88 7.08 10.09C7.08 11.3 7.96 12.47 8.08 12.63C8.21 12.8 9.81 15.28 12.27 16.34C12.86 16.59 13.31 16.74 13.67 16.86C14.26 17.05 14.8 17.02 15.22 16.96C15.69 16.89 16.66 16.37 16.86 15.79C17.07 15.22 17.07 14.73 17.01 14.63C16.95 14.52 16.81 14.49 16.56 14.37Z"
  })), /*#__PURE__*/React.createElement("span", null, "WhatsApp")))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3.5 border-t border-slate-200/80 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 text-xs text-slate-600"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 font-medium"
  }, "Official Email:"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@astharoadservices.com",
    className: "font-mono text-blue-600 hover:underline font-semibold"
  }, "info@astharoadservices.com"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50/70 p-4 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between h-full space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-200/80 pb-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
  }), /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  }))), /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-xl font-bold text-slate-900 font-heading"
  }, "Office Locations")), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider font-mono bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200"
  }, "Surat, Gujarat")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-blue-600 font-mono"
  }, "Operational Office"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-500"
  }, "Dindoli, Surat")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-700 leading-relaxed"
  }, "Shop No. 10, 3rd Floor, Madhuram Arcade-2, Near Madhuram Circle, Saniya Kharwasa Road, Dindoli, Surat - 394210"), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 border-t border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://maps.google.com/?q=Madhuram+Arcade+2+Dindoli+Surat",
    target: "_blank",
    rel: "noopener",
    className: "text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", null, "View on Google Maps"), /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-600 font-mono"
  }, "Registered Office"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-500"
  }, "Parvat Gam, Surat")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-700 leading-relaxed"
  }, "Plot No. 196, Chandralok Society, Godadara Road, Behind Ganga Sagar Row-House, Parvat Gam, Parvat, Surat - 395 012"), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 border-t border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://maps.google.com/?q=Chandralok+Society+Parvat+Gam+Surat",
    target: "_blank",
    rel: "noopener",
    className: "text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", null, "View on Google Maps"), /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
  }))))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 font-medium"
  }, "Statutory GSTIN:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-slate-900"
  }, "24BIRPM8067K1ZI")))))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-white py-10 sm:py-12 border-t border-slate-100 text-slate-600 text-xs sm:text-sm w-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-wide mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/images/as logo.png",
    alt: "Astha Logo",
    className: "h-8 sm:h-10 w-auto object-contain"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-900 font-heading block"
  }, "ASTHA ROAD SERVICES"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 block"
  }, "Fleet Owners & Transport Contractors \u2022 Surat, Gujarat"))), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500 text-center md:text-right"
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 ", new Date().getFullYear(), " Astha Road Services. All Rights Reserved."), /*#__PURE__*/React.createElement("div", {
    className: "mt-0.5"
  }, "Surat to Pan-India Full Truckload Logistics \u2022 100% GPS Monitored")))), /*#__PURE__*/React.createElement("div", {
    className: "md:hidden fixed bottom-0 inset-x-0 z-40 p-2.5 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl safe-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 text-xs font-semibold text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:9913885099",
    className: "py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform border border-white/10"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
  })), /*#__PURE__*/React.createElement("span", null, "Call")), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/919913885099?text=Hello%20Astha%20Road%20Services,%20I%20need%20transport.",
    target: "_blank",
    rel: "noopener",
    className: "py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md shadow-emerald-900/30"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-current",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.56 14.37C16.31 14.25 15.09 13.65 14.86 13.56C14.63 13.48 14.47 13.44 14.3 13.68C14.14 13.93 13.67 14.49 13.53 14.65C13.39 14.81 13.24 14.83 12.99 14.71C12.75 14.59 11.96 14.33 11.02 13.49C10.29 12.84 9.8 12.03 9.65 11.78C9.51 11.54 9.64 11.4 9.76 11.28C9.87 11.17 10.01 10.99 10.13 10.84C10.26 10.7 10.3 10.59 10.38 10.43C10.46 10.26 10.42 10.12 10.36 10C10.3 9.88 9.81 8.68 9.61 8.18C9.41 7.69 9.21 7.76 9.06 7.75C8.92 7.74 8.76 7.74 8.59 7.74C8.43 7.74 8.16 7.8 7.94 8.05C7.71 8.29 7.08 8.88 7.08 10.09C7.08 11.3 7.96 12.47 8.08 12.63C8.21 12.8 9.81 15.28 12.27 16.34C12.86 16.59 13.31 16.74 13.67 16.86C14.26 17.05 14.8 17.02 15.22 16.96C15.69 16.89 16.66 16.37 16.86 15.79C17.07 15.22 17.07 14.73 17.01 14.63C16.95 14.52 16.81 14.49 16.56 14.37Z"
  })), /*#__PURE__*/React.createElement("span", null, "WhatsApp")), /*#__PURE__*/React.createElement("button", {
    onClick: () => scrollToSection('estimator'),
    className: "py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md shadow-blue-900/30"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-3.5 h-3.5 fill-none stroke-current",
    viewBox: "0 0 24 24",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13 10V3L4 14h7v7l9-11h-7z"
  })), /*#__PURE__*/React.createElement("span", null, "Quote")))));
}

// Mount React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
})();
