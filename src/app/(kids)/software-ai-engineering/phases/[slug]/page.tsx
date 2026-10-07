import PhasePage from "@/app/(kids)/components/phase-page";
import { getPhase, phases } from "@/app/(kids)/lib/phase";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return phases.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPhase(slug);
  if (!p) return {};
  return {
    title: `Phase ${p.number}: ${p.title} | The Global Genius`,
    description: p.promise,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phase = getPhase(slug);
  if (!phase) notFound();
  return <PhasePage phase={phase!} />;
}
