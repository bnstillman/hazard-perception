#pragma strict

var myTarget : Transform;
public var myVehicle : GameObject;
public var myCamera : GameObject;

/*
function FixedUpdate () {
	//set camera to match rotation angle of vehicle
	if(myVehicle.GetComponent(playerMissionPosition).myMission != "wait"){
		myTarget = myVehicle.GetComponent(playerMissionPosition).myTarget;
		myCamera.transform.position.x = myVehicle.transform.position.x;
		myCamera.transform.position.z = myVehicle.transform.position.z;
		myCamera.transform.eulerAngles.y = myVehicle.transform.eulerAngles.y;
		myCamera.transform.eulerAngles.x = 90;
		myCamera.transform.eulerAngles.z = 0;
		
		transform.position.x = myVehicle.transform.position.x;
		transform.position.z = myVehicle.transform.position.z;
		transform.eulerAngles.x = 0;
		transform.eulerAngles.z = 0;
		transform.LookAt(myTarget.transform, Vector3.up);
	}
}

function Update() {
	if (myVehicle.GetComponent(playerMissionPosition).myTarget) {
		myTarget = myVehicle.GetComponent(playerMissionPosition).myTarget;
	}
}*/