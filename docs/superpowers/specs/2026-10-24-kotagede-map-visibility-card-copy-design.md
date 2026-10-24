# Kotagede Map Visibility and Card Copy Design

## Intent

Keep the selected map marker and map controls usable when the fixed site
header overlaps the map, while showing each walking loop description in full.

## Approved behavior

- On phone and tablet layouts, the selected marker must remain between the
  fixed header and the mobile details sheet with at least eight pixels of
  clearance from each.
- Reset and location controls must remain fully below the fixed header after
  the map is scrolled to the top of the viewport.
- Route-fit padding must not persist into later selected-place camera moves.
- English, Indonesian, and Dutch route descriptions must render without
  clipping or ellipsis.
- Existing routes, detail-sheet height, navigation, copy, and dependencies do
  not change.

## Approaches

1. **Header-aware camera and controls (selected):** measure the fixed header,
   treat the space between it and the details sheet as the usable map area,
   prevent fit padding from persisting, and place compact controls below the
   header. This fixes the underlying competing occlusions.
2. **CSS-only control shift:** moving controls would expose the buttons but
   leave the selected marker hidden, so it is incomplete.
3. **Shrink the details sheet or shorten copy:** this would sacrifice visitor
   information to mask layout problems and is therefore rejected.

For route cards, removing the line clamp is preferred over shortening the
verified descriptions or adding another disclosure interaction.
