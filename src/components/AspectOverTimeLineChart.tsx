import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, ReferenceArea, ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';
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

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
	if (active && payload?.length) {
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

	const domain = props.domain ?? [2.5, 5];

	const opacity = 0.4;

	const dataCount = filteredData ? filteredData.length - 1 : 0;

	const title = filteredData ? filteredData[0]?.aspectDefinition?.description : "Loading...";

	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full ">
			<h3 className="text-lg text-center">{title}</h3>

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
					<CartesianGrid />
					<XAxis dataKey="semester" />
					<YAxis domain={domain} hide />
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
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
