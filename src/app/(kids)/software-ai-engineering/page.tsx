import LandingPage from "../components/landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Global Genius | Software & AI Engineering Academy",
  description: "A progressive online technology journey for children and young learners, from Scratch to Software Engineering and AI.",
};

export default function Page(){ return <LandingPage/>; }
