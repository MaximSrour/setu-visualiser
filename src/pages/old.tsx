import { useState } from "react";

import OfferingsAspectRadarChart from "~/components/OfferingsAspectRadarChart";
import AspectOverTimeLineChart from "~/components/AspectOverTimeLineChart";
import Traffic from "~/components/Traffic";

import { api } from "~/utils/api";

import { Combobox } from "~/components/ui/combobox";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

export default function Home() {
	const [selectedUnit, setSelectedUnit] = useState("");
	const [selectedYear, setSelectedYear] = useState(2023);
	const [selectedSemester, setSelectedSemester] = useState("");

	const units = [
		{
			value: "fit1045",
			label: "FIT1045",
		},
		{
			value: "fit5057",
			label: "FIT5057",
		},
	];

	const years = [
		{
			value: "2021",
			label: "2021",
		},
		{
			value: "2022",
			label: "2022",
		},
		{
			value: "2023",
			label: "2023",
		},
	];

	const semesters = [
		{
			value: "s1",
			label: "S1",
		},
		{
			value: "s2",
			label: "S2",
		},
	];

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

	const uniAspectsPrev = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: "CL",
		aspectType: "U",
	});

	const facultyAspectsPrev = api.aspects.getOffering.useQuery({
		unit: selectedUnit,
		year: selectedYear,
		semester: selectedSemester,
		campus: "CL",
		aspectType: "F",
	});

	const aspectOverTime = api.aspects.getAspectsOverTime.useQuery({
		unit: selectedUnit,
		campus: "CL",
	});

	return (
		<>
			<CustomHead subtitle="Old" />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<div className="flex flex-col gap-2">
						<Combobox
							defaultValue={selectedUnit}
							dataType="unit"
							data={units}
							callback={setSelectedUnit}
						/>
						<Combobox
							defaultValue={selectedYear.toString()}
							dataType="year"
							data={years}
							callback={(year) => {
								setSelectedYear(parseInt(year));
							}}
						/>
						<Combobox
							defaultValue={selectedSemester}
							dataType="semester"
							data={semesters}
							callback={setSelectedSemester}
						/>
					</div>

					<h1 className="text-center text-3xl">
						{selectedUnit} results
					</h1>

					<div className="flex flex-row flex-wrap items-center justify-center">
						<Traffic
							dataCurr={uniAspects.data}
							dataPrev={uniAspectsPrev.data}
						/>
						<Traffic
							dataCurr={facultyAspects.data}
							dataPrev={facultyAspectsPrev.data}
						/>
					</div>

					<div className="flex flex-row flex-wrap items-center justify-center">
						<OfferingsAspectRadarChart data={uniAspects.data} />
						<OfferingsAspectRadarChart data={facultyAspects.data} />
					</div>

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
