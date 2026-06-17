# Agent Guide

This repository is a Vite + React demo personal homepage. It intentionally contains a few realistic, non-fatal bugs for Agent bug-fix validation, so only fix behavior that the user asks you to fix or that is required for your task.

## Setup

```bash
npm install
npm run dev
```

Run checks before proposing changes:

```bash
npm test
npm run build
```

## GitHub MR / PR Workflow

The GitHub remote is expected to be:

```bash
git@github.com:wadxm/demo-project
```

Use short-lived branches with the `codex/` prefix:

```bash
git checkout main
git pull --ff-only origin main
git checkout -b codex/<short-fix-name>
```

After editing, verify and commit:

```bash
npm test
npm run build
git status --short
git add <changed-files>
git commit -m "fix: <short description>"
git push -u origin codex/<short-fix-name>
```

Open a GitHub pull request against `main`:

```bash
gh pr create --base main --head codex/<short-fix-name> --title "fix: <short description>" --body "<summary and tests>"
```

If using the GitHub connector instead of `gh`, create a pull request from `codex/<short-fix-name>` into `main` in `wadxm/demo-project`.

## Production Deploy

Production host:

```bash
root@www.xiongdianpku.com
```

Production domain:

```bash
https://demo.xiongdianpku.com
```

Build locally, upload the static files, then reload nginx:

```bash
npm ci
npm run build
ssh root@www.xiongdianpku.com "mkdir -p /var/www/demo.xiongdianpku.com"
rsync -az --delete dist/ root@www.xiongdianpku.com:/var/www/demo.xiongdianpku.com/
ssh root@www.xiongdianpku.com "nginx -t && systemctl reload nginx"
```

The nginx server block should live at:

```bash
/etc/nginx/sites-available/demo.xiongdianpku.com
```

Expected server block:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name demo.xiongdianpku.com;

    location /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name demo.xiongdianpku.com;

    root /var/www/demo.xiongdianpku.com;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/demo.xiongdianpku.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/demo.xiongdianpku.com/privkey.pem;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|png|jpg|jpeg|gif|svg|webp|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
```

If the certificate is missing or expired, issue or renew it on the server:

```bash
ssh root@www.xiongdianpku.com "mkdir -p /var/www/letsencrypt && certbot certonly --webroot -w /var/www/letsencrypt -d demo.xiongdianpku.com --agree-tos --email admin@xiongdianpku.com --non-interactive"
```

Then reload nginx:

```bash
ssh root@www.xiongdianpku.com "nginx -t && systemctl reload nginx"
```
