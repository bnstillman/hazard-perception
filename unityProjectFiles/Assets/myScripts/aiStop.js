#pragma strict

//AI Vehicle reaches another vehicle
// for AI stop
// for player, maybe stop! (75%)
function OnTriggerEnter (other : Collider) {
	if(other.gameObject.layer == 8 || other.gameObject.layer == 22){
		transform.parent.GetComponent(aiStates).goState = false;
		transform.parent.GetComponent(aiStates).stopState = true;
	}
}

function OnTriggerExit (other : Collider) {
	if(other.gameObject.layer == 8 || other.gameObject.layer == 22){
		transform.parent.GetComponent(aiStates).stopState = false;
		transform.parent.GetComponent(aiStates).goState = true;
	}
}
