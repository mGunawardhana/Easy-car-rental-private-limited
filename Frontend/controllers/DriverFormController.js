let baseURL = "http://localhost:8080/Backend_war/driver/";

getAllDrivers();

$("#saveDriver").on('click', function () {
    saveDriver();
});

function saveDriver() {
    let formData = $("#driverFormController").serialize();
    $.ajax({
        url: baseURL + "save_driver", method: "post", data: formData, dataType: "json", success: function (res) {
            getAllDrivers();
            alert(res.message);
        }, error: function (error) {
            var errorMessage = JSON.parse(error.responseText);
            alert(errorMessage.message);
        }
    });
}

function getAllDrivers() {
    $("#driverTableBody").empty();
    $.ajax({
        url: baseURL + "get_all", success: function (res) {
            for (let c of res.data) {

                let id = c.id;
                let firstname = c.name.firstName;
                let lastname = c.name.lastName;
                let address = c.address;
                let drivingLicenseNo = c.drivingLicenseNo;
                let email = c.email;
                let contactNo = c.contactNo;
                let password = c.user.password;
                let driverAvailability = c.driverAvailability;
                let userName = c.user.username;
                let user_id = c.user.userId;


                let row = "<tr>" + "<td>" + id + "</td>" + "<td>" + firstname + "</td>" + "<td>" + lastname + "</td>" + "<td>" + address + "</td>" + "<td>" + drivingLicenseNo + "</td>" + "<td>" + email + "</td>" + "<td>" + contactNo + "</td>" + "<td>" + password + "</td>" + "<td>" + driverAvailability + "</td>" + "<td>" + userName + "</td>" + "<td>" + user_id + "</td>" + "</tr>";

                $("#driverTableBody").append(row);
            }

            bindRowClickEventsForDriver();            // clearTextFields();
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert(message);
        }
    });
}

$("#deleteDriver").on('click', function () {
    $.ajax({
        url: baseURL + "?code=" + $("#id").val(), method: "delete", dataType: "json", success: function (resp) {
            getAllDrivers();
            alert(resp.message);
        }, error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

$("#updateDriver").on('click', function () {

    let driver_id = $("#id").val();
    let fistname = $("#firstName").val();
    let lastname = $("#lastName").val();
    let address = $("#address").val();
    let licence_number = $("#drivingLicenseNo").val();
    let email = $("#email").val();
    let contact = $("#contactNo").val();
    let password = $("#").val();
    let availability = $("#driverAvailability").val();
    let username = $("#userName").val();
    let user_id = $("#userId").val();

    var driver = {
        driver_id: driver_id,
        fistname: fistname,
        lastname: lastname,
        address: address,
        licence_number: licence_number,
        email: email,
        contact: contact,
        password: password,
        availability: availability,
        username: username,
        user_id: user_id
    }

    $.ajax({
        url: baseURL +"update",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(driver),
        dataType: "json",
        success: function (res) {
            getAllDrivers();
            alert(res.message);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function bindRowClickEventsForDriver() {
    $("#driverTableBody>tr").on('click', function () {
        let id = $(this).children(":eq(0)").text();
        let firstName = $(this).children(":eq(1)").text();

        let lastName = $(this).children().eq(2).children(":eq(1)").text();

        /* let lastName = $(this).children(":eq(2)").text();*/
        let address = $(this).children(":eq(3)").text();
        let email = $(this).children(":eq(4)").text();
        let contactNo = $(this).children(":eq(5)").text();
        let userId = $(this).children(":eq(6)").text();
        let password = $(this).children(":eq(7)").text();
        let nic = $(this).children(":eq(8)").text();
        let drivingLicenseNo = $(this).children(":eq(9)").text();
        let role = $(this).children(":eq(10)").text();

        $('#id').val(id);
        $('#firstName').val(firstName);
        $('#lastName').val(lastName);
        $('#address').val(address);
        $('#email').val(email);
        $('#contactNo').val(contactNo);
        $('#userId').val(userId);
        $('#password').val(password);
        $('#nic').val(nic);
        $('#drivingLicenseNo').val(drivingLicenseNo);
        $('#role').val(role);

    });
}