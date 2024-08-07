# Budgeteer

**Budgeteer** is a robust and user-friendly budget tracking web application designed to help you manage your finances effortlessly. With a variety of features such as income and expense tracking, multi-currency support, data visualization, and more, Budgeteer makes it simple to stay on top of your financial goals. The app's intuitive interface ensures a seamless experience across all devices, with support for both light and dark modes.

![image](https://github.com/user-attachments/assets/68ca2d87-ae74-403c-ad48-e9484bd76cc3)

## Live demo: https://expense-tracker-eta-eight.vercel.app/

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Source](#source)

## Features

- **Add, Update, and Delete Transactions:** Easily manage your income and expense entries.
- **Multi-Currency Support:** Track transactions in various currencies.
- **Custom Categories:** Create and manage your own categories for detailed budgeting.
- **Visualization:** View income and expense data month-wise and year-wise through interactive charts.
- **Progress Bars:** Visual representation of income and expenses for each category.
- **CSV Export:** Export your transactions data as a CSV file for offline access and analysis.
- **Dark/Light Mode:** Switch between themes for a comfortable user experience.
- **Responsive Design:** Access the app seamlessly on any device.

## Project Structure

Here's an overview of the project's structure:


Based on the directory structure you've provided in the image, here's a revised project structure for your Budgeteer app's README file:

markdown
Copy code
## Project Structure

Here's an overview of the project's structure:

```
budgeteer/
├── .next/
├── app/
│ ├── (auth)/
│ ├── (dashboard)/
│ ├── api/
│ ├── wizard/
│ ├── globals.css
│ └── layout.tsx
├── components/
├── hooks/
├── lib/
├── node_modules/
├── prisma/
├── public/
├── schema/
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Tech Stack

Budgeteer is built using the following technologies:

- **Frontend:**
  - [Next.js 14](https://nextjs.org/) - A powerful React framework for building modern web applications.
  - [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language for building scalable web applications.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for creating custom designs without any hassle.
  - [Shadcn UI](https://ui.shadcn.com/) - A collection of beautifully designed components.

- **Backend:**
  - [Node.js](https://nodejs.org/) - A JavaScript runtime for building scalable network applications.
  - [SQLite](https://www.sqlite.org/index.html) - A self-contained, high-reliability, embedded, full-featured SQL database engine.
  - [Prisma](https://www.prisma.io/) - A next-generation ORM for Node.js and TypeScript.
  
- **Data Visualization:**
  - [Recharts](https://recharts.org/en-US/) - A charting library built on React components.

## Installation

To run Budgeteer locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/akshansh/budgeteer.git
   cd budgeteer
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Set up environment variables:**
  - Create a .env file in the root directory and add your environment variables:

    <pre>DATABASE_URL="file:./dev.db"</pre>
4. **Run the database migration:**

    ```
    npx prisma migrate dev
    ```
    Start the development server:

    ```
    npm run dev
    ```
The application will be accessible at http://localhost:3000.

## Screenshots
![image](https://github.com/user-attachments/assets/f72b08d6-0191-42ba-bfba-3bed09724fc1)

![image](https://github.com/user-attachments/assets/afbae185-0503-44e0-8816-de5a2de1d99f)

![image](https://github.com/user-attachments/assets/8513ec76-b8ab-4629-9273-41184929c990)

![image](https://github.com/user-attachments/assets/2bef4aa6-9bf2-4604-9089-2de8873a540c)

![image](https://github.com/user-attachments/assets/aec76663-08b0-4f20-9a96-3d19f0e38fa2)


## Usage
Here's how you can start using Budgeteer to track your finances:

 1. **Add Transactions:**

 - Navigate to the Dashboard  and click on the "Income" or "Expense" button.
 - Fill in the details such as amount, category, date, and currency.
 - Save the transaction to see it listed on the dashboard.
 2. Visualize Data:

 - Visit the Overview section to explore charts and progress bars that illustrate your income and expense patterns.
 - Switch between month-wise and year-wise views for detailed insights.
 3. Export Data:

 - Click on the "Export" button to download your transaction data as a CSV file.
 - Use this file for further analysis or offline access.
 4. Toggle Theme:

 - Use the mode toggle switch in the header to switch between dark and light themes.
 5. Responsive Experience:

 - Access Budgeteer from any device, including desktops, tablets, and smartphones, for a seamless experience.
## Source
You can find the source code for Budgeteer on GitHub:
[NextJS course: Full-stack budget tracker](https://youtu.be/nANLXwxZxks?si=Ml9H7EcD-YqKtopB)
Feel free to contribute, raise issues, or fork the repository!
