#pragma strict

var holdAction : boolean = false;
var myMission: String;
var myTarget : GameObject;
var objComplete : boolean = false;

public var startMission1: Transform;
public var startMission2: Transform;
public var startMission3: Transform;
public var startMission4: Transform;
public var startMission5: Transform;
public var m1o1: GameObject;
public var m1o2: GameObject;
public var m2o1: GameObject;
public var m3o1: GameObject;
public var m4o1: GameObject;
public var m5o1: GameObject;
public var m5o2: GameObject;




var point1 : GameObject;
var point2 : GameObject;

function Start(){
	//hide all mission objectives
	hideOtherMission();
}

private var checkPoint1 : boolean = false;

function Update(){
	if(transform.GetComponent(playerMissionComponent).begin == true && holdAction == false){
		delayedStart();
	}
}
function delayedStart () {

	//Angle vehicle toward exit.
	if(myMission == "startMission2"){
		transform.rotation = Quaternion.Euler(0.0, 180.0, 0.0); 
	}else if(myMission == "startMission3"){
		transform.rotation = Quaternion.Euler(0.0, 270.0, 0.0); 
	}else if (myMission == "startMission4"){
		transform.rotation = Quaternion.Euler(0.0, 0.0, 0.0);
	}
		
	//Sets the goal destination based on current mission, sets cars starting position.
	if(myMission == "startMission1"){
		point1 = m1o1;
		point2 = m1o2;
		transform.position.x = startMission1.position.x;
		transform.position.y = startMission1.position.y;
	}else if(myMission == "startMission2"){
		point1 = m2o1;
		point2 = null;
		transform.position.x = startMission2.position.x;
		transform.position.y = startMission2.position.y;
	}else if(myMission == "startMission3"){
		point1 = m3o1;
		point2 = null;
		transform.position.x = startMission3.position.x;
		transform.position.y = startMission3.position.y;
	}else if(myMission == "startMission4"){
		point1 = m4o1;
		point2 = null;
		transform.position.x = startMission4.position.x;
		transform.position.y = startMission4.position.y;
	}else if(myMission == "startMission5"){
		point1 = m5o1;
		point2 = m5o2;
		transform.position.x = startMission5.position.x;
		transform.position.y = startMission5.position.y;
	}
	
	myTarget = point1;
	
	//MAKE CURRENT OBJECTIVES VISIBLE
	point1.renderer.enabled = true;
	if(point2 != null){
		point2.renderer.enabled = true;
	}
	holdAction = true;
}


function OnTriggerEnter(other : Collider){

	//SET NEXT OBJECTIVE WHEN PLAYER REACHES FIRST POINT
	if(other.name == point1.name && myTarget == point1 && objComplete == false) {
		if(point2 != null){
			transform.GetComponent(playerMissionComponent).newObjective = true;
			myTarget = point2;
			yield WaitForSeconds(2);
		}else{
			objComplete = true;
			transform.gameObject.GetComponent(playerMissionComponent).gameOver = true;
		}
	}	
	
	//STOP CONTROLS WHEN PLAYER FINISHES OBJECTIVES
	if(myTarget == point2 && other.name == point2.name && objComplete == false) {
		objComplete = true;
		transform.gameObject.GetComponent(playerMissionComponent).gameOver = true;
		transform.Find("c_cap").renderer.enabled = true;
		transform.GetComponent(pointSaver).myErrors = transform.GetComponent(pointSaver).myErrors +"Time left : "+transform.GetComponent(playerMissionComponent).text+") \n";
	}
		
}	


function hideOtherMission () {
	m1o1.renderer.enabled = false;
	m1o2.renderer.enabled = false;
	m2o1.renderer.enabled = false;
	m3o1.renderer.enabled = false;
	m4o1.renderer.enabled = false;
	m5o1.renderer.enabled = false;
	m5o2.renderer.enabled = false;
}