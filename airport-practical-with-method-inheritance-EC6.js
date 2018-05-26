(() => {
    console.log("HI");

    class Person {
        constructor(name, surname) {
            this.name = name.charAt(0) + name.slice(1);
            this.surname = surname.charAt(0) + surname.slice(1);
        }

        getData() {
            return `${this.name}, ${this.surname}`;
        }
    }

    class Seat {
        constructor(number, category) {
            this.number = parseInt(number) || Math.floor(Math.random() * (99 - 10) + 10);
            this.category = category || "E";
        }

        getData() {
            return `${this.number}, ${this.category.toUpperCase()}`;
        }
    }

    class Passenger {
        constructor(person, seat) {
            this.seat = seat;
            this.person = person;
        }
        getData() {
            return `${this.seat.getData()}, ${this.person.getData()}`;
        }
    }

    class Flight {
        constructor(relation, date) {
            this.relation = relation;
            this.date = new Date(date);
            this.listOfPassengers = [];
        }

        addPassenger(passenger) {
            this.listOfPassengers.push(passenger);
        }

        getDate() {
            let day = this.date.getDate();
            let month = this.date.getMonth() + 1;
            let year = this.date.getFullYear();

            let formattedDate = day + "." + month + "." + year;

            return `${formattedDate}, ${this.relation}`;
        }
    }

    class Airport {
        constructor() {
            this.name = "Nikola Tesla"
            this.listOfFlights = [];
            this.totalPassengers = 0;
            this.businessPassengers = 0;
        }

        addFlight(flight) {
            this.listOfFlights.push(flight);
        }

        getData() {
            let totalPassengers = 0;
            let output = String("");
            let outputData = String("");

            this.listOfFlights.forEach(function(flight) {
                let passengers = flight.listOfPassengers;
                totalPassengers += passengers.length;

                outputData += "\t" + flight.getDate() + "\n"

                passengers.forEach(function(passenger) {
                    outputData += "\t\t" + passenger.getData() + "\n"
                }, this);
            }, this);

            output = "Airport: " + this.name + ", total passengers: " + totalPassengers + "\n";
            output += outputData;

            return output;
        }
    }

    const createFlight = (relation, date) => {
        return new Flight(relation, date);
    }

    const createPassenger = (name, surname, number, category) => {
        const person = new Person(name, surname);
        const seat = new Seat(number, category);
        const passenger = new Passenger(person, seat);
        return passenger;
    }

    // Create Airport
    const airport = new Airport();

    // Create 2 flights
    const belgradeParisFlight = createFlight("Belgrade - New York", "12/12/2018");
    const barcelonaBelgradeFlight = createFlight("Paris - Belgrade", "12/12/2018");

    // Create 4 passengers	
    const passengerOne = createPassenger("John", "Snow", 1, "b");
    const passengerTwo = createPassenger("Cersei", "Lannister", 2, "e");
    const passengerThree = createPassenger("Daenerys", "Targaryen", 1);
    const passengerFour = createPassenger("Tyrion", "Lannister", 2);

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
    const airportData = airport.getData();
    console.log(airportData);


})();