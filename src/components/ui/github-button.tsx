"use client"

import * as React from "react"
import Link from "next/link";

import { GitHubLogoIcon, StarFilledIcon } from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"

interface IGitHubResponse {
	message?: string;
	stargazers_count?: number;
}

interface IGithubButtonProps {
	repo: string;
	showStars?: boolean;
}

export default function GithubButton(props: IGithubButtonProps) {
	const [repoResponse, setRepoResponse] = React.useState<IGitHubResponse>(null!);
	
	React.useEffect(() => {
		async function fetchData() {
			await fetch(`https://api.github.com/repos/${props.repo}`)
			.then(res => res.json() as Promise<IGitHubResponse>)
			.then(data => setRepoResponse(data))
			.catch(() => setRepoResponse({ message: "Not Found" }));
		}

		void fetchData();
	}, [props.repo]);

	if(!repoResponse || repoResponse.message == "Not Found") {
		return null;
	}

	return (
		<Link href={`https://github.com/${props.repo}`} target="_blank">
			<Button variant="outline" size="icon" className="flex flex-row gap-2 w-auto p-3">
				<GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
				
				{props.showStars && <span className="flex flex-row gap-1 items-center justify-center">
					{repoResponse.stargazers_count}
					<StarFilledIcon className="h-[0.8rem] w-[0.8rem]" />
				</span>}
				
				<span className="sr-only">Github</span>
			</Button>
		</Link>
	)
}
