
"use client"

import { Popover, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"
import { getStoreName } from "@lib/util/env"

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
    className="shrink-0"
  >
    <path d="M3 7h18" />
    <path d="M3 12h18" />
    <path d="M3 17h18" />
  </svg>
)

const SideMenuItems = {
  Home: "/",
  Shop: "/store",
  Search: "/search",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({
  regions,
}: {
  regions: HttpTypes.StoreRegion[] | null
}) => {
  const toggleState = useToggleState()

  return (
    <div className="flex h-full items-center">
      <Popover className="flex h-full items-center">
        {({ open, close }) => (
          <>
            <Popover.Button
              type="button"
              data-testid="nav-menu-button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-full shrink-0 items-center gap-2 text-[#302c25] transition-colors duration-200 hover:text-[#8a7052] focus:outline-none"
            >
              <MenuIcon />
              <span className="text-[12px] font-normal leading-none sm:text-[13px]">
                
              </span>
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
<Popover.Panel className="fixed inset-y-0 left-0 z-[60] flex h-dvh w-[min(84vw,360px)] flex-col bg-[#f7f4ee] text-[#302c25] shadow-2xl ring-1 ring-[#e7e1d7]">
  <div
    data-testid="nav-menu-popup"
    className="flex h-full flex-col px-6 py-7 sm:px-8"
  >
    {/* Header */}
    <div className="flex items-center justify-between border-b border-[#e7e1d7] pb-6">
      <LocalizedClientLink
        href="/"
        onClick={close}
        className="text-xl font-semibold tracking-[0.14em]"
      >
        {getStoreName()}
      </LocalizedClientLink>

      <button
        type="button"
        data-testid="close-menu-button"
        onClick={close}
        aria-label="Close menu"
        className="flex h-10 w-10 items-center justify-center transition-colors hover:text-[#9a7954]"
      >
        <XMark />
      </button>
    </div>

    {/* Navigation */}
    <nav aria-label="Sidebar navigation" className="flex-1 py-10">
      <p className="mb-7 text-[9px] uppercase tracking-[0.25em] text-[#82796b]">
        Explore LOWKEY
      </p>

      <ul className="flex flex-col gap-7">
        {Object.entries(SideMenuItems).map(([name, href], index) => (
          <li key={name}>
            <LocalizedClientLink
              href={href}
              onClick={close}
              data-testid={`${name.toLowerCase()}-link`}
              className="group flex items-center justify-between text-[25px] font-normal tracking-tight transition-colors hover:text-[#9a7954]"
            >
              <span>{name}</span>
              <span className="translate-x-[-4px] text-sm opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                ↗
              </span>
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </nav>

    {/* Footer */}
    <div className="border-t border-[#e7e1d7] pt-6">
      {regions && (
        <div
          className="flex items-center justify-between"
          onMouseEnter={toggleState.open}
          onMouseLeave={toggleState.close}
        >
          <CountrySelect
            toggleState={toggleState}
            regions={regions}
          />

          <ArrowRightMini
            className={clx(
              "transition-transform duration-150",
              toggleState.state && "-rotate-90"
            )}
          />
        </div>
      )}

      <p className="mt-7 text-[11px] leading-5 text-[#82796b]">
        Thoughtfully chosen. Made for home.
      </p>

      <Text className="mt-3 text-xs text-[#82796b]">
        © {new Date().getFullYear()} {getStoreName()}. All rights reserved.
      </Text>
    </div>
  </div>
</Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SideMenu