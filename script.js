/* =====================================================
   CM CREATIVE SHOTS
   BOOKING SYSTEM
===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close menu after clicking a link */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= DATE ================= */

const dateInput = document.getElementById("date");

/* Prevent customers from selecting a date in the past */

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


/* ================= TIME ================= */

const timeButtons = document.querySelectorAll(".time-choice");

const selectedTime = document.getElementById("selectedTime");

const otherTimeBox = document.getElementById("otherTimeBox");
const otherTime = document.getElementById("otherTime");


timeButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove selected from all time buttons */

        timeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        /* Select clicked button */

        button.classList.add("selected");

        const value = button.dataset.value;

        selectedTime.value = value;


        /* OTHER */

        if (value === "OTHER") {

            otherTimeBox.classList.add("show");

            otherTime.required = true;

            otherTime.focus();

        } else {

            otherTimeBox.classList.remove("show");

            otherTime.required = false;

            otherTime.value = "";

        }

    });

});


/* ================= SESSION TYPE ================= */

const typeButtons = document.querySelectorAll(".type-choice");

const selectedType = document.getElementById("selectedType");

const otherEventBox = document.getElementById("otherEventBox");
const otherEvent = document.getElementById("otherEvent");


typeButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove selected */

        typeButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        /* Select */

        button.classList.add("selected");

        const value = button.dataset.value;

        selectedType.value = value;


        /* OTHER EVENT */

        if (value === "OTHER EVENT") {

            otherEventBox.classList.add("show");

            otherEvent.required = true;

            otherEvent.focus();

        } else {

            otherEventBox.classList.remove("show");

            otherEvent.required = false;

            otherEvent.value = "";

        }

    });

});


/* ================= NUMBER OF PEOPLE ================= */

const peopleButtons = document.querySelectorAll(".people-choice");

const selectedPeople = document.getElementById("selectedPeople");


peopleButtons.forEach(button => {

    button.addEventListener("click", () => {

        peopleButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedPeople.value = button.dataset.value;

    });

});


/* ================= PAYMENT ================= */

const paymentButtons = document.querySelectorAll(".payment-choice");

const selectedPayment = document.getElementById("selectedPayment");


paymentButtons.forEach(button => {

    button.addEventListener("click", () => {

        paymentButtons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedPayment.value = button.dataset.value;

    });

});


/* ================= FORM ================= */

const bookingForm = document.getElementById("bookingForm");


bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();


    /* Basic validation */

    if (!selectedTime.value) {

        alert("Please select a time.");

        return;

    }


    if (!selectedType.value) {

        alert("Please select the session type.");

        return;

    }


    if (!selectedPeople.value) {

        alert("Please select the number of people.");

        return;

    }


    if (!selectedPayment.value) {

        alert("Please select a payment method.");

        return;

    }


    /* ================= GET DATA ================= */

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const location =
        document.getElementById("location").value.trim();

    const date =
        document.getElementById("date").value;


    /* Time */

    let finalTime = selectedTime.value;

    if (selectedTime.value === "OTHER") {

        finalTime =
            otherTime.value.trim();

    }


    /* Session type */

    let finalType = selectedType.value;

    if (selectedType.value === "OTHER EVENT") {

        finalType =
            otherEvent.value.trim();

    }


    /* ================= FORMAT DATE ================= */

    let formattedDate = date;

    if (date) {

        const dateObject = new Date(date + "T00:00:00");

        formattedDate = dateObject.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    }


    /* ================= WHATSAPP MESSAGE ================= */

    const message =

`📸 *CM CREATIVE SHOTS — NEW BOOKING*

━━━━━━━━━━━━━━━━━━━━

👤 *CLIENT INFORMATION*

*Full Name:*
${name}

*Phone Number:*
${phone}

*Location:*
${location}

━━━━━━━━━━━━━━━━━━━━

📅 *BOOKING DETAILS*

*Date:*
${formattedDate}

*Time:*
${finalTime}

*Session Type:*
${finalType}

*Number of People:*
${selectedPeople.value}

━━━━━━━━━━━━━━━━━━━━

💳 *PAYMENT METHOD*

${selectedPayment.value}

━━━━━━━━━━━━━━━━━━━━

Please contact me to confirm the booking and provide the next steps.

Thank you for choosing *CM CreativeShots*. 📸`;


    /* ================= WHATSAPP ================= */

    const whatsappNumber = "59995254792";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    /* Open WhatsApp */

    window.open(whatsappURL, "_blank");

});