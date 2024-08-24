"use client";

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  HelpOutlineRounded,
  Search,
} from "@mui/icons-material";
import { Box, Card, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/page.module.css";
import { Chart, ChartItem } from "chart.js/auto";
import MachineDetailChip from "./MachineDetailChip";
import MachineTimingCard from "./MachineTimingCard";
import TimeTick from "./TimeTick";

export default function HomePage() {
  useEffect(() => {
    const productivityChart = new Chart(
      document.getElementById("productivity") as ChartItem,
      {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [20, 0, 0, 80],
              backgroundColor: ["#4a7955", "#44935c", "#cfc54c", "#964244"],
              borderColor: "transparent",
              spacing: 3,
            },
          ],
        },
        options: { plugins: { tooltip: { enabled: false } } },
      }
    );
    const today = new Date();
    const oneDayAgo = new Date();
    oneDayAgo.setDate(today.getDate() - 1);
    const twoDayAgo = new Date();
    twoDayAgo.setDate(today.getDate() - 2);
    const threeDayAgo = new Date();
    threeDayAgo.setDate(today.getDate() - 3);
    const labels = [
      `${threeDayAgo.getMonth().toString().padStart(2, "0")}/${threeDayAgo
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      `${twoDayAgo.getMonth().toString().padStart(2, "0")}/${twoDayAgo
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      `${oneDayAgo.getMonth().toString().padStart(2, "0")}/${oneDayAgo
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      `${today.getMonth().toString().padStart(2, "0")}/${today
        .getDate()
        .toString()
        .padStart(2, "0")}`,
    ];
    const lineChart = new Chart(
      document.getElementById("lineChart") as ChartItem,
      {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              data: [5, 0, 0, 20],
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
            },
          },
        },
      }
    );

    return () => {
      productivityChart.destroy();
      lineChart.destroy();
    };
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid key={i} item xs={12} md={4} lg={2}>
            <Card className={styles.card}>
              <Grid container justifyContent={"flex-end"}>
                <HelpOutlineRounded className={styles.helpIcon} />
              </Grid>
              <Typography variant="h4" pl={1} className={styles.content}>
                20%
              </Typography>
              <Grid container pl={1} alignItems={"center"}>
                <span className={styles.label}>Active</span>
                <span
                  className={styles.improvement}
                  style={{ color: true ? "#4a7955" : "#964244" }}
                >
                  {true ? (
                    <ArrowDropUpOutlined sx={{ fontSize: "15px" }} />
                  ) : (
                    <ArrowDropDownOutlined sx={{ fontSize: "15px" }} />
                  )}
                  20%
                </span>
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
                <MachineTimingCard status="Active" time="2h 4m" />
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard status="Loading" time="0m" />
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard status="Setup" time="0m" />
              </Grid>
              <Grid item xs={6} p={2}>
                <MachineTimingCard status="Stalled" time="8h 22m" />
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
              {[1, 2, 3, 4, 5].map((i) => (
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
                      <Grid fontSize={"12px"}>Machine Name</Grid>
                      <Grid fontSize={"10px"}>Alarm message</Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      justifyContent={"flex-end"}
                      fontSize={"10px"}
                      color={"#606060"}
                      xs={2}
                    >
                      07/24 09:03
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
            <Grid container color={"white"} alignItems={"center"} pt={1}>
              <Grid item xs={1} paddingX={"5px"} fontSize={"12px"}>
                HALO - 01
              </Grid>
              <Grid item xs={1} paddingX={"5px"}>
                <div
                  className={styles.statusChip}
                  style={{ color: status === "active" ? "green" : "white" }}
                >
                  IDLE
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
            <Grid container py={2}>
              <Grid container item xs={5}>
                <Grid item container xs={6} px={1}>
                  <Grid item xs={4} padding={"2px 4px"}>
                    <MachineDetailChip detail="MOM" detailTitle={"MODE"} />
                  </Grid>
                  <Grid item xs={4} padding={"2px 4px"}>
                    <MachineDetailChip detail="09001" detailTitle="PROGRAM" />
                  </Grid>
                  <Grid item xs={4} padding={"2px 4px"}>
                    <MachineDetailChip detailTitle="TOOL" detail={1} />
                  </Grid>
                  <Grid item xs={4} padding={"2px 4px"}>
                    <MachineDetailChip detailTitle="PARTS" detail={188} />
                  </Grid>
                  <Grid item xs={4} padding={"2px 4px"}>
                    <MachineDetailChip detailTitle="PART GOAL" detail={0} />
                  </Grid>
                  <Grid item xs={4} padding={"2px 4px"}>
                    <MachineDetailChip detailTitle="SPINDLE" detail={0} />
                  </Grid>
                </Grid>
                <Grid item container xs={6} px={1}>
                  <Grid item xs={6} padding={"5px 6px"}>
                    <MachineTimingCard status="Active" time="2h 4m" />
                  </Grid>
                  <Grid item xs={6} padding={"5px 6px"}>
                    <MachineTimingCard status="Loading" time="0m" />
                  </Grid>
                  <Grid item xs={6} padding={"5px 6px"}>
                    <MachineTimingCard status="Setup" time="0m" />
                  </Grid>
                  <Grid item xs={6} padding={"5px 6px"}>
                    <MachineTimingCard status="Stalled" time="8h 22m" />
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
                  <Grid position={"relative"} width={"1440px"} height={"50px"}>
                    <Grid
                      position={"absolute"}
                      height={"100%"}
                      width={"100px"}
                      left={"100px"}
                      bgcolor={"red"}
                    />
                    {Array.from(Array(24)).map((e, i) => (
                      <TimeTick
                        key={`tick-${i}`}
                        time={`${i - 12 <= 0 ? i + "AM" : i - 12 + "PM"}`}
                        position={i * 60}
                      />
                    ))}
                    <TimeTick position={200} time="Now" />
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
                  >
                    <Search fontSize="inherit" color="inherit" />
                  </Grid>
                  <Grid
                    width={"100%"}
                    height={"5px"}
                    bgcolor={"#333333"}
                  ></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
