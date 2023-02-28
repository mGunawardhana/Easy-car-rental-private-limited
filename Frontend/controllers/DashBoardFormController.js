let baseURL = "http://localhost:8080/Backend_war";
setUserCount();
setCarQuantity();
setDriversCount();
setBookingCunt();

function setUserCount() {
    $.ajax({
        url: baseURL + "/customer/customerCount/{count}", method: "GET", dataType: "json", success: function (res) {
            console.log(res.data);
            $("#lbl2").text(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

function setCarQuantity() {
    $.ajax({
        url: baseURL + "/vehicle/vehicleCount/{count}", method: "GET", dataType: "json", success: function (res) {
            console.log(res.data);
            $("#lbl3").text(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

function setDriversCount() {
    $.ajax({
        url: baseURL + "/driver/driverCount/{count}", method: "GET", dataType: "json", success: function (res) {
            console.log(res.data);
            $("#lbl4").text(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

function setBookingCunt() {
    $.ajax({
        url: baseURL + "/bookings/bookingCount/{count}", method: "GET", dataType: "json", success: function (res) {
            console.log(res.data);
            $("#lbl5").text(res.data);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

getAllDrivers();

function getAllDrivers() {
    $("#driverTableBody").empty();
    $.ajax({
        url: baseURL + "/driver/get_all", success: function (res) {
            for (let c of res.data) {

                let id = c.id;
                let driverAvailability = c.driverAvailability;
                let contactNo = c.contactNo;
                let firstname = c.name.firstName;

                let row = "<tr>" + "<td>" + id + "</td>" + "<td>" + firstname + "</td>" + "<td>" + driverAvailability + "</td>" + "<td>" + contactNo + "</td>" + "</tr>";
                $("#availability").append(row);
            }

            bindRowClickEventsForDriver();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
    genarateID();
}