import { Product } from '../data/products';

export interface AdminSession {
  email: string;
  token: string;
}

export const ADMIN_EMAIL = 'asharafalik1@gmail.com';

export function getStoredAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem('mg_admin_session');
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (session.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && session.token) {
      return session;
    }
  } catch {
    // fallback
  }
  return null;
}

export function saveAdminSession(session: AdminSession | null) {
  try {
    if (session) {
      localStorage.setItem('mg_admin_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('mg_admin_session');
    }
  } catch {
    // fallback
  }
}

export function getAdminHeaders(): HeadersInit {
  const session = getStoredAdminSession();
  if (session) {
    return {
      'Content-Type': 'application/json',
      'x-admin-email': session.email,
      'x-admin-token': session.token,
    };
  }
  return {
    'Content-Type': 'application/json',
  };
}

export async function fetchProductsApi(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        return data.products;
      }
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to local dataset:', err);
  }
  return [];
}

export async function updateProductApi(product: Product): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: getAdminHeaders(),
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (res.ok) {
      return { success: true, product: data.product };
    }
    return { success: false, error: data.error || 'Update failed' };
  } catch (err: any) {
    console.error('Update product error:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

export async function createProductApi(product: Product): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: getAdminHeaders(),
      body: JSON.stringify(product),
    });

    const data = await res.json();
    if (res.ok) {
      return { success: true, product: data.product };
    }
    return { success: false, error: data.error || 'Create failed' };
  } catch (err: any) {
    console.error('Create product error:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

export async function deleteProductApi(productId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: getAdminHeaders(),
    });

    const data = await res.json();
    if (res.ok) {
      return { success: true };
    }
    return { success: false, error: data.error || 'Delete failed' };
  } catch (err: any) {
    console.error('Delete product error:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

export async function uploadImageApi(dataUrl: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: getAdminHeaders(),
      body: JSON.stringify({ dataUrl }),
    });

    const data = await res.json();
    if (res.ok && data.url) {
      return { success: true, url: data.url };
    }
    return { success: false, error: data.error || 'Upload failed' };
  } catch (err: any) {
    console.error('Upload image error:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}

export async function adminLoginApi(email: string): Promise<{ success: boolean; session?: AdminSession; error?: string }> {
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      const session = { email: data.email, token: data.token };
      saveAdminSession(session);
      return { success: true, session };
    }
    return { success: false, error: data.error || 'Login failed' };
  } catch (err: any) {
    console.error('Login error:', err);
    return { success: false, error: err.message || 'Network error' };
  }
}
