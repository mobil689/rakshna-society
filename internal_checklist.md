# 🔒 Internal Execution Checklist
**For your eyes only — NOT for the client**

---

## Before Starting

- [ ] Client has approved the scope and signed off
- [ ] 50% advance received
- [ ] Access to their codebase (GitHub/zip/whatever)
- [ ] Access to their current server/data (for migration)
- [ ] Domain and DNS details confirmed
- [ ] Client's expected concurrent user count noted
- [ ] Number of mandis and FY databases identified

---

## Phase 1 — Technical Assessment

- [ ] Clone and run the app locally — verify it works
- [ ] Map all API routes and modules (use their tech doc as reference)
- [ ] Check `package.json` — run `npm audit` for vulnerabilities
- [ ] Review `.env` structure — list all required variables
- [ ] Check session config — confirm it's in-memory (flag as limitation)
- [ ] Check `adminDb.js` — confirm raw SQL endpoint exists (flag as critical risk)
- [ ] Check WebSocket implementation in `ws.js` — note the connection URL
- [ ] Check frontend for hardcoded URLs (`ws://`, `http://`) that will break
- [ ] Measure database size — how many mandis, how many FY databases
- [ ] Check backup mechanism — confirm it's Ctrl+C based (flag as inadequate)
- [ ] Write Assessment Report

---

## Phase 2 — AWS Infrastructure Setup

- [ ] Create AWS account (or get client's account access)
- [ ] **Enable MFA on root account** — non-negotiable
- [ ] Create IAM admin user — never use root for daily work
- [ ] Create VPC with public subnet
- [ ] Launch EC2 instance (decide size with client — t3.micro vs t3.small)
- [ ] Allocate Elastic IP → associate with EC2
- [ ] Configure Security Group:
  - [ ] Port 22 (SSH) → **your IP only**
  - [ ] Port 80 (HTTP) → 0.0.0.0/0 (redirect to HTTPS)
  - [ ] Port 443 (HTTPS) → 0.0.0.0/0
  - [ ] Port 3306 — **NOT exposed** (localhost only)
  - [ ] Port 8080 — **NOT exposed** (localhost only)
- [ ] Generate SSH key pair — store securely
- [ ] SSH into server — update OS packages
- [ ] Install `fail2ban`
- [ ] Disable password-based SSH login (key-only)
- [ ] Disable root SSH login
- [ ] Set up UFW/iptables as secondary firewall
- [ ] Set timezone to IST

---

## Phase 3 — Application Deployment

- [ ] Install Node.js v20 (use nvm or NodeSource)
- [ ] Install PM2 globally
- [ ] Clone/upload application code
- [ ] Create production `.env` file with strong passwords
- [ ] Set `.env` file permissions to 600
- [ ] Run `npm install --production`
- [ ] Start app with PM2 — test basic functionality
- [ ] Configure PM2 startup on boot (`pm2 startup`)
- [ ] Install Nginx
- [ ] Configure Nginx reverse proxy (port 443 → localhost:8080)
- [ ] **Configure Nginx WebSocket proxy:**
  ```
  location /ws {
      proxy_pass http://localhost:8080;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
      proxy_set_header Host $host;
  }
  ```
- [ ] Install SSL via Certbot (Let's Encrypt) — free
- [ ] Set up auto-renewal cron for SSL certificate
- [ ] Verify HTTP → HTTPS redirect works
- [ ] Verify all pages load correctly over HTTPS
- [ ] Verify WebSocket connects over `wss://`
- [ ] Test gate pass creation end-to-end
- [ ] Test all report pages
- [ ] Test login/logout cycle

---

## Phase 4 — Database Deployment & Backups

- [ ] Install MySQL 8.4
- [ ] Secure MySQL installation (`mysql_secure_installation`)
- [ ] Create dedicated database user (not root) for the app
- [ ] Import existing data (if migrating from LAN server)
- [ ] Verify all mandis and FY databases are accessible
- [ ] Test app connectivity to all databases
- [ ] **Set up automated backup cron job:**
  ```
  # Daily at 2 AM IST — dump all databases to /backups/
  0 2 * * * /usr/bin/mysqldump --all-databases | gzip > /backups/all_$(date +\%Y\%m\%d).sql.gz
  ```
- [ ] **Set up S3 backup upload** (aws cli sync to S3 bucket)
- [ ] Verify backup file is created and valid
- [ ] **Test restore from backup on a separate database** — confirm it works
- [ ] Set up backup retention (keep last 7 days locally, 30 days on S3)

---

## Phase 5 — Security Hardening

### Application-Level
- [ ] Verify bcrypt is used for all password hashing — ✅ (per tech doc)
- [ ] Verify parameterized SQL queries — ✅ (per tech doc, but spot-check)
- [ ] Check for XSS — is HTML properly escaped in all renders?
- [ ] Check session cookie flags: `httpOnly`, `secure`, `sameSite`
- [ ] Check if sessions have proper expiry enforcement
- [ ] **Flag: in-memory sessions** — recommend Redis/MySQL store
- [ ] **Flag: adminDb.js raw SQL endpoint** — recommend disabling or IP-restricting
- [ ] Check for rate limiting on login endpoint — likely missing, flag it
- [ ] Check CORS configuration
- [ ] Review error handling — no stack traces in production responses
- [ ] Run `npm audit` — document all findings

### Server-Level
- [ ] Verify SSH key-only access
- [ ] Verify fail2ban is active and configured
- [ ] Check open ports — only 22, 80, 443 externally
- [ ] Verify MySQL not accessible from outside
- [ ] Check file permissions on app directory
- [ ] Verify Node.js is NOT running as root
- [ ] Check Nginx security headers:
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-XSS-Protection: 1; mode=block`
  - [ ] `Strict-Transport-Security`
- [ ] Verify `.env` is not in git and not world-readable

### OWASP Top 10 Quick Check
- [ ] A01 — Broken Access Control → check adminDb, role middleware
- [ ] A02 — Crypto Failures → bcrypt ✅, check for any plaintext secrets
- [ ] A03 — Injection → parameterized queries ✅, spot-check 2-3 routes
- [ ] A04 — Insecure Design → in-memory sessions, Ctrl+C backups
- [ ] A05 — Security Misconfig → .env, server headers, default creds
- [ ] A06 — Vulnerable Components → npm audit results
- [ ] A07 — Auth Failures → no rate limiting, no account lockout
- [ ] A08 — Data Integrity → FY isolation is good
- [ ] A09 — Logging → check if login attempts and errors are logged
- [ ] A10 — SSRF → low risk, no outbound request features

### Write Security Report
- [ ] List all findings with severity (Critical / High / Medium / Low)
- [ ] Include recommended fixes for each finding
- [ ] Clearly separate "fixed during this engagement" vs "recommended for future"

---

## Phase 6 — Production Readiness

- [ ] Verify PM2 auto-restarts app on crash
- [ ] Verify PM2 starts app on server reboot
- [ ] Verify backup cron runs on schedule
- [ ] Verify SSL certificate auto-renewal
- [ ] Set up basic server monitoring (CloudWatch basic or htop/uptime check)
- [ ] Verify all report endpoints return correct data
- [ ] Test trader portal login flow
- [ ] Test WebSocket live updates (create GP → check counter on another browser)
- [ ] Simulate server reboot — verify everything comes back up
- [ ] Sign off on Production Readiness Checklist

---

## Phase 7 — Documentation & Handoff

- [ ] AWS Architecture Overview (diagram + description)
- [ ] Deployment Procedures (how to deploy a code update)
- [ ] Backup & Restore Procedures (step-by-step)
- [ ] Server Config Notes (what's installed, where, how)
- [ ] Environment Configuration Guide (.env variables explained)
- [ ] Maintenance Runbook (common tasks: restart, check logs, update SSL)
- [ ] Deliver all documents to client
- [ ] Walk the client through the documentation (call/screen share)

---

## After Completion

- [ ] Collect remaining 50% payment
- [ ] Hand over SSH key / access credentials securely
- [ ] Confirm client can independently restart/manage the server
- [ ] Remove your personal SSH key if client doesn't want ongoing access
- [ ] Archive your own copy of all deliverables

---

> **Remember:** When you find issues during assessment (adminDb endpoint, in-memory sessions, no rate limiting, etc.) — **document them as findings in your report, don't silently fix them.** Your scope is deployment + hardening + reporting. Fixes beyond that are separate billable work.
