#pragma strict


private var myPoints : int = 0;
private var mySpeed : int = 0;
var mySpeedLimit : int = 99;
private var speeding = false;
private var speedCount : int = 0;
private var myRoadDir : String;
private var limitCheck = false;
private var limitCount : int = 0;

//used by mission timer at end of game
public var myErrors : String;
public var myResB : int = 0;
public var mySchoolB : int = 0;

private var bonusPoints : boolean;
private var currentZone : String = "";
private var myZone : String;

private var myGreenLight : String;
private var lightCount : int = 0;
private var throughRed = false;
private var myDirection : String;
private var holdDirection : String;
private var myTS = false;
private var turnCount : int = 0;

function Start () {

}



function Update () {
	myDirection = transform.GetComponent(playerSteer).travelDir;
	mySpeed = transform.GetComponent(playerSteer).MPHSpeed;
	transform.FindChild("currentPoints").GetComponent(TextMesh).text = myPoints.ToString();
	checkSpeed();
	countThroughRed();
	if(Input.GetKey("[4]") || Input.GetKey("[6]")){
		checkTurn();
	}
	
	
	
	
}

function OnCollisionEnter (other : Collision) {
//ADD POINTS FOR HITTING A BUILDING ---20 IF MPH > 30, 10 IF MPH < 30
	if((other.gameObject.layer == 14 || other.gameObject.layer == 8) && transform.GetComponent(playerMissionComponent).gameOver == false){
		if(transform.GetComponent(playerSteer).MPHSpeed > 30) {
			myPoints = myPoints + 20;
			checkBonusPoints();
			transform.FindChild("currentAlert").GetComponent(TextMesh).text = "High speed collision (+20)";
			myErrors = myErrors +"High speed collision (+20, "+transform.GetComponent(playerMissionComponent).text+") \n";
			zonePointsAlert();
		}else{
			myPoints = myPoints + 10;
			checkBonusPoints();
			transform.FindChild("currentAlert").GetComponent(TextMesh).text = "Collision (+10)";
			myErrors = myErrors +"Collision (+10, "+transform.GetComponent(playerMissionComponent).text+") \n";
			zonePointsAlert();
		}
	}
	


//ADD POINTS FOR RUNNING STOP SIGN

//ADD POINTS FOR EXTENDED OFF ROAD TIME
}


function OnTriggerEnter (other : Collider) {

	if(other.gameObject.layer == 19) {
		myRoadDir = other.gameObject.GetComponent(rdConfig).roadDir;
		yield WaitForSeconds(2);
		if(((myRoadDir == "NS" && (myDirection == "North" || myDirection == "South")) || (myRoadDir == "WE" && (myDirection == "West" || myDirection == "East")))) {
			mySpeedLimit = other.gameObject.GetComponent(rdConfig).speedLimit;
		}else if(mySpeedLimit == 99){
			mySpeedLimit = other.gameObject.GetComponent(rdConfig).speedLimit;
		}
	}

	//ADD EXTRA POINTS --- +15 IN A SCHOOL ZONE, +10 IN RESIDENTIAL
	if(other.gameObject.layer == 21 && transform.GetComponent(playerMissionComponent).gameOver == false){
		bonusPoints = true;
		currentZone = other.gameObject.name;
	}

	//ADD POINTS FOR RUNNING A RED LIGHT
	if(other.gameObject.layer == 20 && other.gameObject.name == "_stopCheck" && throughRed == false){ //&& transform.GetComponent(playerMissionComponent).gameOver == false){
		myGreenLight = other.gameObject.Find("Street light 2 N260408").GetComponent(streetLight).currentGreenLight;
		if((myGreenLight == "NS" && (myDirection == "East" || myDirection == "West")) || (myGreenLight == "WE" && (myDirection == "North" || myDirection == "South"))) {
			throughRed = true;
			lightCount = 0;
			myPoints = myPoints + 15;
			checkBonusPoints();
			transform.FindChild("currentAlert").GetComponent(TextMesh).text = "Through red light (+15)";
			myErrors = myErrors +"Through red light (+15, "+transform.GetComponent(playerMissionComponent).text+") \n";
			zonePointsAlert();
		}
	}
}

function OnTriggerExit (other : Collider) {
	//ADD EXTRA POINTS --- +15 IN A SCHOOL ZONE, +10 IN RESIDENTIAL
	if(other.gameObject.layer == 21){
		bonusPoints = false;
	}
}

function zonePointsAlert(){
	yield WaitForSeconds(3);
	if(bonusPoints == true){
		transform.FindChild("currentAlert").GetComponent(TextMesh).text = myZone;
		yield WaitForSeconds(3);
		transform.FindChild("currentAlert").GetComponent(TextMesh).text = "";
	}else{
		transform.FindChild("currentAlert").GetComponent(TextMesh).text = "";
	}
}

function checkBonusPoints () {
	if(bonusPoints == true && transform.GetComponent(playerMissionComponent).gameOver == false){
		if(currentZone == "rz"){
			myPoints = myPoints + 10;
			myZone = "Residential Bonus +10";
			myResB = myResB + 1;
		}else if(currentZone == "sz"){
			myPoints = myPoints + 15;
			myZone = "School Bonus +15";
			mySchoolB = mySchoolB + 1;
		}
	}
}

function checkSpeed () {
	if(speedCount < 301 && speeding == true){
		speedCount++;
	}
	
	if(speedCount > 300 && speeding == true){
		speeding = false;
	}
	
	if(speeding == false){
	//ADD POINTS FOR SPEEDING ---10 > 15MPH, 5 < 15MPH
		if(mySpeed > (mySpeedLimit + 15)){
			speeding = true;
			speedCount = 0;
			myPoints = myPoints + 10;
			checkBonusPoints();
			transform.FindChild("currentAlert").GetComponent(TextMesh).text = "Speeding by > 15MPH (+10)";
			myErrors = myErrors +"Speeding by > 15MPH (+10, "+transform.GetComponent(playerMissionComponent).text+") \n";
			zonePointsAlert();
		}else if(mySpeed > (mySpeedLimit + 5)){
			speeding = true;
			speedCount = 0;
			myPoints = myPoints + 5;
			checkBonusPoints();
			transform.FindChild("currentAlert").GetComponent(TextMesh).text = "Speeding (+5)";
			myErrors = myErrors +"Speeding (+5, "+transform.GetComponent(playerMissionComponent).text+") \n";
			zonePointsAlert();
		}
		
	}
}

function checkTurn() {
//ADD POINTS FOR TURNING WITHOUT A SIGNAL
	myTS = transform.GetComponent(playerControl).mySignal;
	holdDirection = myDirection;
	if(turnCount < 26){
		turnCount++;
	}
	yield WaitForSeconds(2);
	if(myDirection != holdDirection && myTS == false && turnCount > 25) {
		turnCount = 0;
		myPoints = myPoints + 5;
		checkBonusPoints();
		transform.FindChild("currentAlert").GetComponent(TextMesh).text = "Turn without signal (+5)";
		myErrors = myErrors +"Turn without signal (+5, "+transform.GetComponent(playerMissionComponent).text+") \n";
		zonePointsAlert();
	}
	
}


function countThroughRed() {
	if(lightCount < 51 && throughRed == true){
		lightCount++;
	}
	
	if(lightCount > 50 && throughRed == true){
		throughRed = false;
	}
}

function OnGUI () {
	GUI.skin.label.fontSize = 24;
	if(mySpeedLimit != 99) {
		GUI.Label (Rect (Screen.width - 200, Screen.height - 50, 200, 50), "Speed Limit : "+mySpeedLimit);
    }
}