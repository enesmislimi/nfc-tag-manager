// src/repositories/PostgresTagRepository.ts
import { TagRepository } from './TagRepository';
import { pool } from '../config/database';

// On définit la forme de notre Tag pour TypeScript (si tu l'as déjà fait ailleurs, tu peux l'importer)
export interface Tag {
  id: string;
  ownerId: string;
  targetUrl: string;
  status: 'active' | 'inactive';
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class PostgresTagRepository implements TagRepository {
  
  async findById(id: string): Promise<Tag | null> {
    // Le $1 est notre trou sécurisé, il sera remplacé par la valeur du tableau [id]
    const result = await pool.query('SELECT * FROM tags WHERE id = $1', [id]);
    
    // S'il n'y a aucune ligne dans le résultat, le tag n'existe pas
    if (result.rows.length === 0) {
      return null;
    }
    
    // Sinon, on renvoie la première ligne trouvée
    return result.rows[0];
  }

  async save(tag: Tag): Promise<void> {
    // Les guillemets autour de "ownerId" etc. servent à garder les majuscules dans PostgreSQL
    const query = `
      INSERT INTO tags (id, "ownerId", "targetUrl", status, clicks, "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    // Voici les valeurs qui vont boucher les trous $1 à $7
    const values = [
      tag.id,
      tag.ownerId,
      tag.targetUrl,
      tag.status,
      tag.clicks,
      tag.createdAt,
      tag.updatedAt
    ];

    await pool.query(query, values);
  }

  async update(id: string, tagData: Partial<Tag>): Promise<Tag | null> { 
    const existingTag = await this.findById(id);
    
    // 2. S'il n'existe pas, on retourne explicitement null
    if (!existingTag) {
      return null; 
    }

    const updatedTag = { ...existingTag, ...tagData, updatedAt: new Date() };

    const query = `
      UPDATE tags 
      SET "targetUrl" = $1, status = $2, clicks = $3, "updatedAt" = $4
      WHERE id = $5
    `;
    const values = [
      updatedTag.targetUrl, 
      updatedTag.status, 
      updatedTag.clicks, 
      updatedTag.updatedAt, 
      id
    ];
    
    await pool.query(query, values);

    // 3. On retourne le tag fraîchement mis à jour pour respecter le contrat !
    return updatedTag; 
  }
}