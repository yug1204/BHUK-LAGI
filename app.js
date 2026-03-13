// =============================================
// BHUK LAGI — APP JS (Platform-Centric Search)
// =============================================

// ---- TIERED FOOD IMAGES (Budget / Mid / Premium) ----
// Price tiers:  budget = under ₹80 | mid = ₹80–149 | premium = ₹150+
const FOOD_TIER_IMAGES = {
  biryani: {
    budget:  "images/biryani_budget.png",   // simple dhaba plate
    mid:     "images/biryani_mid.png",      // casual restaurant bowl
    premium: "images/biryani_premium.png",  // royal handi dum
  },
  thali: {
    budget:  "images/thali_budget.png",     // canteen steel plate
    mid:     "images/thali.png",            // decent restaurant
    premium: "images/thali_premium.png",    // elaborate 12-item
  },
  dosa: {
    budget:  "images/dosa_budget.png",      // small eatery basic
    mid:     "images/dosa.png",             // proper restaurant
    premium: "images/dosa.png",             // (reuse mid)
  },
  "pav bhaji": {
    budget:  "images/pavbhaji.png",         // street stall
    mid:     "images/pavbhaji.png",
    premium: "images/pavbhaji.png",
  },
  samosa: {
    budget:  "images/samosa_budget.png",    // newspaper street vendor
    mid:     "images/samosa.png",           // plated with chutneys
    premium: "images/samosa.png",
  },
  chai: {
    budget:  "images/chai.png",
    mid:     "images/chai.png",
    premium: "images/chai.png",
  },
};

// Price → tier label
function getPriceTier(price) {
  if (price < 80)  return "budget";
  if (price < 150) return "mid";
  return "premium";
}

// Price tier → display label with color
function getTierLabel(price) {
  if (price < 80)  return { label:"🟢 Budget",  color:"#00d68f", bg:"rgba(0,214,143,0.12)",  border:"rgba(0,214,143,0.3)" };
  if (price < 150) return { label:"🟡 Mid-Range",color:"#ffb300", bg:"rgba(255,179,0,0.12)", border:"rgba(255,179,0,0.3)" };
  return               { label:"🔴 Premium",    color:"#ff6b00", bg:"rgba(255,107,0,0.12)",  border:"rgba(255,107,0,0.35)" };
}

// Look up correct image for a food+price combo
function getFoodImage(food, price) {
  const tier = price !== undefined ? getPriceTier(price) : "mid";
  for (const key in FOOD_TIER_IMAGES) {
    if (food.toLowerCase().includes(key)) {
      return FOOD_TIER_IMAGES[key][tier] || FOOD_TIER_IMAGES[key].mid;
    }
  }
  return "images/biryani_mid.png"; // fallback
}

// ---- PLATFORMS CONFIG ----
const PLATFORMS = [
  { id:"zomato",   name:"Zomato",   emoji:"🔴", color:"#E23744", bgColor:"rgba(226,55,68,0.12)",   borderColor:"rgba(226,55,68,0.4)",   tagline:"Food Delivery", badge:"30-50 min",
    getUrl:(q,loc)=>`https://www.zomato.com/${encodeURIComponent((loc||'mumbai').toLowerCase().replace(/\s+/g,'-'))}/order/${encodeURIComponent(q)}-restaurants` },
  { id:"swiggy",   name:"Swiggy",   emoji:"🟠", color:"#FC8019", bgColor:"rgba(252,128,25,0.12)",  borderColor:"rgba(252,128,25,0.4)",   tagline:"Food Delivery", badge:"25-45 min",
    getUrl:(q)=>`https://www.swiggy.com/search?query=${encodeURIComponent(q)}` },
  { id:"blinkit",  name:"Blinkit",  emoji:"🟡", color:"#D4A017", bgColor:"rgba(212,160,23,0.12)",  borderColor:"rgba(212,160,23,0.4)",   tagline:"10-min Grocery", badge:"10 min",
    getUrl:(q)=>`https://blinkit.com/s/?q=${encodeURIComponent(q)}` },
  { id:"zepto",    name:"Zepto",    emoji:"🟣", color:"#9B51E0", bgColor:"rgba(155,81,224,0.12)",  borderColor:"rgba(155,81,224,0.4)",   tagline:"Instant Delivery", badge:"10 min",
    getUrl:(q)=>`https://www.zeptonow.com/search?query=${encodeURIComponent(q)}` },
  { id:"magicpin", name:"Magicpin", emoji:"🟢", color:"#00B37C", bgColor:"rgba(0,179,124,0.12)",   borderColor:"rgba(0,179,124,0.4)",   tagline:"Cashback Deals",  badge:"+ cashback",
    getUrl:(q)=>`https://magicpin.in/search/?search_term=${encodeURIComponent(q)}` },
  { id:"eatsure",  name:"EatSure",  emoji:"🔵", color:"#006AFF", bgColor:"rgba(0,106,255,0.12)",   borderColor:"rgba(0,106,255,0.4)",   tagline:"Multi-Brand", badge:"No extra fee",
    getUrl:(q)=>`https://www.eatsure.com/search?query=${encodeURIComponent(q)}` },
];

// ---- PLATFORM FOOD PRICE DATABASE ----
// Each entry: one dish on one platform in one city area, with realistic price
const PLATFORM_MENU = [

  /* ========== BIRYANI ========== */
  // Online platforms
  { food:"biryani", platformId:"zomato",   restaurant:"Paradise Biryani",       area:"Andheri",   price:149, originalPrice:199, rating:4.4, distance:1.2, deliveryTime:"35 min",  type:"online",  desc:"Hyderabadi Dum Biryani, half plate. Zomato Gold: free delivery." },
  { food:"biryani", platformId:"zomato",   restaurant:"Biryani Blues",           area:"Bandra",    price:129, originalPrice:169, rating:4.3, distance:2.0, deliveryTime:"40 min",  type:"online",  desc:"Budget chicken biryani, 450g portion. Use FIRST50 for ₹50 off." },
  { food:"biryani", platformId:"swiggy",   restaurant:"Behrouz Biryani",         area:"Dadar",     price:159, originalPrice:219, rating:4.5, distance:1.8, deliveryTime:"38 min",  type:"online",  desc:"Royal dum biryani in clay pot. Swiggy One: free delivery." },
  { food:"biryani", platformId:"swiggy",   restaurant:"Biryani By Kilo",         area:"Malad",     price:169, originalPrice:229, rating:4.6, distance:2.4, deliveryTime:"45 min",  type:"online",  desc:"Premium handi biryani. Comes sealed in premium packaging." },
  { food:"biryani", platformId:"zepto",    restaurant:"Zepto Eats – Dum Biryani",area:"Kurla",     price:99,  originalPrice:130, rating:4.1, distance:1.0, deliveryTime:"12 min",  type:"online",  desc:"Zepto's budget biryani deal. Often sold out by 9PM!" },
  { food:"biryani", platformId:"eatsure",  restaurant:"Biryani & More (EatSure)",area:"Powai",     price:139, originalPrice:180, rating:4.3, distance:2.1, deliveryTime:"32 min",  type:"online",  desc:"Multi-brand combo. No platform fee charged." },
  { food:"biryani", platformId:"magicpin", restaurant:"Al-Baik Biryani",         area:"Ghatkopar", price:89,  originalPrice:130, rating:4.2, distance:2.6, deliveryTime:"40 min",  type:"online",  desc:"Get 20% cashback on Magicpin. Best deal when paid by wallet." },
  // Offline / local
  { food:"biryani", platformId:"local",    restaurant:"Sardar Biryani House",    area:"Andheri",   price:79,  originalPrice:130, rating:4.6, distance:0.3, deliveryTime:"Walk-in", type:"offline", desc:"Famous since 1972. Cash only. Avg queue: 10 mins. Worth it!" },
  { food:"biryani", platformId:"local",    restaurant:"Hotel Noor Biryani",      area:"Kurla",     price:59,  originalPrice:90,  rating:4.2, distance:0.8, deliveryTime:"Walk-in", type:"offline", desc:"Small dhaba. Generous portion. Open 11AM–11PM. Cash only." },
  { food:"biryani", platformId:"local",    restaurant:"Mess Bhai Biryani",       area:"Dharavi",   price:45,  originalPrice:70,  rating:4.0, distance:0.5, deliveryTime:"Walk-in", type:"offline", desc:"Budget worker mess. Cheapest biryani in 5km. Basic but filling." },

  /* ========== THALI ========== */
  { food:"thali", platformId:"zomato",   restaurant:"Rajdhani Thali",           area:"Bandra",    price:199, originalPrice:280, rating:4.7, distance:1.8, deliveryTime:"42 min",  type:"online",  desc:"12-item unlimited thali delivered. Zomato Gold discount applies." },
  { food:"thali", platformId:"swiggy",   restaurant:"Thali Express (Swiggy)",   area:"Malad",     price:149, originalPrice:199, rating:4.3, distance:2.4, deliveryTime:"35 min",  type:"online",  desc:"Dal + Sabzi + 5 Roti + Rice + Sweet. Swiggy One: free delivery." },
  { food:"thali", platformId:"eatsure",  restaurant:"Homestyle Thali (EatSure)",area:"Andheri",   price:129, originalPrice:169, rating:4.4, distance:1.5, deliveryTime:"30 min",  type:"online",  desc:"6-item veg thali, no platform surcharge. EatSure value deal." },
  { food:"thali", platformId:"magicpin", restaurant:"Shree Thali (Magicpin)",   area:"Dadar",     price:80,  originalPrice:120, rating:4.5, distance:0.4, deliveryTime:"Walk-in", type:"online",  desc:"Dine-in deal via Magicpin. 33% cashback on bill. Unlimited refills." },
  { food:"thali", platformId:"local",    restaurant:"Shree Thali Niwas",        area:"Dadar",     price:80,  originalPrice:120, rating:4.5, distance:0.4, deliveryTime:"Walk-in", type:"offline", desc:"Pure veg unlimited thali. Free dessert on weekends!" },
  { food:"thali", platformId:"local",    restaurant:"IIT Canteen Thali",        area:"Powai",     price:35,  originalPrice:55,  rating:3.9, distance:1.0, deliveryTime:"Walk-in", type:"offline", desc:"Open to public (not just students). Veg only. Ultra budget." },
  { food:"thali", platformId:"local",    restaurant:"Annapurna Bhojnalaya",     area:"Khar",      price:60,  originalPrice:90,  rating:4.1, distance:0.7, deliveryTime:"Walk-in", type:"offline", desc:"Roti + Dal + Sabzi + Rice. Simple South Mumbai style thali." },

  /* ========== DOSA ========== */
  { food:"dosa", platformId:"zomato",   restaurant:"MTR Dosa (Zomato)",        area:"Bandra",    price:110, originalPrice:145, rating:4.6, distance:1.6, deliveryTime:"30 min",  type:"online",  desc:"Iconic MTR batter. Delivered with sambar + 2 chutneys." },
  { food:"dosa", platformId:"swiggy",   restaurant:"Dosa Plaza (Swiggy)",     area:"Goregaon",   price:89,  originalPrice:120, rating:4.2, distance:2.2, deliveryTime:"35 min",  type:"online",  desc:"10 types of dosa on menu. Budget masala dosa is the best deal." },
  { food:"dosa", platformId:"magicpin", restaurant:"Udupi Sagar (Magicpin)",  area:"Matunga",    price:50,  originalPrice:75,  rating:4.8, distance:0.2, deliveryTime:"Walk-in", type:"online",  desc:"Walk-in deal via Magicpin. Earn 15% cashback on every visit." },
  { food:"dosa", platformId:"local",    restaurant:"Udupi Sagar",             area:"Matunga",    price:50,  originalPrice:75,  rating:4.8, distance:0.2, deliveryTime:"Walk-in", type:"offline", desc:"Crispy masala dosa. Best in Mumbai since 1968. Always fresh." },
  { food:"dosa", platformId:"local",    restaurant:"Ambica Darshini",         area:"Sion",       price:35,  originalPrice:55,  rating:4.1, distance:0.9, deliveryTime:"Walk-in", type:"offline", desc:"Cheapest dosa in area. Paper dosa ₹35. Morning only till 12PM." },
  { food:"dosa", platformId:"local",    restaurant:"Café Madras",             area:"Matunga",    price:45,  originalPrice:65,  rating:4.4, distance:0.5, deliveryTime:"Walk-in", type:"offline", desc:"70-year-old Udupi café. Ghee roast dosa is legendary." },

  /* ========== PAV BHAJI ========== */
  { food:"pav bhaji", platformId:"zomato",   restaurant:"Cannon Pav Bhaji (Zomato)", area:"CST",     price:130, originalPrice:165, rating:4.5, distance:2.0, deliveryTime:"40 min", type:"online",  desc:"Famous street stall now on delivery. 2 pav + bhaji, extra butter." },
  { food:"pav bhaji", platformId:"swiggy",   restaurant:"Pav Bhaji House (Swiggy)",  area:"Worli",   price:110, originalPrice:145, rating:4.3, distance:1.5, deliveryTime:"32 min", type:"online",  desc:"Large portion. Swiggy One members get free delivery." },
  { food:"pav bhaji", platformId:"zepto",    restaurant:"Zepto Eats – Pav Bhaji",    area:"Kurla",   price:79,  originalPrice:110, rating:4.0, distance:1.2, deliveryTime:"13 min", type:"online",  desc:"Quick 13-min delivery. Small portion but very cheap." },
  { food:"pav bhaji", platformId:"magicpin", restaurant:"Sardar Pav Bhaji (Dine-in)",area:"Tardeo",  price:70,  originalPrice:100, rating:4.9, distance:0.5, deliveryTime:"Walk-in", type:"online", desc:"Mumbai legend since 1963. Magicpin cashback: 10% back." },
  { food:"pav bhaji", platformId:"local",    restaurant:"Sardar Pav Bhaji",          area:"Tardeo",  price:70,  originalPrice:100, rating:4.9, distance:0.5, deliveryTime:"Walk-in", type:"offline", desc:"Mumbai legend since 1963. Butter-loaded. Queue expected." },
  { food:"pav bhaji", platformId:"local",    restaurant:"Evening Street Stall",       area:"Juhu",    price:40,  originalPrice:60,  rating:4.0, distance:0.1, deliveryTime:"Walk-in", type:"offline", desc:"Open 5PM–11PM only. Freshly made. Most affordable option." },
  { food:"pav bhaji", platformId:"local",    restaurant:"Sukh Sagar",                 area:"Churchgate",price:85, originalPrice:115, rating:4.3,distance:1.8, deliveryTime:"Walk-in", type:"offline", desc:"Classic Mumbai café. Special pav bhaji with cheese topping." },

  /* ========== SAMOSA ========== */
  { food:"samosa", platformId:"zomato",   restaurant:"Haldiram's Samosa (Zomato)",  area:"Andheri", price:49,  originalPrice:65,  rating:4.4, distance:1.4, deliveryTime:"25 min", type:"online",  desc:"Pack of 4 samosas + chutney. Min order ₹149 on Zomato." },
  { food:"samosa", platformId:"swiggy",   restaurant:"Haldiram's Samosa (Swiggy)",  area:"Vile Parle",price:45, originalPrice:60,  rating:4.3, distance:1.8, deliveryTime:"28 min", type:"online",  desc:"Pack of 4. Swiggy Now fastest delivery option." },
  { food:"samosa", platformId:"blinkit",  restaurant:"Blinkit Kitchen – Samosa",    area:"Andheri", price:39,  originalPrice:55,  rating:4.1, distance:0.8, deliveryTime:"10 min", type:"online",  desc:"Blinkit's fresh kitchen samosa. Ready in 10 mins. Pack of 3." },
  { food:"samosa", platformId:"zepto",    restaurant:"Zepto Cafe – Samosa",         area:"Kurla",   price:29,  originalPrice:45,  rating:4.0, distance:1.0, deliveryTime:"10 min", type:"online",  desc:"Super cheap samosa deal. Pack of 2. Amazing value." },
  { food:"samosa", platformId:"local",    restaurant:"Tea Kadak + Samosa",          area:"Worli",   price:30,  originalPrice:45,  rating:4.6, distance:0.2, deliveryTime:"Walk-in", type:"offline", desc:"2 Samosas + Cutting Chai combo. Evening snack king." },
  { food:"samosa", platformId:"local",    restaurant:"Bikaneri Bhujia Shop",        area:"Mulund",  price:10,  originalPrice:15,  rating:4.2, distance:0.3, deliveryTime:"Walk-in", type:"offline", desc:"Just ₹10/samosa! Buy 10 get 1 free. Piping hot." },

  /* ========== CHAI ========== */
  { food:"chai", platformId:"magicpin", restaurant:"Chai Point (Magicpin)",       area:"Andheri", price:30,  originalPrice:50,  rating:4.3, distance:0.6, deliveryTime:"Dine-in", type:"online",  desc:"Masala chai + snack combo deal via Magicpin cashback." },
  { food:"chai", platformId:"zomato",   restaurant:"Chaayos (Zomato)",            area:"Bandra",  price:59,  originalPrice:85,  rating:4.4, distance:1.4, deliveryTime:"30 min",  type:"online",  desc:"Customizable chai delivered hot. Min order ₹99 on Zomato." },
  { food:"chai", platformId:"swiggy",   restaurant:"Tea Villa Café (Swiggy)",     area:"Malad",   price:49,  originalPrice:70,  rating:4.2, distance:2.1, deliveryTime:"28 min",  type:"online",  desc:"Chai + 2 biscuits combo. Budget breakfast deal." },
  { food:"chai", platformId:"local",    restaurant:"Cutting Chai Corner",         area:"Andheri", price:10,  originalPrice:18,  rating:4.7, distance:0.1, deliveryTime:"Walk-in", type:"offline", desc:"₹10 cutting chai, freshly brewed every 15 mins. Mumbai staple." },
  { food:"chai", platformId:"local",    restaurant:"Café Irani",                  area:"Grant Road",price:15, originalPrice:25,  rating:4.3, distance:0.5, deliveryTime:"Walk-in", type:"offline", desc:"Old Irani-style. Chai + bun maska ₹30 combo. Nostalgic vibe." },
  { food:"chai", platformId:"local",    restaurant:"Vada Pav + Chai Stall",       area:"Andheri", price:25,  originalPrice:40,  rating:4.7, distance:0.1, deliveryTime:"Walk-in", type:"offline", desc:"Vada Pav ₹15 + Chai ₹10 — full tummy for ₹25!" },
];

const FOOD_CATEGORIES = [
  { name:"Biryani",     emoji:"🍚", key:"biryani" },
  { name:"Thali",       emoji:"🍱", key:"thali" },
  { name:"Dosa",        emoji:"🥞", key:"dosa" },
  { name:"Pav Bhaji",   emoji:"🍞", key:"pav bhaji" },
  { name:"Samosa",      emoji:"🥟", key:"samosa" },
  { name:"Chai + Snack",emoji:"☕", key:"chai" },
  { name:"Dal Rice",    emoji:"🍛", key:"dal rice" },
  { name:"Pizza",       emoji:"🍕", key:"pizza" },
  { name:"Burger",      emoji:"🍔", key:"burger" },
  { name:"Noodles",     emoji:"🍜", key:"noodles" },
  { name:"Idli",        emoji:"🫓", key:"idli" },
  { name:"Chole Bhature",emoji:"🥘",key:"chole bhature" },
];

const TODAY_DEALS = [
  { name:"Veg Thali",     place:"Annapurna Mess, Dadar",        emoji:"🍱", price:49,  original:120, timeLeft:"3h 20m", food:"thali" },
  { name:"Chicken Biryani",place:"Al-Baik, Kurla",             emoji:"🍚", price:79,  original:160, timeLeft:"1h 45m", food:"biryani" },
  { name:"Masala Dosa",   place:"Udupi Corner, Matunga",        emoji:"🥞", price:39,  original:80,  timeLeft:"5h 00m", food:"dosa" },
  { name:"Vada Pav Combo",place:"Jumbo Vadapav, Malad",         emoji:"🍔", price:19,  original:45,  timeLeft:"2h 10m", food:"pav bhaji" },
  { name:"Paneer Roll",   place:"Rollex, Juhu",                 emoji:"🌯", price:59,  original:130, timeLeft:"4h 30m", food:"biryani" },
  { name:"Chai + 2 Samosa",place:"Mumbai Chaiwala, CST",        emoji:"☕", price:29,  original:60,  timeLeft:"0h 55m", food:"chai" },
  { name:"Egg Fried Rice",place:"Dragon Fast Food, Bandra",     emoji:"🍳", price:69,  original:135, timeLeft:"6h 00m", food:"thali" },
  { name:"Pav Bhaji",     place:"Sunshine, Worli",              emoji:"🍞", price:55,  original:100, timeLeft:"2h 40m", food:"pav bhaji" },
];

// ---- STATE ----
let currentBudget = 999;
let currentTab = "all";
let userLocation = "Mumbai";
let sortBy = "price";
let searchQuery = "";

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initSearch();
  initBudgetBar();
  initTabs();
  renderDeals();
  renderCategories();
  initFlashTimer();
  initSavingsCalculator();
  initStatCounters();
  initLocationModal();
  initFoodModal();
  initQuickPicks();
  initSortSelect();
  initHamburger();
  renderPlatformShowcase();
});

// ---- NAVBAR ----
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 40));
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
}

function initHamburger() {
  document.getElementById("hamburger").addEventListener("click", () =>
    document.getElementById("navLinks").classList.toggle("open"));
}

// ---- SEARCH ----
function initSearch() {
  document.getElementById("searchBtn").addEventListener("click", runSearch);
  document.getElementById("searchInput").addEventListener("keydown", e => { if (e.key === "Enter") runSearch(); });
  const emojis = ["🍛","🍚","🥞","🍱","🥟","🍞","☕","🍔","🍜","🍕"];
  let idx = 0;
  document.getElementById("searchEmojiSelector").addEventListener("click", () => {
    idx = (idx + 1) % emojis.length;
    document.getElementById("searchEmojiSelector").textContent = emojis[idx];
  });
}

function initQuickPicks() {
  document.querySelectorAll(".qp-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("searchInput").value = btn.dataset.food;
      runSearch();
    });
  });
}

function runSearch() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const loc   = document.getElementById("locationInput").value.trim();
  if (!query) { showToast("❗ Please enter a food item!"); return; }
  searchQuery = query;
  if (loc) userLocation = loc;
  document.getElementById("dealsCity").textContent = userLocation || "Mumbai";
  filterAndRenderResults(query);
  document.getElementById("resultsSection").style.display = "block";
  setTimeout(() => document.getElementById("resultsSection").scrollIntoView({ behavior:"smooth", block:"start" }), 100);
}

// ---- MAIN RESULTS ENGINE ----
function filterAndRenderResults(query) {
  // Match food items from PLATFORM_MENU
  let results = PLATFORM_MENU.filter(item => {
    const matchFood = item.food.toLowerCase().includes(query) ||
                      query.includes(item.food.toLowerCase()) ||
                      item.restaurant.toLowerCase().includes(query) ||
                      item.desc.toLowerCase().includes(query);
    const matchBudget = item.price <= currentBudget;
    const matchTab = currentTab === "all" ? true :
                     currentTab === "offline" ? item.type === "offline" :
                     currentTab === "online"  ? item.type === "online"  :
                     currentTab === "deals"   ? item.price < item.originalPrice * 0.65 : true;
    return matchFood && matchBudget && matchTab;
  });

  // Sort
  if (sortBy === "price")    results.sort((a,b) => a.price - b.price);
  else if (sortBy === "distance") results.sort((a,b) => a.distance - b.distance);
  else if (sortBy === "rating")   results.sort((a,b) => b.rating - a.rating);

  const cheapest = results.length > 0 ? results.reduce((a, b) => a.price < b.price ? a : b) : null;

  // Render header
  document.getElementById("resultsTitle").textContent = results.length > 0
    ? `🍽️ Found ${results.length} options for "${query}" in ${userLocation}`
    : `😔 No results for "${query}"`;

  const grid = document.getElementById("resultsGrid");
  const noRes = document.getElementById("noResults");
  grid.innerHTML = "";
  noRes.style.display = results.length === 0 ? "block" : "none";

  // --- CHEAPEST HIGHLIGHT BANNER ---
  if (cheapest) {
    const p = PLATFORMS.find(pl => pl.id === cheapest.platformId) || { name: "Local", emoji:"🏪", color:"#ff6b00", bgColor:"rgba(255,107,0,0.12)", borderColor:"rgba(255,107,0,0.4)" };
    const cheapestImg = getFoodImage(query, cheapest.price);
    const banner = document.createElement("div");
    banner.className = "cheapest-banner";
    banner.style.cssText = `grid-column:1/-1;`;
    banner.innerHTML = `
      <div class="cb-inner">
        <img src="${cheapestImg}" alt="${query}" class="cb-img" onerror="this.style.display='none'"/>
        <div class="cb-content">
          <div class="cb-badge">🏆 CHEAPEST FOUND</div>
          <h3 class="cb-title">${cheapest.restaurant}</h3>
          <div class="cb-meta">
            <span class="cb-platform" style="color:${p.color};background:${p.bgColor};border:1px solid ${p.borderColor};">${p.emoji} ${p.name}</span>
            <span>📍 ${cheapest.area} — ${cheapest.distance} km away</span>
            <span>⭐ ${cheapest.rating}</span>
            <span>${cheapest.type === "offline" ? "🏪 Walk-in" : "🚴 " + cheapest.deliveryTime}</span>
          </div>
          <p class="cb-desc">${cheapest.desc}</p>
          <div class="cb-bottom">
            <div class="cb-price-row">
              <span class="cb-price">₹${cheapest.price}</span>
              <span class="cb-orig">₹${cheapest.originalPrice}</span>
              <span class="cb-save">Save ₹${cheapest.originalPrice - cheapest.price}!</span>
            </div>
            ${cheapest.type === "offline"
              ? `<button class="cb-btn" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(cheapest.restaurant+' '+cheapest.area)}','_blank')">🗺️ Get Directions ↗</button>`
              : `<a class="cb-btn" href="${PLATFORMS.find(pl=>pl.id===cheapest.platformId)?.getUrl(query,userLocation)||'#'}" target="_blank" rel="noopener">🛒 Order Now on ${p.name} ↗</a>`}
          </div>
        </div>
      </div>`;
    grid.appendChild(banner);
  }

  // --- SEARCH ON APPS PANEL ---
  const appsPanel = document.createElement("div");
  appsPanel.className = "apps-search-panel";
  appsPanel.style.cssText = "grid-column:1/-1;";
  appsPanel.innerHTML = `
    <div class="asp-header">
      <div>
        <div class="asp-title">🔍 Also search "<strong style="color:var(--primary)">${query}</strong>" directly on:</div>
        <div class="asp-sub">Tap any app to search & compare prices in real time →</div>
      </div>
    </div>
    <div class="asp-platforms">
      ${PLATFORMS.map(p => `
        <a href="${p.getUrl(query, userLocation)}" target="_blank" rel="noopener" class="asp-card" style="border-color:${p.borderColor};">
          <div class="asp-emoji">${p.emoji}</div>
          <div class="asp-info">
            <span class="asp-name" style="color:${p.color};">${p.name}</span>
            <span class="asp-sub2">${p.tagline}</span>
          </div>
          <div class="asp-badge" style="color:${p.color};border-color:${p.borderColor};background:${p.bgColor};">${p.badge}</div>
        </a>`).join("")}
    </div>`;
  grid.appendChild(appsPanel);

  // --- RESULT CARDS ---
  results.forEach((item, i) => {
    const card = createResultCard(item, query, i === 0 && !cheapest);
    card.style.animation = `fadeInUp 0.4s ease ${i * 50}ms both`;
    grid.appendChild(card);
  });
}

// ---- RESULT CARD ----
function createResultCard(item, query, isCheapest) {
  const p = PLATFORMS.find(pl => pl.id === item.platformId) || { name:"Local", emoji:"🏪", color:"#ff6b00", bgColor:"rgba(255,107,0,0.12)", borderColor:"rgba(255,107,0,0.4)" };
  const savePct = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
  const isOffline = item.type === "offline";
  const cardImg = getFoodImage(item.food, item.price); // tier-specific image
  const tier    = getTierLabel(item.price);            // budget/mid/premium badge
  const fallbackEmoji = ({biryani:'🍚',thali:'🍱',dosa:'🥞',samosa:'🥟','pav bhaji':'🍞',chai:'☕'})[item.food] || '🍛';
  const card = document.createElement("div");
  card.className = "result-card" + (savePct >= 35 ? " best-deal" : "");
  card.innerHTML = `
    <div class="rc-img-wrap">
      <img src="${cardImg}" alt="${item.food}" class="rc-img-photo" onerror="this.outerHTML='<div class=&quot;rc-img-fallback&quot;>'+'${fallbackEmoji}'+'</div>'"/>
      <div class="rc-img-overlay">
        <span class="rc-platform-badge" style="background:${p.bgColor};border:1.5px solid ${p.borderColor};color:${p.color};">${p.emoji} ${p.name}</span>
        <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end;">
          <span class="rc-tier-badge" style="background:${tier.bg};border:1px solid ${tier.border};color:${tier.color};">${tier.label}</span>
          ${savePct >= 35 ? '<span class="rc-deal-badge">🔥 HOT DEAL</span>' : ""}
        </div>
      </div>
    </div>
    <div class="rc-body">
      <div class="rc-top">
        <div class="rc-name">${item.restaurant}</div>
        <div class="rc-rating">⭐ ${item.rating}</div>
      </div>
      <div class="rc-meta">
        <span>📍 ${item.area} — ${item.distance} km</span>
        <span>${isOffline ? "🏪 Walk-in" : "🚴 " + item.deliveryTime}</span>
      </div>
      <div class="rc-desc">${item.desc}</div>
      <div class="rc-bottom">
        <div class="rc-price-wrap">
          <span class="rc-price">₹${item.price}</span>
          <span class="rc-price-orig">₹${item.originalPrice}</span>
          <span class="rc-price-save">-${savePct}%</span>
        </div>
        ${isOffline
          ? `<button class="rc-action" onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(item.restaurant+" "+item.area)}','_blank')">🗺️ Directions</button>`
          : `<a class="rc-action" href="${p.getUrl ? p.getUrl(item.food, userLocation) : '#'}" target="_blank" rel="noopener">Order ↗</a>`}
      </div>
    </div>`;
  return card;
}

// ---- PLATFORM SHOWCASE (hero) ----
function renderPlatformShowcase() {
  const el = document.getElementById("platformShowcase");
  if (!el) return;
  el.innerHTML = PLATFORMS.map(p =>
    `<div class="ps-chip" style="border-color:${p.borderColor};">
      <span>${p.emoji}</span>
      <span style="color:${p.color};font-weight:700;">${p.name}</span>
    </div>`).join("");
}

// ---- BUDGET BAR ----
function initBudgetBar() {
  document.querySelectorAll(".bb-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".bb-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentBudget = parseInt(btn.dataset.max);
      if (searchQuery) filterAndRenderResults(searchQuery);
    });
  });
}

// ---- TABS ----
function initTabs() {
  document.querySelectorAll(".rtab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".rtab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentTab = tab.dataset.tab;
      if (searchQuery) filterAndRenderResults(searchQuery);
    });
  });
}

// ---- SORT ----
function initSortSelect() {
  document.getElementById("sortSelect").addEventListener("change", e => {
    sortBy = e.target.value;
    if (searchQuery) filterAndRenderResults(searchQuery);
  });
}

// ---- DEALS ----
function renderDeals() {
  const grid = document.getElementById("dealsGrid");
  grid.innerHTML = "";
  TODAY_DEALS.forEach(deal => {
    const img = getFoodImage(deal.food || deal.name, deal.price);
    const card = document.createElement("div");
    card.className = "deal-card";
    card.innerHTML = `
      <div class="dc-time-badge">⏳ ${deal.timeLeft}</div>
      <div class="dc-img-wrap">
        <img src="${img}" alt="${deal.name}" class="dc-img" onerror="this.parentElement.innerHTML='<div class=\\'dc-emoji-bg\\'>${deal.emoji}</div>'"/>
        <div class="dc-img-emoji">${deal.emoji}</div>
      </div>
      <div class="dc-body">
        <div class="dc-name">${deal.name}</div>
        <div class="dc-place">📍 ${deal.place}</div>
        <div class="dc-footer">
          <div class="dc-price-wrap">
            <span class="dc-price">₹${deal.price}</span>
            <span class="dc-orig">₹${deal.original}</span>
          </div>
          <button class="dc-btn" onclick="document.getElementById('searchInput').value='${deal.food||deal.name}';runSearch();">Search →</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ---- CATEGORIES ----
function renderCategories() {
  const grid = document.getElementById("categoriesGrid");
  grid.innerHTML = "";
  FOOD_CATEGORIES.forEach(cat => {
    const img = getFoodImage(cat.key, 100); // Using mid-tier (₹100) for categories
    const card = document.createElement("div");
    card.className = "cat-card";
    card.innerHTML = img
      ? `<div class="cat-img-wrap"><img src="${img}" alt="${cat.name}" class="cat-img" onerror="this.parentElement.innerHTML='<span class=\\'cat-emoji\\'>${cat.emoji}</span>'"/></div><div class="cat-name">${cat.name}</div>`
      : `<span class="cat-emoji">${cat.emoji}</span><div class="cat-name">${cat.name}</div>`;
    card.addEventListener("click", () => {
      document.getElementById("searchInput").value = cat.key;
      runSearch();
    });
    grid.appendChild(card);
  });
}

// ---- FLASH TIMER ----
function initFlashTimer() {
  const el = document.getElementById("flashTimer");
  let secs = 2 * 3600 + 45 * 60 + 30;
  setInterval(() => {
    if (secs <= 0) { el.textContent = "EXPIRED"; return; }
    secs--;
    el.textContent = [Math.floor(secs/3600), Math.floor((secs%3600)/60), secs%60]
      .map(v => String(v).padStart(2,"0")).join(":");
  }, 1000);
}

// ---- SAVINGS CALCULATOR ----
function initSavingsCalculator() {
  const ms = document.getElementById("mealsSlider");
  const ds = document.getElementById("daysSlider");
  const mv = document.getElementById("mealsVal");
  const dv = document.getElementById("daysVal");
  const res = document.getElementById("savingsResult");
  function calc() {
    mv.textContent = ms.value; dv.textContent = ds.value;
    res.textContent = `₹${(ms.value * ds.value * 30).toLocaleString("en-IN")}`;
  }
  ms.addEventListener("input", calc); ds.addEventListener("input", calc); calc();
}

// ---- STAT COUNTERS ----
function initStatCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target, target = parseInt(el.dataset.target);
        let cur = 0; const step = Math.max(1, Math.floor(target / 60));
        const t = setInterval(() => { cur = Math.min(cur + step, target); el.textContent = cur.toLocaleString("en-IN"); if (cur >= target) clearInterval(t); }, 30);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-target]").forEach(c => obs.observe(c));
}

// ---- LOCATION MODAL ----
function initLocationModal() {
  const modal = document.getElementById("locationModal");
  const gpsBtn = document.getElementById("useGpsBtn");
  document.getElementById("detectLocationBtn").addEventListener("click", () => modal.classList.add("show"));
  document.getElementById("closeLocationModal").addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
  gpsBtn.addEventListener("click", () => {
    gpsBtn.innerHTML = "<span>📡 Detecting...</span>";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => { 
          userLocation = "Your Location"; 
          document.getElementById("locationInput").value = userLocation; 
          modal.classList.remove("show"); 
          showToast("📍 Location detected!"); 
        },
        () => { 
          userLocation = "Mumbai"; 
          document.getElementById("locationInput").value = "Mumbai"; 
          modal.classList.remove("show"); 
          showToast("📍 Using Mumbai as default"); 
          gpsBtn.innerHTML = "<span>📡 Use My Current Location</span>"; 
        }
      );
    } else { showToast("⚠️ GPS not supported"); gpsBtn.innerHTML = "<span>📡 Use My Current Location</span>"; }
  });
  document.getElementById("setManualLocation").addEventListener("click", () => {
    const val = document.getElementById("manualLocationInput").value.trim();
    if (!val) { showToast("❗ Enter a location"); return; }
    userLocation = val; 
    document.getElementById("locationInput").value = val;
    modal.classList.remove("show"); // CLOSE MODAL
    showToast(`📍 Location set to ${val}!`);
    if (searchQuery) filterAndRenderResults(searchQuery);
  });
  document.getElementById("changeCity")?.addEventListener("click", e => { e.preventDefault(); modal.classList.add("show"); });
}

// ---- FOOD MODAL ----
function initFoodModal() {
  const modal = document.getElementById("foodDetailModal");
  document.getElementById("closeFoodModal").addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
}

// ---- TOAST ----
function showToast(msg, dur = 3000) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), dur);
}
