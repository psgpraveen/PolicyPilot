import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export const ClientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters.'),
});

export const CategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

export const PolicySchema = z.object({
  id: z.string().optional(),
  clientId: z.string().min(1, 'Client is required.'),
  categoryId: z.string().min(1, 'Category is required.'),
  policyName: z.string().min(3, 'Policy name must be at least 3 characters.'),
  issueDate: z.date({ required_error: 'Issue date is required.' }),
  expiryDate: z.date({ required_error: 'Expiry date is required.' }),
  amount: z.coerce.number().positive('Amount must be a positive number.'),
  attachment: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png and .pdf formats are supported.'
    ).optional(),
}).refine((data) => data.expiryDate > data.issueDate, {
  message: 'Expiry date must be after the issue date.',
  path: ['expiryDate'],
});
