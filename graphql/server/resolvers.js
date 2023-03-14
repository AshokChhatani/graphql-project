const db = require("./db");

const Query = {
  greeting: () => "welcome",
  students: () => db.students.list().sort(),
  getStudentByID: (root, args, context, info) => {
    return db.students.get(args.id);
  },
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + " " + root.lastName;
  },
};

const Mutation = {
  createStudent: (root, args, context, info) => {
    return db.students.create({
      collegeID: args.collegeID,
      firstName: args.firstName,
      lastName: args.lastName,
    });
  },

  signup: (root, args, context, info) => {
    const { email, password, name } = args.input;
    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail = emailExpression.test(
      String(email).toLocaleLowerCase()
    );

    if (!isValidEmail) throw new Error("Please enter valid email");

    if (password.length < 8) throw new Error("Please enter min 8 characters ");

    if (name.length > 15)
      throw new Error("Name should be less than 15 characters");

    return "success";
  },
};
module.exports = { Query, Student, Mutation };
