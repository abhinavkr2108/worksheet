
# Worksheet: Google Spreadsheet Clone

Worksheet is a powerful and intuitive spreadsheet application built with React and Next.js, designed to help you organize, analyze, and visualize your data with ease.

Designed to mimic the functionality of popular spreadsheet tools, Worksheet allows users to create, edit, and manage data seamlessly


## Tech Stack Used


- **Frontend**:  Next.js, TypeScript, Tailwind CSS
- **Backend**:  Next.js API routes, TypeScript, MongoDB, Prisma ORM
- **UI Library**:  ShadCN UI


## Screenshots

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/docwrite-38576.appspot.com/o/ksnip_20250114-122948.png?alt=media&token=bb947427-faf9-49cf-85ae-a2f70ee3230a)

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/docwrite-38576.appspot.com/o/ksnip_20250114-123205.png?alt=media&token=44354c2f-864d-4d2a-8b97-89b13949df09)

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/docwrite-38576.appspot.com/o/ksnip_20250114-123347.png?alt=media&token=2327cbd8-c316-40e1-bcf3-6b7079373957)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`="mongodb_url"

`AUTH_GOOGLE_ID`=get from google cloud console

`AUTH_GOOGLE_SECRET`=get from google cloud console

`AUTH_SECRET`="any random string" 


## Deployment

- You can view the application by clicking the URL:
-  URL: https://worksheet-jade.vercel.app/
## Run Locally

Clone the project

```bash
  git clone https://github.com/abhinavkr2108/worksheet
```

Go to the project directory

```bash
  cd worksheet
```

Install dependencies (Backend)

```bash
  npm install
```

Prisma Commands

```bash
  npx prisma generate
```

Run the development Server

```bash
  npm run dev
```

