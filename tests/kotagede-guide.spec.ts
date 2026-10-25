import { expect, test, type Page } from "@playwright/test"
import * as guideData from "../lib/data/kotagede-guide"

type TrailMetric = (trail: guideData.WalkingTrail) => number

const EXPECTED_ROUTE_STOPS = {
  royal: [
    "salim-silver",
    "pasar-legi",
    "masjid-gedhe-mataram",
    "makam-raja",
    "sendang-seliran",
    "between-two-gates"
  ],
  heritage: [
    "salim-silver",
    "pasar-legi",
    "between-two-gates",
    "watu-gilang",
    "masjid-gedhe-mataram",
    "makam-raja",
    "sendang-seliran",
    "gang-soka",
    "omah-ugm",
    "museum-kotagede"
  ],
  culinary: ["salim-silver", "kembang-waru", "pasar-legi", "kipo-bu-djito"]
} as const

function haversineMeters(from: [number, number], to: [number, number]) {
  const radians = (degrees: number) => (degrees * Math.PI) / 180
  const earthRadius = 6_371_000
  const latitudeDelta = radians(to[1] - from[1])
  const longitudeDelta = radians(to[0] - from[0])
  const fromLatitude = radians(from[1])
  const toLatitude = radians(to[1])
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2

  return 2 * earthRadius * Math.asin(Math.sqrt(haversine))
}

function getTrailMetric(name: string) {
  const metric = (guideData as unknown as Record<string, unknown>)[name]
  expect(metric, `${name} must be exported`).toBeInstanceOf(Function)
  return metric as TrailMetric
}

async function openGuide(page: Page, path = "/kotagede-guide") {
  await page.goto(path, { waitUntil: "domcontentloaded" })
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(page.getByTestId("kotagede-guide")).toHaveAttribute(
    "data-hydrated",
    "true",
    { timeout: 20_000 }
  )
}

async function expectNoDocumentOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }))

  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth)
}

async function useEmptyMapStyle(page: Page) {
  await page.route(
    "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    async (route) => {
      await route.fulfill({
        json: {
          version: 8,
          sources: {},
          layers: []
        }
      })
    }
  )
}

test.describe("Kotagede walking trail data", () => {
  test("uses three Salim-led routes and keeps the royal complex together", () => {
    expect(guideData.WALKING_TRAILS.map((trail) => trail.id)).toEqual([
      "royal",
      "heritage",
      "culinary"
    ])
    for (const trail of guideData.WALKING_TRAILS) {
      expect(trail.stopIds).toEqual(EXPECTED_ROUTE_STOPS[trail.id])
      expect(trail.stopIds[0]).toBe("salim-silver")
      expect(trail.endStopId).toBe(trail.stopIds.at(-1))
      expect(new Set(trail.stopIds).size).toBe(trail.stopIds.length)
      const complexStops = trail.stopIds.filter((id) =>
        ["masjid-gedhe-mataram", "makam-raja", "sendang-seliran"].includes(id)
      )
      if (complexStops.length) {
        const firstIndex = trail.stopIds.indexOf(complexStops[0])
        expect(
          trail.stopIds.slice(firstIndex, firstIndex + complexStops.length)
        ).toEqual(["masjid-gedhe-mataram", "makam-raja", "sendang-seliran"])
      }
    }
  })

  test("hides unverified Yangko and leaves Benteng outside themed loops", () => {
    expect(guideData.KOTAGEDE_POIS.map((poi) => poi.id)).not.toContain(
      "yangko-prapto"
    )
    expect(
      guideData.WALKING_TRAILS.flatMap((trail) => trail.stopIds)
    ).not.toContain("benteng-cepuri")
    expect(guideData.KOTAGEDE_POIS.map((poi) => poi.id)).toContain(
      "benteng-cepuri"
    )
  })

  test("uses verified Omah UGM coordinates", () => {
    const omahUgm = guideData.KOTAGEDE_POIS.find((poi) => poi.id === "omah-ugm")

    expect(omahUgm?.coordinates).toEqual([110.39633445816, -7.8291468025372])
  })

  test("starts at Salim and ends beside each final stop without a return leg", () => {
    const getTrailPois = (guideData as unknown as Record<string, unknown>)
      .getTrailPois
    expect(getTrailPois, "getTrailPois must be exported").toBeInstanceOf(
      Function
    )

    for (const trail of guideData.WALKING_TRAILS) {
      const coordinates = trail.routeGeoJson.geometry.coordinates as [
        number,
        number
      ][]
      expect(
        haversineMeters(coordinates[0], guideData.SALIM_SILVER_LOCATION)
      ).toBeLessThanOrEqual(2)
      const finish = guideData.KOTAGEDE_POIS.find(
        (poi) => poi.id === trail.endStopId
      )
      expect(finish).toBeDefined()
      expect(
        haversineMeters(coordinates.at(-1)!, finish!.coordinates)
      ).toBeLessThanOrEqual(30)
      expect(
        haversineMeters(coordinates.at(-1)!, guideData.SALIM_SILVER_LOCATION)
      ).toBeGreaterThan(30)

      for (const poi of (
        getTrailPois as (trail: guideData.WalkingTrail) => guideData.POI[]
      )(trail)) {
        const nearestVertex = Math.min(
          ...coordinates.map((coordinate) =>
            haversineMeters(coordinate, poi.coordinates)
          )
        )
        expect(
          nearestVertex,
          `${trail.id} must pass ${poi.id}`
        ).toBeLessThanOrEqual(30)
      }
    }
  })

  test("derives distance and five-minute walking estimates from geometry", () => {
    const getTrailDistanceMeters = getTrailMetric("getTrailDistanceMeters")
    const getTrailWalkingMinutes = getTrailMetric("getTrailWalkingMinutes")

    for (const trail of guideData.WALKING_TRAILS) {
      const distance = getTrailDistanceMeters(trail)
      const minutes = getTrailWalkingMinutes(trail)

      expect(distance).toBeGreaterThan(500)
      expect(minutes).toBe(Math.ceil(distance / 75 / 5) * 5)
      expect(minutes % 5).toBe(0)
    }
  })
})

test.describe("Kotagede guide responsive layout", () => {
  test("keeps phone content within the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 })
    await openGuide(page)

    await expectNoDocumentOverflow(page)

    const guideBox = await page.getByTestId("kotagede-guide").boundingBox()
    expect(guideBox).not.toBeNull()
    expect(guideBox!.x).toBeGreaterThanOrEqual(0)
    expect(guideBox!.x + guideBox!.width).toBeLessThanOrEqual(320)
  })

  test("opens with three walk choices", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openGuide(page)

    const map = page.getByTestId("kotagede-map-frame")
    await expect(map).toBeVisible()
    const mapBox = await map.boundingBox()
    expect(mapBox).not.toBeNull()
    expect(mapBox!.height).toBeGreaterThanOrEqual(843)
    await expect(
      page.getByTestId("mobile-walk-picker").locator("[data-walk-id]")
    ).toHaveCount(3)
    await page.locator('[data-walk-id="royal"]').click()
    const summary = page.getByTestId("mobile-route-summary")
    await expect(summary).toContainText("Royal Mataram Walk")
    await expect(summary).toContainText("6 places")
    await summary.getByRole("button", { name: "View stops" }).click()
    await expect(
      page.getByTestId("mobile-stops").locator("[data-poi-id]")
    ).toHaveCount(6)
    expect(
      await page.evaluate(() => document.scrollingElement!.scrollTop)
    ).toBe(0)
  })

  test("keeps choices reachable on a short phone", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    await openGuide(page)

    await page.locator('[data-walk-id="culinary"]').click()
    await expect(page.getByTestId("mobile-route-summary")).toContainText(
      "Kotagede Food Walk"
    )
    expect(
      await page.evaluate(() => document.scrollingElement!.scrollTop)
    ).toBe(0)

    await openGuide(page)
    await page.getByRole("button", { name: "Explore all places" }).click()
    await expect(page.getByTestId("mobile-place-preview")).toContainText(
      "Salim Silver"
    )
    await expect(page.getByTestId("mobile-route-summary")).toHaveCount(0)
    expect(
      await page.evaluate(() => document.scrollingElement!.scrollTop)
    ).toBe(0)
  })

  test("moves from a walk to stops and full place details", async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openGuide(page)

    await page.locator('[data-walk-id="royal"]').click()
    await page
      .getByTestId("mobile-route-summary")
      .getByRole("button", { name: "View stops" })
      .click()
    await expect(
      page.getByTestId("mobile-stops").locator("[data-poi-id]")
    ).toHaveCount(6)
    await page
      .getByTestId("mobile-stops")
      .locator('[data-poi-id="pasar-legi"]')
      .click()
    await expect(page.getByTestId("mobile-place-preview")).toContainText(
      "Pasar Legi"
    )
    await expect(
      page
        .getByTestId("mobile-place-preview")
        .getByRole("button", { name: "Details" })
    ).toBeVisible()
    await page
      .getByTestId("mobile-place-preview")
      .getByRole("button", { name: "Details" })
      .click()

    const details = page.getByTestId("mobile-place-details")
    await expect(details).toBeVisible()
    await expect(details.getByRole("img", { name: /Pasar Legi/ })).toBeVisible()
    await expect(details).toContainText("The oldest traditional market")
    await expect(details).toContainText("Best visited in the morning")
    const mapsLink = details.getByRole("link", { name: /Open in Google Maps/ })
    await expect(mapsLink).toBeVisible()
    expect((await mapsLink.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    await expectNoDocumentOverflow(page)

    await details.getByRole("button", { name: "Close details" }).click()
    await expect(page.getByTestId("mobile-place-preview")).toContainText(
      "Pasar Legi"
    )
    await page
      .getByTestId("mobile-place-preview")
      .getByRole("button", { name: "View stops" })
      .click()
    await expect(
      page.getByTestId("mobile-stops").locator("[data-poi-id]")
    ).toHaveCount(6)
  })

  test("explores places and visitor tips", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openGuide(page)

    await page.getByRole("button", { name: "Explore all places" }).click()
    await expect(page.getByTestId("mobile-open-places")).toBeVisible()
    await page.getByTestId("mobile-open-places").click()
    const places = page.getByTestId("mobile-places")
    await expect(places).toBeVisible()
    await places.getByRole("button", { name: "Traditional Culinary" }).click()
    await places.locator('[data-poi-id="kipo-bu-djito"]').click()
    await expect(page.getByTestId("mobile-place-preview")).toContainText(
      "Kipo Bu Djito"
    )

    await page.getByTestId("mobile-open-tips").click()
    await expect(page.getByTestId("mobile-visitor-tips")).toContainText(
      "active living residential spaces"
    )
  })

  test("keeps localized mobile controls within 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 })
    const locales = [
      {
        path: "/kotagede-guide",
        title: "Choose a walking route",
        places: "Places"
      },
      {
        path: "/id/kotagede-guide",
        title: "Pilih rute jalan kaki",
        places: "Tempat"
      },
      {
        path: "/nl/kotagede-guide",
        title: "Kies een wandelroute",
        places: "Plekken"
      }
    ]

    for (const locale of locales) {
      await openGuide(page, locale.path)
      await expect(page.getByTestId("mobile-guide-panel")).toContainText(
        locale.title
      )
      await expect(page.getByTestId("mobile-open-places")).toHaveAttribute(
        "aria-label",
        locale.places
      )
      await page.locator('[data-walk-id="heritage"]').click()
      await expectNoDocumentOverflow(page)
    }
  })

  test("handles localized copy without horizontal overflow", async ({
    page
  }) => {
    await page.setViewportSize({ width: 320, height: 720 })

    for (const path of [
      "/kotagede-guide",
      "/id/kotagede-guide",
      "/nl/kotagede-guide"
    ]) {
      await openGuide(page, path)
      await expectNoDocumentOverflow(page)
    }
  })

  test("uses a single desktop side-panel detail card", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await openGuide(page)

    const map = page.getByTestId("kotagede-map-frame")
    const visibleDetails = page.locator('[data-testid="poi-details"]:visible')
    const desktopDetails = page.locator(
      '[data-testid="poi-details"][data-variant="card"]'
    )

    await expect(visibleDetails).toHaveCount(1)
    await expect(desktopDetails).toBeVisible()

    const mapBox = await map.boundingBox()
    const detailsBox = await desktopDetails.boundingBox()
    expect(mapBox).not.toBeNull()
    expect(detailsBox).not.toBeNull()
    expect(detailsBox!.x).toBeGreaterThan(mapBox!.x + mapBox!.width)
  })

  test("preserves desktop at the lg boundary", async ({ page }) => {
    for (const width of [1024, 1280]) {
      await page.setViewportSize({ width, height: 900 })
      await openGuide(page)
      await expect(page.getByTestId("mobile-guide-panel")).toBeHidden()
      await expect(page.getByTestId("trail-royal")).toBeVisible()
      await expect(
        page.locator('[data-testid="poi-details"][data-variant="card"]')
      ).toBeVisible()
    }
  })

  test("hides the place-details dismiss control on desktop", async ({
    page
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await openGuide(page)

    const desktopDetails = page.locator(
      '[data-testid="poi-details"][data-variant="card"]'
    )
    await expect(desktopDetails).toBeVisible()
    await expect(
      desktopDetails.getByRole("button", { name: "Close details" })
    ).toHaveCount(0)
  })
})

test.describe("Kotagede walking route experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await openGuide(page)
  })

  test("renders the longer Heritage walk with the Royal complex together", async ({
    page
  }) => {
    await page.getByTestId("trail-heritage").click()

    const stops = page.getByTestId("poi-itinerary").locator("[data-poi-id]")
    await expect(stops).toHaveCount(10)
    expect(
      await stops.evaluateAll((items) =>
        items.map((item) => item.getAttribute("data-poi-id"))
      )
    ).toEqual(EXPECTED_ROUTE_STOPS.heritage)
    await expect(stops.last()).toHaveAttribute("data-route-finish", "true")
    await expect(stops.last()).toContainText("Finish")
    await expect(page.getByTestId("trail-merchant")).toHaveCount(0)
  })

  test("shows route description and geometry-derived trip metadata", async ({
    page
  }) => {
    await expect(page.getByTestId("trail-description-royal")).toBeVisible()
    await expect(page.getByTestId("trail-walking-royal")).toHaveText(
      `${guideData.getTrailWalkingMinutes(guideData.WALKING_TRAILS[0])} min walk`
    )
    await expect(page.getByTestId("trail-experience-royal")).toHaveText(
      "75–120 min visit"
    )
    await expect(page.getByTestId("trail-places-royal")).toHaveText("6 places")
    await expect(page.getByTestId("trail-route-endpoints-royal")).toHaveText(
      "Starts at Salim Silver · Ends at Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
    )
    await expect(page.getByTestId("trail-round-trip-royal")).toHaveCount(0)
  })

  test("advertises the three walks in structured data", async ({ page }) => {
    const names = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((scripts) => {
        const graphs = scripts.flatMap(
          (script) => JSON.parse(script.textContent || "{}")["@graph"] || []
        )
        const trip = graphs.find(
          (item: { "@type": string }) => item["@type"] === "TouristTrip"
        )
        return trip.itinerary.itemListElement.map(
          (item: { name: string }) => item.name
        )
      })
    expect(names).toEqual([
      "Royal Mataram Walk",
      "Kotagede Heritage Walk",
      "Kotagede Food Walk"
    ])
  })

  test("resets a hidden selection when a category replaces the active route", async ({
    page
  }) => {
    await page.getByRole("button", { name: "Explore All Spots" }).click()
    await page
      .getByTestId("poi-itinerary")
      .locator('[data-poi-id="benteng-cepuri"]')
      .click()
    await expect(
      page.locator(
        '[data-testid="poi-details"][data-variant="card"][aria-label*="Benteng"]'
      )
    ).toBeVisible()

    await page.getByRole("button", { name: "Traditional Culinary" }).click()
    await expect(
      page.locator(
        '[data-testid="poi-details"][data-variant="card"][aria-label="Salim Silver"]'
      )
    ).toBeVisible()
  })

  test("shows general visitor tips even when they are not etiquette warnings", async ({
    page
  }) => {
    await expect(
      page
        .locator('[data-testid="poi-details"][data-variant="card"]')
        .getByText(/Complimentary mineral water and rest area/)
    ).toBeVisible()
  })

  test("displays authentic destination photography for places", async ({
    page
  }) => {
    await page
      .getByTestId("poi-itinerary")
      .locator('[data-poi-id="pasar-legi"]')
      .click()

    const details = page.locator(
      '[data-testid="poi-details"][data-variant="card"][aria-label*="Pasar Legi"]'
    )
    await expect(details.locator('img[alt*="Pasar Legi"]')).toBeVisible()
    await expect(details.locator('img[alt*="Pasar Legi"]')).toHaveAttribute(
      "src",
      /pasar-legi/
    )
  })

  test("uses the approved route names and Between Two Gates copy in every locale", async ({
    page
  }) => {
    test.setTimeout(90_000)
    const locales = [
      {
        path: "/kotagede-guide",
        titles: [
          "Royal Mataram Walk",
          "Kotagede Heritage Walk",
          "Kotagede Food Walk"
        ],
        betweenTwoGates: "Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
      },
      {
        path: "/id/kotagede-guide",
        titles: [
          "Jelajah Kerajaan Mataram",
          "Jelajah Warisan Kotagede",
          "Jelajah Kuliner Kotagede"
        ],
        betweenTwoGates: "Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
      },
      {
        path: "/nl/kotagede-guide",
        titles: [
          "Koninklijke Mataram-wandeling",
          "Kotagede-erfgoedwandeling",
          "Kotagede-culinaire wandeling"
        ],
        betweenTwoGates: "Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
      }
    ]

    for (const locale of locales) {
      await openGuide(page, locale.path)
      await expect(page.getByTestId("trail-royal")).toContainText(
        locale.titles[0]
      )
      await expect(page.getByTestId("trail-heritage")).toContainText(
        locale.titles[1]
      )
      await expect(page.getByTestId("trail-culinary")).toContainText(
        locale.titles[2]
      )

      await page
        .getByTestId("poi-itinerary")
        .locator('[data-poi-id="between-two-gates"]')
        .click()
      await expect(
        page.locator('[data-testid="poi-details"][data-variant="card"]')
      ).toHaveAttribute("aria-label", locale.betweenTwoGates)
    }
  })

  test("shows complete route descriptions and endpoints in every locale", async ({
    page
  }) => {
    test.setTimeout(60_000)
    await page.setViewportSize({ width: 320, height: 720 })
    for (const path of [
      "/kotagede-guide",
      "/id/kotagede-guide",
      "/nl/kotagede-guide"
    ]) {
      await openGuide(page, path)

      for (const trail of ["royal", "heritage", "culinary"]) {
        await page.locator(`[data-walk-id="${trail}"]`).click()
        await page
          .getByTestId("mobile-route-summary")
          .getByRole("button")
          .click()
        const dimensions = await page
          .getByTestId(`mobile-trail-description-${trail}`)
          .evaluate((element) => ({
            clientHeight: element.clientHeight,
            scrollHeight: element.scrollHeight
          }))

        expect(
          dimensions.scrollHeight,
          `${path} ${trail} description must not be clipped`
        ).toBeLessThanOrEqual(dimensions.clientHeight)
        await expect(
          page.getByTestId(`mobile-trail-endpoints-${trail}`)
        ).toBeVisible()
        await page.getByTestId("mobile-open-walks").click()
      }
      await expectNoDocumentOverflow(page)
    }
  })
})
