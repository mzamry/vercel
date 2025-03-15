"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Copy, Check, ExternalLink } from "lucide-react"
import Image from "next/image"

interface CryptoPaymentProps {
  amount: number
}

export default function CryptoPayment({ amount }: CryptoPaymentProps) {
  const [paymentAddress, setPaymentAddress] = useState("")
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaying, setIsPaying] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { clearCart } = useCart()

  // Simulate fetching payment details from MEXC API
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        // In a real implementation, this would be an API call to MEXC
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate response
        setPaymentAddress("0x1234567890abcdef1234567890abcdef12345678")
        setPaymentAmount(amount / 2000) // Convert to ETH at a fake rate
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching payment details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch payment details. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchPaymentDetails()
  }, [amount, toast])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = async () => {
    setIsPaying(true)

    try {
      // In a real implementation, this would verify the payment with MEXC API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment Successful",
        description: "Your crypto payment has been confirmed.",
      })

      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "We couldn't verify your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPaying(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="QR Code for payment"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Payment Address (ETH)</Label>
            <div className="flex mt-1">
              <Input value={paymentAddress} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" className="ml-2" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <Label>Amount to Send (ETH)</Label>
            <div className="flex items-center mt-1">
              <Input value={paymentAmount.toFixed(6)} readOnly className="font-mono text-sm" />
              <span className="ml-2 font-medium">ETH</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Please send exactly {paymentAmount.toFixed(6)} ETH to the address above. The payment will be automatically
            detected once confirmed on the blockchain.
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          className="flex items-center justify-center"
          onClick={() => window.open("https://www.mexc.com", "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open MEXC Exchange
        </Button>

        <Button onClick={handleConfirmPayment} disabled={isPaying}>
          {isPaying ? "Verifying Payment..." : "I've Sent the Payment"}
        </Button>
      </div>
    </div>
  )
}

