"use client";
import useSWR from "swr";
import { Entry } from "@/types/projectDetails";
import Loading from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";

interface ProjectDetailsProps {
  params: { name: string };
}

const ProjectPage = ({ params }: ProjectDetailsProps) => {
  const { name } = params;

  const { data, error, isLoading } = useSWR(`/api/project/${name}/latest`);

  if (error) return <div>Failed to load</div>;
  if (!data && isLoading) return <Loading />;

  function formatTimestamp(originalDateTimeString: string) {
    return new Date(originalDateTimeString).toLocaleString();
  }

  function topTen(): React.ReactNode {
    const newArray = data.feeds.slice(0, 11);

    return newArray.map((entry: Entry) => (
      <div
        key={entry.device_id}
        className="bg-green-100 grid grid-cols-4 gap-4 rounded border-b-4 border-white p-2"
      >
        <div className="tooltip break-words" data-tip={entry.device_id}>
          {entry.device_id.length > 15
            ? entry.device_id.slice(0, 8)
            : entry.device_id}
        </div>
        <div>{entry.gps_lon ?? "null"}</div>
        <div>{entry.gps_lat ?? "null"}</div>
        <div>{formatTimestamp(entry.timestamp)}</div>
      </div>
    ));
  }

  return (
    <div className="pt-40">
      <div className="flex items-center mb-2">
        <Link href={"/"} className="mr-4 btn btn-xs btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <p className="text-2xl font-black">Project Details for {name}</p>
      </div>
      <div className="mb-2">
        <p className="font-extrabold">Total number of feed entries:</p>{" "}
        <p>{data.num_of_records}</p>
      </div>
      {data.num_of_records > 10 ? (
        <>
          <p className="font-extrabold mb-2">Top ten feed entries</p>
          <div className="grid grid-cols-4 gap-4 font-bold">
            <div>ID</div>
            <div>Longitude</div>
            <div>Latitude</div>
            <div>Time of entry</div>
          </div>
          {topTen()}
        </>
      ) : null}
    </div>
  );
};

export default ProjectPage;
