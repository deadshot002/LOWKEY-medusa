
import { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"

export default async function productCacheRevalidationHandler({
  event,
}: SubscriberArgs<{ id: string }>) {
  const storefrontUrl = process.env.STOREFRONT_URL
  const secret = process.env.STOREFRONT_REVALIDATION_SECRET

  if (!storefrontUrl || !secret) {
    console.error(
      "Product cache revalidation skipped: STOREFRONT_URL or STOREFRONT_REVALIDATION_SECRET is missing"
    )
    return
  }

  try {
    const response = await fetch(
      `${storefrontUrl.replace(/\/+$/, "")}/api/revalidate-products`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${secret}`,
        },
      }
    )

    if (!response.ok) {
      console.error(
        `Product cache revalidation failed for ${event.name}:`,
        response.status,
        await response.text()
      )
      return
    }

    console.info(`Product cache revalidated after ${event.name}`)
  } catch (error) {
    console.error("Could not reach storefront for cache revalidation:", error)
  }
}

export const config: SubscriberConfig = {
  event: ["product.created", "product.updated", "product.deleted"],
}
