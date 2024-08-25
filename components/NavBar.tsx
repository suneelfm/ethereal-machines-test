"use client";
import {
  DescriptionRounded,
  FactoryRounded,
  HouseRounded,
  LayersRounded,
  ShowChartRounded,
  TodayRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "../styles/layout.module.css";

export default function NavBar() {
  const pathName = usePathname();
  interface Pages {
    icon: ReactNode;
    path: string;
  }

  const PAGES: Pages[] = [
    { icon: <HouseRounded />, path: "/" },
    { icon: <FactoryRounded />, path: "/npoa/1" },
    { icon: <LayersRounded />, path: "/npoa/2" },
    { icon: <TodayRounded />, path: "/npoa/3" },
    { icon: <DescriptionRounded />, path: "/npoa/4" },
    { icon: <ShowChartRounded />, path: "/npoa/5" },
  ];

  return (
    <nav className={styles.navBar}>
      {PAGES.map(({ icon, path }) => (
        <Link
          key={path}
          href={path}
          className={`${styles.navItem} ${
            pathName === path ? styles.activeNavItem : ""
          }`}
        >
          {icon}
        </Link>
      ))}
    </nav>
  );
}
