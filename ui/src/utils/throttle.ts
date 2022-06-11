/**
 * Cette fonction renvoie une nouvelle fonction qui ne s'exécute pas plus que tous les *limit* millisecondes
 * Utile pour ne pas surcharger une API d'appels en réaction à une saisie utilisateur par exemple.
 */

export function throttle(func: (...args: unknown[]) => void, limit: number) {
  let lastTime = 0;
  let timer: NodeJS.Timeout;
  return function (...args: unknown[]) {
    const now = new Date().getTime();
    if (now - lastTime >= limit) {
      func(...args);
      lastTime = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
        lastTime = new Date().getTime();
      }, lastTime + limit - now);
    }
  };
}
