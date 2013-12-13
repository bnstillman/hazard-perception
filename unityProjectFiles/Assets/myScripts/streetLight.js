#pragma strict
//used for the functioning of street lights
	private var count = 0;
	public var currentGreenLight : String; //is NS or WE
	private var greenLight : String;
	//INDIVIDUAL BULBS
	var northRed : GameObject;
	var northYellow : GameObject;
	var northGreen : GameObject;
	var southRed : GameObject;
	var southYellow : GameObject;
	var southGreen : GameObject;
	var westRed : GameObject;
	var westYellow : GameObject;
	var westGreen : GameObject;
	var eastRed : GameObject;
	var eastYellow : GameObject;
	var eastGreen : GameObject;
	//COLORS OF LIGHTS
	private var redOn : Color = Color32(255, 0, 0, 0);
	private var redOff : Color = Color32(45, 0, 0, 0);
	private var yellowOn : Color = Color32(255, 255, 0, 0);
	private var yellowOff : Color = Color32(45, 45, 0, 0);
	private var greenOn : Color = Color32(0, 255, 0, 0);
	private var greenOff : Color = Color32(0, 0, 0, 0);


function Start () {
northGreen.transform.renderer.material.color = greenOn;
southGreen.transform.renderer.material.color = greenOn;
westRed.transform.renderer.material.color = redOn;
eastRed.transform.renderer.material.color = redOn;
currentGreenLight = "NS";
}

function Update () {
	
	
	
	//controls for the street light functioning
	count++;
	lightControl();
	trafficControl(greenLight);
}

function lightControl(){
	if(currentGreenLight == "NS"){
		//CHANGES THE LIGHT FROM GREEN TO RED AFTER 1000 COUNT
		if(count > 500 && count < 600){
			northGreen.transform.renderer.material.color = greenOff;
			northYellow.transform.renderer.material.color = yellowOn;
			southGreen.transform.renderer.material.color = greenOff;
			southYellow.transform.renderer.material.color = yellowOn;
		}else if(count > 600){
			northYellow.transform.renderer.material.color = yellowOff;
			northRed.transform.renderer.material.color = redOn;
			southYellow.transform.renderer.material.color = yellowOff;
			southRed.transform.renderer.material.color = redOn;
			count = 0;
			currentGreenLight = "";
			
			yield WaitForSeconds(2);
			
			currentGreenLight = "WE";
			westGreen.transform.renderer.material.color = greenOn;
			eastGreen.transform.renderer.material.color = greenOn;
			westRed.transform.renderer.material.color = redOff;
			eastRed.transform.renderer.material.color = redOff;
		}
	}else if(currentGreenLight == "WE"){
		if(count > 500 && count < 600){
			westGreen.transform.renderer.material.color = greenOff;
			westYellow.transform.renderer.material.color = yellowOn;
			eastGreen.transform.renderer.material.color = greenOff;
			eastYellow.transform.renderer.material.color = yellowOn;
		}else if(count > 600){
			westYellow.transform.renderer.material.color = yellowOff;
			westRed.transform.renderer.material.color = redOn;
			eastYellow.transform.renderer.material.color = yellowOff;
			eastRed.transform.renderer.material.color = redOn;
			count = 0;
			currentGreenLight = "";
			
			yield WaitForSeconds(2);
			
			currentGreenLight = "NS";
			northGreen.transform.renderer.material.color = greenOn;
			southGreen.transform.renderer.material.color = greenOn;
			northRed.transform.renderer.material.color = redOff;
			southRed.transform.renderer.material.color = redOff;
		}
	}
}

function trafficControl(greenLight : String){
	if(currentGreenLight == "NS"){
		greenLight ="NS";
	}else if(currentGreenLight == "WE"){
		greenLight ="WE";
	}
	
}