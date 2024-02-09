import { useRouter } from "next/router";

import AspectOverTimeLineChart from "~/components/AspectOverTimeLineChart";

import { api } from "~/utils/api";

import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";

export default function Home() {
	const router = useRouter();

	const selectedUnit = router.query.unit ? (router.query.unit as string) : "";

	const isQueryValid = selectedUnit != "";
	const htmlTitleText = isQueryValid ? `${selectedUnit}` : "Loading";

	const aspectOverTime = api.aspects.getAspectsOverTime.useQuery({
		unit: selectedUnit,
	});

	const uniqueTypes = new Set<string>();
	for (const offering of aspectOverTime.data ?? []) {
		uniqueTypes.add(`${offering.campus}_${offering.mode}`);
	}

	const selectedTypes = Array.from(uniqueTypes).filter((type) =>
		router.query.select?.includes(type),
	);

	const handleClick = (type: string, checked: boolean) => {
		async function fetchData() {
			await router.replace({
				pathname: router.pathname,
				query: {
					...router.query,
					select: checked
						? selectedTypes.filter((t) => t !== type)
						: [...selectedTypes, type],
				},
			});
		}

		void fetchData();
	};

	return (
		<>
			<CustomHead subtitle={htmlTitleText} />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">
						{selectedUnit} results
					</h1>

					<div className="flex flex-col gap-2">
						{Array.from(uniqueTypes).map((type, key) => {
							const checked =
								router.query.select?.includes(type) ?? false;

							return (
								<div
									key={key}
									className="flex flex-row items-center gap-2 align-middle"
								>
									<Switch
										id={type}
										checked={checked}
										onClick={() =>
											handleClick(type, checked)
										}
									/>
									<Label htmlFor={type}>{type}</Label>
								</div>
							);
						})}
					</div>

					<div className="flex w-full flex-col items-center justify-center gap-8">
						<h2 className="text-center text-2xl">
							University-wide Aspects
						</h2>

						<div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
							{[1, 2, 3, 4, 5, 6, 7, 8].map((aspect, key) => (
								<AspectOverTimeLineChart
									key={key}
									aspectType="U"
									aspect={aspect}
									data={aspectOverTime.data}
									selectedCampusMode={selectedTypes}
								/>
							))}
						</div>
					</div>

					<div className="flex w-full flex-col items-center justify-center gap-8">
						<h2 className="text-center text-2xl">
							Faculty-wide Aspects
						</h2>

						<div className="grid w-full grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2">
							{[1, 2, 3, 4, 5].map((aspect, key) => (
								<AspectOverTimeLineChart
									key={key}
									aspectType="F"
									aspect={aspect}
									data={aspectOverTime.data}
									selectedCampusMode={selectedTypes}
								/>
							))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
