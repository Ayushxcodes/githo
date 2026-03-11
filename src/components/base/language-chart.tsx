import React from "react";
import { Card } from "@/components/ui/card";

export default function LanguageChart({ languages }: { languages: Record<string, number> }) {
	const total = Object.values(languages).reduce((a, b) => a + b, 0);
	return (
		<Card className="w-full p-4 shadow border border-gray-200 rounded-lg bg-white">
			<h3 className="text-md font-semibold mb-4">Languages Used</h3>
			<div className="space-y-2">
				{Object.entries(languages).map(([lang, count]) => {
					const percent = total ? Math.round((count / total) * 100) : 0;
					return (
						<div key={lang} className="flex items-center gap-2">
							<span className="w-24 text-xs font-medium text-gray-700">{lang}</span>
							<div className="flex-1 h-3 bg-gray-200 rounded">
								<div
									className="h-3 rounded bg-blue-500"
									style={{ width: `${percent}%` }}
								/>
							</div>
							<span className="text-xs text-gray-500 ml-2">{count} ({percent}%)</span>
						</div>
					);
				})}
			</div>
		</Card>
	);
}
