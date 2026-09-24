# Deploy ke VPS (Nginx)

Situs ini adalah **static build** Astro (tidak ada SSR/adapter), jadi hasil `npm run build` cukup file HTML/CSS/JS statis di folder `dist/`. Server hanya butuh Nginx untuk serve file tersebut — tidak perlu Node.js running di server.

Domain contoh yang dipakai di sini: `hire.aldyazarya.dev` (sesuai `site` di [astro.config.mjs](astro.config.mjs)). Ganti sesuai domain kamu.

## 1. Persiapan di server

SSH ke VPS, lalu install Nginx kalau belum ada:

```bash
sudo apt update
sudo apt install -y nginx
```

Buat folder untuk menyimpan file situs:

```bash
sudo mkdir -p /var/www/hire.aldyazarya.dev
sudo chown -R $USER:$USER /var/www/hire.aldyazarya.dev
```

## 2. Build di lokal

Dari komputer kamu, di root project:

```bash
npm install
npm run build
```

Hasil build ada di folder `dist/`.

## 3. Upload hasil build ke server

Pakai `rsync` (paling praktis, cuma upload file yang berubah):

```bash
rsync -avz --delete dist/ user@server-ip:/var/www/hire.aldyazarya.dev/
```

Ganti `user` dan `server-ip` sesuai kredensial SSH kamu. Jalankan ulang perintah ini setiap kali ada perubahan yang mau dideploy.

## 4. Konfigurasi Nginx

Buat file config baru di server:

```bash
sudo nano /etc/nginx/sites-available/hire.aldyazarya.dev
```

Isi dengan:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name hire.aldyazarya.dev www.hire.aldyazarya.dev;

    root /var/www/hire.aldyazarya.dev;
    index index.html;

    # cache asset statis (hash di nama file Astro sudah cache-bust otomatis)
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /assets/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    error_page 404 /404.html;
}
```

Aktifkan config dan reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/hire.aldyazarya.dev /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Arahkan DNS

Di DNS provider domain kamu, tambahkan A record:

```
Type: A
Name: hire (atau @ untuk root domain)
Value: <IP server VPS>
```

Tunggu propagasi DNS (biasanya beberapa menit sampai 1 jam).

## 6. Aktifkan HTTPS (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d hire.aldyazarya.dev -d www.hire.aldyazarya.dev
```

Certbot otomatis mengubah config Nginx untuk redirect HTTP → HTTPS dan setup auto-renewal sertifikat.

## 7. Deploy ulang (update situs)

Setiap ada perubahan kode:

```bash
npm run build
rsync -avz --delete dist/ user@server-ip:/var/www/hire.aldyazarya.dev/
```

Tidak perlu restart Nginx — file statis langsung terbaca ulang di request berikutnya.

---

## Opsional: otomatisasi lewat GitHub Actions

Kalau repo ini sudah di GitHub, deploy bisa otomatis tiap push ke `main` tanpa perlu build manual di lokal.

1. Generate SSH key khusus deploy (tanpa passphrase) di lokal, lalu tambahkan public key-nya ke `~/.ssh/authorized_keys` di server.
2. Simpan private key sebagai GitHub Secret bernama `DEPLOY_SSH_KEY`, dan tambahkan secret `DEPLOY_HOST` (IP/domain server) serta `DEPLOY_USER`.
3. Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - name: Deploy via rsync
        uses: burnett01/rsync-deployments@7.0.1
        with:
          switches: -avz --delete
          path: dist/
          remote_path: /var/www/hire.aldyazarya.dev/
          remote_host: ${{ secrets.DEPLOY_HOST }}
          remote_user: ${{ secrets.DEPLOY_USER }}
          remote_key: ${{ secrets.DEPLOY_SSH_KEY }}
```

Setelah ini aktif, cukup `git push` ke `main` dan situs otomatis ter-deploy.
