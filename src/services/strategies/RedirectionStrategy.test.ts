import { ActiveRedirectionStrategy, InactiveRedirectionStrategy } from './RedirectionStrategy';
import { Tag } from '../../models/Tag';

describe('RedirectionStrategy', () => {

  it("devrait retourner l'URL cible du commerçant quand le tag est actif", () => {
    // 🛠️ ARRANGE (Préparer)
    const strategy = new ActiveRedirectionStrategy();
    const fauxTag: Tag = {
      id: 'tag-123',
      ownerId: 'client-456',
      targetUrl: 'https://boutique-lyon.fr',
      status: 'active',
      clicks: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 🎬 ACT (Agir)
    const result = strategy.getRedirectUrl(fauxTag);

    // ✅ ASSERT (Vérifier)
    expect(result).toBe('https://boutique-lyon.fr');
  });

});