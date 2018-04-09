import * as firebase from 'firebase';

export class Firebase {
  static logIn = async (userEmail, password) => {
    const user = await firebase.auth().signInWithEmailAndPassword(userEmail, password);  
    const {
      email, displayName, emailVerified, uid,
    } = user;
    const snap = await firebase.database().ref('users').child(uid).once('value');
    const key = snap.val().group;

    return {
      user: {
        email,
        displayName,
        emailVerified,
        uid,
      },
      groupId: key,
    };
  };

  static logOut = async () => firebase.auth().signOut();

  static signUp = async (userEmail, password, name) => {
    const user = await firebase.auth()
      .createUserWithEmailAndPassword(userEmail, password);
    await user.updateProfile({ displayName: name });
    const {
      email, displayName, emailVerified, uid,
    } = user;
    return {
      email,
      displayName,
      emailVerified,
      uid,
    };
  };

  static createGroup = async (name, uid) => {
    const groupRef = firebase.database().ref('groups');
    const key = groupRef.push().key;
    const ref = groupRef.child(key);
    const userRef = firebase.database().ref('users').child(uid);
    await ref.set({
      groupName: name,
      owner: uid,
    });
    await userRef.set({
      group: key,
    }); 
    return key;
  };

  static addPilot = async (pilotData, group) => {
    if (!group) throw new Error('No existe la organización');
    const pilotsRef = firebase.database().ref('groups').child(group).child('pilots');
    if( await Firebase.exists(pilotsRef.orderByChild('name'), pilotData.name)) throw new Error('Piloto existente');
    const key = pilotsRef.push().key;
    await pilotsRef.child(key).set(pilotData);
    return {
      ...pilotData,
      key,
    };
  };

  static addDrone = async (droneData, group) => {
    if (!group) throw new Error('No existe la organización');
    const droneRef = firebase.database().ref('groups').child(group).child('drones');
    if (await Firebase.exists(droneRef.orderByChild('name'), droneData.name)) throw new Error('Drone existente');
    const key = droneRef.push().key;
    await droneRef.child(key).set(droneData);
    return {
      ...droneData,
      key,
    };
  };

  static getGroupHangar = async (group) => {
    if (!group) throw new Error('No existe la organización'); //TODO: Comprobar si existe
    const groupRef = firebase.database().ref('groups').child(group);
    const snap = await groupRef.once('value');
    const { pilots = [], drones = [], flights = [], groupName } = snap.val();
    return {
      pilots: Object.keys(pilots).map(key => ({ ...pilots[key], key })),
      drones: Object.keys(drones).map(key => ({ ...drones[key], key })),
      flights: Object.keys(flights).map(key => ({ ...flights[key], key })),
      name: groupName,
    };
  }

  static addFlight = async (flightData, group) => {
    if (!group) throw new Error('No existe la organización'); //TODO: Comprobar si existe
    const flightRef = firebase.database().ref('groups').child(group).child('flights');
    if (await Firebase.exists(flightRef.orderByChild('name'), flightData.name)) throw new Error('Vuelo existente');
    const key = flightRef.push().key;
    await flightRef.child(key).set(flightData);
    return {
      ...flightData,
      key,
    };
  };

  static deleteItem = async (type, key, group) => {
    if (!group) throw new Error('No existe la organización');
    const ref = firebase.database().ref('groups').child(group).child(type).child(key);
    return ref.remove();
  }
  static exists = async (ref, val) => {
    console.log(val);
    const snap = await ref.equalTo(val).once('value');
    const data = snap.val();
    return data?true:false;
  }
}
