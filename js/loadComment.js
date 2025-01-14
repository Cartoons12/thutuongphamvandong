import { getFirestore, collection, query, where, getDocs, doc, addDoc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
let commenting = false;

import { initializeApp} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyD7ePXWqHo207fnWp2gESLGjLz0kPfKwCs",
  authDomain: "vonguyengiap-96cab.firebaseapp.com",
  projectId: "vonguyengiap-96cab",
  storageBucket: "vonguyengiap-96cab.firebasestorage.app",
  messagingSenderId: "643944616095",
  appId: "1:643944616095:web:bbcf284d804be9b50dd2aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let place = $("#section_5 .container #comments")
console.log(place)

$.ajax({
    url: "ajax/comment.html",
    type: "GET",
    dataType: "html",
    success: function (data) {
        getComments(db, data)
    },
    error: function (xhr, status) {
        alert("Sorry, there was a problem!");
    },
    complete: function (xhr, status) {
    }
});

async function getComments(db, form) {
    const q = query(collection(db, "comments3"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data()["data"])
      // doc.data() is never undefined for query doc snapshots
      let add = $.parseHTML(form)
      $(add).children("div div").children("div").children("p").html(doc.data()["data"])
        place.append(add)
    });
}

$(".contact-form").submit(async function(e){
  e.preventDefault()
  if(commenting) return

  commenting = true
  const newComment = await addDoc(collection(db, "comments3"), {
    data: $(".contact-form").serializeArray()[0]["value"]
  });

  $.ajax({
    url: "ajax/comment.html",
    type: "GET",
    dataType: "html",
    success: function (data) {
        let add = $.parseHTML(data)

        $(add).children("div div").children("div").children("p").html($(".contact-form").serializeArray()[0]["value"])
        place.prepend(add)
        $("#message").val("")

        
    },
    error: function (xhr, status) {
        alert("Sorry, there was a problem!");
    },
    complete: function (xhr, status) {
    }
  });
  $("#commentPost").blur()
  commenting = false
})