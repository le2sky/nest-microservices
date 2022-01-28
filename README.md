## Description

nest-microservices practice

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Seeding

```
# ex) npm run seed:ambassadors
"seed:ambassadors": "ts-node src/commands/ambassador.seeder.ts",
"seed:products": "ts-node src/commands/product.seeder.ts",
"seed:orders": "ts-node src/commands/order.seeder.ts"
```

## License

Nest is [MIT licensed](LICENSE).
