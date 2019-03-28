# Demo Angular App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

You need to include node_modules yourself. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Description of the use case: Payments calculator

In this example we show how to run an API call fetching transaction data for a particular account in the Avaloq Sandbox using Avaloq Open APIs. The application then aggregates the transactions into overall income and expenditures within a certain period which the user can define herself. The application can thus be seen as a simple payments aggregagtor.

Go to 

```
src/app/services/booking.service.ts
```

and update the URL and the token from your dedicated sandbox to allow the application to run the API call against the sandbox.
