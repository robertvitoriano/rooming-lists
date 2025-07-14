# 📘 API Reference Documentation

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
  "data": [ 	{
		"id": "1",
		"agreementType": "leisure",
		"createdAt": "2025-07-11T00:30:03.377Z",
		"cutOffDate": "2025-09-29T03:00:00.000Z",
		"eventId": "1",
		"hotelId": "101",
		"rfpName": "ACL-2025",
		"status": "completed",
		"updatedAt": "2025-07-11T00:30:03.377Z"
	},

 ]
}
```

### GET `/:id/bookings`

Returns all bookings related to a specific rooming list by ID.

**Response:**

```json
{
  "message": "Bookings fetched successfully",
  "meta": { "total": number },
  "data": [ 	{
		"id": "1",
		"checkInDate": "2025-08-31T03:00:00.000Z",
		"checkOutDate": "2025-09-04T03:00:00.000Z",
		"createdAt": "2025-07-12T03:52:29.764Z",
		"guestName": "John Doe",
		"guestPhoneNumber": "1234567890",
		"updatedAt": "2025-07-12T03:52:29.764Z"
	},
	{
		"id": "2",
		"checkInDate": "2025-09-01T03:00:00.000Z",
		"checkOutDate": "2025-09-05T03:00:00.000Z",
		"createdAt": "2025-07-12T03:52:29.778Z",
		"guestName": "Alice Smith",
		"guestPhoneNumber": "2345678901",
		"updatedAt": "2025-07-12T03:52:29.778Z"
	},
   ]
}
```

---

## 📅 EventsController

**Base route:** `/events`

> Protected by JWT authentication.

### GET `/`

Fetches events along with their associated rooming lists. Supports filtering and pagination.

**Query Parameters:**

* `status`: string or string\[] (`active`, `closed`, `canceled`)
* `page`: number
* `perPage`: number
* `search`: string (Search by rfp name, agreement type or event name)
* `sort`: `ASC` or `DESC`

**Response:**

```json
{
  "message": "Events fetched successfully",
  "meta": {
    "total": number,
    "pagination": { ... }
  },
  "data": [ {
			"id": "2",
			"name": "Ultra Miami",
			"roomingLists": [
				{
					"id": "8",
					"agreementType": "staff",
					"createdAt": "2025-07-14T03:16:40.197Z",
					"cutOffDate": "2026-10-24T03:00:00.000Z",
					"eventId": "2",
					"hotelId": "101",
					"rfpName": "RLM-2026",
					"status": "received",
					"updatedAt": "2025-07-14T00:20:02.686Z",
					"bookingsCount": 3,
					"startDate": "2025-03-24T03:00:00.000Z",
					"endDate": "2025-05-16T03:00:00.000Z"
				},
				{
					"id": "7",
					"agreementType": "leisure",
					"createdAt": "2025-07-14T03:16:40.185Z",
					"cutOffDate": "2026-10-24T03:00:00.000Z",
					"eventId": "2",
					"hotelId": "101",
					"rfpName": "RLM-2026",
					"status": "received",
					"updatedAt": "2025-07-14T00:20:02.686Z",
					"bookingsCount": 3,
					"startDate": "2025-04-01T03:00:00.000Z",
					"endDate": "2025-10-05T03:00:00.000Z"
				},
				{
					"id": "6",
					"agreementType": "leisure",
					"createdAt": "2025-07-14T03:16:40.177Z",
					"cutOffDate": "2025-10-14T03:00:00.000Z",
					"eventId": "2",
					"hotelId": "101",
					"rfpName": "RLM-2025",
					"status": "Confirmed",
					"updatedAt": "2025-07-14T00:20:02.686Z",
					"bookingsCount": 2,
					"startDate": "2025-09-30T03:00:00.000Z",
					"endDate": "2025-10-05T03:00:00.000Z"
				}
			]
		}, ]
}
```

### GET `/:eventId/rooming-lists`

Fetches rooming lists for a given event ID with filtering, sorting, and pagination.

**Query Parameters:**

* `status`: string or string\[] (`active`, `closed`, `canceled`)
* `page`: number
* `perPage`: number
* `search`: string (Search by rfp name, agreement type or event name)
* `sort`: `ASC` or `DESC`

**Response:**

```json
{
  "message": "Rooming Lists fetched successfully by event",
  "meta": {
    "total": number,
    "pagination": { ... }
  },
  "data": [ 			
    	{
					"id": "7",
					"agreementType": "leisure",
					"createdAt": "2025-07-14T03:16:40.185Z",
					"cutOffDate": "2026-10-24T03:00:00.000Z",
					"eventId": "2",
					"hotelId": "101",
					"rfpName": "RLM-2026",
					"status": "received",
					"updatedAt": "2025-07-14T00:20:02.686Z",
					"bookingsCount": 3,
					"startDate": "2025-04-01T03:00:00.000Z",
					"endDate": "2025-10-05T03:00:00.000Z"
				},
      ]
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
[ 
  {
		"id": "1",
		"checkInDate": "2025-08-31T03:00:00.000Z",
		"checkOutDate": "2025-09-04T03:00:00.000Z",
		"createdAt": "2025-07-12T03:52:29.764Z",
		"guestName": "John Doe",
		"guestPhoneNumber": "1234567890",
		"updatedAt": "2025-07-12T03:52:29.764Z"
	},
  ]
```

---

## 🧾 Common Response Format

Most  responses follow this structure:

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

