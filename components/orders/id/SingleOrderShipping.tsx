import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

const orderDetails = {
  id: "#123123123",
  date: "April 12, 2023",
  status: "Delivered",
  deliveryDate: "April 15, 2023",
  shippingAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  },
  paymentMethod: "Visa ending in 4242",
  items: [
    {
      id: "1",
      name: "Wireless Noise-Cancelling Headphones",
      company: "SoundWave",
      price: 249.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
    {
      id: "2",
      name: "Bluetooth Portable Speaker",
      company: "SoundWave",
      price: 129.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
    },
  ],
  shipping: 8.99,
  tax: 38.0,
};

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
