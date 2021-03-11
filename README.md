# Mugatu
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE) 
[![Generic badge](https://img.shields.io/badge/</>-TypeScript-blue.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/</>-NextJS-blue.svg)](https://shields.io/)

A shop front for a fictional women and mens clothing store. Built with NextJS, TypeScript and Chakra UI. Uses Firebase for authentication and user storage. Contentful CDN for the product catalog

![image](https://user-images.githubusercontent.com/20361733/110843817-a0422600-82a0-11eb-9813-536fe1dee941.png)

## Demo
```
https://mugatu.vercel.app
```

## Tech Stack
* Next.js
* React
* TypeScript
* Chakra UI
* Firebase/Firestore
* Contentful



## How to use

You will need to create a Firebase/Firestore project to run this as well as a Contentful account.<br>
Use the .env.template find which environment variables are needed. Create a model based on the contentfulModel file to add products

```
// Clone this repository
$ git clone https://github.com/rzencoder/mugatu

// Go into the repository
$ cd mugatu

// Install dependencies
$ yarn install

// Run the app
$ yarn dev

// Open the app
$ http://localhost:3000
```

## Testing

#### Jest/React Testing Library
```
// Run tests with coverage
$ yarn test
```
#### Cypress
```
// Run tests
$ yarn cypress:open
```

## Credits

All stock images from Unsplash, Pexels and Pixabay
