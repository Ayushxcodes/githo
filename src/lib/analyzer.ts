export function analyzeLanguages(repos: Array<{ language?: string | null }>) {
  const map: Record<string, number> = {}

  repos.forEach((repo: { language?: string | null }) => {
    const lang = repo.language
    if(!lang) return

    if(!map[lang]) map[lang] = 0
    map[lang] += 1
  })

  return map
}