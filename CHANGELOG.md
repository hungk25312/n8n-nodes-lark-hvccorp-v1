# Changelog

All notable changes to `n8n-nodes-lark-hvccorp-v1` will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.6] — 2026-07-12

### Fixed
- CI/CD: merged auto-tag + release into single job (token-created push was not triggering new workflow runs)

## [1.0.5] — 2026-07-12

### Fixed
- Default locale changed from `zh` (Chinese) to `en` (English) — UI text now displays in English by default

## [1.0.4] — 2026-07-12

### Changed
- Translated all Chinese UI text to English across ~43 files (wiki_spaces, resource operations, LarkTrigger, properties, errors)

## [1.0.3] — 2026-07-12

### Added
- CI/CD auto-tag + release workflow on push to main

## [1.0.2] — 2026-07-12

### Fixed
- Repository URL to match GitHub repo for npm provenance

## [1.0.1] — 2026-07-12

### Fixed
- TypeScript build error with `setSignatureValidationRequired`
- Jest ESM/CJS compatibility (sanitize-html mock)
- Node.js 22 in CI

### Added
- GitHub Actions CI/CD workflow (lint + build + test)

## [1.0.0] — 2026-07-12

### Changed
- Package renamed from `n8n-nodes-feishu-lark` to `n8n-nodes-lark-hvccorp-v1`

### Fixed
- `glob` moved from `devDependencies` to `dependencies` (was causing module loading error)
- Removed unnecessary `crypto` npm package (Node.js built-in)
- `pullConnectConfig()` error handling in `ws-client/index.ts` — now returns `false` on all error codes
- `biz_rt` header: was `startTime - endTime` (negative), corrected to `endTime - startTime`
- `DataCache` timer leak: `setInterval` now cleared on `clear()`

---

## Upstream History (n8n-nodes-feishu-lark)

### [0.11.1]

### Fixed
- `setSignatureValidationRequired` compatibility with newer n8n versions

### [0.11.0]

### Changed
- Better English and Chinese support
- Binary data output type, JSON & binary data output

### [0.10.0]

### Removed
- MCP (unstable)

### [0.9.19]

### Fixed
- Missing wording

### [0.9.18]

### Changed
- Version changed to 2

### [0.9.17]

### Added
- Bot menu event on LarkTrigger v1.1
- Interactive card node
- Toast option for callback event
- Enhanced sendAndWait node

### Removed
- Card handler
- Version control on LarkTrigger

### [0.9.16]

### Changed
- Resource locator default value to ID

### [0.9.15]

### Added
- Subscribe events when using Lark trigger

### [0.9.14]

### Fixed
- Rename content back for message

### [0.9.13]

### Fixed
- Rename JSON name back to body

### [0.9.12]

### Fixed
- JSON parse errors

### [0.9.11]

### Fixed
- `NodeConnectionTypes` not working
- Removed retired doc type

### [0.9.10]

### Fixed
- Bug in get media download URL

### Added
- Custom domain in credentials

### [0.9.9]

### Fixed
- Bump axios and n8n-workflow

### [0.9.8]

### Added
- Two media file download nodes
- Refined media download operations

### [0.9.7]

### Added
- Upload media operation
- Refined media upload operation

### [0.9.6]

### Added
- Upload file to space operation
- Parse rich text for message type post
- Return binary data for all file download related Lark API

### [0.9.5]

### Fixed
- Error handle for streaming
- Not updating final message during streaming

### [0.9.4]

### Removed
- McpOAuth credentials

### [0.9.3]

### Fixed
- Dependency errors

### [0.9.2]

### Fixed
- Dependency errors

### [0.9.1]

### Fixed
- Dependency errors

### [0.9.0]

### Added
- Send streaming message operation

### Fixed
- Throw error when get image or file using Lark API
- Remove download resource feature in parse content

### Removed
- LarkMcpTrigger (replaced by MCP operation)

### [0.8.1]

### Changed
- Using peerDependencies to reduce duplicate dependencies

### [0.8.0]

### Added
- LarkTrigger v2 support for Webhook
- Webhook message parse operation

### [0.7.1]

### Added
- Workflow static data instead of custom data for send and wait

### [0.7.0]

### Added
- Spreadsheet operations

### Fixed
- API error when get calendar event list

### [0.6.4]

### Fixed
- API call error

### [0.6.3]

### Added
- Send and wait

### [0.6.2]

### Fixed
- Lark Triggered multiple time

### [0.6.1]

### Added
- Update card message

### [0.6.0]

### Added
- Calendar operations
- Multi file type search
- Search files operation

### Fixed
- Lark trigger base URL

### [0.5.0]

### Added
- Lark user token credentials
- Support for Lark user token

### [0.4.4]

### Fixed
- Request error not working
- Parse error data

### [0.4.3]

### Fixed
- Can't find zod bug

### [0.4.2]

### Fixed
- Request error not working

### [0.4.1]

### Fixed
- Can't find zod bug

### [0.4.0]

### Added
- Space resource and operations
- File get list operation
- Convert to block content operation
- Contact operations refined

### [0.3.3]

### Fixed
- Refresh token bug

### [0.3.2]

### Fixed
- Refresh token bug (temporary fix)

### [0.3.1]

### Fixed
- Lint

### [0.3.0]

### Added
- Image upload operation
- File upload and download operations

### [0.2.6]

### Added
- Search from list for app token, table ID, table view

### [0.2.5]

### Added
- Notice on create base app
- Refined base app copy and create
- Refined app getinfo and update

### [0.2.4]

### Fixed
- PageToken empty bug
- Bug in base record search

### [0.2.3]

### Added
- Download resource option in parse message content operation

### [0.2.2]

### Added
- Comments
- Renamed operations values across all resources

### [0.2.1]

### Fixed
- Rename get content resource value
- Rename messaging to message

### [0.2.0]

### Added
- Parse message content operation
- Dynamic outputs for parse message content

### [0.1.3]

### Changed
- Updated Lark node categories

### [0.1.2]

### Added
- Default version on MCP and base node

### [0.1.1]

### Added
- Subtitle and default version for Lark Trigger

### [0.1.0]

### Added
- Initial release
