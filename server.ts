import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS } from './src/data/initialProducts.ts';
import { Order, Product, Coupon, TrackingMilestone } from './src/types/store.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const ADMIN_COOKIE = 'zouq_admin_session';
const ADMIN_SESSION_TTL = 8 * 60 * 60 * 1000;

app.use(express.json());

function safeCompare(left: string, right: string): boolean {
  const leftHash = createHash('sha256').update(left).digest();
  const rightHash = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

function isAdminAuthenticated(req: Request): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const cookie = req.headers.cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);

  if (!secret || !cookie) return false;

  const separator = cookie.lastIndexOf('.');
  if (separator < 0) return false;
  const payload = cookie.slice(0, separator);
  const signature = cookie.slice(separator + 1);
  const expected = createHmac('sha256', secret).update(payload).digest();
  const actual = Buffer.from(signature, 'base64url');

  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;

  const expiresAt = Number(payload.slice(0, payload.indexOf('.')));
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

function requireAdmin(req: Request, res: Response, next: () => void) {
  if (!isAdminAuthenticated(req)) {
    res.status(401).json({ success: false, error: 'Admin login required.' });
    return;
  }
  next();
}

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!configuredUsername || !configuredPassword || !secret) {
    res.status(503).json({ success: false, error: 'Admin login is not configured.' });
    return;
  }

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !safeCompare(username, configuredUsername) ||
    !safeCompare(password, configuredPassword)
  ) {
    res.status(401).json({ success: false, error: 'Incorrect username or password.' });
    return;
  }

  const payload = `${Date.now() + ADMIN_SESSION_TTL}.${randomBytes(24).toString('hex')}`;
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${ADMIN_COOKIE}=${payload}.${signature}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${ADMIN_SESSION_TTL / 1000}${secure}`
  );
  res.json({ success: true });
});

app.get('/api/admin/session', (req: Request, res: Response) => {
  res.json({ success: true, authenticated: isAdminAuthenticated(req) });
});

app.post('/api/admin/logout', (_req: Request, res: Response) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`);
  res.json({ success: true });
});

// Persistent store setup
const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

interface StoreData {
  products: Product[];
  orders: Order[];
  coupons: Coupon[];
  settings: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    storeName: string;
    supportWhatsApp: string;
  };
}

function loadStore(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error loading store.json, falling back to seed:', err);
  }

  const initialData: StoreData = {
    products: INITIAL_PRODUCTS,
    orders: INITIAL_ORDERS,
    coupons: INITIAL_COUPONS,
    settings: {
      freeShippingThreshold: 3500,
      standardShippingFee: 250,
      storeName: 'ZOUQ Heritage',
      supportWhatsApp: '+92 300 1234567'
    }
  };
  saveStore(initialData);
  return initialData;
}

function saveStore(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving store.json:', err);
  }
}

let store = loadStore();

// ================= API ROUTES =================

// 1. Products API
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, inStock, sort } = req.query;
  let result = [...store.products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (inStock === 'true') {
    result = result.filter(p => p.inStock && p.stockQuantity > 0);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    result = result.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.nameUrdu.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = store.products.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }
  res.json({ success: true, data: product });
});

app.post('/api/products', requireAdmin, (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload.name || !payload.category || !payload.price) {
    res.status(400).json({ success: false, error: 'Name, category, and price are required' });
    return;
  }

  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    slug: payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40),
    name: payload.name,
    nameUrdu: payload.nameUrdu || payload.name,
    category: payload.category,
    categoryName: payload.category === 'socks' ? 'Socks' : payload.category === 'jewellery' ? 'Jewellery' : 'Spices',
    categoryNameUrdu: payload.category === 'socks' ? 'موزے' : payload.category === 'jewellery' ? 'زیورات' : 'مصالحہ جات',
    price: Number(payload.price),
    originalPrice: payload.originalPrice ? Number(payload.originalPrice) : undefined,
    discountPercent: payload.discountPercent ? Number(payload.discountPercent) : undefined,
    rating: payload.rating ? Number(payload.rating) : 5.0,
    reviewCount: payload.reviewCount ? Number(payload.reviewCount) : 1,
    inStock: payload.inStock !== false,
    stockQuantity: Number(payload.stockQuantity || 15),
    sku: payload.sku || `ZQ-${payload.category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    images: payload.images && payload.images.length > 0 ? payload.images : ['/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg'],
    badges: payload.badges || ['New Arrival'],
    badgesUrdu: payload.badgesUrdu || ['تازہ ترین'],
    shortDescription: payload.shortDescription || payload.name,
    shortDescriptionUrdu: payload.shortDescriptionUrdu || payload.nameUrdu || payload.name,
    description: payload.description || payload.shortDescription || payload.name,
    descriptionUrdu: payload.descriptionUrdu || payload.nameUrdu || payload.name,
    specs: payload.specs || {
      origin: 'Pakistan',
      originUrdu: 'پاکستان',
      material: 'Authentic Traditional Craft',
      materialUrdu: 'خالص روایتی مٹیریل',
      care: 'Handle with care',
      careUrdu: 'احتیاط سے استعمال کریں',
      packaging: 'ZOUQ Presentation Box',
      packagingUrdu: 'ذوق برانڈڈ باکس'
    },
    variations: payload.variations || [],
    featured: Boolean(payload.featured),
    bestSeller: Boolean(payload.bestSeller)
  };

  store.products.unshift(newProduct);
  saveStore(store);
  res.status(201).json({ success: true, data: newProduct });
});

app.put('/api/products/:id', requireAdmin, (req: Request, res: Response) => {
  const index = store.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }

  const updated: Product = {
    ...store.products[index],
    ...req.body,
    id: store.products[index].id // preserve id
  };

  store.products[index] = updated;
  saveStore(store);
  res.json({ success: true, data: updated });
});

app.delete('/api/products/:id', requireAdmin, (req: Request, res: Response) => {
  const index = store.products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Product not found' });
    return;
  }
  const removed = store.products.splice(index, 1);
  saveStore(store);
  res.json({ success: true, data: removed[0] });
});

// 2. Orders API (with stock decrement & phone validation)
app.get('/api/orders', requireAdmin, (req: Request, res: Response) => {
  res.json({ success: true, count: store.orders.length, data: store.orders });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { customer, items, paymentMethod, couponCode } = req.body;

  // Validation
  if (!customer || !customer.fullName || !customer.phone || !customer.address || !customer.city || !customer.province) {
    res.status(400).json({ success: false, error: 'Please provide all required customer and shipping details.' });
    return;
  }

  // Pakistani phone validation: e.g. 03001234567, 0300-1234567, +923001234567
  const cleanedPhone = customer.phone.replace(/[\s-]/g, '');
  const pkPhoneRegex = /^(\+92|92|0)?3\d{9}$/;
  if (!pkPhoneRegex.test(cleanedPhone)) {
    res.status(400).json({ success: false, error: 'Please provide a valid Pakistani mobile number (e.g. 0300-1234567).' });
    return;
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ success: false, error: 'Order must contain at least one item.' });
    return;
  }

  // Check inventory and calculate subtotal
  let subtotal = 0;
  for (const item of items) {
    const prod = store.products.find(p => p.id === item.productId);
    if (!prod) {
      res.status(400).json({ success: false, error: `Product ${item.productId} was not found.` });
      return;
    }
    if (prod.stockQuantity < item.quantity) {
      res.status(400).json({ success: false, error: `Insufficient stock for "${prod.name}". Only ${prod.stockQuantity} remaining.` });
      return;
    }
    subtotal += prod.price * item.quantity;
  }

  // Calculate discount
  let discount = 0;
  if (couponCode) {
    const coupon = store.coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.active);
    if (coupon && subtotal >= coupon.minOrderValue) {
      if (coupon.discountPercent) {
        discount = Math.round((subtotal * coupon.discountPercent) / 100);
      } else if (coupon.discountFixed) {
        discount = coupon.discountFixed;
      }
    }
  }

  // Shipping calculation
  const shipping = subtotal >= store.settings.freeShippingThreshold ? 0 : store.settings.standardShippingFee;
  const total = Math.max(0, subtotal - discount + shipping);

  // Automatically decrement stock
  for (const item of items) {
    const prod = store.products.find(p => p.id === item.productId);
    if (prod) {
      prod.stockQuantity = Math.max(0, prod.stockQuantity - item.quantity);
      if (prod.stockQuantity === 0) {
        prod.inStock = false;
      }
    }
  }

  const orderNumber = `ZQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  // Pick default courier based on city/province or standard
  const courierMap: Record<string, 'tcs' | 'leopards' | 'postex'> = {
    Lahore: 'tcs',
    Karachi: 'postex',
    Islamabad: 'leopards'
  };
  const assignedCourier = courierMap[customer.city] || 'tcs';
  const trackingNumber = `${assignedCourier.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}PK`;

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber,
    createdAt: now,
    customer: {
      fullName: customer.fullName.trim(),
      phone: customer.phone.trim(),
      email: customer.email?.trim() || '',
      province: customer.province,
      city: customer.city,
      address: customer.address.trim(),
      orderNotes: customer.orderNotes?.trim() || ''
    },
    items: items.map((it: any) => {
      const prod = store.products.find(p => p.id === it.productId);
      return {
        productId: it.productId,
        productName: prod ? prod.name : 'ZOUQ Item',
        quantity: it.quantity,
        price: prod ? prod.price : it.price,
        variation: it.variation || '',
        image: prod ? prod.images[0] : '/src/assets/images/hero_luxury_pakistan_lifestyle_1793436062659.jpg'
      };
    }),
    subtotal,
    discount,
    shipping,
    total,
    paymentMethod: paymentMethod || 'cod',
    paymentStatus: paymentMethod === 'cod' ? 'cod_pending' : 'paid',
    status: 'pending',
    courier: assignedCourier,
    trackingNumber,
    trackingTimeline: [
      {
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
        status: `Order Placed via ${paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod?.toUpperCase()}`,
        statusUrdu: 'آرڈر کی بکنگ مکمل ہو گئی ہے',
        location: 'ZOUQ Central Atelier, Lahore',
        locationUrdu: 'لاہور سنٹرل فلفلمنٹ سینٹر',
        completed: true
      },
      {
        timestamp: 'Estimated Next Step',
        status: `Consignment generated for ${assignedCourier.toUpperCase()} Dispatch`,
        statusUrdu: 'کوریئر پارسل تیار کیا جا رہا ہے',
        location: `${assignedCourier.toUpperCase()} Dispatch Hub, Lahore`,
        locationUrdu: 'کوریئر روانگی مرکز، لاہور',
        completed: false
      }
    ]
  };

  store.orders.unshift(newOrder);
  saveStore(store);

  res.status(201).json({ success: true, data: newOrder });
});

// Update order status (Admin)
app.put('/api/orders/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { status, courier, trackingNumber, newMilestone } = req.body;
  const order = store.orders.find(o => o.id === req.params.id || o.orderNumber === req.params.id);

  if (!order) {
    res.status(404).json({ success: false, error: 'Order not found' });
    return;
  }

  if (status) order.status = status;
  if (courier) order.courier = courier;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  if (newMilestone) {
    if (!order.trackingTimeline) order.trackingTimeline = [];
    order.trackingTimeline.push({
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
      status: newMilestone.status || `Status changed to ${status}`,
      statusUrdu: newMilestone.statusUrdu || 'آرڈر کی صورتحال اپ ڈیٹ ہو گئی ہے',
      location: newMilestone.location || 'Courier Transit Network',
      locationUrdu: newMilestone.locationUrdu || 'کوریئر ٹرانزٹ نیٹ ورک',
      completed: true
    });
  }

  saveStore(store);
  res.json({ success: true, data: order });
});

// 3. Real-Time Tracking API
app.get('/api/tracking/:query', (req: Request, res: Response) => {
  const q = req.params.query.trim().toLowerCase();
  const order = store.orders.find(o => 
    o.orderNumber.toLowerCase() === q ||
    o.customer.phone.replace(/[\s-]/g, '') === q.replace(/[\s-]/g, '') ||
    (o.trackingNumber && o.trackingNumber.toLowerCase() === q)
  );

  if (!order) {
    res.status(404).json({
      success: false,
      error: 'No consignment found with this Order Number or Mobile Number. Please verify your details.'
    });
    return;
  }

  res.json({
    success: true,
    data: {
      orderNumber: order.orderNumber,
      customerName: order.customer.fullName,
      destination: `${order.customer.city}, ${order.customer.province}`,
      courier: order.courier || 'tcs',
      trackingNumber: order.trackingNumber || 'Pending Courier Scan',
      status: order.status,
      total: order.total,
      paymentMethod: order.paymentMethod,
      timeline: order.trackingTimeline || []
    }
  });
});

// 4. Coupons API
app.post('/api/coupons/validate', (req: Request, res: Response) => {
  const { code, subtotal } = req.body;
  if (!code) {
    res.status(400).json({ success: false, error: 'Coupon code is required' });
    return;
  }

  const coupon = store.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
  if (!coupon) {
    res.status(404).json({ success: false, error: 'Invalid or expired promotional coupon code.' });
    return;
  }

  const amount = Number(subtotal) || 0;
  if (amount < coupon.minOrderValue) {
    res.status(400).json({
      success: false,
      error: `This coupon requires a minimum cart value of PKR ${coupon.minOrderValue.toLocaleString()}.`
    });
    return;
  }

  let discountAmount = 0;
  if (coupon.discountPercent) {
    discountAmount = Math.round((amount * coupon.discountPercent) / 100);
  } else if (coupon.discountFixed) {
    discountAmount = coupon.discountFixed;
  }

  res.json({
    success: true,
    data: {
      code: coupon.code,
      discountAmount,
      description: coupon.description,
      descriptionUrdu: coupon.descriptionUrdu
    }
  });
});

app.get('/api/coupons', (req: Request, res: Response) => {
  res.json({ success: true, data: store.coupons });
});

// 5. Payment Gateway Simulation / Verification API
app.post('/api/payments/verify', (req: Request, res: Response) => {
  const { gateway, accountOrCard, amount } = req.body;
  
  // Real simulated transaction ID
  const txnId = `TXN-${gateway.toUpperCase()}-${Date.now().toString().slice(-6)}`;
  
  res.json({
    success: true,
    data: {
      transactionId: txnId,
      gateway,
      amount,
      status: 'VERIFIED_SUCCESSFUL',
      timestamp: new Date().toISOString()
    }
  });
});

// 6. Admin Analytics API
app.get('/api/stats', requireAdmin, (req: Request, res: Response) => {
  const totalRevenue = store.orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const totalOrders = store.orders.length;
  const pendingOrders = store.orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const completedOrders = store.orders.filter(o => o.status === 'delivered').length;
  const lowStockItems = store.products.filter(p => p.stockQuantity < 10).length;

  const categoryBreakdown = {
    socks: store.products.filter(p => p.category === 'socks').length,
    jewellery: store.products.filter(p => p.category === 'jewellery').length,
    spices: store.products.filter(p => p.category === 'spices').length
  };

  res.json({
    success: true,
    data: {
      totalRevenue,
      totalOrders,
      pendingOrders,
      completedOrders,
      lowStockItems,
      totalProducts: store.products.length,
      categoryBreakdown
    }
  });
});

// 7. Store Settings API
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, data: store.settings });
});

// ================= VITE DEV MIDDLEWARE OR STATIC SERVING =================
async function configureServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/src', express.static(path.join(__dirname, 'src')));
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

}

const isVercel = Boolean(process.env.VERCEL);
if (isVercel || process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/src', express.static(path.join(__dirname, 'src')));
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  configureServer().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[ZOUQ Express] Server listening on http://0.0.0.0:${PORT}`);
    });
  });
}

export default app;
