# === 构建阶段 ===
FROM node:18.20.2 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 lock 文件
COPY package.json pnpm-lock.yaml* ./

# 安装 pnpm（推荐）或改为 npm/yarn
RUN npm install

# 复制项目源代码
COPY . .

# 构建生产版本
RUN npm build

# === 生产环境阶段（只拷贝构建产物）===
FROM nginx:alpine AS production

# 删除默认配置
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建产物到 nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝自定义 nginx 配置（可选）
COPY docker.nginx.config /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
