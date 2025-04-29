To export db state from server use

```
hasura migrate create "init" --from-server --database-name default --envfile .env.production
```

To export metadata use

```
hasura metadata export --envfile .env.production
```
