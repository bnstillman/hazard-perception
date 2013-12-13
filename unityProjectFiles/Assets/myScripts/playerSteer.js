#pragma strict

//LINE 44 ADD CODE TO STOP VEHICLE


//SET IN INSPECTOR
private var rearWheel1 : WheelCollider;
private var rearWheel2 : WheelCollider;
private var frontWheel1 : WheelCollider;
private var frontWheel2 : WheelCollider;
private var wheelFL : Transform;
private var wheelFR : Transform;
private var wheelRL : Transform;
private var wheelRR : Transform;
var steer_max = 20;
var motor_max = 40;
var brake_max = 100;
var steerSpeed = 20;

var MPHSpeed : int;
var myStreetName : String = "Street not found";
var travelDir : String;
   
//USER CONTROLS FOR DRIVING VEHICLE
var steer = 0;
var forward = 0;
var back = 0;
var brakeRelease = false;
var motor = 0;
var brake = 0;
var reverse = false;
var speed = 0;

function Start () {
	//LOWER CENTER OF GRAVITY FOR REALISTIC PHYSICS OF VEHICLE
	rigidbody.centerOfMass = Vector3(-.5, -0.05, 0);
	rearWheel1 = transform.FindChild("WheelCollider_RL").GetComponent(WheelCollider);
	rearWheel2 = transform.FindChild("WheelCollider_RR").GetComponent(WheelCollider);
	frontWheel1 = transform.FindChild("WheelCollider_FL").GetComponent(WheelCollider);
	frontWheel2 = transform.FindChild("WheelCollider_FR").GetComponent(WheelCollider);
	wheelFL = transform.FindChild("TireFL").GetComponent(Transform);
	wheelFR = transform.FindChild("TireFR").GetComponent(Transform);
	wheelRL = transform.FindChild("TireRL").GetComponent(Transform);
	wheelRR = transform.FindChild("TireRR").GetComponent(Transform);
	
}

function FixedUpdate () {
	
		//if(transform.GetComponent(onScreenAlert_missionStartStop).startMission == true && transform.GetComponent(missionTimer).gameOver == false) {
			Steering();
		//}else if(transform.GetComponent(missionTimer).gameOver == true) {
		//STOP VEHICLE HERE !!!!!! *****
		//	speed = 0;
		//}

}

// Update() is run once per frame (frame updates).
function Update() {
	

	//WHICH DIRECTION IS VEHICLE TRAVELING
	trackMovement();
	
	//SET DASH TEXT TO MATCH ACTUAL VALUES
	transform.FindChild("currentDirection").GetComponent(TextMesh).text = travelDir;
	transform.FindChild("currentStreet").GetComponent(TextMesh).text = myStreetName;
	if(MPHSpeed >= 0){
		transform.FindChild("currentSpeed").GetComponent(TextMesh).text = MPHSpeed.ToString();
	}
}


function Steering() {
	speed = rigidbody.velocity.sqrMagnitude;
	MPHSpeed = speed/6;
	steer = Input.GetAxis("Horizontal");
	forward = Mathf.Clamp(Input.GetAxis("Vertical"), 0, 1);
	back = -1 * Mathf.Clamp(Input.GetAxis("Vertical"), -1, 0);
	if(speed == 0 && forward == 0 && back == 0) {
		brakeRelease = true;
	}
	 
	if(speed == 0 && brakeRelease) {	
		if(back > 0) { reverse = true; }
		if(forward > 0) { reverse = false; }
	}
	 
	if(reverse) {
		motor = -1 * back;
		brake = forward;
	} else {
		motor = forward;
		brake = back;
	}
	
	if (brake > 0 ) { brakeRelease = false; };
	 
	rearWheel1.motorTorque = motor_max * motor;
	rearWheel2.motorTorque = motor_max * motor;
	rearWheel1.brakeTorque = brake_max * brake;
	rearWheel2.brakeTorque = brake_max * brake;
	 
	if ( steer == 0 && frontWheel1.steerAngle != 0) {
		if (Mathf.Abs(frontWheel1.steerAngle) <= (steerSpeed * Time.deltaTime)) {
			frontWheel1.steerAngle = 0;
		} else if (frontWheel1.steerAngle > 0) {
			frontWheel1.steerAngle = frontWheel1.steerAngle - (steerSpeed * Time.deltaTime);
		} else {
			frontWheel1.steerAngle = frontWheel1.steerAngle + (steerSpeed * Time.deltaTime);
		}
	} else {
		frontWheel1.steerAngle = frontWheel1.steerAngle + (steer * steerSpeed * Time.deltaTime);
		if (frontWheel1.steerAngle > steer_max) { frontWheel1.steerAngle = steer_max; }
		if (frontWheel1.steerAngle < -1 * steer_max) { frontWheel1.steerAngle = -1 * steer_max; }
	}
	
	frontWheel2.steerAngle = frontWheel1.steerAngle;
	wheelFL.localEulerAngles.y = frontWheel1.steerAngle + 90;
	wheelFR.localEulerAngles.y = frontWheel2.steerAngle - 90;
	
}


function OnTriggerEnter (other : Collider) {
	//SET ROAD NAME IN DASH DISPLAY
	if(other.gameObject.layer == 19){
		yield WaitForSeconds(2);
		if(other.gameObject.GetComponent(rdConfig).roadDir == "NS" && (travelDir == "North" || travelDir == "South")){
			myStreetName = other.gameObject.GetComponent(rdConfig).roadName;
		}else if(other.transform.gameObject.gameObject.GetComponent(rdConfig).roadDir == "WE" && (travelDir == "West" || travelDir == "East")){
			myStreetName = other.gameObject.GetComponent(rdConfig).roadName;
		}
	}

}

//calculate which direction the VEHICLE Is traveling
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
