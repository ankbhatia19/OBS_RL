# RLAssistantOBS
### A plugin which allows OBS to listen to Rocket League events for automatic scene switching, etc.

## 1: Plugin Installation

1. Download ZIP:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/a4dac2a1-ce33-4677-9719-37bc9a87fdab)

2. Unzip in preferred location. Proceed to open root directory of overlay side by side with extracted zip, as shown:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/d500308c-1819-497c-903e-eb6ce8a42425)

3. Migrate plugins folder:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/23cfa099-f070-4f5b-a4ef-9a9fb42b1618)

4. Change directories to `programs/scripts/`:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/ff8e94c8-33ff-4b2c-b3dc-65d3f5193bb1)

5. Migrate OBS script:
    
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/997eabd5-e851-4a82-ba4d-714a6685c5c9)

6. Navigate to root directory of overlay. Proceed to edit the `START` script:
    
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/6eb41015-a3c2-487c-9830-220cf9c22a0a)

7. Append the `startOBSScript` such that your `START` script now contains these six lines, in this order:
```shell
cd ./programs/scripts
start startProjectScript.cmd
start startRelayScript.cmd
start startOBSScript.cmd
start "" http://localhost:4200/cp
exit
```

8. Test functionality by running `START` script as normal. Verify three terminals have been created instead of two.

## 2. OBS Configuration

1. Install `Advanced Scene Switcher` plugin from [here](https://github.com/WarmUpTill/SceneSwitcher/releases). Ensure the latest, **non-beta** release is downloaded and installed.

2. Find `Advanced Scene Switcher` under tools:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/ce27d766-1163-4dbe-b027-e937d3f1e11f)

3. Locate `import`:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/293dd2d2-9be2-422d-bcab-b581dcb7ec99)

4. Necessary file can be found in the originally downloaded ZIP file, underneath the `setup` directory:
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/abe37ebe-462b-4e89-9b53-319a06f79a70)

5. Enable `Advanced Scene Switcher`
   
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/03449ad7-d81c-4c16-8233-7e0e9d1ec2da)

6. Configure desired scenes underneath the `Macros` tab:
    
![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/c8cd81e3-99ce-4e5c-a701-af4d708bc7cf)

7. Note: Can also configure scene switch delay for switching back to Caster scene after game ends, for showing scoreboard for a fixed duration:

![image](https://github.com/ankbhatia19/OBS_RL/assets/25870725/c875c048-2d73-4029-9c8b-481ba604307f)

