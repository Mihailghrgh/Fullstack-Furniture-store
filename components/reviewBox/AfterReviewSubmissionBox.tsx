"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";

function AfterReviewSubmissionBox() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <DialogTitle className="text-center text-xl sm:text-2xl font-semibold mt-4">
          Your review has been submitted!
        </DialogTitle>
        <DialogDescription className="text-center pt-2">
          Thank you for sharing your opinion for this product. This will help
          better understand your thoughts on to improve our business.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-2">
        <Button className="sm:flex-1 bg-blue-600 hover:bg-blue-700">
          Continue Shopping
        </Button>
        <Button variant="outline" className="mt-3 sm:mt-0 sm:flex-1" asChild>
          <Link href="/reviews">View Order Details</Link>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
export default AfterReviewSubmissionBox;
