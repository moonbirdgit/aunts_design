# 1. 使用官方的 Node.js 18 作為基礎映像
FROM node:18-slim

# 2. 設定工作目錄
WORKDIR /usr/src/app

# 3. 複製 package.json 和 package-lock.json
COPY package*.json ./

# 4. 安裝依賴
RUN npm install --only=production

# 5. 複製所有應用程式原始碼
COPY . .

# 6. 公開容器將要監聽的端口
EXPOSE 8080

# 7. 定義啟動容器時要執行的命令
CMD [ "npm", "start" ]