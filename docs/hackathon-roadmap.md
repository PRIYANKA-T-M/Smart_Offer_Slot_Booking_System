# 34-Hour Hackathon Roadmap & Deliverables

## Timeline

- **0-6 hrs**: Architecture + Backend setup. Initialize the .NET 8 Web API, setup basic routing, EF Core (in-memory initially), Swagger docs, and simple endpoints.
- **6-12 hrs**: Database + APIs. Define the PostgreSQL models (Offers, Slots, Bookings), configure state transitions, relationships, and implement CRUD operations.
- **12-20 hrs**: Frontend. Initialize React. Setup React Router, state management, basic UI components (Offer list, Slot selector, Booking form). Connect frontend to backend APIs.
- **20-28 hrs**: Business Logic. Finalize validations: block full/expired slots, ensure original price > offer price, duplicate booking checks, race condition (concurrency) handling using locks or EF Core concurrency tokens. Add Auth constraints (JWT).
- **28-34 hrs**: Testing + Docs + Demo. Run unit, integration, and load tests. Polish README, generate Swagger screenshots, finalize the ER diagram, write the Demo video script, and complete the final submission checklist.

## Feature Priority Matrix

### Must-Have
- **Backend**: .NET 8 Web API
- **Models**: Offers, Slots, Bookings with full state lifecycles.
- **Validations**: Offer price < original, Expired offers blocked, Full slots blocked, Max booking limits.
- **Concurrency**: Prevent simultaneous booking race conditions.
- **Documentation**: README, ER Diagram, Architecture, swagger screenshot, `.env.example`.

### Should-Have
- **Security**: JWT Authentication structure for secured endpoints.
- **Testing**: xUnit automated testing (Unit, Integration, Edge cases).

### Bonus Features
- **Load Testing**: Simulating high traffic on slot bookings.
- **Frontend Quality**: Clean, responsive UI with state loaders and toast notifications.
