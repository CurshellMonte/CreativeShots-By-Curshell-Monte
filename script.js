document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CM CREATIVE SHOTS - BOOKING SYSTEM
       ========================================= */

    const photographerWhatsApp = "59995254792";


    /* =========================================
       ELEMENTS
       ========================================= */

    const bookingForm =
        document.getElementById("bookingForm");

    const timeOptions =
        document.querySelectorAll(
            "#timeOptions .choice-button"
        );

    const selectedTime =
        document.getElementById("selectedTime");

    const otherTimeContainer =
        document.getElementById(
            "otherTimeContainer"
        );

    const otherTime =
        document.getElementById("otherTime");


    const eventOptions =
        document.querySelectorAll(
            "#eventOptions .choice-button"
        );

    const selectedEvent =
        document.getElementById("selectedEvent");

    const otherEventContainer =
        document.getElementById(
            "otherEventContainer"
        );

    const otherEvent =
        document.getElementById("otherEvent");


    const paymentOptions =
        document.querySelectorAll(
            "#paymentOptions .choice-button"
        );

    const selectedPayment =
        document.getElementById(
            "selectedPayment"
        );


    const minusButton =
        document.getElementById("minusButton");

    const plusButton =
        document.getElementById("plusButton");

    const peopleNumber =
        document.getElementById("peopleNumber");

    const numberOfPeople =
        document.getElementById(
            "numberOfPeople"
        );


    const bookingDateInput =
        document.getElementById("date");

    const dateButton =
        document.getElementById("dateButton");


    /* =========================================
       BOOK NOW - GO TO BOOKING
       ========================================= */

    const bookNowButtons =
        document.querySelectorAll(
            'a[href="#booking"], .book-now'
        );

    bookNowButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const bookingSection =
                    document.getElementById(
                        "booking"
                    );

                if (!bookingSection) {
                    return;
                }

                event.preventDefault();

                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (
                    window.history &&
                    window.history.pushState
                ) {

                    window.history.pushState(
                        null,
                        "",
                        "#booking"
                    );

                }

            }
        );

    });


    /* =========================================
       NAVIGATION
       ========================================= */

    const navigationLinks =
        document.querySelectorAll(
            '.navbar a[href^="#"]'
        );

    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (
                    window.history &&
                    window.history.pushState
                ) {

                    window.history.pushState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });


    /* =========================================
       DATE
       ========================================= */

    if (bookingDateInput) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        bookingDateInput.min = today;


        bookingDateInput.addEventListener(
            "change",
            function () {

                if (!this.value) {
                    return;
                }

                const selectedDate =
                    new Date(
                        this.value +
                        "T00:00:00"
                    );

                const formattedDate =
                    selectedDate.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        }
                    );

                if (dateButton) {

                    dateButton.textContent =
                        formattedDate;

                    dateButton.classList.add(
                        "selected"
                    );

                }

            }
        );

    }


    /* =========================================
       SELECT BUTTON
       ========================================= */

    function selectButton(
        buttons,
        clickedButton,
        hiddenInput,
        value
    ) {

        buttons.forEach(function (button) {

            button.classList.remove(
                "selected"
            );

            button.setAttribute(
                "aria-pressed",
                "false"
            );

        });


        clickedButton.classList.add(
            "selected"
        );

        clickedButton.setAttribute(
            "aria-pressed",
            "true"
        );


        if (hiddenInput) {

            hiddenInput.value =
                value;

        }

    }


    /* =========================================
       TIME
       ========================================= */

    timeOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const value =
                    button.dataset.value ||
                    button.textContent.trim();


                selectButton(
                    timeOptions,
                    button,
                    selectedTime,
                    value
                );


                if (
                    value.toUpperCase() ===
                    "OTHER"
                ) {

                    if (otherTimeContainer) {

                        otherTimeContainer.style.display =
                            "block";

                    }

                    if (otherTime) {

                        otherTime.required =
                            true;

                    }

                } else {

                    if (otherTimeContainer) {

                        otherTimeContainer.style.display =
                            "none";

                    }

                    if (otherTime) {

                        otherTime.required =
                            false;

                        otherTime.value =
                            "";

                    }

                }

            }
        );

    });


    /* =========================================
       TYPE OF SESSION
       ========================================= */

    eventOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const value =
                    button.dataset.value ||
                    button.textContent.trim();


                selectButton(
                    eventOptions,
                    button,
                    selectedEvent,
                    value
                );


                if (
                    value.toLowerCase() ===
                    "other event"
                ) {

                    if (otherEventContainer) {

                        otherEventContainer.style.display =
                            "block";

                    }

                    if (otherEvent) {

                        otherEvent.required =
                            false;

                    }

                } else {

                    if (otherEventContainer) {

                        otherEventContainer.style.display =
                            "none";

                    }

                    if (otherEvent) {

                        otherEvent.required =
                            false;

                    }

                }

            }
        );

    });


    /* =========================================
       PAYMENT
       ========================================= */

    paymentOptions.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const value =
                    button.dataset.value ||
                    button.textContent.trim();


                selectButton(
                    paymentOptions,
                    button,
                    selectedPayment,
                    value
                );

            }
        );

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

            peopleNumber.textContent =
                people;

        }


        if (numberOfPeople) {

            numberOfPeople.value =
                people;

        }

    }


    updatePeople();


    if (plusButton) {

        plusButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (people < 100) {
                    people++;
                }

                updatePeople();

            }
        );

    }


    if (minusButton) {

        minusButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (people > 1) {
                    people--;
                }

                updatePeople();

            }
        );

    }


    /* =========================================
       SUBMIT BOOKING
       ========================================= */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* ---------- REQUIRED ---------- */

                if (
                    !selectedTime ||
                    !selectedTime.value
                ) {

                    alert(
                        "Please select a time."
                    );

                    return;

                }


                if (
                    !selectedEvent ||
                    !selectedEvent.value
                ) {

                    alert(
                        "Please select the type of session."
                    );

                    return;

                }


                if (
                    !selectedPayment ||
                    !selectedPayment.value
                ) {

                    alert(
                        "Please select your payment method."
                    );

                    return;

                }


                if (
                    !bookingDateInput ||
                    !bookingDateInput.value
                ) {

                    alert(
                        "Please select a date."
                    );

                    return;

                }


                /* ---------- DATA ---------- */

                const formData =
                    new FormData(
                        bookingForm
                    );


                const fullName =
                    formData.get(
                        "fullName"
                    ) || "";


                const phone =
                    formData.get(
                        "phone"
                    ) || "";


                const location =
                    formData.get(
                        "location"
                    ) || "";


                const date =
                    formData.get(
                        "date"
                    ) || "";


                const peopleValue =
                    numberOfPeople
                        ? numberOfPeople.value
                        : people;


                const eventType =
                    selectedEvent.value;


                const payment =
                    selectedPayment.value;


                let time =
                    selectedTime.value;


                /* ---------- OTHER TIME ---------- */

                if (
                    time.toUpperCase() ===
                    "OTHER"
                ) {

                    if (
                        !otherTime ||
                        !otherTime.value.trim()
                    ) {

                        alert(
                            "Please enter your preferred time."
                        );

                        if (otherTime) {
                            otherTime.focus();
                        }

                        return;

                    }

                    time =
                        otherTime.value.trim();

                }


                /* ---------- OTHER EVENT ---------- */

                const extraDetails =
                    otherEvent
                        ? otherEvent.value.trim()
                        : "";


                /* ---------- DATE ---------- */

                let formattedDate =
                    date;


                if (date) {

                    const dateObject =
                        new Date(
                            date +
                            "T00:00:00"
                        );


                    formattedDate =
                        dateObject.toLocaleDateString(
                            "en-US",
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }
                        );

                }


                /* =========================================
                   WHATSAPP MESSAGE
                   ========================================= */

                let message =
`📸 CM CREATIVE SHOTS
BOOKING REQUEST

Hello CM CreativeShots,

I would like to make a booking.

━━━━━━━━━━━━━━━━━━

👤 FULL NAME:
${fullName}

📱 PHONE NUMBER:
${phone}

📍 LOCATION:
${location}

📅 DATE:
${formattedDate}

⏰ TIME:
${time}

👥 NUMBER OF PEOPLE:
${peopleValue}

📸 TYPE OF SESSION:
${eventType}

💳 PAYMENT:
${payment}`;


                if (extraDetails) {

                    message +=
`

📝 ANYTHING ELSE:
${extraDetails}`;

                }


                message +=
`

━━━━━━━━━━━━━━━━━━

Thank you!`;


                /* =========================================
                   OPEN WHATSAPP APP
                   ========================================= */

                const whatsappURL =
                    "https://wa.me/" +
                    photographerWhatsApp +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                /*
                 * This opens WhatsApp with
                 * +599 9 525 4792 and prepares
                 * the complete booking message.
                 */

                window.location.href =
                    whatsappURL;

            }
        );

    }

});