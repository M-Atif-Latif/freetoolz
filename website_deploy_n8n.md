# FreeToolz Deployment Guide with n8n

This guide gives you two complete parts:

1. **Initial deployment**
2. **One-click update with n8n**

After this setup, your normal workflow will be:

1. change code on your computer
2. push to GitHub
3. click one button in n8n
4. website updates automatically

---

## Part 1: Initial Deploy

### Step 1: Open your VPS terminal

In Hostinger, go to:

- `VPS`
- `Docker Manager`
- `Terminal`

---

### Step 2: Prepare the VPS folders and install requirements

Copy and paste this full block into the terminal:

```bash
mkdir -p /opt/freetoolz/repo
mkdir -p /opt/freetoolz/site
mkdir -p /opt/freetoolz/nginx
mkdir -p /opt/freetoolz/scripts

apt update
apt install -y git curl rsync ca-certificates

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi
```

What this does:

- creates folders for your website
- installs Git
- installs Node.js
- installs rsync for syncing built files

---

### Step 3: Create the Nginx config file

Copy and paste this into the terminal:

```bash
cat > /opt/freetoolz/nginx/default.conf <<'EOF'
server {
    listen 80;
  server_name freetoolz.cloud www.freetoolz.cloud;

    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ $uri/index.html /index.html;
    }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    }

  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
EOF
```

What this does:

- tells Nginx how to serve your static site
- makes React routes work
- adds cache rules for CSS, JS, images, and fonts

---

### Step 4: Create the deploy script on the VPS

Copy and paste this into the terminal:

```bash
cat > /opt/freetoolz/scripts/deploy.sh <<'EOF'
#!/usr/bin/env bash
set -Eeuo pipefail

APP_ROOT="/opt/freetoolz"
REPO_DIR="$APP_ROOT/repo"
SITE_DIR="$APP_ROOT/site"
BRANCH="main"
REPO_URL="https://github.com/M-Atif-Latif/freetoolz.git"

if [ ! -d "$REPO_DIR/.git" ]; then
  rm -rf "$REPO_DIR"
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
git fetch --all --prune
git reset --hard "origin/$BRANCH"

npm ci
npm run build

rsync -a --delete "$REPO_DIR/dist/" "$SITE_DIR/"

echo "Deployment completed successfully"
EOF

chmod +x /opt/freetoolz/scripts/deploy.sh
```

What this does:

- clones your GitHub repo the first time
- pulls the latest code on every deploy
- installs dependencies
- builds the website
- copies the final files into the live folder

---

### Step 5: Run the first deployment manually

Now run this command:

```bash
/opt/freetoolz/scripts/deploy.sh
```

Wait until it finishes.

If it works, your website files are now inside:

```bash
/opt/freetoolz/site
```

---

### Step 6: Open Docker Manager Compose

In Hostinger, go to:

- `Docker Manager`
- `Compose`

Open your project:

- `freetoolz-web`

---

### Step 7: Replace the full YAML with this

Delete everything in the YAML editor and paste this:

```yaml
services:
  freetoolz-web:
    image: nginx:alpine
    container_name: freetoolz-web
    restart: unless-stopped
    volumes:
      - /opt/freetoolz/site:/usr/share/nginx/html:ro
      - /opt/freetoolz/nginx/default.conf:/etc/nginx/conf.d/default.conf:ro
    labels:
      - traefik.enable=true
      - traefik.http.routers.freetoolz.rule=Host(`freetoolz.cloud`) || Host(`www.freetoolz.cloud`)
      - traefik.http.routers.freetoolz.entrypoints=websecure
      - traefik.http.routers.freetoolz.tls=true
      - traefik.http.services.freetoolz.loadbalancer.server.port=80
      - traefik.docker.network=traefik
    networks:
      - traefik

networks:
  traefik:
    external: true
```

Important:

- do **not** add `ports:`
- do **not** connect it to `n8n_default`
- do **not** connect it to `n8n-9qnz_default`
- it should use only the external `traefik` network

---

### Step 8: Click Deploy

After pasting the YAML:

1. click `Deploy`
2. wait until the project shows as running

---

### Step 8.5: Apply Nginx config updates on VPS (exact commands)

When you change `/opt/freetoolz/nginx/default.conf`, run this exact sequence in your VPS terminal:

```bash
docker exec freetoolz-web nginx -t
docker restart freetoolz-web
docker logs freetoolz-web --tail 100
curl -I https://freetoolz.cloud/json-formatter
```

Expected result:

- `nginx -t` returns `syntax is ok` and `test is successful`
- `curl` returns `HTTP/2 200` (or `HTTP/1.1 200`)

If `nginx -t` fails, do not restart. Fix `default.conf` first, then run the same sequence again.

For n8n one-click updates, add an `SSH` node with the same commands after deployment so route checks are automatic.

---

### Step 9: Test the container on the VPS

Go back to the Hostinger terminal and run these commands one by one:

```bash
docker ps
```

```bash
docker logs freetoolz-web --tail 100
```

```bash
curl -I http://127.0.0.1:80
```

If the container is healthy, the local curl should return HTTP `200`.

---

### Step 10: Test the live website

Open:

- `https://freetoolz.cloud`
- `https://www.freetoolz.cloud`

Important:

- the missing `Open` button is not a problem in this setup
- Traefik handles the public access
- your real test is whether the domain opens successfully

---

## Part 2: One-Click Update with n8n

After the first deployment works, set up n8n so you can update the website with one click.

---

### Step 1: Create an SSH key on your computer

On your computer, open PowerShell or Git Bash and run:

```bash
ssh-keygen -t ed25519 -C "n8n-freetoolz-deploy" -f ./n8n_freetoolz_deploy
```

This creates two files:

- `n8n_freetoolz_deploy`
- `n8n_freetoolz_deploy.pub`

---

### Step 2: Add the public key to your VPS

Open the file `n8n_freetoolz_deploy.pub` and copy all of its contents.

Now open Hostinger terminal and run:

```bash
mkdir -p /root/.ssh
chmod 700 /root/.ssh
echo 'PASTE_YOUR_PUBLIC_KEY_HERE' >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```

Replace this:

```bash
PASTE_YOUR_PUBLIC_KEY_HERE
```

with the full text from your `.pub` file.

---

### Step 3: Create SSH credentials in n8n

Open your n8n app.

Go to:

- `Credentials`
- `New Credential`
- `SSH`

Fill it like this:

- Host: `72.61.113.236`
- Port: `22`
- Username: `root`
- Authentication: `Private Key`

In the private key field, paste the full contents of:

- `n8n_freetoolz_deploy`

Then:

1. save the credential
2. test the connection

If the test succeeds, n8n can log in to your VPS.

---

### Step 4: Create the one-click workflow in n8n

In n8n:

1. click `New Workflow`
2. add node `Manual Trigger`
3. add node `SSH`
4. connect `Manual Trigger` to `SSH`

In the SSH node:

- select your SSH credential
- use this command:

```bash
/opt/freetoolz/scripts/deploy.sh
```

Now save the workflow.

Suggested workflow name:

```text
FreeToolz Deploy
```

---

### Step 5: Add a health check after deployment

This is recommended so you know the site is really online.

Add one more node:

- `HTTP Request`

Connect it after the SSH node.

Your flow becomes:

1. `Manual Trigger`
2. `SSH`
3. `HTTP Request`

Configure the HTTP Request node like this:

- Method: `GET`
- URL: `https://freetoolz.cloud`

Save again.

Now when you click the workflow:

1. n8n connects to your VPS
2. runs the deploy script
3. rebuilds the site
4. updates the live files
5. checks the website URL

---

### Step 6: Use the one-click update process

Every time you change your website code, do this:

#### On your computer

```bash
git add .
git commit -m "update website"
git push origin main
```

#### In n8n

1. open the `FreeToolz Deploy` workflow
2. click `Execute Workflow`

That is your one-click update.

Important:

- you must push to GitHub first
- if you do not push first, n8n will deploy the old code from GitHub

---

## Daily Update Workflow

This is your normal process from now on:

### Step 1

Make changes in your project on your computer.

### Step 2

Commit and push:

```bash
git add .
git commit -m "your update message"
git push origin main
```

### Step 3

Open n8n.

### Step 4

Open the workflow:

```text
FreeToolz Deploy
```

### Step 5

Click:

```text
Execute Workflow
```

### Step 6

Wait for the workflow to finish.

### Step 7

Open:

- `https://freetoolz.cloud`

and confirm the update is live.

---

## Optional: Auto Deploy Instead of One Click

If later you want deployment to happen automatically after every GitHub push:

1. replace the `Manual Trigger` node with `GitHub Trigger`
2. set the event to `push`
3. filter to the `main` branch
4. keep the same SSH deploy command

Then the process becomes:

1. edit code
2. push to GitHub
3. site deploys automatically

---

## Troubleshooting

### If the workflow fails in n8n

Run this manually on the VPS:

```bash
/opt/freetoolz/scripts/deploy.sh
```

If it fails there too, the problem is on the server side, not n8n.

---

### If the website still does not open

Run these on the VPS:

```bash
docker logs freetoolz-web --tail 100
```

```bash
docker ps
```

```bash
curl -I http://127.0.0.1:80
```

---

### If SSH test fails in n8n

Check:

- the private key is pasted correctly
- the public key was added to `/root/.ssh/authorized_keys`
- permissions are correct on `/root/.ssh`

---

### If the site does not reflect your latest changes

Make sure you actually pushed your changes:

```bash
git push origin main
```

Then run the n8n workflow again.

---

## Final Summary

### Initial setup

1. prepare VPS folders
2. install Node.js and Git
3. create Nginx config
4. create deploy script
5. run first deploy
6. create Docker Compose project
7. test the live domain

### Future updates

1. edit code on your computer
2. push to GitHub
3. click one button in n8n
4. website updates automatically

If you want, I can next write a second markdown for you with:
1. exact n8n node-by-node settings
2. a success/failure notification workflow
3. full auto-deploy from GitHub push
