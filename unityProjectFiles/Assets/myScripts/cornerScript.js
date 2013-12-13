#pragma strict






function OnTriggerEnter (other : Collider){
	if(other.gameObject.layer == 30){
		if(other.gameObject.name == "tde1n"){
			transform.GetComponent(aiStates).leftCoord = 958.4;
			transform.GetComponent(aiStates).leftState = true;
		}else if(other.gameObject.name =="tde2n"){
			transform.GetComponent(aiStates).leftCoord = 962.3;
			transform.GetComponent(aiStates).leftState = true;
		}else if(other.gameObject.name =="tde1s"){
			transform.GetComponent(aiStates).rightCoord = 949.4;
			transform.GetComponent(aiStates).rightState = true;
		}else if(other.gameObject.name =="tde2s"){
			transform.GetComponent(aiStates).rightCoord = 945.2;
			transform.GetComponent(aiStates).rightState = true;		
		}else if(other.gameObject.name =="tdn1e"){
			transform.GetComponent(aiStates).rightCoord = 441.5;
			transform.GetComponent(aiStates).rightState = true;
		}else if(other.gameObject.name =="tdn2e"){
			transform.GetComponent(aiStates).rightCoord = 437.5;
			transform.GetComponent(aiStates).rightState = true;		
		}else if(other.gameObject.name =="tdn1w"){
			transform.GetComponent(aiStates).leftCoord = 445.9;
			transform.GetComponent(aiStates).leftState = true;
		}else if(other.gameObject.name =="tdn2w"){
			transform.GetComponent(aiStates).leftCoord = 449.4;
			transform.GetComponent(aiStates).leftState = true;		
		}else if(other.gameObject.name =="tdw1n"){
			transform.GetComponent(aiStates).rightCoord = 87.6;
			transform.GetComponent(aiStates).rightState = true;	
		}else if(other.gameObject.name =="tdw2n"){
			transform.GetComponent(aiStates).rightCoord = 92.2;
			transform.GetComponent(aiStates).rightState = true;			
		}else if(other.gameObject.name =="tdw1s"){
			transform.GetComponent(aiStates).leftCoord = 79.0;
			transform.GetComponent(aiStates).leftState = true;		
		}else if(other.gameObject.name =="tdw2s"){
			transform.GetComponent(aiStates).leftCoord = 75.0;
			transform.GetComponent(aiStates).leftState = true;	
		}else if(other.gameObject.name =="tds1e"){
			transform.GetComponent(aiStates).leftCoord = 51.8;
			transform.GetComponent(aiStates).leftState = true;			
		}else if(other.gameObject.name =="tds2e"){
			transform.GetComponent(aiStates).leftCoord = 48.0;
			transform.GetComponent(aiStates).leftState = true;			
		}else if(other.gameObject.name =="tds1w"){
			transform.GetComponent(aiStates).rightCoord = 61.0;
			transform.GetComponent(aiStates).rightState = true;		
		}else if(other.gameObject.name =="tds2w"){
			transform.GetComponent(aiStates).rightCoord = 65.0;
			transform.GetComponent(aiStates).rightState = true;		
		}
	}
}