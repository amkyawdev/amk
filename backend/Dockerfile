FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY src ./src
ENV PORT=7860
EXPOSE 7860
CMD ["node", "src/server.js"]