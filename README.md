# 🌿・NekoNya-Backend

## 📝・Description

NekoNya-Backend is a Node.JS TypeScript webserver running the API behind the scenes.

If you wish to deploy your own instance of NekoNya-Backend for any reasons, you can do so by following the instructions below. But please, do not forget to give credit to the original authors of this project.

## 📚・How to deploy

### 📦・Install

```bash
$ git clone https://github.com/NekoNyaDevs/backend.git
$ cd backend
$ npm install
```

> Note: You need to have [Node.js](https://nodejs.org/en/) and [TypeScript](https://www.typescriptlang.org) installed.

### 📝・Configuration

Change the file `src/config.example.ts` to `config.ts` and change the values to your liking. The configuration file is commented so you can easily understand what each value does.

Don't forget to add images in the categories inside the `images` folder.

### 🚀・Run

Production:

```bash
$ npm start
```

Development:

```bash
$ npm run dev
```

## 📜・License

This project is licensed under the GNU GPL 3.0 License - see the [LICENSE](LICENSE) file for details
