import AdminOrderPage from "@/components/orders/AdminOrderPage";

async function SalesPage() {
  ////Second way of doing it outside the MIDDLE WARE !!!!!
  ////UNSAFE FOR PRODUCTION EASY TO LEAK !!!!!!!
  //   const { userId } = await auth();

  //   if (userId !== process.env.ADMIN_USER_ID) {
  //     return redirect("/");
  //   }

  return <AdminOrderPage />;
}
export default SalesPage;
