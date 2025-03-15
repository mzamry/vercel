import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-lg mb-8">
          Thank you for your purchase. Your order has been received and is being processed. You will receive a
          confirmation email shortly.
        </p>
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-medium">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Method:</span>
              <span className="font-medium">Standard Shipping</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} -{" "}
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild>
            <Link href="/account/orders">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

