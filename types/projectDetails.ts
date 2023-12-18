export type Entry = {
  time: string;
  SiteName: string;
  app: string;
  area: string;
  date: string;
  gps_alt: number;
  gps_fix: number;
  gps_lat?: number;
  gps_lon?: number;
  gps_num: number;
  name: string;
  timestamp: string;
  device_id: string;
};

export type ProjectsList = {
  projectNames: string[];
};

export type ProjectDetails = {
  source: string;
  c_d0_source: string;
  num_of_records: number;
  feeds: Entry[];
  descriptions: {
    URL: string;
    c_d0_method: string;
    c_d0: string;
  };
  version: string;
};
