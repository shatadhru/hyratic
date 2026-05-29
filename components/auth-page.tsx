import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/github-icon";
import { GoogleIcon } from "@/components/google-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { AuthDivider } from "@/components/auth-divider";
import { AtSignIcon } from "lucide-react";

import {Card} from "@/components/ui/card";

function AuthPage() {
	return (
		<div className="relative w-full overflow-hidden md:h-screen">
			<div
				className={cn(
					"relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-between p-6 md:p-8"
				)}
			>
				<div className="flex justify-center">
					<a href="#">
						<Logo className="h-4.5" />
					</a>
				</div>

				

				<p className="text-center text-muted-foreground text-sm">
					This site is protected by reCAPTCHA and the Google{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#"
					>
						Privacy Policy
					</a>{" "}
					and{" "}
					<a
						className="underline underline-offset-4 hover:text-primary"
						href="#"
					>
						Terms of Service
					</a>{" "}
					apply.
				</p>
			</div>
		</div>
	);
}


export default AuthPage;