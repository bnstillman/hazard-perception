#pragma strict

public var myStart : Transform;

function OnTriggerEnter(other : Collider){
	if(other.gameObject.layer == 22){
		transform.parent.animation.Play("botSouth");
		yield WaitForSeconds(4);
		transform.position = myStart.position;
	}
}