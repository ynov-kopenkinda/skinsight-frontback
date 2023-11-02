# Docs

> **Note**
> Install pnpm with `corepack enable pnpm` or if this command fails `npm i -g pnpm`

## Installation steps

- install deps: `pnpm i`
- find and replace all `@skinsight` by `@your_org_name`
- copy `.env.example` to `.env` and fill in the required values
- run `pnpm db:push` to push the db schema to the db
- run `pnpm dev` to start the server

## Other ~

- generate a lib `pnpx turbo gen`
- project generation is manual
- to use a lib in another lib/project, add `"@your_org_name/libname": "workspace:*"` to `package.json`
