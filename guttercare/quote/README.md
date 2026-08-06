# GutterCare Enrollment Local Prototype

Responsive React and TypeScript prototype for the customer GutterCare
enrollment journey.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:4174/`.

The prototype includes the welcome, plan review, payment setup, and
confirmation screens. Customer, property, quote, and payment information is
fictional. The local form does not process or store card information. Customers
may also enroll with “Do this later,” with clear notice that payment details are
required at least five days before service.

The plan-review fixture models the intended quote logic:

- Gutter assets with a saved `Size` use that value as Quote Line Item quantity.
- Price is quantity × hidden complexity × unit price.
- Missing gutter size falls back to `Account.House_Size` and an Instant Price
  metadata quantity, and the resulting asset is marked `Estimated`.
- GutterCare displays as a separate `$0.00` product.

## Design workflow

1. Iterate locally in `src/App.tsx` and `src/estimateDetailWebV2.css`.
2. Review desktop and mobile behavior locally.
3. Port approved layout and style changes into `force-app/main/default/lwc/estimateDetailWebV2`.
4. Run the focused V2 Jest suite and validate the Salesforce component.
5. Deploy V2 to QA and wire only the intended QA preview surface after approval.

The React app is a design surface, not Salesforce production metadata.
Salesforce data access, Apex calls, quote acceptance, payment processing, and
Experience Cloud routing stay in the production implementation.
