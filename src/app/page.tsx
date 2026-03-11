"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ProfileCard from "@/components/base/profile-card"
import SimilarityScore from "@/components/base/similarity-score"
import LanguageChart from "@/components/base/language-chart"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const compare = async () => {
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        body: JSON.stringify({ user1, user2 }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        // Save comparison data for /compare page
        localStorage.setItem("githo-comparison", JSON.stringify(data));
      }
    } catch (err: any) {
      setError("Failed to fetch comparison.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 space-y-6">
      <h1 className="text-5xl font-bold text-center mb-8 tracking-tight text-black font-serif">Githo <span className="font-light">- GitHub Profile Comparison</span></h1>
      <Card className="p-6 space-y-4">
        <Input
          placeholder="Your GitHub Username"
          value={user1}
          onChange={e => setUser1(e.target.value)}
        />
        <Input
          placeholder="Other GitHub Username"
          value={user2}
          onChange={e => setUser2(e.target.value)}
        />
        <Button onClick={compare} className="w-full">Compare</Button>
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      </Card>
      {result && (
        <Card className="p-6 mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <ProfileCard user={result.user1} />
            <ProfileCard user={result.user2} />
          </div>
          <SimilarityScore score={result.score ?? 0} />
          <LanguageChart languages={result.languages ?? {}} />
          <Button className="w-full mt-6" variant="outline" onClick={() => router.push("/compare")}> 
            In-depth Comparison
          </Button>
        </Card>
      )}
    </div>
  );
}