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
