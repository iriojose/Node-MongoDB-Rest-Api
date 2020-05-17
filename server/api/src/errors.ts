  
//ERROR HANDLERS
//MESSAGGES AND CODES

export const Ok = {
    message: "Ok",
    code: 200
}

export const Created = {
    message: "Record created",
    code: 201
}

export const Update = {
    message: "Record updated",
    code: 201
}

export const Deleted = {
    message: "Record deleted",
    code: 200
}

export const Empty = {
    message: "This entity is empty",
    code: 200
}

export const InvalidID = {
    message: "The given id is not valid",
    code: 400
}

export const BadRequest = {
    message: "Bad Request",
    code: 400
}

export const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}

export const Forbidden = {
    message: "You are not allowed to use this route",
    code: 403
}

export const ElementNotFound = {
    message: "The element not exist",
    code: 404
}

export const RouteNotFound = {
    message: "The route not exist",
    code: 404
}

export const BadFormat = {
    message: "Format incorrect",
    code: 406
}

export const InternalServerError = {
    message: "Internal server error",
    code: 500
}