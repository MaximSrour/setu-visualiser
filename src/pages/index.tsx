import Head from "next/head";
import { useState } from "react";

import OfferingsAspectRadarChart from "~/components/OfferingsAspectRadarChart";
import AspectOverTimeLineChart from "~/components/AspectOverTimeLineChart";

import ModeToggle from "~/components/ui/theme-toggle";

import { api } from "~/utils/api";

import { Combobox } from "~/components/ui/combobox";

export default function Home() {
	const [selectedUnit, setSelectedUnit] = useState("");

	const units = [
		{
			value: "fit1045",
			label: "FIT1045"
		},
		{
			value: "fit5057",
			label: "FIT5057"
		}
	]

	const uniAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: 2023,
		semester: "S2",
		campus: "CL",
		aspectType: "U"
	});

	const facultyAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: 2023,
		semester: "S2",
		campus: "CL",
		aspectType: "F"
	});

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

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-12 px-4 py-16 w-full">
					<span className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
						SETU<span className="text-[hsl(280,100%,70%)]">.</span>fyi
					</span>
					<p className="text-xl text-center">The comprehensive visualiser for unit performance</p>

					<ModeToggle />

					<Combobox defaultValue={selectedUnit} dataType="unit" data={units} callback={setSelectedUnit} />

					<h1 className="text-3xl text-center">{selectedUnit} results</h1>

					<div className="flex flex-row flex-wrap items-center justify-center">
						<OfferingsAspectRadarChart data={uniAspects.data} />
						<OfferingsAspectRadarChart data={facultyAspects.data} />
					</div>

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
