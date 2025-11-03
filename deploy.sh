#!/bin/bash

echo "🚀 Deploy do Users Backend API no Fly.io"
echo ""

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ Fly CLI não está instalado"
    echo ""
    echo "Instale com:"
    echo "  brew install flyctl"
    echo ""
    echo "Ou:"
    echo "  curl -L https://fly.io/install.sh | sh"
    exit 1
fi

echo "✅ Fly CLI encontrado"
echo ""

# Check if logged in
if ! flyctl auth whoami &> /dev/null; then
    echo "❌ Você não está logado no Fly.io"
    echo ""
    echo "Execute: flyctl auth login"
    exit 1
fi

echo "✅ Autenticado no Fly.io"
echo ""

# Create volume if it doesn't exist
echo "📦 Verificando volume..."
if ! flyctl volumes list | grep -q "users_db_data"; then
    echo "Criando volume para o banco de dados..."
    flyctl volumes create users_db_data --region gru --size 1
else
    echo "✅ Volume já existe"
fi

echo ""
echo "🚢 Fazendo deploy..."
flyctl deploy

echo ""
echo "✅ Deploy concluído!"
echo ""

