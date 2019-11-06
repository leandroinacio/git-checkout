# git-checkout

Made with Vue.
Live example: https://peaceful-mahavira-5906de.netlify.com/

## Project setup
1. Install dependencies with:
```
npm install
```

2. Run locally with:
```
npm run serve
```

### Project Features
1. Completely responsive
2. Smooth transitions
3. Supports IE11.
4. Check for github's username before enabling the navigation to the next step
5. Loading bar before retrieving user's information
6. Allows the usage of the previous/next browser's navigation
7. Does not allow direct access of pages from browsers without required information

### Project Structure\
├── public\
│   ├── favicon.ico\
│   ├── index.html\
├── src\
│   ├── components\
│   │   ├── Button.vue\
│   ├── router\
│   │   ├── index.js\
│   ├── views\
│   │   ├── Eula.vue\
│   │   ├── GitData.vue\
│   │   ├── Home.vue\
│   │   ├── SimpleForm.vue\
│   ├── App.vue\
│   ├── main.js\
├── babel.config.js\
├── package-lock.json\
├── package.json\
├── README.md\
└── .gitignore\

### Other options

- Compiles and minifies for production
```
npm run build
```

- Lints and fixes files
```
npm run lint
```
