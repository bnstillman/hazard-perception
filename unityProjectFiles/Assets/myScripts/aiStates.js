#pragma strict
/*
States for artificial vehicles

Forward  ---is set after goLeft, goRight, turnAround, toGo
left
right
slow to stop
accelerate from stop



turn around
respond to hit
*/


public var startingPoint: Transform;
var startAgain : boolean = false;


var travelDir : String;
var startDir : String = "West";

public var forwardState : boolean = false;
var speed : float = 25;

public var changePos : boolean = false;
public var turnCoord : Transform;
public var allClear : boolean = true;

public var leftState : boolean = false;
var leftCoord : float;
public var rightState : boolean = false;
var rightCoord : float;
public var stopState : boolean = false;
public var goState : boolean = false;
private var signalOn : boolean = false;

//HEADLIGHT COLORS
public var hLightColor : Color = Color32(255, 255, 160, 255);
public var bLightColor : Color = Color32(70, 0, 0, 255);


function Update (){
	trackMovement();
	if(changePos){
		switchLane();
	}
	
	if(forwardState){
		goForward();
	}
	if(leftState){
		goLeft();
	}
	if(rightState){
		goRight();
	}
	
	if(goState){
		toGo();
	}
	if(stopState){
		toStop();
	}
	
	if(startAgain){
		restart();
	}
	
}

function OnTriggerEnter(other : Collider){
	//SET TRAVEL DIR TO STOP AI FROM VEERING LEFT OR RIGHT
	if(other.gameObject.layer == 19){
		setTravelDir();
	}
}

function goForward (){
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	if(signalOn){
		offTurnSignals();
		signalOn = false;
	}
}

function goLeft (){
	if(!signalOn){
		onLTS();
		signalOn = true;
	}
	startDir = travelDir;
	rightState = false;
	forwardState = false;
	transform.FindChild("_aiCollisionLeftCheck").collider.enabled = true;
	if(startDir == "North"){
		if(transform.position.z < leftCoord && transform.position.z > (leftCoord - 4)){
			if(allClear == true){
				transform.Translate(Vector3.forward * Time.deltaTime * speed);
				transform.Rotate(0,-6f,0);
			}
		}else if(transform.position.z < (leftCoord - 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else if(transform.position.z < leftCoord){
			if(allClear == true){
				transform.Translate(Vector3.forward * Time.deltaTime * speed);
				transform.Rotate(0,-6f,0);
			}
		}else{
			transform.Rotate(0,-6f,0);
		}
		if(transform.rotation.eulerAngles.y >= 250 && transform.rotation.eulerAngles.y <= 273){
			transform.rotation.eulerAngles.y = 270;
			transform.position.z = leftCoord;
			leftState = false;
			transform.FindChild("_aiCollisionLeftCheck").collider.enabled = false;
			forwardState = true;
			transform.GetComponent(aiTurnDecide).calculatingMove = false;
		}
	}else if(startDir == "West"){
		if(transform.position.x > leftCoord && transform.position.x < (leftCoord + 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
			transform.Rotate(0,-6f,0);
		}else if(transform.position.x > (leftCoord + 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else{
			transform.Rotate(0,-6f,0);		
		}
		if(transform.rotation.eulerAngles.y >= 160 && transform.rotation.eulerAngles.y <= 190){
			transform.rotation.eulerAngles.y = 180;
			transform.position.x = leftCoord;
			leftState = false;
			transform.FindChild("_aiCollisionLeftCheck").collider.enabled = false;
			forwardState = true;
			transform.GetComponent(aiTurnDecide).calculatingMove = false;
		}
	}else if(startDir == "East"){
		if(transform.position.x < leftCoord && transform.position.x > (leftCoord - 4)){
			if(allClear == true){
				transform.Translate(Vector3.forward * Time.deltaTime * speed);
				transform.Rotate(0,-6f,0);
			}
		}else if(transform.position.x < (leftCoord - 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else{
			transform.Rotate(0,-6f,0);
		}
		if(transform.rotation.eulerAngles.y >= 0 && transform.rotation.eulerAngles.y <= 20){
			transform.rotation.eulerAngles.y = 0;
			transform.position.x = leftCoord;
			leftState = false;
			transform.FindChild("_aiCollisionLeftCheck").collider.enabled = false;
			forwardState = true;
			transform.GetComponent(aiTurnDecide).calculatingMove = false;
		}	
	}else if(startDir == "South"){
		if(transform.position.z > leftCoord && transform.position.z < (leftCoord + 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
			transform.Rotate(0,-6f,0);
		}else if(transform.position.z > (leftCoord + 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else{
			transform.Rotate(0,-6f,0);
		}	
		if(transform.rotation.eulerAngles.y >= 80 && transform.rotation.eulerAngles.y <= 95){
			transform.rotation.eulerAngles.y = 90;
			transform.position.z = leftCoord;
			leftState = false;
			transform.FindChild("_aiCollisionLeftCheck").collider.enabled = false;
			forwardState = true;
			transform.GetComponent(aiTurnDecide).calculatingMove = false;
		}
	}
}

function goRight (){
	if(!signalOn){
		onRTS();
		signalOn = true;
	}
	startDir = travelDir;
	leftState = false;
	forwardState = false;
	if(startDir == "North"){
		if(transform.position.z < (rightCoord - 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else if(transform.position.z < rightCoord && transform.rotation.eulerAngles.y < 90){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
			transform.Rotate(0,6f,0);
		}else{
			transform.Rotate(0,6f,0);
			if(transform.rotation.eulerAngles.y >= 80 && transform.rotation.eulerAngles.y <= 110){
				transform.rotation.eulerAngles.y = 90;
				transform.position.z = rightCoord;
				rightState = false;
				forwardState = true;
				transform.GetComponent(aiTurnDecide).calculatingMove = false;
			}
		}
	}else if(startDir == "West"){
		if(transform.position.x > (rightCoord + 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else if(transform.position.x > rightCoord && transform.rotation.eulerAngles.y < 359){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
			transform.Rotate(0,6f,0);
		}else{
			transform.Rotate(0,6f,0);
			if((transform.rotation.eulerAngles.y >= 340 && transform.rotation.eulerAngles.y <= 359) || (transform.rotation.eulerAngles.y >= 0 && transform.rotation.eulerAngles.y <= 6)){
				transform.rotation.eulerAngles.y = 0;
				transform.position.x = rightCoord;
				rightState = false;
				forwardState = true;
				transform.GetComponent(aiTurnDecide).calculatingMove = false;
			}
		}
	}else if(startDir == "East"){
		if(transform.position.x < (rightCoord - 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else if(transform.position.x < rightCoord && transform.rotation.eulerAngles.y < 180){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
			transform.Rotate(0,6f,0);
		}else{
			transform.Rotate(0,6f,0);
			if(transform.rotation.eulerAngles.y >= 170 && transform.rotation.eulerAngles.y <= 185){
				transform.rotation.eulerAngles.y = 180;
				transform.position.x = rightCoord;
				rightState = false;
				forwardState = true;
				transform.GetComponent(aiTurnDecide).calculatingMove = false;
			}
		}	
	}else if(startDir == "South"){
		if(transform.position.z > (rightCoord + 4)){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
		}else if(transform.position.z > rightCoord && transform.rotation.eulerAngles.y < 270){
			transform.Translate(Vector3.forward * Time.deltaTime * speed);
			transform.Rotate(0,6f,0);
		}else{
			transform.Rotate(0,6f,0);
			if(transform.rotation.eulerAngles.y >= 260 && transform.rotation.eulerAngles.y <= 270){
				transform.rotation.eulerAngles.y = 270;
				transform.position.z = rightCoord;
				rightState = false;
				forwardState = true;
				transform.GetComponent(aiTurnDecide).calculatingMove = false;
			}
		}	
	}
}

function restart (){
	Debug.Log("restart");
	transform.rotation.eulerAngles.y = 180;
	transform.position = startingPoint.position;
	startAgain = false;
	leftState = false;
	rightState = false;
	forwardState = false;
	transform.GetComponent(aiTurnDecide).calculatingMove = false;
	offTurnSignals();
	
}

function switchLane(){
	if(travelDir == "North"){
		if(transform.position.x > turnCoord.position.x){
			transform.position.x = transform.position.x - .25;
		}else{
			changePos = false;
		}
	}else if(travelDir == "South"){
		if(transform.position.x < turnCoord.position.x){
			transform.position.x = transform.position.x + .25;
		}else{
			changePos = false;
		}
	}else if(travelDir == "East"){
		if(transform.position.z < turnCoord.position.z){
			transform.position.z = transform.position.z + .25;
		}else{
			changePos = false;
		}
	}else if(travelDir == "West"){
		if(transform.position.z > turnCoord.position.z){
			transform.position.z = transform.position.z - .25;
		}else{
			changePos = false;
		}
	}
}

function toGo (){
	if(speed == 0){
		speed = 1;
	}
	speed = speed * 1.05;
	transform.Translate(Vector3.forward * Time.deltaTime * speed);
	if(speed > 25){
		forwardState = true;
		goState = false;
	}
}

function toStop (){
	//ESTIMATED STOPPING BUFFER : 25 UNITS
	if(speed > 25){
		speed = 25;
	}else if(speed > 19){
		speed = speed * .99;
	}else if(speed > 5){
		speed = speed * .80;
	}else{
		speed = 0;
		stopState = false;
	}
}

function trackMovement (){	
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

function setTravelDir(){
	if(transform.eulerAngles.y >= 86 && transform.eulerAngles.y <= 94) {
		transform.eulerAngles.y = 90;
	}else if(transform.eulerAngles.y >= -4 && transform.eulerAngles.y <= 4) {
		transform.eulerAngles.y = 0;
	}else if(transform.eulerAngles.y >= 266 && transform.eulerAngles.y <= 274) {
		transform.eulerAngles.y = 270;
	}else if(transform.eulerAngles.y >= 176 && transform.eulerAngles.y <= 184) {
		transform.eulerAngles.y = 180;
	}
}
function setForwardState(){
	forwardState = true;
}

function onLTS(){
	transform.FindChild("BLightLG").animation.Play("turnSignal");
	transform.FindChild("HLightLG").animation.Play("turnSignal");
	transform.FindChild("BLightRG").animation.Stop("turnSignal");
	transform.FindChild("HLightRG").animation.Stop("turnSignal");
}

function onRTS(){
	transform.FindChild("BLightLG").animation.Stop("turnSignal");
	transform.FindChild("HLightLG").animation.Stop("turnSignal");
	transform.FindChild("BLightRG").animation.Play("turnSignal");
	transform.FindChild("HLightRG").animation.Play("turnSignal");
}

function offTurnSignals(){
	transform.FindChild("BLightRG").animation.Stop("turnSignal");
	transform.FindChild("HLightRG").animation.Stop("turnSignal");
	transform.FindChild("BLightLG").animation.Stop("turnSignal");
	transform.FindChild("HLightLG").animation.Stop("turnSignal");
	transform.FindChild("BLightLG").renderer.material.color = bLightColor;
	transform.FindChild("HLightLG").renderer.material.color = hLightColor;
	transform.FindChild("BLightRG").renderer.material.color = bLightColor;
	transform.FindChild("HLightRG").renderer.material.color = hLightColor;
}