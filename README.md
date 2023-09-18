# Tesla Take-Home Evaluation

## Overview

I had some fun with this project! This wasn't just about fulfilling the requirements; it was a good old-fashioned challenge that propelled me to weave in both ingenuity and flair into a web experience.

The following sections describe how to get started with this application as well as some design decisions that went into the making of this application.

## Highlights

1. **Themes**: light and dark can be toggled via the ThemeSelector component found in the User Menu for protected routes or at the bottom of unprotected routes.
2. **3D Visualizations": The configurator layout has a 3D option that uses three.js under the hood to better visualize the layout. Note that this is a beta preview and the 2D version has all requirements met.
3. **About View**: This renders this README.md to the screen using MDX.
4. **Devices View**: This makes a request to Supabase for all devices (batteries and transformers) and renders them into a virtualized list.
5. **Configurations View**: This makes a request to Supabase for all configurations, or layouts, and renders them into a virtualized list.
6. **Configurator View**: The core aspect of this evaluation and renders a battery selector panel, summary pane, and layout generator.
7. **SignIn View**: A view consisting of an email and password login form that pushes the route to Industrial Design platform once entered and confirmed.
8. **SignUp View**: A view consisting of an email, password, and confirm password that pushes the route to Industrial Design platform once the user is successfully created.
9. **NotFound View**: Check out a NotFound view that contains a cool visualization, e.g., [https://tesla.rosssheppard.com/nonexistent](https://tesla.rosssheppard.com/nonexistent).

## Quickstart

Find out below how to get started in a local development environment as well as accessing the deployed application [here](https://tesla.rosssheppard.com).

### Local Development 

1. Clone this repository to your local machine.
2. For local development, enter `pnpm install && nx serve nexus`.

### Access Deployed Application

> Note: The "Configurator" found within the application is the core "ask" of the test.

1. Visit [https://tesla.rosssheppard.com](https://tesla.rosssheppard.com).
2. Access the platform by registering a new account or using the demo account:
   1. Email Address: `nikola@tesla.com`
   2. Password: `magnets`
   
## Clarifications

1. The specification stated "Assume that for every 2 industrial batteries bought 1 transformer is needed." 
   - **Clarification**: Is a transformer required even when a single battery is purchased?
   - **Interpretation**: A transformer is added for a single battery and subsequently for every multiple of two batteries.
2. Again, the specification stated "Assume that for every 2 industrial batteries bought 1 transformer is needed."
   - **Clarification**: Can the user add transformers directly?
   - **Interpretation**: I assumed that transformers were tied to the number of batteries alone, so transformers can only be added through the addition of batteries.

## Library Selection

I chose the following core libraries for a variety of reasons including the community surrounding them, need for speed of development, standing on the shoulders of giants, and, in this case, past familiarity with several of the tools:

- pnpm: A space-efficient JavaScript package manager that utilizes a shared pool to prevent duplicate package downloads, ensuring faster installations and consistent builds.

- TypeScript: a superset of JavaScript that introduces static types to the language, allowing for type-checking and early error detection, fostering robust and maintainable code development.

- React: a powerful JavaScript library utilized for building user interfaces, particularly for single-page applications, offering a seamless, interactive user experience through a virtual DOM and component-based architecture.

- Next.js: a React-based framework that enables functionality such as server-side rendering and generating static websites for React web applications, promoting improved performance and SEO-friendliness.

- Vercel: A cloud platform specializing in swift deployment of frontend web projects with continuous integration from git, serverless functions, and global CDN support, simplifying the deployment process.

- Nx: A build framework for managing monorepo setups, offering tools and plugins that facilitate code sharing and optimized build processes, enhancing development efficiency in large projects.

- Supabase: An open-source backend service offering real-time databases, authentication, auto-generated APIs, and storage capabilities, aiding rapid development and deployment of web applications.

- MUI Core: a modernized version of the popular UI framework built for React, offering a wealth of components and styles to create visually appealing and user-friendly web applications, now leveraging the Emotion styling solution for more efficient, streamlined development.

- Testing-Library: a family of libraries that help create robust testing suites for your applications, promoting the practice of testing software in a way that mimics real user behavior, thereby ensuring reliability and functionality.

- Playwright: an end-to-end testing framework that allows for testing web applications across multiple browsers, providing tools to automate browser interactions and validate functionality, ensuring a high-quality, bug-free user experience.

- React-Cookie: a robust tool for managing cookies in React applications, facilitating secure and efficient handling of browser cookies, enhancing user experience and data management capabilities.

- FontAwesome: a comprehensive library for icons, offering a plethora of customizable icons to enhance the visual appeal of your web projects; additionally, it supports the upload of custom icons to kits, allowing for greater personalization and brand alignment.

- ESLint/Prettier: a combination of code analysis and formatting tools that work together to maintain code consistency, enhance readability, and identify potential errors, ensuring a smooth development process and a cleaner codebase.

## User Sessions

In the application, user sessions retain their data persistence even after browser cache clearances, ensuring a seamless user experience where individuals can resume their work at any point. The implementation of this feature was through Supabase databasing and authentication.

Currently, all configurations created can be seen by all users. While the original requirement was met, an optimization may be to map configurations to the user that created it.

## Repository Structure

I chose a flattened mono-repository for scalability and organizational reasons. By looking at the repository structure (https://github.com/irontitan76/tesla), there is a separation of concern:

- Applications (`/apps`):
  - Deployable targets primarily consisting of views.
  
- Assets (`/assets`):
  - Icon, illustration, image, and font files consumed throughout the repository.
  
- Components (`/components`):
  - Reusable renderable functions that are thought of mapping 1-to-1 to a unified design system.
  
- Database (`/database`): 
  - Store common database clients, APIs, types, and more.

- Docs (`/docs`):
  - A centralized location for storing API documentation, developer guides, and user manuals. These files could be parsed and rendered into a internal or external documentation website. The centralized and top-level location helps technical writers find what they need more readily.

- Themes (`/themes`):
  - Source of truth for design system definitions and component overrides. Leverage theme overrides as much as possible instead of instance-based changes, when relevant.

- Utils (`/utils`):
  - Common functions for manipulating, normalizing, and calculating data
  
- Views (`/views`):
  - A rendered route comprising components.

> Note: This structure can be broken down more into more granular concerns such as `containers`, which could be seen as business-aware sections of a `view`, whereas `components` are purely presentational and unware of business logic. In this case, these `containers` are separate files within `views`. 

## Areas of Improvement

Obviously, given only three days of development, there are ample opportunities for improvement in regards to design, developer experience, and more. The following are just a few selected areas:

1. **Tests**
   1. Add Jest unit tests for each function and component to achieve at least an 85% coverage.
   2. Add PlayWright integration tests for critical user flows, potentially based on mock data using Mock Service Worker (MSW).
2. **Layout Renderer**:
   1. Improve the layout generator by bolstering user-defined positioning, i.e., allow user to place where devices go.
   2. Customize floor dimensions based on user preference.
   3. Add 3D visualizations for batteries and transformers instead of text and icons.
   4. There could be more features like drag-and-drop functionality, live collaboration, or even VR/AR integration for site visualization
   5. Be more cognizant of the spacing constraints and optimize the position of devices.
3. **Loading States**:
   1. Add loading states. There was not much time was spent on loading visualizations, but they're important to the user experience. Currently, some transitions and page loads are not as seamless as I'd like.
4. **Responsive Design**:
   1. While this may be more of an application for landscape orientations, a mobile-friendly version can easily be iterated on.
5. **Accessibility**:
   1. Accessibility was not focused on for this project.



