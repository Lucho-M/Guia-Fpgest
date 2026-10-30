FROM python:3.12-slim
WORKDIR /app
COPY servidor_guia.py .
EXPOSE 8080
CMD ["python", "servidor_guia.py", "--web", "/guia", "--puerto", "8080"]
