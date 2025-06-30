export const ErrorMessages = {
  MISSING_PET_FIELDS: {
    name: "MissingPetFieldsError",
    cause: "Missing name, specie or birthDate for pet",
    message: "Required fields for pet creation are missing",
    code: 1
  },
  USER_ALREADY_EXISTS: {
    name: "DuplicateUserError",
    cause: "Email already registered",
    message: "A user with this email already exists",
    code: 4
  }
};