import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, TooltipProps } from 'recharts';
import type { RouterOutputs } from "~/utils/api";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IOfferingsAspectRadarChartProps {
	data?: IOffering[] | null;
	title: string;
}

const getIntroOfPage = (label: string | number) => {
	switch (label) {
		case 1:
			return "Text 1";
			break;
		case 2:
			return "Text 2";
			break;
		default:
			return "Text 3";
			break;
	}
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-slate-800 text-white rounded-md p-3">
				<p className="">{`Aspect ${label}: ${payload[0]?.value}`}</p>
				{/* <p className="">{getIntroOfPage(label)}</p> */}
			</div>
		);
	}

	return null;
};

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
			<PolarRadiusAxis domain={[0, 5]} />
			<Tooltip content={CustomTooltip} />
		</RadarChart>
	);
}
