Greysprings quiz projects windows setup (up and running)
========================================================
Basic requirements
------------------
> - **Git** for source code management
> - **Windows**: *Visual Studio 2013 community edition* update 5
> - **Android**: *Android Studio* 
> - Mac: *XCode*


> **Note**: To avoid the confusion, from now on, I'll be working on `branch101` name only.


Cloning `potli` from remote server
----------------------------------
1. Let's say you want to clone source code to `c:/workspace`, Run the following command:
 - `cd c:/workspace`
 - Run `git clone git@gsgit.cloudapp.net:potli.git`. You will be asked for credentials. Please contact support for the same.
2. Once done, change directory to the source code directory
 - `cd c:/workspace/potli`

Syncing your local repository with the remote
---------------------------------------------
If you already have the source code but not in sync with the remote server:
 - Run `git fetch -a`

Checking out to the desired branch
----------------------------------
By default, `git` clones and starts in the `master` branch. You need to checkout to `branch101`:
  - `git checkout branch101`
  - `get merge origin/branch101`

Prepare application to run from visual studio
---------------------------------------------
1. Perquisites: Microsoft Advertising SDK for Windows and Windows Phone 8.x
To compile and run effectively, you may need to install Microsoft's Ads SDK for XAML. Please download and install the SDK from the given link: [Download Link][WINADSSDKLINK]

2. Compilation Steps:
 - Open `git-bash`
 - Change directory to the potli repository `cd c:/workspace/potli`
3. Set the environment variables/paths
 - `source .cuts`
4. You can find all the projects in `potli/src/apps/projects` directory. Visual Studio project solution file are maintained in the different directory `potli/src/apps/build`. To open the desired project, double click the `.sln`(short for solution) file of the respective project.

	***Example***: To open `Toddler Games` project, double click on `cocos2d-win8.1-universal-toddlergames.sln` file. This will open `Toddler Games` project with the `Visual Studio 2013 Community edition`.
5. Let's be back to `git-bash`. Change directory to the desired project directory. For example, let's say, you want to setup `Toddler Games` project. For that, run the following commands:
 - `cd potli/src/apps/projects/ToddlerGames/proj.Windows.Big/`

 - `sh rescopy.sh`, As we have all the assets in the `potli/src/apps/Resources` directory, we don't need all the assets to run the app. So, what this shell script will do is read the `resource.list.xml` file placed in the project root (`cd potli/src/apps/projects/ToddlerGames/`) directory, parse it and sync only the assets mentioned in that `xml` file to the current project directory. For more details, please check `rescopy.sh` and `resource.list.xml` files.

- `sh projupdate2013.sh`, This will update the 'Toddler Games' Windows project file ToddlerGames.Windows.vcxproj and project filters file ToddlerGames.Windows.vcxproj.filters to reflect the previously synced assets so that visual studio know about which assets to include for the app to run smoothly.
6. Go to project in visual studio and set `ToddlerGames.Windows` as your startup project and select `F5` or `Debug Menu > Start Debugging` or `Local Machine` button in the toolbar.
7. Wait for the compilation. It may take some time as you will be compiling for the first time. 
8. If everything goes fine with the compilation, app will start else contact support team.

[WINADSSDKLINK]: https://marketplace.visualstudio.com/items?itemName=AdMediator.MicrosoftAdvertisingSDKforWindowsandWindowsPhone8x