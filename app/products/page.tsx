import { cookies } from "@/lib/data"
import ProductCard from "@/components/product-card"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Cookie Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cookies.map((cookie) => (
          <ProductCard key={cookie.id} product={cookie} />
        ))}
      </div>
    </div>
  )
}

