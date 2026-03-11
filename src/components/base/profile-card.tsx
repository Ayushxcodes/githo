import React from "react";
import { Card } from "@/components/ui/card";

export default function ProfileCard({ user }: { user: any }) {
	return (
		<Card className="w-full max-w-xs p-4 flex flex-col items-center shadow-md border border-gray-200 rounded-lg bg-white">
			{user?.avatar_url && (
				<img
					src={user.avatar_url}
					alt="avatar"
					className="rounded-full mb-4 border border-gray-300"
					width={80}
					height={80}
				/>
			)}
			<h2 className="text-lg font-semibold mb-1">{user?.login || "Unknown User"}</h2>
			<p className="text-sm text-gray-500 mb-2">{user?.bio || "No bio available."}</p>
			<div className="flex gap-3 text-xs text-gray-700 mb-2">
				<span>Followers: <span className="font-bold">{user?.followers ?? 0}</span></span>
				<span>Following: <span className="font-bold">{user?.following ?? 0}</span></span>
			</div>
			<span className="text-xs text-gray-700">Repos: <span className="font-bold">{user?.public_repos ?? 0}</span></span>
		</Card>
	);
}
