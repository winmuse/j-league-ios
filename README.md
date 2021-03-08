# Step 1: Prerequisites & Prep Work
* Download and install JDK (v7 or newer)
* Download and install Node
* Download and install Android Studio
* Create an environment variable with the Java SDK path: Windows → Search → System → Advanced System Settings → Environment variables → New
>           [JAVA_HOME:C:\path\to\JavaSDK] 
* Due to a custom Android SDK installation location I also had to set an extra environment variable:
>           [ANDROID_HOME: C:\path\to\AndroidSDK] 
# Step 2: Configure an Android Virtual Device
* Set up Android Studio
* Create an empty Android Studio project
* Create an Android Virtual Device: Manage AVD → Create
* Boot your Android Virtual Device
# Step 3: Start your application
Install all the npm packages. Go into the project folder and type the following command to install all npm packages
```
npm install
npm start
```
# Step 4: Apk file build
Go into the project folder and type the following command to build apk file.
```
cd/android
gradlew assembleDebug 
```
* There are in \android\app\build\outputs\apk\debug
 ```
cd/android
gradlew assembleRelease 
```
* There are in \android\app\build\outputs\apk\release
