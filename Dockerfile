
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV TOKENIZERS_PARALLELISM=false
ENV OMP_NUM_THREADS=1

# Install CPU-only PyTorch
RUN pip install --no-cache-dir \
    --index-url https://download.pytorch.org/whl/cpu torch

# Install project dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY . .

# Start Flask through Gunicorn
CMD ["sh", "-c", "exec gunicorn --bind 0.0.0.0:${PORT:-8080} --workers 1 --threads 2 --timeout 300 app:app"]
