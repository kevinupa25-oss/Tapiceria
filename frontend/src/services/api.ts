const API_URL = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(response: Response) {
  if (response.ok) return response.json().catch(() => null);
  // try to extract server message
  let details = '';
  try {
    const body = await response.json();
    details = body?.error || body?.message || JSON.stringify(body);
  } catch (e) {
    try {
      details = await response.text();
    } catch (e) {
      details = '';
    }
  }
  throw new Error(`HTTP ${response.status} ${response.statusText}${details ? ` - ${details}` : ''}`);
}

export const productsAPI = {
  // Obtener todos los productos
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    return handleResponse(response);
  },

  // Obtener un producto por ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Crear producto
  create: async (product: { name: string; image: string; gama: string }) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  // Actualizar producto
  update: async (id: string, product: { name: string; image: string; gama: string }) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return handleResponse(response);
  },

  // Eliminar producto
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
