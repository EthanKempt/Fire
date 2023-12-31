import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteField,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKEhJRciR51okIFqsFamrDqWsyRzTd2RE",
  authDomain: "higleyassassinsproject.firebaseapp.com",
  projectId: "higleyassassinsproject",
  storageBucket: "higleyassassinsproject.appspot.com",
  messagingSenderId: "237417001265",
  appId: "1:237417001265:web:1c4100d2b41e455cccc010",
  measurementId: "G-E7TK2NYFL4",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "teams");

window.updateTeams = new Promise((resolve, reject) => {
  getDocs(colRef)
    .then((snapshot) => {
      window.teams = [];
      snapshot.docs.forEach((doc) => {
        teams.push({ ...doc.data(), id: doc.id });
      });
      resolve(teams);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.adminEdit = function (i, a, b, c, d, e, f, g, h, j) {
  var team = teams[i].teamName;
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    player1: a,
    player2: b,
    player3: c,
    targets: e,
    teamPass: f,
    status: g,
    safe: h,
    squad: j
  });
  if (d) {
    if (teams[i].player4) {
      updateDoc(docRef, {
        player4: d,
      });
    } else {
      updateDoc(docRef, {
        player4: d,
      });
    }
  } else {
    if (teams[i].player4) {
      updateDoc(docRef, {
        player4: deleteField(),
      });
    }
  }
  makeToast("Team edited successfully");
};

window.writeNewTeam = function (a, b, c, d, e, f, g, h, i) {
  const currentRef = doc(db, "teams", a);

  setDoc(doc(db, "teams", a), {
    teamName: a,
    teamPass: b,
    player1: c,
    player2: d,
    player3: e,
    status: h,
    safe: i,
    squad: 0,
  });
  if (f) {
    updateDoc(currentRef, {
      player4: f,
    });
  }
  if (g != null) {
    updateDoc(currentRef, {
      targets: g,
    });
  } else {
    updateDoc(currentRef, {
      targets: "none",
    });
  }
  makeToast("Team succesfully added");
};

window.deleteCurrent = function (a) {
  deleteDoc(doc(db, "teams", a));
  makeToast("Team succesfully deleted");
};

window.newSave = function (random) {
  let order = random;
  for (let a = 0; a < order.length; a++) {
    let pers = order[a];
    if (a + 1 == order.length) {
      var b = 0;
    } else {
      var b = a + 1;
    }
    let target = order[b];

    const currentRef = doc(db, "teams", pers);
    updateDoc(currentRef, {
      targets: target,
    });
  }
  makeToast("Assignments saved successfully");
};

window.messageUpdate = new Promise((resolve, reject) => {
  const colRef2 = collection(
    db,
    "teams",
    sessionStorage.currentTeam,
    "messages"
  );
  getDocs(colRef2)
    .then((snapshot) => {
      window.messages = [];
      snapshot.docs.forEach((doc) => {
        messages.push({ ...doc.data() });
      });
      var sorted = messages.sort((a, b) => a.time.seconds - b.time.seconds);
      resolve(sorted);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.addMessage = function (a, b, c) {
  addDoc(collection(db, "teams", a, "messages"), {
    author: b,
    value: c,
    time: new Date(),
  });
  if (b != 'admin') {
    updateDoc(doc(db, "teams", a), {
      adminRead: false,
    });
  }
};

const startTime = new Date().getTime() / 1000;

if (window.location.pathname == "/dist/targets.html") {
  const q = query(
    collection(db, "teams", sessionStorage.currentTeam, "messages")
  );
  onSnapshot(q, (querySnapshot) => {
    // if (!querySnapshot.metadata.hasPendingWrites) {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    var sorted = messages.sort((a, b) => a.time.seconds - b.time.seconds);
    sessionStorage.setItem("messages", JSON.stringify(sorted));
    addMessage();
    //  }
  });
} else {
  const q = query(
    collection(db, "teams", sessionStorage.currentTeam, "messages")
  );
  onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().time.seconds > startTime) {
        markUnread();
        document.getElementById("notification").style.display = "inline-block";
      }
    });
  });
}
function markUnread() {
  updateDoc(doc(db, "teams", sessionStorage.currentTeam), {
    read: "false",
  });
}

function addMessage() {
  let messageBox = document.getElementById("messager");
  let messages = JSON.parse(sessionStorage.messages);
  let size = messages.length - 1;
  let last = messages[size];
  var color = "secondary";
  if (last.author == "team") {
    color = "primary";
  }
  let message = last.value;
  var scroll = false;
  if (messageBox.scrollHeight > messageBox.clientHeight) {
    if (
      messageBox.scrollTop + messageBox.clientHeight ==
      messageBox.scrollHeight
    ) {
      scroll = true;
    }
  }
  if (last.time.seconds >= startTime) {
    messageBox.innerHTML +=
      '<h4><div class="badge bg-' +
      color +
      ' message">' +
      message +
      "</div></h4>";
  }
  document.getElementById("messageVal").value = "";
  if (scroll) {
    scrollBottom();
  }
}

//if (window.location.pathname == "/dist/targets.html") {
window.updateMessages = new Promise((resolve, reject) => {
  var team = sessionStorage.currentTeam;
  const colRef3 = query(collection(db, "teams", team, "messages"));
  getDocs(colRef3)
    .then((snapshot) => {
      var messages3 = [];
      snapshot.docs.forEach((doc) => {
        messages3.push({ ...doc.data(), id: doc.id });
      });
      resolve(messages3);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.initMessages = async function (a) {
  var team = a;
  updateRead(team);
  window.updateMessagesAd = new Promise((resolve, reject) => {
    const colRef3 = query(collection(db, "teams", team, "messages"));
    getDocs(colRef3)
      .then((snapshot) => {
        window.messages = [];
        snapshot.docs.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        resolve(messages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  let allMessages = await updateMessagesAd;
  let sorted = allMessages.sort((a, b) => b.time.seconds - a.time.seconds);
  addMessages(allMessages, team);
};

function updateRead(team) {
  updateDoc(doc(db, "teams", team), {
    adminRead: true
  });
}

window.saveMessageAdmin = function (team, message, author) {
  addDoc(collection(db, "teams", team, "messages"), {
    author: author,
    value: message,
    time: new Date(),
  });
  updateDoc(doc(db, "teams", team), {
    read: false
  });
};

if (window.location.pathname == "/admin/messages.html") {
  initListeners();
  async function initListeners() {
    let teams = await updateTeams;
    for (let a = 0; a < teams.length; a++) {
      const q = query(collection(db, "teams", teams[a].teamName, "messages"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            insertMessage(change.doc.data(), teams[a].teamName);
          }
        });
      });
    }
  }

  initListenerMessages()
  async function initListenerMessages() {
    let teams = await updateTeams;
    for (let a = 0; a < teams.length; a++) {
      const q = query(collection(db, "teams", teams[a].teamName, "messages"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().time.seconds > startTime) {
            document.getElementById(teams[a].teamName + 'Alert').style.display = 'inline-block'
          }
        });
      });
    }
  }
} else if (window.location.pathname.slice(0, 7) == "/admin/") {

  const startTime = new Date().getTime() / 1000;

  initListenersAdmin();

  async function initListenersAdmin() {
    
    let teams = await updateTeams;
    for (let a = 0; a < teams.length; a++) {
      const q = query(collection(db, "teams", teams[a].teamName, "messages"));
      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().time.seconds > startTime) {
            document.getElementById('notification').style.display = 'inline-block'
          }
        });
      });
    }
  }
}

function insertMessage(message, team) {
  let body = document.getElementById("body" + team);
  if (message.time.seconds >= startTime) {
    var scroll = false;
    if (body.scrollTop == body.scrollHeight - body.clientHeight) {
      scroll = true;
    }
    var color = "secondary";
    if (message.author == "admin") {
      color = "primary";
    }
    body.innerHTML +=
      '<h4><div class="badge bg-' +
      color +
      ' message">' +
      message.value +
      "</div></h4>";
    if (scroll) {
      scrollBottom(team);
    }
    let a = document.getElementById("messageBox" + team);
    a.value = "";
  }
}

window.addScrollMessages = async function (team) {
  window.getMess = new Promise((resolve, reject) => {
    const colRef3 = query(collection(db, "teams", team, "messages"));
    getDocs(colRef3)
      .then((snapshot) => {
        window.messages = [];
        snapshot.docs.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        let sorted = messages.sort((a, b) => a.time.seconds - b.time.seconds);
        resolve(sorted);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  let allMessages = await getMess;
  insertScrollMessages(allMessages, team);
};

window.updateNotes = function (a, team) {
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    notes: a,
  });
};

window.deleteOldTeamInfo = function (team, playerOrder, fourthPlayer) {
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    [playerOrder]: fourthPlayer,
    player4: deleteField(),
  });
};

window.updateTeamInfo = function (team, name) {
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    player4: name,
  });
};

window.updateUserTeam = function (team, name, order, status) {
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    [order]: name,
    status: status
  });
};

window.markRead = function () {
  var team = sessionStorage.getItem("currentTeam");
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    read: true,
  });
};

window.saveNewPlayerT = function (name, team) {
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    player4: name,
  });
}