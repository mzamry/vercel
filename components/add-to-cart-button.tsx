"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function AddToCartButton({ product, variant = "default", size = "default" }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 })
    setIsAdded(true)

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })

    setTimeout(() => {
      setIsAdded(false)
    }, 1500)
  }

  return (
    <Button variant={variant} size={size} onClick={handleAddToCart} disabled={isAdded} className="transition-all">
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" /> Added
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
        </>
      )}
    </Button>
  )
}

