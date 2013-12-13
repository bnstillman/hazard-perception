#pragma strict
//TO SETUP PREFAB STREETS

//POSITION STREET AND SET SPEED LIMIT

//Y ROTATION MUST BE 0 OR 90



public var speedLimit : float = 55;

public var roadName : String;
public var roadDir : String;
public var N_1 : float = 0;
public var N_2 : float = 0;
public var S_1 : float = 0;
public var S_2 : float = 0;
public var W_1 : float = 0;
public var W_2 : float = 0;
public var E_1 : float = 0;
public var E_2 : float = 0;
public var turningLane = 0;




function Start () {
	if(transform.rotation.eulerAngles.y == 0){
		roadDir = "WE";
	}else if(transform.rotation.eulerAngles.y > 85 && transform.rotation.eulerAngles.y < 95 ){
		roadDir = "NS";
	}
	if(roadDir == "WE"){
		roadName = transform.gameObject.name+" Road";
		if(transform.FindChild("turning")){
			turningLane = transform.FindChild("turning").position.z;
		}
		W_1 = transform.FindChild("A1").position.z;
		E_1 = transform.FindChild("B1").position.z;
		if(transform.FindChild("A2")){
			W_2 = transform.FindChild("A2").position.z;
			E_2 = transform.FindChild("B2").position.z;
		}
	}else if(roadDir == "NS"){
		roadName = transform.gameObject.name+" Street";
		if(transform.FindChild("turning")){
			turningLane = transform.FindChild("turning").position.x;
		}
		N_1 = transform.FindChild("A1").position.x;
		S_1 = transform.FindChild("B1").position.x;
		if(transform.FindChild("A2")){
			N_2 = transform.FindChild("A2").position.x;
			S_2 = transform.FindChild("B2").position.x;
		}
		
	}
}

