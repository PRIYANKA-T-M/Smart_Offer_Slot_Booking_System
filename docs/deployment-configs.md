# Deployment Configurations

## Database
- Use Neon, Supabase, or any PostgreSQL hosting.
- Set the standard PostgreSQL connection string in the `ConnectionStrings__DefaultConnection` environment variable.

## Backend Deployment (Render / Railway / Azure)
- Use standard .NET 8 Dockerfile or build settings.
- Ensure the `ASPNETCORE_ENVIRONMENT` is set to `Production`.
- Provide `ConnectionStrings__DefaultConnection`, `Jwt__Key`, `Jwt__Issuer`, and `Jwt__Audience` as environment variables.

## Frontend Deployment (Vercel / Netlify)
- Set build command to `npm run build`.
- Set output directory to `build`.
- Ensure `REACT_APP_API_URL` environment variable is set to the deployed Backend API URL.
