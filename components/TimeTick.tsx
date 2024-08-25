import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function TimeTick({
  time,
  position,
  machineIndex,
}: {
  time: string;
  position: number;
  machineIndex?: string | number;
}) {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    const width = document.getElementById("tickLabel")?.clientWidth ?? 0;
    setLeft(width / 2);
  }, []);

  return (
    <Grid
      id={`${time}-${machineIndex}`}
      position={"absolute"}
      borderLeft={time === "Now" ? "2px solid #bca179" : "1px solid #33333380"}
      left={`${position}px`}
      height={"120%"}
    >
      <Grid
        id="tickLabel"
        position={"absolute"}
        top={"105%"}
        left={`-${left}px`}
        fontSize={"10px"}
        color={"#606060"}
      >
        {time}
      </Grid>
    </Grid>
  );
}
