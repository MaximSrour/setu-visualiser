import Link from "next/link";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

import { Button } from "~/components/ui/button";

export default function Home() {
	const listOfUnits = [
		{
			unit: "FIT1008",
			name: "Introduction to computer science",
			year: 2023,
			semester: "S1",
		},
		{
			unit: "FIT1008",
			name: "Introduction to computer science",
			year: 2023,
			semester: "S2",
		},
		{
			unit: "FIT1045",
			name: "Introduction to programming",
			year: 2023,
			semester: "S1",
		},
		{
			unit: "FIT1045",
			name: "Introduction to programming",
			year: 2023,
			semester: "S2",
		},
		{
			unit: "FIT5057",
			name: "Project management",
			year: 2023,
			semester: "S1",
		},
		{
			unit: "FIT5057",
			name: "Project management",
			year: 2023,
			semester: "S2",
		},
	];

	return (
		<>
			<CustomHead subtitle="Offerings" />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">Offering listings</h1>

					<div className="grid max-w-5xl grid-cols-1 gap-2 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
						{listOfUnits.map((unit, key) => (
							<Link
								key={key}
								href={`/offering/${unit.year}/${unit.semester}/${unit.unit}`}
								className="w-full"
							>
								<Button variant="outline" size="card">
									<h3 className="text-2xl font-bold">
										{unit.unit}
									</h3>
									<div className="text-lg">{unit.name}</div>
									<div className="text-lg">
										{unit.year} - {unit.semester}
									</div>
								</Button>
							</Link>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
