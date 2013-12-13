#pragma strict


//must hold gameObject to watch variables outside of OnTriggerEnter()
var myStopLight : GameObject;

//Retrieved from streetLight gameObject -- travelDir opposite currentGreenLight means vehicle must stop
var travelDir : String;

//If vehicle has stopped, watchLight becomes true until travelDir = myStopLight.currentGreenLight
var watchLight : boolean = false;

//Is set from streetLight.currentGreenLight during OnTriggerEnter() -- when this variable does not match the myStopLight.currentGreenLight it means light has changed
var currentGreen : String;

function Update () {
	//NOTE : currentGreenLight cannot = 0 during the change, because this means there is a yellow light.
	/*FOR EXAMPLE : : :
	Light is red means travelDir opposite currentGreenLight
			Lets say currentGreenLight = "NS"
	Opposite light turns yellow
			currentGreenLight = ""
	Opposite light turns red
			currentGreenLight = ""
	Your light turns green
			currentGreenLight = "WE"
	
	*/
	if(watchLight && myStopLight.transform.GetComponentInChildren(streetLight).currentGreenLight != currentGreen && myStopLight.transform.GetComponentInChildren(streetLight).currentGreenLight != ""){
		//if all conditions met, the car goes and watchLight is disabled.
		transform.GetComponent(aiStates).goState = true;
		watchLight = false;
	}
}

function OnTriggerEnter (other : Collider) {
	if(other.gameObject.layer == 20 && other.gameObject.name == "_stopCheck"){
		//conditions are met when reaching _speedCheck from intersections -> intersectionLights
		myStopLight = other.gameObject;  //hold gameObject to watch for changes
		travelDir = transform.GetComponent(aiStates).travelDir; //which direction is this vehicle traveling
		if(((travelDir == "North" || travelDir == "South") && other.gameObject.transform.GetComponentInChildren(streetLight).currentGreenLight == "WE") || ((travelDir == "East" || travelDir == "West") && other.gameObject.transform.GetComponentInChildren(streetLight).currentGreenLight == "NS")) {
			//conditions are met when vehicle approaches red light (travelDir != currentGreenLight)
			transform.GetComponent(aiStates).stopState = true;	//make vehicle stop
			watchLight = true;	//keep watch for changes
			currentGreen = other.gameObject.transform.GetComponentInChildren(streetLight).currentGreenLight; //set initial value of currentGreenLight
		}
		
		
	}
}