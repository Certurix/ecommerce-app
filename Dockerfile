FROM node:22-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm ci && cd backend && npm ci && cd ../frontend && npm ci

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && npm run build

EXPOSE 5000

CMD ["npm", "run", "backend"]
