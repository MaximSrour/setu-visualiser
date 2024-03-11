export function Day() {
	return <div className="bg-gray:900 h-full w-full"></div>;
}

export function WeeklyCalendar() {
	return (
		<div className="flex h-full w-full flex-row">
			{[0, 1, 2, 3, 4, 5, 6].map((item, key) => (
				<Day key={key} />
			))}
		</div>
	);
}
