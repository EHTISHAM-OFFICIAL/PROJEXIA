export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

/** Document shape at admins/{uid}. Presence of the doc is what grants admin access. */
export interface AdminRecord {
  role: 'admin';
  email: string;
  createdAt: unknown;
}
