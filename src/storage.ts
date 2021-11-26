export const storage = {
  read(key: string): { [key: string]: any } | null {
    const rawState = localStorage.getItem(key);
    if (!rawState) return null;

    return JSON.parse(rawState);
  },

  write(key: string, state: { [key: string]: any }) {
    localStorage.setItem(key, JSON.stringify(state));
  }
}