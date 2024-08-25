"use client";

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  HelpOutlineRounded,
  Search,
} from "@mui/icons-material";
import { Box, Card, Grid, LinearProgress, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/page.module.css";
import { Chart, ChartItem } from "chart.js/auto";
import MachineDetailChip from "./MachineDetailChip";
import MachineTimingCard from "./MachineTimingCard";
import TimeTick from "./TimeTick";
import { ALARMS } from "@/data/alarms";
import { IStatusLog, MACHINE_DETAILS } from "@/data/machineDetails";

export default function HomePage() {
  const [totalActiveTime, setTotalActiveTime] = useState(0);
  const [totalLoadingTime, setTotalLoadingTime] = useState(0);
  const [totalSetupTime, setTotalSetupTime] = useState(0);
  const [totalStalledTime, setTotalStalledTime] = useState(0);
  const [totalMachineTime, setTotalMachineTime] = useState(0);

  // Taking now as static as using mock data and don't have live data
  // Make it dynamic with new Date()
  const now = "Sat Aug 24 2024 14:30:000 GMT+0530 (India Standard Time)";

  const statusColor = {
    active: "#4a7955",
    loading: "#44935c",
    setup: "#cfc54c",
    idle: "#964244",
  };

  const getDateWithTime = (date: string): string => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const hour = d.getHours().toString().padStart(2, "0");
    const min = d.getMinutes().toString().padStart(2, "0");
    return `${month}/${day} ${hour}:${min}`;
  };

  const getStatusDetails = (status: IStatusLog) => {
    // const today = new Date();
    // Taking day start as static as using mock data because don't have live data
    // For live data we can make it dynamic with today
    const dayStart = "Sat Aug 24 2024 00:00:00 GMT+0530 (India Standard Time)";
    const difInMs: number =
      (new Date(status.from) as any) - (new Date(dayStart) as any);
    const difInMin = difInMs / (1000 * 60);
    const fromToDiffInMs =
      ((!status.to || status.to.toLowerCase() === "now"
        ? new Date(now)
        : new Date(status.to)) as any) - (new Date(status.from) as any);
    const width = fromToDiffInMs / (1000 * 60);

    return { color: statusColor[status.status], position: difInMin, width };
  };

  const getMachineTimeAndStatus = (statusLogs: IStatusLog[], date: string) => {
    let activeMin = 0;
    let stallMin = 0;
    let loadingMin = 0;
    let setupMin = 0;
    const statusLogsForDate = statusLogs.filter((detail) => {
      const reqDate = new Date(date);
      const statusDate = new Date(detail.from);
      return (
        reqDate.getDate() === statusDate.getDate() &&
        reqDate.getMonth() === statusDate.getMonth() &&
        reqDate.getFullYear() === statusDate.getFullYear()
      );
    });

    statusLogsForDate.forEach((log) => {
      const fromToDiffInMs =
        ((!log.to || log.to.toLowerCase() === "now"
          ? new Date(now)
          : new Date(log.to)) as any) - (new Date(log.from) as any);
      const fromToDiffInMin = fromToDiffInMs / (1000 * 60);
      switch (log.status) {
        case "idle":
          stallMin += fromToDiffInMin;
          break;
        case "active":
          activeMin += fromToDiffInMin;
          break;
        case "loading":
          loadingMin += fromToDiffInMin;
          break;
        case "setup":
          setupMin += fromToDiffInMin;
          break;

        default:
          break;
      }
    });

    return {
      status: statusLogs[statusLogs.length - 1].status,
      activeMin,
      loadingMin,
      setupMin,
      stallMin,
    };
  };

  const convertMinToHoursFormat = (min: number) => {
    const hr = Math.floor(min / 60);
    const remainingMin = min - hr * 60;
    return `${hr > 0 ? hr + "h " : ""}${
      remainingMin > 0 || hr <= 0 ? remainingMin + "m" : ""
    }`;
  };

  const getTotalStatusTimingByDate = (date: string) => {
    let totalActiveMin = 0;
    let totalLoadingMin = 0;
    let totalSetupMin = 0;
    let totalStalledMin = 0;
    MACHINE_DETAILS.forEach((detail) => {
      const { activeMin, loadingMin, setupMin, stallMin } =
        getMachineTimeAndStatus(detail.statusLogs, date);
      totalActiveMin += activeMin;
      totalLoadingMin += loadingMin;
      totalSetupMin += setupMin;
      totalStalledMin += stallMin;
    });
    return {
      totalActiveMin,
      totalLoadingMin,
      totalSetupMin,
      totalStalledMin,
      totalMachineMin:
        totalActiveMin + totalLoadingMin + totalSetupMin + totalStalledMin,
    };
  };

  useEffect(() => {
    const productivityChart = new Chart(
      document.getElementById("productivity") as ChartItem,
      {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [
                Math.round((totalActiveTime * 100) / totalMachineTime),
                Math.round((totalLoadingTime * 100) / totalMachineTime),
                Math.round((totalSetupTime * 100) / totalMachineTime),
                Math.round((totalStalledTime * 100) / totalMachineTime),
              ],
              backgroundColor: ["#4a7955", "#44935c", "#cfc54c", "#964244"],
              borderColor: "transparent",
              spacing: 3,
            },
          ],
        },
        options: { plugins: { tooltip: { enabled: false } } },
      }
    );
    // Taking to as now as using mock data and don't have live data
    const today = new Date(now); // new Date();
    const oneDayAgo = new Date(now); //new Date();
    oneDayAgo.setDate(today.getDate() - 1);
    const twoDayAgo = new Date(now); // new Date();
    twoDayAgo.setDate(today.getDate() - 2);
    const threeDayAgo = new Date(now); // new Date();
    threeDayAgo.setDate(today.getDate() - 3);
    const labels = [
      `${threeDayAgo}`,
      `${twoDayAgo}`,
      `${oneDayAgo}`,
      `${today}`,
    ];

    const lineChart = new Chart(
      document.getElementById("lineChart") as ChartItem,
      {
        type: "line",
        data: {
          labels: labels.map((label) => {
            const date = new Date(label);
            return `${date.getMonth().toString().padStart(2, "0")}/${date
              .getDate()
              .toString()
              .padStart(2, "0")}`;
          }),
          datasets: [
            {
              data: labels.map((label) => {
                const { totalActiveMin, totalMachineMin } =
                  getTotalStatusTimingByDate(label);
                return (totalActiveMin * 100) / totalMachineMin;
              }),
              borderColor: "#4a7955",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false },
          },
          scales: {
            y: {
              ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                  return value + "%";
                },
              },
              min: 0,
              max: 100,
            },
          },
        },
      }
    );

    return () => {
      productivityChart.destroy();
      lineChart.destroy();
    };
  }, [
    totalActiveTime,
    totalLoadingTime,
    totalSetupTime,
    totalStalledTime,
    totalMachineTime,
  ]);

  useEffect(() => {
    const {
      totalActiveMin,
      totalLoadingMin,
      totalSetupMin,
      totalStalledMin,
      totalMachineMin,
    } = getTotalStatusTimingByDate(now);
    setTotalActiveTime(totalActiveMin);
    setTotalLoadingTime(totalLoadingMin);
    setTotalSetupTime(totalSetupMin);
    setTotalStalledTime(totalStalledMin);
    setTotalMachineTime(totalMachineMin);
  }, [MACHINE_DETAILS]);

  const NUMERICS = [
    {
      label: "Active",
      value: `${Math.round((totalActiveTime * 100) / totalMachineTime)}%`,
      improvement: (): {
        value: string;
        isImproved: boolean;
        isArrowUp: boolean;
      } => {
        const date1 = new Date(now);
        date1.setDate(date1.getDate() - 1);
        const timing1 = getTotalStatusTimingByDate(date1.toString());
        const timing2 = getTotalStatusTimingByDate(now);

        const value = Math.round(
          (timing1.totalActiveMin * 100) / timing1.totalMachineMin -
            (timing2.totalActiveMin * 100) / timing2.totalMachineMin
        );
        return {
          value: Math.abs(value) + "%",
          isImproved: value > 0,
          isArrowUp: value > 0,
        };
      },
    },
    {
      label: "Setup",
      value: `${Math.round((totalSetupTime * 100) / totalMachineTime)}%`,
    },
    {
      label: "Stall",
      value: `${Math.round((totalStalledTime * 100) / totalMachineTime)}%`,
      improvement: (): {
        value: string;
        isImproved: boolean;
        isArrowUp: boolean;
      } => {
        const date1 = new Date(now);
        date1.setDate(date1.getDate() - 1);
        const timing1 = getTotalStatusTimingByDate(date1.toString());
        const timing2 = getTotalStatusTimingByDate(now);

        const value = Math.round(
          (timing1.totalStalledMin * 100) / timing1.totalMachineMin -
            (timing2.totalStalledMin * 100) / timing2.totalMachineMin
        );
        return {
          value: Math.abs(value) + "%",
          isImproved: value < 0,
          isArrowUp: value > 0,
        };
      },
    },
    {
      label: "Machine Hours",
      value: convertMinToHoursFormat(totalMachineTime),
      improvement: (): {
        value: string;
        isImproved: boolean;
        isArrowUp: boolean;
      } => {
        const date1 = new Date(now);
        date1.setDate(date1.getDate() - 1);
        const timing1 = getTotalStatusTimingByDate(date1.toString());
        const timing2 = getTotalStatusTimingByDate(now);

        const value = timing1.totalMachineMin - timing2.totalMachineMin;

        return {
          value: convertMinToHoursFormat(Math.abs(value)),
          isImproved: value > 0,
          isArrowUp: value > 0,
        };
      },
    },
    {
      label: "Time Stalled",
      value: totalStalledTime + "min",
      improvement: (): {
        value: string;
        isImproved: boolean;
        isArrowUp: boolean;
      } => {
        const date1 = new Date(now);
        date1.setDate(date1.getDate() - 1);
        const timing1 = getTotalStatusTimingByDate(date1.toString());
        const timing2 = getTotalStatusTimingByDate(now);

        const value = timing1.totalStalledMin - timing2.totalStalledMin;

        return {
          value: Math.abs(value) + "min",
          isImproved: value < 0,
          isArrowUp: value > 0,
        };
      },
    },
    {
      label: "Parts Made",
      value: MACHINE_DETAILS.map((detail) => detail.partsCompleted).reduce(
        (total, count) => total + count
      ),
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        {NUMERICS.map(({ label, value, improvement }, i) => (
          <Grid key={i} item xs={12} md={4} lg={2}>
            <Card className={styles.card}>
              <Grid container justifyContent={"flex-end"}>
                <HelpOutlineRounded className={styles.helpIcon} />
              </Grid>
              <Typography variant="h4" pl={1} className={styles.content}>
                {value}
              </Typography>
              <Grid container pl={1} alignItems={"center"}>
                <span className={styles.label}>{label}</span>
                {improvement && (
                  <span
                    className={styles.improvement}
                    style={{
                      color: improvement().isImproved ? "#4a7955" : "#964244",
                    }}
                  >
                    {improvement().isArrowUp ? (
                      <ArrowDropUpOutlined sx={{ fontSize: "15px" }} />
                    ) : (
                      <ArrowDropDownOutlined sx={{ fontSize: "15px" }} />
                    )}
                    {improvement().value}
                  </span>
                )}
              </Grid>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} lg={4}>
          <Card className={styles.card}>
            <Grid className={`${styles.cardTitle} ${styles.content}`}>
              Productivity
            </Grid>
            <Grid
              container
              paddingLeft={"100px"}
              position={"relative"}
              alignItems={"center"}
              my={2}
            >
              <Grid className={styles.productivityChartWrapper}>
                <canvas
                  id="productivity"
                  className={styles.productivityChart}
                ></canvas>
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard
                  status="Active"
                  time={convertMinToHoursFormat(totalActiveTime)}
                />
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard
                  status="Loading"
                  time={convertMinToHoursFormat(totalLoadingTime)}
                />
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard
                  status="Setup"
                  time={convertMinToHoursFormat(totalSetupTime)}
                />
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard
                  status="Stalled"
                  time={convertMinToHoursFormat(totalStalledTime)}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className={styles.card}>
            <canvas id="lineChart" className={styles.lineChart}></canvas>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className={styles.card}>
            <Grid
              className={`${styles.cardTitle} ${styles.content}`}
              height={"25px"}
            >
              Alarms
            </Grid>
            <Grid height={"calc(100% - 25px)"} overflow={"auto"}>
              {ALARMS.map(({ machine, at, alarmMessage }, i) => (
                <Card
                  key={i}
                  className={styles.productivityTimeCard}
                  sx={{
                    borderLeft: "6px solid #434444",
                    color: "white",
                    marginY: "5px",
                  }}
                >
                  <Grid container>
                    <Grid item xs={10}>
                      <Grid fontSize={"12px"}>{machine}</Grid>
                      <Grid fontSize={"10px"}>{alarmMessage}</Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"flex-end"}
                      fontSize={"10px"}
                      color={"#606060"}
                      xs={2}
                    >
                      {getDateWithTime(at)}
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className={styles.card} sx={{ maxHeight: "300px !important" }}>
            <Grid container className={styles.machineDetailsHead}>
              <Grid item xs={1} paddingX={"5px"}>
                Machines
              </Grid>
              <Grid item xs={1} paddingX={"5px"}>
                Status
              </Grid>
              <Grid item xs={1} md={2} paddingX={"5px"}>
                Cycle Progress
              </Grid>
              <Grid item xs={2} paddingX={"5px"}>
                Production Progress
              </Grid>
              <Grid item xs={6} md={5} paddingX={"5px"}>
                Production Remaining
              </Grid>
            </Grid>
            <Grid height={"calc(100% - 20px)"} overflow={"auto"}>
              {MACHINE_DETAILS.map((detail, i) => {
                document
                  .getElementById(`Now-${i}`)
                  ?.scrollIntoView({ block: "center" });
                const { status, activeMin, loadingMin, setupMin, stallMin } =
                  getMachineTimeAndStatus(detail.statusLogs, now);
                return (
                  <Fragment key={i}>
                    <Grid
                      container
                      color={"white"}
                      alignItems={"center"}
                      pt={1}
                    >
                      <Grid item xs={1} paddingX={"5px"} fontSize={"12px"}>
                        {detail.machineName}
                      </Grid>
                      <Grid item xs={1} paddingX={"5px"}>
                        <div
                          className={styles.statusChip}
                          style={{
                            color: statusColor[status],
                          }}
                        >
                          {status}
                        </div>
                      </Grid>
                      <Grid item xs={1} md={2} paddingX={"5px"}>
                        <LinearProgress
                          color="success"
                          className={styles.progressBar}
                          variant="determinate"
                          value={0}
                        />
                      </Grid>
                      <Grid
                        item
                        container
                        xs={2}
                        fontSize={"12px"}
                        paddingX={"5px"}
                        alignItems={"center"}
                      >
                        <LinearProgress
                          color="success"
                          className={styles.progressBar}
                          variant="determinate"
                          value={100}
                        />
                        100%
                      </Grid>
                      <Grid item xs={6} md={5} paddingX={"5px"}></Grid>
                    </Grid>
                    <Grid container py={2} borderBottom={"1px solid #434444"}>
                      <Grid container item xs={5}>
                        <Grid item container xs={6} px={1}>
                          <Grid item xs={4} padding={"2px 4px"}>
                            <MachineDetailChip
                              detail={detail.mode}
                              detailTitle={"MODE"}
                            />
                          </Grid>
                          <Grid item xs={4} padding={"2px 4px"}>
                            <MachineDetailChip
                              detail={detail.program}
                              detailTitle="PROGRAM"
                            />
                          </Grid>
                          <Grid item xs={4} padding={"2px 4px"}>
                            <MachineDetailChip
                              detailTitle="TOOL"
                              detail={detail.toolCount}
                            />
                          </Grid>
                          <Grid item xs={4} padding={"2px 4px"}>
                            <MachineDetailChip
                              detailTitle="PARTS"
                              detail={detail.partsCount}
                            />
                          </Grid>
                          <Grid item xs={4} padding={"2px 4px"}>
                            <MachineDetailChip
                              detailTitle="PART GOAL"
                              detail={detail.partGoal}
                            />
                          </Grid>
                          <Grid item xs={4} padding={"2px 4px"}>
                            <MachineDetailChip
                              detailTitle="SPINDLE"
                              detail={detail.spindle}
                            />
                          </Grid>
                        </Grid>
                        <Grid item container xs={6} px={1}>
                          <Grid item xs={6} padding={"5px 6px"}>
                            <MachineTimingCard
                              status="Active"
                              time={convertMinToHoursFormat(activeMin)}
                            />
                          </Grid>
                          <Grid item xs={6} padding={"5px 6px"}>
                            <MachineTimingCard
                              status="Loading"
                              time={convertMinToHoursFormat(loadingMin)}
                            />
                          </Grid>
                          <Grid item xs={6} padding={"5px 6px"}>
                            <MachineTimingCard
                              status="Setup"
                              time={convertMinToHoursFormat(setupMin)}
                            />
                          </Grid>
                          <Grid item xs={6} padding={"5px 6px"}>
                            <MachineTimingCard
                              status="Stalled"
                              time={convertMinToHoursFormat(stallMin)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item display={"flex"} xs={7}>
                        <Grid
                          width={"calc(100% - 25px)"}
                          height={"85px"}
                          overflow={"auto"}
                          border={"1px solid #333333"}
                        >
                          <Grid
                            position={"relative"}
                            width={"1440px"}
                            height={"50px"}
                          >
                            {detail.statusLogs.map((status, ind) => {
                              const { color, position, width } =
                                getStatusDetails(status);
                              return (
                                <Grid
                                  key={ind}
                                  position={"absolute"}
                                  height={"100%"}
                                  width={`${width}px`}
                                  left={`${position}px`}
                                  bgcolor={color}
                                />
                              );
                            })}
                            {Array.from(Array(24)).map((e, ind) => (
                              <TimeTick
                                key={`tick-${ind}`}
                                time={`${
                                  ind - 12 <= 0 ? ind + "AM" : ind - 12 + "PM"
                                }`}
                                position={ind * 60}
                              />
                            ))}
                            <TimeTick
                              machineIndex={i}
                              position={
                                getStatusDetails({
                                  from: now,
                                  status: "loading",
                                  to: "",
                                }).position
                              }
                              time="Now"
                            />
                          </Grid>
                          <Grid
                            width={"1440px"}
                            height={"5px"}
                            bgcolor={"#333333"}
                          ></Grid>
                        </Grid>
                        <Grid
                          height={"85px"}
                          width={"25px"}
                          border={"1px solid #333333"}
                        >
                          <Grid
                            textAlign={"right"}
                            color={"#606060"}
                            fontSize={"15px"}
                            height={"50px"}
                            position={"relative"}
                          >
                            <Search fontSize="inherit" color="inherit" />
                            <Grid
                              position={"absolute"}
                              left={"-50px"}
                              bottom={"5px"}
                              fontSize={"10px"}
                              color={"white"}
                              bgcolor={"#202020a1"}
                              padding={"2px 5px"}
                              borderRadius={"4px"}
                            >
                              {detail.partsCount - detail.partsCompleted}
                            </Grid>
                          </Grid>
                          <Grid
                            width={"100%"}
                            height={"5px"}
                            bgcolor={"#333333"}
                          ></Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
