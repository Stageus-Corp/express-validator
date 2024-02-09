# 🚀 @stageus/express-validator

You can use `@stageus/express-validator` to validate `body`, `query` and `params` of `Express.Request`.

# Installation

```bash
npm install @stageus/express-validator
```

# ✏️ Usage

You can use `validate` function. This function return `RequestHandler`.

```typescript
validate([
  body('email', message('invalid email').isString().isEmail()),
]);
```

```typescript
router.post( 
  '/user', 
  validate([
    body({
      email: message('invalid email').isString().isEmail(),
      pw: message('invalid password').isString().length({ min: 6, max: 16}).isPw(),
      profileImg: {
        fileName: message('invalid file name').isString().
        fileExt: message('invalid file extension').isString()
      }
    })
  ]),
  (req, res) => {
    // Do Something...
  }
)
```

# 📄 Document

You can check the validation method to be chanined can be confirmed through the following document.

* [@stageus/validator](https://www.npmjs.com/package/@stageus/validator)

## 🔧 validate()

Through `validate` function, a `RequestHandler` can be created to validate of the `body`, `query`, and `params` properties of the `Express.Request`.

That is, the `validate` function validate all `Validation`s of the array of first parameter.

```typescript
validate([
    body('email', message('invalid email').isString().isEmail()),
    params('page', message('invalid page').isNumber().isInt()),
])
```

In the above example, the body value and the params value are evaluated simultaneously.

## 🔧 body()

Through the `body` function, one `Validation` can be created to evaluate `req.body`.

```typescript
// Evaluate `req.body` as a whole
body({
    email: message('invalid email').isString().isEmail()
});

// Evaluate only `req.body.email` 
body('email', message('invalid email').isString().isEmail());
```

## 🔧 query()

Through the `query` function, one `Validation` can be created to evaluate `req.query`.

```typescript
// Evaluate `req.query` as a whole
query({
    page: message('invalid pagenation').isNumber()
});

// Evaluate only `req.query.page` 
query('page', message('invalid pagenation').isNumber());
```

## 🔧 params()

Through the `params` function, one `Validation` can be created to evaluate `req.params`.

```typescript
// Evaluate `req.params` as a whole
params({
    idx: message('invalid idx').isNumber()
});

// Evaluate only `req.params.idx` 
params('idx', message('invalid idx').isNumber());
```

<br/>

# Maintainer

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/jochongs">
        <img src="https://github.com/jochongs.png" width="100px;" alt="Kyeong Chan Min" style="border-radius: 100%;border:2px solid white" />
        <br />
        <sub>
          <b>Kyeong Chan Min</b>
        </sub>
      </a>
      <br />
      Author
    </td>
  </tr>
</table>

<br/>

# LICENSE

[LICENSE](https://github.com/Stageus-Corp/express-validator/blob/master/LICENSE)
