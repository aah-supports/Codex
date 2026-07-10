export function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`
}

export function getOrCreateAnonymousUserId() {
  const key = 'poo-learning.anonymous-user-id'
  const existing = localStorage.getItem(key)

  if (existing) {
    return existing
  }

  const id = `anon_${crypto.randomUUID()}`
  localStorage.setItem(key, id)
  return id
}
