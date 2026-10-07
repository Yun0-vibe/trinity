"use client";

import { useEffect } from "react";
import { PLAYERS } from "@/data/players";
import { useTheme } from "@/components/ThemeProvider";
import PlayerPage from "@/components/PlayerPage";

export default function MessiPage() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("messi");
  }, [setTheme]);
  return <PlayerPage player={PLAYERS.messi} />;
}
