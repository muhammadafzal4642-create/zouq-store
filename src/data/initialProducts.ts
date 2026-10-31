import { Product, Coupon, Order } from '../types/store.ts';

export const INITIAL_PRODUCTS: Product[] = [
  // --- SOCKS CATEGORY ---
  {
    id: 'sock-01',
    slug: 'royal-combed-cotton-socks-trio',
    name: 'Mughal Heritage Combed Cotton Crew Socks (Pack of 3)',
    nameUrdu: 'شاہی مغل کُمبڈ کاٹن کریو موزے (۳ کا سیٹ)',
    category: 'socks',
    categoryName: 'Socks',
    categoryNameUrdu: 'موزے',
    price: 1950,
    originalPrice: 2450,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockQuantity: 45,
    sku: 'ZQ-SCK-001',
    images: [
      '/src/assets/images/product_luxury_egyptian_socks_1793436063612.jpg',
      '/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg'
    ],
    badges: ['Bestseller', '200-Needle Weave'],
    badgesUrdu: ['سب سے زیادہ مقبول', '۲۰۰ سوئی بنائی'],
    shortDescription: 'Ultra-soft 200-needle combed cotton dress socks in charcoal, camel, and royal navy with hand-linked seamless toes.',
    shortDescriptionUrdu: 'انتہائی ملائم ۲۰۰ سوئی کاٹن سے بنے ڈریس موزے، چارکول، کیمل اور نیوی بلیو رنگ میں۔',
    description: 'Crafted in Faisalabad from long-staple combed cotton and Scottish mercerized threads. Features a non-binding comfort cuff, reinforced double heel, and hand-linked flat seamless toes for exceptional day-long luxury inside leather oxfords or loafers.',
    descriptionUrdu: 'فیصل آباد کی بہترین ٹیکسٹائل روایت کے تحت تیار کردہ۔ لمبا ریشہ اور ہاتھ سے بنائی گئی ہموار سلائی جو جوتوں میں پورا دن بے مثال آرام اور پائیداری فراہم کرتی ہے۔',
    specs: {
      origin: 'Faisalabad Textile Hub, Pakistan',
      originUrdu: 'فیصل آباد ٹیکسٹائل، پاکستان',
      material: '82% Combed Cotton, 15% Polyamide, 3% Elastane',
      materialUrdu: '۸۲٪ کُمبڈ کاٹن، ۱۵٪ پولیامائیڈ، ۳٪ ایلاسٹین',
      care: 'Machine wash 30°C delicate, lay flat to dry',
      careUrdu: 'ہلکے گرم پانی میں دھوئیں، دھوپ میں سکھائیں',
      packaging: 'Luxury matte foiled sliding gift box with tissue wrap',
      packagingUrdu: 'شاہی میٹ گولڈ گفٹ باکس'
    },
    variations: [
      {
        id: 'var-size',
        name: 'Size',
        nameUrdu: 'سائز',
        options: ['Medium (UK 6-9)', 'Large (UK 9-12)']
      },
      {
        id: 'var-pack',
        name: 'Pack Selection',
        nameUrdu: 'پیک کا انتخاب',
        options: ['Classic Trio (Navy, Camel, Charcoal)', 'Monochrome Pack (All Black)']
      }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'sock-02',
    slug: 'cashmere-merino-blend-socks',
    name: 'Kashmir Cashmere & Merino Wool Executive Socks',
    nameUrdu: 'کشمیری پشمینہ و میرینو وول ایگزیکٹو موزے',
    category: 'socks',
    categoryName: 'Socks',
    categoryNameUrdu: 'موزے',
    price: 2850,
    originalPrice: 3400,
    discountPercent: 16,
    rating: 4.8,
    reviewCount: 88,
    inStock: true,
    stockQuantity: 18,
    sku: 'ZQ-SCK-002',
    images: [
      '/src/assets/images/product_luxury_egyptian_socks_1793436063612.jpg'
    ],
    badges: ['Heirloom Blend', 'Pure Warmth'],
    badgesUrdu: ['خالص پشمینہ', 'بہترین گرمائش'],
    shortDescription: 'Sumptuous winter executive socks woven from Himalayan cashmere and Australian merino wool.',
    shortDescriptionUrdu: 'ہمالیائی پشمینہ اور آسٹریلین میرینو وول سے بنے انتہائی نرم اور باوقار سرمائی موزے۔',
    description: 'Tailored for discerning gentlemen and connoisseurs of timeless formalwear. The insulating hollow cashmere fibers regulate temperature naturally, preventing sweat while keeping feet comfortably warm through chilly northern evenings.',
    descriptionUrdu: 'خالص پشمینہ کی قدرتی خاصیت پاؤں کو بغیر پسینے کے متوازن گرمائش اور شائستہ انداز بخشتی ہے۔',
    specs: {
      origin: 'Kashmir & Northern Highlands, Pakistan',
      originUrdu: 'کشمیر و شمالی علاقہ جات، پاکستان',
      material: '45% Cashmere, 40% Merino Wool, 15% Nylon',
      materialUrdu: '۴۵٪ پشمینہ، ۴۰٪ میرینو وول، ۱۵٪ نائلون',
      care: 'Dry clean or gentle hand wash in lukewarm water',
      careUrdu: 'ہلکے ہاتھ سے دھوئیں یا ڈرائی کلین کروائیں',
      packaging: 'Cedarwood scented storage case',
      packagingUrdu: 'دیودار کی خوشبو والا محفوظ باکس'
    },
    variations: [
      {
        id: 'var-color',
        name: 'Color',
        nameUrdu: 'رنگ',
        options: ['Midnight Charcoal', 'Highland Camel', 'Forest Olive']
      }
    ],
    featured: false,
    bestSeller: true
  },
  {
    id: 'sock-03',
    slug: 'seamless-bamboo-ankle-socks',
    name: 'BreezeVent Organic Bamboo Invisible Loafer Socks (5 Pairs)',
    nameUrdu: 'نامیاتی بانس کے ہوادار لوفر موزے (۵ جوڑے)',
    category: 'socks',
    categoryName: 'Socks',
    categoryNameUrdu: 'موزے',
    price: 2200,
    originalPrice: 2700,
    discountPercent: 18,
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
    stockQuantity: 32,
    sku: 'ZQ-SCK-003',
    images: [
      '/src/assets/images/product_luxury_egyptian_socks_1793436063612.jpg'
    ],
    badges: ['Anti-Odor', 'Eco Bamboo'],
    badgesUrdu: ['بدبو سے پاک', 'ماحول دوست'],
    shortDescription: 'Naturally antibacterial bamboo fiber socks with silicone heel grips that stay securely invisible inside loafers.',
    shortDescriptionUrdu: 'بانس کے جراثیم کش ریشوں سے بنے پسینہ جذب کرنے والے سلیکون گرپ والے جدید موزے۔',
    description: 'Designed specifically for Pakistan hot summers. Organic bamboo viscose wicks moisture 3x faster than regular cotton, while medical-grade non-slip silicone pads on the heel guarantee no slipping inside traditional Peshawari chappals or modern driving loafers.',
    descriptionUrdu: 'پاکستانی گرم موسم کے عین مطابق، پسینہ فوری جذب کرنے والی قدرتی صلاحیت کے ساتھ۔',
    specs: {
      origin: 'Lahore, Pakistan',
      originUrdu: 'لاہور، پاکستان',
      material: '85% Bamboo Viscose, 12% Spandex, 3% Silicone',
      materialUrdu: '۸۵٪ بانس وسکوز، ۱۲٪ اسپینڈیکس، ۳٪ سلیکون گرپ',
      care: 'Machine wash cold with similar shades',
      careUrdu: 'ٹھنڈے پانی میں مشین واش کریں',
      packaging: 'Recycled botanical craft sleeve',
      packagingUrdu: 'ماحول دوست کرافٹ پاؤچ'
    },
    featured: false,
    bestSeller: false
  },

  // --- JEWELLERY CATEGORY ---
  {
    id: 'jewel-01',
    slug: 'nizam-polki-choker-pearl-necklace',
    name: 'Nizam-ul-Mulk 22K Gold Plated Handcrafted Polki Choker',
    nameUrdu: 'نظام الملک ۲۲ قیراط گولڈ پلیٹڈ دستکاری پولکی چوکر',
    category: 'jewellery',
    categoryName: 'Jewellery',
    categoryNameUrdu: 'زیورات',
    price: 18500,
    originalPrice: 22500,
    discountPercent: 18,
    rating: 5.0,
    reviewCount: 67,
    inStock: true,
    stockQuantity: 7,
    sku: 'ZQ-JWL-001',
    images: [
      '/src/assets/images/product_polki_kundan_jewellery_1793436065109.jpg',
      '/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg'
    ],
    badges: ['Royal Heirloom', 'Master Artisan'],
    badgesUrdu: ['شاہی ورثہ', 'استاد کاریگر کا فن'],
    shortDescription: 'Spectacular Mughal-inspired choker encrusted with uncut Polki stones, real emerald accents, and cascading Hyderabad pearls.',
    shortDescriptionUrdu: 'مغلائی طرز پر تیار کردہ نایاب پولکی نگینوں اور حیدرآبادی سچے موتیوں کا شاہکار چوکر۔',
    description: 'Hand-fashioned by 4th-generation Zargars in the walled city of Lahore. Featuring closed-back silver foil setting, layered 22-karat micro-micron gold plating with anti-tarnish lacquering, and an adjustable braided silk zari cord (dori) that rests comfortably on the neck.',
    descriptionUrdu: 'اندرونِ لاہور کے روایتی زرگروں کے ہاتھوں خالص چاندی اور ۲۲ قیراط سونے کے ملمع کے ساتھ تیار کیا گیا۔ صدیوں کی نفاست اور شاہی وقار کا مظہر۔',
    specs: {
      origin: 'Walled City (Androon), Lahore, Pakistan',
      originUrdu: 'اندرون لاہور، پاکستان',
      material: '22K Gold Vermeil over Brass/Silver, Hydro Emeralds, Cultured Basra Pearls',
      materialUrdu: '۲۲ قیراط سونا، زمرد، اصلی بصرہ کلچرڈ موتی',
      care: 'Keep away from moisture & perfume, store in velvet pouch',
      careUrdu: 'عطر اور پانی سے دور رکھیں، مخملی ڈبے میں سنبھالیں',
      packaging: 'Handcrafted velvet heirloom jewellery casket with certificate of craft',
      packagingUrdu: 'شاہی مخمل بکس اور اصلیت کی سند'
    },
    variations: [
      {
        id: 'var-gem',
        name: 'Stone Accent',
        nameUrdu: 'نگینہ کلر',
        options: ['Tourmaline Emerald (Classic Green)', 'Royal Ruby Red', 'Imperial Pearl White']
      }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'jewel-02',
    slug: 'chandbali-kundan-jhumkas',
    name: 'Chandbali Kundan & Emerald Pearl Jhumkas',
    nameUrdu: 'چاند بالی کندن اور زمرد موتی جھمکے',
    category: 'jewellery',
    categoryName: 'Jewellery',
    categoryNameUrdu: 'زیورات',
    price: 8900,
    originalPrice: 11200,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 114,
    inStock: true,
    stockQuantity: 14,
    sku: 'ZQ-JWL-002',
    images: [
      '/src/assets/images/product_polki_kundan_jewellery_1793436065109.jpg'
    ],
    badges: ['Bridal Favorite', 'Lightweight Feel'],
    badgesUrdu: ['شادیوں کیلئے خاص', 'ہلکا اور آرام دہ'],
    shortDescription: 'Classic crescent moon Kundan earrings with delicate pearl jhumka bells and dangling emerald drops.',
    shortDescriptionUrdu: 'روایتی ہلال کی شکل والے کندن بالیاں، نیچے جھومتے ہوئے نرم موتیوں کے جھمکے۔',
    description: 'An iconic silhouette in Pakistani bridal and festive tradition. These Chandbalis frame the face with romantic radiance without pulling on earlobes, thanks to counter-balanced hollow gold filigree craftsmanship.',
    descriptionUrdu: 'پاکستانی شادیوں اور تقریبات کی سب سے پسندیدہ بالیاں جو کان پر بوجھ ڈالے بغیر چہرے کو دلکش وقار دیتی ہیں۔',
    specs: {
      origin: 'Karachi Goldsmith Bazaars, Pakistan',
      originUrdu: 'صرافہ بازار، کراچی، پاکستان',
      material: 'Hand-cut Kundan stones, 22K gold electroplate, natural seed pearls',
      materialUrdu: 'ہاتھ سے تراشیدہ کندن، ۲۲ قیراط گولڈ کوٹنگ، سچے موتی',
      care: 'Wipe with microfiber cloth after use',
      careUrdu: 'استعمال کے بعد نرم کپڑے سے صاف کریں',
      packaging: 'ZOUQ signature embossed green and gold case',
      packagingUrdu: 'ذوق برانڈڈ سنہری ڈبہ'
    },
    featured: true,
    bestSeller: true
  },
  {
    id: 'jewel-03',
    slug: 'shah-jahan-antique-filigree-bangle',
    name: 'Shah Jahan Hand-Chiseled Antique Gold Kada',
    nameUrdu: 'شاہ جہاں اینٹیک فلیگری طلائی کڑا',
    category: 'jewellery',
    categoryName: 'Jewellery',
    categoryNameUrdu: 'زیورات',
    price: 12400,
    originalPrice: 14500,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 52,
    inStock: true,
    stockQuantity: 9,
    sku: 'ZQ-JWL-003',
    images: [
      '/src/assets/images/product_polki_kundan_jewellery_1793436065109.jpg'
    ],
    badges: ['Solid Brass Core', 'Screw Lock'],
    badgesUrdu: ['ٹھوس بناوٹ', 'محفوظ پیچی لاک'],
    shortDescription: 'Regal openable antique bangle with intricately carved floral jaali lattice work and secure screw clasp.',
    shortDescriptionUrdu: 'پھولدار مغلائی جالی کے کام سے آراستہ مضبوط روایتی اینٹیک گولڈ کڑا۔',
    description: 'Inspired by the floral motifs of the Lahore Fort Sheesh Mahal. Features a durable screw mechanism suitable for standard to broader wrist sizes with zero snagging on raw silk and chiffon dupattas.',
    descriptionUrdu: 'لاہور قلعے کے شیش محل کی نقاشی سے متاثر، ریشمی کپڑوں میں نہ الجھنے والی نفیس فلیگری۔',
    specs: {
      origin: 'Peshawar Old City Artisans, Pakistan',
      originUrdu: 'قدیم پشاور بازار، پاکستان',
      material: 'Antique 22K Matte Gold Dip with Hand-Chiseled Jaali',
      materialUrdu: '۲۲ قیراط اینٹیک میٹ گولڈ پالش',
      care: 'Store separately in anti-tarnish pouch',
      careUrdu: 'نمی سے دور محفوظ رکھیں',
      packaging: 'Rigid satin drawer box with authenticity tag',
      packagingUrdu: 'ساٹن دراز باکس اور گارنٹی ٹیگ'
    },
    variations: [
      {
        id: 'var-wrist',
        name: 'Bangle Size (Diameter)',
        nameUrdu: 'سائز (قطر)',
        options: ['Size 2.4 (Small)', 'Size 2.6 (Medium)', 'Size 2.8 (Large)']
      }
    ],
    featured: false,
    bestSeller: false
  },

  // --- SPICES CATEGORY ---
  {
    id: 'spice-01',
    slug: 'gilgit-grade-a-pure-saffron',
    name: 'Gilgit-Baltistan Pure Mountain Saffron (5g Sealed Tin)',
    nameUrdu: 'گلگت بلتستان خالص زعفران گریڈ اے (۵ گرام سربمہر ٹن)',
    category: 'spices',
    categoryName: 'Spices',
    categoryNameUrdu: 'مصالحہ جات',
    price: 7800,
    originalPrice: 9200,
    discountPercent: 15,
    rating: 5.0,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 24,
    sku: 'ZQ-SPC-001',
    images: [
      '/src/assets/images/product_authentic_pakistani_spices_1793436064277.jpg',
      '/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg'
    ],
    badges: ['100% Pure', 'Single Origin'],
    badgesUrdu: ['۱۰۰٪ خالص', 'ایک ہی وادی کی پیداوار'],
    shortDescription: 'Super Negin grade long crimson threads hand-plucked at dawn in high-altitude Gilgit valleys with potent aroma.',
    shortDescriptionUrdu: 'گلگت کی بلندیوں سے صبح سویرے چنی گئی خالص سرخ زعفران، لاجواب رنگ اور خوشبو۔',
    description: 'Prized by gourmet chefs for Biryani, Zarda, Sheermal, and traditional Kahwa. Grown organically at 8,000 feet above sea level with glacier meltwater. Laboratory certified with crocin color rating above 250, ensuring intense floral aroma and deep golden amber hue with just 3 strands.',
    descriptionUrdu: 'بریانی، زردہ اور روایتی کشمیری قہوہ کی جان۔ گلیشیئر کے پانی سے تیار کردہ اعلیٰ ترین زعفران جس کے صرف دو یا تین ریشے ہی شاہی ذائقہ اور مہک کے لئے کافی ہیں۔',
    specs: {
      origin: 'Nagar Valley, Gilgit-Baltistan, Pakistan',
      originUrdu: 'وادی نگر، گلگت بلتستان، پاکستان',
      material: '100% Pure All-Red Super Negin Crocus Sativus Stigmas',
      materialUrdu: '۱۰۰٪ خالص سرخ زعفرانی ریشے',
      care: 'Store in cool dark pantry away from sunlight and moisture',
      careUrdu: 'سورج کی روشنی اور نمی سے دور خشک جگہ پر رکھیں',
      packaging: 'Airtight nitrogen-flushed golden tin inside velvet slip',
      packagingUrdu: 'ہوا بند ایئر ٹائٹ سنہری ڈبیا'
    },
    variations: [
      {
        id: 'var-weight',
        name: 'Quantity',
        nameUrdu: 'مقدار',
        options: ['5 Grams Tin', '10 Grams Collector Tin']
      }
    ],
    featured: true,
    bestSeller: true
  },
  {
    id: 'spice-02',
    slug: 'dandicut-crushed-red-chili',
    name: 'Sindh Dandicut Sun-Dried Crushed Red Chili (250g Jar)',
    nameUrdu: 'سندھ ڈانڈی کٹ دیسی کُٹی ہوئی گول لال مرچ (۲۵۰ گرام)',
    category: 'spices',
    categoryName: 'Spices',
    categoryNameUrdu: 'مصالحہ جات',
    price: 1250,
    originalPrice: 1550,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    stockQuantity: 60,
    sku: 'ZQ-SPC-002',
    images: [
      '/src/assets/images/product_authentic_pakistani_spices_1793436064277.jpg'
    ],
    badges: ['Unadulterated', 'Stone Crushed'],
    badgesUrdu: ['بغیر ملاوٹ', 'دیسی چکی کی پسائی'],
    shortDescription: 'World-famous Kunri round button chillies sun-dried on terracotta yards and coarsely crushed with seeds intact.',
    shortDescriptionUrdu: 'کنری سندھ کی مشہور گول دیسی مرچ، جو کڑاہی اور تڑکے کو اصل خوشبو اور تیکھا پن دیتی ہے۔',
    description: 'Directly sourced from the chili capital of Kunri, Sindh. Contains no added artificial food dyes, oils, or fillers. Its smoky sweetness and robust heat elevate Karahi, Nihari, Daal Tadka, and BBQ marinades to royal restaurant standards.',
    descriptionUrdu: 'سندھ کی تاریخی زرخیز زمین سے حاصل شدہ۔ بغیر کسی مصنوعی رنگ یا ملاوٹ کے، کڑاہی اور نہاری کے اصلی تڑکے کیلئے لازمی انتخاب۔',
    specs: {
      origin: 'Kunri, Umerkot District, Sindh, Pakistan',
      originUrdu: 'کنری، ضلع عمرکوٹ، سندھ، پاکستان',
      material: '100% Whole Dried Dandicut Chillies with Natural Seeds',
      materialUrdu: '۱۰۰٪ خالص گول دیسی مرچ بیج سمیت',
      care: 'Keep tightly sealed in glass container',
      careUrdu: 'شیشے کے جار میں بند رکھیں',
      packaging: 'Heavy amber glass jar with cork stopper seal',
      packagingUrdu: 'ایمبر گلاس شیشے کا جار'
    },
    featured: true,
    bestSeller: false
  },
  {
    id: 'spice-03',
    slug: 'swat-valley-organic-turmeric',
    name: 'Swat Valley Cold-Ground Organic Turmeric / Haldi (300g)',
    nameUrdu: 'سوات وادی کی خالص دیسی چکی کی پسی ہلدی (۳۰۰ گرام)',
    category: 'spices',
    categoryName: 'Spices',
    categoryNameUrdu: 'مصالحہ جات',
    price: 1100,
    originalPrice: 1350,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 76,
    inStock: true,
    stockQuantity: 40,
    sku: 'ZQ-SPC-003',
    images: [
      '/src/assets/images/product_authentic_pakistani_spices_1793436064277.jpg'
    ],
    badges: ['5.2% Curcumin', 'Lab Tested'],
    badgesUrdu: ['۵.۲٪ کرکومین', 'لیب سے تصدیق شدہ'],
    shortDescription: 'High-potency organic golden turmeric with naturally high curcumin content, cold-ground to preserve essential oils.',
    shortDescriptionUrdu: 'سوات کے صاف پانیوں سے تیار نامیاتی ہلدی، قدرتی طاقت اور صحت بخش تیلوں سے مالا مال۔',
    description: 'Cultivated in the pristine river soil of Swat KPK without chemical fertilizers. Tested for heavy metals and purity. Delivers a vibrant golden sheen and deep earthy warmth to traditional Pakistani salans as well as therapeutic turmeric golden milk.',
    descriptionUrdu: 'سوات کی خالص مٹی میں بغیر کیمیائی کھادوں کے تیار کی گئی۔ سالن کی خوبصورت رنگت اور سنہری دودھ (ہلدی والا دودھ) کیلئے شفا بخش۔',
    specs: {
      origin: 'Swat Valley, Khyber Pakhtunkhwa, Pakistan',
      originUrdu: 'وادی سوات، خیبر پختونخوا، پاکستان',
      material: '100% Pure Rhizome Curcuma Longa Powder',
      materialUrdu: '۱۰۰٪ خالص نامیاتی ہلدی پاؤڈر',
      care: 'Store in dry place, do not use wet spoon',
      careUrdu: 'گیلے چمچ کے استعمال سے گریز کریں',
      packaging: 'Ziplock foil pouch inside linen drawstring sack',
      packagingUrdu: 'ڈبل زپ لاک ایلومینیم پیکٹ'
    },
    featured: false,
    bestSeller: true
  },
  {
    id: 'spice-04',
    slug: 'stone-pounded-shahi-garam-masala',
    name: 'Shahi Khansama 12-Spice Stone Pounded Garam Masala (200g)',
    nameUrdu: 'شاہی خانساماں ۱۲ اجزاء کا پتھر پر پسا گرم مصالحہ (۲۰۰ گرام)',
    category: 'spices',
    categoryName: 'Spices',
    categoryNameUrdu: 'مصالحہ جات',
    price: 1450,
    originalPrice: 1750,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 131,
    inStock: true,
    stockQuantity: 35,
    sku: 'ZQ-SPC-004',
    images: [
      '/src/assets/images/product_authentic_pakistani_spices_1793436064277.jpg'
    ],
    badges: ['Mughal Secret Blend', 'No Fillers'],
    badgesUrdu: ['مغلائی خفیہ نسخہ', 'بغیر دھنیا پاؤڈر ملاوٹ'],
    shortDescription: 'Slow-roasted whole spices stone-crushed with black cardamom, green cardamom, mace, cinnamon, and cloves.',
    shortDescriptionUrdu: 'بڑی الائچی، جاوتری، دار چینی، لونگ اور زیرے کا متوازن شاہی خوشبودار آمیزہ۔',
    description: 'The secret weapon of imperial Mughal kitchens in Lahore and Delhi. Contains zero filler starches or cheap ground coriander. Lightly toasted on low flame then crushed using ancient granite sil-batta to liberate locked essential volatile oils.',
    descriptionUrdu: 'لاہور کے شاہی باورچیوں کا آزمودہ نسخہ۔ ہلکی آنچ پر بھون کر پتھر کی سل پر پسا گیا تاکہ اصلی خوشبو اور ذائقہ برقرار رہے۔',
    specs: {
      origin: 'Old Anarkali Spice Market, Lahore, Pakistan',
      originUrdu: 'پرانی انارکلی، لاہور، پاکستان',
      material: 'Black Cumin, Mace, Nutmeg, Cinnamon, Star Anise, Cloves, Cardamoms',
      materialUrdu: 'کالا زیرہ، جاوتری، جائفل، دار چینی، بادیان خطائی، لونگ، چھوٹی و بڑی الائچی',
      care: 'Keep sealed tightly to prevent volatile oils from evaporating',
      careUrdu: 'ہوا بند مرتبان میں رکھیں تاکہ خوشبو برقرار رہے',
      packaging: 'Airtight metal container with spice aroma seal',
      packagingUrdu: 'ایروما سیل والا دھاتی باکس'
    },
    featured: true,
    bestSeller: false
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'ZOUQ10',
    discountPercent: 10,
    minOrderValue: 2000,
    description: '10% off on all orders above PKR 2,000',
    descriptionUrdu: '۲۰۰۰ روپے سے زائد کے آرڈر پر ۱۰ فیصد رعایت',
    active: true
  },
  {
    code: 'KHUSHAMDEED',
    discountFixed: 500,
    minOrderValue: 3000,
    description: 'PKR 500 flat discount for first-time orders',
    descriptionUrdu: 'پہلے آرڈر پر ۵۰۰ روپے کی خصوصی فوری رعایت',
    active: true
  },
  {
    code: 'AZADI15',
    discountPercent: 15,
    minOrderValue: 5000,
    description: '15% off on VIP luxury heirloom purchases',
    descriptionUrdu: '۵۰۰۰ روپے سے زائد کے شاہی آرڈرز پر ۱۵ فیصد رعایت',
    active: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ZQ-8902',
    createdAt: '2026-10-29T14:30:00Z',
    customer: {
      fullName: 'Hamza Tariq',
      phone: '0300-8452190',
      email: 'hamza.tariq@gmail.com',
      province: 'Punjab',
      city: 'Lahore',
      address: 'House 14-B, Sector Z, Phase 3, DHA, Lahore',
      orderNotes: 'Please ring the bell twice, leave with security guard if not available'
    },
    items: [
      {
        productId: 'sock-01',
        productName: 'Mughal Heritage Combed Cotton Crew Socks (Pack of 3)',
        quantity: 1,
        price: 1950,
        variation: 'Medium (UK 6-9) / Classic Trio',
        image: '/src/assets/images/product_luxury_egyptian_socks_1793436063612.jpg'
      },
      {
        productId: 'spice-01',
        productName: 'Gilgit-Baltistan Pure Mountain Saffron (5g Sealed Tin)',
        quantity: 1,
        price: 7800,
        variation: '5 Grams Tin',
        image: '/src/assets/images/product_authentic_pakistani_spices_1793436064277.jpg'
      }
    ],
    subtotal: 9750,
    discount: 975,
    shipping: 0,
    total: 8775,
    paymentMethod: 'cod',
    paymentStatus: 'cod_pending',
    status: 'shipped',
    courier: 'tcs',
    trackingNumber: 'TCS-928410294PK',
    trackingTimeline: [
      {
        timestamp: '2026-10-29 15:00',
        status: 'Order Placed & Verified via SMS',
        statusUrdu: 'آرڈر کی تصدیق اور بکنگ مکمل ہو گئی',
        location: 'Lahore Central Fulfillment Atelier',
        locationUrdu: 'لاہور سنٹرل فلفلمنٹ سینٹر',
        completed: true
      },
      {
        timestamp: '2026-10-30 09:30',
        status: 'Handed over to TCS Courier Dispatch Rider',
        statusUrdu: 'پارسل ٹی سی ایس کوریئر رائیڈر کے حوالے کر دیا گیا',
        location: 'TCS Gulberg Hub, Lahore',
        locationUrdu: 'ٹی سی ایس گلبرگ ہب، لاہور',
        completed: true
      },
      {
        timestamp: '2026-10-30 21:00',
        status: 'Processed at Regional Sorting Facility',
        statusUrdu: 'ریجنل چھانٹی مرکز پر کارروائی مکمل',
        location: 'TCS Cargo Complex, Allama Iqbal Airport',
        locationUrdu: 'ٹی سی ایس کارگو کمپلیکس، علامہ اقبال ایئرپورٹ',
        completed: true
      },
      {
        timestamp: '2026-10-31 08:15',
        status: 'Out for Delivery with Rider (COD Collection: PKR 8,775)',
        statusUrdu: 'رائیڈر ترسیل اور رقم وصولی کیلئے روانہ ہو چکا ہے',
        location: 'TCS DHA Phase 3 Delivery Express Station',
        locationUrdu: 'ٹی سی ایس ڈی ایچ اے فیز ۳ اسٹیشن',
        completed: true
      }
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'ZQ-8903',
    createdAt: '2026-10-30T10:15:00Z',
    customer: {
      fullName: 'Mahnoor Asif',
      phone: '0321-9923812',
      email: 'mahnoor.asif@yahoo.com',
      province: 'Sindh',
      city: 'Karachi',
      address: 'Apartment 402, Creek Vistas, Phase 8, DHA, Karachi',
      orderNotes: 'Call on WhatsApp before coming'
    },
    items: [
      {
        productId: 'jewel-01',
        productName: 'Nizam-ul-Mulk 22K Gold Plated Handcrafted Polki Choker',
        quantity: 1,
        price: 18500,
        variation: 'Tourmaline Emerald',
        image: '/src/assets/images/product_polki_kundan_jewellery_1793436065109.jpg'
      }
    ],
    subtotal: 18500,
    discount: 500,
    shipping: 0,
    total: 18000,
    paymentMethod: 'jazzcash',
    paymentStatus: 'paid',
    status: 'processing',
    courier: 'postex',
    trackingNumber: 'PEX-841920PK',
    trackingTimeline: [
      {
        timestamp: '2026-10-30 10:20',
        status: 'Payment of PKR 18,000 Verified via JazzCash Gateway',
        statusUrdu: 'جاز کیش والٹ سے ادائیگی کی تصدیق ہو گئی',
        location: 'JazzCash Secure Core, Karachi',
        locationUrdu: 'جاز کیش گیٹ وے',
        completed: true
      },
      {
        timestamp: '2026-10-30 16:00',
        status: 'Handcrafted Packaging & Quality Inspection Cleared',
        statusUrdu: 'زیورات کی کوالٹی انسپیکشن اور پیکنگ مکمل',
        location: 'ZOUQ Vault, Lahore',
        locationUrdu: 'ذوق والٹ، لاہور',
        completed: true
      },
      {
        timestamp: '2026-10-31 06:00',
        status: 'In Transit to PostEx Karachi Hub via Air Cargo',
        statusUrdu: 'پوسٹ ایکس ایئر کارگو کے ذریعے کراچی روانہ',
        location: 'Lahore to Karachi Air Express',
        locationUrdu: 'لاہور تا کراچی ایئر ایکسپریس',
        completed: false
      }
    ]
  }
];

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Gilgit-Baltistan',
  'Azad Jammu & Kashmir'
];

export const PAKISTAN_CITIES: Record<string, string[]> = {
  Punjab: [
    'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala',
    'Sialkot', 'Bahawalpur', 'Sargodha', 'Sheikhupura', 'Gujrat',
    'Sahiwal', 'Jhelum', 'Rahim Yar Khan', 'Kasur', 'Attock'
  ],
  Sindh: [
    'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Mirpur Khas',
    'Nawabshah', 'Thatta', 'Jacobabad', 'Shikarpur', 'Badin'
  ],
  'Khyber Pakhtunkhwa': [
    'Peshawar', 'Mardan', 'Abbottabad', 'Swat (Mingora)', 'Kohat',
    'Dera Ismail Khan', 'Haripur', 'Mansehra', 'Bannu', 'Nowshera'
  ],
  Balochistan: [
    'Quetta', 'Gwadar', 'Turbat', 'Khuzdar', 'Sibi', 'Hub', 'Chaman'
  ],
  'Islamabad Capital Territory': [
    'Islamabad (All Sectors)'
  ],
  'Gilgit-Baltistan': [
    'Gilgit', 'Skardu', 'Hunza', 'Nagar', 'Ghizer', 'Astore'
  ],
  'Azad Jammu & Kashmir': [
    'Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber'
  ]
};
