import Head from "next/head";
import { useRouter } from "next/router";

import AspectOverTimeLineChart from "~/components/AspectOverTimeLineChart";

import { api } from "~/utils/api";

import Header from "~/components/Header";

export default function Home() {
	const router = useRouter();

	const selectedUnit = router.query.unit ? router.query.unit as string : "FIT1045";

	const aspectOverTime = api.aspects.getAspectsOverTime.useQuery({
		unit: selectedUnit,
		campus: "CL",
	});

	return (
		<>
			<Head>
				<title>SETU Visualiser</title>
				<meta name="description" content="Visualiser for Monash SETU data" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-12 px-4 py-16 w-full">
					<h1 className="text-3xl text-center">{selectedUnit} results</h1>

					<div className="flex flex-col items-center justify-center gap-8 w-full">
						<h2 className="text-2xl text-center">University-wide Aspects</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 w-full">
							{[1, 2, 3, 4, 5, 6, 7, 8].map((aspect, key) => (
								<AspectOverTimeLineChart key={key} aspectType="U" aspect={aspect} data={aspectOverTime.data} />
							))}
						</div>
					</div>

					<div className="flex flex-col items-center justify-center gap-8 w-full">
						<h2 className="text-2xl text-center">Faculty-wide Aspects</h2>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 w-full">
							{[1, 2, 3, 4, 5].map((aspect, key) => (
								<AspectOverTimeLineChart key={key} aspectType="F" aspect={aspect} data={aspectOverTime.data} />
							))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
