"use client";
import Loading from "@/components/loading";
import { HALF_DAY } from "@/constants/time";
import { Entry } from "@/types/projectDetails";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface HistoryPageProps {
  params: { name: string };
}

const HistoryPage = ({ params }: HistoryPageProps) => {
  const { name } = params;
  const { data, error, isLoading } = useSWR(
    `/api/project/${name}/latest`,
    null,
    {
      refreshInterval: HALF_DAY,
    }
  );
  const [entries, setEntries] = useState<Entry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const initialEntries = data ? data.feeds.slice(0, 10) : [];
    setEntries(initialEntries);
  }, [data]);

  if (error) return <div>Failed to load</div>;
  if (!data && isLoading) return <Loading />;

  const entriesSortedByTime = entries.sort((a: Entry, b: Entry) => {
    return a.time.localeCompare(b.time);
  });

  let counter = 10;
  function appendMoreFeeds() {
    const newCounter = counter + 10;
    if (newCounter <= data.feeds.length) {
      const newSet = data.feeds.slice(counter, newCounter);
      setEntries((prevEntries: Entry[]) => [...prevEntries, ...newSet]);
      counter = newCounter;
    } else {
      setErrorMessage("No more data to display");
    }
  }

  return (
    <div className="pt-40">
      <div>History to scroll through</div>
      <table
        data-testid="project-table"
        className="w-full table-auto text-center border-separate border-spacing-2  "
      >
        <thead className="bg-blue-300">
          <tr data-testid="table-row-headers">
            <th>ID</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Time of entry</th>
          </tr>
        </thead>
        <tbody>
          {entriesSortedByTime.map((entry: Entry) => {
            return (
              <tr key={`${entry.time}-${entry.device_id}`}>
                <td>
                  {entry.device_id.length > 15
                    ? entry.device_id.slice(0, 8)
                    : entry.device_id}
                </td>
                <td>{entry.gps_lon ?? "null"}</td>
                <td>{entry.gps_lat ?? "null"}</td>
                <td>{entry.timestamp}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full justify-center flex">
        <button className="btn btn-wide" onClick={() => appendMoreFeeds()}>
          Load more results
        </button>
      </div>
    </div>
  );
};

export default HistoryPage;
