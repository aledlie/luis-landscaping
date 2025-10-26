# Porkbun MCP Server Setup Guide

## Overview

This guide will help you install and configure the Porkbun MCP server to manage DNS records for austinalliance.casa programmatically through Claude Code or Claude Desktop.

## Prerequisites

- Node.js v18 or later
- npm package manager
- Porkbun account with API access enabled
- Porkbun API Key and Secret Key

## Getting Porkbun API Credentials

1. Log in to your Porkbun account at https://porkbun.com/account/api
2. Enable API access for your account if not already enabled
3. Click "Create API Key"
4. Save both:
   - **API Key** (PORKBUN_API_KEY)
   - **Secret API Key** (PORKBUN_SECRET_API_KEY)

⚠️ **Important:** Keep these credentials secure and never commit them to version control.

## Installation Methods

### Method 1: Install via Smithery (Recommended for Claude Desktop)

The easiest way to install the Porkbun MCP server for Claude Desktop:

```bash
npx -y @smithery/cli install @miraclebakelaser/porkbun-mcp-server --client claude
```

Then add your credentials to the config file at:
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "porkbun": {
      "command": "node",
      "args": ["/path/to/porkbun-mcp-server/build/index.js"],
      "env": {
        "PORKBUN_API_KEY": "your_api_key_here",
        "PORKBUN_SECRET_API_KEY": "your_secret_key_here"
      }
    }
  }
}
```

### Method 2: Manual Installation from GitHub

1. **Clone the repository:**
   ```bash
   cd ~/code  # or your preferred directory
   git clone https://github.com/miraclebakelaser/porkbun-mcp-server.git
   cd porkbun-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Configure credentials:**

   Create a `.env` file in the project root:
   ```bash
   echo "PORKBUN_API_KEY=your_api_key_here" > .env
   echo "PORKBUN_SECRET_API_KEY=your_secret_key_here" >> .env
   ```

5. **Test the connection:**
   ```bash
   npm start
   ```

## Claude Desktop Configuration

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "porkbun": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/code/porkbun-mcp-server/build/index.js"],
      "env": {
        "PORKBUN_API_KEY": "your_api_key_here",
        "PORKBUN_SECRET_API_KEY": "your_secret_key_here"
      }
    }
  }
}
```

**Config file locations:**
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

After adding the configuration, restart Claude Desktop.

## Available Tools

Once configured, you can use these tools through Claude:

### DNS Management
- `get_dns_records` - View all DNS records for a domain
- `create_dns_record` - Add new DNS records
- `edit_dns_record` - Modify existing records
- `delete_dns_record` - Remove DNS records
- `retrieve_dns_record_by_name_type` - Query specific record types

### Domain Management
- `list_domains` - List all domains in your account
- `check_domain` - Check domain availability
- `ping_porkbun` - Test API connection

### SSL/TLS
- `get_ssl_bundle` - Retrieve SSL certificates

### URL Forwarding
- `add_url_forward` - Create redirects
- `get_url_forwarding` - List existing forwards
- `delete_url_forward` - Remove forwards

## Configuring DNS for GitHub Pages

Once the MCP server is installed and configured, you can use Claude to configure DNS records:

### Example Commands to Use with Claude:

```
"Use the porkbun MCP server to create the following A records for austinalliance.casa:
- Type A, Host @, Value 185.199.108.153
- Type A, Host @, Value 185.199.109.153
- Type A, Host @, Value 185.199.110.153
- Type A, Host @, Value 185.199.111.153"
```

```
"Create a CNAME record for www subdomain pointing to aledlie.github.io"
```

```
"List all DNS records for austinalliance.casa to verify the configuration"
```

## Manual DNS Configuration (Without MCP)

If you prefer not to use the MCP server, follow the instructions in `DNS_CONFIGURATION.md` to configure DNS records manually through the Porkbun web interface.

## Verification

After configuring DNS (either via MCP or manually):

1. **Check DNS propagation:**
   ```bash
   dig austinalliance.casa +short
   # Should return the four GitHub Pages IP addresses
   ```

2. **Verify CNAME:**
   ```bash
   dig www.austinalliance.casa +short
   # Should return aledlie.github.io
   ```

3. **Test the site:**
   ```bash
   curl -I https://austinalliance.casa
   ```

## Troubleshooting

### "Connection refused" or "Cannot connect to server"
- Verify the build path in your config is correct
- Check that Node.js is in your PATH
- Restart Claude Desktop after config changes

### "Authentication failed"
- Verify your API credentials are correct
- Check that API access is enabled in your Porkbun account
- Ensure credentials are properly formatted in the config

### "Tool not found"
- Restart Claude Desktop
- Verify the server is listed in MCP settings
- Check Claude Code logs for errors

### DNS Records Not Creating
- Test connection with `ping_porkbun` tool first
- Verify domain is in your Porkbun account
- Check API permissions for the domain

## Security Best Practices

1. **Never commit credentials** to version control
2. **Use environment variables** or secure credential storage
3. **Rotate API keys** periodically
4. **Restrict API permissions** to minimum required
5. **Monitor API usage** for unexpected activity

## Resources

- **GitHub Repository:** https://github.com/miraclebakelaser/porkbun-mcp-server
- **Porkbun API Docs:** https://porkbun.com/api/json/v3/documentation
- **MCP Documentation:** https://modelcontextprotocol.io
- **Claude Desktop:** https://claude.ai/download

## Next Steps

After installing and configuring the Porkbun MCP server:

1. Test the connection using the `ping_porkbun` tool
2. List your domains using `list_domains`
3. Create the required DNS records for GitHub Pages
4. Verify DNS propagation
5. Enable HTTPS in GitHub Pages settings

---

**Note:** DNS propagation can take 5-30 minutes (up to 48 hours in rare cases). Be patient and verify using DNS checking tools before troubleshooting.
