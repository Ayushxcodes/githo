import { getUser, getRepos } from "@/lib/github"
import { analyzeLanguages } from "@/lib/analyzer"

export async function POST(req: Request) {
  const { user1, user2 } = await req.json();

  const [u1, u2] = await Promise.all([
    getUser(user1),
    getUser(user2)
  ]);

  // Handle user not found errors
  if (u1?.error || u2?.error) {
    return Response.json({
      error: u1?.error || u2?.error,
      status: u1?.status || u2?.status
    }, { status: 404 });
  }

  const [r1, r2] = await Promise.all([
    getRepos(user1),
    getRepos(user2)
  ]);

  // Debug: log repo languages for both users
  console.log('User1 repo languages:', r1.map((repo: { language?: string | null }) => repo.language));
  console.log('User2 repo languages:', r2.map((repo: { language?: string | null }) => repo.language));
  const lang1 = analyzeLanguages(r1);
  const lang2 = analyzeLanguages(r2);

  // Example similarity score calculation
  const score = calculateSimilarity(lang1, lang2);

    return Response.json({
      user1: { ...u1, repos: r1 },
      user2: { ...u2, repos: r2 },
      languages: { ...lang1, ...lang2 },
      score
    });
}

// Simple similarity calculation (can be improved)
function calculateSimilarity(l1: Record<string, number>, l2: Record<string, number>): number {
  const keys1 = Object.keys(l1);
  const keys2 = Object.keys(l2);
  const common = keys1.filter(k => keys2.includes(k));
  const total = new Set([...keys1, ...keys2]).size;
  return total === 0 ? 0 : Math.round((common.length / total) * 100);
}
