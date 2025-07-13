# 🧠 Architecture Overview

The goal here is to provide a high-level overview of the architecture OF this project. 
---
## 📀 Project Structure

The project follows a **Clean Architecture** approach, with clear separation between layers:

```
backend/
├── application/          # Application services (not directly businness rules related)
├── core/                 # Domain logic (use-cases, entities, value objects, interfaces)
├── infrastructure/       # External integrations (e.g., database, services)           # Controllers (NestJS), DTOs, auth logic
```
This approach was chosing mostly because it makes the project code way more expressive and predictable for who has to work with a bigger project
This structure ensures that:

* **Domain logic** remains independent as much as possible from frameworks and tools
* **Infrastructure code**  can be changed without affecting the core of businness rules
* **Testing** is easier due to a more  loosely coupled approach and clearer boundaries
* **Presentation** Deals directly with the external for receiving requests and delivering results
 
---

## 🔧 Technologies Used

| Layer           | Technology                     |
| --------------- | ------------------------------ |
| Web Framework   | NestJS  
| ORM             | TypeORM 
| Database        | PostgreSQL                     |
| Auth            | JWT-based                      |
| Frontend        | Vite + React                   |
| Dev Environment | Docker + Docker Compose        |

---

## 🔂 Key Concepts

### Domain-Driven Design (DDD)

* **Entities** and **Value Objects** encapsulate business logic
* **Use Cases** are isolated from the main framework and ORM

### Dependency Inversion

* Use cases depend on respositories **interfaces**, not implementations
* Actual implementations (e.g., `TypeORM`) live in `infrastructure/`

---

---

## 📓 Why This Design?

* ✅ **Testable**: Use cases can be more easily tested without relying on complex tools/boilerplate mocking
* ✅ **Scalable**: Easy to add new features without entangling layers, 
    which also means that errors can be found more easily by developers when they have some idea of the domain the error is occuring
        
* ✅ **Replaceable**: Infrastructure (e.g., Postgres) can be swapped without touching core logic

---

## 🚧 Known Limitations

* User-based authorization could be added to complement

---

