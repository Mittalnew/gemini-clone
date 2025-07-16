#  Gemini Chatroom Clone 

I'm excited to share my latest project: a front-end clone of the Gemini conversational AI's user interface. This project goes beyond just aesthetics, simulating key features like OTP-based login, dynamic chatroom management, realistic AI messaging behavior, and a modern, intuitive user experience.

---

##  Check It Out Live!

Curious to see it in action?

🌐 **Live Demo**: https://gemini-clone-seven-virid.vercel.app/login
📂 **GitHub Repository**: https://github.com/Mittalnew/gemini-clone

---

## 📦 Tech Stack I Used

I built this project with a robust set of modern web technologies:

* **Framework**: **React** (powered by Vite for a super-fast development experience)
* **Styling**: **Tailwind CSS v4.1** for utility-first, rapid UI development
* **State Management**: **Redux Toolkit** to manage complex application state efficiently
* **Routing**: **React Router v6** for seamless navigation
* **Form Validation**: **React Hook Form** paired with **Zod** for robust and reliable form handling
* **Deployment**: **Vercel** for effortless, continuous deployment
* **Notifications**: **React Toastify** for clear user feedback
* **Other Essential Tools**: **UUID** for unique IDs, **Classnames** for conditional styling, **Throttling** for controlled events, and **Base64** for image previews.

---

##  Key Features I Implemented

Here’s a breakdown of the core functionalities I built into this clone:

###  Authentication

* **Country Code Selection**: Integrated with `restcountries.com` to allow dynamic country code selection.
* **OTP-Based Login Simulation**: A realistic login flow simulated using `setTimeout` for a smooth user experience.
* **Robust Form Validation**: Implemented client-side validation for phone numbers using **Zod** and **React Hook Form**.

###  Dashboard Experience

* **Dynamic Chatroom Management**: Users can easily create and delete chatrooms, with all changes thoughtfully persisted in **Redux**.
* **Intuitive User Feedback**: **Toasts** provide timely and helpful notifications for all user actions.
* **Efficient Search**: A custom `useDebounce.js` hook powers a smooth, responsive search functionality for chatrooms.
* **First-Time User Welcome**: A friendly welcome popup greets new users, utilizing `localStorage` to ensure it only appears once.

###  Immersive Chatroom Interface

* **Full Chat UI**: A complete chat interface supporting both user and Gemini bot interactions.
* **Realistic AI Responses**: Gemini replies are delayed using `setTimeout`, mimicking a real AI's processing time.
* **"Gemini is Typing..." Indicator**: A subtle yet effective typing indicator enhances the conversational feel.
* **Reverse Infinite Scroll**: Implemented pagination to load 20 dummy messages at a time from `fakeMessages.js`, offering a smooth "load more" experience by scrolling to the top.
* **Auto-Scroll to Latest Message**: Ensures the chat always snaps to the newest message using `scrollIntoView` for an uninterrupted flow.
* **Image Upload & Preview**: Users can upload images and see an instant base64 preview.
* **Copy Message on Hover**: A convenient feature allowing users to easily copy chat messages.
* **Chatroom Persistence**: Each chatroom's state is thoughtfully persisted in `localStorage`.

###  Global UX Enhancements

* **Fully Responsive Design**: Optimized for a seamless experience across both mobile and desktop devices.
* **Dark Mode Toggle**: A floating button in the `Navbar.jsx` allows users to effortlessly switch between light and dark themes.
* **Enhanced Keyboard Accessibility**: Actions like sending messages or creating rooms are easily triggered by the Enter key.
* **Smooth Loading States**: Implemented **skeleton loading** for the chat using `ChatSkeleton.jsx` to provide a better perceived performance.
* **Comprehensive Notifications**: **Toast notifications** provide clear feedback for all significant actions across the application.

---

## 📁 Project Structure & Core Logic

I’ve organized the project for clarity and maintainability:
```bash
src/
├── components/          # Reusable UI elements (navbar, chat bubble, modals, etc.)
├── features/
│   ├── auth/            # All logic for OTP login
│   ├── dashboard/       # Chatroom listing, creation, and deletion
│   └── chatroom/        # The main chat interface components
├── hooks/               # Custom hooks, like useDebounce.js
├── store/               # Redux slices for auth and chat state management
└── utils/               # Static data, like fake messages


Core Logic Explained:
>  Throttling (Simulated Thinking Delay): Gemini’s responses are throttled using setTimeout combined with setTyping(true). This 2-second delay realistically simulates the AI "typing" before it sends its reply, making the interaction feel more authentic.

>  Pagination & Infinite Scroll: Dummy messages are paginated, loading 20 messages per page from fakeMessages.js. The "reverse infinite scroll" loads older messages when the user scrolls to scrollTop = 0, ensuring a smooth historical chat view.

>  Robust Form Validation: The login input benefits from client-side validation using React Hook Form and Zod. This prevents empty fields and provides instant, helpful toast error messages to the user.

##How to Run It Locally:----->
git clone https://github.com/Mittalnew/gemini-clone.git
cd gemini-clone
npm install
npm run dev

