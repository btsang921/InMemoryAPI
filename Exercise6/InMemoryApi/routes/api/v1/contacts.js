/* In this file you will define all the routes for your api.
You will need to define the following routes:
1) /api/v1/contacts
  This route will need to respond to 2 requests:
  1) GET: it will respond with the serialized form of all the
  contacts in your application and a response code of 200
  2) POST: it will respond to a POST request that will generate a 
  new instance of a contact and add it to the in memory collection
  and a response code 201. The 
2) /api/v1/contacts/:id
  This route will need to responde to 3 requests:
  i) GET: it will respond with the serialized form of the requested
  resource and a response code of 200. You will receive the :id from 
  the req.params.id property
  ii) PUT: it will update the resource with the information attached in
  the req.body property. Your route should respond with a 201 response code along with the updated
  resource otherwise 404 with an error message of "unable to update resource".
  iii) DELETE: it will remove the contact from the collection with the matching id 
  in the request.params object and respond with a status code of 201 alone with 
  the deleted resource in the response. If the resource is not found the route should
  respond with a 404 error and message "resource not found".  
3) /api/v1/contacts?firstName=&lastName=&email=
    This route should return all contacts that match any of the 3 possible query parameters.
    Any query parameter passed other than those listed in the url string should be ignored.
    If more than one entry matches the requested params then your server should return every
    instance that matches in an array containing all the matches wrapped in json. If no entry
    in the database matches your server should return a 404 server code along with an error message
    saying "No contact matches that request".
    Note: query params end at the end of the route,
    and all come after the ? character and are combined with a &.

  Hint: when sending your response you should follow the following examples:
  res.status(404).json({error: 'Contact not found'})  
  res.status(200).json(contacts)
  res.status(201).json(data)  
  */

let express = require('express');
let contactsRouter = express.Router();
let Contact = require('../../../models/contact')

let contacts = [];

let id = 0;


/* Define your routes/endpoints here */

/* part 1*/

contactsRouter.get('/', (req, res) => {
  if (req.query.firstName != null && req.query.lastName != null && req.query.email != null) {
    if (contacts.filter(x => x.firstName == req.query.firstName && x.lastName == req.query.lastName && x.email == req.query.email).length == 0) {
      res.status(404).json({error: 'Contact not found'})  
    } else {
    res.status(200).json(contacts.filter(x => x.firstName == req.query.firstName && x.lastName == req.query.lastName && x.email == req.query.email))
    }
  } else if (req.query.firstName != null && req.query.lastName == null && req.query.email != null) {
    if (contacts.filter(x => x.firstName == req.query.firstName && x.email == req.query.email).length == 0) {
      res.status(404).json({error: 'Contact not found'})
    } else {
    res.status(200).json(contacts.filter(x => x.firstName == req.query.firstName && x.email == req.query.email))
    }
  } else if (req.query.firstName == null && req.query.lastName != null && req.query.email != null) {
    if (contacts.filter(x => x.lastName == req.query.lastName && x.email == req.query.email).length == 0) {
      res.status(404).json({error: 'Contact not found'})
    } else {
      res.status(200).json(contacts.filter(x => x.lastName == req.query.lastName && x.email == req.query.email))
    }
  } else if (req.query.firstName != null && req.query.lastName == null && req.query.email == null) {
    if (contacts.filter(x => x.firstName == req.query.firstName).length == 0) {
      res.status(404).json({error: 'Contact not found'})
    } else {
    res.status(200).json(contacts.filter(x => x.firstName == req.query.firstName))
    }
  } else if (req.query.firstName == null && req.query.lastName != null && req.query.email == null) {
    if (contacts.filter(x => x.lastName == req.query.lastName).length == 0) {
      res.status(404).json({error: 'Contact not found'})
    } else {
    res.status(200).json(contacts.filter(x => x.lastName == req.query.lastName))
    }
  } else if (req.query.firstName != null && req.query.lastName != null && req.query.email == null) {
    if (contacts.filter(x => x.firstName == req.query.firstName && x.lastName == req.query.lastName).length == 0) {
      res.status(404).json({error: 'Contact not found'})
    } else {
    res.status(200).json(contacts.filter(x => x.firstName == req.query.firstName && x.lastName == req.query.lastName))
    }
  } else if (req.query.firstName == null && req.query.lastName == null && req.query.email != null) {
    if (contacts.filter(x => x.email == req.query.email).length == 0) {
      res.status(404).json({error: 'Contact not found'})
    } else {
    res.status(200).json(contacts.filter(x => x.email == req.query.email))
    }
  } else {
    res.status(200).json(contacts)
  }
})

contactsRouter.post('/', (req, res) => {
  id++
  const newContact = new Contact(req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.email, id)
    contacts.push(newContact)
    try {
    res.status(201).json(newContact)
    } catch(e) {
      res.status(404).json({error: 'Contact not found'})
    }
})

/* part 2 */

contactsRouter.get('/:id', (req, res) => {
  const index = contacts.findIndex(x => x.id == req.params.id)
      if (index != -1) {
        if (index < contacts.length) {
          res.status(200).json(contacts[index])
        } else {
          res.status(404).json({error: 'Contact not found'})
        }
      } else {
        res.status(404).json({error: 'Contact not found'})
      }
})

contactsRouter.put('/:id', (req, res) => {
  const index = contacts.findIndex(x => x.id == req.params.id)
  if (req.body.firstName != null) {
    contacts[index].firstName = req.body.firstName
  }
if (req.body.lastName != null) {
  contacts[index].lastName = req.body.lastName
  }
if (req.body.phoneNumber != null) {
  contacts[index].phoneNumber = req.body.phoneNumber
  }
if (req.body.email != null) {
  contacts[index].email = req.body.email
  }
if (req.body.id != null) {
  contacts[index].id = req.body.id
  }
  try {
    res.status(201).json(updatedContact)
  }  catch(e) {
    res.status(404).json({error: 'Contact not found'})
  }
})

contactsRouter.delete('/:id', (req, res) => {
  const index = contacts.findIndex(x => x.id == req.params.id)
    if (index != -1) {
      try {
        let deleted = contacts[index]
        contacts.splice(index,1)
        res.status(201).json(deleted)
      } catch(e) {
        res.status(404).json({error: 'Contact not found'})
      }
    } else {
      res.status(404).json({error: 'Contact not found'})
    }
})

/* part 3 */

module.exports = contactsRouter;