import Head from "next/head";

export default function CustomHead() {
	return (
		<Head>
			<title>SETU Visualiser</title>
			{/* <title>{`SETU Visualiser - ${props.subtitle}`}</title> */}
			<meta
				name="description"
				content="Visualiser for Monash SETU data"
			/>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
}
