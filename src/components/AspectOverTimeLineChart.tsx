import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, Legend, ComposedChart, ReferenceArea } from 'recharts';
import type { RouterOutputs } from "~/utils/api";

interface IRefArea {
	min: number;
	max: number;
	color: string;
}

const refAreas: IRefArea[] = [
	{ min: 0, max: 3, color: "red" },
	{ min: 3, max: 3.8, color: "yellow" },
	{ min: 3.8, max: 4.8, color: "green" },
	{ min: 4.8, max: 5, color: "purple" },
];

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IAspectOverTimeLineChartProps {
	aspectType?: "U" | "F";
	aspect?: number;
	domain?: [number, number];
	data?: IOffering[] | null;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-slate-800 text-white rounded-md p-3">
				<p className="">{`${payload[0]?.value}`}</p>
			</div>
		);
	}

	return null;
};

export default function AspectOverTimeLineChart(props: IAspectOverTimeLineChartProps) {
	const filteredData = props.data?.filter((d) => {
		if (props.aspectType && d.aspectType !== props.aspectType) return false;
		if (props.aspect && d.aspect !== props.aspect) return false;
		return true;
	});

	const domain = props.domain || [2.5, 5];

	const opacity = 0.4;

	const dataCount = filteredData ? filteredData.length - 1 : 0;

	const title = filteredData ? filteredData[0]?.aspectDefinition?.description : "Loading...";

	return (
		<div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
			<h3>{title}</h3>
			<ComposedChart
				width={600}
				height={300}
				data={filteredData || []}
			>
				<CartesianGrid />
				<XAxis dataKey="semester" />
				<YAxis domain={domain} />
				<Tooltip content={CustomTooltip} />
				<Legend />
				<Line type="monotone" dataKey="median" stroke="#8884d8" activeDot={{ r: 8 }} />

				{refAreas.map((refArea, key) => (
					<ReferenceArea
						key={key}
						x1={0}
						x2={dataCount}
						y1={refArea.min >= domain[0] ? refArea.min : domain[0]}
						y2={refArea.max <= domain[1] ? refArea.max : domain[1]}
						stroke={refArea.color}
						strokeOpacity={0.3}
						fill={refArea.color}
						opacity={opacity}
					/>
				))}
			</ComposedChart>
		</div>
	);
}