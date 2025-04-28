"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ItemsProps = {
  last4: string;
  type: string;
};

function SingleOrderPayment({ last4, type }: ItemsProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Payment Method</h3>
              <p className="text-muted-foreground capitalize">
                {type} ending in {last4}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Billing Address</h3>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default SingleOrderPayment;
