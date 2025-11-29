import type { Client, Category, Policy } from '@/lib/definitions';

// Use Next.js API routes (empty string means same origin)
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(c => c.trim().startsWith('auth_token='));
  return authCookie ? authCookie.split('=')[1] : null;
}

export async function fetchClients(): Promise<Client[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/clients`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      cache: 'no-store',
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.clients || [];
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return [];
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/categories`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      cache: 'no-store',
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export async function fetchPolicies(): Promise<Policy[]> {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/api/policies`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      cache: 'no-store',
    });

    if (!response.ok) return [];
    const data = await response.json();
    const policies = data.policies || [];
    
    return policies.map((policy: any) => ({
      ...policy,
      issueDate: new Date(policy.issueDate),
      expiryDate: new Date(policy.expiryDate),
    }));
  } catch (error) {
    console.error('Failed to fetch policies:', error);
    return [];
  }
}
