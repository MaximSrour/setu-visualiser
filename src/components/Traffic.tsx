import React from "react";
import type { RouterOutputs } from "~/utils/api";

type IOffering = RouterOutputs["aspects"]["getOffering"][number];
interface IOfferingsAspectRadarChartProps {
	dataCurr?: IOffering[] | null;
	dataPrev?: IOffering[] | null;
}

export default function Traffic(props: IOfferingsAspectRadarChartProps) {
	if (!props.dataCurr) {
		return null;
	}
	if (!props.dataPrev) {
		return null;
	}
	if (props.dataCurr.length != props.dataPrev.length) return null;

	// for each aspect in the dataCurr, match it with the same aspect in dataPrev
	// and then calculate the difference between the two
	// then return a new array with the difference
	const dataDiff = props.dataCurr
		.map((curr, index) => {
			const prev = props.dataPrev?.[index];

			if (!curr) return null;
			if (!prev) return null;

			if (!curr.median || !prev.median) return 0;

			return {
				aspect: curr.aspect,
				median: (curr.median - prev.median).toFixed(2),
			};
		})
		.filter((d) => d !== null) as unknown as {
		aspect: number;
		median: number;
	}[];

	return (
		<div className="flex flex-col">
			{dataDiff.map((d, key) => (
				<p key={key}>{d.median}</p>
			))}
		</div>
	);
}
