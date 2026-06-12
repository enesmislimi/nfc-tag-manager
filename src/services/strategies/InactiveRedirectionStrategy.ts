import { Tag } from '../../models/Tag';
import { RedirectionStrategy } from './RedirectionStrategy';

export class InactiveRedirectionStrategy implements RedirectionStrategy {
  getRedirectUrl(_tag: Tag): string {
    return 'https://www.mon-entreprise.com/';
  }
}
