# GutterCare Customer Experience

This folder contains the current GutterCare customer-facing design work.

## Landing page

`landing/index.html` is a standalone responsive page introducing free GutterCare enrollment and scheduled gutter cleaning.

Open it directly in a browser or serve the repository with any static web server.

## Quote and enrollment flow

`quote/` is the responsive React and TypeScript prototype for:

1. Reviewing the customer's GutterCare quote.
2. Adding payment details or selecting **Do this later**.
3. Confirming enrollment and any remaining payment requirement.

Run it locally:

```bash
cd guttercare/quote
npm install
npm run dev
```

The quote uses fictional customer, property, and card information. It does not process or store payments.
