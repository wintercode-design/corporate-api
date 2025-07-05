# RBAC Middleware Usage Guide

This guide explains how to use the Role-Based Access Control (RBAC) middleware in your Wintercode API.

## Overview

The RBAC middleware provides:

- JWT token authentication
- Role-based access control
- Permission-based access control
- Resource ownership validation
- Public route handling

## Available Middleware Functions

### Authentication

- `authenticateToken` - Verifies JWT tokens and loads user data
- `RBACMiddleware` - Main middleware that handles public routes and authentication

### Role-Based Access

- `requireRole(allowedRoles)` - Restricts access to specific roles
- `requireAdmin` - Admin only access
- `requireManager` - Admin and manager access
- `requireEditor` - Admin, manager, and editor access
- `requireUser` - Any authenticated user

### Permission-Based Access

- `requirePermission(permissions)` - Restricts access based on permissions
- `requireUserManagement` - User management permissions
- `requireContentManagement` - Content management permissions
- `requireSystemManagement` - System management permissions

### Resource Ownership

- `requireOwnership(fieldName)` - Ensures users can only access their own resources

## Usage Examples

### 1. Basic Route Protection

```typescript
import { Router } from "express";
import { requireAdmin, requireUser } from "../middleware/rbac";

export default class AdminRouter {
  routes: Router = Router();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    // Admin only routes
    this.routes.get("/dashboard", requireAdmin, this.getDashboard);
    this.routes.post("/users", requireAdmin, this.createUser);

    // Any authenticated user
    this.routes.get("/profile", requireUser, this.getProfile);
  }
}
```

### 2. Permission-Based Protection

```typescript
import { Router } from "express";
import {
  requirePermission,
  requireContentManagement,
} from "../middleware/rbac";

export default class ContentRouter {
  routes: Router = Router();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    // Specific permissions
    this.routes.post(
      "/blogs",
      requirePermission(["blog:create"]),
      this.createBlog
    );
    this.routes.put(
      "/blogs/:id",
      requirePermission(["blog:update"]),
      this.updateBlog
    );

    // Predefined permission groups
    this.routes.get("/content", requireContentManagement, this.getContent);
  }
}
```

### 3. Resource Ownership

```typescript
import { Router } from "express";
import { requireOwnership } from "../middleware/rbac";

export default class UserRouter {
  routes: Router = Router();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    // Users can only access their own profile
    this.routes.get(
      "/profile/:userId",
      requireOwnership("userId"),
      this.getProfile
    );
    this.routes.put(
      "/profile/:userId",
      requireOwnership("userId"),
      this.updateProfile
    );
  }
}
```

### 4. Combined Protection

```typescript
import { Router } from "express";
import {
  requireAdmin,
  requirePermission,
  requireOwnership,
} from "../middleware/rbac";

export default class UserManagementRouter {
  routes: Router = Router();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes() {
    // Admin can access all users
    this.routes.get("/users", requireAdmin, this.getAllUsers);

    // Users with user management permissions can create users
    this.routes.post(
      "/users",
      requirePermission(["user:create"]),
      this.createUser
    );

    // Users can only update their own profile
    this.routes.put(
      "/users/:userId",
      requireOwnership("userId"),
      this.updateUser
    );
  }
}
```

## Public Routes

The following routes are automatically public (no authentication required):

- `GET /api/auth/login`
- `GET /api/auth/register`
- `GET /api/auth/password-reset`
- `GET /api/products`
- `GET /api/blogs`
- `GET /api/events`
- `GET /api/faqs`
- `GET /api/offers`
- `GET /api/projects`
- `GET /api/reviews`
- `GET /api/team-members`
- `GET /api/ads`

## Database Schema Requirements

Make sure your database has the following structure:

### Roles Table

```sql
CREATE TABLE Role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
);
```

### Permissions Table

```sql
CREATE TABLE Permission (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT
);
```

### Role-Permission Relationship

```sql
CREATE TABLE _RoleToPermission (
  A INT NOT NULL,
  B INT NOT NULL,
  FOREIGN KEY (A) REFERENCES Role(id),
  FOREIGN KEY (B) REFERENCES Permission(id),
  UNIQUE(A, B)
);
```

### User-Permission Relationship

```sql
CREATE TABLE _UserToPermission (
  A INT NOT NULL,
  B INT NOT NULL,
  FOREIGN KEY (A) REFERENCES User(id),
  FOREIGN KEY (B) REFERENCES Permission(id),
  UNIQUE(A, B)
);
```

## Common Permission Names

### User Management

- `user:read` - View users
- `user:create` - Create users
- `user:update` - Update users
- `user:delete` - Delete users

### Content Management

- `content:read` - View content
- `content:create` - Create content
- `content:update` - Update content
- `content:delete` - Delete content

### System Management

- `system:read` - View system settings
- `system:update` - Update system settings
- `system:delete` - Delete system data

### Blog Management

- `blog:read` - View blogs
- `blog:create` - Create blogs
- `blog:update` - Update blogs
- `blog:delete` - Delete blogs

### Product Management

- `product:read` - View products
- `product:create` - Create products
- `product:update` - Update products
- `product:delete` - Delete products

## Error Responses

### 401 Unauthorized

```json
{
  "error": "Access token required"
}
```

### 403 Forbidden

```json
{
  "error": "Access denied. Required roles: admin, manager"
}
```

```json
{
  "error": "Access denied. Required permissions: user:read, user:write"
}
```

## Best Practices

1. **Use the most restrictive middleware first** - Start with role-based access, then add permission checks if needed.

2. **Group related permissions** - Use predefined permission groups like `requireContentManagement` for common scenarios.

3. **Always validate resource ownership** - Use `requireOwnership` for user-specific resources.

4. **Keep public routes minimal** - Only expose what's necessary for public access.

5. **Use descriptive permission names** - Follow the pattern `resource:action` (e.g., `user:create`).

6. **Test thoroughly** - Ensure all access patterns work correctly with different user roles and permissions.
