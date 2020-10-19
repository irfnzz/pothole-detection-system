// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDpJhIewJ7teS4TL9-CWQBIE5HkuVTu7Z4",
  authDomain: "final-year-project-64d3d.firebaseapp.com",
  databaseURL: "https://final-year-project-64d3d.firebaseio.com",
  projectId: "final-year-project-64d3d",
  storageBucket: "final-year-project-64d3d.appspot.com",
  messagingSenderId: "633987528689",
  appId: "1:633987528689:web:41eb92368e58db16bab650"
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
