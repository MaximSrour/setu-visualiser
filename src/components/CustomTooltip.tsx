import React from "react";
import type { TooltipProps } from "recharts";

export interface IRefArea {
	min: number;
	max: number;
	color: string;
	description: string;
}

export const refAreas: IRefArea[] = [
	{ min: 0, max: 3, color: "red", description: "Needing critical attention" },
	{ min: 3, max: 3.8, color: "yellow", description: "Needing improvement" },
	{ min: 3.8, max: 4.7, color: "green", description: "Meeting requirements" },
	{
		min: 4.7,
		max: 6,
		color: "purple",
		description: "Exceeding requirements",
	},
];

export function getRefArea(value: number): IRefArea | null {
	for (const refArea of refAreas) {
		if (refArea.min <= value && refArea.max > value) {
			return refArea;
		}
	}

	return null;
}

export default function CustomTooltip({
	active,
	payload,
}: TooltipProps<number, string>) {
	if (active && payload?.length) {
		const value = payload[0]?.value;
		const timeframe =
			(payload[0]?.payload as { timeframe: string }).timeframe ?? "";
		const refArea = getRefArea(value ?? 0);

		return (
			<div className="rounded-md bg-slate-800 p-3">
				<p className="text-white">{`${value}`}</p>
				<p className="text-white">{`${timeframe}`}</p>
				{refArea?.color == "red" && (
					<p className="text-red-700">{refArea?.description}</p>
				)}
				{refArea?.color == "yellow" && (
					<p className="text-amber-400">{refArea?.description}</p>
				)}
				{refArea?.color == "green" && (
					<p className="text-green-500">{refArea?.description}</p>
				)}
				{refArea?.color == "purple" && (
					<p className="text-indigo-700">{refArea?.description}</p>
				)}
			</div>
		);
	}

	return null;
}
