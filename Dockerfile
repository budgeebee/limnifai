FROM node:22-alpine

WORKDIR /app

# Copy package.json from ephemeral (where it now lives)
COPY ephemeral/package*.json ./
RUN npm install

# Copy ephemeral source code
COPY ephemeral/ .

EXPOSE 1477

CMD ["npm", "run", "dev"]
