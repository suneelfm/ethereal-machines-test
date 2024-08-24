"use client";

import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  HelpOutlineRounded,
} from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/page.module.css";
import { Chart, ChartItem } from "chart.js/auto";

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
      `${threeDayAgo.getMonth()}/${threeDayAgo.getDate()}`,
      `${twoDayAgo.getMonth()}/${twoDayAgo.getDate()}`,
      `${oneDayAgo.getMonth()}/${oneDayAgo.getDate()}`,
      `${today.getMonth()}/${today.getDate()}`,
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
              <Typography variant="h4" className={styles.content}>
                20%
              </Typography>
              <Grid container alignItems={"center"}>
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
                <Card
                  className={styles.productivityTimeCard}
                  sx={{ borderLeft: "6px solid #4a7955" }}
                >
                  <Grid className={styles.productivityStatus}>Active</Grid>
                  <Grid color={"white"}>2h 4m</Grid>
                </Card>
              </Grid>
              <Grid item xs={6} p={2}>
                <Card
                  className={styles.productivityTimeCard}
                  sx={{ borderLeft: "6px solid #44935c" }}
                >
                  <Grid className={styles.productivityStatus}>Loading</Grid>
                  <Grid color={"white"}>2h 4m</Grid>
                </Card>
              </Grid>
              <Grid item xs={6} p={2}>
                <Card
                  className={styles.productivityTimeCard}
                  sx={{ borderLeft: "6px solid #cfc54c" }}
                >
                  <Grid className={styles.productivityStatus}>Setup</Grid>
                  <Grid color={"white"}>2h 4m</Grid>
                </Card>
              </Grid>
              <Grid item xs={6} p={2}>
                <Card
                  className={styles.productivityTimeCard}
                  sx={{ borderLeft: "6px solid #964244" }}
                >
                  <Grid className={styles.productivityStatus}>Stalled</Grid>
                  <Grid color={"white"}>2h 4m</Grid>
                </Card>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className={styles.card}>
            <canvas id="lineChart"></canvas>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
