# Cats Project

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Overview

The Cats Project is a web application that provides real-time data on cryptocurrency prices and exchanges. It includes features such as live updates, detailed information on various cryptocurrencies, and a list of top exchanges.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/kevinsantand/catsproject
   cd catsproject
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

## Usage

Once the development server is running, you can access the application at `http://localhost:4200`.
Also avaible on stackblitz: https://stackblitz.com/~/github.com/kevinsantand/catsproject

## Project Structure

```
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── features
│   │   │   ├── crypto-prices
│   │   │   │   ├── crypto-prices.component.html
│   │   │   │   ├── crypto-prices.component.scss
│   │   │   │   ├── crypto-prices.component.spec.ts
│   │   │   │   └── crypto-prices.component.ts
│   │   │   └── transport-ticket-purchase
│   │   │       ├── purchase-confirmation-modal
│   │   │       │   ├── purchase-confirmation-modal.component.html
│   │   │       │   ├── purchase-confirmation-modal.component.scss
│   │   │       │   ├── purchase-confirmation-modal.component.spec.ts
│   │   │       │   └── purchase-confirmation-modal.component.ts
│   │   │       ├── transport-ticket-purchase.component.html
│   │   │       ├── transport-ticket-purchase.component.scss
│   │   │       ├── transport-ticket-purchase.component.spec.ts
│   │   │       └── transport-ticket-purchase.component.ts
│   │   └── shared
│   │       ├── components
│   │       │   ├── data-table
│   │       │   │   ├── data-table.component.html
│   │       │   │   ├── data-table.component.scss
│   │       │   │   └── data-table.component.ts
│   │       │   └── navbar
│   │       │       ├── navbar.component.html
│   │       │       ├── navbar.component.scss
│   │       │       ├── navbar.component.spec.ts
│   │       │       └── navbar.component.ts
│   │       ├── models
│   │       │   ├── crypto-exchange.model.ts
│   │       │   ├── crypto-much-price.model.ts
│   │       │   └── table-column.model.ts
│   │       ├── pipes
│   │       │   ├── short-number.pipe.spec.ts
│   │       │   └── short-number.pipe.ts
│   │       └── services
│   │           ├── crypto-exchange.service.spec.ts
│   │           ├── crypto-exchange.service.ts
│   │           ├── crypto-much-price.service.spec.ts
│   │           └── crypto-much-price.service.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

## Documentation

Detailed documentation for the project can be found in the `docs/` directory. This includes information on components, services, and models used in the project.

## Development

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Testing

### Running Unit Tests

To execute unit tests with the [Jest](https://jestjs.io) test runner, use the following command:

```bash
ng test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
