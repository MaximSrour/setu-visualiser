import React from "react";
import {
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LineChart,
	ReferenceArea,
	ResponsiveContainer,
} from "recharts";
import type { RouterOutputs } from "~/utils/api";
import CustomTooltip, { refAreas } from "./CustomTooltip";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IAspectOverTimeLineChartProps {
	aspectType?: "U" | "F";
	aspect?: number;
	domain?: [number, number];
	data?: IOffering[] | null;
	selectedCampusMode?: string[];
}

// TODO: Fix this so that it doesn't rely on the linter being bypassed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomizedAxisTick(props: {
	x?: number;
	y?: number;
	payload?: { value?: number };
}) {
	return (
		<g transform={`translate(${props?.x ?? 0},${props?.y ?? 0})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="end"
				fill="#666"
				transform="rotate(-20)"
			>
				{props?.payload?.value ?? ""}
			</text>
		</g>
	);
}

export default function AspectOverTimeLineChart(
	props: IAspectOverTimeLineChartProps,
) {
	const lineColorPalette = [
		"#8884d8",
		"#82ca9d",
		"#d88488",
		"#d8ca88",
		"#d888ca",
		"#88d8ca",
		"#88cad8",
		"#d8d888",
	];

	const filteredData = props.data?.filter((d) => {
		if (props.aspectType && d.aspectType !== props.aspectType) return false;
		if (props.aspect && d.aspect !== props.aspect) return false;
		return true;
	});

	const longData = filteredData
		?.map((d) => ({
			...d,
			timeframe: `${d.year}-${d.semester}`,
			uniqueType: `${d.campus}_${d.mode}`,
		}))
		.reduce(
			(acc: Record<string, IOffering[]>, cur: IOffering) => {
				const key = `${cur.year}-${cur.semester}`;
				if (!acc[key]) {
					acc[key] = [];
				}

				acc[key]?.push(cur);

				return acc;
			},
			{} as Record<string, IOffering[]>,
		);

	if (!longData) {
		return null;
	}

	const wideData = [];
	for (const key in longData) {
		const offeringType = longData[key]?.map((o) => `${o.campus}_${o.mode}`);
		const medians = longData[key]?.map((o) => o.median ?? 0);

		const offerings = longData[key];
		if (!offerings || !offeringType || !medians) {
			continue;
		}

		type DynamicObject<Keys extends string[]> = {
			timeframe: string;
		} & {
			[K in Keys[number]]: number;
		};

		function createObject<Keys extends string[], Values extends number[]>(
			timeframe: string,
			keys: Keys,
			values: Values,
		): DynamicObject<Keys> {
			const result: DynamicObject<Keys> = {
				timeframe,
			} as DynamicObject<Keys>;

			for (let i = 0; i < keys.length; i++) {
				const key = keys[i];
				const value = values[i];

				if (!key || !value) {
					continue;
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				result[key] = value;
			}

			return result as DynamicObject<Keys>;
		}

		const obj1 = createObject(key, offeringType, medians);

		wideData.push(obj1);
	}

	const uniqueTypes = new Set<string>();
	for (const key in longData) {
		const offerings = longData[key];
		if (!offerings) {
			continue;
		}

		for (const offering of offerings) {
			uniqueTypes.add(`${offering.campus}_${offering.mode}`);
		}
	}

	const domain = props.domain ?? [2.5, 5];

	const opacity = 0.4;

	const title = filteredData
		? filteredData[0]?.aspectDefinition?.description
		: "Loading...";

	//const dataCount = longData?.length ?? 0;
	//const isEnoughData = dataCount >= 3 ?? true;
	const isEnoughData = true;

	const height = 300;

	// const xticks = filteredData?.map((d) => `${d.year} - ${d.semester}`) ?? [];

	return (
		<div className="relative flex w-full flex-col items-center justify-center gap-2">
			<div className="flex min-h-14 items-center justify-center align-middle">
				<h3 className="text-center text-lg">{title}</h3>
			</div>

			{!isEnoughData && (
				<div
					className={`absolute w-full h-[${height}px] z-50 flex flex-col items-center justify-center`}
				>
					<p>Not enough data</p>
				</div>
			)}

			<ResponsiveContainer width="100%" height={height}>
				<LineChart
					width={600}
					height={height}
					data={wideData ?? []}
					margin={{
						top: 5,
						right: 5,
						left: 5,
						bottom: 5,
					}}
				>
					<CartesianGrid horizontal={false} strokeDasharray="1 4" />
					<XAxis dataKey="timeframe" tick={<CustomizedAxisTick />} />
					<YAxis domain={domain} hide />
					<Tooltip content={<CustomTooltip />} />
					<Legend />

					{isEnoughData &&
						Array.from(uniqueTypes).map((value, index) => {
							if (!props.selectedCampusMode) {
								return null;
							}

							if (
								props.selectedCampusMode.length > 0 &&
								!props.selectedCampusMode.includes(value)
							) {
								return null;
							}

							return (
								<Line
									key={value}
									type="monotone"
									dataKey={value}
									stroke={lineColorPalette[index] ?? "ff0000"}
									dot={true}
									connectNulls
								/>
							);
						})}

					{/* <Line type="monotone" dataKey="mean" stroke="#d88488" dot={true} /> */}

					{refAreas.map((refArea, key) => (
						<ReferenceArea
							key={key}
							y1={refArea.min}
							y2={refArea.max}
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
