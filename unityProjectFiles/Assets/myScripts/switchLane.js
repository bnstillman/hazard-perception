#pragma strict

public var turnCoord : Transform;
var randomNum : int = 0;
public var mustTurn : boolean = false;
function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider){
	randomNum = Random.value * 10;
	if(other.gameObject.layer == 8 && mustTurn == true){
		other.transform.GetComponent(aiStates).turnCoord = turnCoord;
		other.transform.GetComponent(aiStates).changePos = true;
	}else if(other.gameObject.layer == 8 && randomNum > 5){
		other.transform.GetComponent(aiStates).turnCoord = turnCoord;
		other.transform.GetComponent(aiStates).changePos = true;
	}

}