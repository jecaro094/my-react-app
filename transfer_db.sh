#!/bin/bash

# Parámetros de entrada
LOCAL_DB_USER=$1
LOCAL_DB_NAME=$2
LOCAL_DB_HOST=$3
SSH_KEY_PATH=$4
EC2_USER=$5
EC2_HOST=$6
POSTGRES_USER=$7
POSTGRES_DB=$8

# Paso 1: Exportar los datos de la base de datos local
echo "Exportando datos de la base de datos local..."
PGPASSWORD=$LOCAL_DB_USER pg_dump -h $LOCAL_DB_HOST -U $LOCAL_DB_USER -d $LOCAL_DB_NAME -f backup.sql

# Paso 2: Subir el archivo SQL a la instancia de Elastic Beanstalk
echo "Subiendo archivo SQL a la instancia de Elastic Beanstalk..."
scp -i $SSH_KEY_PATH backup.sql $EC2_USER@$EC2_HOST:~/backup.sql

# Paso 3: Copiar el archivo SQL al contenedor en Elastic Beanstalk
echo "Accediendo a la instancia de Elastic Beanstalk..."
ssh -i $SSH_KEY_PATH $EC2_USER@$EC2_HOST << EOF
  echo "Copiando archivo SQL al contenedor..."
  CONTAINER_ID=\$(sudo docker ps -q --filter ancestor=postgres:14-alpine)
  sudo docker cp ~/backup.sql \$CONTAINER_ID:/backup.sql

  # Paso 4: Importar los datos en el contenedor
  echo "Importando datos en el contenedor..."
  sudo docker exec -it \$CONTAINER_ID /bin/sh -c "psql -U $POSTGRES_USER -d $POSTGRES_DB -f /backup.sql"
EOF

echo "Transferencia de datos completada."