import Dashboard from "@/components/Dashboard";
import fs from "fs";
import path from "path";

export default function Home() {
	const filePath = path.join(process.cwd(), "../data-to-visualize/Electric_Vehicle_Population_Data.csv");
	const defaultCsvData = fs.readFileSync(filePath, "utf-8");

	return (
		<Dashboard defaultCsvData={defaultCsvData} />
	);
}
