"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

function SingleOrderShipping() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <address className="not-italic text-muted-foreground">
                Place Holder Name
                <br />
                123 Street
                <br />
                London, SW13 5RL
                <br />
                England
              </address>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Delivery Details</h3>
              <div className="text-muted-foreground">
                <p>Status: </p>
                <p>Delivery Date: TO BE WORKED ON</p>
                <p>Shipping Method: Standard Shipping</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default SingleOrderShipping;
