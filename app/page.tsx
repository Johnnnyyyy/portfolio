"use client";

import { useState } from "react";
import Loader from "./components/Loader";
import Scene from "./components/Scene";
import StartScreen from "./components/StartScreen";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);

  if (!loaded) return <Loader onFinish={() => setLoaded(true)} />;
  if (!started) return <StartScreen onStart={() => setStarted(true)} />;

  return <Scene />;
}