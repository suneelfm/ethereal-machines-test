export interface IStatusLog {
  status: "idle" | "active" | "loading" | "setup";
  from: string;
  to: string;
}

export interface IMachineDetails {
  machineName: string;
  mode: string;
  program: string | number;
  toolCount: number;
  partsCount: number;
  partsCompleted: number;
  partGoal: number;
  spindle: number;
  statusLogs: IStatusLog[];
}

/**
 * Details of machines with statusLogs
 * Need a API to get the details of machines with the following json/object structure.
 */
// Logs in ascending order by date, Latest log should at the last.
export const MACHINE_DETAILS: IMachineDetails[] = [
  {
    machineName: "HALO - 1",
    mode: "MEM",
    program: "09001",
    toolCount: 1,
    partsCount: 188,
    partsCompleted: 1,
    partGoal: 0,
    spindle: 1,
    statusLogs: [
      {
        status: "idle",
        from: "Wed Aug 21 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Wed Aug 21 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Wed Aug 21 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Wed Aug 21 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Wed Aug 21 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Wed Aug 21 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Wed Aug 21 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Wed Aug 21 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Wed Aug 21 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Wed Aug 21 2024 12:30:000 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Thu Aug 22 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Thu Aug 22 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Thu Aug 22 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Thu Aug 22 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Thu Aug 22 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 12:30:000 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Fri Aug 23 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Fri Aug 23 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Fri Aug 23 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Fri Aug 23 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Fri Aug 23 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 13:30:000 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Sat Aug 24 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Sat Aug 24 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Sat Aug 24 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Sat Aug 24 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Sat Aug 24 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Now",
      },
    ],
  },
  {
    machineName: "NIMBUS - 09",
    mode: "MEM",
    program: "09001",
    toolCount: 1,
    partsCount: 1205,
    partsCompleted: 2,
    partGoal: 0,
    spindle: 7999,
    statusLogs: [
      {
        status: "active",
        from: "Thu Aug 22 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Thu Aug 22 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Thu Aug 22 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Thu Aug 22 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Thu Aug 22 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Thu Aug 22 2024 15:30:000 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Fri Aug 23 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Fri Aug 23 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Fri Aug 23 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Fri Aug 23 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Fri Aug 23 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Fri Aug 23 2024 14:30:000 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Sat Aug 24 2024 01:03:00 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 05:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Sat Aug 24 2024 05:03:00 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 06:03:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Sat Aug 24 2024 06:03:00 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 06:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "idle",
        from: "Sat Aug 24 2024 06:30:000 GMT+0530 (India Standard Time)",
        to: "Sat Aug 24 2024 09:30:00 GMT+0530 (India Standard Time)",
      },
      {
        status: "active",
        from: "Sat Aug 24 2024 09:30:000 GMT+0530 (India Standard Time)",
        to: "Now",
      },
    ],
  },
];
