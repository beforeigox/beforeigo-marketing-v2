export const DOMAIN = {
  production: 'https://beforeigo.app',
  contact: 'hello@beforeigo.app',
  name: 'Before I Go'
};

export const getDomainUrl = (path: string = '') => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `${window.location.origin}${path}`;
  }
  return `${DOMAIN.production}${path}`;
};
