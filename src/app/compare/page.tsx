"use client";
import React from "react";

import { Card } from "@/components/ui/card";
import ProfileCard from "@/components/base/profile-card";
import SimilarityScore from "@/components/base/similarity-score";
import LanguageChart from "@/components/base/language-chart";

import { useEffect, useState } from "react";

export default function ComparePage() {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		// Try to read comparison data from localStorage
		const stored = localStorage.getItem("githo-comparison");
		if (stored) {
			setData(JSON.parse(stored));
		}
	}, []);

	if (!data) {
		return (
			<div className="max-w-3xl mx-auto mt-20 text-center text-gray-500">
				<h1 className="text-4xl font-bold mb-8 text-black font-serif">In-depth Profile Comparison</h1>
				<p>No comparison data found. Please compare profiles on the homepage first.</p>
			</div>
		);
	}

	// Helper: get top languages
	const getTopLanguages = (langs: Record<string, number>, count = 3) => {
		return Object.entries(langs)
			.sort((a, b) => b[1] - a[1])
			.slice(0, count)
			.map(([lang]) => lang);
	};

	// Helper: get overlap and unique languages
	const lang1 = data.user1?.languages || {};
	const lang2 = data.user2?.languages || {};
	const langs1 = Object.keys(lang1);
	const langs2 = Object.keys(lang2);
	const overlap = langs1.filter(l => langs2.includes(l));
	const unique1 = langs1.filter(l => !langs2.includes(l));
	const unique2 = langs2.filter(l => !langs1.includes(l));

	// Repo names
	const repos1 = Array.isArray(data.user1?.repos) ? data.user1.repos : [];
	const repos2 = Array.isArray(data.user2?.repos) ? data.user2.repos : [];

	// Language icon helper (simple emoji fallback)
	const langIcon = (lang: string) => {
		const icons: Record<string, string> = {
			JavaScript: "🟨",
			TypeScript: "🟦",
			Python: "🐍",
			Go: "💙",
			HTML: "🟥",
			CSS: "🟪",
			Java: "☕",
			C: "🔵",
			Cpp: "🔷",
			Ruby: "🔴",
			PHP: "💜",
			Swift: "🟧",
			Rust: "🦀",
			Shell: "💚",
			Dart: "🟦",
			Kotlin: "🟪",
			// Add more as needed
		};
		return icons[lang] || "🔤";
	};

	return (
		<div className="max-w-3xl mx-auto mt-20 space-y-8">
			<h1 className="text-4xl font-bold text-center mb-8 text-black font-serif">In-depth Profile Comparison</h1>
			<Card className="p-8 space-y-8">
				<div className="flex flex-col md:flex-row gap-8 justify-center">
					<ProfileCard user={data.user1} />
					<ProfileCard user={data.user2} />
				</div>
				<SimilarityScore score={data.score ?? 0} />
				<LanguageChart languages={data.languages ?? {}} />
				<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-2 text-black">{data.user1?.login} Stats</h3>
						<ul className="text-sm text-gray-700 mb-2">
							<li>Repos: <span className="font-bold">{data.user1?.public_repos ?? 0}</span></li>
							<li>Followers: <span className="font-bold">{data.user1?.followers ?? 0}</span></li>
							<li>Top Languages: <span className="font-bold">{getTopLanguages(lang1).join(", ") || "N/A"}</span></li>
							<li>Unique Languages: <span className="font-bold">{unique1.join(", ") || "None"}</span></li>
						</ul>
						<div className="mb-2">
							<span className="font-semibold text-black">Public Repos:</span>
							<ul className="text-xs text-gray-600 mt-1">
								{repos1.length > 0 ? repos1.map((repo: any) => (
									<li key={repo.name} className="mb-1">{repo.name}</li>
								)) : <li>None</li>}
							</ul>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2 text-black">{data.user2?.login} Stats</h3>
						<ul className="text-sm text-gray-700 mb-2">
							<li>Repos: <span className="font-bold">{data.user2?.public_repos ?? 0}</span></li>
							<li>Followers: <span className="font-bold">{data.user2?.followers ?? 0}</span></li>
							<li>Top Languages: <span className="font-bold">{getTopLanguages(lang2).join(", ") || "N/A"}</span></li>
							<li>Unique Languages: <span className="font-bold">{unique2.join(", ") || "None"}</span></li>
						</ul>
						<div className="mb-2">
							<span className="font-semibold text-black">Public Repos:</span>
							<ul className="text-xs text-gray-600 mt-1">
								{repos2.length > 0 ? repos2.map((repo: any) => (
									<li key={repo.name} className="mb-1">{repo.name}</li>
								)) : <li>None</li>}
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-4 text-black">Language Overlap</h2>
					<div className="text-gray-700 text-center text-sm flex flex-wrap gap-2 justify-center">
						{overlap.length > 0 ? (
							overlap.map(lang => (
								<span key={lang} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-bold">
									<span className="mr-1">{langIcon(lang)}</span>{lang}
								</span>
							))
						) : (
							<span>No common languages found.</span>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
}
