# eslint-plugin-encapsulate

Generate errors for using private method outside the class.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-encapsulate`:

```
$ npm install eslint-plugin-encapsulate --save-dev
```

## Usage

Add `encapsulate` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": [
    ...,
    "encapsulate", 
  ],
  "extends": [
    ...
  ],
  "overrides": [
      {
        ....,
        "rules": {
          "encapsulate/private-method": "error",
        },
      },
  ],
  ...
}
```



## Example:

```typescript
class SportCar {
  protected name: string;
  protected speed: number;

  constructor(name: string) {
    this.name = name;
  }

  _enableTurbo(extraSpeed: number): void {
    this.speed += extraSpeed;
  }

  increaseSpeed(): void {
    this.speed = 50;
  }
}

class Ferrari extends SportCar {
  increaseSpeed(): void {
    this.speed = 50;
    this._enableTurbo(50);
  }
}

const main = () => {
  const enzo = new Ferrari('Enzo');
  enzo.increaseSpeed();
  enzo._enableTurbo(50);  // Error: Private method is inaccessible from outside

  const daytona = new Ferrari('Daytona');
  daytona.increaseSpeed();
  // eslint-disable-next-line encapsulate/private-method
  daytona._enableTurbo(40); // ok
};
```