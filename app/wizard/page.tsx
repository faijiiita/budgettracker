import CombinedComboBox from "@/components/CombinedComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const WizardPage = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Welcome, <span className="ml-2 font-bold">{user.firstName}! 👋</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let&apos;s get started by setting up your currency and timezone
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
          You can change the currency at any time
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency & Timezone</CardTitle>
          <CardDescription>
            Set your default currency and timezone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CombinedComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/"}>I&apos;m Done! Take me to the Dasboard.</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
};

export default WizardPage;
