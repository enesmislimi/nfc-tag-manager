export type TagStatus = 'active' | 'inactive' | 'promo';

export interface Tag {
  id: string;              // L'identifiant unique du tag NFC (ex: UUID)
  ownerId: string;         // L'ID du commerçant qui possède le tag
  targetUrl: string;       // L'URL de destination actuelle
  status: TagStatus;       // L'état du tag (pour notre futur Pattern Strategy)
  clicks: number;          // Compteur de scans
  createdAt: Date;
  updatedAt: Date;
}