// BZtraps Magma Plugin v 0.1 by BadZombi

function On_EntityHurt(he) {
    try{
	    if(he.Attacker == he.Entity.Owner){
		    if(he.Entity.Name == "WoodCeiling" || he.Entity.Name == "MetalCeiling"){
		    	var pendingtrap = DataStore.Get(he.Attacker.SteamID, "BZTpending");
		    	if(pendingtrap != undefined && pendingtrap != "none"){
			    	he.Attacker.Message("Trap set on trigger door : " + pendingtrap + ". ");
			    	DataStore.Add("BZtraps", pendingtrap, he.Entity);
					Datastore.Remove(he.Attacker.SteamID, "BZTpending");
					DataStore.Remove(he.Attacker.SteamID, "BZpending");
					DataStore.Save();	
				}
		    }
		}
	} catch(err){
		he.Attacker.Broadcast("Error: " + err.message);
		he.Attacker.Broadcast("Details: " + err.description);
	}
}

function On_DoorUse(Player, de) {
    
    if(Player == de.Entity.Owner) {
        
        var pendingtrap = DataStore.Get(Player.SteamID, "BZpending");

        if(pendingtrap != undefined && pendingtrap == "setTrap"){
			DataStore.Add(Player.SteamID, "BZTpending", de.Entity.InstanceID);
			Player.Message("Trap will be set on door: " + de.Entity.InstanceID + ". ");
			Player.Message("Now hit the floor outside the door to mark it.");

		} 

        return;
    } else {
    	var trapped = DataStore.Get("BZtraps", de.Entity.InstanceID);
    	if(trapped != undefined){
    		Player.Notice("Aaaah! Its a Trap!");
    		
    		trapped.Destroy();
    		//trapped.X = trapped.X + 10;
    		DataStore.Remove("BZtraps", de.Entity.InstanceID);
			DataStore.Save();
    	}
    }
}


function On_Command(Player, cmd, args) { 

	cmd = Data.ToLower(cmd);
	switch(cmd) {

		case "trap":
			var pendingtrap = DataStore.Get(Player.SteamID, "BZpending");

			if(pendingtrap != undefined && pendingtrap == "setTrap"){
				DataStore.Add(Player.SteamID, "BZpending", "none");
				Player.Message("Canceled trap setting.");
			} else {
				DataStore.Add(Player.SteamID, "BZpending", "setTrap");
				Player.Message("The next door (which you own) you open will be trapped...");
				// start a timer so this will expire and notify the user.
			}

		break;

		
		
    }
}