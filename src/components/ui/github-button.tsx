"use client"

import * as React from "react"
import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"

export default function GithubButton() {
	return (
		<Link href="https://github.com/MaximSrour/setu-visualiser" target="_blank">
			<Button variant="outline" size="icon">
				<GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
				<span className="sr-only">Github</span>
			</Button>
		</Link>
	)
}
