Superfly is a full-stack e-commerce web application for selling furniture products online.
It features user authentication, secure Stripe checkout, admin product management, and a modern, fast frontend built with React.

🚀 Tech Stack
Backend
Next.js API Routes (REST API)

Prisma ORM (PostgreSQL database)

Clerk (Authentication)

Stripe API (Secure payment processing)

Zod (API input validation)

Frontend
React (with Next.js Pages Router)

TailwindCSS (for UI styling)

React Query (useQuery, useMutation) (for server-state management and caching)

Axios (for API requests)

Clerk React SDK (for authentication on the client)

📦 Features
User
Login/Signup with Clerk

Browse furniture products

Add items to cart

Secure checkout with Stripe

View order success page

Admin
Admin authentication

Upload new products (with image uploads)

Edit existing products

Manage product listings

🛠️ Backend Structure
Prisma ORM manages the Product, Order, and User models.

Database: PostgreSQL.

API Routes:

GET /api/products → Fetch list of products

GET /api/products/[id] → Fetch single product

POST /api/products → Admin upload a new product

PUT /api/products/[id] → Admin edit a product

POST /api/checkout → Create Stripe Checkout Session

POST /api/orders → Save completed order after payment

Request Handling:

GET requests use URL params / search params.

POST and PUT requests extract body payload using await req.json().

Stripe Integration:

Stripe Checkout session created on the server.

After successful payment, orders are recorded in the database.

🎨 Frontend Details
TailwindCSS: Fully styled with utility classes for responsiveness and theme.

React Query:

useQuery for fetching products and caching them.

useMutation for creating products and orders.

Automatic query invalidation after mutations for fresh data.

Axios:

All API interactions (GET, POST, PUT) are performed through Axios.

State Management:

Minimal local state using useState.

Global server state through React Query cache.

Clerk:

Use of useUser and useAuth hooks to manage auth.

Protect admin routes.
