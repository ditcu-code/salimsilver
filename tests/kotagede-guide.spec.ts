import { expect, test, type Page } from "@playwright/test"
import * as guideData from "../lib/data/kotagede-guide"

type TrailMetric = (trail: guideData.WalkingTrail) => number

const EXPECTED_TRAIL_STOPS = {
  royal: [
    "salim-silver",
    "pasar-legi",
    "masjid-gedhe-mataram",
    "makam-raja",
    "sendang-seliran",
    "between-two-gates"
  ],
  merchant: ["salim-silver", "museum-kotagede", "omah-ugm", "gang-soka"],
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
  await page.goto(path)
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  await expect(page.getByTestId("kotagede-guide")).toBeVisible()
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
  test("uses the approved unique destination order for every loop", () => {
    for (const trail of guideData.WALKING_TRAILS) {
      expect(trail.stopIds).toEqual(EXPECTED_TRAIL_STOPS[trail.id])
      expect(new Set(trail.stopIds).size).toBe(trail.stopIds.length)
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

  test("keeps every route closed and within 30 metres of its stops", () => {
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
      expect(
        haversineMeters(coordinates.at(-1)!, guideData.SALIM_SILVER_LOCATION)
      ).toBeLessThanOrEqual(2)

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

  test("shows dismisses and reopens mobile place details", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openGuide(page)

    const map = page.getByTestId("kotagede-map-frame")
    const mobileDetails = page.locator(
      '[data-testid="poi-details"][data-variant="sheet"]'
    )

    await expect(map).toBeVisible()
    await expect(mobileDetails).toBeVisible()

    const mapBox = await map.boundingBox()
    const detailsBox = await mobileDetails.boundingBox()
    expect(mapBox).not.toBeNull()
    expect(detailsBox).not.toBeNull()
    expect(detailsBox!.y).toBeGreaterThan(mapBox!.y)
    expect(detailsBox!.y + detailsBox!.height).toBeLessThanOrEqual(
      mapBox!.y + mapBox!.height + 1
    )

    await mobileDetails.getByRole("button", { name: "Close details" }).click()
    await expect(mobileDetails).toHaveCount(0)

    await page.getByTestId("poi-itinerary").getByRole("button").nth(1).click()
    await expect(mobileDetails).toBeVisible()
  })

  test("keeps map controls available on phones", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openGuide(page)

    const map = page.getByTestId("kotagede-map-frame")
    const header = page.getByRole("banner")
    const reset = page.getByRole("button", { name: "Center on Salim Silver" })
    const locate = page.getByRole("button", { name: "Locate me" })

    await page
      .locator("[data-camera-state]")
      .waitFor({ state: "attached", timeout: 15_000 })
    await expect(reset).toBeVisible()
    await expect(locate).toBeVisible()
    await map.evaluate((element) => element.scrollIntoView({ block: "start" }))

    const mapBox = await map.boundingBox()
    const headerBox = await header.boundingBox()
    const resetBox = await reset.boundingBox()
    const locateBox = await locate.boundingBox()
    expect(mapBox).not.toBeNull()
    expect(headerBox).not.toBeNull()
    expect(resetBox).not.toBeNull()
    expect(locateBox).not.toBeNull()
    expect(resetBox!.width).toBeGreaterThanOrEqual(44)
    expect(resetBox!.height).toBeGreaterThanOrEqual(44)
    expect(resetBox!.x + resetBox!.width).toBeLessThanOrEqual(
      mapBox!.x + mapBox!.width
    )
    const headerBottom = headerBox!.y + headerBox!.height
    expect(resetBox!.y).toBeGreaterThanOrEqual(headerBottom + 8)
    expect(locateBox!.y).toBeGreaterThanOrEqual(headerBottom + 8)
  })

  test("keeps selected tablet marker between the header and details sheet", async ({
    page
  }) => {
    await page.setViewportSize({ width: 768, height: 900 })
    await useEmptyMapStyle(page)
    await openGuide(page)

    const map = page.getByTestId("kotagede-map-frame")
    const mapCamera = page.locator("[data-camera-state]")
    await expect(page.locator(".maplibregl-marker").first()).toBeVisible({
      timeout: 15_000
    })
    await expect(mapCamera).toHaveAttribute("data-camera-state", "idle")
    await page.getByTestId("poi-itinerary").getByRole("button").nth(1).click()
    await expect(mapCamera).toHaveAttribute("data-camera-state", "moving")
    await expect(mapCamera).toHaveAttribute("data-camera-state", "idle", {
      timeout: 5_000
    })

    const selectedMarker = page.locator(".maplibregl-marker:has(.ring-4)")
    const mobileDetails = page.locator(
      '[data-testid="poi-details"][data-variant="sheet"]'
    )
    await expect(selectedMarker).toHaveCount(1)
    await expect(mobileDetails).toBeVisible()
    await map.evaluate((element) => element.scrollIntoView({ block: "start" }))

    const markerBox = await selectedMarker.boundingBox()
    const detailsBox = await mobileDetails.boundingBox()
    const headerBox = await page.getByRole("banner").boundingBox()
    expect(markerBox).not.toBeNull()
    expect(detailsBox).not.toBeNull()
    expect(headerBox).not.toBeNull()
    expect(markerBox!.y).toBeGreaterThanOrEqual(
      headerBox!.y + headerBox!.height + 8
    )
    expect(markerBox!.y + markerBox!.height).toBeLessThanOrEqual(
      detailsBox!.y - 8
    )
  })

  test("keeps mobile place details inside fullscreen map", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openGuide(page)

    await page.getByRole("button", { name: "Open fullscreen map" }).click()
    await expect
      .poll(() => page.evaluate(() => document.fullscreenElement !== null))
      .toBe(true)

    const fullscreenContainsDetails = await page.evaluate(() => {
      const details = document.querySelector(
        '[data-testid="poi-details"][data-variant="sheet"]'
      )
      return Boolean(details && document.fullscreenElement?.contains(details))
    })
    expect(fullscreenContainsDetails).toBe(true)
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

test.describe("Kotagede walking loop experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await openGuide(page)
  })

  test("renders Merchant stops in the approved walking order", async ({
    page
  }) => {
    await page.getByTestId("trail-merchant").click()

    const stops = page.getByTestId("poi-itinerary").locator("[data-poi-id]")
    await expect(stops).toHaveCount(4)
    expect(
      await stops.evaluateAll((items) =>
        items.map((item) => item.getAttribute("data-poi-id"))
      )
    ).toEqual(["salim-silver", "museum-kotagede", "omah-ugm", "gang-soka"])
  })

  test("shows route description and geometry-derived trip metadata", async ({
    page
  }) => {
    await expect(page.getByTestId("trail-description-royal")).toBeVisible()
    await expect(page.getByTestId("trail-walking-royal")).toHaveText(
      "25 min walk"
    )
    await expect(page.getByTestId("trail-experience-royal")).toHaveText(
      "75–120 min visit"
    )
    await expect(page.getByTestId("trail-places-royal")).toHaveText("6 places")
    await expect(page.getByTestId("trail-round-trip-royal")).toHaveText(
      "Round trip"
    )
  })

  test("resets a hidden selection when a category replaces the active loop", async ({
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

  test("uses a neutral fallback instead of unrelated destination photography", async ({
    page
  }) => {
    await page
      .getByTestId("poi-itinerary")
      .locator('[data-poi-id="pasar-legi"]')
      .click()

    const details = page.locator(
      '[data-testid="poi-details"][data-variant="card"][aria-label*="Pasar Legi"]'
    )
    await expect(details.getByTestId("poi-image-fallback")).toBeVisible()
    await expect(details.locator('img[alt*="Pasar Legi"]')).toHaveCount(0)
  })

  test("uses accurate loop and Between Two Gates copy in every locale", async ({
    page
  }) => {
    const locales = [
      {
        path: "/kotagede-guide",
        titles: [
          "Royal Mataram Core",
          "Merchant Houses & Heritage Alleys",
          "Markets & Traditional Snacks"
        ],
        betweenTwoGates: "Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
      },
      {
        path: "/id/kotagede-guide",
        titles: [
          "Inti Kerajaan Mataram",
          "Rumah Saudagar & Lorong Pusaka",
          "Pasar & Jajanan Tradisional"
        ],
        betweenTwoGates: "Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
      },
      {
        path: "/nl/kotagede-guide",
        titles: [
          "Koninklijke Mataram-kernroute",
          "Koopmanshuizen & Erfgoedsteegjes",
          "Markten & Traditionele Snacks"
        ],
        betweenTwoGates: "Between Two Gates (Gang Rukunan, Kampung Alun-alun)"
      }
    ]

    for (const locale of locales) {
      await openGuide(page, locale.path)
      await expect(page.getByTestId("trail-royal")).toContainText(
        locale.titles[0]
      )
      await expect(page.getByTestId("trail-merchant")).toContainText(
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

  test("shows complete loop descriptions in every locale", async ({ page }) => {
    for (const path of [
      "/kotagede-guide",
      "/id/kotagede-guide",
      "/nl/kotagede-guide"
    ]) {
      await openGuide(page, path)

      for (const trail of ["royal", "merchant", "culinary"]) {
        const dimensions = await page
          .getByTestId(`trail-description-${trail}`)
          .evaluate((element) => ({
            clientHeight: element.clientHeight,
            scrollHeight: element.scrollHeight
          }))

        expect(
          dimensions.scrollHeight,
          `${path} ${trail} description must not be clipped`
        ).toBeLessThanOrEqual(dimensions.clientHeight)
      }
    }
  })
})
