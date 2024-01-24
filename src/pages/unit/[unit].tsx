import Head from "next/head";
import { useRouter } from "next/router";

import AspectOverTimeLineChart from "~/components/AspectOverTimeLineChart";

import { api } from "~/utils/api";

import Header from "~/components/Header";

export default function Home() {
	const router = useRouter();

	const selectedUnit = router.query.unit ? (router.query.unit as string) : "";

	const isQueryValid = selectedUnit != "";
	const htmlTitleText = isQueryValid ? `${selectedUnit}` : "Loading";

	const aspectOverTime = api.aspects.getAspectsOverTime.useQuery({
		unit: selectedUnit,
		campus: "CL",
	});

	return (
		<>
			<Head>
				<title>{`SETU Visualiser - ${htmlTitleText}`}</title>
				<meta
					name="description"
					content="Visualiser for Monash SETU data"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">
						{selectedUnit} results
					</h1>

					<div className="flex w-full flex-col items-center justify-center gap-8">
						<h2 className="text-center text-2xl">
							University-wide Aspects
						</h2>

						<div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
							{[1, 2, 3, 4, 5, 6, 7, 8].map((aspect, key) => (
								<AspectOverTimeLineChart
									key={key}
									aspectType="U"
									aspect={aspect}
									data={aspectOverTime.data}
								/>
							))}
						</div>
					</div>

					<div className="flex w-full flex-col items-center justify-center gap-8">
						<h2 className="text-center text-2xl">
							Faculty-wide Aspects
						</h2>

						<div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2">
							{[1, 2, 3, 4, 5].map((aspect, key) => (
								<AspectOverTimeLineChart
									key={key}
									aspectType="F"
									aspect={aspect}
									data={aspectOverTime.data}
								/>
							))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
