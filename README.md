
![monkey](https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/3c79f1f5-83bd-47a0-8a94-bb361ad3ce73)

# MeesMonkey App 
### A unofficial wrapper around Meesman Indexbeleggen
<img src="https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/57cb4f81-6f21-42c8-a3d9-e30b2b3a9a91" height="400">
<img src="https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/0b2d57a4-7ee0-406c-9919-c10d77686840" height="400">
<img src="https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/7fcfcd2e-036e-46de-ab9d-e019d87844d1" height="400">
<img src="https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/7c5f8246-e59c-410a-8342-43de5e2c61ff" height="400">
<img src="https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/8a45a324-bad9-4043-9b44-211260f31fb1" height="400">

Because Meesman Indexbeleggen does not provide their own app, I decided to build one for myself independently. The app utilizes a custom API endpoint that can scrape account details from mijn.meesman.nl. The whole app is designed using best practices in security so we never store raw credentials, security keys are encrypted and stored on your local device and all data is sent over https. Feel free to check out the code on how the app works. For details on the API, refer to the repository: [MeesmanAPI](https://github.com/two-trick-pony-NL/MeesmanAPI).

## Release to app stores: 
I intend to use the app for personal use, but if there is enough demand I can release the app through the appstores. Please let me know you are interested in this issue: https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/issues/2 

## Features: 
- Push notification on Friday to tell you markets are closed
- Push notification on Monday to tell you your account has been updated
- Account screen: Shows your accounts, balance and a graph
- Returns screen: Shows your current returns (In % and €), your cost base, a overview per year and what €1 euro invested would have returned now.
- Transactions screen: Shows your transactions per week as well as your returns and balance. 

## App Technology
- The app is constructed using Expo (React Native) and is designed to function on both Android and iOS platforms. However, thorough testing has been conducted primarily on iOS as I don't have a Android device. 
- The backend is a AWS Lambda Function using FastAPI (Python) see documentation here [MeesmanAPI](https://github.com/two-trick-pony-NL/MeesmanAPI) 

## Known issues
- The app may only display data for the first Meesman account if multiple accounts are associated. It's on my radar and something I might fix in the future
- The logout button does clear your session, but it still requires you to restart the app to actually log out. 

## Affiliation Disclosure
It is important to note that I have no affiliation with Meesman Indexbeleggen. This app is an independent project developed to enhance the user experience for Meesman investors. While efforts have been made to ensure accurate functionality, users are advised to exercise caution and carefully consider the known limitations mentioned above.

By using this app, you acknowledge that it is an unofficial solution and that I am not liable for any inaccuracies, losses, or inconveniences that may arise from its use. Your feedback and suggestions for improvement are welcome, just open an issue.

#For developers: How to Run
## Installation and Running Instructions

### Prerequisites:
- Node.js and npm installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).

### Installation:
- npm install -g expo-cli
clone the repo
- ```git clone https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App.git```
  go into the folder
- ```cd MeesMonkey```
install dependancies
- ```npm install```
Run the local server
- ```npx expo start```

# How MeesMonkey handles your Username and Password:
### Security Overview
MeesMonkey uses security best practices. We're very aware that your username and password and financial data are sensitive and as a consequence we are very carefull with that data. 
By design we decided that: 
1. We don't store any of your data anywhere --> Any persistant data stays with you locally on your device
2. We don't track any of your data --> There are 0 analytics tools installed (except for Sentry that reports crashes of the app anonymously )
4. We use best practices in security:
- EAS 128 Encryption using Fernet Tokens
- All communication over HTTPS
- We do not store your credentials on our server and do not track you as a user. 
- Your credentials are stored as a encrypted token on your local device.
**- If you want to stop using MeesMonkey all you have to do is delete the app. This will delete the encrypted token from your device.**
  
### Authentication in code
If you want to review our security implementation in code then please check out the following code. Feel free to open an issue if there is something you'd like to see improved.
- Passing usercredentials in the app: [AuthApi.js]([url](https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/blob/main/api/AuthApi.js))
- Storing the AuthToken locally in the app: [App.js]([url](https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/blob/main/App.js))
- Encrypting and decrypting usercredentials without storing them on the server: [Authentication.py]([url](https://github.com/two-trick-pony-NL/MeesmanAPI/blob/main/authentication.py))

### Schematic on authentication
![Artboard](https://github.com/two-trick-pony-NL/MeesMonkey-Unofficial-Meesman-App/assets/71013416/b7e0f0e0-5023-47cc-a8de-25172e7b960c)



