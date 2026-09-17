/**
 * Eva overlay policy (vvedantb/eva):
 * - Cards/surfaces are tone only (no decorative hairline + shadow).
 * - Floating overlays use `smooth-shadow-ring-*` — never `border` + `shadow`
 *   on the same element.
 * - Form inputs keep borders; floating select/menu content uses the ring.
 */
export const overlayDialogClass = "border-none shadow-none smooth-shadow-ring-xl";

export const overlayPopoverClass =
  "border-none shadow-none bg-content1/95 backdrop-blur-md smooth-shadow-ring-lg";

export const overlayTooltipClass =
  "border-none shadow-none bg-content1/95 backdrop-blur-md smooth-shadow-ring-md";

export const overlayToastClass =
  "border-none shadow-none bg-content1/95 backdrop-blur-md smooth-shadow-ring-md";

export const overlayMenuClass = overlayPopoverClass;

export const overlayPopoverProps = {
  shadow: "none" as const,
  classNames: { content: overlayPopoverClass },
};

export const overlayModalClassNames = { base: overlayDialogClass };
