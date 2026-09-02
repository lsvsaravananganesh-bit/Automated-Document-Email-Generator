# Automated Document & Email Generator

A modular workflow for turning CSV/XLSX data into personalized documents and emails.

## Workflow

Upload → Parse → Validate → Preview → Supabase → Generate → PDF Service → Email API → Tracking

## Frontend architecture

- `app/upload/page.tsx` — upload UI
- `lib/file-parser.ts` — CSV/XLSX parsing
- `lib/validation.ts` — validation rules
- `app/preview/page.tsx` — data review
- `app/generate/page.tsx` — template selection and generation UI
- `app/email/page.tsx` — email configuration UI
- `app/tracking/page.tsx` — delivery history
- `components/` — reusable UI components
- `data/` — demo data only

## Current status

The frontend workflow is functional in demo mode. Supabase, PDF generation and email delivery are intentionally isolated for the next integration phases.

## Run locally

```bash
npm install
npm run dev
```
