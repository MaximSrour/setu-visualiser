"use client"

import * as React from "react"
import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"

interface IGithubButtonProps {
	repo: string;
}

export default function GithubButton(props: IGithubButtonProps) {
	const [repo, setRepo] = React.useState<any>(null);
	React.useEffect(() => {
		fetch(`https://api.github.com/repos/${props.repo}`)
			.then(res => res.json())
			.then(data => setRepo(data));
	}, []);

	if(!repo || repo.message == "Not Found") {
		return null;
	}

	return (
		<Link href={`https://github.com/${props.repo}`} target="_blank">
			<Button variant="outline" size="icon">
				<GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
				<span className="sr-only">Github</span>
			</Button>
		</Link>
	)
}
