import { Tag } from '../models/Tag';

// 1. LE CONTRAT (L'abstraction)
// Principe SOLID (Dependency Inversion) : Le code dépendra de cette interface, pas de la BDD.
export interface TagRepository {
  findById(id: string): Promise<Tag | null>;
  save(tag: Tag): Promise<void>;
  update(id: string, tagData: Partial<Tag>): Promise<Tag | null>;
}

// 2. L'IMPLÉMENTATION EN MÉMOIRE (Pour le dev et les tests unitaires)
export class InMemoryTagRepository implements TagRepository {
  private tags: Map<string, Tag> = new Map();

  async findById(id: string): Promise<Tag | null> {
    return this.tags.get(id) || null;
  }

  async save(tag: Tag): Promise<void> {
    this.tags.set(tag.id, tag);
  }

  async update(id: string, tagData: Partial<Tag>): Promise<Tag | null> {
    const existingTag = this.tags.get(id);
    if (!existingTag) return null;

    const updatedTag = { ...existingTag, ...tagData, updatedAt: new Date() };
    this.tags.set(id, updatedTag);
    return updatedTag;
  }
}
