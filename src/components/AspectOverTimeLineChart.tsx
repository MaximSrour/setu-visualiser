import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, ReferenceArea, ResponsiveContainer, Label } from 'recharts';
import type { RouterOutputs } from "~/utils/api";
import CustomTooltip, { refAreas } from "./CustomTooltip";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IAspectOverTimeLineChartProps {
	aspectType?: "U" | "F";
	aspect?: number;
	domain?: [number, number];
	data?: IOffering[] | null;
}

// TODO: Fix this so that it doesn't rely on the linter being bypassed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomizedAxisTick(props: { x?: number; y?: number; payload?: {value?: number} }) {
	return (
		<g transform={`translate(${props?.x ?? 0},${props?.y ?? 0})`}>
			<text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
				{props?.payload?.value ?? ""}
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

	const dataCount = filteredData?.length ?? 0;

	const title = filteredData ? filteredData[0]?.aspectDefinition?.description : "Loading...";

	const isEnoughData = dataCount >= 3;

	// const xticks = filteredData?.map((d) => `${d.year} - ${d.semester}`) ?? [];

	const height = 300;

	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full relative">
			<div className="flex items-center justify-center min-h-14 align-middle">
				<h3 className="text-lg text-center">{title}</h3>
			</div>

			{!isEnoughData && <div className={`absolute w-full h-[${height}px] flex flex-col items-center justify-center z-50`} ><p>Not enough data</p></div>}

			<ResponsiveContainer width="100%" height={height}>
				<LineChart
					width={600}
					height={height}
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
					
					{isEnoughData && <Line type="monotone" dataKey="median" stroke="#8884d8" dot={true} />}
					{/* <Line type="monotone" dataKey="mean" stroke="#d88488" dot={true} /> */}

					{refAreas.map((refArea, key) => (
						<ReferenceArea
							key={key}
							x1={0}
							x2={dataCount - 1}
							y1={refArea.min >= domain[0] ? refArea.min : domain[0]}
							y2={refArea.max <= domain[1] ? refArea.max : domain[1]}
							stroke={refArea.color}
							strokeOpacity={1.0}
							fill={refArea.color}
							opacity={opacity}
							ifOverflow="hidden"
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
