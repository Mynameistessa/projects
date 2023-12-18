import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ProjectPage from "../app/project/[name]/latest/page";
import axios from "axios";
import { SWRProvider } from "@/providers/swr";
import { Entry } from "@/types/projectDetails";

describe("Project Details", () => {
  const headers = ["ID", "Longitude", "Latitude", "Time of entry"];
  const exampleFeed = {
    time: "16:24:19",
    SiteName: "臺南市安南區青草國小",
    app: "AirBox",
    area: "tainan",
    date: "2023-12-18",
    gps_alt: 2,
    gps_fix: 1,
    gps_lat: 23.076875,
    gps_lon: 120.116702,
    gps_num: 9,
    name: "臺南市安南區青草國小",
    timestamp: "2023-12-18T16:24:19Z",
  };
  const feeds: Entry[] = [];
  for (let i = 0; i < 11; i++) {
    feeds.push({ ...exampleFeed, device_id: `${i}` });
  }
  // Mock the dynamic parameter ([name]) for testing purposes
  jest.mock("next/router", () => ({
    useRouter: () => ({
      query: { name: "airbox" },
    }),
  }));
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.spyOn(axios, "get").mockResolvedValue(
      Promise.resolve({
        data: {
          source: "last-all-airbox by IIS-NRL",
          c_d0_source: "AS-IISNRL",
          num_of_records: 11,
          feeds: feeds,
          descriptions: {
            URL: "url",
            c_d0_method: "method",
            c_d0: "test",
          },
          version: "1.0",
        },
      })
    );
    render(
      <SWRProvider>
        <ProjectPage params={{ name: "airbox" }} />
      </SWRProvider>
    );
    try {
      await waitForElementToBeRemoved(() => screen.getByAltText("Loading"));
      if (screen.getByAltText("Loading")) {
      }
    } catch (e) {
      // console.log("Loading element not present...");
    }
  });

  it("Renders project details heading", async () => {
    const header = screen.getByText("Project Details for airbox");
    expect(header).toBeInTheDocument();
  });
  it("Shows top ten feeds when feeds is greater than ten", async () => {
    const heading = screen.getByText("Top ten feed entries");
    expect(heading).toBeVisible();
  });
  it("Shows total number of feeds", async () => {
    expect(
      screen.getByText("Total number of feed entries:")
    ).toBeInTheDocument();
  });
  it("Displays table of feeds", async () => {
    const table = screen.getByTestId("project-table");
    expect(table).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(11);
  });
  it.each(headers)("%s: displayed in table", async (header: string) => {
    const headerName = screen.getByText(header);
    expect(headerName).toBeVisible();
  });
});
