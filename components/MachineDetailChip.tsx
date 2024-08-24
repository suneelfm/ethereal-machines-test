import { Grid } from "@mui/material";
import styles from "../styles/machineDetailChip.module.css";

interface IMachineDetailChip {
  detail: string | number;
  detailTitle: string;
}

export default function MachineDetailChip(props: IMachineDetailChip) {
  const { detail, detailTitle } = props;
  return (
    <Grid className={styles.chipContainer}>
      <p>{detailTitle}</p>
      <div>{detail}</div>
    </Grid>
  );
}
