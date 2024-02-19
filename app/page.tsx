"use client";
import Loading from "@/components/loading";
import { ONE_DAY } from "@/constants/time";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/projects", null, {
    refreshInterval: ONE_DAY,
  });

  if (error) return <div>Failed to load</div>;
  if (!data && isLoading) return <Loading />;

  return (
    <div className="pt-32 ml-8">
      <h1 role="heading" className="text-4xl font-black">
        Projects - For the LASS (Location Aware Sensing System) PM2.5 project.
      </h1>
      <p>
        This data is gathered by the public to help monitor PM2.5, which are
        fine particulate matter with a diameter of less than 2.5 micrometers
        found in the air.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.projectNames.map((projectName: string) => (
          <Link
            href={`/project/${projectName}/latest`}
            key={projectName}
            data-testid={projectName}
            className="btn btn-primary"
          >
            {projectName}
          </Link>
        ))}
      </div>
    </div>
  );
}
