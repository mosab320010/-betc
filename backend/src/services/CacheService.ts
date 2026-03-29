export class CacheService {
  private store = new Map<string, string>();

  get(key: string) {
    return this.store.get(key) ?? null;
  }

  set(key: string, value: string) {
    this.store.set(key, value);
  }
}
