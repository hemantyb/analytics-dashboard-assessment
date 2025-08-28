"use client";

import React from "react";

export default function Header() {
	return (
		<header className="mb-8 text-center">
			<h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
				CSV Data Dashboard
			</h1>
			<p className="mt-2 text-gray-600">
				Upload, visualize, and analyze your CSV data
			</p>
		</header>
	);
}
