import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, ReferenceArea, ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { RouterOutputs } from "~/utils/api";
import CustomTooltip, { refAreas, CustomizedDot } from "./CustomTooltip";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IAspectOverTimeLineChartProps {
	aspectType?: "U" | "F";
	aspect?: number;
	domain?: [number, number];
	data?: IOffering[] | null;
}

function CustomizedAxisTick(props: any) {
	const { x, y, stroke, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
				{payload.value}
			</text>
		</g>
	)
}

export default function AspectOverTimeLineChart(props: IAspectOverTimeLineChartProps) {
	const filteredData = props.data?.filter((d) => {
		if (props.aspectType && d.aspectType !== props.aspectType) return false;
		if (props.aspect && d.aspect !== props.aspect) return false;
		return true;
	});

	const domain = props.domain ?? [2.5, 5];

	const opacity = 0.4;

	const dataCount = filteredData ? filteredData.length - 1 : 0;

	const title = filteredData ? filteredData[0]?.aspectDefinition?.description : "Loading...";

	// const xticks = filteredData?.map((d) => `${d.year} - ${d.semester}`) ?? [];

	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full ">
			<div className="flex items-center justify-center min-h-14 align-middle">
				<h3 className="text-lg text-center">{title}</h3>
			</div>

			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					width={600}
					height={300}
					data={filteredData ?? []}
					margin={{
						top: 5,
						right: 5,
						left: 5,
						bottom: 5,
					}}
				>
					<CartesianGrid horizontal={false} strokeDasharray="1 4" />
					<XAxis dataKey="semester" tick={<CustomizedAxisTick />} />
					<YAxis domain={domain} hide />
					<Tooltip content={<CustomTooltip />} />
					<Legend />
					<Line type="monotone" dataKey="median" stroke="#8884d8" dot={true} />

					{refAreas.map((refArea, key) => (
						<ReferenceArea
							key={key}
							x1={0}
							x2={dataCount}
							y1={refArea.min >= domain[0] ? refArea.min : domain[0]}
							y2={refArea.max <= domain[1] ? refArea.max : domain[1]}
							stroke={refArea.color}
							strokeOpacity={1.0}
							fill={refArea.color}
							opacity={opacity}
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
