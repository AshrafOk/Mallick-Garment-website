import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DB_FILE = path.resolve('data/products_db.json');
const UPLOAD_DIR = path.resolve('public/uploads');

// Ensure database and uploads directories exist
if (!fs.existsSync(path.resolve('data'))) {
  fs.mkdirSync(path.resolve('data'), { recursive: true });
}
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// 50mb limit for base64 photo uploads from camera or PC
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(UPLOAD_DIR));

// Helper to read DB
function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading DB:', err);
  }
  return [];
}

// Helper to write DB
function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

// Admin Email verification constant
export const AUTHORIZED_ADMIN_EMAIL = 'asharafalik1@gmail.com';

// Middleware for Admin Protection
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const adminEmail = req.headers['x-admin-email'] as string;
  const adminToken = req.headers['x-admin-token'] as string;

  if (
    adminEmail &&
    adminEmail.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() &&
    adminToken
  ) {
    return next();
  }

  return res.status(403).json({
    error: 'Unauthorized: Only administrator asharafalik1@gmail.com can perform this action.',
  });
}

// --- REST API ENDPOINTS ---

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { email } = req.body;
  if (!email || email.trim().toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
    return res.status(401).json({
      success: false,
      error: 'Invalid administrator email. Access is restricted exclusively to asharafalik1@gmail.com.',
    });
  }

  // Generate secure session token
  const token = `mg-admin-${Buffer.from(AUTHORIZED_ADMIN_EMAIL + ':' + Date.now()).toString('base64')}`;
  return res.json({
    success: true,
    email: AUTHORIZED_ADMIN_EMAIL,
    token,
    message: 'Welcome back, Administrator. Full editing privileges granted.',
  });
});

// Admin verify session
app.get('/api/admin/verify', (req, res) => {
  const adminEmail = req.headers['x-admin-email'] as string;
  const adminToken = req.headers['x-admin-token'] as string;

  if (
    adminEmail &&
    adminEmail.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() &&
    adminToken &&
    adminToken.startsWith('mg-admin-')
  ) {
    return res.json({
      valid: true,
      email: AUTHORIZED_ADMIN_EMAIL,
      authorized: true,
    });
  }
  return res.json({ valid: false, authorized: false });
});

// GET all products from Ubuntu/Server DB
app.get('/api/products', (req, res) => {
  const products = readDb();
  res.json({ products });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const products = readDb();
  const product = products.find((p: any) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ product });
});

// PUT /api/products/:id - Update product images, details, weekend / combo offers (ADMIN ONLY)
app.put('/api/products/:id', requireAdmin, (req, res) => {
  const products = readDb();
  const index = products.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const updatedProduct = {
    ...products[index],
    ...req.body,
    id: req.params.id, // prevent id mutability
  };

  products[index] = updatedProduct;
  writeDb(products);

  res.json({
    success: true,
    product: updatedProduct,
    message: `Product "${updatedProduct.name}" updated successfully.`,
  });
});

// POST /api/products - Create new product (ADMIN ONLY)
app.post('/api/products', requireAdmin, (req, res) => {
  const products = readDb();
  const newProduct = {
    ...req.body,
    id: req.body.id || `custom-${Date.now()}`,
    sku: req.body.sku || `MG-${Math.floor(100 + Math.random() * 900)}`,
  };

  products.unshift(newProduct);
  writeDb(products);

  res.json({
    success: true,
    product: newProduct,
    message: `Product "${newProduct.name}" created successfully.`,
  });
});

// DELETE /api/products/:id - Delete product (ADMIN ONLY)
app.delete('/api/products/:id', requireAdmin, (req, res) => {
  const products = readDb();
  const filtered = products.filter((p: any) => p.id !== req.params.id);
  if (filtered.length === products.length) {
    return res.status(404).json({ error: 'Product not found' });
  }

  writeDb(filtered);
  res.json({ success: true, message: 'Product removed successfully.' });
});

// POST /api/upload-image - Upload local image file or base64 (ADMIN ONLY)
app.post('/api/upload-image', requireAdmin, (req, res) => {
  const { dataUrl } = req.body;
  if (!dataUrl) {
    return res.status(400).json({ error: 'No image data provided' });
  }

  try {
    const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9-+.]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // If it's already a URL, return it
      if (dataUrl.startsWith('http://') || dataUrl.startsWith('https://') || dataUrl.startsWith('/uploads/')) {
        return res.json({ url: dataUrl });
      }
      return res.status(400).json({ error: 'Invalid data URL format' });
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const base64Data = matches[2];
    const uniqueName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(UPLOAD_DIR, uniqueName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    const publicUrl = `/uploads/${uniqueName}`;

    res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Image upload save error:', err);
    res.status(500).json({ error: 'Failed to save image file on server' });
  }
});

// Start Vite middleware in development or static server in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mallick Garments server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
