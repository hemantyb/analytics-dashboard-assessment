"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line
} from "recharts";

import { CSVData } from "@/lib/types";

interface ChartProps {
	chartType: "bar" | "line";
	setChartType: (value: "bar" | "line") => void;
	csvData: CSVData[];
	numericHeaders: string[];
	chartData: CSVData[];
}

export default function Chart({
	chartType,
	setChartType,
	csvData,
	numericHeaders,
	chartData,
}: ChartProps) {
	return (
		<Card className="lg:col-span-2">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>
					{chartType === "bar" ? "Bar Chart" : "Line Chart"}
				</CardTitle>
				<Select value={chartType} onValueChange={(value: "bar" | "line") => setChartType(value)}>
					<SelectTrigger className="w-[120px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="bar">Bar Chart</SelectItem>
						<SelectItem value="line">Line Chart</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="h-80">
				{csvData.length > 0 && numericHeaders.length > 0 ? (
					<ResponsiveContainer width="100%" height="100%">
						{chartType === "bar" ? (
							<BarChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								{numericHeaders.map((header, index) => (
									<Bar
										key={header}
										dataKey={header}
										fill={`hsl(${index * 60}, 70%, 50%)`}
									/>
								))}
							</BarChart>
						) : (
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								{numericHeaders.map((header, index) => (
									<Line
										key={header}
										type="monotone"
										dataKey={header}
										stroke={`hsl(${index * 60}, 70%, 50%)`}
										strokeWidth={2}
										activeDot={{ r: 8 }}
									/>
								))}
							</LineChart>
						)}
					</ResponsiveContainer>
				) : (
					<div className="flex h-full items-center justify-center text-gray-500">
						{csvData.length === 0
							? "Upload a CSV file to see chart data"
							: "No numeric data available for charting"}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
