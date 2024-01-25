import Link from "next/link";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

import { api } from "~/utils/api";

import { useRouter } from "next/router";

import { Input } from "~/components/ui/input";
import { Card } from "~/components/ui/card";

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

	const selectedUnit = router.query.unit as string;
	const selectedPage = Number(router.query.page) || 1;

	const pageLimit = 10;

	const units = api.units.getUnits.useQuery({
		search: selectedUnit,
		limit: pageLimit,
		offset: selectedPage * pageLimit - pageLimit,
	});

	const unitCount = api.units.getUnitCount.useQuery({
		search: selectedUnit,
	});

	function generateArray(
		min: number,
		max: number,
		spread: number,
		selected: number,
	): number[] {
		// Calculate the start of the array
		let start = Math.max(min, selected - Math.floor(spread / 2));

		// If the start + spread would exceed the max, adjust the start
		if (start + spread > max) {
			start = max - spread + 1;
		}

		// Generate the array
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
						placeholder="Unitcode"
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
						value={selectedUnit}
					/>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
						{units.data?.map((unit, key) => (
							<Link key={key} href={`/unit/${unit.unit}`}>
								<Card className="gap-3 bg-white/10 p-4 text-white hover:bg-white/20">
									<h3 className="text-2xl font-bold">
										{unit.unit}
									</h3>
									<div className="text-lg">{unit.title}</div>
								</Card>
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
							totalPages < 7 ? null : (
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
