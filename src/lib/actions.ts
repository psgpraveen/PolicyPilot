"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { LoginSchema, SignUpSchema, ClientSchema, CategorySchema } from "./schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

// Auth Actions
export async function signup(
  prevState: { error: string } | null,
  formData: FormData
) {
  const validatedFields = SignUpSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Signup failed.' };
    }

    revalidatePath("/login");
    redirect("/login");
  } catch (error) {
    return { error: "Failed to sign up. Please try again." };
  }
}

export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Login failed.' };
    }

    // Store token in cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", data.token, { 
      httpOnly: true, 
      path: "/",
      maxAge: 60 * 60 * 24 , // 1 day
    });
    revalidatePath("/", "layout");
    redirect("/policies");
  } catch (error) {
    return { error: "Failed to login. Please try again." };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}


// Client Actions
export async function createClient(values: z.infer<typeof ClientSchema>) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/clients`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Failed to create client.' };
        }

        revalidatePath('/clients');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to create client.' };
    }
}

export async function updateClient(id: string, values: z.infer<typeof ClientSchema>) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/clients/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Failed to update client.' };
        }

        revalidatePath('/clients');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update client.' };
    }
}

export async function deleteClient(id: string) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Client not found.' };
        }

        revalidatePath('/clients');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete client.' };
    }
}

// Category Actions
export async function createCategory(values: z.infer<typeof CategorySchema>) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/categories`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Failed to create category.' };
        }

        revalidatePath('/categories');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to create category.' };
    }
}

export async function updateCategory(id: string, values: z.infer<typeof CategorySchema>) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/categories/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Failed to update category.' };
        }

        revalidatePath('/categories');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update category.' };
    }
}

export async function deleteCategory(id: string) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Category not found.' };
        }

        revalidatePath('/categories');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete category.' };
    }
}

// Policy Actions
export async function createPolicy(formData: FormData) {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}/api/policies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to create policy.' };
    }

    revalidatePath('/policies');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create policy.' };
  }
}

export async function updatePolicy(id: string, formData: FormData) {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}/api/policies/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to update policy.' };
    }

    revalidatePath('/policies');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update policy.' };
  }
}

export async function deletePolicy(id: string) {
    try {
        const token = await getAuthToken();
        
        const response = await fetch(`${API_URL}/api/policies/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, error: data.error || 'Policy not found.' };
        }

        revalidatePath('/policies');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete policy.' };
    }
}
