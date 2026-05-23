# Smart Offer System

A robust, full-stack booking system prioritizing high concurrency, clean architecture, and rigorous testing.

## GitHub Repository Structure
```
.
├── .env.example
├── README.md
├── SmartOffer.Backend/        # .NET 8 Web API
│   ├── Controllers/           # API endpoints
│   ├── Models/                # Entity classes
│   ├── DTOs/                  # Data Transfer Objects
│   ├── Data/                  # EF Core DbContext
│   └── Program.cs
├── SmartOffer.Tests/          # xUnit Test Suite
│   └── SmartOffer.Tests/
│       ├── BookingTests.cs
│       ├── RaceConditionTests.cs
│       └── SecurityTests.cs
├── smart-offer-frontend/      # React TypeScript Frontend
│   └── src/
└── docs/                      # Architecture, ER Diagrams, Roadmaps
```

## Hackathon Submission Assets
- ✅ `README.md`
- ✅ `.env.example`
- ✅ **Swagger Screenshot**: See `docs/swagger-screenshot-guide.md`
- ✅ **Frontend Screenshots**: See `docs/frontend-screenshots-checklist.md`
- ✅ **ER Diagram**: `docs/er-diagram.md`
- ✅ **Architecture**: `docs/architecture.md`
- ✅ **Demo Video Flow**: `docs/demo-video-flow.md`
- ✅ **Roadmap**: `docs/hackathon-roadmap.md`
- ✅ **Lifecycles**: `docs/lifecycles.md`

## Installation and Setup

### 1. Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Node.js & npm

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in the details.

### 3. Running Backend (.NET 8)
Navigate to the `SmartOffer.Backend` folder.
Run `dotnet build` and then `dotnet run`.
The API will be available at your local port. Swagger is available at `/swagger`.

### 4. Running Frontend (React)
Navigate to the `smart-offer-frontend` folder.
Run `npm install` and then `npm run start`.
Frontend will be available at `http://localhost:3000`.

## Running Tests
Navigate to the `SmartOffer.Tests/SmartOffer.Tests` folder.
Run `dotnet test`

## Deployment
See `docs/deployment-configs.md` for guidance on deploying to Render/Azure/Vercel.
