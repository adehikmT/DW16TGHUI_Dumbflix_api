const { user, transaction } = require("../models");
const helper = require("../helpers");

const dayjs = require("dayjs");

const { response } = helper;

module.exports = {
  userExp: async (req, res, next) => {
    try {
      const { id } = req.user;
      // cari user yang bukan admin
      const User = await user.findOne({ where: { id } });
      if (User.role === 1) {
        next();
      } else {
        //user bukan admin
        const { id } = req.user;
        //cek transaksi terakhir
        const Tstatus = await transaction.findOne({
          where: { userId: id },
          order: [["id", "DESC"]],
        });
        //validasi waktu dengan dayjs
        var dueDate = Tstatus.dueDate;
        var theDay = dayjs().format("YYYY/MM/DD");
        var due = dayjs(dueDate);
        var Exp = due.diff(theDay, "day");
        // jika waktunya kurang dari 1 hari
        if (Exp < 1) {
          // update user subscribe
          await user.update({ subscibe: 0 }, { where: { id } });
          // update status transaksi
          await transaction.update(
            { userStatus: 2 },
            { where: { id: Tstatus.id } }
          );
          return response(res, 401, "Transaction Expaired...");
        } else {
          // jika belum exp maka nexnt
          next();
        }
      }
    } catch (err) {
      return response(res, 401, { error: "Access denied!" + err });
    }
  },
};
