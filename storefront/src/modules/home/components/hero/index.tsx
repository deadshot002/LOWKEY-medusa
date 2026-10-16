import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section
      data-testid="hero"
      className="relative overflow-hidden bg-[#f4f0e8] text-[#25251f]"
    >
      <div className="grid min-h-[600px] grid-cols-1 md:grid-cols-2">
        {/* Left: Brand message */}
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-16 lg:px-20">
          <Text className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[#777263]">
            LOWKEY — Crafted for Better Living.
          </Text>

          <Heading
            level="h1"
            className="max-w-xl text-5xl font-normal leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
          >
            Less noise.
            <br />
            More nature.
          </Heading>

          <Text className="mt-6 max-w-md text-base leading-7 text-[#68665d] sm:text-lg">
            Thoughtfully chosen wooden furniture for spaces that feel like
            home. Natural textures, timeless forms, everyday comfort.
          </Text>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <LocalizedClientLink href="/store">
              <Button className="!h-12 !rounded-none !border-[#292820] !bg-[#292820] !px-7 !text-sm !text-white hover:!bg-[#454338]">
                Explore collection
                <span className="ml-3" aria-hidden="true">
                  ↗
                </span>
              </Button>
            </LocalizedClientLink>

            <Text className="text-xs uppercase tracking-[0.15em] text-[#777263]">
              Made for everyday living
            </Text>
          </div>

          <div className="mt-16 flex gap-8 border-t border-[#d9d2c5] pt-5">
            <div>
              <Text className="text-sm font-medium">01 / Natural</Text>
              <Text className="mt-1 text-xs text-[#777263]">
                Warm materials
              </Text>
            </div>
            <div>
              <Text className="text-sm font-medium">02 / Timeless</Text>
              <Text className="mt-1 text-xs text-[#777263]">
                Beyond trends
              </Text>
            </div>
          </div>
        </div>

        {/* Right: Furniture image */}
        <div className="relative min-h-[380px] bg-[#ddd3c3] md:min-h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
            alt="Warm minimalist living room with natural materials and wooden furniture"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white sm:bottom-10 sm:left-10 sm:right-10">
            <div>
              <Text className="text-xs uppercase tracking-[0.25em] text-white/80">
                The art of living simply
              </Text>
              <Heading level="h2" className="mt-2 text-2xl font-normal">
                Find your kind of calm.
              </Heading>
            </div>
            <span className="text-2xl" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero