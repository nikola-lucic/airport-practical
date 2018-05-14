console.log("HI");

function Person(name, surname) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.surname = surname.charAt(0).toUpperCase() + surname.slice(1);

    this.getNameAndSurname = function() {
        var output = this.name + this.surname;
        return output;
    }
}

function Seat(seatNumber, category) {
    this.seatNumber = seatNumber || (Math.floor(Math.random() * (99 - 10) + 10));
    this.category = category || "E"

    this.getSeatAndCategory = function() {
        return this.seatNumber + ", " + this.category.toUpperCase();
    }
}

function Passenger(person, seat) {
    this.person = person;
    this.seat = seat;

    this.getPersonAndSeat = function() {
        return this.seat.getSeatAndCategory() + ", " + this.person.getNameAndSurname();
    }
}

function Flight(flightRelations, date) {
    this.flightRelations = flightRelations;
    this.date = new Date(date);
    this.listOfPassengers = [];

    this.addPassenger = function(passenger) {
        this.listOfPassengers.push(passenger);
        return this.listOfPassengers;
    }

    this.getDataOfFlight = function() {
        var day = this.date.getDate();
        var month = this.date.getMonth() + 1;
        var year = this.date.getFullYear();

        var formattedDate = day + "." + month + "." + year;

        return new String(formattedDate + ", " + this.flightRelations);
    }
}

function Airport(name, listOfFlights) {
    this.name = "Nikola Tesla";
    this.listOfFlights = [];

    this.addFlight = function(flight) {
        this.listOfFlights.push(flight);
        return this.listOfFlights;
    }

    this.getData = function() {
        var totalPassengers = 0;
        var output = String("");
        var outputData = String("");

        this.listOfFlights.forEach(function(flight) {
            var passengers = flight.listOfPassengers;
            totalPassengers += passengers.length;

            outputData += "\t" + flight.getDataOfFlight() + "\n"

            passengers.forEach(function(passenger) {
                outputData += "\t\t" + passenger.getPersonAndSeat() + "\n"
            }, this);
        }, this);

        output = "Airport: " + this.name + ", total passengers: " + totalPassengers + "\n";
        output += outputData;

        return output;
    };
}

function createFlight(relation, date) {
    return new Flight(relation, date);
}

function createPassenger(name, surname, seatNumber, category) {
    var person = new Person(name, surname);
    var seat = new Seat(seatNumber, category);
    var passenger = new Passenger(person, seat);
    return passenger;
}


(function() {

    // Create Airport
    var airport = new Airport();

    // Create 2 flights
    var belgradeParisFlight = createFlight("Belgrade - New York", "12/12/2018");
    var barcelonaBelgradeFlight = createFlight("Paris - Belgrade", "12/12/2018");

    // Create 4 passengers	
    var passengerOne = createPassenger("John", "Snow", 1, "b");
    var passengerTwo = createPassenger("Cersei", "Lannister", 2, "e");
    var passengerThree = createPassenger("Daenerys", "Targaryen", 1);
    var passengerFour = createPassenger("Tyrion", "Lannister", 2);

    // Add passengers to first flight
    belgradeParisFlight.addPassenger(passengerOne);
    belgradeParisFlight.addPassenger(passengerTwo);

    // Add passengers to second flight
    barcelonaBelgradeFlight.addPassenger(passengerThree);
    barcelonaBelgradeFlight.addPassenger(passengerFour);

    // Add flights to airport
    airport.addFlight(belgradeParisFlight);
    airport.addFlight(barcelonaBelgradeFlight);

    // Output airport data
    var airportData = airport.getData();
    console.log(airportData);

}());