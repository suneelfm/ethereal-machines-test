import { Card, Grid } from "@mui/material";
import React from "react";
import styles from "../styles/page.module.css";

interface IMachineTiming {
  status: "Active" | "Loading" | "Setup" | "Stalled";
  time: string;
}

const color = {
  Active: "#4a7955",
  Loading: "#44935c",
  Setup: "#cfc54c",
  Stalled: "#964244",
};

export default function MachineTimingCard(props: IMachineTiming) {
  const { status, time } = props;
  return (
    <Card
      className={styles.productivityTimeCard}
      sx={{ borderLeft: `5px solid ${color[status]}` }}
    >
      <Grid className={styles.productivityStatus}>{status}</Grid>
      <Grid color={"white"} fontSize={"12px"}>
        {time}
      </Grid>
    </Card>
  );
}
