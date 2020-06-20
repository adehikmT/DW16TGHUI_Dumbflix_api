const { transaction, user } = require("../models");
//fungsi custome
const helper = require("../helpers");
// call obj method
const { response, valTrans, deleteUpload } = helper;

const userActive = async (status, id) => {
  let a = status.toLowerCase();
  if (a === "approve") {
    await user.update({ subscibe: 1 }, { where: { id: id } });
  } else {
    await user.update({ subscibe: 0 }, { where: { id: id } });
  }
};
 
module.exports = {
  read: async (req, res) => {
    try {
      const User = await user.findOne({ where: { id: req.user.id } });
      const Transaction = await transaction.findAll({
        include: {
          model: user,
          attributes: {
            exclude: ["role"],
          },
          where: User.role === 0 ? { id: User.id } : "",
        },
        attributes: {
          exclude: ["userId","password"],
        },
      });
      return response(res, 200, Transaction);
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    try {
      const { error } = await valTrans(req.body);
      if (error) {
        await deleteUpload(req.file.filename);
        return response(res, 400, { error: error.details[0].message });
      }
      const User = await user.findOne({ where: { id: req.user.id } });
      if (!User) {
        await deleteUpload(req.file.filename);
        return response(res, 400, { error: "User not found" });
      }

      if(User.subscibe){
        await deleteUpload(req.file.filename);
        return response(res, 400, { error: "Your active user cannot do transaction now" });
      }

      const Transaction = await transaction.create({
        ...req.body,
        userId:req.user.id,
        attache: req.file.filename,
      });
      await userActive(req.body.status, req.user.id);
      const inserted = await transaction.findOne({
        include: {
          model: user,
          attributes: {
            exclude: ["role"],
          },
        },
        attributes: {
          exclude: ["userId","password"],
        },
        where: { id: Transaction.id },
      });
      return response(res, 200, inserted);
    } catch (err) {
      return response(res, 500, { error: "You Must upload image"});
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body)
      const check = await transaction.findOne({
        where: { id },
      });
      if (!check) return response(res, 400, { error: "transaction not found!" });
      // const { error } = await valTrans(req.body);
      // if (error) return response(res, 400, { error: error.details[0].message });
      await userActive(req.body.status, check.userId);
      const update = await transaction.update(req.body, {
        where: { id: id },
      });
      if (update < 1)
        return response(res, 201, { message: "request succes but no update" });
      const updated = await transaction.findOne({
        include: {
          model: user,
          attributes: {
            exclude: ["role"],
          },
        },
        attributes: {
          exclude: ["userId","password"],
        },
        where: { id: id },
      });
      return response(res, 200, updated);
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error " + err });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = await transaction.findOne({
        where: { id },
      });
      const destroy = await transaction.destroy({ where: { id } });
      if (destroy < 1) {
        return response(res, 400, { error: "transaction not found" });
      }
      await userActive("Reject", userId.userId);
      return response(res, 200, { id });
    } catch (err) {
      return response(res, 500, { error: "Internal Server Error" });
    }
  },
};
