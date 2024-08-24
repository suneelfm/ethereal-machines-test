import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "./page.module.css";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  HelpOutlineRounded,
} from "@mui/icons-material";

export default function Home() {
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
      </Grid>
    </Box>
  );
}
