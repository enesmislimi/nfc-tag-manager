import { Tag } from '../../models/Tag';

// 1. LE CONTRAT COMMUN
export interface RedirectionStrategy {
  getRedirectUrl(tag: Tag): string;
}

// 2. LES IMPLÉMENTATIONS SPÉCIFIQUES

export class ActiveRedirectionStrategy implements RedirectionStrategy {
  getRedirectUrl(tag: Tag): string {
    // renvoie simplement l'URL du commerçant
    return tag.targetUrl;
  }
}

export class InactiveRedirectionStrategy implements RedirectionStrategy {
  getRedirectUrl(tag: Tag): string {
    // Le commerçant n'est plus actif, on redirige vers le site de l'entreprise ou une page d'information
    return 'https://mon-entreprise.com/tag-inactive';
  }
}