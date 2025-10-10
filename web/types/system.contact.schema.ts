import * as z from 'zod';

export const formSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State/Province is required'),
  parishName: z.string().min(2, 'Parish name must be at least 2 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Please enter a valid email address'),
  whatsapp: z.string()
    .min(10, 'WhatsApp number must be at least 10 digits')
    .regex(/^[\+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
});

export type FormData = z.infer<typeof formSchema>;

export interface Country {
  name: string;
  states: string[];
}

export interface CountryStateData {
  countries: Country[];
}

export interface Role {
  value: string;
  label: string;
}

export const roles: Role[] = [
  { value: 'pastor', label: 'Pastor' },
  { value: 'assistant_pastor', label: 'Assistant Pastor' },
  { value: 'deacon', label: 'Deacon' },
  { value: 'parish_administrator', label: 'Parish Administrator' },
  { value: 'secretary', label: 'Parish Secretary' },
  { value: 'volunteer_coordinator', label: 'Volunteer Coordinator' },
  { value: 'finance_committee', label: 'Finance Committee Member' },
  { value: 'sacristan', label: 'Sacristan' },
  { value: 'other_staff', label: 'Other Staff Member' },
  { value: 'volunteer', label: 'Volunteer' },
];

export const API_ENDPOINTS = {
  PARISH_REQUEST: '/api/parish-request',
  COUNTRIES: '/data/countries.json',
} as const;

export const CONTACT_INFO = {
  PHONE_NUMBERS: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  EMAIL: 'support@parishpro.com',
  WHATSAPP: '+1234567890',
  ADDRESS: {
    STREET: '123 Church Street',
    CITY: 'Vatican City',
    POSTAL: 'VC 00120',
  },
} as const;