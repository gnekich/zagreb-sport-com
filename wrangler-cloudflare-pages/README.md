# Wrangler & CF Pages

Create new project (only 1 time needed)

```
pnpx wrangler pages project create zagreb-sport-web-platform
```

Get the wrangler.toml

```
npx wrangler pages download config zagreb-sport-web-platform
```

Edit the wrangler.toml add build dir

```
pages_build_output_dir = "pages"
```

Deploy the changes

```
pnpx wrangler pages deploy
```

## Fix the issues

There are few security issues that need to be fixed.

- Disable preview to the pages deployments.
  |- You can enable protection, than you can't go back on free plan... CloudFlare Pages and Workers are thus non porduction ready environment.

- Cleanup the deployments after you have valid one.
