"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

import { CSVData } from "@/lib/types";

interface DataTableProps {
	headers: string[];
	currentData: CSVData[];
	startIndex: number;
	endIndex: number;
	csvDataLength: number;
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
}

export default function DataTable({
	headers,
	currentData,
	startIndex,
	endIndex,
	csvDataLength,
	currentPage,
	totalPages,
	setCurrentPage,
}: DataTableProps) {
	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Data Table</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								{headers.map((header) => (
									<TableHead key={header} className="font-bold">
										{header}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentData.map((row, rowIndex) => (
								<TableRow key={rowIndex}>
									{headers.map((header) => (
										<TableCell key={header}>
											{row[header]}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{/* Pagination */}
				<div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
					<div className="text-sm text-gray-700">
						Showing {startIndex + 1} to {Math.min(endIndex, csvDataLength)} of {csvDataLength} entries
					</div>

					<div className="flex items-center space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
							disabled={currentPage === 1}
						>
							Previous
						</Button>

						<div className="flex items-center">
							<span className="mx-1 text-sm">Page</span>
							<Input
								type="number"
								min="1"
								max={totalPages}
								value={currentPage}
								onChange={(e) => {
									const page = Number(e.target.value);
									if (page >= 1 && page <= totalPages) {
										setCurrentPage(page);
									}
								}}
								className="w-16 text-center"
							/>
							<span className="mx-1 text-sm">of {totalPages}</span>
						</div>

						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
							disabled={currentPage === totalPages}
						>
							Next
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
