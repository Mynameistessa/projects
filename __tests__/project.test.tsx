import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../app/page";
import axios from "axios";
import { SWRProvider } from "@/providers/swr";

describe("Home", () => {
  const projectNames = ["airbox", "banana"];
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.spyOn(axios, "get").mockResolvedValue(
      Promise.resolve({
        data: {
          projectNames,
        },
      })
    );
    render(
      <SWRProvider>
        <Home />
      </SWRProvider>
    );
    try {
      if (screen.getByAltText("Loading")) {
        await waitForElementToBeRemoved(() => screen.getByAltText("Loading"));
      }
    } catch (e) {
      console.log("Loading element not present...");
    }
  });

  it("Renders project heading", async () => {
    const header = screen.getByText("Projects");
    expect(header).toBeInTheDocument();
  });

  it.each(projectNames)(
    "%s: visible in project list",
    async (projectName: string) => {
      const projectNameEl = screen.getByTestId(projectName);
      expect(projectNameEl).toBeInTheDocument();
    }
  );
});
