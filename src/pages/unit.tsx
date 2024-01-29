import Link from "next/link";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

import { api } from "~/utils/api";

import { useRouter } from "next/router";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";

export default function Home() {
	const router = useRouter();

	const search = router.query.unit as string;
	const selectedPage = Number(router.query.page) || 1;

	const pageLimit = 12;

	const units = api.units.getUnits.useQuery({
		search: search,
		limit: pageLimit,
		offset: selectedPage * pageLimit - pageLimit,
	});

	const unitCount = api.units.getUnitCount.useQuery({
		search: search,
	});

	function generateArray(
		min: number,
		max: number,
		spread: number,
		selected: number,
	): number[] {
		let start = Math.max(min, selected - Math.floor(spread / 2));

		if (start + spread > max) {
			start = max - spread + 1;
		}

		return Array.from({ length: spread }, (_, i) => start + i);
	}

	const totalPages = Math.ceil((unitCount.data ?? 0) / pageLimit);

	const pagesCount = Math.min(totalPages - 2, 5);
	const pages = generateArray(2, totalPages - 1, pagesCount, selectedPage);

	return (
		<>
			<CustomHead subtitle="Units" />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">Unit listings</h1>

					<Input
						className="w-48"
						type="text"
						placeholder="Search units"
						onChange={(e) => {
							async function fetchData() {
								await router.push({
									pathname: router.pathname,
									query: {
										...router.query,
										unit: e.target.value,
										page: Math.min(
											selectedPage,
											totalPages,
										),
									},
								});
							}

							void fetchData();
						}}
						defaultValue={search}
					/>

					<div className="grid max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
						{units.data?.map((unit, key) => (
							<Link
								key={key}
								href={`/unit/${unit.unit}`}
								className="w-full"
							>
								<Button variant="outline" size="card">
									<h3 className="text-2xl font-bold">
										{unit.unit}
									</h3>
									<div className="w-auto text-lg">
										{unit.title}
									</div>
								</Button>
							</Link>
						))}
					</div>

					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									replace
									href={{
										pathname: router.pathname,
										query: {
											...router.query,
											page: `${Math.max(
												selectedPage - 1,
												1,
											)}`,
										},
									}}
								/>
							</PaginationItem>

							<PaginationItem>
								<PaginationLink
									replace
									href={{
										pathname: router.pathname,
										query: {
											...router.query,
											page: "1",
										},
									}}
									isActive={selectedPage == 1}
								>
									1
								</PaginationLink>
							</PaginationItem>

							{pages.includes(2) || pages.length < 2 ? null : (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							{pages.map((page, key) => (
								<PaginationItem key={key}>
									<PaginationLink
										replace
										href={{
											pathname: router.pathname,
											query: {
												...router.query,
												page: `${page}`,
											},
										}}
										isActive={selectedPage == page}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							))}

							{pages.includes(totalPages - 1) ||
							totalPages < 6 ? null : (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}

							{pages.includes(totalPages) ||
							totalPages < 2 ? null : (
								<PaginationItem>
									<PaginationLink
										replace
										href={{
											pathname: router.pathname,
											query: {
												...router.query,
												page: `${totalPages}`,
											},
										}}
										isActive={selectedPage == totalPages}
									>
										{totalPages}
									</PaginationLink>
								</PaginationItem>
							)}

							<PaginationItem>
								<PaginationNext
									replace
									href={{
										pathname: router.pathname,
										query: {
											...router.query,
											page: `${Math.min(
												selectedPage + 1,
												totalPages,
											)}`,
										},
									}}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</main>
		</>
	);
}
