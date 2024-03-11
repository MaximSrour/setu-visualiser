import type { ReactNode } from "react";
import * as React from "react";

import { CardTitle, CardDescription, Card } from "~/components/ui/card";
import {
	CalendarIcon,
	CheckCircledIcon,
	ClockIcon,
} from "@radix-ui/react-icons";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils";

const roadmapVariants = cva("flex items-start gap-4 p-4", {
	variants: {
		variant: {
			complete: "bg-green-50 dark:bg-green-950",
			"in-progress": "bg-yellow-50 dark:bg-yellow-900",
			planned: "bg-blue-50 dark:bg-blue-950",
		},
	},
	defaultVariants: {
		variant: "planned",
	},
});

export interface IRoadmapCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof roadmapVariants> {
	title: string;
	description: string;
}

const RoadmapCard = React.forwardRef<HTMLDivElement, IRoadmapCardProps>(
	({ variant, ...props }, ref) => {
		const icon = {
			complete: (
				<CheckCircledIcon className="h-full w-6 text-green-600" />
			),
			"in-progress": <ClockIcon className="h-full w-6 text-yellow-600" />,
			planned: <CalendarIcon className="h-full w-6 text-blue-600" />,
		};

		return (
			<Card className={cn(roadmapVariants({ variant }))} ref={ref}>
				{icon[variant ?? "planned"]}
				<div>
					<CardTitle>{props.title}</CardTitle>
					<CardDescription>{props.description}</CardDescription>
				</div>
			</Card>
		);
	},
);
RoadmapCard.displayName = "RoadmapCard";

export { RoadmapCard, roadmapVariants };

export interface IRoadmapSectionProps {
	variant?: "complete" | "in-progress" | "planned";
	children?: ReactNode;
}

export function RoadmapComplete(props: IRoadmapSectionProps) {
	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold text-green-600">
				Already Delivered
			</h2>

			<div className="mt-4 grid gap-4">
				{React.Children.map(props.children, (child) =>
					React.isValidElement(child)
						? React.cloneElement(
								child as React.ReactElement<IRoadmapCardProps>,
								{ variant: "complete" },
							)
						: child,
				)}
			</div>
		</section>
	);
}

export function RoadmapInProgress(props: IRoadmapSectionProps) {
	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold text-yellow-600">In Progress</h2>

			<div className="mt-4 grid gap-4">
				{React.Children.map(props.children, (child) =>
					React.isValidElement(child)
						? React.cloneElement(
								child as React.ReactElement<IRoadmapCardProps>,
								{ variant: "in-progress" },
							)
						: child,
				)}
			</div>
		</section>
	);
}

export function RoadmapPlanned(props: IRoadmapSectionProps) {
	return (
		<section className="w-full">
			<h2 className="text-2xl font-bold text-blue-600">
				Planned for Later
			</h2>

			<div className="mt-4 grid gap-4">
				{React.Children.map(props.children, (child) =>
					React.isValidElement(child)
						? React.cloneElement(
								child as React.ReactElement<IRoadmapCardProps>,
								{ variant: "planned" },
							)
						: child,
				)}
			</div>
		</section>
	);
}
