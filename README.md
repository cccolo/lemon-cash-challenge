# Lemon Cash - Challenge
### Candidato: José Luis Alvarez (alvarez.maroccolo@gmail.com)

<br>

### Pre-Requisitos
 ```
   node 18
   yarn 3
   java 17
   react-native: 0.74.2
   react: 18.2.0
 ```
 Environment Setup : https://reactnative.dev/docs/getting-started-without-a-framework (React native CLI Quickstart)

 ### Paquetes usados
 ```
 @react-native-async-storage/async-storage:
 Proporciona una API simple y persistente para el almacenamiento de datos en React Native. Útil para almacenar datos clave-valor de manera asincrónica.
```

 ```
@react-native-google-signin/google-signin:
Permite integrar la autenticación de Google en aplicaciones React Native. Facilita el inicio de sesión y el manejo de tokens de usuario.
```

```
@react-navigation/drawer:
Un componente de navegación de cajón (drawer) para React Navigation. Permite la navegación mediante un menú lateral deslizante.
```
```
@react-navigation/native:
Proporciona los componentes y funciones básicos necesarios para la navegación en aplicaciones React Native. Es el núcleo de React Navigation.
```
```
@react-navigation/native-stack:
Proporciona una implementación de navegación basada en pilas (stack navigation) para React Navigation, utilizando react-native-screens para un rendimiento mejorado.
```
```
@tanstack/react-query:
Una biblioteca de gestión de estados asincrónicos para React. Facilita la obtención, almacenamiento en caché, sincronización y actualización de datos del servidor.
```
```
axios:
Un cliente HTTP basado en promesas para hacer solicitudes HTTP. Es muy popular por su facilidad de uso y capacidades de interceptación.
```
```
lodash:
Una biblioteca de utilidades de JavaScript que proporciona funciones de ayuda para tareas comunes de programación, como la manipulación de matrices y objetos, el tratamiento de cadenas, etc.

 ```

 # NOTA - ¡¡¡ ATENCIÓN !!! - LEER
- Incluyo en el proyecto el file .env como tambien los files de google a modo de demostración... en un caso real, estos archivo no estaria incluido en el proyecto.


 ## Cómo corro el proyecto ?
 * Instalar paquetes npm ``` yarn install ```
 * Para iOS instalar los pods``` npx pod-install ```
 * Para iniciar metro ``` yarn start ```
 * Para instalar la app en un dispositivo ``` yarn android``` o ``` yarn ios```

 ## Unit test
  * Para correr los unit test es necesario correr el comando ``` yarn test ```

 ## Unit lint
  * Para correr lint es necesario correr el comando ``` yarn lint ```

<br>

# Estructura del proyecto

```
| - src
|  | - api
|  |   - ...
|  |   - ...
|  | - assets
|  |   - fonts
|  |     - ...
|  |     - ...
|  |   - images
|  |     - ...
|  |     - ...
|  | - commons
|  |   - ...
|  |   - ...
|  | - components
|  |   - ...
|  |   - ...
|  | - const
|  |   - ...
|  |   - ...
|  | - context
|  |   - ...
|  |   - ...
|  | - hooks
|  |   - ...
|  |   - ...
|  | - interfaces
|  |   - ...
|  |   - ...
|  | - navigation
|  |   - ...
|  |   - ...
|  | - reducers
|  |   - ...
|  |   - ...
|  | - scenes
|  |   - ...
|  |   - ...
|  |     - components
|  |     - ...
| - App.tsx 
```


<br>
<br>
# RUN APP IOS
<div align="center">
  <video width="600" controls>
    <source src="./doc/ios.mp4" type="video/mp4">
  </video>
</div>
<br>
<br>

# RUN APP ANDROID
<div align="center">
  <video width="600" controls>
    <source src="./doc/android.mp4" type="video/mp4">
  </video>
</div>
<br>
<br>

# TESTS
<div align="center">
  <video width="600" controls>
    <source src="./doc/test.mp4" type="video/mp4">
  </video>
</div>

