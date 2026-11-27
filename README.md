# Cloakify

**Cloakify** is a privacy-first, 100% browser-based PII detection and data sanitization tool built with React, TypeScript, Vite, and Tailwind CSS.

Everything executes **entirely inside browser memory**—no backend servers, no databases, no external APIs, no cloud AI, and no telemetry or analytics.

---

## Key Capabilities

- **Zero-Network Guarantee**:
  - Enforces a strict production Content Security Policy (`connect-src 'none'`) in `dist/index.html` to block `fetch`, `XHR`, `WebSocket`, and `sendBeacon` at the browser level.
  - Self-hosts `@fontsource/inter`, `@fontsource/jetbrains-mono`, and `lucide-react` SVG icons locally.
  - Stores zero user data in `localStorage`, `sessionStorage`, `IndexedDB`, or cookies.
- **Modular Local PII Detection Engine**:
  - **Aadhaar Number** (12-digit + UIDAI **Verhoeff checksum** validation)
  - **Credit / Debit Cards** (13–19 digits + **Luhn mod-10** validation + network tagging)
  - **PAN Number** (Indian tax ID format + 4th-character entity type verification)
  - **Email Address** (RFC-aligned local/domain + TLD validation)
  - **Phone Number** (International E.164, Indian 10-digit, US/CA formatted numbers)
  - **IPv4 Address** (Strict `0–255` octet bounds + RFC1918/Loopback classification)
  - **Contextual PII (Heuristic)**: Person names & physical street/PIN/ZIP addresses anchored by inline labels, honorifics, and CSV column headers.
- **Format-Preserving Text & CSV Sanitization**:
  - Preserves whitespace, indentation, `\r\n` vs `\n` line endings, CSV delimiters (`,`, `;`, `\t`), quoted commas, escaped quotes `""`, and multiline cells.
  - Protects CSV header rows by default (configurable).
- **Premium Dark Navy Dashboard + Optional Eye-Care Modes**:
  - Dark navy styling (`#070B14`) with indigo-purple and cyan-blue accents, plus optional **Eye-Care Charcoal** and **Warm Dusk** presets.
  - Modular UI components: `Header`, `Sidebar`, `FileUploader`, `TextInput`, `DetectionSettings`, `DetectionResults`, `FindingList`, `BeforeAfterComparison`, and `DownloadPanel`.

---

## Getting Started

```bash
npm install
npm run dev
```

### Verification & Testing

```bash
# Run unit & UI integration tests
npm test

# Typecheck
npm run typecheck

# Build production bundle (with strict connect-src 'none' CSP)
npm run build
```

### How to Verify Zero Network Activity

1. Run `npm run build && npm run preview`.
2. Open browser DevTools → **Network** tab (filter by `Fetch/XHR`).
3. Load the sample `.csv` or upload a local file and download the sanitized output.
4. Confirm **0 outbound requests** occur during scanning, highlighting, or export—and note that the app works offline.

---

## Safety Limits & Architecture Docs

- **Max File Size**: 5 MB (`.txt` and `.csv` UTF-8 only; binary payloads are rejected)
- **Max Pasted Text**: 500,000 characters
- **Max CSV Rows**: 50,000 rows

See [docs/DETECTION_ENGINE.md](docs/DETECTION_ENGINE.md) for detailed detector rules, checksum algorithms, and known heuristic limitations.
