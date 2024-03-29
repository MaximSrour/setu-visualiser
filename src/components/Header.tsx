import Link from "next/link";

import ThemeToggle from "~/components/ui/theme-toggle";
import GithubButton from "~/components/ui/github-button";

interface IHeaderProps {
	isSticky?: boolean;
}

export default function Header(props: IHeaderProps) {
	const isSticky = props.isSticky ?? true;

	return (
		<header
			className={`z-50 flex w-full flex-row items-center justify-between bg-background px-4 py-2
		${isSticky ? "fixed top-0 w-full shadow-md" : ""}`}
		>
			<Link href="/">
				<span className="text-3xl font-extrabold tracking-tight">
					SETU<span className="text-[hsl(280,100%,70%)]">.</span>fyi
				</span>
			</Link>

			<div className="flex flex-row gap-2">
				<GithubButton repo="MaximSrour/setu-visualiser" showStars />
				<ThemeToggle />
			</div>
		</header>
	);
}
