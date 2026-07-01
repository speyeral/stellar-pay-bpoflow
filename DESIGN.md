---
name: Stellar Equity
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5b5e68'
  on-secondary: '#ffffff'
  secondary-container: '#e0e2ee'
  on-secondary-container: '#61646e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#201924'
  on-tertiary-container: '#8b808e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e0e2ee'
  secondary-fixed-dim: '#c4c6d2'
  on-secondary-fixed: '#181b24'
  on-secondary-fixed-variant: '#434750'
  tertiary-fixed: '#ecdeee'
  tertiary-fixed-dim: '#cfc2d2'
  on-tertiary-fixed: '#201924'
  on-tertiary-fixed-variant: '#4d4450'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  stellar-blue-pastel: '#DDE3F0'
  stellar-purple-pastel: '#EBE4F2'
  data-border: '#EEEEEE'
  status-success-bg: '#E8F5E9'
  status-pending-bg: '#FFFDE7'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  unit: 8px
---

## Brand & Style
The design system embodies a sophisticated, high-fidelity aesthetic tailored for global payroll management. It balances the precision of financial technology with the heritage and trust of established institutional banking. 

The style is **Modern Minimalism** with a focus on editorial clarity. It utilizes a vast amount of whitespace to reduce the cognitive load associated with complex payroll data. The interface feels light and airy, avoiding the "dense grid" cliché of traditional enterprise software. By blending monochrome foundations with soft, pastel-tinted accents, the design system projects an image of calm authority and effortless global connectivity.

## Colors
The palette is rooted in a high-contrast monochrome base. **Pure White (#FFFFFF)** and **Deep Charcoal (#0F0F0F)** establish the primary hierarchy, ensuring maximum legibility for financial figures.

To differentiate from standard corporate tools, the design system utilizes muted, pastel versions of the Stellar brand colors as functional accents. 
- **Primary:** Deep Charcoal used for text and primary actions.
- **Secondary/Tertiary:** Soft Blue and Purple pastels used for background washes, secondary buttons, and category differentiation.
- **Neutral:** A range of soft greys and near-whites to define UI boundaries without introducing visual noise.

## Typography
The typographic strategy uses a "Dual-Tone" approach to balance heritage with utility. 

**Source Serif 4** is the display face. Its sophisticated, literary character is used for headings and key financial totals to convey a sense of "Established Trust" and institutional permanence. 

**Inter** serves as the workhorse for the UI. It provides exceptional legibility for data-heavy tables, forms, and labels. Small labels and data points should utilize slightly increased letter-spacing for clarity at small scales. Numerical data should be rendered with tabular lining (tabular-nums) to ensure columns of figures align perfectly.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. On desktop, content is contained within a 1280px central track to maintain readability. On smaller screens, the layout becomes fluid with 16px side margins.

The spacing rhythm is based on an **8px grid**. Generous vertical padding (48px - 64px) is encouraged between major sections to emphasize the "airy" feel. Data tables should use a "Comfortable" density setting by default, with at least 16px of vertical padding per row, allowing the white space to act as a separator rather than heavy lines.

## Elevation & Depth
This design system avoids heavy shadows and deep stacking. Depth is primarily communicated through **Tonal Layering** and **Subtle Outlines**.

- **Surface Tiers:** The main background is pure white. Secondary containers (like sidebar or cards) use a soft grey or pastel wash.
- **Shadows:** Only used for floating elements like dropdowns or active modals. These shadows are "Ambient": very large blur (32px+), low opacity (4-6%), and slightly tinted with the primary charcoal color.
- **Borders:** Thin, 1px borders in a very light grey (#EEEEEE) define the structure of data tables and input fields, maintaining a "technical drawing" precision.

## Shapes
Shapes are disciplined and "Soft-Square." A minimal radius of 4px (Soft) is applied to buttons, input fields, and cards. This slight rounding prevents the UI from feeling aggressive while maintaining the professional, "architectural" look of a global financial tool. Large containers like modals or primary dashboard cards may use up to 8px (Large) to feel more approachable.

## Components
- **Buttons:** Primary buttons are solid Deep Charcoal with white text. Secondary buttons use the pastel Blue or Purple washes with charcoal text. Ghost buttons use a 1px border.
- **Data Tables:** These are the heart of the system. They feature no vertical lines. Horizontal lines are 1px, #EEEEEE. Headers are uppercase `label-sm` in a medium grey.
- **Status Indicators:** Use "Pill" shapes with the pastel success/pending colors. Text should be a darker shade of the background color for high contrast and accessibility.
- **Input Fields:** Clean, bottom-border only or very light 4-sided borders. Labels sit above the field in `label-md`.
- **Navigation:** A minimalist vertical sidebar on desktop using icons and `label-md`. Active states are indicated by a subtle pastel background block rather than a high-contrast highlight.
- **Cards:** Used for grouping related payroll data. They should have a 1px border and no shadow, creating a "flat but framed" look.