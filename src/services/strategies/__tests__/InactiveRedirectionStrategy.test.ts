// src/strategies/__tests__/InactiveRedirectionStrategy.test.ts
import { InactiveRedirectionStrategy } from '../InactiveRedirectionStrategy';
import { Tag } from '../../../models/Tag';

describe('InactiveRedirectionStrategy', () => {
  
  it('devrait retourner l\'URL de secours de l\'entreprise', () => {
    // 1. PRÉPARATION (Arrange)
    const strategy = new InactiveRedirectionStrategy();
    
    // On crée un faux tag très basique juste pour satisfaire TypeScript
    const fauxTag: Partial<Tag> = {
      id: '999',
      status: 'inactive'
    };

    // 2. ACTION (Act)
    // On demande à la stratégie quelle URL elle nous conseille
    const url = strategy.getRedirectUrl(fauxTag as Tag);

    // 3. VÉRIFICATION (Assert)
    // On s'attend à ce que l'URL soit exactement celle-ci
    expect(url).toBe('https://www.mon-entreprise.com/'); 
  });

});