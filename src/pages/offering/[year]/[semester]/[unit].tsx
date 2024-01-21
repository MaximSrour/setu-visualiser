import Head from "next/head";
import { useRouter } from "next/router";

import OfferingsAspectRadarChart from "~/components/OfferingsAspectRadarChart";

import { api } from "~/utils/api";

import Header from "~/components/Header";

export default function Home() {
	const router = useRouter();

	const selectedUnit = router.query.unit ? router.query.unit as string : "FIT1045";
	const selectedYear = router.query.year ? parseInt(router.query.year as string) : 2023;
	const selectedSemester = router.query.semester ? router.query.semester as string : "S2";

	const uniAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: "CL",
		aspectType: "U"
	});

	const facultyAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: "CL",
		aspectType: "F"
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

					<div className="flex flex-row flex-wrap items-center justify-center">
						<OfferingsAspectRadarChart data={uniAspects.data} />
						<OfferingsAspectRadarChart data={facultyAspects.data} />
					</div>
				</div>
			</main>
		</>
	);
}
