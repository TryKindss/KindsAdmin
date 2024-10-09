# KindsAdmin

This is the admin panel for [TryKinds](https://trykinds.com), a platform for data encryption and data privacy. TryKinds is a secure, privacy-preserving platform that allows users to encrypt and decrypt their data, and to share it with others securely. Trykinds today!

## Project Structure

This project consists of two main parts: a frontend built with Next.js and TypeScript, and a backend using Express.js and TypeScript.

### Frontend Setup

The frontend is located in the `frontend` directory and uses Next.js with TypeScript.

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/KindsAdmin.git
   cd KindsAdmin/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the variables as needed

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Backend Setup

The backend is located in the `backend` directory and uses Express.js with TypeScript.

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables as needed

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

The backend server should now be running on [http://localhost:5000](http://localhost:5000) (or the port specified in your environment variables).

## Development

For active development, you can use the following commands:

- Frontend: `npm run dev` in the `frontend` directory
- Backend: `npm run dev` in the `backend` directory

These commands will start the development servers with hot-reloading enabled.
