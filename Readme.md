# Scripvalut - Real time Stock market trading Web app(responsive) with MERN Stack

<!-- <img src="https://i.ibb.co/7YBSBH4/Screenshot-2023-07-11-013700.jpg"/> -->

[![image](https://www.linkpicture.com/q/home_61.png)](https://www.linkpicture.com/view.php?img=LPic64c75ce30883d402745486)

Scripvalut is a cutting-edge web application that brings the world of stock market trading to your fingertips. With its real-time updates and seamless user experience, Scripvalut is designed to cater to both novice investors and seasoned traders.

Powered by the MERN (MongoDB, Express.js, React.js, Node.js) stack, Scripvalut offers a responsive interface that adapts flawlessly to any device or screen size. Whether you're accessing it from your desktop computer, tablet, or smartphone, you can stay connected to the stock market wherever you go.

With Scripvalut, you can monitor live stock prices, track your favorite companies, and make informed investment decisions with confidence. The intuitive user interface allows you to easily navigate through different markets, view detailed charts and graphs, and execute trades seamlessly.

Live Website - https://scripvault-frontend-6lw9.onrender.com/

### 📝 Table of Contents

- Features
- Technologies
- Installation
- Usage
- Authors

### 🧐 Features

- User registration and authentication with login.
- Stock and Mutual Fund listing and searching.
- Stockt and Mutual Fund details.
- Add or update address,Gender, Mobile number, DOB.
- Add to portfolio and wishlist.
- Buy or Sell stocks or mutual fund.
- Track all networth and Wallet balance.

### ⛏️ Technologies

This project is built with the following technologies:

- MERN stack (MongoDB, Express, React, Node.js,socket.io)
- Axios (for HTTP requests)
- JWT Token with token generation and verification. also includes Refesh Token with JWT and axios interceptors
- Styled components (for styling)
- Font Awesome (for icons) and Material UI for tables, date components and icons.
- Python is used to create a stock and mutual fund server, Get all Indian stocks(NSE only) real time and detail data
  Check here - https://my-stock-api.onrender.com
- Socket-io is used for Real time price and graphs.

  Backend server - https://socket-api-backend.onrender.com/
  Frontend server - https://socket-api-frontend.onrender.com
  usage - https://socket-api-frontend.onrender.com/?symbol=IRCTC

- Nodemailer is used to send a reset password link through email, Kindly generate following keys if you want it to run on your machine

GMAIL_ID=`<Your email id for mail>`
GMAIL_PASSWORD=`<Your password id for mail>`

<small>Note- socket-io is currently not working in mobile device, I am working on it, if you have any solution, then you are most welcome.</small>

### 🏁 Installation

To run this project on your local machine, follow these steps:

1. Clone the repository: git clone https://github.com/AbhayKadam57/ScripValut.git
2. Change directory: `cd server`
3. Install dependencies: `npm install`
4. Create a .env file and add the following environment variables

```
MONGO_URI=<MONGODB URI>
JWT_SECRET_KEY=<SECERTE_KEY>
GMAIL_ID=<Your email id for mail>
GMAIL_PASSWORD=<Your password id for mail>
FRONTEND_URL=<Your frontend url>
RapidAPI_KEY=<RapidAPI_KEY> //optional can be avoid
RapidAPI_host=<RapidAPI_KEY>//optional can be avoid

```

5. Start the backend server: `npm start`(if you are using nodemon then change in script of pacakge.json for start i.e `nodemon index.js`)

6. Then `cd ..` to comes back to root file and do `cd app` and then do `npm install`.

7. Create a .env file and add the following environment variables

```
VITE_BASE_URL="http://localhost:8080/api" ----> Express backend Server
VITE_SOCKET_API=https://socket-api-backend.onrender.com ----> Socket-io backend server
VITE_STOCK_API=https://my-stock-api.onrender.com ----> This python api for stocks and MF

```

8. start the frontend server: `npm run dev`.

### 🎈Usage

1. Register as a user or login to an existing account.
2. Browse the stocks and MF listed on the home page or search for a specific stocks.
3. Click on a stocks to view its details.
4. Add the product to your portfolio or watchlist and proceed to buy or sell.

### ✍️ Authors

[@AbhayKadam57](https://github.com/AbhayKadam57) - only for clone making

- Desclaimer - All rights of images are belong to the blink it compony.
  This project is created just for educational purposes only. we do not intend to use it for any commercial purposes.
