
"use client"

import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

const ShoppingBagIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 8h14l1 13H4L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
)

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined)

  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems)
  const pathname = usePathname()

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
      setActiveTimer(undefined)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }

    itemRef.current = totalItems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, pathname])

  return (
    <div
      className="relative flex h-full items-center"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative flex h-full items-center">
        <Popover.Button
          as="a"
          href="/cart"
          aria-label={`Shopping bag, ${totalItems} items`}
          data-testid="nav-cart-link"
          className="inline-flex h-full items-center gap-2 text-[#302c25] transition-colors hover:text-[#8a7052] focus:outline-none"
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault()
            window.location.href = "/cart"
          }}
        >
          <ShoppingBagIcon />
          <span className="text-[11px] uppercase tracking-[0.12em]">
            <span className="hidden small:inline"> </span>
            <span>{totalItems}</span>
          </span>
        </Popover.Button>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute right-0 top-full z-[70] hidden w-[min(420px,calc(100vw-24px))] border border-[#e7e1d7] bg-[#f7f4ee] text-[#302c25] shadow-xl small:block"
            data-testid="nav-cart-dropdown"
          >
            <div className="border-b border-[#e7e1d7] px-5 py-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.16em]">
                Your bag ({totalItems})
              </h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="grid max-h-[402px] grid-cols-1 gap-y-6 overflow-y-auto p-5">
                  {[...cartState.items]
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        className="grid grid-cols-[96px_1fr] gap-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.variant?.product?.handle}`}
                          className="w-24"
                        >
                          <Thumbnail
                            thumbnail={item.variant?.product?.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex min-w-0 flex-col justify-between">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 flex-col">
                              <LocalizedClientLink
                                href={`/products/${item.variant?.product?.handle}`}
                                className="text-sm"
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>

                              <LineItemOptions
                                variant={item.variant}
                                data-testid="cart-item-variant"
                                data-value={item.variant}
                              />

                              <span
                                className="mt-1 text-xs text-[#82796b]"
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                Qty: {item.quantity}
                              </span>
                            </div>

                            <LineItemPrice item={item} style="tight" />
                          </div>

                          <DeleteButton
                            id={item.id}
                            className="mt-3 text-xs text-[#82796b] hover:text-[#8a7052]"
                            data-testid="cart-item-remove-button"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col gap-4 border-t border-[#e7e1d7] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Subtotal <span className="text-xs">(excl. taxes)</span>
                    </span>

                    <span
                      className="text-sm font-medium"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  <LocalizedClientLink href="/cart">
                    <Button
                      className="w-full !bg-[#302c25] !text-white hover:!bg-[#514638]"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      View shopping bag
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 px-5 py-12 text-center">
                <ShoppingBagIcon />
                <p className="text-sm">Your shopping bag is empty.</p>

                <LocalizedClientLink href="/store">
                  <Button
                    onClick={close}
                    className="!bg-[#302c25] !text-white hover:!bg-[#514638]"
                  >
                    Explore furniture
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown