#pragma strict


//disable this collider, or else it will interfere with other triggers
function Start(){
	this.collider.enabled = false;
}


//this collider is only enabled when ai vehicle is turning left. Waits for vehicles to pass before turning
function OnTriggerEnter (other: Collider){
	if(other.gameObject.layer == 8 || other.gameObject.layer == 22){
		transform.parent.GetComponent(aiStates).allClear = false;
		yield WaitForSeconds(2);
		transform.parent.GetComponent(aiStates).allClear = true;
	}
}
