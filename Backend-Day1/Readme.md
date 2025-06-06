# 📦File Upload Service

This is a simple Node.js/Express backend to upload PNG or JPEG files (≤ 2 MB) and return their accessible URL.

## 📁 Folder Structure

```
/server
 ├─ index.js
 ├─ routes/upload.js
 ├─ uploads/    
 └─ .env.example
```

## 🚀 Setup

```bash
npm i
npm run start
```

## 🔐 .env Sample

```env
PORT=3000
MAX_SIZE_MB=2
```

## Sample Postman POST Request Image
![Postman post request](./Screenshot%202025-04-23%20014513.png)

## 🧪 Upload with cURL

```bash
curl -X POST http://localhost:3000/api/upload 
  -F "image=@/path/to/image.jpg"
```
## Testing
Testing done using supertest and vitest
```
npm test
```
## Licence
```
Happy Coding!
```