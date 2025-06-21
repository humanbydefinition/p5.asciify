---
id: contributing
title: Contributing
sidebar_position: 4
description: Learn how to contribute to p5.asciify development. Complete guide for setting up the development environment, running tests, building the project, and submitting pull requests to the open-source ASCII art library.
keywords: [contribute to p5.asciify, p5.asciify development, p5.asciify pull request, p5.asciify GitHub contribution, open source ASCII library, p5.asciify TypeScript development, Node.js p5.asciify setup, vite p5.asciify build, p5.asciify testing vitest, creative coding contribution]
---

## Contributing to `p5.asciify`

With the `v0.7.0` release, including a full rewrite of the codebase from JavaScript to TypeScript, `p5.asciify` is now more accessible than ever for contributions. This document outlines the steps to contribute to the project, including setting up the development environment, running the project locally, and submitting a pull request.

## Requirements

### Node.js and NVM

This project uses Node.js v22.11.0 and requires Node Version Manager (NVM) for version management:

1. Install NVM:
   **For Windows:**
   - Download from [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
   - Run the installer
   - Restart your terminal

   **For macOS/Linux:**
   - Follow the instructions on the [nvm GitHub repository](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
   - Restart your terminal

2. Verify NVM installation:
```bash
nvm --version
```

3. Install and use required Node.js version:
```bash
nvm install 22.11.0
nvm use 22.11.0
```

> [!NOTE]
> The `.nvmrc` file in the project root specifies the required Node.js version. Simply run `nvm use` in the project directory to use the correct version.

### npm

This project uses npm for package management. Verify that npm `v10.9.0` is installed by running the following command:

```bash
npm --version
```

You can install a specific version of npm using the following command:

```bash
npm install -g npm@10.9.0
```

## Setting up the development environment

To set up the development environment for `p5.asciify`, follow these steps:

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/humanbydefinition/p5.asciify.git
```

2. Navigate to the project directory:

```bash
cd p5.asciify
```

3. Install the project dependencies:

```bash
npm install
```

With the development environment set up, you can now run the project locally.

## Running the project locally

`p5.asciify` uses `vite` for development and bundling. To run the project locally, use the following command:

```bash
npm run dev
```

This command starts a local development server at `http://localhost:5173/examples/` where you can view the examples and test the library. The server automatically reloads when you make changes to the source code.

### Building the project

To build the project for production, use the following command:

```bash
npm run build
```

This command generates a production build of the project in the `dist` directory.

### Running tests

`p5.asciify` uses `vitest` for running tests. To run the tests, use the following command:

```bash
npm run vitest
```

This command runs the test suite and outputs the results in the terminal. Currently, most functionality is untested through automated tests, so any contributions to the test suite are highly appreciated.

### Running the documentation

todo

## Submitting a pull request

If you identify an issue or have a feature you would like to contribute to `p5.asciify`, feel free to just create an issue of create a pull request. Within the `Issues` tab, you can find a list of issues that are open and ready for contributions. If you have an idea for a new feature or improvement, feel free to create a new issue and discuss it with the maintainers.

To submit a pull request, follow these steps:

1. Fork the repository to your GitHub account.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Push your branch to your fork.
5. Create a pull request from your branch to the `main` branch of the `p5.asciify` repository.

<hr/>

With these steps, you can now contribute to `p5.asciify` and help improve the library for everyone. If you have any questions or need help with the contribution process, feel free to reach out. Happy coding!
