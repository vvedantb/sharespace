# Part 5: Mobile Responsiveness & Accessibility (1-2 min)

**[SCREEN: Show app on mobile viewport]**

> "ShareSpace follows mobile-first responsive design using Tailwind CSS breakpoints. The default styles target mobile, then we progressively enhance for larger screens using `md:` and `lg:` prefixes.
>
> For example, the marketplace grid uses `grid-cols-2` on mobile and `md:grid-cols-4` on desktop - so users see 2 columns on phones and 4 on tablets and above."

**[SCREEN: Toggle mobile menu on navbar]**

> "The navigation uses a hamburger menu on mobile with `md:hidden`, while the full nav links use `hidden md:flex` - completely swapping the UI at the breakpoint. The mobile menu includes a backdrop blur overlay for better UX."

**[SCREEN: Show messages page responsive behavior]**

> "Complex layouts like the messaging inbox stack vertically on mobile. We track a `mobileShowChat` state to toggle between the conversation list and the active chat - giving mobile users a native app-like experience."

**[SCREEN: Highlight an aria-label or focus state]**

> "For accessibility, all interactive elements have `aria-label` attributes for screen readers - the menu toggle, notification bell, and action buttons. We use semantic HTML with proper `button` and `Link` elements for keyboard navigation.
>
> Touch targets are sized appropriately with adequate padding, and text uses proper contrast ratios with our dark mode support."
