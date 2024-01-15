import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { RouterOutputs } from "~/utils/api";
import CustomTooltip, { refAreas, CustomizedDot } from "./CustomTooltip";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IOfferingsAspectRadarChartProps {
	data?: IOffering[] | null;
}

// const getIntroOfPage = (label: string | number) => {
// 	switch (label) {
// 		case 1:
// 			return "Text 1";
// 			break;
// 		case 2:
// 			return "Text 2";
// 			break;
// 		default:
// 			return "Text 3";
// 			break;
// 	}
// };

export default function OfferingsAspectRadarChart(props: IOfferingsAspectRadarChartProps) {
	return (
		<RadarChart
			width={300}
			height={300}
			data={props.data ?? []}
		>
			<Radar type="monotone" dataKey="median" fill="#8884d8" />
			<PolarGrid />
			<PolarAngleAxis dataKey="aspect" />
			<PolarRadiusAxis domain={[0, 5]} hide />
			<Tooltip content={<CustomTooltip />} />
		</RadarChart>
	);
}
