"use client";

import React, { ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2 } from "lucide-react";

interface FileUploadProps {
	fileName: string;
	error: string;
	handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
	handleClearData: () => void;
	csvDataLength: number;
}

export default function FileUpload({
	fileName,
	error,
	handleFileUpload,
	handleClearData,
	csvDataLength,
}: FileUploadProps) {
	return (
		<Card className="lg:col-span-1">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Upload className="h-5 w-5" />
					Upload CSV Data
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="csv-upload">Choose CSV File</Label>
					<Input
						id="csv-upload"
						type="file"
						accept=".csv"
						onChange={handleFileUpload}
						className="cursor-pointer"
					/>
				</div>

				{fileName && (
					<div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
						<span className="truncate text-sm font-medium">{fileName}</span>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleClearData}
							className="h-8 w-8 p-0"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				)}

				{error && (
					<div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
						{error}
					</div>
				)}

				{csvDataLength > 0 && (
					<div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
						Successfully loaded {csvDataLength} rows of data
					</div>
				)}
			</CardContent>
		</Card>
	);
}
