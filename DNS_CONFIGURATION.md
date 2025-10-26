# DNS Configuration for austinalliance.casa

## Required DNS Records at Porkbun

To configure GitHub Pages with the custom domain `austinalliance.casa`, you need to add the following DNS records in your Porkbun account:

### 1. A Records (Point apex domain to GitHub Pages)

Add these **four A records** for the apex domain (`@` or `austinalliance.casa`):

| Type | Host | Answer/Value | TTL |
|------|------|--------------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |

### 2. CNAME Record (For www subdomain - Optional)

If you want `www.austinalliance.casa` to also work:

| Type | Host | Answer/Value | TTL |
|------|------|--------------|-----|
| CNAME | www | aledlie.github.io | 600 |

## Configuration Steps

### Via Porkbun Web Interface:

1. Log in to your Porkbun account at https://porkbun.com/account/login
2. Navigate to "Domain Management"
3. Select "austinalliance.casa"
4. Click "DNS Records"
5. Add each A record:
   - Click "Add"
   - Select "A" record type
   - Leave Host blank or enter "@"
   - Enter the IP address in the Answer field
   - Set TTL to 600
   - Click "Add"
6. Repeat for all four IP addresses
7. Optionally add the CNAME record for www subdomain

### Via Porkbun API (if you have API access):

```bash
# Set your API credentials
API_KEY="your_porkbun_api_key"
SECRET_KEY="your_porkbun_secret_key"
DOMAIN="austinalliance.casa"

# Add A records
for IP in 185.199.108.153 185.199.109.153 185.199.110.153 185.199.111.153; do
  curl -X POST "https://api.porkbun.com/api/json/v3/dns/create/$DOMAIN" \
    -H "Content-Type: application/json" \
    -d "{
      \"apikey\": \"$API_KEY\",
      \"secretapikey\": \"$SECRET_KEY\",
      \"type\": \"A\",
      \"name\": \"\",
      \"content\": \"$IP\",
      \"ttl\": \"600\"
    }"
done

# Add CNAME record for www (optional)
curl -X POST "https://api.porkbun.com/api/json/v3/dns/create/$DOMAIN" \
  -H "Content-Type: application/json" \
  -d "{
    \"apikey\": \"$API_KEY\",
    \"secretapikey\": \"$SECRET_KEY\",
    \"type\": \"CNAME\",
    \"name\": \"www\",
    \"content\": \"aledlie.github.io\",
    \"ttl\": \"600\"
  }"
```

## Verification

After configuring DNS records:

1. **Wait for DNS propagation** (typically 5-30 minutes, up to 48 hours)

2. **Check DNS propagation:**
   ```bash
   # Check A records
   dig austinalliance.casa +short

   # Check CNAME
   dig www.austinalliance.casa +short
   ```

3. **Verify GitHub Pages:**
   - Go to https://github.com/aledlie/luis-landscaping/settings/pages
   - The custom domain should show "DNS check successful"
   - HTTPS should be available (may take a few minutes)

4. **Test the site:**
   ```bash
   curl -I https://austinalliance.casa
   ```

## Troubleshooting

### DNS Check Failed
- Ensure all four A records are added correctly
- Wait longer for DNS propagation
- Use `dig` or online tools like https://dnschecker.org to verify records

### HTTPS Not Working
- HTTPS certificate can take up to 24 hours to provision
- Ensure "Enforce HTTPS" is enabled in GitHub Pages settings once DNS is verified

### Site Not Loading
- Clear browser cache
- Try incognito/private browsing mode
- Check GitHub Actions workflow status: https://github.com/aledlie/luis-landscaping/actions

## Current Configuration

- **Repository:** https://github.com/aledlie/luis-landscaping
- **GitHub Pages URL:** https://austinalliance.casa
- **Deployment:** GitHub Actions (automatic on push to main)
- **Build Type:** Workflow (Vite)

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages IP Addresses](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Porkbun DNS Documentation](https://kb.porkbun.com/category/7-dns)
