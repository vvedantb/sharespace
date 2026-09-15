import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  if (cookieStore.has("accessToken")) {
    redirect("/marketplace");
  }

  return <LandingPage />;
}
