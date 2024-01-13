import Head from "next/head";

import OfferingsAspectRadarChart from "~/components/OfferingsAspectRadarChart";
import AspectOverTimeLineChart from "~/components/AspectOverTimeLineChart";

import { api } from "~/utils/api";

export default function Home() {
	const hello = api.aspects.getFirst.useQuery();

	const uniAspects = api.aspects.getOffering.useQuery({
		unit: "FIT1045",
		year: 2023,
		semester: "S2",
		campus: "CL",
		aspectType: "U"
	});

	const facultyAspects = api.aspects.getOffering.useQuery({
		unit: "FIT1045",
		year: 2023,
		semester: "S2",
		campus: "CL",
		aspectType: "F"
	});

	const aspectOverTime = api.aspects.getAspectsOverTime.useQuery({
		unit: "FIT1045",
		campus: "CL",
	});

	return (
		<>
			<Head>
				<title>SETU Visualiser</title>
				<meta name="description" content="Visualiser for Monash SETU data" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						SETU<span className="text-[hsl(280,100%,70%)]">.</span>fyi
					</h1>

					<p className="text-2xl text-white">
						{hello.data ? hello.data.unit : "Loading tRPC query..."}
					</p>

					<div className="flex">
						<OfferingsAspectRadarChart data={uniAspects.data} title="University-wide" />
						<OfferingsAspectRadarChart data={facultyAspects.data} title="Faculty-wide" />
					</div>

					{[1, 2, 3, 4, 5, 6, 7, 8].map((aspect, key) => (
						<AspectOverTimeLineChart key={key} aspectType="U" aspect={aspect} data={aspectOverTime.data} />
					))}

					{[1, 2, 3, 4, 5].map((aspect, key) => (
						<AspectOverTimeLineChart key={key} aspectType="F" aspect={aspect} data={aspectOverTime.data} />
					))}
				</div>
			</main>
		</>
	);
}
