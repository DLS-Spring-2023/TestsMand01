if [ "$1" = "stop" ]; then
    docker stop generator_db
    exit 0
fi

docker run -d --rm \
--name generator_db \
-p 6000:8000 \
surrealdb/surrealdb:latest start