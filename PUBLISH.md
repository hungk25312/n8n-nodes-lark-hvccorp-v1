# Hướng dẫn Publish n8n-nodes-lark-hvccorp-v1 lên npm

## Prerequisites

### 1. npm Account

- Đăng ký tài khoản tại https://www.npmjs.com
- Xác thực email

### 2. Tạo npm Access Token

1. Login npm: `npm login`
2. Vào https://www.npmjs.com/settings/tokens
3. Tạo **Automation** token (dùng cho CI/CD, không cần 2FA)
4. Copy token

### 3. Thêm NPM Token vào GitHub Secrets

1. Vào repo `https://github.com/zhgqthomas/n8n-nodes-feishu-lark/settings/secrets/actions`
2. Click **New repository secret**
3. Name: `NPM_TOKEN`
4. Value: paste token từ npm
5. Click **Add secret**

---

## Cách 1: Publish thủ công (Local)

```bash
# 1. Build
npm run build

# 2. Kiểm tra dist/
ls dist/

# 3. Dry run - xem file nào sẽ được publish (không upload)
npm pack --dry-run

# 4. Login npm (nếu chưa login)
npm login

# 5. Publish
npm publish --access public
```

### Version khi publish

```bash
# Tăng patch version (0.11.1 -> 0.11.2)
npm version patch

# Tăng minor version (0.11.1 -> 0.12.0)
npm version minor

# Tăng major version (0.11.1 -> 1.0.0)
npm version major

# Sau khi npm version, push tag lên GitHub
git push --follow-tags
```

---

## Cách 2: Auto publish qua GitHub Actions (Recommended)

### Flow tự động

```
Push tag v*  →  CI (lint + build + test)  →  Publish to npm  →  GitHub Release
```

### Bước thực hiện

```bash
# 1. Commit các thay đổi
git add .
git commit -m "fix: move glob to dependencies, fix ws-client bugs"

# 2. Tăng version + tạo tag
npm version patch   # hoặc minor/major

# 3. Push code + tag
git push --follow-tags
```

GitHub Actions sẽ tự động:
- Run lint + build + test
- Publish lên npm
- Tạo GitHub Release với release notes

### Trigger manually

Vào **Actions** tab → **CI/CD Pipeline** → **Run workflow** → chọn release type → **Run workflow**

---

## Cách 3: Publish bằng workflow_dispatch

1. Vào **Actions** tab trên GitHub
2. Chọn **CI/CD Pipeline**
3. Click **Run workflow**
4. Chọn `patch`, `minor`, hoặc `major`
5. Click **Run workflow**

Workflow sẽ tự bump version, commit, push tag, publish npm.

---

## Cài đặt trên n8n

Sau khi publish thành công, user cài đặt trên n8n:

```bash
# Trong thư mục n8n
npm install n8n-nodes-lark-hvccorp-v1

# Hoặc cài qua n8n UI:
# Settings → Community Nodes → Install → nhập "n8n-nodes-lark-hvccorp-v1"
```

---

## Troubleshooting

### Lỗi "403 Forbidden" khi publish

```bash
# Kiểm tra đã login đúng account chưa
npm whoami

# Re-login
npm login
```

### Lỗi "You cannot publish over the previously published version"

```bash
# Tăng version trước khi publish
npm version patch
npm publish --access public
```

### Lỗi "npm ERR! code ENEEDAUTH"

Chưa设置 NPM_TOKEN. Xem Prerequisites ở trên.

### Package không load được trên n8n

Kiểm tra `package.json`:
- `files` field phải bao gồm `"dist"`
- `n8n` field phải đúng đường dẫn credentials và nodes
- `dependencies` phải bao gồm tất cả runtime dependencies (không được để trong devDependencies)
