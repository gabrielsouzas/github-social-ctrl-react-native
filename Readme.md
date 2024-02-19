# <img src="./src/images/logo_03_rounded.png" width="30" height="30" /> GitHub Social Management - React Native App

GitHub Social Management is a mobile application built in React Native that allows you to explore and manage a user's followers on GitHub. The application uses AsyncStorage to store information locally and the GitHub API to obtain and control real-time data.

## 🚀 Functionalities

- See a GitHub user's following and followers;
- Compare followers and see who doesn't follow a user back;
- Compare followers and see who follows a user and isn't followed back;
- Follow or unfollow a user from the app itself;
- View a Github user's complete data according to the GitHub API.

## 📷 Screenshots

<img src="./src/images/screenshoot01.jpeg" height="500" /> <img src="./src/images/screenshoot02.jpeg" height="500" />

## 🛠️ Tools, Technologies, and Libraries

[![React](https://img.shields.io/badge/React-18.2.0-lightblue.svg)](https://reactnative.dev/) </br>
[![React Native](https://img.shields.io/badge/React_Native-0.73.2-blue.svg)](https://reactnative.dev/) </br>
[![Expo](https://img.shields.io/badge/Expo-50.0.5-green.svg)](https://expo.dev/) </br>
[![AsyncStorage](https://img.shields.io/badge/AsyncStorage-1.21.0-orange.svg)](https://react-native-async-storage.github.io/async-storage/) </br>
[![GitHub API](https://img.shields.io/badge/GitHub_API-2022.11.28-lightgrey.svg)](https://developer.github.com/v3/) </br>
[![Octokit](https://img.shields.io/badge/Octokit-3.1.2-purple.svg)](https://developer.github.com/v3/)

## ⚙️ Prerequisites

Make sure you have the React Native environment configured on your machine. For more information, see [React Native - Getting Started](https://reactnative.dev/docs/getting-started).

Or use Expo, see [Expo.dev](https://expo.dev/).

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/gabrielsouzas/github-social-ctrl-react-native.git
```

2. Navigate to the project directory:

```bash
cd github-social-ctrl-react-native
```

3. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

## ▶️ Usage

Run the application on an emulator or physical device with Expo:

```bash
cd github-social-ctrl-react-native
npx expo start
```

## 📡 API Requests

The following are the main requests made to the GitHub API.

### 1. Get User Followers

**Endpoint:** `GET /users/{username}/followers`

**Description:** Retrieves the list of followers for a given GitHub user.

### 2. Get User Following

**Endpoint:** `GET /users/{username}/following`

**Description:** Fetches the list of users that a given GitHub user is following.

### 3. Follow User

**Endpoint:** `PUT /user/following/{username}`

**Description:** Follow a GitHub user.

**Note:** Provide access token.

### 4. UnFollow User

**Endpoint:** `DELETE /user/following/{username}`

**Description:** UnFollow a GitHub user.

**Note:** Provide access token.

### 4. Get User Details

**Endpoint:** `GET /users/{username}`

**Description:** Retrieves detailed information about a specific GitHub user.

Feel free to explore the corresponding code in the source files to understand the implementation details.

## 🤝 Contribution

Contributions are welcome! Feel free to open issues, propose improvements or send pull requests.

## 📄 License

This project is distributed under the MIT License.
