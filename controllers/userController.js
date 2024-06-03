const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  User.create(newUser, (err, user) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }

    res.send({ message: "User registered successfully!" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(500).send({ message: err.message });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ accessToken: null, message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Not found User with id ${req.params.id}.` });
      } else {
        res
          .status(500)
          .send({ message: "Error retrieving User with id " + req.params.id });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  User.updateById(
    req.params.id,
    new User({ username, email, password: hashedPassword }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res
            .status(404)
            .send({ message: `Not found User with id ${req.params.id}.` });
        } else {
          res
            .status(500)
            .send({ message: "Error updating User with id " + req.params.id });
        }
      } else {
        res.send(data);
      }
    }
  );
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res
          .status(404)
          .send({ message: `Not found User with id ${req.params.id}.` });
      } else {
        res
          .status(500)
          .send({ message: "Could not delete User with id " + req.params.id });
      }
    } else {
      res.send({ message: `User was deleted successfully!` });
    }
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    } else {
      res.send({ message: `All Users were deleted successfully!` });
    }
  });
};
