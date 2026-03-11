import React from "react";
import { Card } from "@/components/ui/card";

export default function SimilarityScore({ score }: { score: number }) {
	// Color based on score
	const color = score > 80 ? "bg-green-500" : score > 50 ? "bg-yellow-500" : "bg-red-500";
	return (
		<Card className="w-full p-4 flex flex-col items-center shadow border border-gray-200 rounded-lg bg-white">
			<h3 className="text-md font-semibold mb-2">Similarity Score</h3>
			<div className="relative w-24 h-24 flex items-center justify-center mb-2">
				<div className={`absolute rounded-full w-24 h-24 ${color} opacity-20`} />
				<span className="text-3xl font-bold z-10">{score}%</span>
			</div>
			<p className="text-xs text-gray-500">Higher score means more similar language usage.</p>
		</Card>
	);
}
