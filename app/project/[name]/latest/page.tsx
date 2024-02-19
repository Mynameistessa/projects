"use client";
import useSWR from "swr";
import { Entry } from "@/types/projectDetails";
import Loading from "@/components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HALF_DAY } from "@/constants/time";

interface ProjectDetailsProps {
  params: { name: string };
}

const ProjectPage = ({ params }: ProjectDetailsProps) => {
  const { name } = params;
  const [entries, setEntries] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading } = useSWR(
    `/api/project/${name}/latest`,
    null,
    {
      refreshInterval: HALF_DAY,
    }
  );

  useEffect(() => {
    const intialEntries = (data?.feeds || []).slice(0, 10);
    setEntries(intialEntries);
  }, [data?.feeds]);

  if (error) return <div>Failed to load</div>;
  if (!data && isLoading) return <Loading />;

  function formatTimestamp(originalDateTimeString: string) {
    return new Date(originalDateTimeString).toLocaleString();
  }

  // let pageSize = 10;
  function getNextPage() {
    const startIndex = pageSize + 10;
    setPageSize(startIndex);
    setEntries(() => data.feeds.slice(startIndex, startIndex + 10));
  }

  function showEntries(): React.ReactNode {
    const newArray = data.feeds.slice(0, pageSize);

    return entries.map((entry: Entry) => (
      <tr key={entry.device_id}>
        <td className="tooltip break-words" data-tip={entry.device_id}>
          {entry.device_id.length > 15
            ? entry.device_id.slice(0, 8)
            : entry.device_id}
        </td>
        <td>{entry.gps_lon ?? "null"}</td>
        <td>{entry.gps_lat ?? "null"}</td>
        <td>{formatTimestamp(entry.timestamp)}</td>
      </tr>
    ));
  }

  return (
    <div className="pt-40">
      <div className="flex items-center mb-2">
        <Link href={"/"} className="mr-4 btn btn-xs btn-primary">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 role="heading" className="text-2xl font-black">
          Project Details for {name}
        </h1>
      </div>
      <div className="mb-2 flex">
        <p className="font-extrabold mr-2">Total number of feed entries:</p>{" "}
        <p>{data.num_of_records}</p>
      </div>
      {data.num_of_records > 10 ? (
        <>
          <p className="font-extrabold mb-2">Top ten feed entries</p>
          <table
            data-testid="project-table"
            className="w-full table-auto text-center border-separate border-spacing-2 border border-blue-300"
          >
            <thead className="bg-blue-300">
              <tr data-testid="table-row-headers">
                <th>ID</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Time of entry</th>
              </tr>
            </thead>
            <tbody>{showEntries()}</tbody>
          </table>
          <div className="flex">
            <button>Previous</button>
            <button className="ml-auto" onClick={() => getNextPage()}>
              Next
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProjectPage;
