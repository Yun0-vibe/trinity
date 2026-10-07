"use client";

import { useEffect } from "react";
import { PLAYERS } from "@/data/players";
import { useTheme } from "@/components/ThemeProvider";
import PlayerPage from "@/components/PlayerPage";

export default function NeymarPage() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("neymar");
  }, [setTheme]);
  return <PlayerPage player={PLAYERS.neymar} />;
}
