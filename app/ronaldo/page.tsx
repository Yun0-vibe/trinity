"use client";

import { useEffect } from "react";
import { PLAYERS } from "@/data/players";
import { useTheme } from "@/components/ThemeProvider";
import PlayerPage from "@/components/PlayerPage";

export default function RonaldoPage() {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("ronaldo");
  }, [setTheme]);
  return <PlayerPage player={PLAYERS.ronaldo} />;
}
