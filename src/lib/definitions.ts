export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Policy = {
  id: string;
  clientId: string;
  categoryId: string;
  policyName: string;
  issueDate: Date;
  expiryDate: Date;
  amount: number;
  attachmentUrl?: string;
};
