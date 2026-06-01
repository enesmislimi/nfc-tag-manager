import { Router, Request, Response } from 'express';
import { InMemoryTagRepository } from '../repositories/TagRepository';
import { CacheTagRepositoryDecorator } from '../repositories/CacheTagRepositoryDecorator';
import { ActiveRedirectionStrategy, InactiveRedirectionStrategy } from '../services/strategies/RedirectionStrategy';

const router = Router();

// 1. Préparation (Injection de dépendances)
// crée notre BDD en mémoire et l'enveloppe avec le Cache !
const baseRepository = new InMemoryTagRepository();
const tagRepository = new CacheTagRepositoryDecorator(baseRepository);


const fauxTag = {
  id: '123',
  ownerId: 'client-demo',
  targetUrl: 'https://fr.wikipedia.org', // L'URL cible si le tag est actif
  status: 'inactive' as const,             //  force le type à 'active'
  clicks: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
tagRepository.save(fauxTag);



// 🚀 2. Notre point d'entrée GET
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const tagId = req.params.id;

  if (!tagId || typeof tagId !== 'string') {
    res.status(400).send('ID de tag invalide ou manquant');
    return;
  }

  // A. On cherche le tag
  const tag = await tagRepository.findById(tagId);

  if (!tag) {
    res.status(404).send('Tag introuvable');
    return;
  }

  // B. On choisit la bonne recette (Stratégie)
  let strategy;
  if (tag.status === 'active') {
    strategy = new ActiveRedirectionStrategy();
  } else {
    strategy = new InactiveRedirectionStrategy();
  }

  // C. On récupère le lien et on redirige le client (code 302 = redirection temporaire)
  const url = strategy.getRedirectUrl(tag);
  res.redirect(302, url);
});

export default router;