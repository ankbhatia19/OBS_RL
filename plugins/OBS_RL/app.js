import { WebSocket, WebSocketServer } from 'ws';

let OBSRelay;
let SOSRelay;

var GameState = {};
var GameStateProxy;

const OBSMessage = {
    d: {
        eventData: {
            eventData: {
                message: "Default"
            },
            eventType: "AdvancedSceneSwitcherEvent",
            vendorName: "AdvancedSceneSwitcher"
        },
        eventIntent: 512,
        eventType: "VendorEvent"
    },
    op: 5
}

function initOBSRelay(){
    console.log("Attempting OBS connection...")

    OBSRelay = new WebSocketServer({ port: 4554 });
    OBSRelay.on('connection', function connection(ws) {
      console.log("Connected to OBS")
      ws.on('error', console.error);
    
      ws.on('message', function message(data) {
        console.log('received: %s', data);
      });

      GameStateProxy = new Proxy(GameState, {
        set: function (target, key, value) {
            target[key] = value;

            if (value === "STARTED"){
                OBSMessage.d.eventData.eventData.message = "GameStarted"
            }
            else if (value === "FINISHED"){
                OBSMessage.d.eventData.eventData.message = "GameFinished"
            }
            else if (value === "INTERRUPTED"){
                OBSMessage.d.eventData.eventData.message = "GameInterrupted" 
            }

            ws.send(JSON.stringify(OBSMessage));
            return true;
        }
      });
      GameStateProxy.state = "DEFAULT"
    });
}

var attemptCount = 1
function initSOSRelay() {
    
    console.log('Attempting Rocket League connection... %d', attemptCount)

    SOSRelay = new WebSocket("ws://localhost:49122");

    setInterval(function () {
        if (SOSRelay.readyState === WebSocket.CLOSED) {
            attemptCount++;
            initSOSRelay();
        }
    }, 10000);

    SOSRelay.on('open', function open() {
        console.log("Connected to Rocket League");
    });

    SOSRelay.on('message', function message(msg) {
        
        let SOSMessage = JSON.parse(msg);
        
        if (SOSMessage.event == "game:update_state"){
            
        }
        else if (SOSMessage.event === "game:post_countdown_begin"){
            console.log(SOSMessage)
            console.log("Sent START signal to OBS")
            GameStateProxy.state = "STARTED"
        }
        else if (SOSMessage.event === "game:match_ended"){
            console.log("Sent FINISHED signal to OBS")
            GameStateProxy.state = "FINISHED"
        }
        else if (SOSMessage.event === "game:match_destroyed"){
            if (GameStateProxy.state === "STARTED"){
                console.log("Sent INTERRUPTED signal to OBS")
                GameStateProxy.state = "INTERRUPTED"
            }
        }
        
    });

    SOSRelay.on('error', console.error);
}

initSOSRelay();
initOBSRelay();