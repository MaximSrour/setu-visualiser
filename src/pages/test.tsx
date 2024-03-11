import CustomHead from "~/components/CustomHead";
import Header from "~/components/Header";

import { WeeklyCalendar } from "~/components/ui/weekly-calendar";

export default function Home() {

	return (
		<>
			<CustomHead subtitle="Test" />

			<Header />

			<main className="flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="text-center text-3xl">Test</h1>


					<WeeklyCalendar />
				</div>
			</main>
		</>
	);
}
