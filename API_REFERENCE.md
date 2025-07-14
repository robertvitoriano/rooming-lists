# 📘 API Controller Documentation

This document provides an overview of the available  endpoints in the Rooming Lists API.



# AuthController

**Base Route:** `/auth`

---

## POST `/`

### 🔐 Purpose

Issues a JWT bearer token used to authenticate requests to other protected routes within the application.

---

### 📝 How to Use

Send a `POST` request to the `/auth` endpoint.  
On success, you will receive a JSON response containing a JWT token.

To authorize requests to protected routes, include this token in the `Authorization` header with the `Bearer` prefix:


---

## 🧪 SeedController

**Base route:** `/seed`

### POST `/`

Seeds the database with test data.

**Request Body (JSON):**

```json
{
  "truncate": true 
}
```

**Behavior:**

* If `truncate` is `true` (default), the database is first cleared.
* Then, data is seeded into the system.



---

## 🏨 RoomingListsController

**Base route:** `/rooming-lists`

> Protected by JWT authentication.

### GET `/`

Returns all rooming lists.

**Response:**

```json
{
  "message": "Rooming lists fetched successfully",
  "meta": { "total": number },
  "data": [ ...roomingLists ]
}
```

### GET `/:id/bookings`

Returns all bookings related to a specific rooming list by ID.

**Response:**

```json
{
  "message": "Bookings fetched successfully",
  "meta": { "total": number },
  "data": [ ...bookings ]
}
```

---

## 📅 EventsController

**Base route:** `/events`

> Protected by JWT authentication.

### GET `/`

Fetches events along with their associated rooming lists. Supports filtering and pagination.

**Query Parameters:**

* `search`: string (search by event name)
* `status`: string or string\[] (`active`, `closed`, `canceled`)
* `page`: number
* `perPage`: number
* `sort`: `ASC` or `DESC`

**Response:**

```json
{
  "message": "Events fetched successfully",
  "meta": {
    "total": number,
    "pagination": { ... }
  },
  "data": [ ...events ]
}
```

### GET `/:eventId/rooming-lists`

Fetches rooming lists for a given event ID with filtering, sorting, and pagination.

**Query Parameters:**

* `status`: string
* `rfpName`: string
* `agreementType`: string
* `page`: number
* `perPage`: number
* `search`: string
* `sort`: `ASC` or `DESC`

**Response:**

```json
{
  "message": "Rooming Lists fetched successfully by event",
  "meta": {
    "total": number,
    "pagination": { ... }
  },
  "data": [ ...roomingLists ]
}
```

---

## 🛏️ BookingsController

**Base route:** `/bookings`

> Protected by JWT authentication.

### GET `/`

Fetches all bookings in the system.

**Response:**

```json
[ ...bookings ]
```

---

## 🧾 Common Response Format

Most controller responses follow this structure:

```ts
interface ControllerResponse<T> {
  data: T;
  meta?: {
    total?: number;
    pagination?: {
      currentPage: number;
      currentPageTotal: number;
      totalPages: number;
      perPage: number;
    };
  };
  message?: string;
}
```

---

