# Happy Lunch !

A pixel-art food-ordering app built with React.

[![Live Demo](https://img.shields.io/badge/🍌_Live_Demo_>>-D2554D?style=for-the-badge)](https://agustinadz-happy-lunch.vercel.app/)\
[![Happy Lunch ! site screenshot](screenshots/screenshot.png)](https://agustinadz-happy-lunch.vercel.app/)\
[![Happy Lunch ! admin panel screenshot](screenshots/admin-screenshot.png)](https://agustinadz-happy-lunch.vercel.app/login)

## Features

**Customer side:**\
￭ Product categories: Mains, Drinks, Bakery, Desserts\
￭ Product detail pages with quantity selection\
￭ Shopping cart\
￭ Loading, error, and empty-cart screens

**Admin side:**\
￭ Admin login at `/login` (Firebase Authentication)\
￭ Protected admin panel at `/admin`\
￭ Dashboard listing all products by category\
￭ Create, edit, and delete products (Firestore)\
￭ Image upload to ImgBB with live preview\
￭ Client-side form validation\
￭ Product suggestions to prefill the form

**Known limitations:**\
￭ Desktop only interface.\
￭ Deleting a product does not remove its image from ImgBB. This is a limitation of the ImgBB free API (no supported delete endpoint).

## Run locally

```bash
# clone the repository
git clone https://github.com/agustina-dz/happy-lunch.git
cd happy-lunch

# install dependencies
npm install

# set up environment variables
# (copy .env.example to .env.local and fill in your own keys
# see "Environment variables" below)

# start the development server
npm run dev
```

### Environment variables

Before the dev server can fully work (loading products and uploading images), you'll need to set up your own environment variables.

**1\.** Copy `.env.example` to a new file named `.env.local` in the project root.

**2\.** Fill in your own values:\
￭ **`VITE_IMGBB_API_KEY`** → Get a free API key at [api.imgbb.com](https://api.imgbb.com).\
￭ **`VITE_FIREBASE_*`** → Get the values from your own [Firebase](https://firebase.google.com/) project.

**3\.** In your Firebase project:\
￭ Create a `products` collection in Firestore. Sample products are available in `public/data/products.json`.\
￭ Enable Email/Password sign-in and create a user. Use those credentials at `/login` to access the Admin Panel at `/admin`.

ℹ️ The `.env.local` file is automatically gitignored, your keys stay on your machine.

-----

Built by **Agustina Díaz** for the [Talento Tech](https://talentotech.bue.edu.ar/home) ReactJS course.

**Assets:**\
￭ [Monkey and Banana stickers](https://www.flaticon.com/authors/monkey_and_banana/lineal-color) – Flaticon (some modified)\
￭ [Pixel Mart](https://ghostpixxells.itch.io/pixel-mart) – ghostpixxells (itch.io)\
￭ [250 Free Pixel Art Concumables Icons](https://pixstuff.itch.io/250-free-pixel-art-concumables-icons) – pixStuff (itch.io)

-----
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
[![React](https://img.shields.io/badge/React-72CEE2?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-BFAAFF?style=for-the-badge&logo=vite&logoColor=black)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/React_Router-F44250?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)\
[![Firebase](https://img.shields.io/badge/Firebase-F57C00?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![ImgBB](https://img.shields.io/badge/ImgBB-2A80B9?style=for-the-badge&logo=data:image/png;base64,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&logoColor=white)](https://imgbb.com/)
[![Deployed with Vercel](https://img.shields.io/badge/Deployed_with_Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
