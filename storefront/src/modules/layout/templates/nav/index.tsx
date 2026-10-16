
import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { getStoreName, isSearchEnabled } from "@lib/util/env"

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
)

const AccountIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
  </svg>
)

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3.5 6.5h17" />
    <path d="M3.5 12h17" />
    <path d="M3.5 17.5h17" />
  </svg>
)

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

export default async function Nav() {
  const regions = await listRegions().then(
    (regions: StoreRegion[]) => regions
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="border-b border-[#e7e1d7] bg-[#f7f4ee] text-[#302c25]">
        <nav
          aria-label="Main navigation"
          className="content-container grid h-[68px] w-full grid-cols-[1fr_auto_1fr] items-center sm:h-[76px]"
        >
          {/* Left: Menu and Shop */}
          <div className="flex h-full min-w-0 items-center justify-start gap-5 sm:gap-8">
            <div className="flex h-full shrink-0 items-center">
              <SideMenu regions={regions} />
            </div>

           <LocalizedClientLink
  href="/store"
  className="hidden shrink-0 items-center text-[10px] font-medium uppercase leading-none tracking-[0.16em] transition-colors hover:text-[#8a7052] small:inline-flex sm:tracking-[0.18em]"
>
  Shop
</LocalizedClientLink>
          </div>

          {/* Center: LOWKEY branding */}
          <LocalizedClientLink
            href="/"
            aria-label={`${getStoreName()} home`}
            data-testid="nav-store-link"
            className="flex flex-col items-center justify-center whitespace-nowrap"
          >
            <span className="text-[21px] font-semibold leading-none tracking-[0.1em] sm:text-[28px] sm:tracking-[0.12em]">
              {getStoreName()}
            </span>

            <span className="mt-1 text-[6px] font-medium uppercase leading-none tracking-[0.24em] text-[#82796b] sm:mt-[6px] sm:text-[8px] sm:tracking-[0.3em]">
              Objects &amp; Interiors
            </span>
          </LocalizedClientLink>

          {/* Right: Search, Account and Cart */}
          <div className="flex h-full min-w-0 items-center justify-end gap-3 sm:gap-6">
            {isSearchEnabled() && (
              <LocalizedClientLink
                href="/search"
                scroll={false}
                aria-label="Search products"
                data-testid="nav-search-link"
                className="hidden shrink-0 items-center gap-2 transition-colors hover:text-[#8a7052] small:inline-flex"
              >
                <SearchIcon />
                <span className="hidden text-[10px] uppercase tracking-[0.12em] small:inline">
                  {/* Search */}
                </span>
              </LocalizedClientLink>
            )}

            <LocalizedClientLink
              href="/account"
              aria-label="My account"
              data-testid="nav-account-link"
              className="hidden shrink-0 items-center gap-2 transition-colors hover:text-[#8a7052] small:inline-flex"
            >
              <AccountIcon />
              <span className="hidden text-[10px] uppercase tracking-[0.12em] small:inline">
                {/* Account */}
              </span>
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  aria-label="Shopping bag, 0 items"
                  data-testid="nav-cart-link"
                  className="inline-flex h-10 w-9 shrink-0 items-center justify-center transition-colors hover:text-[#8a7052]"
                >
                  <ShoppingBagIcon />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>

       
      </header>
    </div>
  )
}
