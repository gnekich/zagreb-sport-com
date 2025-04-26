Inside dev container javascript image pnpm seems to be installed via npm, thus to update the version of pnpm you can run

```
pwd
npm install -g pnpm@latest
pnpm -v
which pnpm
pnpm config set store-dir /home/node/.local/share/pnpm
```

```
pnpm create vite@latest react-frontend
```

```
cd react-frontend
pnpm install
```

```
git init
git branch -m main
git config user.name "<Name>"
git config user.email "<Email>"
```
