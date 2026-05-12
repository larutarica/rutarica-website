import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500&display=swap');

  :root {
    --navy: #1A1A2E;
    --navy-light: #252545;
    --red: #C0392B;
    --red-light: #E74C3C;
    --gold: #F39C12;
    --gold-light: #F5B942;
    --white: #FFFFFF;
    --off-white: #F8F6F2;
    --gray: #8A8A9A;
    --border: rgba(255,255,255,0.08);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Barlow', sans-serif;
    background: var(--navy);
    color: var(--white);
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 0 40px;
    display: flex; align-items: center; justify-content: space-between;
    height: 72px;
    background: rgba(26,26,46,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
  }
  .nav.scrolled {
    height: 60px;
    background: rgba(26,26,46,0.98);
  }
  .nav-logo {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none;
  }
  .nav-rr {
    width: 42px; height: 42px; border-radius: 50%;
    background: var(--red);
    border: 2px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 900;
    color: var(--white);
    flex-shrink: 0;
  }
  .nav-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 700; letter-spacing: 2px;
    color: var(--white); text-transform: uppercase;
  }
  .nav-links {
    display: flex; align-items: center; gap: 32px;
    list-style: none;
  }
  .nav-links a {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 600; letter-spacing: 2px;
    color: var(--gray); text-decoration: none; text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-cta {
    background: var(--red);
    color: var(--white) !important;
    padding: 8px 20px;
    border-radius: 2px;
    transition: background 0.2s !important;
  }
  .nav-cta:hover { background: var(--red-light) !important; color: var(--white) !important; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 40px 80px;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse at 70% 30%, rgba(192,57,43,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(243,156,18,0.08) 0%, transparent 50%),
      linear-gradient(135deg, #1A1A2E 0%, #0D0D1F 100%);
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: 
      linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-content { position: relative; max-width: 900px; }
  .hero-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 4px;
    color: var(--gold); text-transform: uppercase;
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::before {
    content: ''; width: 40px; height: 1px; background: var(--gold);
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 900; line-height: 0.95;
    margin-bottom: 32px;
  }
  .hero-title span { color: var(--red); font-style: italic; }
  .hero-title .gold { color: var(--gold); }
  .hero-sub {
    font-size: 18px; font-weight: 300; line-height: 1.7;
    color: rgba(255,255,255,0.7); max-width: 560px;
    margin-bottom: 48px;
  }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--red); color: var(--white);
    padding: 16px 32px; border: none; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.2s;
  }
  .btn-primary:hover { background: var(--red-light); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--white);
    padding: 16px 32px; border: 1px solid rgba(255,255,255,0.3); cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; text-decoration: none;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.2s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
  .hero-stats {
    position: absolute; bottom: 60px; right: 40px;
    display: flex; gap: 48px;
  }
  .hero-stat { text-align: right; }
  .hero-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 36px; font-weight: 700; color: var(--gold);
    display: block;
  }
  .hero-stat-label {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    color: var(--gray); text-transform: uppercase;
  }
  .hero-scroll {
    position: absolute; bottom: 32px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    color: var(--gray); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    animation: bounce 2s infinite;
  }
  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }

  /* SECTION BASE */
  .section { padding: 100px 40px; }
  .section-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 4px;
    color: var(--gold); text-transform: uppercase;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::before { content: ''; width: 30px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 900; line-height: 1.1;
    margin-bottom: 20px;
  }
  .section-sub {
    font-size: 16px; font-weight: 300; line-height: 1.7;
    color: rgba(255,255,255,0.6); max-width: 560px;
    margin-bottom: 60px;
  }

  /* PILLARS */
  .pillars-section {
    background: linear-gradient(180deg, #0D0D1F 0%, var(--navy) 100%);
  }
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .pillar-card {
    background: rgba(255,255,255,0.03);
    padding: 40px 32px;
    border: 1px solid var(--border);
    position: relative; overflow: hidden;
    cursor: default;
    transition: all 0.3s ease;
  }
  .pillar-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: var(--red); transform: scaleX(0);
    transform-origin: left; transition: transform 0.3s ease;
  }
  .pillar-card:hover { background: rgba(255,255,255,0.06); transform: translateY(-4px); }
  .pillar-card:hover::before { transform: scaleX(1); }
  .pillar-icon { font-size: 36px; margin-bottom: 20px; display: block; }
  .pillar-num {
    font-family: 'Playfair Display', serif;
    font-size: 72px; font-weight: 900;
    color: rgba(255,255,255,0.04);
    position: absolute; top: 12px; right: 20px;
    line-height: 1;
  }
  .pillar-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 12px;
    color: var(--white);
  }
  .pillar-desc {
    font-size: 14px; font-weight: 300; line-height: 1.6;
    color: rgba(255,255,255,0.55);
  }
  .pillar-new {
    display: inline-block; margin-top: 16px;
    background: var(--gold); color: var(--navy);
    font-size: 9px; font-weight: 700; letter-spacing: 2px;
    padding: 3px 8px; text-transform: uppercase;
  }

  /* ABOUT */
  .about-section {
    background: var(--off-white); color: var(--navy);
    position: relative; overflow: hidden;
  }
  .about-section .section-label { color: var(--red); }
  .about-section .section-label::before { background: var(--red); }
  .about-section .section-title { color: var(--navy); }
  .about-inner {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
  }
  .about-text p {
    font-size: 16px; font-weight: 300; line-height: 1.8;
    color: rgba(26,26,46,0.7); margin-bottom: 20px;
  }
  .about-quote {
    border-left: 4px solid var(--red);
    padding-left: 24px; margin: 32px 0;
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-style: italic; line-height: 1.5;
    color: var(--navy);
  }
  .about-cards { display: flex; flex-direction: column; gap: 16px; }
  .about-card {
    background: var(--navy); color: var(--white);
    padding: 28px 32px;
    display: flex; align-items: flex-start; gap: 20px;
  }
  .about-card-icon {
    width: 48px; height: 48px; flex-shrink: 0;
    background: var(--red);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .about-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 6px;
  }
  .about-card-text { font-size: 13px; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.5; }

  /* CONTENT FEED */
  .feed-section { background: #0D0D1F; }
  .feed-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .feed-card {
    background: var(--navy-light);
    border: 1px solid var(--border);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .feed-card:hover { border-color: var(--red); transform: translateY(-6px); }
  .feed-thumb {
    height: 180px; position: relative;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .feed-thumb-bg {
    position: absolute; inset: 0;
  }
  .feed-thumb-text {
    position: relative; z-index: 1;
    padding: 20px; text-align: center;
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; line-height: 1.3;
    color: var(--white); text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  }
  .feed-play {
    position: absolute; z-index: 2;
    width: 48px; height: 48px; border-radius: 50%;
    background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    border: 1px solid rgba(255,255,255,0.3);
  }
  .feed-body { padding: 20px 24px 24px; }
  .feed-platform {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 8px;
  }
  .feed-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 700;
    margin-bottom: 10px; line-height: 1.3;
    color: var(--white);
  }
  .feed-stats {
    display: flex; gap: 16px;
    font-size: 12px; color: var(--gray);
  }
  .feed-stat { display: flex; align-items: center; gap: 4px; }

  /* AFFILIATES */
  .affiliates-section {
    background: var(--navy);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  .affiliates-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  .affiliate-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    padding: 32px;
    display: flex; align-items: center; gap: 24px;
    transition: all 0.3s ease; cursor: pointer;
    text-decoration: none; color: var(--white);
  }
  .affiliate-card:hover {
    border-color: var(--gold);
    background: rgba(243,156,18,0.05);
    transform: translateY(-3px);
  }
  .affiliate-icon {
    width: 64px; height: 64px; flex-shrink: 0;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; font-weight: 700;
  }
  .affiliate-info { flex: 1; }
  .affiliate-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 6px;
  }
  .affiliate-desc { font-size: 13px; color: var(--gray); line-height: 1.5; }
  .affiliate-badge {
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    padding: 4px 10px; text-transform: uppercase; margin-top: 10px;
    display: inline-block;
  }
  .badge-live { background: rgba(26,122,74,0.2); color: #4CAF82; }
  .badge-coming { background: rgba(243,156,18,0.15); color: var(--gold); }
  .affiliate-arrow { font-size: 24px; color: var(--gray); flex-shrink: 0; }

  /* MARKET */
  .market-section {
    background: var(--red);
    position: relative; overflow: hidden;
  }
  .market-section .section-label { color: rgba(255,255,255,0.7); }
  .market-section .section-label::before { background: rgba(255,255,255,0.5); }
  .market-bg {
    position: absolute; inset: 0; opacity: 0.05;
    background-image: repeating-linear-gradient(
      45deg, #fff 0px, #fff 1px, transparent 0px, transparent 50%
    );
    background-size: 20px 20px;
  }
  .market-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2px; position: relative;
  }
  .market-stat {
    background: rgba(0,0,0,0.2); padding: 40px 32px;
    text-align: center;
  }
  .market-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 52px; font-weight: 900;
    color: var(--white); display: block; line-height: 1;
    margin-bottom: 8px;
  }
  .market-stat-label {
    font-size: 12px; font-weight: 400; letter-spacing: 1px;
    color: rgba(255,255,255,0.7); line-height: 1.4;
  }

  /* CONTACT */
  .contact-section { background: #0D0D1F; }
  .contact-inner {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: start;
  }
  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .contact-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    color: var(--white); padding: 16px 20px;
    font-family: 'Barlow', sans-serif; font-size: 15px;
    outline: none; transition: border 0.2s; width: 100%;
  }
  .contact-input:focus { border-color: var(--gold); }
  .contact-input::placeholder { color: var(--gray); }
  .contact-textarea { resize: vertical; min-height: 120px; }
  .contact-info { display: flex; flex-direction: column; gap: 32px; }
  .contact-item { display: flex; align-items: flex-start; gap: 20px; }
  .contact-item-icon {
    width: 48px; height: 48px; flex-shrink: 0;
    background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .contact-item-label {
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 6px;
  }
  .contact-item-value { font-size: 15px; color: rgba(255,255,255,0.8); }
  .social-links { display: flex; gap: 12px; margin-top: 16px; }
  .social-link {
    width: 44px; height: 44px;
    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; text-decoration: none; color: var(--white);
    transition: all 0.2s;
  }
  .social-link:hover { background: var(--red); border-color: var(--red); }

  /* FOOTER */
  .footer {
    background: #060610;
    padding: 60px 40px 40px;
    border-top: 1px solid var(--border);
  }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 60px; margin-bottom: 60px;
  }
  .footer-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 32px; font-weight: 900; margin-bottom: 16px;
  }
  .footer-brand-name span { color: var(--gold); font-style: italic; }
  .footer-tagline {
    font-size: 13px; color: var(--gray); line-height: 1.7; margin-bottom: 24px;
  }
  .footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold);
    margin-bottom: 20px;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a {
    font-size: 14px; color: var(--gray); text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--white); }
  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 32px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-size: 13px; color: var(--gray); }
  .footer-disclaimer {
    font-size: 11px; color: rgba(255,255,255,0.3);
    max-width: 500px; text-align: right; line-height: 1.5;
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero { padding: 100px 24px 60px; }
    .hero-stats { position: static; margin-top: 48px; justify-content: flex-start; }
    .section { padding: 70px 24px; }
    .pillars-grid { grid-template-columns: 1fr; }
    .about-inner { grid-template-columns: 1fr; gap: 40px; }
    .feed-grid { grid-template-columns: 1fr; }
    .affiliates-grid { grid-template-columns: 1fr; }
    .market-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-inner { grid-template-columns: 1fr; gap: 40px; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
    .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    .footer-disclaimer { text-align: center; }
    .nav { padding: 0 24px; }
    .footer { padding: 60px 24px 40px; }
  }

  .fade-in {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`;

const pillars = [
  { icon: "🏨", num: "01", name: "Road Warrior Life", desc: "Business travel elevated — hotel hacks, airport lounges, packing tips, and city guides from real corporate travel.", isNew: false },
  { icon: "💳", num: "02", name: "Puntos & Strategy", desc: "Travel hacking for the bilingual professional — credit card points, miles optimization, and hotel loyalty programs.", isNew: false },
  { icon: "🌎", num: "03", name: "Ciudad Spotlight", desc: "Every business trip becomes a content opportunity — best spots, hidden gems, local food and culture.", isNew: false },
  { icon: "💰", num: "04", name: "Build While You Travel", desc: "Wealth building for busy professionals — investing basics, passive income, and smart money moves during travel.", isNew: false },
  { icon: "🔥", num: "05", name: "Motivación", desc: "Bold, aspirational, culture-driven mindset content — the highest engagement pillar, built for community.", isNew: false },
  { icon: "📊", num: "06", name: "Crédito & Wealth", desc: "Credit literacy for Latino professionals — scores, utilization, card strategy, repair myths, and generational wealth.", isNew: true },
];

const posts = [
  { platform: "YouTube · 915 views", title: "My company flew me to NYC. Here's what I did for free.", thumb: "#C0392B", stats: ["915 views", "11 likes", "2 comments"] },
  { platform: "YouTube · 960 views", title: "My company paid for the trips. My points are paying for New Orleans.", thumb: "#1A1A2E", stats: ["960 views", "5 likes", "337 X views"] },
  { platform: "YouTube · 143 views", title: "We didn't come this far to just pay bills.", thumb: "#922B21", stats: ["143 views", "2 likes", "2 comments"] },
  { platform: "YouTube · 225 views", title: "Your credit card has a secret. Most people never find it.", thumb: "#A93226", stats: ["225 views", "1 like", "0 comments"] },
  { platform: "X · 337 views", title: "My company paid for the trips. My points are paying for New Orleans.", thumb: "#0D0D1F", stats: ["337 video views", "6 reposts", "5 likes"] },
  { platform: "Instagram · 128 views", title: "My company flew me to NYC. Here's what I did for free.", thumb: "#7B241C", stats: ["128 views", "111 reached", "58.2% skip rate"] },
];

const affiliates = [
  { icon: "🏨", name: "Book Hotels", desc: "Road warrior approved hotel bookings. Every stay earns points. Every booking supports RutaRica.", badge: "LIVE", badgeClass: "badge-live", bg: "#C0392B" },
  { icon: "🎒", name: "Road Warrior Essentials", desc: "Everything I actually use on business trips — packing gear, tech, and travel tools on Amazon.", badge: "LIVE", badgeClass: "badge-live", bg: "#F39C12" },
  { icon: "💳", name: "Chase Sapphire", desc: "The premier travel card for points strategy. Apply and start earning on every business trip.", badge: "COMING SOON", badgeClass: "badge-coming", bg: "#1A5276" },
  { icon: "🌟", name: "Amex Travel", desc: "Premium card with lounge access, travel credits, and the points strategy that changes the game.", badge: "COMING SOON", badgeClass: "badge-coming", bg: "#117A65" },
];

export default function RutaRicaWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const observerRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a className="nav-logo" href="#home">
          <div className="nav-rr">RR</div>
          <span className="nav-name">RutaRica</span>
        </a>
        <ul className="nav-links">
          {[["Pillars","pillars"],["Content","content"],["Affiliates","affiliates"],["About","about"],["Contact","contact"]].map(([l,id])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();scrollTo(id)}}>{l}</a></li>
          ))}
          <li><a href="#contact" className="nav-cta" onClick={e=>{e.preventDefault();scrollTo("contact")}}>Collab</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow fade-in">Bilingual · Bold · First-Gen</div>
          <h1 className="hero-title fade-in">
            Travel <span>Bold.</span><br />
            Build <span className="gold">Wealth.</span><br />
            Vive Rico.
          </h1>
          <p className="hero-sub fade-in">
            The go-to bilingual destination for Latino professionals who refuse to choose between grinding hard and living well. Travel smarter, stack points, build real wealth — en dos idiomas.
          </p>
          <div className="hero-actions fade-in">
            <a href="#content" className="btn-primary" onClick={e=>{e.preventDefault();scrollTo("content")}}>Watch the Content ↓</a>
            <a href="#affiliates" className="btn-outline" onClick={e=>{e.preventDefault();scrollTo("affiliates")}}>Road Warrior Gear →</a>
          </div>
        </div>
        <div className="hero-stats">
          {[["1,500+","YouTube Views · Week 1"],["6","Content Pillars"],["4","Platforms Active"]].map(([n,l])=>(
            <div className="hero-stat fade-in" key={l}>
              <span className="hero-stat-num">{n}</span>
              <span className="hero-stat-label">{l}</span>
            </div>
          ))}
        </div>
        <div className="hero-scroll">
          <span style={{fontSize:20}}>↓</span>
          <span style={{fontSize:10,letterSpacing:3}}>Scroll</span>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section pillars-section" id="pillars">
        <div className="section-label fade-in">Content Strategy</div>
        <h2 className="section-title fade-in">Six Pillars.<br />One Community.</h2>
        <p className="section-sub fade-in">Every post lives inside a proven content architecture built to educate, inspire, and convert the ambitious Latino professional.</p>
        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <div className="pillar-card fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="pillar-num">{p.num}</span>
              <span className="pillar-icon">{p.icon}</span>
              <div className="pillar-name">{p.name}</div>
              <div className="pillar-desc">{p.desc}</div>
              {p.isNew && <span className="pillar-new">New Pillar</span>}
            </div>
          ))}
        </div>
      </section>

      {/* MARKET STATS */}
      <section className="market-section section" id="market">
        <div className="market-bg" />
        <div className="section-label fade-in" style={{color:'rgba(255,255,255,0.7)'}}>Market Opportunity</div>
        <h2 className="section-title fade-in" style={{marginBottom:60}}>An Underserved<br />$3.4 Trillion Market.</h2>
        <div className="market-grid">
          {[["62M+","Latinos in the U.S."],["$3.4T","Purchasing Power by 2026"],["Zero","Creators Own This Niche"],["25–45","Target Age — Peak Earners"]].map(([n,l])=>(
            <div className="market-stat fade-in" key={l}>
              <span className="market-stat-num">{n}</span>
              <span className="market-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT FEED */}
      <section className="section feed-section" id="content">
        <div className="section-label fade-in">Latest Content</div>
        <h2 className="section-title fade-in">Real Stories.<br />Real Results.</h2>
        <p className="section-sub fade-in">Every post comes from a real business trip, a real points redemption, a real first-gen moment. No scripts. No actors. Just the ruta.</p>
        <div className="feed-grid">
          {posts.map((p, i) => (
            <div className="feed-card fade-in" key={i}>
              <div className="feed-thumb">
                <div className="feed-thumb-bg" style={{ background: `linear-gradient(135deg, ${p.thumb} 0%, #0D0D1F 100%)` }} />
                <div className="feed-thumb-text">{p.title}</div>
                <div className="feed-play">▶</div>
              </div>
              <div className="feed-body">
                <div className="feed-platform">{p.platform}</div>
                <div className="feed-title">{p.title}</div>
                <div className="feed-stats">
                  {p.stats.map((s, j) => <span className="feed-stat" key={j}>· {s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}}>
          <a href="https://www.youtube.com/@larutarica" target="_blank" rel="noreferrer" className="btn-outline">Watch All Videos →</a>
        </div>
      </section>

      {/* AFFILIATES */}
      <section className="section affiliates-section" id="affiliates">
        <div className="section-label fade-in">Road Warrior Resources</div>
        <h2 className="section-title fade-in">Everything I Use.<br />All In One Place.</h2>
        <p className="section-sub fade-in">Vetted tools, gear, and financial products personally used on every business trip. Real recommendations — not paid placements.</p>
        <div className="affiliates-grid">
          {affiliates.map((a, i) => (
            <a className="affiliate-card fade-in" key={i} href="https://beacons.ai/rutarica" target="_blank" rel="noreferrer">
              <div className="affiliate-icon" style={{ background: `rgba(255,255,255,0.08)`, fontSize: 32 }}>{a.icon}</div>
              <div className="affiliate-info">
                <div className="affiliate-name">{a.name}</div>
                <div className="affiliate-desc">{a.desc}</div>
                <span className={`affiliate-badge ${a.badgeClass}`}>{a.badge}</span>
              </div>
              <div className="affiliate-arrow">→</div>
            </a>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}}>
          <a href="https://beacons.ai/rutarica" target="_blank" rel="noreferrer" className="btn-primary">All Resources at beacons.ai/rutarica →</a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="about-inner">
          <div className="about-text fade-in">
            <div className="section-label">The Story</div>
            <h2 className="section-title">We Didn't Come<br />This Far to Just<br />Pay Bills.</h2>
            <p>RutaRica was built by a first-generation Central American operations and logistics professional who travels for work every other week — and realized nobody was talking to us about the opportunities hiding in plain sight.</p>
            <p>The points. The lounges. The per diem strategy. The wealth you can build while your company pays for your flights. En dos idiomas.</p>
            <div className="about-quote">
              "RutaRica is proof of concept for a life where your career fuels your freedom, your culture is your strength, and your content builds wealth while you sleep."
            </div>
          </div>
          <div className="about-cards fade-in">
            {[
              { icon: "✈️", title: "Real Travel Footage", text: "Business trips every other week — zero additional travel cost. Authentic content from real road warrior experiences." },
              { icon: "🗣️", title: "Genuine Spanglish", text: "Not performed bilingualism. A genuine lived identity as a first-generation Central American professional." },
              { icon: "⚡", title: "AI-Augmented Production", text: "Full content workflow compressed to 60–90 minutes per post. Consistent quality. Minimal overhead." },
              { icon: "🏆", title: "First-Mover Advantage", text: "No major creator owns the Latino professional travel + wealth space. RutaRica is building that lane." },
            ].map((c, i) => (
              <div className="about-card" key={i}>
                <div className="about-card-icon">{c.icon}</div>
                <div>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-text">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="contact-inner">
          <div className="fade-in">
            <div className="section-label">Work With Us</div>
            <h2 className="section-title" style={{marginBottom:20}}>Let's Build<br />Something Bold.</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontSize:15,lineHeight:1.7,marginBottom:48}}>Sponsorship opportunities, brand collaborations, and partnership inquiries for brands that want authentic access to the ambitious Latino professional market.</p>
            <div className="contact-info">
              {[
                { icon: "📧", label: "Email", value: "hola@rutarica.com" },
                { icon: "🌐", label: "Website", value: "rutarica.com" },
                { icon: "📍", label: "Based In", value: "McKinney, Texas · Traveling Everywhere" },
              ].map((item, i) => (
                <div className="contact-item" key={i}>
                  <div className="contact-item-icon">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">{item.value}</div>
                  </div>
                </div>
              ))}
              <div>
                <div className="contact-item-label" style={{marginBottom:12}}>Follow the Ruta</div>
                <div className="social-links">
                  {[["📱","TikTok"],["📸","Instagram"],["▶️","YouTube"],["𝕏","X"]].map(([icon, name]) => (
                    <a key={name} className="social-link" href="https://beacons.ai/rutarica" target="_blank" rel="noreferrer" title={name}>{icon}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fade-in">
            <div className="contact-form">
              <input className="contact-input" placeholder="Your Name" type="text" />
              <input className="contact-input" placeholder="Email Address" type="email" />
              <input className="contact-input" placeholder="Company / Brand" type="text" />
              <textarea className="contact-input contact-textarea" placeholder="Tell us about the collaboration..." />
              <button className="btn-primary" style={{alignSelf:'flex-start'}}>Send Message →</button>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.3)',lineHeight:1.6,marginTop:8}}>Not financial advice. All financial content is for educational purposes only. Consult a financial professional for your specific situation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Ruta<span>Rica</span></div>
            <div className="footer-tagline">The go-to bilingual destination for Latino professionals who refuse to choose between grinding hard and living well — en dos idiomas.</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.25)',lineHeight:1.6}}>@LaRutaRica on TikTok, Instagram, YouTube & X</div>
          </div>
          <div>
            <div className="footer-col-title">Content</div>
            <ul className="footer-links">
              {["Road Warrior Life","Puntos & Strategy","Ciudad Spotlight","Build While You Travel","Motivación","Crédito & Wealth"].map(l=>(
                <li key={l}><a href="#pillars" onClick={e=>{e.preventDefault();scrollTo("pillars")}}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <ul className="footer-links">
              {[["Book Hotels","https://beacons.ai/rutarica"],["Amazon Essentials","https://beacons.ai/rutarica"],["All Links","https://beacons.ai/rutarica"]].map(([l,h])=>(
                <li key={l}><a href={h} target="_blank" rel="noreferrer">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              {[["TikTok","https://tiktok.com/@larutarica"],["Instagram","https://instagram.com/larutarica"],["YouTube","https://youtube.com/@larutarica"],["X / Twitter","https://x.com/larutarica"],["hola@rutarica.com","mailto:hola@rutarica.com"]].map(([l,h])=>(
                <li key={l}><a href={h} target="_blank" rel="noreferrer">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 RutaRica. All rights reserved. <span style={{color:'rgba(255,255,255,0.25)',margin:'0 8px'}}>·</span> Trabaja duro. Viaja smart. Vive rico.</div>
          <div className="footer-disclaimer">Not financial advice. Content is for educational purposes only. Consult a qualified financial professional for advice specific to your situation.</div>
        </div>
      </footer>
    </>
  );
}

