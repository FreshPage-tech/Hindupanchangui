Convert my Figma design into a production-ready microservices architecture with strict security rules.

Architecture Requirements:

1. Frontend

* The frontend must only contain UI components and API calls.
* No business logic, calculations, or sensitive data processing should exist in the frontend.
* All data must be fetched using secure REST or GraphQL APIs.
* No hardcoded values, secrets, or configuration inside the frontend.
* Environment variables must be used for endpoints.

2. Backend (Microservices)

* Implement a microservices architecture where each service is independent.

* Services should include:

  * Authentication Service
  * User Management Service
  * Data Management Service
  * Analytics Service
  * Admin Control Service

* All calculations, validations, and business logic must run on the backend only.

* The frontend should never directly manipulate or calculate critical data.

3. Database Layer

* Use Supabase as the primary database and authentication provider.
* Implement Row Level Security (RLS).
* Each user must only access their own data.
* Data structures must enforce ownership and permissions.
* No direct client-side database access unless protected by Supabase policies.

4. Authentication

* Use Supabase Auth for login, signup, and session management.
* Support email/password and OAuth.
* All API requests must verify the authenticated user token.

5. Authorization

* Role-based access control:

  * User: access and manage their own data only.
  * Admin: full control over application data and settings.
* Permissions must be enforced in backend APIs.

6. Security

* No hardcoded secrets anywhere in the application.
* Use environment variables for API keys and credentials.
* Implement input validation, rate limiting, and API authentication.
* Prevent client-side manipulation of business logic.

7. Analytics and Monitoring

* Integrate analytics tracking.
* Add crash reporting and error monitoring.
* Log backend events securely.

8. API Layer

* Frontend communicates only through API endpoints.
* APIs should validate requests and enforce permissions.
* Responses should return only required data.

9. Deployment

* Structure services so they can be deployed independently.
* Ensure scalability and security best practices.

Goal:
Generate a secure, scalable application where the frontend cannot manipulate business logic, all calculations happen on the backend, and data access is strictly controlled by authentication and authorization rules.
