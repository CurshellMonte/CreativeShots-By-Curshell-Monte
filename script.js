const photographerWhatsApp = "59995254792";

const bookingForm = document.getElementById("bookingForm");

const bookingDateInput = document.getElementById("date");
const dateButton = document.getElementById("dateButton");

const timeOptions = document.querySelectorAll(".time-option");
const eventOptions = document.querySelectorAll(".event-option");
const paymentOptions = document.querySelectorAll(".payment-option");

const selectedTime = document.getElementById("selectedTime");
const selectedEvent = document.getElementById("selectedEvent");
const selectedPayment = document.getElementById("selectedPayment");

const customTimeWrapper = document.getElementById("customTimeWrapper");
const customTime = document.getElementById("customTime");

const otherEventWrapper = document.getElementById("otherEventWrapper");
const otherEvent = document.getElementById("otherEvent");

const minusButton =
    document.getElementById("minusButton") ||
    document.getElementById("minusPeople");

const plusButton =
    document.getElementById("plusButton") ||
    document.getElementById("plusPeople");

const peopleNumber = document.getElementById("peopleNumber");
const numberOfPeople = document.getElementById("numberOfPeople");



/* =========================================
   DATE
========================================= */

if (bookingDateInput) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    bookingDateInput.min = `${year}-${month}-${day}`;


    bookingDateInput.addEventListener("change", () => {

        if (!bookingDateInput.value) return;

        const selectedDate =
            new Date(bookingDateInput.value + "T00:00:00");

        const formattedDate =
            selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            });

        if (dateButton) {

            dateButton.textContent = formattedDate;

            dateButton.classList.add("selected");

        }

    });

}



/* =========================================
   TIME
========================================= */

timeOptions.forEach((button) => {

    button.addEventListener("click", () => {

        timeOptions.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const time = button.dataset.time;

        if (selectedTime) {
            selectedTime.value = time;
        }


        if (time === "OTHER") {

            if (customTimeWrapper) {
                customTimeWrapper.classList.remove("hidden-field");
            }

        } else {

            if (customTimeWrapper) {
                customTimeWrapper.classList.add("hidden-field");
            }

            if (customTime) {
                customTime.value = "";
            }

        }

    });

});



/* =========================================
   EVENT / TYPE OF PHOTOSHOOT
========================================= */

eventOptions.forEach((button) => {

    button.addEventListener("click", () => {

        eventOptions.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const eventType = button.dataset.event;

        if (selectedEvent) {
            selectedEvent.value = eventType;
        }


        if (eventType === "Other Event") {

            if (otherEventWrapper) {
                otherEventWrapper.classList.remove("hidden-field");
            }

        } else {

            if (otherEventWrapper) {
                otherEventWrapper.classList.add("hidden-field");
            }

            if (otherEvent) {
                otherEvent.value = "";
            }

        }

    });

});



/* =========================================
   PAYMENT
========================================= */

paymentOptions.forEach((button) => {

    button.addEventListener("click", () => {

        paymentOptions.forEach((item) => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const payment = button.dataset.payment;

        if (selectedPayment) {
            selectedPayment.value = payment;
        }

    });

});



/* =========================================
   NUMBER OF PEOPLE
========================================= */

let people = 1;


function updatePeople() {

    if (people < 1) {
        people = 1;
    }

    if (people > 100) {
        people = 100;
    }


    if (peopleNumber) {
        peopleNumber.textContent = people;
    }


    if (numberOfPeople) {
        numberOfPeople.value = people;
    }

}


if (minusButton) {

    minusButton.addEventListener("click", () => {

        people--;

        updatePeople();

    });

}


if (plusButton) {

    plusButton.addEventListener("click", () => {

        people++;

        updatePeople();

    });

}


updatePeople();



/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        const mobileMenu =
            document.getElementById("mobileMenu");

        if (mobileMenu) {
            mobileMenu.classList.remove("active");
        }

    });

});



/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}



/* =========================================
   BOOKING → WHATSAPP
========================================= */

if (bookingForm) {

    bookingForm.addEventListener("submit", (event) => {

        event.preventDefault();


        /* REQUIRED CHECKS */

        if (!selectedTime || !selectedTime.value) {

            alert("Please select a time.");

            return;

        }


        if (!selectedEvent || !selectedEvent.value) {

            alert("Please select the type of photoshoot.");

            return;

        }


        if (!selectedPayment || !selectedPayment.value) {

            alert("Please select a payment method.");

            return;

        }


        if (!bookingDateInput || !bookingDateInput.value) {

            alert("Please select a date.");

            return;

        }



        /* GET FORM VALUES */

        const fullName =
            document.getElementById("fullName")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const location =
            document.getElementById("location")?.value.trim() || "";

        const extraMessage =
            document.getElementById("extraMessage")?.value.trim() || "";



        /* DATE */

        const selectedDate =
            new Date(bookingDateInput.value + "T00:00:00");

        const formattedDate =
            selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            });



        /* TIME */

        let finalTime = selectedTime.value;

        if (
            selectedTime.value === "OTHER" &&
            customTime &&
            customTime.value.trim()
        ) {

            finalTime = customTime.value.trim();

        }



        /* EVENT */

        let finalEvent = selectedEvent.value;

        if (
            selectedEvent.value === "Other Event" &&
            otherEvent &&
            otherEvent.value.trim()
        ) {

            finalEvent =
                "Other Event - " +
                otherEvent.value.trim();

        }



        /* PEOPLE */

        const finalPeople =
            numberOfPeople?.value ||
            peopleNumber?.textContent ||
            "1";



        /* =====================================
           WHATSAPP MESSAGE
        ====================================== */

        const message =
`CM CREATIVE SHOTS
BOOKING REQUEST


━━━━━━━━━━━━━━━━━━

👤 NOMBER: 
${fullName}

📱 NUMBER: 
${phone}

📍 LOCATION:
${location}

📅 DIA: 
${formattedDate}

⏰ ORA: 
${finalTime}

👥 KUANTU HENDE: 
${finalPeople}

📸 TYPE OF PHOTOSHOOT: 
${finalEvent}

💳 PAGO: 
${selectedPayment.value}

📝 ALGU OTRO: 
${extraMessage || "N/A"}

━━━━━━━━━━━━━━━━━━

DANKII!!`;



        /* =====================================
           OPEN WHATSAPP APP FIRST
           THEN FALL BACK TO WEB
        ====================================== */

        const encodedMessage =
            encodeURIComponent(message);

        const whatsappAppURL =
            `whatsapp://send?phone=${photographerWhatsApp}&text=${encodedMessage}`;

        const whatsappWebURL =
            `https://wa.me/${photographerWhatsApp}?text=${encodedMessage}`;



        /* CHANGE BUTTON TEXT */

        const submitButton =
            bookingForm.querySelector(
                'button[type="submit"]'
            );


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                `OPENING WHATSAPP...`;

        }



        /*
         * Try the WhatsApp APP.
         */

        window.location.href = whatsappAppURL;



        /*
         * If the app cannot open,
         * send the user to WhatsApp Web.
         */

        setTimeout(() => {

            if (!document.hidden) {

                window.location.href =
                    whatsappWebURL;

            }

        }, 1500);

    });

}