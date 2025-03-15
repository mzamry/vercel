import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import AddToCartButton from "@/components/add-to-cart-button"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-card rounded-lg shadow-sm border border-border overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <AddToCartButton product={product} variant="outline" />
        </div>
      </div>
    </div>
  )
}

