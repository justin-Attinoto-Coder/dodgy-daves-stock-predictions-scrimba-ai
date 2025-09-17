# Changelog

## 2025-09-17

### Features Added
- Added remove (×) button next to each ticker in Dodgy Dave so users can delete tickers before generating a report.

### Bug Fixes & Improvements
- Fixed all TypeScript and ESLint errors for Render.com deployment:
  - Removed all `any` type usages in error handling, replaced with safe type checks.
  - Escaped apostrophes in JSX (`Dodgy Dave&apos;s Stock Predictions`) everywhere.
  - Removed unused variables in error handlers.
  - Moved `"use client"` directive to the very top of all client components.
  - Replaced `<img>` tags with Next.js `<Image />` for optimized images.
  - Removed unused imports.
- Improved error handling for unknown and Error types in API routes and pages.
- Ensured browser tab titles and meta descriptions are set per page via `head.tsx`.

### UI Consistency
- Enhanced UI robustness and user experience across all apps.

---
For earlier changes, see commit history in GitHub.
