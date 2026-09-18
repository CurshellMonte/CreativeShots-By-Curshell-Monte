const photographerWhatsApp = "59995254792";

const bookingForm = document.getElementById("bookingForm");

const timeOptions = document.getElementById("timeOptions");
const selectedTime = document.getElementById("selectedTime");
const otherTimeContainer = document.getElementById("otherTimeContainer");
const otherTime = document.getElementById("otherTime");

const eventOptions = document.getElementById("eventOptions");
const selectedEvent = document.getElementById("selectedEvent");
const otherEventContainer = document.getElementById("otherEventContainer");
const otherEvent = document.getElementById("otherEvent");

const paymentOptions = document.getElementById("paymentOptions");
const selectedPayment = document.getElementById("selectedPayment");

const minusButton = document.getElementById("minusButton");
const plusButton = document.getElementById("plusButton");
const peopleNumber = document.getElementById("peopleNumber");
const numberOfPeople = document.getElementById("numberOfPeople");


// =====================================================
// SELECT BUTTON FUNCTION
// =====================================================

function selectButton(container, button, hiddenInput) {

    if (!container || !button || !hiddenInput) return;

    // Remove selected from all buttons
    container.querySelectorAll(".choice-button").forEach((item) => {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
    });

    // Select clicked button
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");

    // Save selected value
    hiddenInput.value = button.dataset.value || "";
}


// =====================================================
// TIME
// =====================================================

if (timeOptions && selectedTime) {

    timeOptions.querySelectorAll(".choice-button").forEach((button) => {

        button.addEventListener("click", function () {

            selectButton(
                timeOptions,
                this,
                selectedTime
            );

            const isOther =
                selectedTime.value === "OTHER";

            if (otherTimeContainer) {
                otherTimeContainer.classList.toggle(
                    "hidden-field",
                    !isOther
                );
            }

            if (otherTime) {

                otherTime.required = isOther;

                if (!isOther) {
                    otherTime.value = "";
                }
            }

        });

    });
}


// =====================================================
// TYPE OF SESSION
// =====================================================

if (eventOptions && selectedEvent) {

    eventOptions.querySelectorAll(".choice-button").forEach((button) => {

        button.addEventListener("click", function () {

            selectButton(
                eventOptions,
                this,
                selectedEvent
            );

            const isOther =
                selectedEvent.value === "Other Event";

            if (otherEventContainer) {

                otherEventContainer.classList.toggle(
                    "hidden-field",
                    !isOther
                );

            }

            // Other Event description is OPTIONAL
            if (otherEvent) {
                otherEvent.required = false;
            }

        });

    });
}


// =====================================================
// PAYMENT
// =====================================================

if (paymentOptions && selectedPayment) {

    paymentOptions.querySelectorAll(".choice-button").forEach((button) => {

        button.addEventListener("click", function () {

            selectButton(
                paymentOptions,
                this,
                selectedPayment
            );

        });

    });
}


// =====================================================
// NUMBER OF PEOPLE
// =====================================================

let people = 1;

function updatePeople() {

    if (peopleNumber) {
        peopleNumber.textContent = people;
    }

    if (numberOfPeople) {
        numberOfPeople.value = people;
    }
}

if (minusButton) {

    minusButton.addEventListener("click", function () {

        if (people > 1) {
            people--;
            updatePeople();
        }

    });

}

if (plusButton) {

    plusButton.addEventListener("click", function () {

        if (people < 100) {
            people++;
            updatePeople();
        }

    });

}

updatePeople();


// =====================================================
// BOOKING → WHATSAPP
// =====================================================

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Check normal required fields
        if (!bookingForm.checkValidity()) {

            bookingForm.reportValidity();

            return;
        }


        const formData = new FormData(bookingForm);


        const fullName =
            (formData.get("fullName") || "").toString().trim();

        const phone =
            (formData.get("phone") || "").toString().trim();

        const date =
            (formData.get("date") || "").toString().trim();

        const location =
            (formData.get("location") || "").toString().trim();

        const time =
            (formData.get("selectedTime") || "").toString().trim();

        const otherTimeValue =
            (formData.get("otherTime") || "").toString().trim();

        const sessionType =
            (formData.get("selectedEvent") || "").toString().trim();

        const otherEventValue =
            (formData.get("otherEvent") || "").toString().trim();

        const peopleValue =
            (formData.get("numberOfPeople") || "1").toString().trim();

        const payment =
            (formData.get("selectedPayment") || "").toString().trim();

        const extraMessage =
            (formData.get("extraMessage") || "").toString().trim();


        // Format date
        let readableDate = date;

        if (date) {

            const selectedDate =
                new Date(date + "T00:00:00");

            readableDate =
                selectedDate.toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                );
        }


        // If OTHER time was selected
        const finalTime =
            time === "OTHER" && otherTimeValue
                ? otherTimeValue
                : time;


        // =================================================
        // WHATSAPP MESSAGE
        // =================================================

        let message =
`*CM CREATIVE SHOTS - NEW BOOKING*

*Name:* ${fullName}
*Phone:* ${phone}
*Date:* ${readableDate}
*Location:* ${location}
*Time:* ${finalTime}
*Session Type:* ${sessionType}
*Number of People:* ${peopleValue}
*Payment Method:* ${payment}`;


        if (sessionType === "Other Event" && otherEventValue) {

            message +=
`\n*Other Event Details:* ${otherEventValue}`;

        }


        if (extraMessage) {

            message +=
`\n*Anything Else:* ${extraMessage}`;

        }


        message +=
`\n\nThank you!`;


        // Encode message correctly
        const whatsappURL =
            `https://wa.me/${photographerWhatsApp}?text=${encodeURIComponent(message)}`;


        // Open WhatsApp
        window.open(
            whatsappURL,
            "_blank"
        );

    });

}