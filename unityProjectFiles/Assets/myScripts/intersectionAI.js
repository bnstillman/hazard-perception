#pragma strict

////CROSS STREETS
public var goNorth : boolean = true;
public var goSouth : boolean = true;
public var goEast : boolean = true;
public var goWest : boolean = true;


var streetNS : GameObject;
var streetWE : GameObject;

var turnN1 : float = 0;
var turnN2 : float = 0;
var turnS1 : float = 0;
var turnS2 : float = 0;
var turnW1 : float = 0;
var turnW2 : float = 0;
var turnE1 : float = 0;
var turnE2 : float = 0;


function Start () {
	yield WaitForSeconds(.5);
	turnN1 = streetNS.GetComponent(rdConfig).N_1;
	turnN2 = streetNS.GetComponent(rdConfig).N_2;
	turnS1 = streetNS.GetComponent(rdConfig).S_1;
	turnS2 = streetNS.GetComponent(rdConfig).S_2;

	turnW1 = streetWE.GetComponent(rdConfig).W_1;
	turnW2 = streetWE.GetComponent(rdConfig).W_2;
	turnE1 = streetWE.GetComponent(rdConfig).E_1;
	turnE2 = streetWE.GetComponent(rdConfig).E_2;
}


