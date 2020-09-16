// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBZZqtiaUmowTNhG-mAEcBwrs3DVnC5BL0",
  authDomain: "pothole-68431.firebaseapp.com",
  databaseURL: "https://pothole-68431.firebaseio.com",
  projectId: "pothole-68431",
  storageBucket: "pothole-68431.appspot.com",
  messagingSenderId: "406914930227",
  appId: "1:406914930227:web:3f1a48f056960b56fbf546",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function create_unfinished_task() {
  unfinished_task_container = document.getElementsByClassName("container")[0];
  unfinished_task_container.innerHTML = "";

  task_array = [];
  firebase
    .database()
    .ref("unfinished_task")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        task_array.push(Object.values(childData));
      });
      for (var i, i = 0; i < task_array.length; i++) {
        task_longitude = task_array[i][0];
        task_latitude = task_array[i][1];
        task_title = task_array[i][2];
        task_key = task_array[i][3];

        task_container = document.createElement("div");
        task_container.setAttribute("class", "task_container");
        task_container.setAttribute("data-key", task_key);

        // TASK DATA
        task_data = document.createElement("div");
        task_data.setAttribute("id", "task_data");

        key = document.createElement("p");
        key.setAttribute("id", "task_title");
        key.setAttribute("contenteditable", false);
        key.innerHTML = task_title;

        longitude = document.createElement("p");
        longitude.setAttribute("id", "task_longitude");
        longitude.setAttribute("contenteditable", false);
        longitude.innerHTML = task_longitude;

        latitude = document.createElement("p");
        latitude.setAttribute("id", "task_latitude");
        latitude.setAttribute("contenteditable", false);
        latitude.innerHTML = task_latitude;

        unfinished_task_container.append(task_container);
        task_container.append(task_data);
        task_data.append(key);
        task_data.append(longitude);
        task_data.append(latitude);
      }
    });
}
