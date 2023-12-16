"use client";
import useSWR from "swr";
import { Entry } from "@/types/projectDetails";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface ProjectDetailsProps {
  params: { name: string };
}

const ProjectPage = ({
  params,
}: {
  params: {
    name: string;
  };
}) => {
  const { name } = params;

  const { data, error, isLoading } = useSWR(
    `/api/project/${name}/latest`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data && isLoading) return <div>Loading...</div>;

  function topTen(): React.ReactNode {
    const newArray = data.feeds.slice(0, 11);

    return newArray.map((entry: Entry) => (
      <div key={entry.device_id}>
        <p>ID: {entry.device_id}</p>
        <p>Longitude: {entry.gps_lon}</p>
        <p>Latitude: {entry.gps_lat}</p>
        <p>Time of Entry: {entry.timestamp}</p>
      </div>
    ));
  }

  return (
    <div>
      <p className="text-2xl font-black">Project Details for {name}</p>
      <div>
        <p className="font-extrabold">Total number of feed entries:</p>{" "}
        <p>{data.num_of_records}</p>
      </div>
      {data.num_of_records > 10 ? (
        <>
          <p className="font-extrabold">Top ten feed entries:</p>
          <div>{topTen()}</div>
        </>
      ) : null}
    </div>
  );
};

export default ProjectPage;
