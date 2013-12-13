#pragma strict

var myTarget : GameObject;


function Update () {
	if(transform.parent.GetComponent(playerMissionComponent).begin == true){
		myTarget = transform.parent.GetComponent(playerMissionPosition).myTarget;
		transform.LookAt(myTarget.transform, Vector3.up);
	}
}