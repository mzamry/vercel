import Image from "next/image"
import { notFound } from "next/navigation"
import { cookies } from "@/lib/data"
import AddToCartButton from "@/components/add-to-cart-button"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = cookies.find((c) => c.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
            <p className="text-gray-700 dark:text-gray-300">{product.ingredients}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <select
                className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-background"
                defaultValue="1"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

