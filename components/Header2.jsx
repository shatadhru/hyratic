import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const categories = [
	"AI & Automation",
	"Development",
	"Writing & Translation",
	"Marketing",
	"Media",
	"Business",
	"Music & Audio",
	"Branding",
	"Social Media",
	"Video Editing",
	"Photography",
	"Image Editing",
	"Business Consulting",
];
function Header2() {
	return (
		<div className="w-full h-6 bg-primary/10 text-white px-6 md:px-10 flex items-center">
			<ScrollArea className="w-full whitespace-nowrap">
				<div className="flex items-center gap-6 px-4">
					{categories.map((item, index) => (
						<span
							key={index}
							className="cursor-pointer whitespace-nowrap text-primary text-sm hover:text-primary/80 transition"
						>
							{item}
						</span>
					))}
				</div>

				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}

export default Header2;