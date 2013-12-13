#pragma strict

//get component

private var prestart : boolean = false;
private var startMission : boolean = false;
public var newObjective : boolean = false;

private var boxHeight : int = 200;
private var boxWidth : int = 600;
private var buttonH : int = 50;
private var buttonW : int = 100;
private var buttonText : String = "Begin Game";

private var missionInfo : String;
public var myMission : String;

public var begin = false; 
private var start = true;
public var gameOver = false;
public var myResult : String;
private var startTime : float;
private var restSeconds : int;
private var roundedRestSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
public var text : String;
private var countDownSeconds : int = 600;

	
function Start () {
	prestart = true;
}

function Update () {

	if(startMission){
		missionSelected();
	}
	if(newObjective == true && startMission == true) {
		if(myMission == "startMission1"){
			missionInfo = "     Great job! You are halfway there! Now just drive your wife to the hospital.";
			buttonText = "OK";
		}else if(myMission == "startMission5"){
			missionInfo = "     Almost done! Now drop these folks at the spa for a little rest and relaxation.";	
			buttonText = "OK";
		}
	}
	
	if(begin == true && start == true) {
		startTime = Time.time;
		start = false;
	  	}
}


function OnGUI () {
	GUI.skin.box.wordWrap = true;
	GUI.backgroundColor =  Color.black;
	GUI.skin.box.alignment = TextAnchor.UpperLeft;
	GUI.skin.box.fontSize = 24;
	GUI.skin.button.hover.textColor = Color.yellow;
	
	if(prestart){
		GUI.Box (Rect (100, 100, 400, 250), "                Select a mission");
		/*if (GUI.Button (Rect (125, 150, buttonW, buttonH), "Mission 1")) {
			prestart = false;
			myMission = "startMission1";
			transform.GetComponent(playerMissionPosition).myMission = "startMission1";
			startMission = true;
		}*/
		if (GUI.Button (Rect (250, 150, buttonW, buttonH), "Mission 2")) {
			prestart = false;
			myMission = "startMission2";
			transform.GetComponent(playerMissionPosition).myMission = "startMission2";
			startMission = true;
		}
		if (GUI.Button (Rect (375, 150, buttonW, buttonH), "Mission 3")) {
			prestart = false;
			myMission = "startMission3";
			transform.GetComponent(playerMissionPosition).myMission = "startMission3";
			startMission = true;
		}
		if (GUI.Button (Rect (125, 250, buttonW, buttonH), "Mission 4")) {
			prestart = false;
			myMission = "startMission4";
			transform.GetComponent(playerMissionPosition).myMission = "startMission4";
			startMission = true;
		}
		/*if (GUI.Button (Rect (250, 250, buttonW, buttonH), "Mission 5")) {
			prestart = false;
			myMission = "startMission5";
			transform.GetComponent(playerMissionPosition).myMission = "startMission5";
			startMission = true;
		}*/
	}
	
	if(startMission == true || newObjective == true){
		GUI.Box (Rect ((Screen.width/2 - boxWidth/2), (Screen.height/2 - boxHeight/2), boxWidth, boxHeight), missionInfo);
		if (GUI.Button (Rect ((Screen.width/2 - buttonW/2), (Screen.height/2 + boxHeight/2 - buttonH - 5), buttonW, buttonH), buttonText)) {
			if(newObjective == false) {
				begin = true;
			}
			newObjective = false;
			startMission = false;
			transform.Find("c_cap").renderer.enabled = false;
		}
	}
	
	 GUI.skin.label.fontSize = 24;
	    GUI.skin.box.fontSize = 12;
	    
	    //DISPLAY TIMER
	    if(begin == true && gameOver == false) {

		    var guiTime = Time.time - startTime;
		    restSeconds = countDownSeconds - (guiTime);
		     
			//ONE MINUTE WARNING
		    if (restSeconds == 60) {
		   	GUI.skin.box.fontStyle = FontStyle.BoldAndItalic;
		    }
		    
		    //TIMER HAS EXPIRED, GAME OVER
		    if (restSeconds == 0) {
		    	gameOver = true;
		  	}
		     
		    //SET TIMER TO DISPLAY IN 00:00 FORMAT
		    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
		    displaySeconds = roundedRestSeconds % 60;
		    displayMinutes = roundedRestSeconds / 60;
		    text = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);
		    GUI.Label (Rect (400, 25, 100, 30), text);
	    }
	    
	    //SET AT SEPARATE THAN restSeconds == 0, SO GAME CAN END WHEN PLAYER COMPLETES ALL OBJECTIVES (playerMission.js)
	    if(gameOver == true){
	   		myResult = transform.gameObject.GetComponent(pointSaver).myErrors;
			GUI.Box (Rect ((Screen.width/2 - boxWidth/2), (Screen.height/2 - boxHeight/2), boxWidth, 700), myResult);
	  	}
}

function missionSelected () {
		if(myMission == "startMission1"){
			missionInfo = "TEXT HERE FOR MISSION";
		}else if(myMission == "startMission2"){
			missionInfo = "You are meeting your friends at a soccer game! Follow the arrow to reach your destination. You have 10 minutes to get there.";
		}else if(myMission == "startMission3"){
			missionInfo = "Every year, you and your family leave flowers for your Great Uncle Henry on Veteran's Day. This year you slept in! You have 10 minutes to deliver the flowers to the cemetery, or else you'll never hear the end of it! Follow the arrow to reach your destination.";
		}else if(myMission == "startMission4"){
			missionInfo = "The Indoor Amusement Park is offering free admission to the first 100 customers. Get there in 10 minutes for your free day of fun. Follow the arrow to reach your destination.";	
		}else if(myMission == "startMission5"){
			missionInfo = "TEXT HERE FOR MISSION";	
		}
}