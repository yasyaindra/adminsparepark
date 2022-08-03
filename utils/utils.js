module.exports = {
  findGudang: (history, gudang) => {
    let data = [];
    history.forEach((hRak) => {
      gudang.forEach((g) => {
        g.rak.forEach((gRak) => {
          if (gRak === hRak.rak) {
            data.push(g.name);
          }
        });
      });
    });
    return data;
  },
  findRakAndGudangById: (gudang) => {
    let data = [];

    gudang.forEach((g) => {
      g.rak.forEach((rak) => {
        let object = { gudang: g.name, rak: rak };
        data.push(object);
      });
    });

    return data;
  },
  editAmount: (amount, changing) => {
    if (changing > amount) {
      return {
        preAmount: amount,
        currentAmount: changing,
        interval: changing - amount,
        status: "DITAMBAH",
      };
    } else if (changing < amount) {
      return {
        preAmount: amount,
        currentAmount: changing,
        interval: amount - changing,
        status: "DIAMBIL",
      };
    }
  },
};
