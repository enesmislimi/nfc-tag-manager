import { Tag } from '../models/Tag';
import { TagRepository } from './TagRepository';

export class CacheTagRepositoryDecorator implements TagRepository {
  private cache: Map<string, Tag> = new Map(); // cache ultra-rapide (simulé ici)
  private repository: TagRepository; // Le vrai repository (la BDD)  "décorer"

  // On injecte le vrai repository lors de la création
  constructor(repository: TagRepository) {
    this.repository = repository;
  }

  async findById(id: string): Promise<Tag | null> {
    // 1. On cherche dans le cache
    const cachedTag = this.cache.get(id);
    if (cachedTag) {
      console.info(`[CACHE HIT] Tag ${id} trouvé en cache !`); // Pour prouver que ça marche
      return cachedTag;
    }

    // 2. Pas trouvé ? On cherche dans le vrai Repository (la BDD)
    console.info(`[CACHE MISS] Tag ${id} non trouvé en cache. Recherche en BDD...`);
    const dbTag = await this.repository.findById(id);

    // 3. Si on le trouve en BDD, on le met dans le cache pour la prochaine fois
    if (dbTag) {
      this.cache.set(id, dbTag);
    }

    return dbTag;
  }

  // Pour simplifier, les méthodes de sauvegarde écrivent dans la BDD ET mettent à jour le cache
  async save(tag: Tag): Promise<void> {
    await this.repository.save(tag);
    this.cache.set(tag.id, tag);
  }

  async update(id: string, tagData: Partial<Tag>): Promise<Tag | null> {
    const updatedTag = await this.repository.update(id, tagData);
    if (updatedTag) {
      this.cache.set(id, updatedTag);
    }
    return updatedTag;
  }
}