#pragma strict
public var travelDir : String;
var coordOpt1 : float;
var coordOpt2 : float;
var coordOpt3 : float;
var dist1 : float = 9999;
var dist2 : float = 9999;
var dist3 : float = 9999;

var aiPos : String;

var targetDirL : boolean;
var targetDirR : boolean;
var targetDirF: boolean;
var targetTurnL : float;
var targetTurnR1 : float;
var targetTurnR2 : float;

var randomNum : int = 0;
var calculatingMove : boolean = false;

function Update(){
	checkLane();
}

function OnTriggerEnter(other : Collider){
	if(other.gameObject.layer == 14){
		transform.GetComponent(aiStates).startAgain = true;
		//VEHICLE STARTS OVER HERE
	}else if(other.gameObject.layer == 19){
		//The coords of lanes on my CURRENT street.
		currentPosition(other);
	}else if(other.transform.gameObject.layer == 18){
			if(aiPos == "A1"){
				inTurnCornerA1();
			}else if(aiPos == "A2"){
				inTurnCornerA2();
			}
	}else if(other.gameObject.layer == 20){
		if(other.transform.gameObject.name == "intersectionLights" && other.transform.gameObject.name != "_speedCheck" && other.transform.gameObject.name != "_speedCheck" && calculatingMove == false){
				//Turn choices for the next intersection. 	
				nextChoice(other);
		}else if(other.transform.gameObject.name == "_speedCheck" && calculatingMove == true){
			if(aiPos == "turn"){
				inTurnLane();
			}else if(aiPos == "A1"){
				inPosA1();
			}else if(aiPos == "A2"){
				inPosA2();	
			}
		}
	}
}

//CALCULATE THE LANE CLOSEST TO CURRENT POSITION
function checkLane(){
	trackMovement();
	if(travelDir == "North" || travelDir == "South"){
		if(transform.position.x > coordOpt1){
			dist1 = transform.position.x - coordOpt1;
		}else{
			dist1 = coordOpt1 - transform.position.x;
		}
		
		if(transform.position.x > coordOpt2){
			dist2 = transform.position.x - coordOpt2;
		}else{
			dist2 = coordOpt2 - transform.position.x;
		}
		
		if(transform.position.x > coordOpt3){
			dist3 = transform.position.x - coordOpt3;
		}else{
			dist3 = coordOpt3 - transform.position.x;
		}
	}
	if(travelDir == "East" || travelDir == "West"){
		if(transform.position.z > coordOpt1){
			dist1 = transform.position.z - coordOpt1;
		}else{
			dist1 = coordOpt1 - transform.position.z;
		}
		
		if(transform.position.z > coordOpt2){
			dist2 = transform.position.z - coordOpt2;
		}else{
			dist2 = coordOpt2 - transform.position.z;
		}
		
		if(transform.position.z > coordOpt3){
			dist3 = transform.position.z - coordOpt3;
		}else{
			dist3 = coordOpt3 - transform.position.z;
		}
	}
	
	if(dist1 < dist2 && dist1 < dist3){
		aiPos = "A1";
	}else if(dist2 < dist1 && dist2 < dist3){
		aiPos = "A2";
	}else if(dist3 < dist1 && dist3 < dist2){
		aiPos = "turn";
	}
}

//IF IN POSITION A1
function inPosA1() {
	//TWO LANE ROAD, POSITION A1
	if(coordOpt2 == 0 && coordOpt3 == 0){
		randomNum = Random.value * 10;
		if(targetDirF == true && randomNum <= 3){
			//do nothing, go forward
			calculatingMove = false;
		}else if(targetDirL == true && randomNum > 3 && randomNum <= 6){
			//turn left
			transform.GetComponent(aiStates).leftCoord = targetTurnL;
			transform.GetComponent(aiStates).leftState = true;
		}else if(targetDirR == true && randomNum > 6){
			//turn right
			if(targetTurnR2 == 0){
				transform.GetComponent(aiStates).rightCoord = targetTurnR1;
				transform.GetComponent(aiStates).rightState = true;
			}else{
				transform.GetComponent(aiStates).rightCoord = targetTurnR2;
				transform.GetComponent(aiStates).rightState = true;
			}
		}else{
			//if none of the above, take first available option
			if(targetDirF == true){
				//do nothing, go forward
				calculatingMove = false;
			}else if(targetDirL == true){
				//turn left
				transform.GetComponent(aiStates).leftCoord = targetTurnL;
				transform.GetComponent(aiStates).leftState = true;
			}else if(targetDirR == true){
				//turn right
				if(targetTurnR2 == 0){
					transform.GetComponent(aiStates).rightCoord = targetTurnR1;
					transform.GetComponent(aiStates).rightState = true;
				}else{
					transform.GetComponent(aiStates).rightCoord = targetTurnR2;
					transform.GetComponent(aiStates).rightState = true;
				}
			}else{
				Debug.Log("Error with turn selection 2ln road");
				transform.GetComponent(aiStates).startAgain = true;
			}
		}
		
	//THREE LANE ROAD, POSITION A1
	}else if(coordOpt2 == 0 && coordOpt3 != 0){
		randomNum = Random.value * 10;
		if(targetDirF == true && randomNum < 6){
			//do nothing, go forward
			calculatingMove = false;
		}else if(targetDirR == true){
			//turn right
			if(targetTurnR2 == 0){
				transform.GetComponent(aiStates).rightCoord = targetTurnR1;
				transform.GetComponent(aiStates).rightState = true;
			}else{
				transform.GetComponent(aiStates).rightCoord = targetTurnR2;
				transform.GetComponent(aiStates).rightState = true;
			}
		}else{
			if(targetDirF == true){
				//do nothing, go forward
				calculatingMove = false;
			}else if(targetDirR == true){
				//turn right
				if(targetTurnR2 == 0){
					transform.GetComponent(aiStates).rightCoord = targetTurnR1;
					transform.GetComponent(aiStates).rightState = true;
				}else{
					transform.GetComponent(aiStates).rightCoord = targetTurnR2;
					transform.GetComponent(aiStates).rightState = true;
				}
			}else{
				Debug.Log("Error with turn selection 3ln road");
				transform.GetComponent(aiStates).startAgain = true;
			}
		}
	
	//FOUR LANE ROAD, POSITION A1
	}else if(coordOpt3 == 0 && coordOpt2 != 0){
		randomNum = Random.value * 10;
		if(targetDirF == true && randomNum > 6){
			//do nothing, go forward
			calculatingMove = false;
		}else if(targetDirL == true){
			//turn left
			transform.GetComponent(aiStates).leftCoord = targetTurnL;
			transform.GetComponent(aiStates).leftState = true;
		}else{
			if(targetDirF == true){
				//do nothing, go forward
				calculatingMove = false;
			}else if(targetDirL == true){
				//turn left
				transform.GetComponent(aiStates).leftCoord = targetTurnL;
				transform.GetComponent(aiStates).leftState = true;
			}else{
				Debug.Log("Error with turn selection 4ln road");
				transform.GetComponent(aiStates).startAgain = true;
			}
		}
				
	//FIVE LANE ROAD, POSITION A1
	}else if(coordOpt2 != 0 && coordOpt3 != 0){
		//5ln road
		//MUST GO FORWARD
		calculatingMove = false;
		if(targetDirF == false){
			transform.GetComponent(aiStates).startAgain = true;
		}
	}
}

//IF IN POSITION A2
function inPosA2() {
	randomNum = Random.value * 10;

	if(targetDirF == true && randomNum < 6){
		//do nothing, go forward
		calculatingMove = false;
	}else if(targetDirR == true){
		//turn right
		if(targetTurnR2 == 0){
			transform.GetComponent(aiStates).rightCoord = targetTurnR1;
			transform.GetComponent(aiStates).rightState = true;
		}else{
			transform.GetComponent(aiStates).rightCoord = targetTurnR2;
			transform.GetComponent(aiStates).rightState = true;
		}
	}else{
		if(targetDirF == true){
			//do nothing, go forward
			calculatingMove = false;
		}else if(targetDirR == true){
			//turn right
			if(targetTurnR2 == 0){
				transform.GetComponent(aiStates).rightCoord = targetTurnR1;
				transform.GetComponent(aiStates).rightState = true;
			}else{
				transform.GetComponent(aiStates).rightCoord = targetTurnR2;
				transform.GetComponent(aiStates).rightState = true;
			}
		}else{
			Debug.Log("Error with turn selection, position A2");
			transform.GetComponent(aiStates).startAgain = true;
		}
	}
}

//IF IN TURNING LANE, MUST TURN
//access script aiStates on this component
function inTurnLane() {
	if(targetDirL == true){
		transform.GetComponent(aiStates).leftCoord = targetTurnL;
		transform.GetComponent(aiStates).leftState = true;
	}else{
		transform.GetComponent(aiStates).startAgain = true;
	}
}

//variables needed to know exact coordinates of road lanes. NEEDED TO DETERMINE CURRENT LANE
//****ACCESS SCRIPT, COLLIDER -GetComponent(rdConfig)
function currentPosition(other : Collider){
	yield WaitForSeconds(1.5);
	if(other.gameObject.GetComponent(rdConfig).roadDir == "NS"){
		trackMovement();
		if(travelDir == "North"){
			//do  not assign null variables
			if(other.gameObject.GetComponent(rdConfig).N_1 != 0){
				coordOpt1 = other.gameObject.GetComponent(rdConfig).N_1;
			}else{
				coordOpt1 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).N_2 != 0){
				coordOpt2 = other.gameObject.GetComponent(rdConfig).N_2;
			}else{
				coordOpt2 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).turningLane != 0){
				coordOpt3 = other.gameObject.GetComponent(rdConfig).turningLane;
			}else{
				coordOpt3 = 0;
			}
		}else if(travelDir == "South"){
			//do  not assign null variables
			if(other.gameObject.GetComponent(rdConfig).S_1 != 0){
				coordOpt1 = other.gameObject.GetComponent(rdConfig).S_1;
			}else{
				coordOpt1 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).S_2 != 0){
				coordOpt2 = other.gameObject.GetComponent(rdConfig).S_2;
			}else{
				coordOpt2 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).turningLane != 0){
				coordOpt3 = other.gameObject.GetComponent(rdConfig).turningLane;
			}else{
				coordOpt3 = 0;
			}
		}
	}
	if(other.gameObject.GetComponent(rdConfig).roadDir == "WE"){
		if(travelDir == "West"){
			//do  not assign null variables
			if(other.gameObject.GetComponent(rdConfig).W_1 != 0){
				coordOpt1 = other.gameObject.GetComponent(rdConfig).W_1;
			}else{
				coordOpt1 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).W_2 != 0){
				coordOpt2 = other.gameObject.GetComponent(rdConfig).W_2;
			}else{
				coordOpt2 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).turningLane != 0){
				coordOpt3 = other.gameObject.GetComponent(rdConfig).turningLane;
			}else{
				coordOpt3 = 0;
			}
		}else if(travelDir == "East"){
			//do  not assign null variables
			if(other.gameObject.GetComponent(rdConfig).E_1 != 0){
				coordOpt1 = other.gameObject.GetComponent(rdConfig).E_1;
			}else{
				coordOpt1 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).E_2 != 0){
				coordOpt2 = other.gameObject.GetComponent(rdConfig).E_2;
			}else{
				coordOpt2 = 0;
			}
			if(other.gameObject.GetComponent(rdConfig).turningLane != 0){
				coordOpt3 = other.gameObject.GetComponent(rdConfig).turningLane;
			}else{
				coordOpt3 = 0;
			}
		}
	}
}


//When vehicle enters intersection range, if not already turning in progress, get possible turning choices
//Turning choices for next intersection
//Based on current direction
//****ACCESS SCRIPT, COLLIDER -GetComponent(intersectionAI)
function nextChoice(other : Collider){
	trackMovement();
	calculatingMove = true;
	if(travelDir == "North"){
		targetDirL = other.gameObject.GetComponent(intersectionAI).goWest;
		targetDirR = other.gameObject.GetComponent(intersectionAI).goEast;
		targetDirF = other.gameObject.GetComponent(intersectionAI).goNorth;
		targetTurnL = other.GetComponent(intersectionAI).turnW1;
		targetTurnR1 = other.GetComponent(intersectionAI).turnE1;
		targetTurnR2 = other.GetComponent(intersectionAI).turnE2;
	}else if(travelDir == "South"){
		targetDirL = other.gameObject.GetComponent(intersectionAI).goEast;
		targetDirR = other.gameObject.GetComponent(intersectionAI).goWest;
		targetDirF = other.gameObject.GetComponent(intersectionAI).goSouth;
		targetTurnL = other.GetComponent(intersectionAI).turnE1;
		targetTurnR1 = other.GetComponent(intersectionAI).turnW1;
		targetTurnR2 = other.GetComponent(intersectionAI).turnW2;
	}else if(travelDir == "East"){
		targetDirL = other.gameObject.GetComponent(intersectionAI).goNorth;
		targetDirR = other.gameObject.GetComponent(intersectionAI).goSouth;
		targetDirF = other.gameObject.GetComponent(intersectionAI).goEast;
		targetTurnL = other.GetComponent(intersectionAI).turnN1;
		targetTurnR1 = other.GetComponent(intersectionAI).turnS1;
		targetTurnR2 = other.GetComponent(intersectionAI).turnS2;
	}else if(travelDir == "West"){
		targetDirL = other.gameObject.GetComponent(intersectionAI).goSouth;
		targetDirR = other.gameObject.GetComponent(intersectionAI).goNorth;
		targetDirF = other.gameObject.GetComponent(intersectionAI).goWest;
		targetTurnL = other.GetComponent(intersectionAI).turnS1;
		targetTurnR1 = other.GetComponent(intersectionAI).turnN1;
		targetTurnR2 = other.GetComponent(intersectionAI).turnN2;
	}
}

//calculate which direction the AI is traveling
function trackMovement() {	
	if(transform.eulerAngles.y >= 86 && transform.eulerAngles.y <= 94) {
		travelDir = "East";
	}else if(transform.eulerAngles.y >= -4 && transform.eulerAngles.y <= 4) {
		travelDir = "North";
	}else if(transform.eulerAngles.y >= 266 && transform.eulerAngles.y <= 274) {
		travelDir = "West";
	}else if(transform.eulerAngles.y >= 176 && transform.eulerAngles.y <= 184) {
		travelDir = "South";
	}
}

//IF IN A1 APPROACHING TURNING CORNER
function inTurnCornerA1() {
	trackMovement();
	if(aiPos == "A1" && travelDir == "North"){
		if(transform.position.x > 500){
			//turn left to W1
			transform.GetComponent(aiStates).leftCoord = 986.82;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 986.81;
			coordOpt2 = 990.96;
			coordOpt3 = 982;
		}else{
			//turn right E1
			transform.GetComponent(aiStates).rightCoord = 978.06;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 978.05;
			coordOpt2 = 974.07;
			coordOpt3 = 982;
		}
	}else if(aiPos == "A1" && travelDir == "South"){
		if(transform.position.x > 500){
			//turn right W1
			transform.GetComponent(aiStates).rightCoord = 116.85;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 116.84;
			coordOpt2 = 121;
			coordOpt3 = 112;
		}else{
			//turn left to E1
			transform.GetComponent(aiStates).leftCoord = 108.09;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 108.09;
			coordOpt2 = 104.1;
			coordOpt3 = 112;
		}
	}else if(aiPos == "A1" && travelDir == "East"){
		if(transform.position.z > 500){
			//turn right S1
			transform.GetComponent(aiStates).rightCoord = 964.06;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 954.06;
			coordOpt2 = 960.07;
			coordOpt3 = 968;
		}else{
			//turn left to N1
			transform.GetComponent(aiStates).leftCoord = 972.82;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 972.82;
			coordOpt2 = 976.97;
			coordOpt3 = 968;
		}
	}else if(aiPos == "A1" && travelDir == "West"){
		if(transform.position.z > 500){
			//turn left to S1
			transform.GetComponent(aiStates).leftCoord = 93.78;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 93.78;
			coordOpt2 = 89.8;
			coordOpt3 = 98;
		}else{
			//turn right N1
			transform.GetComponent(aiStates).rightCoord = 102.54;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 102.54;
			coordOpt2 = 106.7;
			coordOpt3 = 98;
		}
	}
}

//IF IN A1 APPROACHING TURNING CORNER
function inTurnCornerA2() {
	trackMovement();
	if(travelDir == "North"){
		if(transform.position.x > 500){
			//turn left to W2
			transform.GetComponent(aiStates).leftCoord = 990.97;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 986.81;
			coordOpt2 = 990.96;
			coordOpt3 = 982;
		}else{
			//turn right E2
			transform.GetComponent(aiStates).rightCoord = 974.07;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 978.05;
			coordOpt2 = 974.07;
			coordOpt3 = 982;
		}
	}else if(travelDir == "South"){
		if(transform.position.x > 500){
			//turn right W2
			transform.GetComponent(aiStates).rightCoord = 121;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 116.84;
			coordOpt2 = 121;
			coordOpt3 = 112;
		}else{
			//turn left to E2
			transform.GetComponent(aiStates).leftCoord = 104.01;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 108.09;
			coordOpt2 = 104.1;
			coordOpt3 = 112;
		}
	}else if(travelDir == "East"){
		if(transform.position.z > 500){
			//turn right S2
			transform.GetComponent(aiStates).rightCoord = 960.07;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 954.06;
			coordOpt2 = 960.07;
			coordOpt3 = 968;
		}else{
			//turn left to N2
			transform.GetComponent(aiStates).leftCoord = 976.97;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 972.82;
			coordOpt2 = 976.97;
			coordOpt3 = 968;
		}
	}else if(travelDir == "West"){
		if(transform.position.z > 500){
			//turn left to S2
			transform.GetComponent(aiStates).leftCoord = 89.8;
			transform.GetComponent(aiStates).leftState = true;
			coordOpt1 = 93.78;
			coordOpt2 = 89.8;
			coordOpt3 = 98;
		}else{
			//turn right N2
			transform.GetComponent(aiStates).rightCoord = 106.7;
			transform.GetComponent(aiStates).rightState = true;
			coordOpt1 = 102.54;
			coordOpt2 = 106.7;
			coordOpt3 = 98;
		}
	}
}
