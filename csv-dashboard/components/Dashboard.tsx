"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import Header from "./Header";
import FileUpload from "./FileUpload";
import Chart from "./Chart";
import DataTable from "./DataTable";

import { CSVData } from "@/lib/types";

const ITEMS_PER_PAGE = 20;

export default function Dashboard({ defaultCsvData }: { defaultCsvData: string }) {
	const [csvData, setCsvData] = useState<CSVData[]>([]);
	const [headers, setHeaders] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [fileName, setFileName] = useState("");
	const [chartType, setChartType] = useState<"bar" | "line">("bar");
	const [error, setError] = useState("");

	const parseCSV = (text: string): CSVData[] => {
		const lines = text.split("\n").filter(line => line.trim() !== "");
		if (lines.length < 2) {
			throw new Error("CSV must have at least one header and one data row");
		}

		const headers = lines[0].split(",").map(header => header.trim());
		setHeaders(headers);

		const data: CSVData[] = [];
		for (let i = 1; i < lines.length; i++) {
			const currentline = lines[i].split(",");
			if (currentline.length !== headers.length) {
				throw new Error(`Row ${i} has ${currentline.length} columns, expected ${headers.length}`);
			}

			const row: CSVData = {};
			headers.forEach((header, index) => {
				const value = currentline[index].trim();
				row[header] = isNaN(Number(value)) ? value : Number(value);
			});
			data.push(row);
		}

		return data;
	};

	useEffect(() => {
		if (defaultCsvData) {
			try {
				const parsedData = parseCSV(defaultCsvData);
				setCsvData(parsedData);
				setFileName("Electric_Vehicle_Population_Data.csv");
			} catch (err) {
				setError((err as Error).message || "Failed to parse default CSV file");
			}
		}
	}, [defaultCsvData]);

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		setError("");
		const file = event.target.files?.[0];
		if (!file) return;

		if (!file.name.endsWith(".csv")) {
			setError("Please upload a valid CSV file");
			return;
		}

		setFileName(file.name);
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const text = e.target?.result as string;
				const parsedData = parseCSV(text);
				setCsvData(parsedData);
				setCurrentPage(1);
			} catch (err) {
				setError((err as Error).message || "Failed to parse CSV file");
				setCsvData([]);
				setHeaders([]);
			}
		};
		reader.onerror = () => {
			setError("Failed to read file");
		};
		reader.readAsText(file);
	};

	const handleClearData = () => {
		setCsvData([]);
		setHeaders([]);
		setFileName("");
		setCurrentPage(1);
		setError("");
	};

	const totalPages = Math.ceil(csvData.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentData = csvData.slice(startIndex, endIndex);

	const numericHeaders = headers.filter(header =>
		csvData.some(row => typeof row[header] === 'number')
	);

	const chartData = csvData.slice(0, 20).map((row, index) => ({
		name: `Row ${index + 1}`,
		...Object.fromEntries(
			numericHeaders.map(header => [header, row[header]])
		)
	}));

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="mx-auto max-w-7xl">
				<Header />
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<FileUpload
						fileName={fileName}
						error={error}
						handleFileUpload={handleFileUpload}
						handleClearData={handleClearData}
						csvDataLength={csvData.length}
					/>
					<Chart
						chartType={chartType}
						setChartType={setChartType}
						csvData={csvData}
						numericHeaders={numericHeaders}
						chartData={chartData}
					/>
				</div>
				{csvData.length > 0 && (
					<DataTable
						headers={headers}
						currentData={currentData}
						startIndex={startIndex}
						endIndex={endIndex}
						csvDataLength={csvData.length}
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		</div>
	);
}
