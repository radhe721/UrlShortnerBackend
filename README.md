# URL Shortener API

A simple backend service for shortening URLs with visit history tracking.

## Features

- Generate short URLs for any valid web address
- Redirect from short URLs to original destinations
- Track visit history for each shortened URL

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- nanoid

## Setup

### Prerequisites

- Node.js installed
- MongoDB database

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the project root with:
   ```
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server
   ```
   npm start
   ```

Server will run at http://localhost:3000

## API Endpoints

### Create Short URL

- **URL**: `/url`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "url": "https://example.com/very-long-url-that-needs-shortening"
  }
  ```
- **Response**:
  ```json
  {
    "id": "abc123de"
  }
  ```

### Access Short URL

- **URL**: `/:shortId`
- **Method**: `GET`
- **Description**: Redirects to the original URL

## Example Usage

1. Create a short URL:
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"url":"https://example.com/very-long-url"}' http://localhost:3000/url
   ```

2. The API returns a response with the short ID:
   ```json
   {"id":"abc123de"}
   ```

3. Access the short URL in your browser:
   ```
   http://localhost:3000/abc123de
   ```

4. You'll be redirected to the original URL.

## Database Schema

```javascript
const UrlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        require: true,
    },
    visitHistory: [{timestamp: { type: Number}}]
}, {timestamps: true})
```

## Error Handling

- Invalid URLs are rejected with a 400 status code
- Missing URLs in requests are rejected with a 400 status code
- Non-existent short URLs return a 404 status code 