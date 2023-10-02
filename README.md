# NextJs Soulis Store

Para correr localmente se necesita la BD.
```
docker-compose up -d
```

* El -d significa **detached**

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env.**

* MongoDB URL local:
  ```

  MONGO_URL=mongodb://localhost:27017/soulisstoredb
  ```

* Reconstruir los modulos de node y next
```
pnpm i
pnpm start
```

## Llenar la información de la base de datos con informacionde pruebas

Llamar a:
```
http://localhost:3000/api/seed
```