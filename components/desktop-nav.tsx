import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
	aiServicesLinks,
	marketplaceLinks,
	companyLinks,
	companyLinks2,
} from "@/components/nav-links";

import { LinkItem } from "@/components/sheard";

export function DesktopNav() {
	return (
		<NavigationMenu className="hidden md:flex">
			<NavigationMenuList>

				{/* Marketplace */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">
						Marketplace
					</NavigationMenuTrigger>

					<NavigationMenuContent className="bg-muted/50 p-2 dark:bg-background">
						<div className="grid w-[600px] grid-cols-2 gap-3 rounded-lg border bg-popover p-3 shadow">

							{marketplaceLinks.map((item, i) => (
								<NavigationMenuLink asChild key={`market-${i}`}>
									<LinkItem {...item} />
								</NavigationMenuLink>
							))}

						</div>

						<div className="p-3 text-sm text-muted-foreground">
							Find top talent or sell your skills on HyRatic 🚀
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{/* AI Services */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">
						AI Services
					</NavigationMenuTrigger>

					<NavigationMenuContent className="bg-muted/50 p-2 dark:bg-background">
						<div className="grid w-[600px] grid-cols-2 gap-3 rounded-lg border bg-popover p-3 shadow">

							{aiServicesLinks.map((item, i) => (
								<NavigationMenuLink asChild key={`ai-${i}`}>
									<LinkItem {...item} />
								</NavigationMenuLink>
							))}

						</div>

						<div className="p-3 text-sm text-muted-foreground">
							AI-powered services to boost your productivity ⚡
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{/* Company */}
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">
						Company
					</NavigationMenuTrigger>

					<NavigationMenuContent className="bg-muted/50 p-1 pr-1.5 pb-1.5 dark:bg-background">
						<div className="grid w-[600px] grid-cols-2 gap-3">

							<div className="rounded-lg space-y-2 border bg-popover p-3 shadow">
								{companyLinks.map((item, i) => (
									<NavigationMenuLink asChild key={`c1-${i}`}>
										<LinkItem {...item} />
									</NavigationMenuLink>
								))}
							</div>

							<div className="space-y-2 p-3">
								{companyLinks2.map((item, i) => (
									<NavigationMenuLink
										href={item.href}
										key={`c2-${i}`}
										className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
									>
										{item.icon}
										{item.label}
									</NavigationMenuLink>
								))}
							</div>

						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>

				{/* Pricing */}
				<NavigationMenuItem>
					<NavigationMenuLink asChild className="px-3">
						<a className="rounded-md p-2 hover:bg-accent" href="#">
							Pricing
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>

				{/* Explore (NEW for marketplace feel) */}
				<NavigationMenuItem>
					<NavigationMenuLink asChild className="px-3">
						<a className="rounded-md p-2 hover:bg-accent" href="#">
							Explore
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>

			</NavigationMenuList>
		</NavigationMenu>
	);
}