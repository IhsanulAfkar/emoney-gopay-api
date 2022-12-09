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

#### Topup (id no: 1 only which is literali literali admeen ygy)

```http
  post /api/topup
```

| Parameter | Type      | Description                                                |
| :-------- | :-------- | :--------------------------------------------------------- |
| `amount`  | `integer` | **Required**. ditulis tanpa titik. eg: 20000. amount > 0   |
| `target`  | `varchar` | **Required**. notelp yang ingin ditopupin. eg:082113062251 |

#### Topup (id no: 1 only which is literali literali admeen ygy)

```http
  post /api/topup
```

| Parameter | Type      | Description                                                |
| :-------- | :-------- | :--------------------------------------------------------- |
| `amount`  | `integer` | **Required**. ditulis tanpa titik. eg: 20000. amount > 0   |
| `target`  | `varchar` | **Required**. notelp yang ingin ditopupin. eg:082113062251 |

#### pay

```http
  post /api/topup
```

| Parameter     | Type      | Description                                              |
| :------------ | :-------- | :------------------------------------------------------- |
| `amount`      | `integer` | **Required**. ditulis tanpa titik. eg: 20000. amount > 0 |
| `Description` | `varchar` | **Required**. deskripsi transaksi                        |
