import Head from "next/head";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';


import Example from "~/components/Example";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.aspects.getFirst.useQuery();

  const uniAspects = api.aspects.getOffering.useQuery({
    unit: "FIT1045",
    year: 2023,
    semester: "S1",
    campus: "CL",
    aspectType: "U"
  });

  const facultyAspects = api.aspects.getOffering.useQuery({
    unit: "FIT1045",
    year: 2023,
    semester: "S1",
    campus: "CL",
    aspectType: "F"
  });

  const aspectOverTime = api.aspects.getAspectOverTime.useQuery({
    unit: "FIT1045",
    campus: "CL",
    aspectType: "U",
    aspect: 8,
  });

  const RadarUniAspects = (
    <RadarChart width={300} height={300} data={uniAspects.data ? uniAspects.data : []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Radar type="monotone" dataKey="median" fill="#8884d8" />
      <PolarGrid />
      <PolarAngleAxis dataKey="aspect" />
      <PolarRadiusAxis domain={[0, 5]} />
      <Tooltip />
    </RadarChart>
  );
  
  const RadarFacultyAspects = (
    <RadarChart width={300} height={300} data={facultyAspects.data ? facultyAspects.data : []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Radar type="monotone" dataKey="median" fill="#8884d8" />
      <PolarGrid />
      <PolarAngleAxis dataKey="aspect" />
      <PolarRadiusAxis domain={[0, 5]} />
      <Tooltip />
    </RadarChart>
  );

  const AspectOverTime = (
    <LineChart
      width={600}
      height={300}
      data={aspectOverTime.data ? aspectOverTime.data : []}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="semester" />
      <YAxis domain={[0, 5]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="median" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  )

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>

          <p className="text-2xl text-white">
            {hello.data ? hello.data.unit : "Loading tRPC query..."}
          </p>

          <div className="flex">
            {RadarUniAspects}
            {RadarFacultyAspects}
          </div>

          {AspectOverTime}

          <Example />
        </div>
      </main>
    </>
  );
}
