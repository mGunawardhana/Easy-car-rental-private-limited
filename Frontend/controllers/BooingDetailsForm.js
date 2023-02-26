let baseURL = "http://localhost:8080/Backend_war/bookings/";


getAllBookingDetails();
function getAllBookingDetails() {//mekada i link eke aulk wage ssir poddak inn ayema run kaerala balnnm sir
    $.ajax({
        url: baseURL + "get_all_bookings",
        dataType: "json",
        success: function (res) {
            console.log(res.data);
            for (let c of res.data) {


                let bookingID = c.bookingID;
                let requestType = c.driverRequestType;
                let pickUpDate = c.pickUpDate;
                let pickUpLocation = c.pickUpLocation;
                let pickUpTime = c.pickUpTime;
                let returnDate = c.returnDate;
                let customerID = c.customer.id;


                let row = "<tr>" +
                    "<td>" +    bookingID + "</td>"
                    + "<td>" + requestType + "</td>"
                    + "<td>" + pickUpDate + "</td>"
                    + "<td>" + pickUpLocation + "</td>"
                    + "<td>" + pickUpTime + "</td>"
                    + "<td>" + returnDate + "</td>"
                    + "<td>" + customerID + "</td>"
                    + "</tr>";
                $("#paymentTable").append(row);
            }

        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}
