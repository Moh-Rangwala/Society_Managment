# HOUSING SOCIETY MANAGEMENT

## About

This is the implementation of a Housing Society Management. It uses Laravel as a backend API service integrated with Reactjs for the front end, and NodeJs for the chat using socket.

## Features

- Login and register the user with validation.
- Pages of Home, About Us and Services.
- Contact Us page with email confirmation
- Registration with email confirmation.
- 4 types of users: Resident, Visitor, Admin, and Manager
- Resident can book services, approve visitor requests, upload images and chat     with management.
- Visitors can request to visit a resident, visit a garden, report an incident with email confirmation and chat with management.
- Admin can perform crud operations on managers, buildings, services, residents, visitors, and amenities.
- Managers can perform crud operations on buildings, services, residents, visitors, and amenities as well as chat with residents/visitors.
- Logout functionality implemented.
- Gallery page to show resident image uploads.
- Dynamic chat between management, resident, and visitors.

## Instructions

- Install npm, composer
- Run composer install.
- Generate key with `PHP artisan key:generate`
- Run npm install in both the folders (lunamar_laravel_with_react and lunamar-chat-server)
- Run `npm run dev` to create necessary files for reactjs in laraval.
- Configure MYSQL database details in the .env file
- Run `php artisan serve` in the lunamar_laravel_with_react folder
- Run `npm start` in the lunamar-chat-server folder.

## Website Demo Screenshots

- Home Page

<img width="950" height="450" src="screens/homepage.png" alt="hr">

- About Us

<img width="950" height="450" src="screens/aboutuspage.png" alt="hr">

- Services Page

<img width="950" height="450" src="screens/servicespage.png" alt="hr">

- Contact Us

<img width="950" height="450" src="screens/contactuspage.png" alt="hr">

- Residents Upload Gallery

<img width="950" height="450" src="screens/residentuploadpage.png" alt="hr">

- Blog Page

<img width="950" height="450" src="screens/blogpage.png" alt="hr">

- Login and Sign-up

<img width="950" height="450" src="screens/loginsignuppage.png" alt="hr">

- Resident Page

<img width="950" height="450" src="screens/residentpage.png" alt="hr">

- Visitor Page

<img width="950" height="450" src="screens/visitorpage.png" alt="hr">

- Admin Page

<img width="950" height="450" src="screens/adminpage.png" alt="hr">

- Manager Page

<img width="950" height="450" src="screens/managerpage.png" alt="hr">

- Chat between User and Manager

<img width="950" height="450" src="screens/chat1page.png" alt="hr">

<img width="950" height="450" src="screens/chat2page.png" alt="hr">
