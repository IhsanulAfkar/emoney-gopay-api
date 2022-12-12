# E-money implementation gopay edition :D

EFPE AIS

![aku ke API yg kubuat](https://media.discordapp.net/attachments/822065224218836992/1049128849222402069/tumblr_ptnv3uEVH61yo6773o1_400.jpg?width=314&height=406)

## Tech Stack

**Server:** Node, Express

## NOTE BEFORE TEST

JWT diset 3 hari sebelum expired.

## API Reference

#### register ur account

```http
  POST /api/register
```

| Parameter  | Type      | Description             |
| :--------- | :-------- | ----------------------- |
| `username` | `varchar` | **Required**. nama      |
| `phone`    | `varchar` | **Required**. nomortelp |
| `email`    | `varchar` | **Required**. email     |
| `password` | `varchar` | **Required**. pass      |

note : gk bisa register kalo username, phonenumber atau email yang dimasukin sudah terdaftar

USE EXAMPLE : name, phone and/or email is already used

```json
        status: 400,
        msg: "Name already exists"
```

USE EXAMPLE : register succeed

```json
    "status": 200,
    "msg": "Account registered. please login"
```

#### login

```http
  post /api/users
```

| Parameter  | Type      | Description            |
| :--------- | :-------- | :--------------------- |
| `email`    | `varchar` | **Required**. email    |
| `password` | `varchar` | **Required**. password |

OR

| Parameter  | Type      | Description                |
| :--------- | :-------- | :------------------------- |
| `phone`    | `varchar` | **Required**. phonernumber |
| `password` | `varchar` | **Required**. password     |

USE EXAMPLE : wrong password, email, or phone number

```json
        "status": 401,
        "msg": "'Invalid email/phone number or password. please create an account if you dont have one'"
```

USE EXAMPLE : login succeed

```json
        "status": 200,
        "msg": "login success!",
        "token": "theToken"
```

Other error

```json
        "status" : 400,
        "msg": "Invalid Parameters"
```

#### Get user data

```http
  GET /api/users
```

USE EXAMPLE : data get

```json
        "status": 200,
        "data": {
            "user_phone": "420",
            "user_email": "aaa@aa.com",
            "user_name": "aaa",
            "user_balance": 14045
        }
```

#### Topup (id no: 1 only which is literali literali admeen ygy)

```http
  post /api/topup
```

| Parameter | Type      | Description                                                |
| :-------- | :-------- | :--------------------------------------------------------- |
| `amount`  | `integer` | **Required**. ditulis tanpa titik. eg: 20000. amount > 0   |
| `target`  | `varchar` | **Required**. notelp yang ingin ditopupin. eg:082113062251 |

USE EXAMPLE : topup with less than equal to 0

```json
        "status": 401,
        "msg": "Balance value must be greater than zero"
```

USE EXAMPLE : user not found

```json
        "status": 401,
        "msg": "user not found"
```

USE EXAMPLE : topup success

```json
        "status": 200,
        "msg": "topup success"
```

USE EXAMPLE : user is not an admin yet use dis endpoint

```json
        "status": 403,
        "msg": "forbidden"
```

USE EXAMPLE : server error

```json
        "status": 500,
        "msg": "server error"
```

#### pay

```http
  post /api/pay
```

| Parameter     | Type      | Description                                              |
| :------------ | :-------- | :------------------------------------------------------- |
| `amount`      | `integer` | **Required**. ditulis tanpa titik. eg: 20000. amount > 0 |
| `Description` | `varchar` | **Required**. deskripsi transaksi                        |

USE EXAMPLE : paying with less than 0

```json
        "status" : 401,
        "msg": "Balance value must be greater than zero."
```

USE EXAMPLE : ur balance < amount

```json
        "status" : 401,
        "msg": "insufficent balance in your account. Please topup."
```

USE EXAMPLE : server error

```json
      "status" : 500,
      "msg": "server error"
```
