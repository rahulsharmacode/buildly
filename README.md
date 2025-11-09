# Buildly

`buildly`

**Buildly** is a CLI tool to quickly generate standardized folder structures for **React, Next.js, and Express.js** projects. It pre-populates your project with boilerplate files for components, pages, forms, hooks, constants, interfaces, routes, controllers, and schemas, making it faster to start development.

## Installation

You can install **Buildly** globally using npm:

```bash
npm install -g buildly
```

Or run it directly without installing:

```
npx @iamrahulsharma/buildly g <name> --react
```

## Features

- **Customizable Folder Structure**: Automatically creates a clean, organized folder structure for React, Next.js, or Express.js projects.
- **File Content Generation**: Pre-populates files with ready-to-use boilerplate code.
- **Configurable Extensions**: Supports `.js`, `.jsx`, `.ts`, and `.tsx`.
- **Extended Folders**: Automatically generate subfolders like components, forms, hooks, constants, and interfaces.

## Example Folder Structure

### React Example

Home/
├─ index.jsx
├─ components/
│ └─ index.jsx
├─ forms/
│ └─ form.jsx
├─ constants/
│ └─ index.js
├─ hooks/
│ └─ index.js
└─ interface/
└─ index.js

### Next.js Example

Dashboard/
├─ page.jsx
├─ components/
│ └─ index.jsx
├─ forms/
│ └─ index.jsx
├─ constants/
│ └─ index.js
├─ hooks/
│ └─ index.js
└─ interface/
└─ index.js

### Express.js Example

User/
├─ index.js
├─ router/
│ └─ user.router.js
├─ controller/
│ └─ user.controller.js
└─ schema/
└─ user.schema.js

## Installation

Install Buildly globally using npm:

```bash
npm install -g buildly

# Generate a new folder or component structure
buildly g <name> --react
buildly g <name> --next
buildly g <name> --express
Options
Option	Description
--react	Generate React folder structure
--next	Generate Next.js folder structure
--express	Generate Express.js folder structure
--no-extend	Skip generating extended folders and files

Examples
# Generate React structure for "Home"
buildly g Home --react

# Generate Next.js structure for "Dashboard"
buildly g Dashboard --next

# Generate Express.js structure for "User"
buildly g User --express
```
