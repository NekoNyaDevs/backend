# 🌿・NekoNya-Storage

## 📝・Description

NekoNya-Storage is a Node.JS TypeScript webserver serving NekoNya's files and running the API behind the scenes.

If you wish to deploy your own instance of NekoNya-Storage for any reasons, you can do so by following the instructions below. But please, do not forget to give credit to the original authors of this project.

## 📚・How to deploy

### 📦・Install

```bash
$ git clone https://github.com/NekoNyaDevs/nekonya-storage.git
$ cd nekonya-storage
$ npm install
```

> Note: You need to have [Node.js](https://nodejs.org/en/) and [TypeScript](https://www.typescriptlang.org) installed.

### 📝・Configuration

Change the file `src/config.example.ts` to `config.ts` and change the values to your liking. The configuration file is commented so you can easily understand what each value does.

Don't forget to add images in the categories inside of the `images` folder.

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