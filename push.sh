#!/bin/bash
# Chạy script này để push lên GitHub
# Usage: bash push.sh YOUR_GITHUB_TOKEN

if [ -z "$1" ]; then
  echo "Usage: bash push.sh YOUR_GITHUB_TOKEN"
  echo ""
  echo "Tạo token tại: https://github.com/settings/tokens"
  echo "Quyền cần chọn: repo (full)"
  exit 1
fi

TOKEN=$1
REPO="hungk25312/n8n-nodes-lark-hvccorp-v1"

git remote set-url origin "https://${TOKEN}@github.com/${REPO}.git"
git push -u origin main

echo ""
echo "Done! Xem repo tại: https://github.com/${REPO}"
