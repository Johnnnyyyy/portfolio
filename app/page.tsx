"use client";

import { useState } from "react";
import Experience from "./components/Experience";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);

  if (!loaded) return <Loader onFinish={() => setLoaded(true)} />;
  if (!started) return <StartScreen onStart={() => setStarted(true)} />;

  return <Experience />;
}