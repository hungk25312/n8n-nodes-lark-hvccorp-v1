# Architecture — n8n-nodes-lark-hvccorp-v1

> Package `n8n-nodes-lark-hvccorp-v1` — n8n community node for Lark/Feishu API.
> Forked from `zhgqthomas/n8n-nodes-feishu-lark`, maintained by hungk25312.

---

## Directory Structure

```
├── .github/workflows/ci-cd.yml   # CI/CD pipeline
├── credentials/                   # n8n credential definitions
│   ├── LarkTokenApi.credentials.ts    # Tenant Access Token (auto-refresh)
│   └── LarkOAuth2Api.credentials.ts   # OAuth2 PKCE (User Access Token)
├── nodes/
│   ├── Lark/                      # Main node implementations
│   │   ├── Lark.node.ts           # Action node (9 resources, ~136 operations)
│   │   ├── LarkTrigger.node.ts    # Trigger node (WebSocket-based)
│   │   ├── GenericFunctions.ts    # Shared API helpers
│   │   ├── lark_icon.svg
│   │   └── resource/              # Resource definitions + operations
│   │       ├── message.resource.ts
│   │       ├── Base.resource.ts
│   │       ├── Calendar.resource.ts
│   │       ├── Contacts.resource.ts
│   │       ├── Document.resource.ts
│   │       ├── Spreadsheet.reource.ts  # ⚠️ typo in filename
│   │       ├── Space.resource.ts
│   │       ├── task/
│   │       │   └── *.operation.ts
│   │       ├── wiki_spaces/
│   │       │   └── *.operation.ts
│   │       └── {resource}/        # Each resource has its own directory
│   │           └── *.operation.ts
│   ├── help/                      # Shared framework layer
│   │   ├── builder/               # Resource auto-discovery + UI generation
│   │   ├── description/           # Reusable n8n field definitions
│   │   ├── i18n/                  # Internationalization (en/zh)
│   │   ├── templates/             # HTML templates
│   │   ├── type/                  # Enums + interfaces
│   │   ├── utils/                 # HTTP, validation, streaming, webhook
│   │   └── wording/               # Re-export of i18n
│   └── lark-sdk/                  # Custom WebSocket SDK for Lark gateway
│       ├── handler/               # Event dispatch + caching
│       ├── proto-buf/             # Protobuf codec (pbbp2.Frame)
│       ├── utils/                 # AES cipher
│       └── ws-client/             # WebSocket lifecycle management
├── __tests__/                     # Jest tests
├── __mocks__/                     # Jest mocks (sanitize-html)
├── package.json
├── tsconfig.json
├── jest.config.js
└── gulpfile.js                    # Icon copy task
```

---

## Node Architecture

### Resource Pattern (Convention-over-Configuration)

Each resource follows a **two-file convention**:

**Resource definition** (`resource/{Name}.resource.ts`):
```typescript
export default {
    name: WORDING.ResourceMessage,   // i18n display name
    value: ResourceType.Message,     // enum string value
    order: 200,                      // display priority (higher = first)
} as ResourceOptions;
```

**Operation file** (`resource/{name}/Xxx.operation.ts`):
```typescript
export default {
    name: WORDING.OperationName,
    value: OperationType.OperationName,
    order: 200,
    options: [ ... ],               // n8n UI field definitions
    async call(this: IExecuteFunctions, index: number): Promise<IDataObject> {
        // Business logic — makes API calls
    },
} as ResourceOperation;
```

### Auto-Discovery Flow

```
Lark.node.ts
  └─ ResourceFactory.build(__dirname)
       ├─ glob("resource/*.js")           → load resource definitions
       └─ for each resource:
            glob("resource/{name}/*.js")  → load operation files
       └─ ResourceBuilder.build()
            ├─ Authentication selector (Tenant Token / User Token)
            ├─ Resource selector
            ├─ Operation selector (scoped to resource)
            └─ Operation properties (scoped to resource + operation)
```

### Execution Flow

```
Lark.execute()
  ├─ Read resource + operation from node parameters
  ├─ resourceBuilder.getCall(resource, operation) → call function
  ├─ For each input item:
  │    └─ callFunc.call(this, itemIndex) → API response
  └─ Handle output type (Single / Multiple / Binary)
```

---

## Resource Inventory

| Resource         | Value          | Order | Operations |
|------------------|----------------|-------|------------|
| Message          | `message`      | 200   | 19         |
| Base (Bitable)   | `base`         | 190   | 36         |
| Document         | `document`     | 180   | 10         |
| Calendar         | `calendar`     | 170   | 19         |
| Spreadsheet      | `spreadsheet`  | 160   | 24         |
| Space (Drive)    | `space`        | 150   | 8          |
| Contacts         | `contacts`     | 130   | 2          |
| Task             | `task`         | —     | 6          |
| Wiki Spaces      | `wiki_spaces`  | —     | 12         |

---

## Credentials

| Credential       | Internal Name      | Auth Method       | Auto-Refresh |
|------------------|--------------------|-------------------|--------------|
| `LarkTokenApi`   | `larkApi`          | Tenant Access Token | Yes (preAuthentication) |
| `LarkOAuth2Api`  | `larkOAuth2Api`    | OAuth2 PKCE        | Yes (built-in) |

Both support three base URL modes:
- **China** (Feishu): `https://open.feishu.cn`
- **Global** (Lark): `https://open.larksuite.com`
- **Custom**: User-provided URL

---

## i18n System

Two-layer system with locale detection:

```
N8N_DEFAULT_LOCALE env var
  ├─ "en" / "en-US" / "en_US" → English
  └─ everything else           → Chinese (zh)
```

- **WORDING** (`i18n/locales/`): Resource/operation display names
- **DESCRIPTIONS** (`i18n/descriptions/`): UI field labels

Both files per locale: `en.ts` and `zh.ts`. Default locale set in `i18n/types.ts`.

---

## Key Dependencies

| Package         | Purpose                                    |
|-----------------|--------------------------------------------|
| `glob`          | Dynamic resource/operation file discovery   |
| `ws`            | WebSocket client for Lark event triggers    |
| `protobufjs`    | Protobuf codec for Lark gateway wire format |
| `luxon`         | Timezone-aware date/time handling           |
| `form-data`     | Multipart file uploads                     |
| `sanitize-html` | HTML sanitization for webhook forms         |
| `isbot`         | Bot detection in webhook user-agent         |
| `uuid`          | Streaming message ID generation             |

---

## Build Pipeline

```bash
npm run build   # rimraf dist → tsc → gulp build:icons
npm test        # jest
npm run lint    # eslint nodes credentials package.json
```

**tsconfig.json**: strict mode, ES2019 target, commonjs, outDir `./dist/`

---

## CI/CD (`.github/workflows/ci-cd.yml`)

### Auto Release (push to main)
```
push to main → ci (lint+build+test) → release (bump patch → tag → publish npm → GitHub Release)
```

### Manual Release (workflow_dispatch)
```
manual trigger → ci → release-manual (bump selected type → tag → publish npm → GitHub Release)
```

### PR Check
```
pull_request → ci (lint+build+test only)
```

---

## Adding a New Resource

1. Add enum to `nodes/help/type/enums.ts`:
   ```typescript
   ResourceType = { ..., MyNewResource: 'myNewResource' }
   ```
2. Add wording keys to `nodes/help/i18n/locales/en.ts` and `zh.ts`
3. Create `nodes/Lark/resource/MyNewResource.resource.ts`
4. Create `nodes/Lark/resource/myNewResource/` directory
5. Add operation files: `Xxx.operation.ts`
6. Done — auto-discovered by `ResourceFactory`

## Adding a New Operation to Existing Resource

1. Add operation enum to `OperationType` in `enums.ts`
2. Add wording key to locale files
3. Create `nodes/Lark/resource/{resource}/Xxx.operation.ts`
4. Done — auto-discovered

---

## Known Issues

- `Spreadsheet.reource.ts` filename has typo (missing 's' in "resource")
- `help/wording/index.ts` is a backward-compat re-export of `help/i18n/`

---

## Version History

See [CHANGELOG.md](./CHANGELOG.md)
