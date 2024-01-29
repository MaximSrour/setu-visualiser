import Link from "next/link";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

import { Button } from "~/components/ui/button";
import {
	RoadmapComplete,
	RoadmapCompleteCard,
	RoadmapInProgress,
	RoadmapInProgressCard,
	RoadmapPlanned,
	RoadmapPlannedCard,
} from "~/components/Roadmap";

export default function Home() {
	return (
		<>
			<CustomHead />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex max-w-screen-lg flex-col items-center justify-center gap-12 px-4 py-16">
					<div className="flex min-h-[75vh] w-full flex-col items-center justify-center gap-12">
						<span className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
							SETU
							<span className="text-[hsl(280,100%,70%)]">.</span>
							fyi
						</span>
						<p className="text-center text-xl">
							The comprehensive visualiser for unit performance.
						</p>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
							<Link href={"/unit"}>
								<Button variant="outline" size="card">
									<h3 className="text-2xl font-bold">
										Units
									</h3>
									<div className="text-lg">
										Start exploring historical unit
										performance
									</div>
								</Button>
							</Link>

							<Link href={"/offering"}>
								<Button variant="outline" size="card">
									<h3 className="text-2xl font-bold">
										Offerings
									</h3>
									<div className="text-lg">
										Search for a specific unit offering
									</div>
								</Button>
							</Link>
						</div>
					</div>

					<div className="flex w-full flex-col items-center justify-center gap-8">
						<h2 className="w-fit text-3xl font-bold">Roadmap</h2>

						<RoadmapComplete>
							<RoadmapCompleteCard
								title="Unit listing"
								description="The navigable list of all units offered by the university."
							/>
						</RoadmapComplete>

						<RoadmapInProgress>
							<RoadmapInProgressCard
								title="Offering listing"
								description="The navigable list of all unit offerings at the university."
							/>
							<RoadmapInProgressCard
								title="Unit visualisations"
								description="A comprehensive unit dashboard with visualisations of unit performance."
							/>
							<RoadmapInProgressCard
								title="Offering visualisations"
								description="A comprehensive dashboard for each unit offering."
							/>
						</RoadmapInProgress>

						<RoadmapPlanned>
							<RoadmapPlannedCard
								title="Faculty visualisations"
								description="Breakdown of each faculty and their unit performance as a whole."
							/>
							<RoadmapPlannedCard
								title="Integration with the Handbook"
								description="Connect handbook information to the site such as chief examiners and future offerings."
							/>
						</RoadmapPlanned>
					</div>
				</div>
			</main>
		</>
	);
}
