/* In this file you will define the Contact class and export it.
You must use ES6 class syntax to define your class.
The contact class has the following properites:
firstName,
lastName,
phoneNumber,
email,
id
*/

module.exports = class Contact {
    constructor(firstName, lastName, phoneNumber, email, id) {
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.email = email
        this.id = id
    }
}