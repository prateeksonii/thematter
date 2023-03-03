import { redirect } from "next/navigation";
import { getCurrentUser, getSession } from "~/src/server/session";

export default async function AppPage(props: any) {
  console.log(props);

  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return <div>ok</div>;
}
