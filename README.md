# Youtube clone
Youtube clone using youtube api v3.  
demo: https://jordantseng.github.io/youtube-clone

### important 
Please aware that the request times of youtube api are limited. If you find the 403 error (unauthorized error) on the browser, the request limitation might be exceeded. 

## Table of contents
* [Screenshot](#screenshot)
* [Technologies](#technologies)
* [Features](#features)
* [Obstacles](#obstacles)
* [Usage](#usage)
## Screenshot:
#### Home page

<img width="1391" alt="Screen Shot 2021-01-08 at 3 16 14 PM" src="https://user-images.githubusercontent.com/53250186/103985856-b1998400-51c4-11eb-8281-642858ff568e.png">

---
#### Like list page

<img width="1370" alt="Screen Shot 2021-01-08 at 3 16 30 PM" src="https://user-images.githubusercontent.com/53250186/103985858-b2321a80-51c4-11eb-81a9-ff391adebeb6.png">

---
#### Video details page

<img width="1380" alt="Screen Shot 2021-01-08 at 3 17 15 PM" src="https://user-images.githubusercontent.com/53250186/103985862-b3634780-51c4-11eb-9984-303ebe4c3d3a.png">

## Features
- Get the latest 100 popular videos while the app first initiated
- Show 12 popular videos per page on Home page
- Search videos and show the first 12 videos (in JSON format at this point) 
- Pagination
- Routing
- Pause the video and show the advertisement
- RWD

#### WIP
- Video Search

## Technologies

Client
- react
- react-router-dom
- styled-components
- Videojs
- localstorage

## Obstacles
#### Q: Understand how youtube api work
A: As the official youtube website implement infinite scroll, its api only provides previous page token and next page token. Therefore, I decided to fetch all 100 videos at one time to accomplish normal pagination. Also, in order to get the channel thumbnail, it required to get the channel id and send another request.

#### Q: CSS and styled-components
A: Compared to Javascript, I spent more time on CSS :( To be honest, this is my first time using styled-components in my project, and I am a newbie to styled-components. In fact, I decided to add styled-component after I finished all my css.

#### Q: Videojs and m3u8
A: Before this project, I don't have any knowledge relevant to http live streaming (hls). It did take me some time to understand what m3u8 file is and how the Videojs library work.

#### Q: Github page reload issue (not resolved)
A: This is my first time to deploy project on github. And there is a issue that the site will crashed after the page reload (It seems like is that github page doesn't support SPA, so there is a 404 error when refreshing page). However, the project work fine if you open in localhost.


## Usage

In the root directory, to install all the dependencies, you should run:

#### `npm install`

In the root directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
