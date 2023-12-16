"use client";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  // TODO: look at cacheing in useSWR
  const { data, error, isLoading } = useSWR("/api/projects", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data && isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-black">Projects</h1>
      <div className="mt-4">
        {data.projectNames.map((projectName: string) => (
          <div key={projectName}>
            <Link href={`/project/${projectName}/latest`}>{projectName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
