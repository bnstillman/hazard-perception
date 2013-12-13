leftTurnDemoScene

newtown
aiVehicle (2)


Known issues : 

When aiCollisionCheck is enabled it allows the car to choose a direction BEFORE it is in the proper lane.

Possible fixes?

Move the collision check to the back of the vehicle and only trigger start and stop of other.GC(aiStates)