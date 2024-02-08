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
	const selectedCampus = router.query.campus
		? (router.query.campus as string)
		: "";
	const selectedMode = router.query.mode ? (router.query.mode as string) : "";

	const isQueryValid =
		selectedUnit != "" &&
		selectedYear != -1 &&
		selectedSemester != "" &&
		selectedCampus != "" &&
		selectedMode != "";
	const htmlTitleText = isQueryValid
		? `${selectedYear} ${selectedSemester} ${selectedUnit}`
		: "Loading";

	const uniAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: selectedCampus,
		mode: selectedMode,
		aspectType: "U",
	});

	const facultyAspects = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: selectedCampus,
		mode: selectedMode,
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

					<p className="text-lg">
						{selectedYear} - {selectedSemester} - {selectedCampus}
					</p>
					<p className="text-lg">{selectedMode}</p>

					<div className="flex flex-row flex-wrap items-center justify-center">
						<OfferingsAspectRadarChart data={uniAspects.data} />
						<OfferingsAspectRadarChart data={facultyAspects.data} />
					</div>
				</div>
			</main>
		</>
	);
}
