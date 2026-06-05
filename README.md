

Para implementar la configuración de roles se agregó una nueva columna 'rol' en la tabla usuarios utilizando un ENUM de PostgreSQL.

Antes de ejecutar el proyecto, es necesario correr el siguiente script SQL:
 
CREATE TYPE roles_usuarios AS ENUM ( 
   'ADMIN', 
   'LIDER', 
   'COLABORADOR' 
);  
 
ALTER TABLE usuarios 
ADD COLUMN rol roles_usuarios 
NOT NULL 
DEFAULT 'COLABORADOR'; 


 
