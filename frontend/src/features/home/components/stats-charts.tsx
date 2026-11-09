"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HomeContent } from "@/data/home";

const AXIS = { fontSize: 12, fill: "#4a5b78" };
const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e3ecf8",
  boxShadow: "0 12px 32px -12px rgb(11 91 211 / 0.25)",
  fontSize: 13,
};

export function ProjectsBarChart({
  data,
}: {
  data: HomeContent["stats"]["projectsByYear"];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#19c3e6" />
            <stop offset="100%" stopColor="#0b5bd3" />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="#e3ecf8"
          strokeDasharray="4 4"
        />
        <XAxis dataKey="year" tickLine={false} axisLine={false} tick={AXIS} />
        <YAxis tickLine={false} axisLine={false} tick={AXIS} />
        <Tooltip cursor={{ fill: "#f0f7ff" }} contentStyle={tooltipStyle} />
        <Bar
          dataKey="projects"
          fill="url(#bar)"
          radius={[10, 10, 4, 4]}
          maxBarSize={56}
          animationDuration={1400}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GrowthAreaChart({
  data,
}: {
  data: HomeContent["stats"]["clientGrowth"];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a73f0" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#1a73f0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="#e3ecf8"
          strokeDasharray="4 4"
        />
        <XAxis dataKey="period" tickLine={false} axisLine={false} tick={AXIS} />
        <YAxis tickLine={false} axisLine={false} tick={AXIS} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="clients"
          stroke="#0b5bd3"
          strokeWidth={3}
          fill="url(#area)"
          dot={{ r: 3, fill: "#fff", stroke: "#0b5bd3", strokeWidth: 2 }}
          activeDot={{ r: 6, fill: "#19c3e6", stroke: "#fff", strokeWidth: 2 }}
          animationDuration={1600}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SatisfactionRadial({ value }: { value: number }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart
        data={[{ value }]}
        innerRadius="74%"
        outerRadius="100%"
        startAngle={90}
        endAngle={-270}
      >
        <defs>
          <linearGradient id="radial" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b5bd3" />
            <stop offset="100%" stopColor="#19c3e6" />
          </linearGradient>
        </defs>
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          dataKey="value"
          cornerRadius={20}
          fill="url(#radial)"
          background={{ fill: "#f0f7ff" }}
          animationDuration={1600}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
