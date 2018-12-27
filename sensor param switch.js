// Version 0.5.4
// Changes:
//          - Add msg.topic
//---------------------------
//var initialisation section
//---------------------------
var sensor = [];
var param = [];
var zones = [];
var environment = "/prod/";
var count_zones = 0;
//---------------------------
//Messaging section
//---------------------------
count_zones = msg.payload._zones.length - 1;
global.set("no_zones",count_zones);
for (var key in msg.payload) {
	for (i = 1; i <= count_zones; i++) {
		var newmsg = {
		    topic:"zone"+i,
			desc: msg.payload[key][i].desc,
			payload: msg.payload[key][i].value,
			uid: msg.payload[key][i].uid,
			type: msg.payload[key][i].type,
			id: key,
			zone: i
		};
		switch (newmsg.type) {
		case "sensor":
			sensor.push(newmsg);
			break;
		case "param":
			param.push(newmsg);
			break;
		case "zone":
			zones.push(newmsg);
			break;
		default:
			break;
		}

		var globalVar = environment + newmsg.uid;
		//ex. /test/1_humidity
		global.set(globalVar, newmsg.payload);
	}
}
global.set("zoneinfo",zones);
return [sensor, param];