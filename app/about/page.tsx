"use client";
import Link from "next/link";
import AnimatedSection from "../components/AnimatedSection";

export default function About() {
  return (
    <main className="container fade-in">
      <AnimatedSection>
        <h1 className="text-3xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-zinc-300 mb-6">
          I’m a developer with experience in AI automation, n8n, and serverless workflows. I love building tools that remove manual work and improve operational efficiency. My passion is to create seamless, intelligent solutions that empower people and businesses.
        </p>
        <ul className="list-disc list-inside text-zinc-400 mb-6">
          <li>5+ years in automation and AI</li>
          <li>Expert in n8n, Next.js, and cloud functions</li>
          <li>Open-source contributor and tech blogger</li>
        </ul>
        <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
      </AnimatedSection>
    </main>
  );
}