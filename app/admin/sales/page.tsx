import { auth, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function SalesPage() {
  ////Second way of doing it outside the MIDDLE WARE !!!!!
  ////UNSAFE FOR PRODUCTION EASY TO LEAK !!!!!!!
  //   const { userId } = await auth();

  //   if (userId !== process.env.ADMIN_USER_ID) {
  //     return redirect("/");
  //   }

  return <div>Sales Page</div>;
}
export default SalesPage;
