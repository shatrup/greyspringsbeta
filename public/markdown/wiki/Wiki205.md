Creating Android packages
========================================================
Basic requirements
------------------
> - **Git** for source code management
> - *Android Studio* : Optional, required for java debugging
> - *Ptyhon 2.7 for running various scripts*


> **Note**: To avoid the confusion, from now on, I'll be working on `branch101` name only.

Checkout to the release branch of the app you wish to create package for release
---------------------------------------------
Usually all the releases are done by creating a release branch from the master branch. To create a new relese branch from master branch run the following command while you are in master branch
 - `git checkout -b release_branch_name`
 Ex: 'release_toddler_games_android_ver_3.7.1.1_29.08.2017_piano_music_change_plus_quiztitle_bug_fixes'

 
Prepare release package
---------------------------------------------
1. Perquisites: Android SDK
2. android-ndk-r10d
3. Latest Java SDK
4. Go to the pdep folder to change internal version of the app.
 - path will be something like this: 'potli\src\apps\projects\ToddlerGames\proj.android\pdep\'
 - Open 'Configuration.cpp' and find the internal app version and change it to higher than the latest version already on the store.
5. Do the same thing in the **gradle** file
 - File path: 'potli\src\apps\projects\ToddlerGames\proj.android-studio\app\build.gradle'
 - Change 'versionCode' and 'versionName' accordingly.
 - To understand the concept of 'versionCode', follow the following link: [Link][VERSIONCODE]
6. Go to AndroidManifest.xml file to change the supported screen sizes as per different packages.
 - File path: 'potli\src\apps\projects\ToddlerGames\proj.android-studio\app\'
7. Compilation Steps:
 - Open `git-bash`
 - Change directory to the potli repository `cd c:/workspace/potli`
8. Set the environment variables/paths
 - `source .cuts`

9. Change directory to the desired project directory. For example, let's say, you want to setup `Toddler Games` project. For that, run the following commands:
 - `cd potli/src/apps/projects/ToddlerGames/proj.android-studio/`

 - `sh rescopy_ipad.sh` or `sh rescopy_iphone.sh` as per requirement, As we have all the assets in the `potli/src/apps/Resources` directory, we don't need all the assets to run the app. So, what this shell script will do is read the `resource.list.xml` file placed in the project root (`cd potli/src/apps/projects/ToddlerGames/`) directory, parse it and sync only the assets mentioned in that `xml` file to the current project directory. For more details, please check `rescopy.sh` and `resource.list.xml` files.
10. Open `cmd` from start menu
 - Change directory to the project folder of the app you want to create pckage for ex: `cd K:\GS\potli\src\apps\projects\ToddlerGames`
 - run the following command to compile the project: 'cocos compile -p android --android-studio -m release --ap android-15'
 Here, 15 is the minimum api level required for the app

11. Wait for the compilation, it may take some time.
12. If everything goes fine with the compilation, it will create the package and the path of the APK will ill be written there, which will by default be: `potli/src/apps/projects/ToddlerGames/bin/release/android/`
13. You have to create 4 packages i.e. 2 each for `armeabi` and `armeabi-v7a` platforms. For each platform, there are two types of packages, i.e. one with `ipad` resources  and other with `iphone` resources.
14. Files in which you need to make changes while creating packages are:
 - `potli\src\apps\projects\ToddlerGames\proj.android-studio\app\build.gradle` : for versionName and versionCode
 - `potli\src\apps\projects\ToddlerGames\proj.android-studio\app\AndroidManifest.xml`: type of screens supported (24 for ipad, 11 for iphone)
 - `potli\src\apps\projects\ToddlerGames\proj.android-studio\app\jni\Application.mk`: for selecting platform (i.e. 1 for armeabi or 2 for armeabi-v7a)
15. It is necessary that every new release has a version no. higher than the previous version of the same app.

[VERSIONCODE]: https://greysprings.sharepoint.com/gshare/_layouts/15/WopiFrame.aspx?sourcedoc=%7B3B54CFF1-1C52-451F-B87B-E299BCCEA27D%7D&file=GSWIKI&action=default&IsFolder=1&ListId=%7B2CED1AC9-7BC9-462C-B9B0-4C76088DDEA8%7D&ListItemId=5035