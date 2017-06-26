Custom Auth Node
=======

Este modulo es necesario para que la librería Angular que realiza un login contra Firebase o contra este servidor local NodeJs en el caso que no este disponible el primero.


----------
**Instalación y Uso**

La librería se utiliza con Typescript y Gulp para la automatización del desarrollo

    git clone https://github.com/mfreirehfexp/node-auth.git
    npm install
Luego para correr las unidades de prueba (esto compila en la carpeta Test y ejecuta todas las pruebas de los archivos *.spec*) se debe correr simplemente:

    gulp
Esto ejecuta todos los pasos y muestra el resultado tanto de la compilación como de las pruebas que se ejecutaron.

**Versión Productiva**

Para dejar por lista una version solamente se debe correr el archivo *commit.bat* para que se compile la version productiva, se haga el commit en el master y se haga el push a GitHub. El archivo espera 1 argumento, el mensaje del commit, ej:

    commit "Fixed Bugs"

**Conexion MySQL**

El proyecto viene con mysql y promise-mysql instalados, asi como clases armadas para la escritura SQL, para los datos de conexion se debe usar un archivo con nombre **".env"** (sin nada adelante del punto).

Dentro de ese archivo se escriben las variables de entorno que luego pueden ser accedidas desde Node

Ejemplo del archivo ".env"

    MYSQL_USER=root
    MYSQL_PASSWORD=pass
    MYSQL_DATABASE=database


----------
**Usos de la libreria**

Esta librería pretende exponer los metodos necesarios para contar con el atributo **uid** por mas que la conexión con firebase no haya sido exitosa.
Esta libreria debe devolver lo necesario para que el browser pueda hacer lo sieguiente.

    contructor( auth: CustomAuth ){
	    auth.loggin(this.user, this.password);
	    // luego...
	    // auth.uid == firebaseAuth.uid
    }

Por ahora se asumen que el servidor local tiene las siguientes limitaciones:

 - El usuario accedio por lo menos 1 vez via FirebaseAuth
 - No se permite crear usuarios locales
 - No se permite cambiar las contraseñas locales
 - No se permite ningún cambio local.

A pesar de que no se haga implementación local de todos los metodos, estos deben estar presentes en la librería para evitar acceder a la instancia local del FirebaseAuth.

----------
> Written with [StackEdit](https://stackedit.io/).