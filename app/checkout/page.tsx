"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { CreditCard, Wallet } from "lucide-react"
import CryptoPayment from "@/components/crypto-payment"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-xl mb-8">Your cart is empty</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been confirmed. You will receive a confirmation email shortly.",
    })

    clearCart()
    router.push("/checkout/success")
    setIsProcessing(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required className="mt-1" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main St" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" placeholder="Apt 4B" className="mt-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" placeholder="NY" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" placeholder="10001" required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 mt-1 bg-background"
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              <RadioGroup defaultValue="standard" className="space-y-3">
                <div className="flex items-center space-x-3 border border-border rounded-md p-4">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-grow cursor-pointer">
                    <div className="font-medium">Standard Shipping</div>
                    <div className="text-sm text-muted-foreground">3-5 business days</div>
                  </Label>
                  <div className="font-medium">$5.99</div>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-md p-4">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-grow cursor-pointer">
                    <div className="font-medium">Express Shipping</div>
                    <div className="text-sm text-muted-foreground">1-2 business days</div>
                  </Label>
                  <div className="font-medium">$12.99</div>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-card rounded-lg shadow-sm border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Credit Card
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    Crypto
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" required={paymentMethod === "card"} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required={paymentMethod === "card"}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required={paymentMethod === "card"} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required={paymentMethod === "card"} className="mt-1" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="crypto">
                  <CryptoPayment amount={total} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={isProcessing || paymentMethod === "crypto"}>
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </div>
          </form>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="divide-y divide-border">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex justify-between">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {item.quantity} × {item.name}
                    </span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

