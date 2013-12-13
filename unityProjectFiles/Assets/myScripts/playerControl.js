#pragma strict

//HEADLIGHT COLORS
public var hLightColor : Color = Color32(255, 255, 160, 255);
public var bLightColor : Color = Color32(70, 0, 0, 255);

//CHANGED IN pointSaver.checkTurn
var mySignal = false;

function Start () {
	//SETS TURN SIGNALS/CAMERAS TO DEFAULT SETTINGS
	startSetting();

}

function Update () {
	//CONTROL THE VEHICLE, FOR PLAYER STEERING
	numPadControls();
}


function numPadControls (){
/*
0 - View of rear-view mirror 
1 - View of Driver Side mirror
2 - Move in reverse
3 - View of Passenger Side mirror
4 - Turning left
5 - Braking
6 - Turning right
7 - Left turn signal
8 - Move forward
9 - Right turn signal
*/

//GET KEY DOWN

	//FIRST PERSON VIEW
	if(Input.GetKeyDown ("f")){
		transform.FindChild("CameraTop").camera.enabled = false;
	  	transform.FindChild("CameraRtV").camera.enabled = false;
	  	transform.FindChild("CameraLV").camera.enabled = false;
	  	transform.FindChild("CameraRVM").camera.enabled = false;
	  	transform.FindChild("CameraFP").camera.enabled = true;
	  	
	}
	
	//TOP VIEW FOR DEBUGGING
	if(Input.GetKeyDown ("t")){
		transform.FindChild("CameraRtV").camera.enabled = false;
	  	transform.FindChild("CameraLV").camera.enabled = false;
	  	transform.FindChild("CameraRVM").camera.enabled = false;
	  	transform.FindChild("CameraFP").camera.enabled = false;
	  	transform.FindChild("CameraTop").camera.enabled = true;
	}
	
	//REARVIEW MIRROR VIEW
	if(Input.GetKeyDown ("[0]")){
		transform.FindChild("CameraFP").camera.enabled = false;
		transform.FindChild("CameraTop").camera.enabled = false;
	  	transform.FindChild("CameraRtV").camera.enabled = false;
	  	transform.FindChild("CameraLV").camera.enabled = false;
	  	transform.FindChild("CameraRVM").camera.enabled = true;
	}
	
	//DRIVER SIDE MIRROR VIEW
	if(Input.GetKeyDown ("[1]")){
		transform.FindChild("CameraFP").camera.enabled = false;
		transform.FindChild("CameraTop").camera.enabled = false;
	  	transform.FindChild("CameraRVM").camera.enabled = false;
	  	transform.FindChild("CameraRtV").camera.enabled = false;
	  	transform.FindChild("CameraLV").camera.enabled = true;
	}
	
	//REVERSE, BRAKE LIGHTS WHITE
	if(Input.GetKeyDown ("[2]")){
		transform.FindChild("BLightLG").renderer.material.color = Color.white;
		transform.FindChild("BLightRG").renderer.material.color = Color.white;
	}

	//RIGHT MIRROR VIEW
	if(Input.GetKeyDown ("[3]")){
		transform.FindChild("CameraFP").camera.enabled = false;
		transform.FindChild("CameraTop").camera.enabled = false;
		transform.FindChild("CameraRVM").camera.enabled = false;
		transform.FindChild("CameraLV").camera.enabled = false;
		transform.FindChild("CameraRtV").camera.enabled = true;
	}
	
	//BRAKES, BRAKE LIGHTS RED
	if(Input.GetKeyDown ("[5]")){
		transform.FindChild("BLightLG").renderer.material.color = Color.red;
		transform.FindChild("BLightRG").renderer.material.color = Color.red;
	}

	//LEFT TURN SIGNAL 
	if(Input.GetKeyDown ("[7]")){
		//dashboard turn signal
		mySignal = true;
		transform.FindChild("turnLeft").renderer.enabled = true;
		transform.FindChild("turnRight").renderer.enabled = false;
		transform.FindChild("turnLeft").animation.Play("dashTurnSignal");
		transform.FindChild("turnRight").animation.Stop("dashTurnSignal");
		
		//turn signal lights on exterior of vehicle
		transform.FindChild("BLightLG").animation.Play("turnSignal");
		transform.FindChild("HLightLG").animation.Play("turnSignal");
		transform.FindChild("BLightRG").animation.Stop("turnSignal");
		transform.FindChild("HLightRG").animation.Stop("turnSignal");
		transform.FindChild("BLightRG").renderer.material.color = bLightColor;
		transform.FindChild("HLightRG").renderer.material.color = hLightColor;
	}
	
	//RIGHT TURN SIGNAL
	if(Input.GetKeyDown ("[9]")){
		//dashboard turn signal
		mySignal = true;
		transform.FindChild("turnRight").renderer.enabled = true;
		transform.FindChild("turnLeft").renderer.enabled = false;
		transform.FindChild("turnRight").animation.Play("dashTurnSignal");
		transform.FindChild("turnLeft").animation.Stop("dashTurnSignal");
		
		//turn signal lights on exterior of vehicle
		transform.FindChild("BLightRG").animation.Play("turnSignal");
		transform.FindChild("HLightRG").animation.Play("turnSignal");
		transform.FindChild("BLightLG").animation.Stop("turnSignal");
		transform.FindChild("HLightLG").animation.Stop("turnSignal");
		transform.FindChild("BLightLG").renderer.material.color = bLightColor;
		transform.FindChild("HLightLG").renderer.material.color = hLightColor;
	}
	
	
	
//GET KEY UP

	//BACK TO FIRST PERSON VIEW
	if(Input.GetKeyUp ("[0]") || Input.GetKeyUp ("[1]") || Input.GetKeyUp ("[3]")){
		transform.FindChild("CameraRtV").camera.enabled = false;
		transform.FindChild("CameraLV").camera.enabled = false;
		transform.FindChild("CameraRVM").camera.enabled = false;
		transform.FindChild("CameraFP").camera.enabled = true;
	}
	
	//TURN OFF BRAKE LIGHTS
	if(Input.GetKeyUp ("[2]")){
		transform.FindChild("BLightLG").renderer.material.color = bLightColor;
		transform.FindChild("BLightRG").renderer.material.color = bLightColor;
	}
	
	//TURN OFF left TURN SIGNAL
	if(Input.GetKeyUp ("[4]")){
		//dashboard turn signal
		mySignal = false;
		transform.FindChild("turnLeft").renderer.enabled = false;
		transform.FindChild("turnLeft").animation.Stop("dashTurnSignal");
		
		//turn signal lights off exterior of vehicle
		transform.FindChild("BLightLG").animation.Stop("turnSignal");
		transform.FindChild("HLightLG").animation.Stop("turnSignal");
		transform.FindChild("BLightLG").renderer.material.color = bLightColor;
		transform.FindChild("HLightLG").renderer.material.color = hLightColor;
	}
	
	//TURN OFF BRAKE LIGHTS
	if(Input.GetKeyUp ("[5]")){
		transform.FindChild("BLightLG").renderer.material.color = bLightColor;
		transform.FindChild("BLightRG").renderer.material.color = bLightColor;
	}
	
	//TURN OFF RIGHT TURN SIGNAL
	if(Input.GetKeyUp ("[6]")){
		//dashboard turn signal
		mySignal = false;
		transform.FindChild("turnRight").renderer.enabled = false;
		transform.FindChild("turnRight").animation.Stop("dashTurnSignal");
		
		//turn signal lights on exterior of vehicle
		transform.FindChild("BLightRG").animation.Stop("turnSignal");
		transform.FindChild("HLightRG").animation.Stop("turnSignal");
		transform.FindChild("BLightRG").renderer.material.color = bLightColor;
		transform.FindChild("HLightRG").renderer.material.color = hLightColor;
	}
}

function startSetting () {
//SETS VIEW TO FIRST PERSON, TURNS OFF TURN SIGNALS UNTIL NEEDED
	transform.FindChild("turnLeft").animation.Stop("dashTurnSignal");
	transform.FindChild("turnRight").animation.Stop("dashTurnSignal");
	transform.FindChild("turnLeft").renderer.enabled = false;
	transform.FindChild("turnRight").renderer.enabled = false;
	
	transform.FindChild("CameraRtV").camera.enabled = false;
	transform.FindChild("CameraLV").camera.enabled = false;
	transform.FindChild("CameraRVM").camera.enabled = false;
	transform.FindChild("CameraFP").camera.enabled = true;
	transform.FindChild("CameraTop").camera.enabled = false;
}