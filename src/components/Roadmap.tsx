import { ReactNode } from "react";

import { CardTitle, CardDescription, Card } from "~/components/ui/card";
import {
	CalendarIcon,
	CheckCircledIcon,
	ClockIcon,
} from "@radix-ui/react-icons";

export interface IRoadmapCardProps {
	title: string;
	description: string;
}

export function RoadmapCompleteCard(props: IRoadmapCardProps) {
	return (
		<Card className="flex items-start gap-4 bg-green-50 p-4 dark:bg-green-950">
			<CheckCircledIcon className="h-6 w-6 text-green-600" />
			<div>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.description}</CardDescription>
			</div>
		</Card>
	);
}

export function RoadmapInProgressCard(props: IRoadmapCardProps) {
	return (
		<Card className="flex items-start gap-4 bg-yellow-50 p-4 dark:bg-yellow-900">
			<ClockIcon className="h-6 w-6 text-yellow-600" />
			<div>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.description}</CardDescription>
			</div>
		</Card>
	);
}

export function RoadmapPlannedCard(props: IRoadmapCardProps) {
	return (
		<Card className="flex items-start gap-4 bg-blue-50 p-4 dark:bg-blue-950">
			<CalendarIcon className="h-6 w-6 text-blue-600" />
			<div>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.description}</CardDescription>
			</div>
		</Card>
	);
}

export interface IRoadmapSectionProps {
	children?: ReactNode;
}

export function RoadmapComplete(props: IRoadmapSectionProps) {
	return (
		<section>
			<h2 className="text-2xl font-bold text-green-600">
				Already Delivered
			</h2>

			<div className="mt-4 grid gap-4">{props.children}</div>
		</section>
	);
}

export function RoadmapInProgress(props: IRoadmapSectionProps) {
	return (
		<section>
			<h2 className="text-2xl font-bold text-yellow-600">Coming Soon</h2>

			<div className="mt-4 grid gap-4">{props.children}</div>
		</section>
	);
}

export function RoadmapPlanned(props: IRoadmapSectionProps) {
	return (
		<section>
			<h2 className="text-2xl font-bold text-blue-600">
				Planned for Later
			</h2>

			<div className="mt-4 grid gap-4">{props.children}</div>
		</section>
	);
}

export default function Roadmap() {
	return (
		<div className="flex flex-col gap-8 p-8">
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
			</RoadmapInProgress>

			<RoadmapPlanned>
				<RoadmapPlannedCard
					title="Integration with the Handbook"
					description="Connect handbook information to the site such as chief examiners and future offerings."
				/>
			</RoadmapPlanned>
		</div>
	);
}
