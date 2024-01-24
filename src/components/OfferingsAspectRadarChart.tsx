import React from "react";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
} from "recharts";
import type { RouterOutputs } from "~/utils/api";
import CustomTooltip from "./CustomTooltip";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IOfferingsAspectRadarChartProps {
	data?: IOffering[] | null;
}

export default function OfferingsAspectRadarChart(
	props: IOfferingsAspectRadarChartProps,
) {
	return (
		<RadarChart width={300} height={300} data={props.data ?? []}>
			<Radar type="monotone" dataKey="median" fill="#8884d8" />
			<PolarGrid />
			<PolarAngleAxis dataKey="aspect" />
			<PolarRadiusAxis domain={[0, 5]} hide />
			<Tooltip content={<CustomTooltip />} />
		</RadarChart>
	);
}
