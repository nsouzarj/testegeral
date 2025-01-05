# Fase de construção (builder)
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package*.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila a aplicação angular para produção
RUN npm run build

# Fase de produção (nginx)
FROM nginx:alpine

# Copia os arquivos compilados para o diretório correto do nginx
COPY --from=builder /app/dist/testegeral/browser /usr/share/nginx/html

# Define a porta que o nginx irá expor
EXPOSE 80

# Inicia o nginx quando o container é iniciado
CMD ["nginx", "-g", "daemon off;"]
