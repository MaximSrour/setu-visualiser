import { useRouter } from "next/router";

import OfferingsAspectRadarChart from "~/components/OfferingsAspectRadarChart";

import { api } from "~/utils/api";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

export default function Home() {
	const router = useRouter();

	const selectedUnit = router.query.unit ? (router.query.unit as string) : "";
	const selectedYear = router.query.year
		? parseInt(router.query.year as string)
		: -1;
	const selectedSemester = router.query.semester
		? (router.query.semester as string)
		: "";

	const isQueryValid =
		selectedUnit != "" && selectedYear != -1 && selectedSemester != "";
	const htmlTitleText = isQueryValid
		? `${selectedYear} ${selectedSemester} ${selectedUnit}`
		: "Loading";

	const uniAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: "CL",
		aspectType: "U",
	});

	const facultyAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: "CL",
		aspectType: "F",
	});

	return (
		<>
			<CustomHead subtitle={htmlTitleText} />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">
						{selectedUnit} results
					</h1>

					<div className="flex flex-row flex-wrap items-center justify-center">
						<OfferingsAspectRadarChart data={uniAspects.data} />
						<OfferingsAspectRadarChart data={facultyAspects.data} />
					</div>
				</div>
			</main>
		</>
	);
}
