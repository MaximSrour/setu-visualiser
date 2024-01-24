import Head from "next/head";
import Link from "next/link";

import Header from "~/components/Header";

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
			<Head>
				<title>SETU Visualiser</title>
				<meta
					name="description"
					content="Visualiser for Monash SETU data"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">Offering listings</h1>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
						{listOfUnits.map((unit, key) => (
							<Link
								key={key}
								className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
								href={`/offering/${unit.year}/${unit.semester}/${unit.unit}`}
							>
								<h3 className="text-2xl font-bold">
									{unit.unit}
								</h3>
								<div className="text-lg">{unit.name}</div>
								<div className="text-lg">{unit.year}</div>
								<div className="text-lg">{unit.semester}</div>
							</Link>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
