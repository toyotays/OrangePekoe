import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type TimelineEntry = {
  date: string;
  title: string;
  description: string;
  category: "fordays" | "milestone" | "health" | "project";
};

export type WardrobeItem = {
  name: string;
  category: string;
  detail: string;
  accent: "navy" | "brown" | "tan" | "silver";
};

export type VisionMilestone = {
  label: string;
  text: string;
};

export type VisionChapter = {
  id: "foundation" | "next" | "horizon" | "legacy";
  code: string;
  phase: string;
  title: string;
  timeframe: string;
  image: string;
  imageAlt: string;
  statement: string;
  milestones: VisionMilestone[];
};

function readYaml<T>(filename: string): T {
  const source = fs.readFileSync(path.join(process.cwd(), "data", filename), "utf8");
  return YAML.parse(source) as T;
}

export function getTimeline(): TimelineEntry[] {
  return readYaml<TimelineEntry[]>("timeline.yml");
}

export function getWardrobe(): WardrobeItem[] {
  return readYaml<WardrobeItem[]>("wardrobe.yml");
}

export function getVisionChapters(): VisionChapter[] {
  return readYaml<VisionChapter[]>("vision.yml");
}
